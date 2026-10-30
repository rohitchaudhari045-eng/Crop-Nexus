import {
  User,
  ClaimRecord,
  CropDamageReportInput,
  InspectionRecord,
  EPanchanamaDocument,
  NotificationItem,
  CropRecoveryItem,
  CropRecoveryProgressRecord,
  WeatherAlertItem,
  LoginCredentials,
  FarmerRegistrationData,
  AuthResponse
} from '@/types';
import {
  INITIAL_USERS,
  INITIAL_CLAIMS,
  INITIAL_INSPECTIONS,
  INITIAL_PANCHANAMA,
  INITIAL_NOTIFICATIONS,
  INITIAL_RECOVERY_ITEMS,
  INITIAL_RECOVERY_PROGRESS,
  INITIAL_WEATHER_ALERTS
} from '@/services/mockData';

const STORAGE_KEYS = {
  USERS: 'crop_nexus_fixture_users',
  CLAIMS: 'crop_nexus_fixture_claims',
  INSPECTIONS: 'crop_nexus_fixture_inspections',
  PANCHANAMA: 'crop_nexus_fixture_panchanama',
  NOTIFICATIONS: 'crop_nexus_fixture_notifications',
  RECOVERY_PROGRESS: 'crop_nexus_fixture_recovery',
};

function getFixture<T>(key: string, initial: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw) as T;
  } catch {
    return initial;
  }
}

function saveFixture<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save fixture state:', e);
  }
}

export const mockAdapter = {
  // Authentication: Role is determined strictly by the user account record, NOT by user input!
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const users = getFixture<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    const identifier = credentials.emailOrPhone.trim().toLowerCase();

    // Look for matching user by email or phone
    const matched = users.find(
      (u) =>
        u.email.toLowerCase() === identifier ||
        u.phone.replace(/\s+/g, '').includes(identifier.replace(/\s+/g, ''))
    );

    if (!matched) {
      // If neither exact email nor phone matched, throw an authentication error
      throw new Error('Invalid email or mobile number. Please check your credentials or register.');
    }

    const token = `cn_jwt_preview_${matched.id}_${Date.now()}`;
    return { token, user: matched };
  },

  async registerFarmer(data: FarmerRegistrationData): Promise<AuthResponse> {
    const users = getFixture<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    const existing = users.find(
      (u) =>
        u.email.toLowerCase() === data.email.toLowerCase() ||
        u.phone.replace(/\s+/g, '') === data.phone.replace(/\s+/g, '')
    );

    if (existing) {
      throw new Error('An account with this email or mobile number already exists.');
    }

    const newUser: User = {
      id: `usr-farmer-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'farmer',
      district: data.district,
      taluka: data.taluka || '',
      village: data.village,
      preferredLanguage: data.preferredLanguage || 'en',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveFixture(STORAGE_KEYS.USERS, users);

    const token = `cn_jwt_preview_${newUser.id}_${Date.now()}`;
    return { token, user: newUser };
  },

  async getCurrentUser(token: string): Promise<User | null> {
    const users = getFixture<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    // Find from active user in localStorage or first matching
    const savedUser = localStorage.getItem('crop_nexus_active_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser) as User;
      } catch {
        // ignore
      }
    }
    return users[0] || null;
  },

  // Damage Reports / Claims
  async getClaims(filter?: { status?: string; search?: string; userId?: string }): Promise<ClaimRecord[]> {
    let claims = getFixture<ClaimRecord[]>(STORAGE_KEYS.CLAIMS, INITIAL_CLAIMS);

    if (filter?.userId) {
      claims = claims.filter((c) => c.userId === filter.userId);
    }
    if (filter?.status && filter.status !== 'all') {
      claims = claims.filter((c) => c.status === filter.status);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      claims = claims.filter(
        (c) =>
          c.claimNumber.toLowerCase().includes(q) ||
          c.cropName.toLowerCase().includes(q) ||
          c.farmerName.toLowerCase().includes(q) ||
          c.village.toLowerCase().includes(q) ||
          c.surveyNumber.toLowerCase().includes(q)
      );
    }
    return claims;
  },

  async getClaimById(id: string): Promise<ClaimRecord | null> {
    const claims = getFixture<ClaimRecord[]>(STORAGE_KEYS.CLAIMS, INITIAL_CLAIMS);
    return claims.find((c) => c.id === id || c.claimNumber === id) || null;
  },

  async createClaim(input: CropDamageReportInput, user: User): Promise<ClaimRecord> {
    const claims = getFixture<ClaimRecord[]>(STORAGE_KEYS.CLAIMS, INITIAL_CLAIMS);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const claimNumber = `CN-2026-MH-${randomSuffix}`;
    const newId = `clm-${Date.now().toString().slice(-4)}`;

    const newClaim: ClaimRecord = {
      ...input,
      id: newId,
      claimNumber,
      userId: user.id,
      submissionDate: new Date().toISOString(),
      status: 'submitted',
      compensationStatus: 'under_assessment',
      estimatedCompensationAmount: Math.round(input.affectedAreaAcre * 18000),
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
    saveFixture(STORAGE_KEYS.CLAIMS, claims);

    // Also trigger notification
    const notifs = getFixture<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    notifs.unshift({
      id: `notif-${Date.now()}`,
      userId: user.id,
      title: 'Crop Damage Report Submitted',
      message: `Your report ${claimNumber} for ${input.cropName} on Gut ${input.surveyNumber} has been recorded.`,
      type: 'claim_update',
      read: false,
      createdAt: new Date().toISOString(),
      actionUrl: `/claims/${newId}`
    });
    saveFixture(STORAGE_KEYS.NOTIFICATIONS, notifs);

    return newClaim;
  },

  async updateClaimStatus(id: string, status: any, remarks: string, updatedBy: string): Promise<ClaimRecord | null> {
    const claims = getFixture<ClaimRecord[]>(STORAGE_KEYS.CLAIMS, INITIAL_CLAIMS);
    const idx = claims.findIndex((c) => c.id === id);
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
    saveFixture(STORAGE_KEYS.CLAIMS, claims);
    return claim;
  },

  // Inspections
  async getInspections(): Promise<InspectionRecord[]> {
    return getFixture<InspectionRecord[]>(STORAGE_KEYS.INSPECTIONS, INITIAL_INSPECTIONS);
  },

  async getInspectionByClaimId(claimId: string): Promise<InspectionRecord | null> {
    const list = getFixture<InspectionRecord[]>(STORAGE_KEYS.INSPECTIONS, INITIAL_INSPECTIONS);
    return list.find((i) => i.claimId === claimId) || null;
  },

  async submitInspection(data: Omit<InspectionRecord, 'id' | 'createdAt'>): Promise<InspectionRecord> {
    const list = getFixture<InspectionRecord[]>(STORAGE_KEYS.INSPECTIONS, INITIAL_INSPECTIONS);
    const record: InspectionRecord = {
      ...data,
      id: `insp-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString()
    };
    list.unshift(record);
    saveFixture(STORAGE_KEYS.INSPECTIONS, list);

    // Update claim status
    const targetStatus = data.nextStatus || 'panchanama_drafted';
    const remarks = data.officerRemarks || `Field spot inspection recorded by ${data.officerName}. Assessed loss: ${data.assessedLossPercentage}%.`;
    await mockAdapter.updateClaimStatus(
      data.claimId,
      targetStatus,
      remarks,
      data.officerName
    );

    return record;
  },

  // Panchanama
  async getPanchanamaByClaimId(claimId: string): Promise<EPanchanamaDocument | null> {
    const list = getFixture<EPanchanamaDocument[]>(STORAGE_KEYS.PANCHANAMA, INITIAL_PANCHANAMA);
    return list.find((p) => p.claimId === claimId) || null;
  },

  async generateDraftPanchanama(
    claim: ClaimRecord,
    inspection?: InspectionRecord,
    officerName = 'Suresh Deshmukh'
  ): Promise<EPanchanamaDocument> {
    const list = getFixture<EPanchanamaDocument[]>(STORAGE_KEYS.PANCHANAMA, INITIAL_PANCHANAMA);
    const existing = list.find((p) => p.claimId === claim.id);
    if (existing) return existing;

    const draftNum = `EPN-2026-MH-${claim.claimNumber.split('-')[3] || '991'}-DRAFT`;
    const doc: EPanchanamaDocument = {
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
      cropVariety: 'Certified Cultivar',
      sowingDate: '2026-06-25',
      calamityType: claim.damageCause.replace(/_/g, ' ').toUpperCase(),
      calamityDate: claim.damageDate,
      totalAreaAcre: claim.totalLandAreaAcre,
      affectedAreaAcre: inspection?.verifiedAffectedAreaAcre || claim.affectedAreaAcre,
      damagePercentage: inspection?.assessedLossPercentage || claim.estimatedLossPercentage,
      officerName,
      officerDesignation: 'Circle Agriculture Inspector',
      officerOffice: `${claim.taluka} Taluka Agriculture Office`,
      officerSignatureDate: new Date().toISOString().split('T')[0],
      findingsSummary:
        inspection?.officerObservations ||
        `Joint spot physical inspection conducted for Survey/Gat ${claim.surveyNumber} in village ${claim.village} in presence of local Panchas. Visual confirmation of damage due to ${claim.damageCause.replace(/_/g, ' ')}.`,
      witnesses: [
        { name: 'Vilas Maruti Kadam', aadhaarLast4: '3412', village: claim.village, contactNumber: '+91 94231 66778' },
        { name: 'Pandurang Sitaram Mane', aadhaarLast4: '9105', village: claim.village, contactNumber: '+91 98222 34567' }
      ],
      isDraft: true,
      officialDisclaimer:
        'PROVISIONAL DRAFT REPORT: This digital e-Panchanama draft is generated through Crop Nexus for administrative compilation and digital field review. It does not constitute a final government sanction until countersigned by the competent revenue authority.'
    };

    list.unshift(doc);
    saveFixture(STORAGE_KEYS.PANCHANAMA, list);

    await mockAdapter.updateClaimStatus(
      claim.id,
      'panchanama_drafted',
      `Draft e-Panchanama generated: ${draftNum}`,
      officerName
    );

    return doc;
  },

  async updateDraftPanchanama(id: string, updates: Partial<EPanchanamaDocument>): Promise<EPanchanamaDocument | null> {
    const list = getFixture<EPanchanamaDocument[]>(STORAGE_KEYS.PANCHANAMA, INITIAL_PANCHANAMA);
    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) return null;

    list[idx] = { ...list[idx], ...updates };
    saveFixture(STORAGE_KEYS.PANCHANAMA, list);
    return list[idx];
  },

  // Recovery & Weather
  async getAdvisories(): Promise<CropRecoveryItem[]> {
    return INITIAL_RECOVERY_ITEMS;
  },

  async getProgressRecords(farmerId?: string): Promise<CropRecoveryProgressRecord[]> {
    const list = getFixture<CropRecoveryProgressRecord[]>(STORAGE_KEYS.RECOVERY_PROGRESS, INITIAL_RECOVERY_PROGRESS);
    if (farmerId) return list.filter((r) => r.farmerId === farmerId);
    return list;
  },

  async addProgressRecord(record: Omit<CropRecoveryProgressRecord, 'id'>): Promise<CropRecoveryProgressRecord> {
    const list = getFixture<CropRecoveryProgressRecord[]>(STORAGE_KEYS.RECOVERY_PROGRESS, INITIAL_RECOVERY_PROGRESS);
    const newEntry: CropRecoveryProgressRecord = {
      ...record,
      id: `recp-${Date.now().toString().slice(-4)}`
    };
    list.unshift(newEntry);
    saveFixture(STORAGE_KEYS.RECOVERY_PROGRESS, list);
    return newEntry;
  },

  async getWeatherAlerts(district?: string): Promise<WeatherAlertItem[]> {
    return INITIAL_WEATHER_ALERTS;
  },

  // Notifications
  async getNotifications(): Promise<NotificationItem[]> {
    return getFixture<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  },

  async markNotificationRead(id: string): Promise<void> {
    const list = getFixture<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    saveFixture(
      STORAGE_KEYS.NOTIFICATIONS,
      list.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  },

  async markAllNotificationsRead(): Promise<void> {
    const list = getFixture<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    saveFixture(
      STORAGE_KEYS.NOTIFICATIONS,
      list.map((n) => ({ ...n, read: true }))
    );
  }
};
