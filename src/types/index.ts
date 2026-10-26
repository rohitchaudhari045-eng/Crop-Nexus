// Crop Nexus TypeScript Type Definitions

export type UserRole = 'farmer' | 'officer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  district?: string;
  village?: string;
  aadhaarLast4?: string;
  assignedJurisdiction?: string; // for officers
  badgeNumber?: string; // for officers
  createdAt: string;
}

export type DamageCause = 
  | 'heavy_rainfall' 
  | 'flooding' 
  | 'drought' 
  | 'hailstorm' 
  | 'strong_winds' 
  | 'pest_attack' 
  | 'unseasonal_rain'
  | 'other';

export type ClaimStatus = 
  | 'submitted' 
  | 'under_review' 
  | 'inspection_scheduled' 
  | 'inspected' 
  | 'panchanama_drafted' 
  | 'verified' 
  | 'approved' 
  | 'rejected';

export type CompensationStatus = 
  | 'not_eligible' 
  | 'under_assessment' 
  | 'recommended' 
  | 'sanctioned' 
  | 'disbursed';

export interface PhotoAttachment {
  id: string;
  url: string;
  name: string;
  uploadedAt: string;
  sizeBytes?: number;
  latitude?: number;
  longitude?: number;
  caption?: string;
}

export interface CropDamageReportInput {
  farmerName: string;
  farmerPhone: string;
  cropName: string;
  cropType: string; // Kharif, Rabi, Zaid, Cash Crop, Horticulture
  state: string;
  district: string;
  taluka: string;
  village: string;
  surveyNumber: string;
  totalLandAreaAcre: number;
  affectedAreaAcre: number;
  damageDate: string;
  damageCause: DamageCause;
  estimatedLossPercentage: number;
  damageDescription: string;
  photos: PhotoAttachment[];
}

export interface ClaimRecord extends CropDamageReportInput {
  id: string;
  claimNumber: string; // e.g. CN-2026-MH-0842
  userId: string;
  submissionDate: string;
  status: ClaimStatus;
  compensationStatus: CompensationStatus;
  estimatedCompensationAmount?: number;
  sanctionedCompensationAmount?: number;
  officerAssignedId?: string;
  officerAssignedName?: string;
  inspectionDate?: string;
  statusHistory: {
    status: ClaimStatus;
    timestamp: string;
    remarks: string;
    updatedBy: string;
  }[];
}

export interface InspectionRecord {
  id: string;
  claimId: string;
  claimNumber: string;
  officerId: string;
  officerName: string;
  inspectionDate: string;
  gpsCoordinates?: {
    latitude: number;
    longitude: number;
  };
  verifiedCrop: string;
  verifiedSurveyNumber: string;
  verifiedAffectedAreaAcre: number;
  assessedLossPercentage: number;
  damageCauseConfirmed: DamageCause;
  officerObservations: string;
  cropGrowthStage: 'sowing' | 'vegetative' | 'flowering' | 'maturity' | 'harvesting';
  evidencePhotos: PhotoAttachment[];
  recommendation: 'approve_full' | 'approve_partial' | 'reject' | 're_inspection_needed';
  recommendedCompensationAmount?: number;
  status: 'draft' | 'submitted' | 'finalized';
  createdAt: string;
}

export interface PanchanamaWitness {
  name: string;
  aadhaarLast4?: string;
  village: string;
  contactNumber?: string;
}

export interface EPanchanamaDocument {
  id: string;
  reportNumber: string; // e.g. EPN-2026-MH-492
  claimId: string;
  claimNumber: string;
  dateGenerated: string;
  district: string;
  taluka: string;
  village: string;
  surveyNumber: string;
  farmerName: string;
  farmerPhone: string;
  cropName: string;
  cropVariety?: string;
  sowingDate?: string;
  calamityType: string;
  calamityDate: string;
  totalAreaAcre: number;
  affectedAreaAcre: number;
  damagePercentage: number;
  officerName: string;
  officerDesignation: string;
  officerOffice: string;
  officerSignatureDate?: string;
  findingsSummary: string;
  witnesses: PanchanamaWitness[];
  isDraft: boolean;
  officialDisclaimer: string;
}

export interface WeatherAlertItem {
  id: string;
  severity: 'low' | 'moderate' | 'high' | 'severe';
  category: 'heavy_rainfall' | 'hailstorm' | 'strong_wind' | 'heatwave' | 'frost' | 'flood';
  title: string;
  description: string;
  affectedDistricts: string[];
  validFrom: string;
  validUntil: string;
  advisorySteps: string[];
  source: string;
}

export interface WeatherForecastDay {
  date: string;
  tempMaxC: number;
  tempMinC: number;
  condition: string;
  icon: string;
  humidityPct: number;
  rainfallProbabilityPct: number;
  windSpeedKmh: number;
}

export interface CropRecoveryItem {
  id: string;
  cropName: string;
  damageType: DamageCause;
  symptoms: string[];
  immediateSteps: string[];
  soilAndNutrientManagement: string[];
  waterAndDrainageCare: string[];
  fungicideAndPestManagement: string[];
  expertConsultationCriteria: string[];
  cautionNotes: string[];
}

export interface CropRecoveryProgressRecord {
  id: string;
  claimId?: string;
  farmerId: string;
  cropName: string;
  stageName: string;
  updateDate: string;
  notes: string;
  healthRating: number; // 1 to 5 stars
  beforePhotoUrl?: string;
  afterPhotoUrl?: string;
  milestoneReached: boolean;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'claim_update' | 'weather_alert' | 'inspection' | 'recovery' | 'system';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface AdminAnalyticsSummary {
  totalClaims: number;
  pendingInspection: number;
  inspectedClaims: number;
  approvedClaims: number;
  totalFarmers: number;
  totalOfficers: number;
  estimatedTotalLossAcre: number;
  claimsByCrop: { crop: string; count: number; lossAcre: number }[];
  claimsByCause: { cause: string; count: number }[];
  claimsByStatus: { status: string; count: number }[];
  monthlyTrend: { month: string; claims: number; compensationLaksh: number }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}
