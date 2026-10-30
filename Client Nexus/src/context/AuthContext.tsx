import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, LoginCredentials, FarmerRegistrationData, AuthResponse } from '@/types';
import { authApi } from '@/api/authApi';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; role?: UserRole; error?: string }>;
  register: (data: FarmerRegistrationData) => Promise<{ success: boolean; role?: UserRole; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_USER_KEY = 'crop_nexus_active_user';
const AUTH_TOKEN_KEY = 'crop_nexus_auth_token';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize session from storage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        const storedUser = localStorage.getItem(AUTH_USER_KEY);

        if (token && storedUser) {
          try {
            const parsed = JSON.parse(storedUser) as User;
            // Verify role is strictly 'farmer' or 'officer'
            if (parsed.role === 'farmer' || parsed.role === 'officer') {
              setUser(parsed);
            } else {
              localStorage.removeItem(AUTH_USER_KEY);
              localStorage.removeItem(AUTH_TOKEN_KEY);
            }
          } catch {
            localStorage.removeItem(AUTH_USER_KEY);
            localStorage.removeItem(AUTH_TOKEN_KEY);
          }
        }
      } catch (err) {
        console.warn('Auth session restoration error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (
    credentials: LoginCredentials
  ): Promise<{ success: boolean; role?: UserRole; error?: string }> => {
    try {
      setIsLoading(true);
      const res: AuthResponse = await authApi.login(credentials);

      if (res.user && res.token) {
        // Enforce role validity
        if (res.user.role !== 'farmer' && res.user.role !== 'officer') {
          return { success: false, error: 'Unauthorized role assignment received.' };
        }

        setUser(res.user);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(res.user));
        localStorage.setItem(AUTH_TOKEN_KEY, res.token);
        return { success: true, role: res.user.role };
      }
      return { success: false, error: 'Invalid response from authentication service.' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed. Please verify your credentials.' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    data: FarmerRegistrationData
  ): Promise<{ success: boolean; role?: UserRole; error?: string }> => {
    try {
      setIsLoading(true);
      const res: AuthResponse = await authApi.registerFarmer(data);

      if (res.user && res.token) {
        setUser(res.user);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(res.user));
        localStorage.setItem(AUTH_TOKEN_KEY, res.token);
        return { success: true, role: res.user.role };
      }
      return { success: false, error: 'Could not complete registration at this time.' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Registration failed.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  const role: UserRole | null = user?.role || null;
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
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

export default AuthContext;
