import { apiClient } from './client';
import { mockAdapter } from './mockAdapter';
import { User, LoginCredentials, FarmerRegistrationData, AuthResponse } from '@/types';

const USE_REAL_BACKEND = import.meta.env.VITE_ENABLE_DEMO_MODE !== 'true';

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (USE_REAL_BACKEND) {
      try {
        const response = await apiClient.post<any>('/auth/login', {
          email: credentials.emailOrPhone,
          password: credentials.password
        });
        const resData = response.data?.data || response.data;
        return resData;
      } catch (err: any) {
        throw new Error(err.response?.data?.message || 'Authentication failed. Please verify your credentials.');
      }
    }
    // Development fixture authentication
    return mockAdapter.login(credentials);
  },

  async registerFarmer(data: FarmerRegistrationData): Promise<AuthResponse> {
    if (USE_REAL_BACKEND) {
      try {
        const response = await apiClient.post<any>('/auth/register', data);
        const resData = response.data?.data || response.data;
        return resData;
      } catch (err: any) {
        throw new Error(err.response?.data?.message || 'Registration failed. Please check the entered details.');
      }
    }
    return mockAdapter.registerFarmer(data);
  },

  async getCurrentUser(token: string): Promise<User | null> {
    if (USE_REAL_BACKEND) {
      try {
        const response = await apiClient.get<any>('/auth/me');
        const resData = response.data?.data || response.data;
        return resData?.user || resData;
      } catch {
        return null;
      }
    }
    return mockAdapter.getCurrentUser(token);
  },

  async updateProfile(profile: Partial<User>): Promise<User> {
    if (USE_REAL_BACKEND) {
      const response = await apiClient.put<any>('/auth/me', profile);
      const resData = response.data?.data || response.data;
      return resData?.user || resData;
    }
    return profile as User;
  },

  async logout(): Promise<void> {
    if (USE_REAL_BACKEND) {
      try {
        await apiClient.post('/auth/logout');
      } catch {
        // ignore
      }
    }
    localStorage.removeItem('crop_nexus_auth_token');
    localStorage.removeItem('crop_nexus_active_user');
  }
};

export default authApi;
