import { apiClient } from './client';
import { mockAdapter } from './mockAdapter';
import {
  CropRecoveryItem,
  CropRecoveryProgressRecord,
  WeatherAlertItem,
  NotificationItem,
  WeatherForecastDay,
  DamageCause
} from '@/types';
import { INITIAL_WEATHER_FORECAST } from '@/services/mockData';
import { getRecoveryPlan as getFrontendRecoveryPlan, CropRecoveryPlan } from '@/data/cropRecoveryGuidelines';

const USE_REAL_BACKEND = import.meta.env.VITE_ENABLE_DEMO_MODE !== 'true';

export const recoveryApi = {
  /**
   * Static recovery plan generator - 100% frontend only as requested.
   * Does NOT query backend or database for static guidelines.
   */
  getRecoveryPlan(cropId: string, calamityType: string): CropRecoveryPlan | null {
    return getFrontendRecoveryPlan(cropId, calamityType);
  },

  /**
   * Legacy advisory method kept for backward compatibility with existing components
   */
  async getAdvisories(params?: { crop?: string; damageType?: string }): Promise<CropRecoveryItem[]> {
    if (USE_REAL_BACKEND) {
      try {
        const res = await apiClient.get<any>('/recovery/advisories', { params });
        const resData = res.data?.data || res.data;
        return resData?.advisories || (Array.isArray(resData) ? resData : []);
      } catch (e) {
        console.warn('Backend advisories fetch fallback:', e);
      }
    }
    return mockAdapter.getAdvisories();
  },

  async getAdvisoryByFilter(cropName: string, damageCause: DamageCause): Promise<CropRecoveryItem | null> {
    const list = await this.getAdvisories({ crop: cropName, damageType: damageCause });
    const found = list.find(
      (a) => a.cropName.toLowerCase() === cropName.toLowerCase() && a.damageType === damageCause
    );
    return found || list[0] || null;
  },

  /**
   * Dynamic Farmer Recovery Progress Records (stored in database)
   */
  async getProgressRecords(params?: { claimId?: string; farmerId?: string }): Promise<CropRecoveryProgressRecord[]> {
    if (USE_REAL_BACKEND) {
      try {
        const res = await apiClient.get<any>('/recovery/progress', { params });
        const resData = res.data?.data || res.data;
        return resData?.records || (Array.isArray(resData) ? resData : []);
      } catch (e) {
        console.warn('Backend progress fetch fallback to mock:', e);
      }
    }
    return mockAdapter.getProgressRecords(params?.farmerId);
  },

  async addProgressRecord(record: Omit<CropRecoveryProgressRecord, 'id'>): Promise<CropRecoveryProgressRecord> {
    if (USE_REAL_BACKEND) {
      try {
        const res = await apiClient.post<any>('/recovery/progress', record);
        const resData = res.data?.data || res.data;
        return resData?.record || resData;
      } catch (e) {
        console.warn('Backend add progress record fallback to mock:', e);
      }
    }
    return mockAdapter.addProgressRecord(record);
  },

  /**
   * Upload actual progress photo to backend storage (FileStorageService)
   */
  async uploadPhoto(file: File): Promise<{ id: string; url: string; name: string }> {
    if (USE_REAL_BACKEND) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        const res = await apiClient.post<any>('/recovery/photos', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        const resData = res.data?.data || res.data;
        return resData;
      } catch (e) {
        console.warn('Backend photo upload fallback to blob URL:', e);
      }
    }
    return {
      id: `photo-${Date.now()}`,
      url: URL.createObjectURL(file),
      name: file.name
    };
  }
};

export const weatherApi = {
  async getAlerts(district?: string): Promise<WeatherAlertItem[]> {
    if (USE_REAL_BACKEND) {
      const res = await apiClient.get<any>('/weather/alerts', { params: { district } });
      const resData = res.data?.data || res.data;
      return resData?.alerts || (Array.isArray(resData) ? resData : []);
    }
    return mockAdapter.getWeatherAlerts(district);
  },

  async getForecast(district?: string): Promise<{ location: string; forecast: WeatherForecastDay[] }> {
    if (USE_REAL_BACKEND) {
      try {
        const res = await apiClient.get<any>('/weather/forecast', { params: { district } });
        const resData = res.data?.data || res.data;
        if (resData && resData.forecast) {
          return resData;
        }
      } catch (e) {
        console.warn('Weather forecast backend fetch fallback:', e);
      }
    }
    return {
      location: district ? `${district}, Maharashtra` : 'Kolhapur, Maharashtra',
      forecast: INITIAL_WEATHER_FORECAST
    };
  }
};

export const notificationsApi = {
  async getAll(): Promise<NotificationItem[]> {
    if (USE_REAL_BACKEND) {
      const res = await apiClient.get<any>('/notifications');
      const resData = res.data?.data || res.data;
      return resData?.notifications || (Array.isArray(resData) ? resData : []);
    }
    return mockAdapter.getNotifications();
  },

  async markAsRead(id: string): Promise<void> {
    if (USE_REAL_BACKEND) {
      await apiClient.patch(`/notifications/${id}/read`);
      return;
    }
    return mockAdapter.markNotificationRead(id);
  },

  async markAllAsRead(): Promise<void> {
    if (USE_REAL_BACKEND) {
      try {
        await apiClient.patch('/notifications/read-all');
      } catch (e) {
        console.warn('Backend markAllAsRead fallback:', e);
      }
      return;
    }
    return mockAdapter.markAllNotificationsRead();
  }
};
