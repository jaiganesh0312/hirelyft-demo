'use client';

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, logoutUser } from '@/services/authService'; // Assuming register is handled separately
import {getProfile} from "@/services/userService"

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Check initial auth status
  const [error, setError] = useState(null);
  const router = useRouter();

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');
        if (storedToken && storedUser) {
          setUser(JSON.parse(storedUser));
          // Optionally verify token validity with backend here
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error checking auth status:", err);
        setUser(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    setError(null);
    setLoading(true);
    try {
      const response = await loginUser(credentials);
      const { token, refreshToken, user: userData } = response.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      router.push(`/${userData.role}/dashboard`); // Redirect to home or dashboard after login
      return { success: true };
    } catch (err) {
      console.error("Login failed:", err);
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      // Handle specific errors like 2FA required
      if (err.response?.data?.require2FA) {
        return { success: false, require2FA: true };
      }
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [router]);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      // Inform backend (optional, depends on backend invalidating tokens)
      await logoutUser();
    } catch (err) {
      console.error("Backend logout failed (continuing client-side logout):", err);
      // Don't block client logout if backend call fails
    } finally {
      setUser(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setError(null);
      setLoading(false);
      router.push('/auth/login'); // Redirect to login page
    }
  }, [router]);

  const refreshUserData = useCallback(async () => {
    try {
      const response = await getProfile();
      const { user: userData } = response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true; // Indicate success
    } catch (err) {
      console.error("Failed to refresh user data:", err);
      // Don't clear user data on error - just return false to indicate failure
      return false;
    }
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
    error,
    setError,
    setUser,
    refreshUserData,
    checkAuthLoading: loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
