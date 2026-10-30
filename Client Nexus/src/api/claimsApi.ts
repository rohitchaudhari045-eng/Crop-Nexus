import { apiClient } from './client';
import { mockAdapter } from './mockAdapter';
import { ClaimRecord, CropDamageReportInput, User, PhotoAttachment } from '@/types';

const USE_REAL_BACKEND = import.meta.env.VITE_ENABLE_DEMO_MODE !== 'true';

export const damageReportApi = {
  async submitReport(report: CropDamageReportInput, user: User): Promise<ClaimRecord> {
    if (USE_REAL_BACKEND) {
      const res = await apiClient.post<any>('/damage-reports', report);
      const resData = res.data?.data || res.data;
      return resData?.claim || resData;
    }
    return mockAdapter.createClaim(report, user);
  },

  async uploadPhoto(file: File): Promise<PhotoAttachment> {
    if (USE_REAL_BACKEND) {
      const formData = new FormData();
      formData.append('file', file);
      const res = await apiClient.post<any>('/damage-reports/photos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const resData = res.data?.data || res.data;
      return resData;
    }
    // Local blob preview for development fixture
    return {
      id: `photo-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      url: URL.createObjectURL(file),
      name: file.name,
      uploadedAt: new Date().toISOString(),
      sizeBytes: file.size,
      caption: `Field capture: ${file.name}`
    };
  }
};

export const claimsApi = {
  async getAll(params?: { status?: string; search?: string; userId?: string }): Promise<ClaimRecord[]> {
    if (USE_REAL_BACKEND) {
      const cleanParams: any = {};
      if (params?.status && params.status !== 'all') cleanParams.status = params.status;
      if (params?.search && params.search.trim()) cleanParams.search = params.search.trim();
      if (params?.userId && params.userId !== 'all') cleanParams.userId = params.userId;

      const res = await apiClient.get<any>('/claims', { params: cleanParams });
      const resData = res.data?.data || res.data;
      return resData?.claims || (Array.isArray(resData) ? resData : []);
    }
    return mockAdapter.getClaims(params);
  },

  async getById(id: string): Promise<ClaimRecord | null> {
    if (USE_REAL_BACKEND) {
      try {
        const res = await apiClient.get<any>(`/claims/${id}`);
        const resData = res.data?.data || res.data;
        return resData?.claim || resData || null;
      } catch (err: any) {
        if (err.response?.status === 404) return null;
        throw err;
      }
    }
    return mockAdapter.getClaimById(id);
  },

  async create(report: CropDamageReportInput, user: User): Promise<ClaimRecord> {
    return damageReportApi.submitReport(report, user);
  },

  async updateStatus(id: string, status: any, remarks: string, updatedBy: string): Promise<ClaimRecord | null> {
    if (USE_REAL_BACKEND) {
      const res = await apiClient.patch<any>(`/claims/${id}/status`, { status, remarks, updatedBy });
      const resData = res.data?.data || res.data;
      return resData?.claim || resData;
    }
    return mockAdapter.updateClaimStatus(id, status, remarks, updatedBy);
  }
};

export default claimsApi;
