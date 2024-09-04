import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    // Fetch the initial auth state from localStorage
    const initialAuthUser = localStorage.getItem("user");
    
    // Initialize state with the parsed user or undefined
    const [authUser, setAuthUser] = useState(
        initialAuthUser ? JSON.parse(initialAuthUser) : undefined
    );

    // Sync the state to localStorage when it changes
    useEffect(() => {
        if (authUser) {
            localStorage.setItem("user", JSON.stringify(authUser));
        } else {
            localStorage.removeItem("user");
        }
    }, [authUser]);

    return (
        <AuthContext.Provider value={[ authUser, setAuthUser ]}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
