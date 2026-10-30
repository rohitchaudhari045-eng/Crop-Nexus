import { apiClient } from './client';
import { mockAdapter } from './mockAdapter';
import { InspectionRecord, ClaimRecord, EPanchanamaDocument } from '@/types';

const USE_REAL_BACKEND = import.meta.env.VITE_ENABLE_DEMO_MODE !== 'true';

export const inspectionApi = {
  async getAll(): Promise<InspectionRecord[]> {
    if (USE_REAL_BACKEND) {
      const res = await apiClient.get<any>('/inspections');
      const resData = res.data?.data || res.data;
      return resData?.inspections || (Array.isArray(resData) ? resData : []);
    }
    return mockAdapter.getInspections();
  },

  async getByClaimId(claimId: string): Promise<InspectionRecord | null> {
    if (USE_REAL_BACKEND) {
      try {
        const res = await apiClient.get<any>(`/inspections/claim/${claimId}`);
        const resData = res.data?.data || res.data;
        return resData?.inspection || resData || null;
      } catch (err: any) {
        if (err.response?.status === 404) return null;
        throw err;
      }
    }
    return mockAdapter.getInspectionByClaimId(claimId);
  },

  async submitInspection(data: Omit<InspectionRecord, 'id' | 'createdAt'>): Promise<InspectionRecord> {
    if (USE_REAL_BACKEND) {
      const payload: any = {
        ...data,
        gpsLatitude: data.gpsCoordinates?.latitude,
        gpsLongitude: data.gpsCoordinates?.longitude
      };
      const res = await apiClient.post<any>('/inspections', payload);
      const resData = res.data?.data || res.data;
      return resData?.inspection || resData;
    }
    return mockAdapter.submitInspection(data);
  }
};

export const panchanamaApi = {
  async getByClaimId(claimId: string): Promise<EPanchanamaDocument | null> {
    if (USE_REAL_BACKEND) {
      try {
        const res = await apiClient.get<any>(`/panchanama/claim/${claimId}`);
        const resData = res.data?.data || res.data;
        return resData?.panchanama || resData || null;
      } catch (err: any) {
        if (err.response?.status === 404) return null;
        throw err;
      }
    }
    return mockAdapter.getPanchanamaByClaimId(claimId);
  },

  async generateDraft(claim: ClaimRecord, inspection?: InspectionRecord, officerName = 'Suresh Deshmukh'): Promise<EPanchanamaDocument> {
    if (USE_REAL_BACKEND) {
      const res = await apiClient.post<any>('/panchanama/generate', {
        claimId: claim.id,
        inspectionId: inspection?.id
      });
      const resData = res.data?.data || res.data;
      return resData?.panchanama || resData;
    }
    return mockAdapter.generateDraftPanchanama(claim, inspection, officerName);
  },

  async updateDraft(id: string, updates: Partial<EPanchanamaDocument>): Promise<EPanchanamaDocument | null> {
    if (USE_REAL_BACKEND) {
      const res = await apiClient.put<any>(`/panchanama/${id}`, updates);
      const resData = res.data?.data || res.data;
      return resData?.panchanama || resData;
    }
    return mockAdapter.updateDraftPanchanama(id, updates);
  }
};

export default inspectionApi;
