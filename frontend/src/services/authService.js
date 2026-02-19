import { v4 as uuidv4 } from 'uuid';

class AuthService {
  constructor() {
    this.tokenKey = 'auth_token';
    this.userKey = 'current_user';
    this.usersKey = 'registered_users';
    this.initializeStorage();
  }

  initializeStorage() {
    if (!localStorage.getItem(this.usersKey)) {
      localStorage.setItem(this.usersKey, JSON.stringify([]));
    }
  }

  // Synchronous login with mock data
  login(email, password) {
    try {
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
      }

      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }

      // Get registered users
      const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
      const user = users.find(u => u.email === email.toLowerCase());

      if (!user || user.password !== password) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Create session
      const token = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const userSession = { ...user };
      delete userSession.password; // Remove password from session

      // Store session
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.userKey, JSON.stringify(userSession));

      return { success: true, user: userSession, token };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  }

  // Synchronous signup with mock data
  signup(name, email, password) {
    try {
      if (!name || name.trim().length < 2) {
        return { success: false, error: 'Name must be at least 2 characters' };
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { success: false, error: 'Invalid email format' };
      }

      if (!password || password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }

      // Get existing users
      const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
      
      // Check if user already exists
      if (users.some(user => user.email === email.toLowerCase())) {
        return { success: false, error: 'Email already registered' };
      }

      // Create new user
      const newUser = {
        id: uuidv4(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password, // In real app, this would be hashed
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`,
        role: 'user',
        createdAt: new Date().toISOString()
      };

      // Save user
      users.push(newUser);
      localStorage.setItem(this.usersKey, JSON.stringify(users));

      // Auto-login after signup
      const token = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const userSession = { ...newUser };
      delete userSession.password; // Remove password from session

      // Store session
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.userKey, JSON.stringify(userSession));

      return { success: true, user: userSession, token };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    }
  }

  logout() {
    try {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Logout failed' };
    }
  }

  getCurrentUser() {
    try {
      const user = localStorage.getItem(this.userKey);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  }

  getCurrentToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated() {
    return !!this.getCurrentToken() && !!this.getCurrentUser();
  }

  updateProfile(updates) {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        return { success: false, error: 'No user logged in' };
      }

      const updatedUser = { ...currentUser, ...updates };
      localStorage.setItem(this.userKey, JSON.stringify(updatedUser));

      // Update in users array too
      const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
      const userIndex = users.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem(this.usersKey, JSON.stringify(users));
      }

      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: 'Profile update failed' };
    }
  }

  changePassword(currentPassword, newPassword) {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        return { success: false, error: 'No user logged in' };
      }

      if (!currentPassword || !newPassword) {
        return { success: false, error: 'Both passwords are required' };
      }

      if (newPassword.length < 6) {
        return { success: false, error: 'New password must be at least 6 characters' };
      }

      // Get users to verify current password
      const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
      const user = users.find(u => u.id === currentUser.id);

      if (!user || user.password !== currentPassword) {
        return { success: false, error: 'Current password is incorrect' };
      }

      // Update password
      user.password = newPassword;
      localStorage.setItem(this.usersKey, JSON.stringify(users));

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Password change failed' };
    }
  }

  clearSession() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
}

export default new AuthService();
