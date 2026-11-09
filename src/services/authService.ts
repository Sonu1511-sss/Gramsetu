import { User, UserRole } from '../types';
import { mockUsers } from '../mock-data/users';

const AUTH_STORAGE_KEY = 'gramsetu_current_user';

export const authService = {
  getCurrentUser: (): User | null => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    // Strict authentication: Return null if not logged in
    return null;
  },

  isAuthenticated: (): boolean => {
    return authService.getCurrentUser() !== null;
  },

  loginWithRole: async (role: UserRole): Promise<User> => {
    // Simulating API delay
    await new Promise((res) => setTimeout(res, 250));
    const user = mockUsers[role] || mockUsers.sarpanch;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event('gramsetu_auth_change'));
    return user;
  },

  loginWithCredentials: async (mobile: string, _otpOrPass: string): Promise<User> => {
    await new Promise((res) => setTimeout(res, 300));
    const matched = Object.values(mockUsers).find((u) => u.mobile.includes(mobile.replace(/\D/g, '')));
    const user = matched || mockUsers.sarpanch;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event('gramsetu_auth_change'));
    return user;
  },

  logout: async (): Promise<void> => {
    await new Promise((res) => setTimeout(res, 100));
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.dispatchEvent(new Event('gramsetu_auth_change'));
  },

  checkPermission: (user: User, requiredRoles?: UserRole[]): boolean => {
    if (!requiredRoles || requiredRoles.length === 0) return true;
    if (user.role === 'sarpanch') return true;
    return requiredRoles.includes(user.role);
  }
};
