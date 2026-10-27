import { apiClient } from './apiClient';
import {
  User,
  ClaimRecord,
  CropDamageReportInput,
  InspectionRecord,
  EPanchanamaDocument,
  WeatherAlertItem,
  WeatherForecastDay,
  CropRecoveryItem,
  CropRecoveryProgressRecord,
  NotificationItem,
  AdminAnalyticsSummary,
  ClaimStatus
} from '@/types';
import {
  INITIAL_USERS,
  INITIAL_CLAIMS,
  INITIAL_INSPECTIONS,
  INITIAL_PANCHANAMA,
  INITIAL_WEATHER_ALERTS,
  INITIAL_WEATHER_FORECAST,
  INITIAL_RECOVERY_ITEMS,
  INITIAL_RECOVERY_PROGRESS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ANALYTICS
} from './mockData';

// Local storage keys for persistent demo simulation
const STORAGE_KEYS = {
  CLAIMS: 'cn_demo_claims',
  INSPECTIONS: 'cn_demo_inspections',
  PANCHANAMA: 'cn_demo_panchanama',
  RECOVERY_PROGRESS: 'cn_demo_recovery_progress',
  NOTIFICATIONS: 'cn_demo_notifications',
  USERS: 'cn_demo_users',
};

// Helper to get or initialize persistent demo state
function getStored<T>(key: string, defaultData: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(item) as T;
  } catch {
    return defaultData;
  }
}

function setStored<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn('Failed to save to localStorage', err);
  }
}

// Check if demo fallback should be used
const FORCE_DEMO = import.meta.env.VITE_ENABLE_DEMO_MODE !== 'false';

// -------------------------------------------------------------
// Authentication API
// -------------------------------------------------------------
export const authApi = {
  async login(emailOrPhone: string, _password: string, role?: string): Promise<{ token: string; user: User }> {
    if (!FORCE_DEMO) {
      try {
        const res = await apiClient.post('/auth/login', { emailOrPhone, password: _password, role });
        return res.data;
      } catch (err) {
        console.warn('Backend login failed, using demo user', err);
      }
    }
    
    // Demo Mock fallback
    const users = getStored<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    const targetRole = role || 'farmer';
    let user = users.find(u => (u.email === emailOrPhone || u.phone.includes(emailOrPhone)) && u.role === targetRole);
    if (!user) {
      user = users.find(u => u.role === targetRole) || users[0];
    }
    const token = `cn_token_demo_${user.id}_${Date.now()}`;
    return { token, user };
  },

  async register(data: { name: string; email: string; phone: string; role: 'farmer' | 'officer'; district: string; village?: string }): Promise<{ token: string; user: User }> {
    if (!FORCE_DEMO) {
      try {
        const res = await apiClient.post('/auth/register', data);
        return res.data;
      } catch (err) {
        console.warn('Backend registration failed, using demo user registration', err);
      }
    }

    const users = getStored<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      district: data.district,
      village: data.village || '',
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    setStored(STORAGE_KEYS.USERS, users);
    const token = `cn_token_demo_${newUser.id}_${Date.now()}`;
    return { token, user: newUser };
  },

  async getCurrentUser(token: string): Promise<User | null> {
    if (!FORCE_DEMO) {
      try {
        const res = await apiClient.get('/auth/me');
        return res.data.user;
      } catch {
        // fallback
      }
    }
    const users = getStored<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    return users[0] || null;
  }
};

// -------------------------------------------------------------
// Claims API
// -------------------------------------------------------------
export const claimsApi = {
  async getAll(params?: { status?: string; search?: string; userId?: string }): Promise<ClaimRecord[]> {
    if (!FORCE_DEMO) {
      try {
        const res = await apiClient.get('/claims', { params });
        return res.data.claims;
      } catch (err) {
        console.warn('Backend /claims failed, loading demo claims', err);
      }
    }

    let claims = getStored<ClaimRecord[]>(STORAGE_KEYS.CLAIMS, INITIAL_CLAIMS);

    if (params?.userId) {
      claims = claims.filter(c => c.userId === params.userId);
    }
    if (params?.status && params.status !== 'all') {
      claims = claims.filter(c => c.status === params.status);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      claims = claims.filter(c => 
        c.claimNumber.toLowerCase().includes(q) ||
        c.cropName.toLowerCase().includes(q) ||
        c.farmerName.toLowerCase().includes(q) ||
        c.village.toLowerCase().includes(q) ||
        c.surveyNumber.toLowerCase().includes(q)
      );
    }

    return claims;
  },

  async getById(id: string): Promise<ClaimRecord | null> {
    if (!FORCE_DEMO) {
      try {
        const res = await apiClient.get(`/claims/${id}`);
        return res.data.claim;
      } catch (err) {
        console.warn(`Backend /claims/${id} failed, reading demo claim`, err);
      }
    }

    const claims = getStored<ClaimRecord[]>(STORAGE_KEYS.CLAIMS, INITIAL_CLAIMS);
    return claims.find(c => c.id === id || c.claimNumber === id) || null;
  },

  async create(report: CropDamageReportInput, user: User): Promise<ClaimRecord> {
    if (!FORCE_DEMO) {
      try {
        const res = await apiClient.post('/claims', report);
        return res.data.claim;
      } catch (err) {
        console.warn('Backend claim creation failed, using demo storage', err);
      }
    }

    const claims = getStored<ClaimRecord[]>(STORAGE_KEYS.CLAIMS, INITIAL_CLAIMS);
    const newId = `clm-${Date.now().toString().slice(-4)}`;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const claimNumber = `CN-2026-MH-${randomSuffix}`;

    const newClaim: ClaimRecord = {
      ...report,
      id: newId,
      claimNumber,
      userId: user.id,
      submissionDate: new Date().toISOString(),
      status: 'submitted',
      compensationStatus: 'under_assessment',
      estimatedCompensationAmount: Math.round(report.affectedAreaAcre * 18000),
      statusHistory: [
        {
          status: 'submitted',
          timestamp: new Date().toISOString(),
          remarks: 'Damage report received via Crop Nexus portal',
          updatedBy: user.name
        }
      ]
    };

    claims.unshift(newClaim);
    setStored(STORAGE_KEYS.CLAIMS, claims);

    // Also trigger a notification in the demo system
    const notifs = getStored<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    notifs.unshift({
      id: `notif-${Date.now()}`,
      userId: user.id,
      title: 'Crop Damage Report Submitted',
      message: `Your claim ${claimNumber} for ${report.cropName} on survey ${report.surveyNumber} has been registered successfully.`,
      type: 'claim_update',
      read: false,
      createdAt: new Date().toISOString(),
      actionUrl: `/claims/${newId}`
    });
    setStored(STORAGE_KEYS.NOTIFICATIONS, notifs);

    return newClaim;
  },

  async updateStatus(id: string, status: ClaimStatus, remarks: string, updatedBy: string): Promise<ClaimRecord | null> {
    if (!FORCE_DEMO) {
      try {
        const res = await apiClient.patch(`/claims/${id}/status`, { status, remarks });
        return res.data.claim;
      } catch (err) {
        console.warn('Backend updateStatus failed, using demo storage', err);
      }
    }

    const claims = getStored<ClaimRecord[]>(STORAGE_KEYS.CLAIMS, INITIAL_CLAIMS);
    const idx = claims.findIndex(c => c.id === id);
    if (idx === -1) return null;

    const claim = claims[idx];
    claim.status = status;
    claim.statusHistory.push({
      status,
      timestamp: new Date().toISOString(),
      remarks,
      updatedBy
    });

    if (status === 'approved') {
      claim.compensationStatus = 'sanctioned';
      claim.sanctionedCompensationAmount = claim.estimatedCompensationAmount || 45000;
    }

    claims[idx] = claim;
    setStored(STORAGE_KEYS.CLAIMS, claims);
    return claim;
  }
};

// -------------------------------------------------------------
// Inspections API
// -------------------------------------------------------------
export const inspectionApi = {
  async getAll(): Promise<InspectionRecord[]> {
    if (!FORCE_DEMO) {
      try {
        const res = await apiClient.get('/inspections');
        return res.data.inspections;
      } catch (err) {
        console.warn('Backend /inspections failed, using demo data', err);
      }
    }
    return getStored<InspectionRecord[]>(STORAGE_KEYS.INSPECTIONS, INITIAL_INSPECTIONS);
  },

  async getByClaimId(claimId: string): Promise<InspectionRecord | null> {
    if (!FORCE_DEMO) {
      try {
        const res = await apiClient.get(`/inspections/claim/${claimId}`);
        return res.data.inspection;
      } catch (err) {
        console.warn('Backend getByClaimId failed, using demo data', err);
      }
    }
    const list = getStored<InspectionRecord[]>(STORAGE_KEYS.INSPECTIONS, INITIAL_INSPECTIONS);
    return list.find(i => i.claimId === claimId) || null;
  },

  async submitInspection(data: Omit<InspectionRecord, 'id' | 'createdAt'>): Promise<InspectionRecord> {
    if (!FORCE_DEMO) {
      try {
        const res = await apiClient.post('/inspections', data);
        return res.data.inspection;
      } catch (err) {
        console.warn('Backend submitInspection failed, using demo storage', err);
      }
    }

    const inspections = getStored<InspectionRecord[]>(STORAGE_KEYS.INSPECTIONS, INITIAL_INSPECTIONS);
    const newRecord: InspectionRecord = {
      ...data,
      id: `insp-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString()
    };
    inspections.unshift(newRecord);
    setStored(STORAGE_KEYS.INSPECTIONS, inspections);

    // Update the corresponding claim status to inspected
    await claimsApi.updateStatus(data.claimId, 'inspected', `Field inspection completed by ${data.officerName}. Assessed loss: ${data.assessedLossPercentage}%.`, data.officerName);

    return newRecord;
  }
};

// -------------------------------------------------------------
// e-Panchanama Draft API
// -------------------------------------------------------------
export const panchanamaApi = {
  async getByClaimId(claimId: string): Promise<EPanchanamaDocument | null> {
    if (!FORCE_DEMO) {
      try {
        const res = await apiClient.get(`/panchanama/claim/${claimId}`);
        return res.data.panchanama;
      } catch (err) {
        console.warn('Backend panchanama get failed, using demo draft', err);
      }
    }
    const list = getStored<EPanchanamaDocument[]>(STORAGE_KEYS.PANCHANAMA, INITIAL_PANCHANAMA);
    return list.find(p => p.claimId === claimId) || null;
  },

  async generateDraft(claim: ClaimRecord, inspection?: InspectionRecord, officerName = 'Officer Suresh Deshmukh'): Promise<EPanchanamaDocument> {
    const list = getStored<EPanchanamaDocument[]>(STORAGE_KEYS.PANCHANAMA, INITIAL_PANCHANAMA);
    const existing = list.find(p => p.claimId === claim.id);
    if (existing) return existing;

    const draftNum = `EPN-2026-MH-${claim.claimNumber.split('-')[3] || '884'}-DRAFT`;
    const newDraft: EPanchanamaDocument = {
      id: `pan-${Date.now().toString().slice(-4)}`,
      reportNumber: draftNum,
      claimId: claim.id,
      claimNumber: claim.claimNumber,
      dateGenerated: new Date().toISOString(),
      district: claim.district,
      taluka: claim.taluka,
      village: claim.village,
      surveyNumber: claim.surveyNumber,
      farmerName: claim.farmerName,
      farmerPhone: claim.farmerPhone,
      cropName: claim.cropName,
      cropVariety: 'Standard Certified Cultivar',
      sowingDate: '2026-06-25',
      calamityType: claim.damageCause.replace(/_/g, ' ').toUpperCase(),
      calamityDate: claim.damageDate,
      totalAreaAcre: claim.totalLandAreaAcre,
      affectedAreaAcre: inspection?.verifiedAffectedAreaAcre || claim.affectedAreaAcre,
      damagePercentage: inspection?.assessedLossPercentage || claim.estimatedLossPercentage,
      officerName: officerName,
      officerDesignation: 'Circle Agriculture Inspector',
      officerOffice: `${claim.taluka} Taluka Agriculture Division`,
      officerSignatureDate: new Date().toISOString().split('T')[0],
      findingsSummary: inspection?.officerObservations || `Field verified for survey ${claim.surveyNumber} in village ${claim.village}. Severe crop damage recorded due to ${claim.damageCause.replace(/_/g, ' ')}.`,
      witnesses: [
        { name: 'Vilas Maruti Kadam', aadhaarLast4: '3412', village: claim.village, contactNumber: '+91 94231 66778' },
        { name: 'Pandurang Sitaram Mane', aadhaarLast4: '9105', village: claim.village, contactNumber: '+91 98222 34567' }
      ],
      isDraft: true,
      officialDisclaimer: 'PROVISIONAL DRAFT REPORT: This digital e-Panchanama draft is generated through Crop Nexus for administrative compilation and digital field review. It does not constitute a final government sanction until countersigned by the competent revenue authority.'
    };

    list.unshift(newDraft);
    setStored(STORAGE_KEYS.PANCHANAMA, list);

    // Update claim status to panchanama_drafted
    await claimsApi.updateStatus(claim.id, 'panchanama_drafted', `Draft e-Panchanama compiled: ${draftNum}`, officerName);

    return newDraft;
  },

  async updateDraft(id: string, updates: Partial<EPanchanamaDocument>): Promise<EPanchanamaDocument | null> {
    if (!FORCE_DEMO) {
      try {
        const res = await apiClient.put(`/panchanama/${id}`, updates);
        return res.data.panchanama;
      } catch (err) {
        console.warn('Backend update draft failed, using demo storage', err);
      }
    }

    const list = getStored<EPanchanamaDocument[]>(STORAGE_KEYS.PANCHANAMA, INITIAL_PANCHANAMA);
    const idx = list.findIndex(p => p.id === id);
    if (idx === -1) return null;

    list[idx] = { ...list[idx], ...updates };
    setStored(STORAGE_KEYS.PANCHANAMA, list);
    return list[idx];
  }
};

// -------------------------------------------------------------
// Crop Recovery Advisor & Progress API
// -------------------------------------------------------------
export const recoveryApi = {
  async getAdvisories(): Promise<CropRecoveryItem[]> {
    if (!FORCE_DEMO) {
      try {
        const res = await apiClient.get('/recovery/advisories');
        return res.data.advisories;
      } catch {
        // fallback
      }
    }
    return INITIAL_RECOVERY_ITEMS;
  },

  async getAdvisoryByFilter(cropName: string, damageType: string): Promise<CropRecoveryItem | null> {
    const items = INITIAL_RECOVERY_ITEMS;
    const cleanCrop = cropName.toLowerCase();
    return items.find(i => cleanCrop.includes(i.cropName.toLowerCase()) || i.damageType === damageType) || items[0];
  },

  async getProgressRecords(farmerId?: string): Promise<CropRecoveryProgressRecord[]> {
    if (!FORCE_DEMO) {
      try {
        const res = await apiClient.get('/recovery/progress', { params: { farmerId } });
        return res.data.records;
      } catch {
        // fallback
      }
    }
    const list = getStored<CropRecoveryProgressRecord[]>(STORAGE_KEYS.RECOVERY_PROGRESS, INITIAL_RECOVERY_PROGRESS);
    if (farmerId) {
      return list.filter(r => r.farmerId === farmerId);
    }
    return list;
  },

  async addProgressRecord(record: Omit<CropRecoveryProgressRecord, 'id'>): Promise<CropRecoveryProgressRecord> {
    const list = getStored<CropRecoveryProgressRecord[]>(STORAGE_KEYS.RECOVERY_PROGRESS, INITIAL_RECOVERY_PROGRESS);
    const newRecord: CropRecoveryProgressRecord = {
      ...record,
      id: `recp-${Date.now().toString().slice(-4)}`
    };
    list.unshift(newRecord);
    setStored(STORAGE_KEYS.RECOVERY_PROGRESS, list);
    return newRecord;
  }
};

// -------------------------------------------------------------
// Weather Alerts & Forecast API
// -------------------------------------------------------------
export const weatherApi = {
  async getAlerts(district?: string): Promise<WeatherAlertItem[]> {
    if (!FORCE_DEMO) {
      try {
        const res = await apiClient.get('/weather/alerts', { params: { district } });
        return res.data.alerts;
      } catch {
        // fallback
      }
    }
    return INITIAL_WEATHER_ALERTS;
  },

  async getForecast(district?: string): Promise<{ location: string; forecast: WeatherForecastDay[] }> {
    if (!FORCE_DEMO) {
      try {
        const res = await apiClient.get('/weather/forecast', { params: { district } });
        return res.data;
      } catch {
        // fallback
      }
    }
    return {
      location: district || 'Kolhapur, Maharashtra',
      forecast: INITIAL_WEATHER_FORECAST
    };
  }
};

// -------------------------------------------------------------
// Notifications API
// -------------------------------------------------------------
export const notificationsApi = {
  async getAll(): Promise<NotificationItem[]> {
    const list = getStored<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    return list;
  },

  async markAsRead(id: string): Promise<void> {
    const list = getStored<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    const updated = list.map(n => n.id === id ? { ...n, read: true } : n);
    setStored(STORAGE_KEYS.NOTIFICATIONS, updated);
  },

  async markAllAsRead(): Promise<void> {
    const list = getStored<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    const updated = list.map(n => ({ ...n, read: true }));
    setStored(STORAGE_KEYS.NOTIFICATIONS, updated);
  }
};

// -------------------------------------------------------------
// Admin API
// -------------------------------------------------------------
export const adminApi = {
  async getAnalytics(): Promise<AdminAnalyticsSummary> {
    if (!FORCE_DEMO) {
      try {
        const res = await apiClient.get('/admin/analytics');
        return res.data.analytics;
      } catch {
        // fallback
      }
    }
    return INITIAL_ANALYTICS;
  },

  async getUsers(): Promise<User[]> {
    if (!FORCE_DEMO) {
      try {
        const res = await apiClient.get('/admin/users');
        return res.data.users;
      } catch {
        // fallback
      }
    }
    return getStored<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  }
};
