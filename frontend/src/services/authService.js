import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile as firebaseUpdateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase';

class AuthService {
  // Login with Google
  async loginGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Google login error:', error);
      return { success: false, error: this.getFriendlyErrorMessage(error.code) };
    }
  }

  // Login with Firebase
  async login(email, password) {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: this.getFriendlyErrorMessage(error.code) };
    }
  }

  // Signup with Firebase
  async signup(name, email, password) {
    try {
      if (!name || name.trim().length < 2) {
        throw new Error('Name must be at least 2 characters');
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile with name
      await firebaseUpdateProfile(userCredential.user, {
        displayName: name,
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`
      });
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: this.getFriendlyErrorMessage(error.code) };
    }
  }

  // Logout from Firebase
  async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'Logout failed' };
    }
  }

  // Update password
  async updatePassword(newPassword) {
    try {
      if (!auth.currentUser) throw new Error('No user logged in');
      const { updatePassword: firebaseUpdatePassword } = await import('firebase/auth');
      await firebaseUpdatePassword(auth.currentUser, newPassword);
      return { success: true };
    } catch (error) {
      console.error('Update password error:', error);
      return { success: false, error: this.getFriendlyErrorMessage(error.code) };
    }
  }

  // Send password reset email
  async resetPassword(email) {
    try {
      if (!email) throw new Error('Email is required');
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      console.error('Reset password error:', error);
      return { success: false, error: this.getFriendlyErrorMessage(error.code) };
    }
  }

  // Get current user (standard way)
  getCurrentUser() {
    return auth.currentUser;
  }

  // Subscribe to auth state changes
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback);
  }

  // Update profile
  async updateProfile(updates) {
    try {
      if (!auth.currentUser) throw new Error('No user logged in');
      await firebaseUpdateProfile(auth.currentUser, updates);
      return { success: true, user: auth.currentUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  getFriendlyErrorMessage(code) {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password';
      case 'auth/email-already-in-use':
        return 'Email already registered';
      case 'auth/weak-password':
        return 'Password is too weak';
      case 'auth/invalid-email':
        return 'Invalid email format';
      default:
        return 'An error occurred during authentication';
    }
  }
}

export default new AuthService();
