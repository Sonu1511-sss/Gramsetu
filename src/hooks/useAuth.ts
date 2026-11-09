import { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { authService } from '../services/authService';
import { mockUsers } from '../mock-data/users';

export function useAuth() {
  const [currentUserRaw, setCurrentUserRaw] = useState<User | null>(authService.getCurrentUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUserRaw(authService.getCurrentUser());
    };
    window.addEventListener('gramsetu_auth_change', handleAuthChange);
    return () => window.removeEventListener('gramsetu_auth_change', handleAuthChange);
  }, []);

  const loginWithRole = async (role: UserRole) => {
    setLoading(true);
    try {
      const user = await authService.loginWithRole(role);
      setCurrentUserRaw(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const loginWithCredentials = async (mobile: string, otpOrPass: string) => {
    setLoading(true);
    try {
      const user = await authService.loginWithCredentials(mobile, otpOrPass);
      setCurrentUserRaw(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setCurrentUserRaw(null);
    } finally {
      setLoading(false);
    }
  };

  const hasAccess = (requiredRoles?: UserRole[]) => {
    if (!currentUserRaw) return false;
    return authService.checkPermission(currentUserRaw, requiredRoles);
  };

  // Safe fallback for UI properties
  const user = currentUserRaw || mockUsers.sarpanch;

  return {
    currentUser: user,
    rawUser: currentUserRaw,
    isAuthenticated: currentUserRaw !== null,
    loading,
    loginWithRole,
    loginWithCredentials,
    logout,
    hasAccess,
    isSarpanch: currentUserRaw?.role === 'sarpanch',
    isSecretary: currentUserRaw?.role === 'secretary',
    isCitizen: currentUserRaw?.role === 'citizen'
  };
}
