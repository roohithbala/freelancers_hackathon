import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const signupEmail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const loginGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Login Failed:", error);
            throw error;
        }
    };

    const logout = () => {
        return signOut(auth);
    };

    const updateUserPassword = (password) => {
        if (!currentUser) throw new Error("No user logged in");
        return updatePassword(currentUser, password);
    };

    const value = {
        currentUser,
        signupEmail,
        loginEmail,
        loginGoogle,
        logout,
        updateUserPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
