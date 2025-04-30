
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, userType: 'patient' | 'therapist') => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock authentication for demo purposes
  // In a real app, this would connect to your backend auth service
  useEffect(() => {
    const storedUser = localStorage.getItem('thrive_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - in a real app, this would be an API call
      // This is just for demonstration
      const mockUser: User = {
        id: 'user-' + Math.random().toString(36).substring(2, 9),
        name: email.split('@')[0],
        email: email,
        userType: email.includes('therapist') ? 'therapist' : 'patient',
      };
      
      setCurrentUser(mockUser);
      localStorage.setItem('thrive_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, userType: 'patient' | 'therapist') => {
    setIsLoading(true);
    try {
      // Mock signup - in a real app, this would be an API call
      const mockUser: User = {
        id: 'user-' + Math.random().toString(36).substring(2, 9),
        name: name,
        email: email,
        userType: userType,
      };
      
      setCurrentUser(mockUser);
      localStorage.setItem('thrive_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('thrive_user');
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!currentUser) return;
    
    const updatedUser = { ...currentUser, ...userData };
    setCurrentUser(updatedUser);
    localStorage.setItem('thrive_user', JSON.stringify(updatedUser));
  };

  const value = {
    currentUser,
    isLoading,
    login,
    signup,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
