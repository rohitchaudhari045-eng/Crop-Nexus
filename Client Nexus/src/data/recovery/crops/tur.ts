import { CropRecoveryPlan } from '../types';

export const turPlans: Record<string, CropRecoveryPlan> = {
  tur__heavy_rainfall: {
    cropId: 'tur',
    cropName: 'Tur / Pigeon Pea',
    calamityType: 'HEAVY_RAINFALL',
    calamityName: 'Excessive / Heavy Rainfall',
    damageOverview:
      'Continuous heavy rainfall in black soils causes water stagnation, precipitating Phytophthora Stem Blight (dark brown to black lesions on main stems, sudden foliage wilting), collar rot, and flower drop in early-sown tur.',
    inspectionChecklist: [
      'Check furrows and low-lying field patches for standing water pools.',
      'Examine main stems and lower branches for dark brown to purplish-black water-soaked lesions (Phytophthora blight).',
      'Check taproot health by excavating 2-3 plants; look for soft rot or healthy white roots.',
      'Inspect flower and pod retention rates on indeterminate branches.',
      'Check for yellowing and sudden drooping of leaves under bright sunshine.'
    ],
    steps: [
      {
        id: 'tur-hr-1',
        title: 'Emergency Trench Drainage',
        description: 'Immediately cut drainage channels across ridges and through field bunds to clear all standing water within 12-24 hours. Tur cannot tolerate waterlogged roots.',
        timeframe: 'First 24 hours',
        completionCriteria: 'No standing water between rows; furrows flowing freely.',
        isImmediateSafety: true
      },
      {
        id: 'tur-hr-2',
        title: 'Phytophthora Blight Preventative Spray / Drench',
        description: 'Immediately spray Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ @ 2.5 g/L) or Copper Oxychloride 50 WP (2.5 g/L) directed at the lower stem and soil collar.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Lower stems and collars wetted thoroughly with fungicide solution.'
      },
      {
        id: 'tur-hr-3',
        title: 'Inter-row Soil Aeration (Vapsa Condition)',
        description: 'As soon as topsoil reaches workable condition (vapsa), carry out light shallow hoeing with a bullock-drawn or tractor kolpa to aerate the suffocating root zone.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Surface crust broken to 3 cm depth without disturbing the deep taproot.'
      },
      {
        id: 'tur-hr-4',
        title: 'Foliar Nutrient Resuscitation Spray',
        description: 'Spray 2% DAP (Di-Ammonium Phosphate) or 19:19:19 (10 g/L) + Micronutrient mixture (2 g/L) to supply direct nutrition to yellowing foliage.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Canopy greenness restored; renewed leaf expansion.'
      },
      {
        id: 'tur-hr-5',
        title: 'Branch Nipping / Pruning of Rotten Terminals',
        description: 'If terminal tips show dieback, nip them back to healthy green tissue to stimulate vigorous secondary and tertiary fruiting branches.',
        timeframe: 'Day 8–12',
        completionCriteria: 'Dead terminals pruned; lateral bud activation observed.'
      }
    ],
    precautions: [
      'Never apply granular urea on wet saturated black soil; it causes root scorch and toxic leaf burn.',
      'Do not deep-plow near tur plants, as tearing lateral roots allows Fusarium wilt to penetrate.'
    ],
    recoveryTimeline: [
      'Day 1–2: Complete furrow drainage and Phytophthora fungicide spray.',
      'Day 3–5: Root aeration and foliar nutrient resuscitation.',
      'Day 6–10: Branch nipping and lateral shoot promotion.',
      'Week 3–4: Canopy regeneration and resumption of flowering.'
    ],
    recoveryIndicators: [
      'Arrest of plant wilting and leaf yellowing.',
      'Phytophthora stem lesions dry up into pale brown scars.',
      'Emergence of new, deep green compound leaves.',
      'Vigorous secondary branching from lower nodes.'
    ],
    escalationGuidance: [
      'If Phytophthora stem blight destroys more than 30% of plants, consult the Taluka Krishi Adhikari for spot assessment.',
      'Consult KVK if black vascular discoloration is visible inside split stems, indicating Fusarium wilt.'
    ]
  },

  tur__flooding: {
    cropId: 'tur',
    cropName: 'Tur / Pigeon Pea',
    calamityType: 'FLOODING',
    calamityName: 'River / Canal Flooding',
    damageOverview:
      'River flooding submerges tur fields, depositing heavy clay silt on leaves, burying the root collar, suffocating taproots, and causing total plant mortality within 48-72 hours if water remains ponded.',
    inspectionChecklist: [
      'Determine hours of complete submergence under flood water.',
      'Check whether the root collar and main stem cambium are green and firm or brown and decaying.',
      'Examine the thickness of silt mud deposited on foliage and stems.',
      'Count surviving live plants per square meter.',
      'Inspect for uprooted or tilted plants.'
    ],
    steps: [
      {
        id: 'tur-fl-1',
        title: 'Drain Inundation & Clear Silt from Stems',
        description: 'Cut exit ditches in field bunds to completely discharge flood water. Gently scrape deposited silt mud away from the root collar down to the original soil line.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Water evacuated; silt cleared away from root collars.',
        isImmediateSafety: true
      },
      {
        id: 'tur-fl-2',
        title: 'Foliar Silt Washing with Clean Water',
        description: 'Gently spray clean water over silt-caked foliage using a knapsack sprayer before the mud bakes into a hard crust under the sun.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Foliage cleared of mud coating; stomatal pores open.'
      },
      {
        id: 'tur-fl-3',
        title: 'Collar Rot & Wilt Preventive Drenching',
        description: 'Drench soil collars with Carbendazim 12% + Mancozeb 63% WP (2 g/L) or Copper Oxychloride (2.5 g/L) to prevent fungal decay in the wet silt layer.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Soil collar region drenched with protective fungicide.'
      },
      {
        id: 'tur-fl-4',
        title: 'Foliar 19:19:19 & Humic Acid Resuscitation',
        description: 'Spray 19:19:19 (5 g/L) + Humic acid (2 ml/L) to nourish plants whose root systems have been temporarily impaired by flood water.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Foliar spray absorbed; leaves showing renewed turgor.'
      },
      {
        id: 'tur-fl-5',
        title: 'Crust Breaking for Soil Aeration',
        description: 'As silt dries into a hard cake, lightly hoe between rows to prevent crust cracking from tearing tender lateral roots.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Silt cake broken into fine crumb texture.'
      }
    ],
    precautions: [
      'Never allow silt mud to dry into a hard solid sheet around the root collar.',
      'Do not apply solid fertilizers until soil is completely dry and active white roots are visible.'
    ],
    recoveryTimeline: [
      'Day 1–3: Drainage, silt washing, and collar rot prevention.',
      'Day 4–7: Foliar energy feeding and crust breaking.',
      'Week 2: Root recovery and secondary branch emergence.',
      'Week 3–4: Canopy re-establishment.'
    ],
    recoveryIndicators: [
      'Bright green shoots pushing through muddy stems.',
      'New white secondary roots branching from the taproot.',
      'Absence of black rot at the stem base.'
    ],
    escalationGuidance: [
      'If plant mortality exceeds 50%, consult KVK for contingency relay crops (rabi jowar, chickpea, or safflower).',
      'Report complete flood loss for disaster relief assessment.'
    ]
  },

  tur__hailstorm: {
    cropId: 'tur',
    cropName: 'Tur / Pigeon Pea',
    calamityType: 'HAILSTORM',
    calamityName: 'Severe Hailstorm',
    damageOverview:
      'Hail impact shreds leaves, splits woody stems, knocks off flower buds, and pierces green pods. Tur has exceptional regenerative branching capacity; pruning damaged terminal branches triggers dense secondary and tertiary flushes.',
    inspectionChecklist: [
      'Assess defoliation percentage across the canopy.',
      'Check whether the main stem is intact above the lowest 3-4 nodes.',
      'Inspect developing pods for hail puncture marks and bruised seeds.',
      'Count remaining viable lateral nodes per plant.',
      'Check for fungal mycelium on bruised stems.'
    ],
    steps: [
      {
        id: 'tur-hl-1',
        title: 'Antimicrobial Wound Sealing Spray',
        description: 'Within 24-48 hours, spray Copper Oxychloride 50 WP (2.5 g/L) + Streptocycline (1 g per 10 L) across the entire plot to seal open stem wounds.',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'All broken stems and shredded leaves coated with protective fungicide.',
        isImmediateSafety: false
      },
      {
        id: 'tur-hl-2',
        title: 'Sanitation Pruning of Ragged Broken Branches',
        description: 'Cleanly clip off torn, dangling branches using sanitized shears just above the nearest healthy node. This stimulates dormant lateral buds into rapid multi-branching.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Torn tissues trimmed cleanly.'
      },
      {
        id: 'tur-hl-3',
        title: 'Growth Regulator & Nutrient Induction Spray',
        description: 'Spray 12:61:00 (5 g/L) along with Brassinolide (0.5 ml/L) or GA3 (10 ppm) to trigger dormant axillary buds at uninjured stem nodes into rapid new vegetative shoots.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Bud swell visible at axils of trimmed stems.'
      },
      {
        id: 'tur-hl-4',
        title: 'Secondary Flowering & Pod Nutrition',
        description: 'Spray 00:52:34 (5 g/L) + Boron (1 g/L) to encourage a vigorous second flush of flowers and assist surviving pods to fill normally.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Fresh flower buds appearing at newly sprouted axils.'
      }
    ],
    precautions: [
      'Do not plow down the crop immediately after hail; pigeon pea can regenerate an impressive bushy canopy if lower stem nodes are intact.',
      'Avoid heavy nitrogen application, which can cause excessive soft succulent growth prone to blight.'
    ],
    recoveryTimeline: [
      'Day 1–2: Wound sealing fungicide application.',
      'Day 3–5: Clean pruning and bio-stimulant spray.',
      'Day 6–10: Dormant bud activation and secondary flowering.',
      'Week 3–4: Dense bushy canopy re-establishment and pod formation.'
    ],
    recoveryIndicators: [
      'Wounds on stems dry out and form hard calluses without black rot.',
      'Vigorous green side branches emerging from lower nodes.',
      'Abundant new flower bud initiation.',
      'Unbroken pods continuing seed filling.'
    ],
    escalationGuidance: [
      'If more than 80% of stems are snapped at the ground line, request an emergency revenue-agriculture Panchanama for hailstorm compensation.',
      'Consult KVK on seed viability testing if damaged pods were near harvest maturity.'
    ]
  },

  tur__strong_winds: {
    cropId: 'tur',
    cropName: 'Tur / Pigeon Pea',
    calamityType: 'HIGH_VELOCITY_WINDS',
    calamityName: 'High Velocity Winds / Storm',
    damageOverview:
      'Gale winds cause branch splitting, stem breakage, and lodging in tall indeterminate tur varieties, particularly when heavy pod load makes the canopy top-heavy during autumn storms.',
    inspectionChecklist: [
      'Determine extent of lodging and branch splitting across the field.',
      'Check whether main stems are snapped or merely leaning.',
      'Inspect lower branches for contact with damp soil.',
      'Check for early signs of fungal rot on soil-touching branches.',
      'Assess pod borer activity inside the dense lodged canopy.'
    ],
    steps: [
      {
        id: 'tur-sw-1',
        title: 'Allow Natural Phototropic Self-Righting',
        description: 'Do not attempt to pull up lodged tur plants manually, as brittle woody stems easily snap. In most cases, terminal shoots will naturally curve upright towards the sun within 48-72 hours.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Terminal growing points curving upward on their own.'
      },
      {
        id: 'tur-sw-2',
        title: 'Clean Pruning of Split Branches',
        description: 'Cleanly clip off severely split or dangling branches that cannot heal, and apply Copper Oxychloride paste on the cut crotch to prevent fungal entry.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Broken branches pruned; cuts sealed with fungicide paste.'
      },
      {
        id: 'tur-sw-3',
        title: 'Open Furrows for Canopy Aeration & Drainage',
        description: 'Clear inter-row furrows to drain any trapped water and improve air circulation beneath the lodged canopy to prevent mold.',
        timeframe: 'Day 3–5',
        completionCriteria: 'No standing water beneath lodged canopy; air moving through furrows.'
      },
      {
        id: 'tur-sw-4',
        title: 'Anti-Stress Potassium & Boron Foliar Spray',
        description: 'Spray 00:00:50 (Potassium Sulphate @ 5 g/L) + Boron (1 g/L) to strengthen vascular tissues and improve grain filling in lodged plants.',
        timeframe: 'Day 5–8',
        completionCriteria: 'Foliar spray absorbed; stem rigidity improved.'
      }
    ],
    precautions: [
      'Never walk heavily over lodged tur branches; walking crushes developing pods into the soil.',
      'Do not apply additional heavy nitrogen to lodged tur.'
    ],
    recoveryTimeline: [
      'Day 1–2: Natural phototropic response evaluation.',
      'Day 3–5: Pruning split branches and canopy aeration.',
      'Day 6–10: Potash foliar nutrition.',
      'Week 2–3: Stabilized seed filling and maturation.'
    ],
    recoveryIndicators: [
      'Terminal shoots curve vertically and display leaves toward the sun.',
      'Pods remain green and clean without fungal mold.',
      'Lower leaves dry out rather than rotting in mud.',
      'Pods fill with plump seeds despite tilted stems.'
    ],
    escalationGuidance: [
      'If storm winds caused severe lodging across more than 50% of the crop, notify the Agriculture Assistant for PMFBY loss assessment.',
      'Consult KVK if pod borer infestations surge inside the lodged canopy.'
    ]
  },

  tur__drought: {
    cropId: 'tur',
    cropName: 'Tur / Pigeon Pea',
    calamityType: 'DROUGHT',
    calamityName: 'Drought / Dry Spell',
    damageOverview:
      'Moisture stress during branching, flowering, or pod filling causes massive flower drop, flat seedless pods, premature leaf drying, and increases susceptibility to Sterility Mosaic Disease (SMD) and pod borers.',
    inspectionChecklist: [
      'Check soil moisture in the top 20 cm of soil.',
      'Observe leaf rolling during morning hours (indicates severe moisture deficit).',
      'Inspect flower and pod drop rates at leaf axils.',
      'Examine leaf surfaces for light green and yellow mosaic mottling (Sterility Mosaic Disease).',
      'Check pod development: count flat seedless pods vs pods with developing seeds.'
    ],
    steps: [
      {
        id: 'tur-dr-1',
        title: 'Life-Saving Furrow / Protective Irrigation',
        description: 'Apply one light protective irrigation in alternate furrows during cool evening hours, prioritizing the flowering (90-100 DAS) or pod filling stage.',
        timeframe: 'Immediate',
        completionCriteria: 'Root zone moistened; plants recover turgor by morning.'
      },
      {
        id: 'tur-dr-2',
        title: 'Foliar Potassium Nitrate (KNO3) Anti-Stress Spray',
        description: 'Spray 1% Potassium Nitrate (13:00:45 @ 10 g/L) or 2% Urea across the canopy. Potassium acts as an osmoprotectant, maintaining cell turgor and stomatal regulation.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Canopy sprayed thoroughly; reduced daytime leaf rolling.'
      },
      {
        id: 'tur-dr-3',
        title: 'Dust Mulching (Inter-row Hoeing)',
        description: 'Run a shallow blade hoe (kolpa) lightly between rows to break capillary pores and create a loose surface dust layer that conserves deep soil moisture.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Dust mulch established; inter-row weeds eliminated.'
      },
      {
        id: 'tur-dr-4',
        title: 'Hormonal Spray to Arrest Flower Drop',
        description: 'Spray NAA (Planofix @ 4 ml per 15 L pump) during morning hours to arrest the formation of abscission layers in flower pedicels caused by moisture stress.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Flower drop arrested; retained flowers setting pods.'
      }
    ],
    precautions: [
      'Do not apply heavy flood irrigation to dry cracked black soils; sudden flooding induces root asphyxiation and collar rot.',
      'Do not apply solid urea during drought stress.'
    ],
    recoveryTimeline: [
      'Day 1–2: Protective irrigation and foliar potassium spray.',
      'Day 3–5: Dust mulching and moisture conservation.',
      'Day 6–10: Hormone spray and pod protection.',
      'Week 2–3: Plump seed filling in surviving pods.'
    ],
    recoveryIndicators: [
      'Leaves remain flat and open through midday without rolling.',
      'Retention of developing green pods without yellowing or drop.',
      'Active flower bud opening and pod set.',
      'Seeds swelling noticeably inside pod chambers.'
    ],
    escalationGuidance: [
      'If drought continues and pod set drops below 30%, notify the District Agriculture Officer for PMFBY drought survey.',
      'Consult KVK on drought-tolerant varieties (e.g., BDN 711, BSMR 736) for future seasons.'
    ]
  },

  tur__pest_attack: {
    cropId: 'tur',
    cropName: 'Tur / Pigeon Pea',
    calamityType: 'PEST_DISEASE',
    calamityName: 'Severe Pest / Disease Infestation',
    damageOverview:
      'Severe outbreak of Pod Borer (Helicoverpa armigera), Pod Fly (Melanagromyza obtusa), Plume Moth (Exelastis atomosa), Sterility Mosaic Disease (SMD - transmitted by eriophyid mites, causing bushy sterile plants), or Fusarium Wilt.',
    inspectionChecklist: [
      'Inspect flower buds and green pods for boreholes and frass (Helicoverpa).',
      'Examine mature pods: look for pinhole exit holes and shrivelled seeds with white maggots inside (Pod Fly).',
      'Check for bushy, pale green plants with clustered leaves and no flowers (Sterility Mosaic Disease).',
      'Look for wilting plants with drooping leaves and brown vascular browning (Wilt).',
      'Count pheromone trap catches (more than 5 moths/trap/day indicates peak egg-laying).'
    ],
    steps: [
      {
        id: 'tur-pt-1',
        title: 'Install Pheromone Traps & Bird Perches',
        description: 'Install 5 pheromone traps per acre for Helicoverpa monitoring and erect 15-20 "T"-shaped bird perches per acre to attract insectivorous birds.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Traps and bird perches active across the field.',
        isImmediateSafety: false
      },
      {
        id: 'tur-pt-2',
        title: 'Targeted Insecticide Spray for Pod Borer Complex',
        description: 'Spray Chlorantraniliprole 18.5 SC (0.3 ml/L) or Flubendiamide 39.35 SC (0.3 ml/L) or Emamectin Benzoate 5 SG (0.4 g/L) at 50% flowering stage.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Complete canopy coverage in late afternoon; larval mortality confirmed.'
      },
      {
        id: 'tur-pt-3',
        title: 'Pod Fly Suppression at Pod Filling',
        description: 'For Pod Fly control, spray Dimethoate 30 EC (1.5 ml/L) or Monocrotophos (1.5 ml/L) or neem formulation at the green pod stage.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Pod fly spray completed; developing pods protected.'
      },
      {
        id: 'tur-pt-4',
        title: 'Acaricide Spray for Sterility Mosaic Mite Vector',
        description: 'If SMD symptoms appear, spray Fenazaquin 10 EC (2 ml/L) or Propargite 57 EC (2 ml/L) to kill the eriophyid mite vector and stop virus transmission.',
        timeframe: 'Day 6–8',
        completionCriteria: 'Mite vector suppressed; healthy non-symptomatic plants protected.'
      },
      {
        id: 'tur-pt-5',
        title: 'Foliar Restorative Nutrition',
        description: 'Spray 19:19:19 (5 g/L) + Boron (1 g/L) 5 days after pest containment to stimulate rapid regrowth of new photosynthetic leaf area and assist pod filling.',
        timeframe: 'Day 8–12',
        completionCriteria: 'Vigorous emergence of clean new leaflets and flower buds.'
      }
    ],
    precautions: [
      'Do not apply broad-spectrum organophosphates repeatedly, as this destroys natural trichogrammatid parasitoids and creates insecticide resistance.',
      'Always follow Pre-Harvest Interval (PHI) guidelines before harvesting.'
    ],
    recoveryTimeline: [
      'Day 1–2: Trapping, bird perches, and borer spray.',
      'Day 3–5: Pod fly and mite vector management.',
      'Day 6–8: Larval mortality assessment.',
      'Week 2–3: Canopy regeneration with foliar nutrients.'
    ],
    recoveryIndicators: [
      'Total caterpillar mortality on treated leaves.',
      'Absence of fresh boreholes on green pods.',
      'Fresh flower buds opening cleanly without pest damage.',
      'Retention of undamaged pods.'
    ],
    escalationGuidance: [
      'If pod borer damage exceeds 20% despite recommended sprays, immediately alert the District Agricultural Officer and KVK entomologist.',
      'Report any suspected spurious pesticide batch with invoice to the Krishi Seva Kendra.'
    ]
  },

  tur__unseasonal_rain: {
    cropId: 'tur',
    cropName: 'Tur / Pigeon Pea',
    calamityType: 'UNSEASONAL_WEATHER',
    calamityName: 'Unseasonal Weather Event',
    damageOverview:
      'Unseasonal rain during December-January coincides with flowering or pod filling, causing massive flower drop, Botrytis grey mold, and pod borer resurgence. If rain strikes near maturity (January-February), pods absorb moisture, seeds germinate underground or mold in pods, and quality is ruined.',
    inspectionChecklist: [
      'Check crop stage: flowering vs green pod vs mature dry pod.',
      'Inspect flower clusters for sudden drop and grey furry mold (Botrytis).',
      'Examine mature pods for water-soaking, skin wrinkling, or seed sprouting.',
      'Check harvested windrows or heaps in the field for temperature rise and mold.',
      'Determine seed moisture content.'
    ],
    steps: [
      {
        id: 'tur-ur-1',
        title: 'Immediate Field Drainage',
        description: 'Cut exit furrows to drain all surface water from the field within 12 hours. Do not allow water to stand around the collar region.',
        timeframe: 'First 24 hours',
        completionCriteria: 'All standing water removed from furrows.',
        isImmediateSafety: false
      },
      {
        id: 'tur-ur-2',
        title: 'Preventive Spray for Grey Mold & Blight',
        description: 'If crop is in flowering or podding stage, immediately spray Carbendazim + Mancozeb (2 g/L) or Chlorothalonil 75 WP (2 g/L) to prevent Botrytis grey mold.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Complete canopy wetted with protective fungicide.'
      },
      {
        id: 'tur-ur-3',
        title: 'Priority Harvesting of Mature Plots',
        description: 'If crop is mature, harvest immediately as soon as field is workable. Move harvested plants to dry sheds or tarpaulins.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Mature crop harvested and moved off wet field soil.'
      },
      {
        id: 'tur-ur-4',
        title: 'Threshing & Shade Drying',
        description: 'Thresh promptly and dry seeds on clean tarpaulins in thin layers under shade until moisture drops below 10% for safe storage.',
        timeframe: 'Day 4–7',
        completionCriteria: 'Seed moisture brought below 10%; grain crisp to bite.'
      }
    ],
    precautions: [
      'Never pack damp tur seeds (moisture >10%) in plastic or gunny bags; mold will ruin the lot within 48 hours.',
      'Do not sun-dry harvested tur under harsh mid-day sun, as rapid desiccation cracks the seed coat.'
    ],
    recoveryTimeline: [
      'Day 1–2: Drain field and apply mold preventive fungicide.',
      'Day 2–4: Priority harvest of mature plots.',
      'Day 4–7: Threshing and thin-layer shade drying to <10% moisture.',
      'Week 2: Safe storage in aerated bags.'
    ],
    recoveryIndicators: [
      'Threshed grains clean, golden-brown, without black fungal spots.',
      'No musty sour odor in storage heaps.',
      'Seed moisture verified below 10%.',
      'Minimal split or crushed seed percentage.'
    ],
    escalationGuidance: [
      'If in-pod sprouting or flower drop exceeds 20%, immediately notify the insurance company and Taluka Agriculture Officer within 72 hours for PMFBY claims.',
      'Consult the local APMC market committee if traders attempt unfair price discounting for unseasonal rain affected lots.'
    ]
  },

  tur__other: {
    cropId: 'tur',
    cropName: 'Tur / Pigeon Pea',
    calamityType: 'OTHER',
    calamityName: 'Other Calamity',
    damageOverview:
      'Unforeseen calamity such as ground frost (<4°C during flowering causing flower sterility and blackened pods), broadleaf weedicide drift, localized soil salinity, or wild animal / stray cattle grazing.',
    inspectionChecklist: [
      'Inspect flower buds and young pods for frost blackening or drop.',
      'Check leaf deformation patterns (cupping / strap leaves from herbicide drift).',
      'Examine root health and nodule vitality.',
      'Map affected area and take photos.',
      'Document evidence of the damage source.'
    ],
    steps: [
      {
        id: 'tur-ot-1',
        title: 'Frost Mitigation / Smoke Screening (Dhuan)',
        description: 'If a cold wave / frost (<4°C) is forecast, create light smoke screens along the north-west field borders at night by burning farm trash to raise field temperatures.',
        timeframe: 'During frost event',
        completionCriteria: 'Smoke blanket maintained over the field during pre-dawn hours.',
        isImmediateSafety: false
      },
      {
        id: 'tur-ot-2',
        title: 'Foliar Anti-Stress & Detoxification Spray',
        description: 'For weedicide drift or frost injury, spray 1% Urea + 0.5% Zinc Sulphate + Humic acid (2 ml/L) to help plants metabolize stress compounds.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Foliar spray applied; toxicity symptoms arrested.'
      },
      {
        id: 'tur-ot-3',
        title: 'Branch Nipping for Lateral Proliferation',
        description: 'If terminal tips were damaged by frost or grazing, nip the damaged ends cleanly to trigger lateral bud multiplication.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Terminal tips nipped; secondary branching initiated.'
      },
      {
        id: 'tur-ot-4',
        title: 'Foliar 19:19:19 Nutritional Boost',
        description: 'Apply water-soluble 19:19:19 (5 g/L) + Micronutrients (2 g/L) every 7-10 days until affected plants regain normal growth.',
        timeframe: 'Day 7–12',
        completionCriteria: 'Regrown foliage matches height and vigor of unaffected sections.'
      }
    ],
    precautions: [
      'Do not apply additional weedicides to stressed tur plants.',
      'Do not flood-irrigate during cold waves; wet cold soils worsen frost injury.'
    ],
    recoveryTimeline: [
      'Day 1–2: Smoke screening and anti-stress foliar spray.',
      'Day 3–5: Branch nipping and soil aeration.',
      'Week 2: Foliar nutrition and secondary branching.',
      'Week 3–4: Normal flowering and pod formation.'
    ],
    recoveryIndicators: [
      'New compound leaves emerge healthy without distortion.',
      'Active pink nodules functioning on taproots.',
      'Resumption of healthy flower cluster development at leaf axils.'
    ],
    escalationGuidance: [
      'For severe frost damage, request an official assessment by the Taluka Agriculture Officer for natural calamity relief.',
      'Consult KVK agronomists if unexplained leaf epinasty persists across multiple rows.'
    ]
  }
};

