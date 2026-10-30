export type CalamityType =
  | 'HEAVY_RAINFALL'
  | 'FLOODING'
  | 'HAILSTORM'
  | 'HIGH_VELOCITY_WINDS'
  | 'DROUGHT'
  | 'PEST_DISEASE'
  | 'UNSEASONAL_WEATHER'
  | 'OTHER';

export type GrowthStage = 'sowing' | 'vegetative' | 'flowering' | 'maturity' | 'harvesting';
export type DamageSeverity = 'mild' | 'moderate' | 'severe';

export interface RecoveryStep {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  completionCriteria: string;
  isImmediateSafety?: boolean;
}

export interface CropRecoveryPlan {
  cropId: string;
  cropName: string;
  calamityType: CalamityType;
  calamityName: string;
  damageOverview: string;
  inspectionChecklist: string[];
  steps: RecoveryStep[];
  precautions: string[];
  recoveryTimeline: string[];
  recoveryIndicators: string[];
  escalationGuidance: string[];
}

export interface CropOption {
  id: string;
  name: string;
  displayName: string;
}

export interface CalamityOption {
  id: string;
  type: CalamityType;
  displayName: string;
}

