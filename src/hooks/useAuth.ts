import { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { authService } from '../services/authService';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User>(authService.getCurrentUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(authService.getCurrentUser());
    };
    window.addEventListener('gramsetu_auth_change', handleAuthChange);
    return () => window.removeEventListener('gramsetu_auth_change', handleAuthChange);
  }, []);

  const loginWithRole = async (role: UserRole) => {
    setLoading(true);
    try {
      const user = await authService.loginWithRole(role);
      setCurrentUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setCurrentUser(authService.getCurrentUser());
    } finally {
      setLoading(false);
    }
  };

  const hasAccess = (requiredRoles?: UserRole[]) => {
    return authService.checkPermission(currentUser, requiredRoles);
  };

  return {
    currentUser,
    loading,
    loginWithRole,
    logout,
    hasAccess,
    isSarpanch: currentUser.role === 'sarpanch',
    isSecretary: currentUser.role === 'secretary',
    isCitizen: currentUser.role === 'citizen'
  };
}

