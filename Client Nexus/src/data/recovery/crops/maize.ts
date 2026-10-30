import { CropRecoveryPlan } from '../types';

export const maizePlans: Record<string, CropRecoveryPlan> = {
  maize__heavy_rainfall: {
    cropId: 'maize',
    cropName: 'Maize (Makka)',
    calamityType: 'HEAVY_RAINFALL',
    calamityName: 'Excessive / Heavy Rainfall',
    damageOverview:
      'Waterlogging in maize, particularly at knee-high stage (25-35 DAS), causes severe root suffocation, purpling or yellowing of leaves (phosphorus/nitrogen deficiency), stunted growth, and rots adventitious brace roots.',
    inspectionChecklist: [
      'Check furrow depth and standing water stagnation between maize rows.',
      'Inspect brace (prop) roots at the bottom 1-2 stem nodes for rotting.',
      'Look for leaf purpling starting from leaf margins (phosphorus deficiency from root suffocation).',
      'Examine leaf whorls for water stagnation or soft rotting.',
      'Check for banded leaf and sheath blight lesions near the ground line.'
    ],
    steps: [
      {
        id: 'mz-hr-1',
        title: 'Immediate Furrow Drainage',
        description: 'Open furrow ends and cut border drains to evacuate all surface water within 24 hours. Maize cannot tolerate standing water around its stem collar.',
        timeframe: 'First 24 hours',
        completionCriteria: 'No standing water between maize ridges; drainage flowing freely.',
        isImmediateSafety: true
      },
      {
        id: 'mz-hr-2',
        title: 'Earthing Up & Brace Root Anchorage',
        description: 'As soon as soil allows, pull soil from furrows onto ridges around the plant base (earthing up) to support brace roots and prevent lodging.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Soil mounded 10-15 cm around stem base; brace roots covered.'
      },
      {
        id: 'mz-hr-3',
        title: 'Foliar Nitrogen & Zinc Resuscitation',
        description: 'Spray 2% Urea (20 g/L) + 0.5% Zinc Sulphate (5 g/L) to immediately correct nitrogen leaching and waterlogging chlorosis through the leaves.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Canopy wetted thoroughly; leaf greenness restored.'
      },
      {
        id: 'mz-hr-4',
        title: 'Top-dress Nitrogen & Potash',
        description: 'Top-dress 30-35 kg Urea along with 15 kg MOP per acre once the soil surface dries to stimulate active growth and cob development.',
        timeframe: 'Day 6–8',
        completionCriteria: 'Nutrients banded along maize rows and covered lightly.'
      },
      {
        id: 'mz-hr-5',
        title: 'Preventive Sheath Blight Spray',
        description: 'Spray Azoxystrobin 18.2% + Difenoconazole 11.4% SC (1 ml/L) or Validamycin 3L (2 ml/L) directed at the lower stem and sheath to prevent banded leaf blight.',
        timeframe: 'Day 8–12',
        completionCriteria: 'Lower stem sheaths covered with protective fungicide.'
      }
    ],
    precautions: [
      'Do not apply solid urea while water is standing in furrows; this causes severe root burning.',
      'Do not allow mud to remain inside the central leaf whorl.'
    ],
    recoveryTimeline: [
      'Day 1–2: Drain all surface water from furrows.',
      'Day 3–4: Earthing up and brace root anchorage.',
      'Day 5–8: Foliar feeding and nitrogen top-dressing.',
      'Week 2–3: Rapid stem elongation and cob initiation.'
    ],
    recoveryIndicators: [
      'Leaves regain deep green hue; purpling disappears.',
      'Brace roots anchor firmly into the soil.',
      'Vigorous unfurling of new leaves from the central whorl.',
      'Stems remain upright and sturdy.'
    ],
    escalationGuidance: [
      'If banded leaf and sheath blight affects more than 25% of plants, consult the KVK plant pathologist immediately.',
      'Report continuous drainage blockages to the local Irrigation Department.'
    ]
  },

  maize__flooding: {
    cropId: 'maize',
    cropName: 'Maize (Makka)',
    calamityType: 'FLOODING',
    calamityName: 'River / Canal Flooding',
    damageOverview:
      'River or canal flooding submerges maize fields, depositing fine clay silt into the central leaf whorl, suffocating the growing tip, rotting prop roots, and causing extensive lodging.',
    inspectionChecklist: [
      'Determine hours of complete submergence.',
      'Check whether the central leaf whorl is filled with silt mud or decaying.',
      'Examine the condition of prop roots at the lower nodes.',
      'Count surviving live plants per square meter (aim for 5-6 plants/sq.m for optimum yield).',
      'Inspect for uprooted or lodged stalks.'
    ],
    steps: [
      {
        id: 'mz-fl-1',
        title: 'Safe Field Entry & Evacuate Water',
        description: 'Cut exit channels in field bunds to completely drain flood water. Expose plants to sunlight and fresh air.',
        timeframe: 'Day 1–2',
        completionCriteria: 'All flood water drained; mud surface exposed.',
        isImmediateSafety: true
      },
      {
        id: 'mz-fl-2',
        title: 'Flush Silt Mud from Central Leaf Whorl',
        description: 'Using a high-pressure knapsack sprayer with clean water, spray directly into the central whorls to wash out trapped silt mud before it rots the apical bud.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Central leaf whorls cleared of silt; green growing tip exposed.'
      },
      {
        id: 'mz-fl-3',
        title: 'Manual Uprighting & Earthing Up',
        description: 'Gently lift tilted stalks while soil is damp and pliable. Mound soil firmly around the base to anchor exposed prop roots.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Stalks positioned upright; roots covered with soil.'
      },
      {
        id: 'mz-fl-4',
        title: 'Foliar Energy & Nutrient Feeding',
        description: 'Spray 19:19:19 (10 g/L) + Zinc chelate (1 g/L) to nourish plants whose root functions have been temporarily suspended.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Foliar nutrition applied; leaves showing renewed turgor.'
      },
      {
        id: 'mz-fl-5',
        title: 'Bacterial Stalk Rot Preventative Drench',
        description: 'Drench or spray stem bases with Bleaching powder (10 g/L) or Copper Oxychloride (2.5 g/L) + Streptocycline (1 g/10 L) to prevent bacterial stalk rot.',
        timeframe: 'Day 6–8',
        completionCriteria: 'Stem bases drenched; bacterial rot prevented.'
      }
    ],
    precautions: [
      'Do not bend or force brittle lodged stalks when soil is dry, as they snap easily.',
      'Do not apply solid fertilizers until active white roots are visible.'
    ],
    recoveryTimeline: [
      'Day 1–3: Drainage, whorl flushing, and plant uprighting.',
      'Day 4–7: Foliar feeding and bacterial stalk rot prevention.',
      'Week 2: Soil crust breaking and root recovery.',
      'Week 3–4: Resumption of vegetative growth and tasseling.'
    ],
    recoveryIndicators: [
      'Bright green leaves emerging from central whorl.',
      'Fresh white prop roots anchoring into the soil.',
      'Absence of foul-smelling bacterial stalk rot.',
      'Stalks standing firmly upright.'
    ],
    escalationGuidance: [
      'If plant population drops below 3 plants/sq.m, consult KVK for resowing or catch crops.',
      'Report complete flood loss for disaster relief assessment.'
    ]
  },

  maize__hailstorm: {
    cropId: 'maize',
    cropName: 'Maize (Makka)',
    calamityType: 'HAILSTORM',
    calamityName: 'Severe Hailstorm',
    damageOverview:
      'Hail impact shreds broad maize leaves to bare midribs, snaps tassels, bruises stalks, punctures cobs, and breaks the central growing tip.',
    inspectionChecklist: [
      'Assess defoliation percentage across the canopy.',
      'Check whether the central whorl / growing point is destroyed or intact.',
      'Inspect developing cobs for punctured husks and bruised kernels.',
      'Examine tassels for physical breakage during pollination.',
      'Check stalks for deep hail bruises and split internodes.'
    ],
    steps: [
      {
        id: 'mz-hl-1',
        title: 'Wound Disinfection Spray',
        description: 'Within 24-48 hours, spray Copper Oxychloride 50 WP (2.5 g/L) + Streptocycline (1 g per 10 L) across the canopy to prevent fungal and bacterial entry into bruised tissues.',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'All shredded leaves and bruised stalks coated with protective spray.',
        isImmediateSafety: false
      },
      {
        id: 'mz-hl-2',
        title: 'Foliar Energy & Nutrient Feeding',
        description: 'Spray 19:19:19 (10 g/L) + Micronutrient mixture (2.5 g/L) to supply immediate foliar nutrition and stimulate new leaf expansion from intact whorls.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Foliar nutrition applied; leaf expansion stimulated.'
      },
      {
        id: 'mz-hl-3',
        title: 'Balanced Top-dressing for Canopy Rebuilding',
        description: 'Apply 25-30 kg Urea per acre once new leaves begin emerging from the central whorl to supply the energy needed to regenerate foliage.',
        timeframe: 'Day 5–8',
        completionCriteria: 'Fertilizer placed along rows and lightly incorporated.'
      },
      {
        id: 'mz-hl-4',
        title: 'Fodder Salvage (If Cob Damage >80%)',
        description: 'If crop was near milking/dough stage and cobs are completely smashed, harvest the crop immediately for nutritious green cattle fodder or silage.',
        timeframe: 'Day 5–10',
        completionCriteria: 'Green crop harvested and chopped for livestock feeding.'
      }
    ],
    precautions: [
      'Do not uproot maize plants if the central growing point inside the whorl is still green and alive.',
      'Avoid high nitrogen application if hail occurred at dough stage.'
    ],
    recoveryTimeline: [
      'Day 1–2: Wound disinfection spray.',
      'Day 3–5: Foliar feeding and damage triage.',
      'Day 6–10: Top-dressing and new leaf expansion.',
      'Week 3–4: Maturation of surviving cobs.'
    ],
    recoveryIndicators: [
      'New, intact green leaves unfurl smoothly from the central whorl.',
      'Hail bruises on stalks dry out and callous over without rot.',
      'Unpunctured cobs continue grain filling.',
      'Canopy shading re-established.'
    ],
    escalationGuidance: [
      'If hail struck during peak pollination and destroyed tassels on more than 70% of plants, request an emergency revenue-agriculture Panchanama.',
      'Consult KVK on silage making from hail-damaged maize.'
    ]
  },

  maize__strong_winds: {
    cropId: 'maize',
    cropName: 'Maize (Makka)',
    calamityType: 'HIGH_VELOCITY_WINDS',
    calamityName: 'High Velocity Winds / Storm',
    damageOverview:
      'High velocity winds cause lodging of tall, top-heavy maize plants (especially during tasseling and cob development), snapping brittle stalks, uprooting prop roots, and disrupting pollination.',
    inspectionChecklist: [
      'Determine angle and severity of lodging across the field.',
      'Check whether stalks are snapped at internodes or simply leaning from roots.',
      'Inspect cobs for contact with damp soil.',
      'Check whether tassels and silks are intact for pollination.',
      'Assess whether lower leaves in the lodged mat are rotting.'
    ],
    steps: [
      {
        id: 'mz-sw-1',
        title: 'Gentle Stalk Repositioning & Earthing Up',
        description: 'If plants are leaning (not snapped), gently lift stalks while soil is damp and mound 15-20 cm of soil firmly around the base to anchor prop roots.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Leaning stalks repositioned upright and anchored with soil.'
      },
      {
        id: 'mz-sw-2',
        title: 'Do Not Attempt Forceful Lifting of Snapped Stalks',
        description: 'Do not attempt to pull snapped or brittle stalks upright; let surviving plants curve naturally toward the sun (phototropism).',
        timeframe: 'Day 1–2',
        completionCriteria: 'Severely lodged stalks left undisturbed to curve naturally.'
      },
      {
        id: 'mz-sw-3',
        title: 'Open Furrows for Canopy Aeration & Drainage',
        description: 'Clear inter-row furrows to drain any trapped water and improve air circulation beneath the lodged canopy to prevent cob rot.',
        timeframe: 'Day 2–4',
        completionCriteria: 'No standing water beneath lodged canopy; air moving through furrows.'
      },
      {
        id: 'mz-sw-4',
        title: 'Preventive Spray for Cob & Stalk Rot',
        description: 'Spray Azoxystrobin + Difenoconazole (1 ml/L) or Carbendazim (1 g/L) to prevent fungal ear rot on lodged cobs.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Canopy and cobs wetted with protective fungicide.'
      }
    ],
    precautions: [
      'Never walk heavily over lodged maize; walking crushes developing cobs into the soil.',
      'Do not apply additional heavy nitrogen to lodged maize.'
    ],
    recoveryTimeline: [
      'Day 1–3: Leaning stalk repositioning and earthing up.',
      'Day 3–6: Aeration and cob rot preventive spray.',
      'Day 7–10: Natural tassel/cob curvature and grain filling.',
      'Week 3–4: Maturation of surviving cobs.'
    ],
    recoveryIndicators: [
      'Stalk tops and cobs curve upward away from the soil.',
      'Grains fill out smoothly without fungal mold.',
      'Prop roots anchor firmly into the soil.',
      'Absence of ear rot on developing cobs.'
    ],
    escalationGuidance: [
      'If storm winds caused snapping on more than 50% of plants during pollination, contact the Agriculture Assistant for loss assessment under PMFBY.',
      'Consult KVK on harvesting lodged maize with adjusted combine reels.'
    ]
  },

  maize__drought: {
    cropId: 'maize',
    cropName: 'Maize (Makka)',
    calamityType: 'DROUGHT',
    calamityName: 'Drought / Dry Spell',
    damageOverview:
      'Moisture stress during tasseling and silking causes "tassel blast" (pollen sterility), delayed silking leading to poor synchronization (nicking failure), extensive cob barrenness, and stunted cobs with missing kernels.',
    inspectionChecklist: [
      'Check soil moisture in the root zone (top 20 cm).',
      'Observe leaf rolling during morning hours.',
      'Inspect synchronization: are fresh yellow tassels shedding pollen while green moist silks are receptive?',
      'Check for dried brown silks before pollination occurred.',
      'Examine developing cobs: peel husk on 10 cobs to check for kernel fertilization.'
    ],
    steps: [
      {
        id: 'mz-dr-1',
        title: 'Critical Stage Life-Saving Irrigation',
        description: 'Prioritize irrigation for the most critical stages: Tasseling / Silking (50-60 DAS) and Grain Filling (70-80 DAS). Maize cannot tolerate moisture stress during pollination.',
        timeframe: 'Immediate',
        completionCriteria: 'Root zone saturated; plants recover turgor by morning.'
      },
      {
        id: 'mz-dr-2',
        title: 'Foliar Potassium Nitrate (KNO3) Spray',
        description: 'Spray 1% Potassium Nitrate (13:00:45 @ 10 g/L) across the canopy to maintain cell turgor, prolong pollen viability, and keep silks moist.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Canopy sprayed thoroughly in early morning hours.'
      },
      {
        id: 'mz-dr-3',
        title: 'Dust Mulching in Furrows',
        description: 'Run a shallow blade hoe lightly between rows to break capillary pores and create a loose surface dust layer that conserves deep soil moisture.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Dust mulch established; inter-row weeds eliminated.'
      },
      {
        id: 'mz-dr-4',
        title: 'Night / Evening Irrigation Scheduling',
        description: 'Apply water exclusively during night or late evening hours to minimize evaporation losses and cool the crop canopy.',
        timeframe: 'Day 5 onwards',
        completionCriteria: 'Water applied with maximum cooling and absorption efficiency.'
      }
    ],
    precautions: [
      'Never allow maize to experience moisture stress during the 10 days of peak tasseling and silking.',
      'Do not apply solid urea without adequate soil moisture; it will burn leaf margins.'
    ],
    recoveryTimeline: [
      'Day 1–2: Critical stage irrigation and foliar potassium spray.',
      'Day 3–5: Dust mulching and moisture conservation.',
      'Day 6–10: Evening irrigation scheduling and synchronization monitoring.',
      'Week 2–3: Kernel fertilization and grain filling.'
    ],
    recoveryIndicators: [
      'Leaves remain flat and open through midday without rolling.',
      'Silks emerge moist, pink/green, and receptive to pollen.',
      'Kernels develop uniformly from the base to the tip of cobs.',
      'Absence of barren or blank cobs.'
    ],
    escalationGuidance: [
      'If drought caused complete tassel blast and cob barrenness across more than 50% of the crop, notify the District Agriculture Officer for PMFBY drought survey.',
      'Consult KVK on drought-tolerant hybrids (e.g., DHM 117, NK 6240) for future seasons.'
    ]
  },

  maize__pest_attack: {
    cropId: 'maize',
    cropName: 'Maize (Makka)',
    calamityType: 'PEST_DISEASE',
    calamityName: 'Severe Pest / Disease Infestation',
    damageOverview:
      'Devastating outbreak of Fall Armyworm (FAW - Spodoptera frugiperda), Stem Borer (Chilo partellus), Banded Leaf and Sheath Blight, or Maydis Leaf Blight causing windowing of leaves, heavy whorl feeding, and boring into cobs.',
    inspectionChecklist: [
      'Inspect central leaf whorls for window-pane feeding and heavy sawdust-like frass (characteristic of FAW).',
      'Look for FAW larvae inside the whorl: inverted "Y" mark on head capsule and 4 square spots on 8th abdominal segment.',
      'Check developing cobs for boreholes through husk leaves and damaged silk.',
      'Count percentage of infested plants (ETL: 10% damaged plants at seedling; 20% at knee-high; 10% at tasseling).',
      'Inspect stem base for dead hearts and borer entrance holes.'
    ],
    steps: [
      {
        id: 'mz-pt-1',
        title: 'Manual Egg Mass & Larval Crushing',
        description: 'Handpick and crush FAW egg masses (covered in grey felt-like scales) and large larvae visible in leaf whorls.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Egg masses and visible larvae crushed in affected rows.',
        isImmediateSafety: false
      },
      {
        id: 'mz-pt-2',
        title: 'Whorl Application of Sand + Lime / Bio-agent',
        description: 'Apply a mixture of fine sand and agricultural lime (9:1 ratio) or neem cake powder directly into the central leaf whorl. Sand abrades larval cuticles and kills caterpillars mechanically.',
        timeframe: 'Day 2–3',
        completionCriteria: 'All leaf whorls treated with sand mixture.'
      },
      {
        id: 'mz-pt-3',
        title: 'Targeted Insecticide per KVK Guidelines',
        description: 'Spray Chlorantraniliprole 18.5 SC (0.4 ml/L) or Emamectin Benzoate 5 SG (0.4 g/L) or Spinetoram 11.7 SC (0.5 ml/L) targeting the nozzle directly into the central leaf whorl.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Liquid insecticide delivered directly into the whorl cavity; larval mortality verified.'
      },
      {
        id: 'mz-pt-4',
        title: 'Foliar Restorative Nutrition',
        description: 'Spray 19:19:19 (5 g/L) + Zinc chelate (1 g/L) 5 days after pest containment to stimulate rapid regrowth of new photosynthetic leaf area.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Vigorous emergence of clean new leaves from the central whorl.'
      }
    ],
    precautions: [
      'Do not broadcast spray over the top of the canopy; FAW larvae live deep inside the whorl and require targeted whorl application.',
      'Always follow Pre-Harvest Interval (PHI) guidelines before harvesting cobs.'
    ],
    recoveryTimeline: [
      'Day 1–2: Cultural egg destruction and whorl sand application.',
      'Day 3–5: Targeted whorl insecticide application.',
      'Day 6–8: Larval mortality assessment.',
      'Week 2–3: Canopy regeneration with foliar nutrients.'
    ],
    recoveryIndicators: [
      'Complete larval mortality in treated whorls.',
      'Absence of fresh feeding punctures on newly emerging leaves.',
      'Clean cob emergence without borer damage.',
      'Active vegetative recovery.'
    ],
    escalationGuidance: [
      'If Fall Armyworm damage exceeds 25% despite recommended sprays, immediately alert the District Agricultural Officer and KVK entomologist for community-level management.',
      'Report any suspected spurious pesticide batch with invoice to the Krishi Seva Kendra.'
    ]
  },

  maize__unseasonal_rain: {
    cropId: 'maize',
    cropName: 'Maize (Makka)',
    calamityType: 'UNSEASONAL_WEATHER',
    calamityName: 'Unseasonal Weather Event',
    damageOverview:
      'Unseasonal rain during cob maturity or harvesting causes water to seep inside cob husks, leading to kernel rotting (Fusarium ear rot), in-cob seed sprouting, Aspergillus mold producing aflatoxins, and severe grain dockage.',
    inspectionChecklist: [
      'Check maturity of cobs (husks dry and bleached, black layer formed at kernel base).',
      'Inspect whether standing plants have lodged into mud.',
      'Peel husk leaves on 10 cobs to check for water accumulation, kernel sprouting, or pink/white mold.',
      'Check harvested cob heaps for temperature rise and musty odor.',
      'Determine kernel moisture content.'
    ],
    steps: [
      {
        id: 'mz-ur-1',
        title: 'Open Cob Husks / Invert Cobs on Standing Stalks',
        description: 'If rain is expected to continue on mature crop, gently bend cobs downward (declining) so that rain water drips off the husk tip rather than seeping inside the cob.',
        timeframe: 'First 24 hours',
        completionCriteria: 'Mature cobs bent downward to shed water.',
        isImmediateSafety: false
      },
      {
        id: 'mz-ur-2',
        title: 'Priority Harvesting of Mature Cobs',
        description: 'Harvest mature cobs immediately as soon as fields can be entered. Strip the wet husk leaves off immediately in the field.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Mature cobs harvested and de-husked.'
      },
      {
        id: 'mz-ur-3',
        title: 'Solar / Wire-Rack Drying of De-husked Cobs',
        description: 'Do not heap wet cobs together. Spread them in single layers on raised wire mesh racks, dry floors, or clean tarpaulins under ventilated sheds.',
        timeframe: 'Day 2–5',
        completionCriteria: 'Cobs spread in single layers; air circulating freely.'
      },
      {
        id: 'mz-ur-4',
        title: 'Shelling & Grain Moisture Reduction',
        description: 'Shell cobs once kernels loosen easily. Dry grains until moisture drops below 12% to prevent Aspergillus flavus mold and aflatoxin contamination.',
        timeframe: 'Day 5–8',
        completionCriteria: 'Grain moisture reduced below 12%; kernels hard and crisp.'
      }
    ],
    precautions: [
      'Never store wet harvested cobs (moisture >14%) in piles or closed rooms; aflatoxin-producing mold will develop within 36 hours.',
      'Do not feed moldy, pink, or black-stained maize kernels to dairy animals or poultry.'
    ],
    recoveryTimeline: [
      'Day 1–2: Invert cobs and priority harvesting.',
      'Day 2–5: De-husking and single-layer drying.',
      'Day 5–8: Shelling and moisture reduction to <12%.',
      'Week 2: Safe storage in aerated bags.'
    ],
    recoveryIndicators: [
      'Clean, bright yellow/orange kernels without fungal mold.',
      'Absence of musty sour odor in storage heaps.',
      'Grain moisture verified below 12%.',
      'No sprouted kernels in the threshed grain.'
    ],
    escalationGuidance: [
      'File an intimation within 72 hours under PMFBY post-harvest loss provisions if harvested cobs were damaged in the field.',
      'Consult the local APMC market committee if traders attempt unfair price discounting for unseasonal rain affected lots.'
    ]
  },

  maize__other: {
    cropId: 'maize',
    cropName: 'Maize (Makka)',
    calamityType: 'OTHER',
    calamityName: 'Other Calamity',
    damageOverview:
      'Unforeseen events such as severe broadleaf herbicide drift (e.g. glyphosate or 2,4-D), localized zinc / iron deficiency chlorosis in calcareous black soils, stray cattle herd trampling, or wild boar invasion.',
    inspectionChecklist: [
      'Examine leaf symptoms: broad white chlorotic bands between veins (zinc deficiency) vs yellow bleached leaves (iron) vs twisted strap leaves (herbicide drift).',
      'Assess damage perimeter and map affected zone.',
      'Check root health in affected soil patches.',
      'Document evidence with date-stamped photographs.',
      'Check for wildlife footprints or fencing breaches.'
    ],
    steps: [
      {
        id: 'mz-ot-1',
        title: 'Identify Calamity Source & Secure Perimeter',
        description: 'Identify the cause. If wild boars or stray cattle invaded, install border deterrent ropes, solar fencing, or physical barriers.',
        timeframe: 'Day 1',
        completionCriteria: 'Cause verified; perimeter secured against repeat intrusion.',
        isImmediateSafety: true
      },
      {
        id: 'mz-ot-2',
        title: 'Foliar Neutralizing Spray for Herbicide Drift',
        description: 'If herbicide drift damaged maize, spray 1% Urea + 0.5% Zinc Sulphate + Humic acid (2 ml/L) to help plants metabolize chemical toxins.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Foliar spray applied; toxicity symptoms arrested.'
      },
      {
        id: 'mz-ot-3',
        title: 'Micronutrient Correction (Zinc / Iron Deficiency)',
        description: 'If white chlorotic bands appear, spray Zinc Sulphate (5 g/L) + Ferrous Sulphate (5 g/L) + Citric Acid (1 g/L) in early morning.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Micronutrient spray applied; greening of leaves observed.'
      },
      {
        id: 'mz-ot-4',
        title: 'Shallow Intercultivation & Soil Loosening',
        description: 'Run a shallow hoe between rows to aerate compacted soil caused by animal trampling or equipment.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Soil loosened; surface crust broken.'
      }
    ],
    precautions: [
      'Do not apply additional weedicides to stressed or chemically injured maize.',
      'Avoid walking repeatedly over compacted trampled soil while wet.'
    ],
    recoveryTimeline: [
      'Day 1–2: Diagnosis, perimeter securing, and foliage wash.',
      'Day 3–5: Micronutrient spray and soil aeration.',
      'Week 2: Foliar nutrition and vegetative recovery.',
      'Week 3–4: Resumption of normal cob development.'
    ],
    recoveryIndicators: [
      'New leaves unfurl with uniform dark green coloration without white banding.',
      'Brace roots anchor firmly into the soil.',
      'Healthy tassel and cob emergence.'
    ],
    escalationGuidance: [
      'For herbicide drift or wildlife damage, request an official spot inspection by the Taluka Agriculture Officer and Forest Range Officer for formal compensation.',
      'Consult KVK agronomists if micronutrient deficiency persists despite foliar sprays.'
    ]
  }
};

