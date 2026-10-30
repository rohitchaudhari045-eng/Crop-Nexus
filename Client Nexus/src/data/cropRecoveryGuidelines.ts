import { CalamityType, CropRecoveryPlan, RecoveryStep, CropOption, CalamityOption } from './recovery/types';
import { cottonPlans } from './recovery/crops/cotton';
import { soybeanPlans } from './recovery/crops/soybean';
import { wheatPlans } from './recovery/crops/wheat';
import { paddyPlans } from './recovery/crops/paddy';
import { sugarcanePlans } from './recovery/crops/sugarcane';
import { gramPlans } from './recovery/crops/gram';
import { maizePlans } from './recovery/crops/maize';
import { onionPlans } from './recovery/crops/onion';
import { pomegranatePlans } from './recovery/crops/pomegranate';
import { turPlans } from './recovery/crops/tur';
import { mustardPlans } from './recovery/crops/mustard';
import { bananaPlans } from './recovery/crops/banana';
import { tomatoPlans } from './recovery/crops/tomato';
import { groundnutPlans } from './recovery/crops/groundnut';

export * from './recovery/types';

export const CROPS_CONFIG: CropOption[] = [
  { id: 'cotton', name: 'Cotton', displayName: 'Cotton (Kapas)' },
  { id: 'soybean', name: 'Soybean', displayName: 'Soybean' },
  { id: 'wheat', name: 'Wheat', displayName: 'Wheat (Gehun)' },
  { id: 'paddy', name: 'Paddy', displayName: 'Paddy (Rice)' },
  { id: 'sugarcane', name: 'Sugarcane', displayName: 'Sugarcane (Ganna)' },
  { id: 'gram', name: 'Gram', displayName: 'Gram / Chickpea (Chana)' },
  { id: 'maize', name: 'Maize', displayName: 'Maize (Makka)' },
  { id: 'onion', name: 'Onion', displayName: 'Onion (Pyaz)' },
  { id: 'pomegranate', name: 'Pomegranate', displayName: 'Pomegranate (Anaar)' },
  { id: 'tur', name: 'Tur', displayName: 'Tur / Pigeon Pea' },
  { id: 'mustard', name: 'Mustard', displayName: 'Mustard' },
  { id: 'banana', name: 'Banana', displayName: 'Banana' },
  { id: 'tomato', name: 'Tomato', displayName: 'Tomato' },
  { id: 'groundnut', name: 'Groundnut', displayName: 'Groundnut' }
];

export const CALAMITIES_CONFIG: CalamityOption[] = [
  { id: 'heavy_rainfall', type: 'HEAVY_RAINFALL', displayName: 'Excessive / Heavy Rainfall' },
  { id: 'flooding', type: 'FLOODING', displayName: 'River / Canal Flooding' },
  { id: 'hailstorm', type: 'HAILSTORM', displayName: 'Severe Hailstorm' },
  { id: 'strong_winds', type: 'HIGH_VELOCITY_WINDS', displayName: 'High Velocity Winds / Storm' },
  { id: 'drought', type: 'DROUGHT', displayName: 'Drought / Dry Spell' },
  { id: 'pest_attack', type: 'PEST_DISEASE', displayName: 'Severe Pest / Disease Infestation' },
  { id: 'unseasonal_rain', type: 'UNSEASONAL_WEATHER', displayName: 'Unseasonal Weather Event' },
  { id: 'other', type: 'OTHER', displayName: 'Other Calamity' }
];

// Master record containing all 112 crop-damage combinations
export const cropRecoveryGuidelines: Record<string, CropRecoveryPlan> = {
  ...cottonPlans,
  ...soybeanPlans,
  ...wheatPlans,
  ...paddyPlans,
  ...sugarcanePlans,
  ...gramPlans,
  ...maizePlans,
  ...onionPlans,
  ...pomegranatePlans,
  ...turPlans,
  ...mustardPlans,
  ...bananaPlans,
  ...tomatoPlans,
  ...groundnutPlans
};

export const normalizeCropId = (input: string): string => {
  if (!input) return 'cotton';
  const clean = input.toLowerCase().trim();

  if (clean.includes('cotton') || clean.includes('kapas')) return 'cotton';
  if (clean.includes('soybean') || clean.includes('soya')) return 'soybean';
  if (clean.includes('wheat') || clean.includes('gehun')) return 'wheat';
  if (clean.includes('paddy') || clean.includes('rice') || clean.includes('dhan')) return 'paddy';
  if (clean.includes('sugarcane') || clean.includes('ganna') || clean.includes('oos')) return 'sugarcane';
  if (clean.includes('gram') || clean.includes('chana') || clean.includes('chickpea')) return 'gram';
  if (clean.includes('maize') || clean.includes('makka')) return 'maize';
  if (clean.includes('onion') || clean.includes('pyaz') || clean.includes('kanda')) return 'onion';
  if (clean.includes('pomegranate') || clean.includes('anaar') || clean.includes('dalimb')) return 'pomegranate';
  if (clean.includes('tur') || clean.includes('arhar') || clean.includes('pigeon')) return 'tur';
  if (clean.includes('mustard') || clean.includes('sarson') || clean.includes('mohari')) return 'mustard';
  if (clean.includes('banana') || clean.includes('kela')) return 'banana';
  if (clean.includes('tomato') || clean.includes('tamatar')) return 'tomato';
  if (clean.includes('groundnut') || clean.includes('peanut') || clean.includes('bhuimug')) return 'groundnut';

  return clean;
};

export const normalizeCalamityId = (input: string): string => {
  if (!input) return 'heavy_rainfall';
  const clean = input.toLowerCase().trim();

  if (clean === 'heavy_rainfall' || clean.includes('excessive') || clean.includes('heavy rain') || clean.includes('heavy_rainfall')) {
    return 'heavy_rainfall';
  }
  if (clean === 'flooding' || clean.includes('flood') || clean.includes('river') || clean.includes('canal')) {
    return 'flooding';
  }
  if (clean === 'hailstorm' || clean.includes('hail')) {
    return 'hailstorm';
  }
  if (clean === 'strong_winds' || clean.includes('wind') || clean.includes('storm') || clean.includes('high_velocity_winds')) {
    return 'strong_winds';
  }
  if (clean === 'drought' || clean.includes('dry spell') || clean.includes('drought')) {
    return 'drought';
  }
  if (clean === 'pest_attack' || clean.includes('pest') || clean.includes('disease') || clean.includes('pest_disease')) {
    return 'pest_attack';
  }
  if (clean === 'unseasonal_rain' || clean.includes('unseasonal') || clean.includes('unseasonal_weather')) {
    return 'unseasonal_rain';
  }
  if (clean === 'other' || clean.includes('other')) {
    return 'other';
  }

  return clean;
};

export const getRecoveryPlan = (cropInput: string, calamityInput: string): CropRecoveryPlan | null => {
  const normCrop = normalizeCropId(cropInput);
  const normCalamity = normalizeCalamityId(calamityInput);
  const key = `${normCrop}__${normCalamity}`;

  const plan = cropRecoveryGuidelines[key];
  if (plan) {
    return plan;
  }

  // Fallback plan if combination is unrecognized
  console.warn(`[CropRecovery] No exact plan for key: "${key}" (from crop "${cropInput}", calamity "${calamityInput}")`);
  return {
    cropId: normCrop,
    cropName: cropInput || 'Unknown Crop',
    calamityType: 'OTHER',
    calamityName: calamityInput || 'Unknown Calamity',
    damageOverview: `Specific recovery plan is currently being finalized for ${cropInput || 'this crop'} under ${calamityInput || 'this damage condition'}. General field safety and drainage should be prioritized.`,
    inspectionChecklist: [
      'Assess waterlogging and identify severely damaged field areas.',
      'Check root crowns and main stems for viability.',
      'Examine whether plants are capable of regeneration or need re-sowing.',
      'Document damage with dated photographs for Panchanama.'
    ],
    steps: [
      {
        id: 'fb-1',
        title: 'Immediate Field Safety & Stagnation Drainage',
        description: 'Open surface drainage channels to evacuate standing water. Ensure personnel safety before entering damaged areas.',
        timeframe: 'Immediate',
        completionCriteria: 'All standing water cleared from root zones.',
        isImmediateSafety: true
      },
      {
        id: 'fb-2',
        title: 'Root Aeration & Soil Loosening',
        description: 'Perform light shallow hoeing as soon as the soil is workable to restore oxygen to suffocating roots.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Soil crust broken without damaging roots.'
      },
      {
        id: 'fb-3',
        title: 'Foliar Nutrient Resuscitation',
        description: 'Spray 19:19:19 (5 g/L) + Micronutrients (2 g/L) to supply direct nutrition to stressed foliage.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Foliar nutrition applied across the plot.'
      },
      {
        id: 'fb-4',
        title: 'Preventive Broad-Spectrum Fungicide Cover',
        description: 'Spray Copper Oxychloride 50 WP (2.5 g/L) or Mancozeb (2 g/L) to prevent secondary opportunistic fungal rots.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Canopy coated with protective fungicide barrier.'
      }
    ],
    precautions: [
      'Do not apply heavy solid nitrogen (urea) while soil is saturated.',
      'Avoid entering fields with active electrical hazards or deep mud pits.'
    ],
    recoveryTimeline: [
      'Day 1–2: Safety check and drainage.',
      'Day 3–5: Root aeration and foliar spray.',
      'Day 6–10: Protective fungicide application.',
      'Week 2–3: Canopy monitoring and secondary growth.'
    ],
    recoveryIndicators: [
      'Appearance of fresh green leaves from terminal or axillary buds.',
      'Absence of foul-smelling rot at root collars.',
      'Restoration of leaf turgor.'
    ],
    escalationGuidance: [
      'Contact your local Taluka Krishi Adhikari (TKA) or nearest Krishi Vigyan Kendra (KVK) for specialized crop rehabilitation guidance.',
      'Request a joint Panchanama if damage exceeds 33% economic threshold.'
    ]
  };
};

export const getAvailableCrops = (): CropOption[] => CROPS_CONFIG;
export const getAvailableCalamities = (): CalamityOption[] => CALAMITIES_CONFIG;
export const getTotalPlansCount = (): number => Object.keys(cropRecoveryGuidelines).length;

