import React, { createContext, useContext, useEffect, useState } from 'react';
import simpleAdminService from '../services/simpleAdminService';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = () => {
      try {
        const isAuth = simpleAdminService.isAuthenticated();
        if (isAuth) {
          const adminData = simpleAdminService.getCurrentAdmin();
          setUser(adminData);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Sign in with username and password
  const signIn = async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await simpleAdminService.login(username, password);

      if (result.success) {
        setUser(result.user);
        return { success: true, user: result.user };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = 'An unexpected error occurred during sign in';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = simpleAdminService.logout();
      
      if (result.success) {
        setUser(null);
        return { success: true };
      } else {
        setError('Failed to sign out');
        return { success: false, error: 'Failed to sign out' };
      }
    } catch (err) {
      const errorMessage = 'An unexpected error occurred during sign out';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      setError(null);
      
      await simpleAdminService.changePassword(currentPassword, newPassword);
      
      return { success: true };
    } catch (err) {
      const errorMessage = err.message || 'Failed to change password';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signOut,
    changePassword,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 