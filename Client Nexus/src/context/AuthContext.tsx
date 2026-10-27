import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { authApi } from '@/services/apiService';
import { INITIAL_USERS } from '@/services/mockData';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  login: (emailOrPhone: string, password: string, role?: UserRole) => Promise<boolean>;
  register: (data: { name: string; email: string; phone: string; role: 'farmer' | 'officer'; district: string; village?: string }) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_USER_KEY = 'crop_nexus_active_user';
const DEMO_MODE_KEY = 'crop_nexus_demo_mode';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  // Initialize auth state from storage or default to demo farmer
  useEffect(() => {
    try {
      const savedDemo = localStorage.getItem(DEMO_MODE_KEY);
      if (savedDemo !== null) {
        setIsDemoMode(savedDemo === 'true');
      }

      const savedUser = localStorage.getItem(AUTH_USER_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Default initial session for immediate exploration
        const defaultUser = INITIAL_USERS[0];
        setUser(defaultUser);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(defaultUser));
      }
    } catch (e) {
      console.warn('Auth state load error:', e);
      setUser(INITIAL_USERS[0]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (emailOrPhone: string, password: string, requestedRole?: UserRole): Promise<boolean> => {
    try {
      setIsLoading(true);
      const res = await authApi.login(emailOrPhone, password, requestedRole);
      if (res.user) {
        setUser(res.user);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(res.user));
        localStorage.setItem('crop_nexus_auth_token', res.token);
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: { name: string; email: string; phone: string; role: 'farmer' | 'officer'; district: string; village?: string }): Promise<boolean> => {
    try {
      setIsLoading(true);
      const res = await authApi.register(data);
      if (res.user) {
        setUser(res.user);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(res.user));
        localStorage.setItem('crop_nexus_auth_token', res.token);
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem('crop_nexus_auth_token');
  };

  const switchRole = (newRole: UserRole) => {
    const targetUser = INITIAL_USERS.find(u => u.role === newRole) || {
      id: `usr-${newRole}-99`,
      name: `Demo ${newRole.charAt(0).toUpperCase() + newRole.slice(1)}`,
      email: `${newRole}@cropnexus.demo`,
      phone: '+91 98000 00000',
      role: newRole,
      district: 'Kolhapur',
      createdAt: new Date().toISOString()
    };
    setUser(targetUser);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(targetUser));
  };

  const toggleDemoMode = () => {
    setIsDemoMode(prev => {
      const next = !prev;
      localStorage.setItem(DEMO_MODE_KEY, String(next));
      return next;
    });
  };

  const role: UserRole = user?.role || 'farmer';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isLoading,
        isDemoMode,
        toggleDemoMode,
        login,
        register,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
