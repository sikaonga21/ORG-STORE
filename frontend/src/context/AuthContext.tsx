import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Admin } from '../types';
import { authService } from '../services/auth.service';

interface AuthContextType {
    admin: Admin | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            if (authService.isAuthenticated()) {
                try {
                    const currentAdmin = await authService.getCurrentAdmin();
                    setAdmin(currentAdmin);
                } catch (error) {
                    console.error('Failed to get current admin:', error);
                    authService.logout();
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (username: string, password: string) => {
        await authService.login(username, password);
        const currentAdmin = await authService.getCurrentAdmin();
        setAdmin(currentAdmin);
    };

    const logout = () => {
        authService.logout();
        setAdmin(null);
    };

    return (
        <AuthContext.Provider
            value={{
                admin,
                loading,
                login,
                logout,
                isAuthenticated: !!admin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
