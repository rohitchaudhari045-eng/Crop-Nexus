import { DamageCause, ClaimStatus, CompensationStatus } from '@/types';

export const APP_NAME = 'Crop Nexus';

export const CROPS_LIST = [
  'Cotton (Kapas)',
  'Soybean',
  'Wheat (Gehun)',
  'Paddy (Rice)',
  'Sugarcane (Ganna)',
  'Gram / Chickpea (Chana)',
  'Maize (Makka)',
  'Onion (Pyaz)',
  'Pomegranate (Anaar)',
  'Tur / Pigeon Pea',
  'Mustard',
  'Banana',
  'Tomato',
  'Groundnut'
];

export const CROP_TYPES = [
  'Kharif',
  'Rabi',
  'Zaid',
  'Cash Crop',
  'Horticulture / Fruits',
  'Vegetables'
];

export const DISTRICTS_LIST = [
  'Ahmednagar',
  'Akola',
  'Amravati',
  'Aurangabad (Chhatrapati Sambhajinagar)',
  'Beed',
  'Bhandara',
  'Buldhana',
  'Chandrapur',
  'Dhule',
  'Gadchiroli',
  'Gondia',
  'Hingoli',
  'Jalgaon',
  'Jalna',
  'Kolhapur',
  'Latur',
  'Nagpur',
  'Nanded',
  'Nandurbar',
  'Nashik',
  'Osmanabad (Dharashiv)',
  'Parbhani',
  'Pune',
  'Raigad',
  'Ratnagiri',
  'Sangli',
  'Satara',
  'Sindhudurg',
  'Solapur',
  'Thane',
  'Wardha',
  'Washim',
  'Yavatmal'
];

export const DAMAGE_CAUSES: { value: DamageCause; label: string; icon: string; description: string }[] = [
  {
    value: 'heavy_rainfall',
    label: 'Excessive / Heavy Rainfall',
    icon: 'CloudRain',
    description: 'Submerged roots, soil erosion, and plant lodging from torrential downpours'
  },
  {
    value: 'flooding',
    label: 'River / Canal Flooding',
    icon: 'Waves',
    description: 'Prolonged inundation of fields, washed away topsoil and silting'
  },
  {
    value: 'hailstorm',
    label: 'Severe Hailstorm',
    icon: 'CloudHail',
    description: 'Mechanical damage to foliage, flowers, fruit puncture, and stalk breakage'
  },
  {
    value: 'strong_winds',
    label: 'High Velocity Winds / Storm',
    icon: 'Wind',
    description: 'Lodging of standing tall crops like sugarcane, banana, maize, and paddy'
  },
  {
    value: 'drought',
    label: 'Drought / Dry Spell',
    icon: 'Sun',
    description: 'Moisture stress during critical flowering/podding, stunted growth'
  },
  {
    value: 'pest_attack',
    label: 'Severe Pest / Disease Infestation',
    icon: 'Bug',
    description: 'Widespread outbreak exceeding economic threshold limits'
  },
  {
    value: 'unseasonal_rain',
    label: 'Unseasonal Weather Event',
    icon: 'CloudLightning',
    description: 'Sudden rain/dew during harvest and drying periods'
  },
  {
    value: 'other',
    label: 'Other Calamity',
    icon: 'AlertTriangle',
    description: 'Other verified natural or environmental calamity'
  }
];

export const CLAIM_STATUS_MAP: Record<ClaimStatus, { label: string; color: string; bg: string; step: number }> = {
  submitted: { label: 'Submitted', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', step: 1 },
  under_review: { label: 'Under Review', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200', step: 2 },
  inspection_scheduled: { label: 'Inspection Scheduled', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', step: 3 },
  inspected: { label: 'Inspected', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200', step: 4 },
  panchanama_drafted: { label: 'e-Panchanama Drafted', color: 'text-cyan-700', bg: 'bg-cyan-50 border-cyan-200', step: 5 },
  verified: { label: 'Record Verified', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', step: 6 },
  approved: { label: 'Approved for Relief', color: 'text-green-800', bg: 'bg-green-100 border-green-300', step: 7 },
  rejected: { label: 'Rejected', color: 'text-red-700', bg: 'bg-red-50 border-red-200', step: 0 }
};

export const COMPENSATION_STATUS_MAP: Record<CompensationStatus, { label: string; badgeClass: string }> = {
  not_eligible: { label: 'Not Eligible', badgeClass: 'bg-slate-100 text-slate-700 border-slate-300' },
  under_assessment: { label: 'Under Assessment', badgeClass: 'bg-amber-50 text-amber-800 border-amber-200' },
  recommended: { label: 'Officer Recommended', badgeClass: 'bg-blue-50 text-blue-800 border-blue-200' },
  sanctioned: { label: 'Sanctioned', badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  disbursed: { label: 'Disbursed', badgeClass: 'bg-green-100 text-green-900 border-green-300' }
};
