import { CropRecoveryPlan } from '../types';

export const gramPlans: Record<string, CropRecoveryPlan> = {
  gram__heavy_rainfall: {
    cropId: 'gram',
    cropName: 'Gram / Chickpea (Chana)',
    calamityType: 'HEAVY_RAINFALL',
    calamityName: 'Excessive / Heavy Rainfall',
    damageOverview:
      'Chickpea has zero tolerance for water stagnation. Standing water for even 12-24 hours causes rapid taproot asphyxiation, collar rot (Sclerotium rolfsii), sudden wilt (Fusarium), extensive yellowing, and total plant mortality in black soils.',
    inspectionChecklist: [
      'Examine furrows and low spots for standing water pools.',
      'Gently uproot wilting plants and inspect root collar; look for water-soaked lesions or white fungal threads.',
      'Split open taproot longitudinally: brown/black vascular discoloration indicates Fusarium wilt.',
      'Check nodule color: healthy nodules are pink; green/black nodules indicate suffocation.',
      'Assess foliage for sudden drooping and yellowing.'
    ],
    steps: [
      {
        id: 'grm-hr-1',
        title: 'Emergency Drainage Trenches (Nali)',
        description: 'Immediately cut deep drainage trenches across the field and along bunds to drain every drop of standing water within 12 hours. Lower the water table below the root zone.',
        timeframe: 'First 12–24 hours',
        completionCriteria: 'All surface water evacuated; furrow channels dry.',
        isImmediateSafety: true
      },
      {
        id: 'grm-hr-2',
        title: 'Root Zone Bio-Fungicide Drenching',
        description: 'Drench root zones or spray collar region with Trichoderma viride (5 g/L) or Carbendazim 12% + Mancozeb 63% WP (2 g/L) to halt collar rot and damping-off.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Soil around plant collars wetted with fungicide solution.'
      },
      {
        id: 'grm-hr-3',
        title: 'Inter-row Hoeing for Soil Aeration (Vapsa)',
        description: 'As soon as the topsoil reaches workable condition (vapsa), run a light hoe (kolpa) between rows to break the soil crust and restore air to the suffocating root zone.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Surface crust broken without disturbing the main taproots.'
      },
      {
        id: 'grm-hr-4',
        title: 'Foliar Nutrient Resuscitation Spray',
        description: 'Spray 2% DAP (Di-Ammonium Phosphate) or 19:19:19 (5 g/L) + Micronutrients (2 g/L) to provide immediate foliar nutrition while roots recover.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Foliar spray absorbed; canopy greenness restored.'
      },
      {
        id: 'grm-hr-5',
        title: 'Branch Nipping for Lateral Proliferation',
        description: 'If crop was in vegetative stage (30-40 DAS), gently nip (pinch) the terminal buds of surviving plants to induce dense secondary and tertiary branching.',
        timeframe: 'Day 8–12',
        completionCriteria: 'Terminal tips nipped; lateral bud swelling observed.'
      }
    ],
    precautions: [
      'Never apply chemical urea on wet or saturated chickpea soil; it causes fatal root rot and toxic leaf scorch.',
      'Do not irrigate until the soil has dried out thoroughly and plants show renewed growth.'
    ],
    recoveryTimeline: [
      'Day 1–2: Emergency drainage and collar fungicide drenching.',
      'Day 3–5: Crust breaking and root aeration.',
      'Day 6–10: Foliar nutrient feeding and branch nipping.',
      'Week 3–4: Canopy regeneration and secondary branching.'
    ],
    recoveryIndicators: [
      'Arrest of plant wilting and yellowing.',
      'Appearance of fresh white rootlets along taproot.',
      'Emergence of healthy, dark green compound leaves.',
      'Vigorous secondary branching from lower nodes.'
    ],
    escalationGuidance: [
      'If collar rot destroys more than 40% of the plant stand, consult the Agriculture Assistant for contingency catch crops or gap-filling.',
      'Consult KVK if vascular wilt spreads rapidly despite fungicide drenching.'
    ]
  },

  gram__flooding: {
    cropId: 'gram',
    cropName: 'Gram / Chickpea (Chana)',
    calamityType: 'FLOODING',
    calamityName: 'River / Canal Flooding',
    damageOverview:
      'Flooding submerges chickpea completely, leaving heavy silt mud that coats delicate pinnate leaves, suffocates taproots, and causes near-total mortality within 24-48 hours.',
    inspectionChecklist: [
      'Determine hours of submergence under flood water.',
      'Check whether the central growing point and root collar are firm or rotten.',
      'Examine silt mud thickness over foliage.',
      'Count surviving live plants per square meter (aim for at least 25-30 plants/sq.m).',
      'Check for soil wash-out exposing taproots.'
    ],
    steps: [
      {
        id: 'grm-fl-1',
        title: 'Evacuate Flood Water & Clear Silt Mud',
        description: 'Cut exit ditches in field bunds to completely drain flood water. Gently wash thick mud off foliage with clean water sprayers if feasible.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Water evacuated; mud deposits removed from leaves.',
        isImmediateSafety: true
      },
      {
        id: 'grm-fl-2',
        title: 'Collar Rot Drenching',
        description: 'Drench plant collars with Metalaxyl + Mancozeb (2.5 g/L) or Carbendazim (1 g/L) to prevent fungal damping-off in the wet silt layer.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Plant collars drenched with protective fungicide.'
      },
      {
        id: 'grm-fl-3',
        title: 'Foliar Energy & Nutrient Feeding',
        description: 'Spray 19:19:19 (5 g/L) + Humic acid (2 ml/L) to nourish seedlings whose root functions have been temporarily suspended.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Foliar nutrition applied; leaves showing renewed turgor.'
      },
      {
        id: 'grm-fl-4',
        title: 'Crust Pulverization for Soil Aeration',
        description: 'As silt dries into a hard cake, lightly rake or hoe between rows to prevent crust cracking from tearing tender taproots.',
        timeframe: 'Day 6–8',
        completionCriteria: 'Silt cake broken into fine friable crumb texture.'
      }
    ],
    precautions: [
      'Never allow silt to dry into a hard solid sheet over young chickpea plants.',
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
      'If surviving plant density drops below 15 plants/sq.m, consult KVK for resowing or relay cropping with sunflower or fodder crops.',
      'Report complete flood loss for disaster relief assessment.'
    ]
  },

  gram__hailstorm: {
    cropId: 'gram',
    cropName: 'Gram / Chickpea (Chana)',
    calamityType: 'HAILSTORM',
    calamityName: 'Severe Hailstorm',
    damageOverview:
      'Hailstones shatter delicate chickpea foliage, shear branch tips, knock off flower buds, and puncture developing pods. Fortunately, chickpea possesses exceptional regenerative branching capacity if the lower stem and roots remain healthy.',
    inspectionChecklist: [
      'Assess defoliation percentage and terminal branch damage.',
      'Check whether the main stem is intact above the lowest 2-3 nodes.',
      'Inspect developing pods for hail puncture marks and bruised seeds.',
      'Count remaining viable lateral nodes per plant.',
      'Check for fungal mycelium on bruised stems.'
    ],
    steps: [
      {
        id: 'grm-hl-1',
        title: 'Antimicrobial Wound Sealing Spray',
        description: 'Within 24-48 hours, spray Copper Oxychloride 50 WP (2.5 g/L) + Mancozeb (2 g/L) across the entire plot to seal open stem wounds and prevent Ascochyta blight.',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'All broken stems and shredded leaves coated with protective fungicide.',
        isImmediateSafety: false
      },
      {
        id: 'grm-hl-2',
        title: 'Clean Pruning of Torn Branch Tips (Sanitation Nipping)',
        description: 'Clip off torn, hanging branch tips cleanly above the nearest healthy node. This acts like natural nipping, stimulating dormant lateral buds into rapid multi-branching.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Torn tissues trimmed cleanly.'
      },
      {
        id: 'grm-hl-3',
        title: 'Growth Regulator & Nutrient Induction Spray',
        description: 'Spray 12:61:00 (5 g/L) along with Brassinolide (0.5 ml/L) or GA3 (10 ppm) to trigger dormant axillary buds at uninjured stem nodes into rapid new vegetative shoots.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Bud swell visible at axils of trimmed stems.'
      },
      {
        id: 'grm-hl-4',
        title: 'Pod Salvage & Secondary Flowering Nutrition',
        description: 'Spray 00:52:34 (5 g/L) + Boron (1 g/L) to encourage a vigorous second flush of flowers and assist surviving pods to fill normally.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Fresh flower buds appearing at newly sprouted axils.'
      }
    ],
    precautions: [
      'Do not plow down the crop immediately after hail; chickpea can regenerate an impressive bushy canopy if lower stem nodes are intact.',
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

  gram__strong_winds: {
    cropId: 'gram',
    cropName: 'Gram / Chickpea (Chana)',
    calamityType: 'HIGH_VELOCITY_WINDS',
    calamityName: 'High Velocity Winds / Storm',
    damageOverview:
      'Gale winds cause lodging in tall, irrigated, or heavy chickpea crops, especially during pod filling. Lodged canopies trap humidity, increasing susceptibility to Botrytis grey mold and Ascochyta blight.',
    inspectionChecklist: [
      'Determine extent of lodging across the field.',
      'Check whether stems are snapped or merely leaning.',
      'Inspect lower pods for direct contact with damp soil.',
      'Check for early signs of Botrytis grey mold (gray furry mold on lower stems and flowers).',
      'Assess pod borer activity inside the dense lodged canopy.'
    ],
    steps: [
      {
        id: 'grm-sw-1',
        title: 'Allow Natural Self-Righting (Do Not Manually Lift)',
        description: 'Do not attempt to pull up lodged chickpea plants manually, as brittle stems easily snap. In most cases, terminal shoots will naturally curve upright towards the sun within 48 hours.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Terminal growing points curving upward on their own.'
      },
      {
        id: 'grm-sw-2',
        title: 'Open Furrows for Canopy Aeration & Drainage',
        description: 'Clear inter-row furrows to drain any trapped water and improve air circulation beneath the lodged canopy to prevent mold.',
        timeframe: 'Day 2–4',
        completionCriteria: 'No standing water beneath lodged canopy; air moving through furrows.'
      },
      {
        id: 'grm-sw-3',
        title: 'Preventive Spray for Botrytis Grey Mold & Blight',
        description: 'Spray Carbendazim + Mancozeb (2 g/L) or Azoxystrobin + Difenoconazole (1 ml/L) to prevent fungal blight in the shaded, high-humidity lodged microclimate.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Canopy underside wetted with protective fungicide.'
      },
      {
        id: 'grm-sw-4',
        title: 'Foliar Potassium to Strengthen Stem Fibers',
        description: 'Spray 00:00:50 (Potassium Sulphate @ 5 g/L) to strengthen vascular tissues and improve grain filling in lodged plants.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Foliar potash absorbed; stem rigidity improved.'
      }
    ],
    precautions: [
      'Never walk heavily over lodged chickpea mats; walking crushes tender pods into the soil.',
      'Do not flood-irrigate lodged chickpea, as it guarantees fatal collar rot.'
    ],
    recoveryTimeline: [
      'Day 1–2: Natural phototropic response evaluation.',
      'Day 3–5: Aeration and preventive blight fungicide spray.',
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
      'If lodging occurs during pod maturity and soil is saturated, contact the local Harvester Operator or TKA regarding prompt manual harvesting.',
      'Consult KVK if Botrytis grey mold spreads rapidly across lodged foliage.'
    ]
  },

  gram__drought: {
    cropId: 'gram',
    cropName: 'Gram / Chickpea (Chana)',
    calamityType: 'DROUGHT',
    calamityName: 'Drought / Dry Spell',
    damageOverview:
      'Moisture stress during branching, flowering, or pod filling causes extensive flower drop, dry root rot (Rhizoctonia bataticola), small wrinkled seeds, and drastically reduced yield.',
    inspectionChecklist: [
      'Check soil moisture in the top 15 cm of soil.',
      'Observe leaf rolling during morning hours (indicates severe moisture deficit).',
      'Inspect flower and pod drop rates at leaf axils.',
      'Examine roots: dry root rot causes brittle, shredded, jet-black taproots devoid of lateral roots.',
      'Check pod development: count flat seedless pods vs pods with developing seeds.'
    ],
    steps: [
      {
        id: 'grm-dr-1',
        title: 'Single Life-Saving Sprinkler Irrigation',
        description: 'Apply one light protective irrigation using sprinklers or in alternate furrows during cool evening hours, prioritizing the pod development stage.',
        timeframe: 'Immediate',
        completionCriteria: 'Root zone moistened; plants recover turgor by morning.'
      },
      {
        id: 'grm-dr-2',
        title: 'Foliar Potassium Nitrate (KNO3) Spray',
        description: 'Spray 1% Potassium Nitrate (13:00:45 @ 10 g/L) or 2% Urea across the canopy. Potassium acts as an osmoprotectant, maintaining cell turgor and stomatal regulation.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Canopy sprayed thoroughly; reduced daytime leaf rolling.'
      },
      {
        id: 'grm-dr-3',
        title: 'Dust Mulching (Inter-row Hoeing)',
        description: 'Run a shallow blade hoe (kolpa) lightly between rows to break capillary pores and create a loose surface dust layer that conserves deep soil moisture.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Dust mulch established; inter-row weeds eliminated.'
      },
      {
        id: 'grm-dr-4',
        title: 'Pod Borer Protection during Stress',
        description: 'Drought conditions favor Helicoverpa pod borer. Install pheromone traps and spray Chlorantraniliprole 18.5 SC (0.3 ml/L) at pod initiation.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Pod borer population kept below economic threshold level.'
      }
    ],
    precautions: [
      'Do not apply heavy flood irrigation to dry cracked chickpea fields; sudden flooding induces fatal wilt and root rot.',
      'Do not apply solid urea during drought stress.'
    ],
    recoveryTimeline: [
      'Day 1–2: Protective irrigation and foliar potassium spray.',
      'Day 3–5: Dust mulching and moisture conservation.',
      'Day 6–10: Pest management and pod protection.',
      'Week 2–3: Plump seed filling in surviving pods.'
    ],
    recoveryIndicators: [
      'Leaves remain flat and open through midday without rolling.',
      'Retention of developing green pods without yellowing or drop.',
      'Absence of pod borer boreholes on pods.',
      'Seeds swelling noticeably inside pod chambers.'
    ],
    escalationGuidance: [
      'If drought continues and dry root rot destroys more than 30% of the crop, notify the District Agriculture Officer for PMFBY drought survey.',
      'Consult KVK on drought-tolerant varieties (e.g., Phule Vikram, Digvijay) for future seasons.'
    ]
  },

  gram__pest_attack: {
    cropId: 'gram',
    cropName: 'Gram / Chickpea (Chana)',
    calamityType: 'PEST_DISEASE',
    calamityName: 'Severe Pest / Disease Infestation',
    damageOverview:
      'Severe outbreak of Gram Pod Borer (Helicoverpa armigera - feeding on foliage, flower buds, and boring circular holes into green pods), Fusarium Wilt, Dry Root Rot, or Ascochyta Blight.',
    inspectionChecklist: [
      'Count Helicoverpa larvae per meter row length (ETL: 1-2 larvae per meter row).',
      'Inspect green pods for circular entry holes and empty hollow chambers.',
      'Check pheromone trap catches (more than 5 moths/trap/day indicates peak egg-laying).',
      'Look for wilting plants with drooping leaves and brown vascular browning (Wilt).',
      'Inspect stem base for dry shredded roots with sclerotial bodies (Dry Root Rot).'
    ],
    steps: [
      {
        id: 'grm-pt-1',
        title: 'Install Bird Perches & Pheromone Traps',
        description: 'Install 5 pheromone traps per acre for Helicoverpa monitoring and erect 15-20 "T"-shaped bird perches per acre to attract insectivorous birds.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Traps and bird perches active across the field.',
        isImmediateSafety: false
      },
      {
        id: 'grm-pt-2',
        title: 'Bio-pesticide / HaNPV Initial Knockdown',
        description: 'Spray Helicoverpa armigera Nuclear Polyhedrosis Virus (HaNPV @ 250 LE/acre) or Azadirachtin 1500 ppm (3 ml/L) targeting early instar larvae.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Bio-pesticide applied in late afternoon hours.'
      },
      {
        id: 'grm-pt-3',
        title: 'Targeted Insecticide per KVK Guidelines',
        description: 'If medium to large larvae are present, spray Chlorantraniliprole 18.5 SC (0.3 ml/L) or Emamectin Benzoate 5 SG (0.4 g/L) or Flubendiamide (0.3 ml/L).',
        timeframe: 'Day 3–5',
        completionCriteria: 'Complete canopy coverage in late afternoon; larval mortality confirmed.'
      },
      {
        id: 'grm-pt-4',
        title: 'Foliar Restorative Nutrition',
        description: 'Spray 19:19:19 (5 g/L) + Boron (1 g/L) 5 days after pest containment to stimulate rapid regrowth of new photosynthetic leaf area and assist pod filling.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Vigorous emergence of clean new leaflets and flower buds.'
      }
    ],
    precautions: [
      'Do not apply broad-spectrum organophosphates repeatedly, as this destroys natural trichogrammatid parasitoids and creates insecticide resistance.',
      'Always follow Pre-Harvest Interval (PHI) guidelines before harvesting.'
    ],
    recoveryTimeline: [
      'Day 1–2: Trapping, bird perches, and bio-pesticide application.',
      'Day 3–5: Targeted insecticide spray against active larvae.',
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

  gram__unseasonal_rain: {
    cropId: 'gram',
    cropName: 'Gram / Chickpea (Chana)',
    calamityType: 'UNSEASONAL_WEATHER',
    calamityName: 'Unseasonal Weather Event',
    damageOverview:
      'Unseasonal rain during December-January coincides with flowering or pod filling, causing massive flower drop, Botrytis grey mold, and Ascochyta blight. If rain strikes near maturity (February-March), pods absorb moisture, seeds germinate underground or mold in pods, and quality is ruined.',
    inspectionChecklist: [
      'Check crop stage: flowering vs green pod vs mature dry pod.',
      'Inspect flower clusters for sudden drop and grey furry mold (Botrytis).',
      'Examine mature pods for water-soaking, skin wrinkling, or seed sprouting.',
      'Check harvested windrows or heaps in the field for temperature rise and mold.',
      'Determine seed moisture content.'
    ],
    steps: [
      {
        id: 'grm-ur-1',
        title: 'Immediate Field Drainage',
        description: 'Cut exit furrows to drain all surface water from the field within 12 hours. Do not allow water to stand around the collar region.',
        timeframe: 'First 24 hours',
        completionCriteria: 'All standing water removed from furrows.',
        isImmediateSafety: false
      },
      {
        id: 'grm-ur-2',
        title: 'Preventive Spray for Grey Mold & Blight',
        description: 'If crop is in flowering or podding stage, immediately spray Carbendazim + Mancozeb (2 g/L) or Chlorothalonil 75 WP (2 g/L) to prevent Botrytis grey mold.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Complete canopy wetted with protective fungicide.'
      },
      {
        id: 'grm-ur-3',
        title: 'Priority Harvesting of Mature Plots',
        description: 'If crop is mature, harvest immediately as soon as field is workable. Move harvested plants to dry sheds or tarpaulins.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Mature crop harvested and moved off wet field soil.'
      },
      {
        id: 'grm-ur-4',
        title: 'Threshing & Shade Drying',
        description: 'Thresh promptly and dry seeds on clean tarpaulins in thin layers under shade until moisture drops below 10% for safe storage.',
        timeframe: 'Day 4–7',
        completionCriteria: 'Seed moisture brought below 10%; grain crisp to bite.'
      }
    ],
    precautions: [
      'Never pack damp chickpea seeds (moisture >10%) in plastic or gunny bags; mold will ruin the lot within 48 hours.',
      'Do not sun-dry harvested chickpea under harsh mid-day sun, as rapid desiccation cracks the seed coat.'
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

  gram__other: {
    cropId: 'gram',
    cropName: 'Gram / Chickpea (Chana)',
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
        id: 'grm-ot-1',
        title: 'Frost Mitigation / Smoke Screening (Dhuan)',
        description: 'If a cold wave / frost (<4°C) is forecast, create light smoke screens along the north-west field borders at night by burning farm trash to raise field temperatures.',
        timeframe: 'During frost event',
        completionCriteria: 'Smoke blanket maintained over the field during pre-dawn hours.',
        isImmediateSafety: false
      },
      {
        id: 'grm-ot-2',
        title: 'Foliar Anti-Stress & Detoxification Spray',
        description: 'For weedicide drift or frost injury, spray 1% Urea + 0.5% Zinc Sulphate + Humic acid (2 ml/L) to help plants metabolize stress compounds.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Foliar spray applied; toxicity symptoms arrested.'
      },
      {
        id: 'grm-ot-3',
        title: 'Branch Nipping for Lateral Proliferation',
        description: 'If terminal tips were damaged by frost or grazing, nip the damaged ends cleanly to trigger lateral bud multiplication.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Terminal tips nipped; secondary branching initiated.'
      },
      {
        id: 'grm-ot-4',
        title: 'Foliar 19:19:19 Nutritional Boost',
        description: 'Apply water-soluble 19:19:19 (5 g/L) + Micronutrients (2 g/L) every 7-10 days until affected plants regain normal growth.',
        timeframe: 'Day 7–12',
        completionCriteria: 'Regrown foliage matches height and vigor of unaffected sections.'
      }
    ],
    precautions: [
      'Do not apply additional weedicides to stressed chickpea plants.',
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

