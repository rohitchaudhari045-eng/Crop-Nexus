import { CropRecoveryPlan } from '../types';

export const mustardPlans: Record<string, CropRecoveryPlan> = {
  mustard__heavy_rainfall: {
    cropId: 'mustard',
    cropName: 'Mustard',
    calamityType: 'HEAVY_RAINFALL',
    calamityName: 'Excessive / Heavy Rainfall',
    damageOverview:
      'Waterlogging in mustard causes root suffocation, lower leaf yellowing and chlorosis, collar rot (Sclerotinia), stunting, and triggers severe Downy Mildew and White Rust outbreaks.',
    inspectionChecklist: [
      'Check furrows and low spots for standing water pools.',
      'Inspect root collar region for soft water-soaked rotting.',
      'Check lower leaves for yellow chlorosis starting from margins.',
      'Examine leaf undersides for white blister-like pustules (White Rust).',
      'Assess soil firmness; look for heavy surface crusting.'
    ],
    steps: [
      {
        id: 'mus-hr-1',
        title: 'Emergency Trench Drainage',
        description: 'Immediately cut drainage channels to drain all standing water from the field within 12-24 hours. Mustard roots cannot tolerate water stagnation.',
        timeframe: 'First 24 hours',
        completionCriteria: 'All surface water evacuated; furrow channels dry.',
        isImmediateSafety: true
      },
      {
        id: 'mus-hr-2',
        title: 'Foliar Nitrogen & Sulfur Resuscitation',
        description: 'Spray 1.5% Urea (15 g/L) + 0.5% Wettable Sulfur (80 WDG @ 3 g/L) to immediately correct nitrogen leaching and supply vital sulfur for oil synthesis.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Foliar spray absorbed; leaves turning from pale yellow to healthy green.'
      },
      {
        id: 'mus-hr-3',
        title: 'White Rust & Blight Preventative Spray',
        description: 'Spray Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ @ 2 g/L) to prevent white rust and Alternaria leaf blight from invading waterlogged plants.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Canopy coated with protective systemic fungicide.'
      },
      {
        id: 'mus-hr-4',
        title: 'Shallow Hoeing for Soil Aeration (Vapsa)',
        description: 'As soon as topsoil is workable, perform light shallow hoeing with a khurpi to break the soil crust and restore air to the root zone.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Surface crust broken to 2 cm depth without cutting lateral roots.'
      },
      {
        id: 'mus-hr-5',
        title: 'Top-dress Nitrogen & Sulfur Supplement',
        description: 'Top-dress 20 kg Urea + 10 kg Ammonium Sulphate per acre once the soil surface dries to stimulate active branching and flowering.',
        timeframe: 'Day 8–12',
        completionCriteria: 'Nutrients banded along rows and covered lightly.'
      }
    ],
    precautions: [
      'Never broadcast urea on flooded or completely saturated mustard soil; it causes root rot.',
      'Do not perform deep inter-cultivation, as feeder roots are shallow.'
    ],
    recoveryTimeline: [
      'Day 1–2: Complete field surface drainage.',
      'Day 3–4: Foliar nitrogen and sulfur resuscitation spray.',
      'Day 5–7: Surface crust breaking and aeration.',
      'Week 2–3: Top-dressing and secondary branching.'
    ],
    recoveryIndicators: [
      'Pale yellow leaves regain dark green hue.',
      'Emergence of fresh white roots along the taproot.',
      'Appearance of vigorous secondary flowering branches.',
      'Absence of white rust blisters.'
    ],
    escalationGuidance: [
      'If collar rot destroys more than 30% of plants, consult the Taluka Krishi Adhikari for gap-filling strategies.',
      'Consult KVK if white rust blisters turn necrotic and spread to flower heads (staghead abnormality).'
    ]
  },

  mustard__flooding: {
    cropId: 'mustard',
    cropName: 'Mustard',
    calamityType: 'FLOODING',
    calamityName: 'River / Canal Flooding',
    damageOverview:
      'Canal breach or river inundation coats mustard seedlings with silt mud, flattens weak stems, and suffocates roots. Submergence for over 36 hours causes near-total seedling mortality.',
    inspectionChecklist: [
      'Determine hours of complete submergence.',
      'Check thickness of silt mud deposited on leaves and crown.',
      'Examine whether growing points are alive by slicing open the stem base.',
      'Assess surviving plant density per square meter (aim for at least 15-20 plants/sq.m).',
      'Look for soil wash-out exposing root bases.'
    ],
    steps: [
      {
        id: 'mus-fl-1',
        title: 'Drain Inundation & Clear Silt Deposition',
        description: 'Cut exit channels in field bunds to discharge flood water. Gently wash thick mud off seedlings using clean water sprayers if feasible.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Water evacuated; mud deposits removed from leaf blades.',
        isImmediateSafety: true
      },
      {
        id: 'mus-fl-2',
        title: 'Fungicide Drenching against Seedling Rot',
        description: 'Drench or spray with Copper Oxychloride 50 WP (2.5 g/L) or Metalaxyl + Mancozeb (2 g/L) to prevent seedling blight in the wet silt layer.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Seedling crowns drenched with protective fungicide.'
      },
      {
        id: 'mus-fl-3',
        title: 'Foliar Energy & Nutrient Feeding',
        description: 'Spray 19:19:19 (5 g/L) + Humic acid (2 ml/L) to nourish seedlings whose root functions have been temporarily suspended.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Foliar nutrition applied; leaves showing renewed turgor.'
      },
      {
        id: 'mus-fl-4',
        title: 'Crust Pulverization for Soil Aeration',
        description: 'As silt dries into a hard cake, lightly rake or hoe between rows to prevent crust cracking from tearing tender seedlings.',
        timeframe: 'Day 6–8',
        completionCriteria: 'Silt cake broken into fine crumb texture.'
      }
    ],
    precautions: [
      'Never allow silt to dry into a hard solid sheet over young seedlings.',
      'Do not apply solid fertilizers until soil is completely dry.'
    ],
    recoveryTimeline: [
      'Day 1–3: Drainage, silt washing, and seedling rot prevention.',
      'Day 4–7: Foliar energy feeding and crust breaking.',
      'Week 2: Root recovery and secondary branch emergence.',
      'Week 3–4: Canopy re-establishment.'
    ],
    recoveryIndicators: [
      'Bright green leaves emerging from central whorl.',
      'Development of new white roots.',
      'Disappearance of foul anaerobic soil odor.'
    ],
    escalationGuidance: [
      'If surviving plant density drops below 10 plants/sq.m, consult KVK for resowing or relay cropping.',
      'Report canal breach inundation to irrigation authorities.'
    ]
  },

  mustard__hailstorm: {
    cropId: 'mustard',
    cropName: 'Mustard',
    calamityType: 'HAILSTORM',
    calamityName: 'Severe Hailstorm',
    damageOverview:
      'Hail impact shatters delicate mustard flowers, shreds leaves, breaks branches, and shatters developing or mature siliquae (pods), knocking seeds onto the ground.',
    inspectionChecklist: [
      'Assess stage of mustard crop (vegetative vs flowering vs pod development vs maturity).',
      'Count percentage of broken or crimped branches per plant.',
      'Inspect siliquae (pods) for shattering and bruised seeds.',
      'Check whether the crop is salvageable for grain or better harvested immediately.',
      'Check for fungal infection at wound sites.'
    ],
    steps: [
      {
        id: 'mus-hl-1',
        title: 'Wound Disinfection Spray',
        description: 'Within 24-48 hours, spray Mancozeb 75 WP (2 g/L) or Carbendazim (1 g/L) across the canopy to prevent Alternaria brassicae blight from invading bruised tissues.',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'All broken branches and shredded leaves coated with protective fungicide.',
        isImmediateSafety: false
      },
      {
        id: 'mus-hl-2',
        title: 'Foliar Energy & Branching Nutrition',
        description: 'If crop was in vegetative or early flowering stage, spray 19:19:19 (5 g/L) + GA3 (10 ppm) to stimulate rapid secondary and tertiary branching from lower nodes.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Foliar spray applied; lateral buds swelling.'
      },
      {
        id: 'mus-hl-3',
        title: 'Pod Filling & Sulfur Boost',
        description: 'If crop is in pod filling stage, spray 00:52:34 (5 g/L) + Wettable Sulfur (2 g/L) to assist surviving pods in filling bold seeds with high oil content.',
        timeframe: 'Day 5–8',
        completionCriteria: 'Surviving pods receiving direct nutrition.'
      },
      {
        id: 'mus-hl-4',
        title: 'Immediate Harvest of Mature Shattered Crop',
        description: 'If hail struck a mature, yellow-podded crop (>75% mature), harvest the crop immediately in early morning hours to prevent complete shattering loss.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Mature crop harvested and moved to threshing floor.'
      }
    ],
    precautions: [
      'Do not apply heavy urea after hail in late-stage mustard; it delays maturity and encourages alternaria blight.',
      'Harvest hail-damaged mature mustard only during morning hours when dew reduces pod shattering.'
    ],
    recoveryTimeline: [
      'Day 1–2: Wound disinfection spray and damage triage.',
      'Day 2–5: Secondary branch nutrition or emergency harvest.',
      'Day 6–10: Pod filling support.',
      'Week 3–4: Maturation of surviving grain pods.'
    ],
    recoveryIndicators: [
      'Wounds on stems callous over with dry scar tissue.',
      'Vigorous emergence of secondary flowering branches.',
      'Surviving pods continue seed filling without fungal rot.',
      'Bold seed formation in undamaged pods.'
    ],
    escalationGuidance: [
      'Request joint Panchanama by Revenue, Agriculture, and Insurance officials within 72 hours for PMFBY hailstorm compensation.',
      'Consult KVK on seed viability testing if damaged crop was for certified seed production.'
    ]
  },

  mustard__strong_winds: {
    cropId: 'mustard',
    cropName: 'Mustard',
    calamityType: 'HIGH_VELOCITY_WINDS',
    calamityName: 'High Velocity Winds / Storm',
    damageOverview:
      'Gale winds cause severe lodging in tall, lush mustard stands during flowering or pod filling, particularly when irrigated just before the storm. Lodged canopies trap humidity, increasing white rust and Sclerotinia rot.',
    inspectionChecklist: [
      'Determine direction and severity of lodging across the field.',
      'Check whether stems are snapped at internodes or simply leaning from roots.',
      'Inspect pods for contact with damp soil.',
      'Look for white cottony mycelium on lower stems (Sclerotinia stem rot).',
      'Assess aphid buildup inside the dense lodged canopy.'
    ],
    steps: [
      {
        id: 'mus-sw-1',
        title: 'Allow Natural Upward Curvature (Do Not Manually Lift)',
        description: 'Do not attempt to lift lodged mustard plants manually, as brittle succulent stems snap easily. Allow terminal branches to naturally curve upward toward the sun.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Terminal branches curving upward on their own.'
      },
      {
        id: 'mus-sw-2',
        title: 'Open Furrows for Canopy Aeration & Drainage',
        description: 'Clear inter-row furrows to drain any trapped water and improve air circulation beneath the lodged canopy to prevent mold.',
        timeframe: 'Day 2–4',
        completionCriteria: 'No standing water beneath lodged canopy; air moving through furrows.'
      },
      {
        id: 'mus-sw-3',
        title: 'Preventive Spray for Sclerotinia & Alternaria',
        description: 'Spray Carbendazim + Mancozeb (2 g/L) or Tebuconazole (1 ml/L) to prevent fungal rot in the shaded, high-humidity lodged microclimate.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Canopy underside wetted with protective fungicide.'
      },
      {
        id: 'mus-sw-4',
        title: 'Foliar Potassium to Strengthen Stem Fibers',
        description: 'Spray 00:00:50 (Potassium Sulphate @ 5 g/L) to strengthen vascular tissues and improve grain filling in lodged plants.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Foliar potash absorbed; stem rigidity improved.'
      }
    ],
    precautions: [
      'Never walk heavily over lodged mustard; walking crushes tender pods into the soil.',
      'Do not flood-irrigate lodged mustard.'
    ],
    recoveryTimeline: [
      'Day 1–2: Natural phototropic response evaluation.',
      'Day 3–5: Aeration and preventive blight fungicide spray.',
      'Day 6–10: Potash foliar nutrition.',
      'Week 2–3: Stabilized seed filling and maturation.'
    ],
    recoveryIndicators: [
      'Terminal shoots curve vertically and display flowers toward the sun.',
      'Pods remain green and clean without fungal mold.',
      'Lower leaves dry out rather than rotting in mud.',
      'Pods fill with bold seeds despite tilted stems.'
    ],
    escalationGuidance: [
      'If lodging occurs during pod maturity, contact the local Harvester Operator regarding prompt manual or adjusted combine harvesting.',
      'Consult KVK if Sclerotinia stem rot spreads rapidly across lodged foliage.'
    ]
  },

  mustard__drought: {
    cropId: 'mustard',
    cropName: 'Mustard',
    calamityType: 'DROUGHT',
    calamityName: 'Drought / Dry Spell',
    damageOverview:
      'Moisture stress during flowering or siliqua formation causes poor pod set, shrivelled seeds, low oil content, premature leaf drying, and explosive mustard aphid outbreaks.',
    inspectionChecklist: [
      'Check soil moisture in the top 15 cm of soil.',
      'Observe leaf rolling during morning hours.',
      'Inspect flower and pod drop rates at branch terminals.',
      'Examine twigs and inflorescences for dense colonies of green/black mustard aphids.',
      'Check pod development: count flat seedless pods vs pods with developing seeds.'
    ],
    steps: [
      {
        id: 'mus-dr-1',
        title: 'Critical Stage Life-Saving Irrigation',
        description: 'Provide a light irrigation prioritizing the most critical stages: Flowering (35-40 DAS) or Siliqua Formation (60-65 DAS). Mustard responds dramatically to a single timely irrigation.',
        timeframe: 'Immediate',
        completionCriteria: 'Root zone moistened; plants recover turgor by morning.'
      },
      {
        id: 'mus-dr-2',
        title: 'Targeted Mustard Aphid Knockdown Spray',
        description: 'Drought favors aphid explosions. Spray Dimethoate 30 EC (1.5 ml/L) or Thiamethoxam 25 WG (0.3 g/L) or Neem oil 1500 ppm (3 ml/L) targeting flowering twigs.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Aphid colonies suppressed; honeydew secretion stopped.'
      },
      {
        id: 'mus-dr-3',
        title: 'Foliar Potassium Nitrate & Boron Spray',
        description: 'Spray 1% Potassium Nitrate (13:00:45 @ 10 g/L) + Boron (1 g/L) to regulate stomatal closure, maintain cell turgor, and ensure bold seed filling.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Canopy sprayed thoroughly in early morning.'
      },
      {
        id: 'mus-dr-4',
        title: 'Dust Mulching in Inter-row Spaces',
        description: 'Run a shallow blade hoe lightly between rows to break capillary pores and create a loose surface dust layer that conserves deep soil moisture.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Dust mulch established; inter-row weeds eliminated.'
      }
    ],
    precautions: [
      'Do not apply solid urea during drought stress; it burns leaf margins and worsens water deficit.',
      'Avoid high-volume flood irrigation during windy afternoons, which causes lodging.'
    ],
    recoveryTimeline: [
      'Day 1–2: Critical stage irrigation and aphid knockdown.',
      'Day 3–5: Foliar potassium and boron spray.',
      'Day 6–10: Dust mulching and moisture conservation.',
      'Week 2–3: Bold seed filling in surviving pods.'
    ],
    recoveryIndicators: [
      'Leaves remain flat and open through midday without rolling.',
      'Inflorescences clean without aphid clustering.',
      'Pods swell with bold seeds.',
      'Absence of premature pod drying.'
    ],
    escalationGuidance: [
      'If drought continues and pod set drops below 30%, notify the District Agriculture Officer for PMFBY drought survey.',
      'Consult KVK on drought-tolerant mustard varieties (e.g., Pusa Bold, Kranti) for future seasons.'
    ]
  },

  mustard__pest_attack: {
    cropId: 'mustard',
    cropName: 'Mustard',
    calamityType: 'PEST_DISEASE',
    calamityName: 'Severe Pest / Disease Infestation',
    damageOverview:
      'Severe outbreak of Mustard Aphid (Lipaphis erysimi - infesting inflorescences, sucking sap, causing curling and black sooty mold), Painted Bug (Bagrada hilaris), White Rust (Albugo candida - staghead abnormality), or Sclerotinia Stem Rot.',
    inspectionChecklist: [
      'Inspect flowering twigs for aphid colonies (ETL: 50-60 aphids/plant or 1.5 cm infested twig length on 20% plants).',
      'Look for yellowing and curling of inflorescences covered in sticky honeydew and black sooty mold.',
      'Check seedlings for painted bug nymphs sucking sap and causing white specks.',
      'Examine leaf undersides for white blister-like pustules (White Rust).',
      'Look for white cottony fungal growth and black sclerotial bodies inside split stems (Sclerotinia).'
    ],
    steps: [
      {
        id: 'mus-pt-1',
        title: 'Targeted Aphid Knockdown Spray',
        description: 'Spray Dimethoate 30 EC (1.5 ml/L) or Thiamethoxam 25 WG (0.3 g/L) or Imidacloprid 17.8 SL (0.3 ml/L) targeting flowering branches in the late afternoon.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Aphid colonies eliminated from flowering twigs; honeydew secretion stopped.',
        isImmediateSafety: false
      },
      {
        id: 'mus-pt-2',
        title: 'White Rust & Alternaria Blight Spray',
        description: 'Spray Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ @ 2 g/L) or Mancozeb 75 WP (2.5 g/L) to prevent white rust pustules from spreading to floral parts.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Canopy coated with protective fungicide.'
      },
      {
        id: 'mus-pt-3',
        title: 'Prune & Destroy Staghead Abnormalities',
        description: 'Handpick and destroy floral stagheads (swollen distorted flower heads caused by white rust) to prevent systemic spread and spore release.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Staghead deformities clipped and burned outside field.'
      },
      {
        id: 'mus-pt-4',
        title: 'Foliar Restorative Nutrition',
        description: 'Spray 19:19:19 (5 g/L) + Wettable Sulfur (2 g/L) 5 days after pest containment to replenish photosynthetic vitality and support oil synthesis.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Canopy greenness restored; healthy pod filling.'
      }
    ],
    precautions: [
      'Do not spray during morning hours (9 AM to 12 PM) when honeybees are actively pollinating mustard flowers.',
      'Always follow Pre-Harvest Interval (PHI) guidelines before harvesting.'
    ],
    recoveryTimeline: [
      'Day 1–2: Targeted aphid knockdown spray.',
      'Day 2–4: White rust fungicide application.',
      'Day 5–7: Staghead removal and mortality assessment.',
      'Week 2–3: Canopy regeneration with foliar nutrients.'
    ],
    recoveryIndicators: [
      'Total aphid mortality on treated twigs.',
      'Absence of sticky honeydew and black sooty mold on new growth.',
      'White rust pustules dry up into pale brown scars.',
      'Clean pod emergence and bold seed filling.'
    ],
    escalationGuidance: [
      'If aphid infestation exceeds 40% of plants despite recommended sprays, immediately alert the District Agricultural Officer and KVK entomologist.',
      'Report any suspected spurious pesticide batch with invoice to the Krishi Seva Kendra.'
    ]
  },

  mustard__unseasonal_rain: {
    cropId: 'mustard',
    cropName: 'Mustard',
    calamityType: 'UNSEASONAL_WEATHER',
    calamityName: 'Unseasonal Weather Event',
    damageOverview:
      'Unseasonal rain during harvesting and threshing (February-March) causes harvested stacks to get soaked, leading to pod shattering, seed germination in pods (vivipary), fungal seed rot (Alternaria), and severe loss of oil quality and market price.',
    inspectionChecklist: [
      'Check maturity of the crop (golden-yellow pods, seed color changing to dark brown/black).',
      'Inspect standing plants for pod splitting and seed shedding on the ground.',
      'Open 20 pods to check for seed swelling, wrinkling, or sprouting.',
      'Check harvested stacks in the field for temperature rise and musty odor.',
      'Determine seed moisture content.'
    ],
    steps: [
      {
        id: 'mus-ur-1',
        title: 'Immediate Field Drainage',
        description: 'Cut exit furrows to drain all surface water from the field within 12 hours so mature pods do not sit in mud.',
        timeframe: 'First 24 hours',
        completionCriteria: 'All standing water removed from furrows.',
        isImmediateSafety: false
      },
      {
        id: 'mus-ur-2',
        title: 'Cover Harvested Stacks with Waterproof Tarpaulins',
        description: 'Immediately cover harvested mustard stacks lying in the field with plastic tarpaulins. Secure edges with soil or stones to prevent water seepage.',
        timeframe: 'First 24 hours',
        completionCriteria: 'All field stacks covered securely with tarpaulins.',
        isImmediateSafety: true
      },
      {
        id: 'mus-ur-3',
        title: 'Dismantle Wet Stacks & Aerate',
        description: 'Once rain clears, dismantle wet stacks immediately. Spread plants loosely on clean paved floors or tarpaulins under ventilated sheds to vent internal heat.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Wet stacks opened; air circulating through plants.'
      },
      {
        id: 'mus-ur-4',
        title: 'Threshing at Optimum Window & Shade Drying',
        description: 'Thresh as soon as pods become crisp. Dry seeds on clean tarpaulins in thin layers under shade until moisture drops below 8% for safe storage.',
        timeframe: 'Day 3–6',
        completionCriteria: 'Seed moisture brought below 8%; seeds hard and crisp.'
      }
    ],
    precautions: [
      'Never pack damp mustard seeds (moisture >9%) in gunny bags; fungal mold will spoil oil quality within 48 hours.',
      'Do not sun-dry harvested mustard under scorching mid-day sun, as rapid desiccation reduces oil content.'
    ],
    recoveryTimeline: [
      'Day 1–2: Drain field and cover harvested stacks.',
      'Day 2–4: Stack dismantling and aeration.',
      'Day 4–7: Threshing and thin-layer shade drying to <8% moisture.',
      'Week 2: Safe storage in aerated bags.'
    ],
    recoveryIndicators: [
      'Threshed grains clean, dark brown/black, with bright sheen.',
      'No musty sour odor in storage heaps.',
      'Seed moisture verified below 8%.',
      'High oil recovery percentage on test crushing.'
    ],
    escalationGuidance: [
      'File an intimation within 72 hours under PMFBY post-harvest loss provisions if harvested mustard was damaged in the field.',
      'Consult the local APMC market committee if traders attempt unfair price discounting for unseasonal rain affected lots.'
    ]
  },

  mustard__other: {
    cropId: 'mustard',
    cropName: 'Mustard',
    calamityType: 'OTHER',
    calamityName: 'Other Calamity',
    damageOverview:
      'Unforeseen events such as severe cold wave / ground frost (<3°C during flowering causing floral sterility and blistered pods), broadleaf weedicide drift, localized sulfur deficiency chlorosis, or stray animal grazing.',
    inspectionChecklist: [
      'Inspect flower buds and young siliquae for frost blighting and watery blister marks.',
      'Check leaf deformation patterns (cupping / strap leaves from herbicide drift).',
      'Examine young leaves for yellow cupped appearance with purple margins (Sulfur deficiency).',
      'Map affected area and take photos.',
      'Document evidence of the damage source.'
    ],
    steps: [
      {
        id: 'mus-ot-1',
        title: 'Frost Mitigation / Smoke Screening (Dhuan)',
        description: 'If a cold wave / frost (<3°C) is forecast, create light smoke screens along the north-west field borders at night by burning farm trash to raise field temperatures.',
        timeframe: 'During frost event',
        completionCriteria: 'Smoke blanket maintained over the field during pre-dawn hours.',
        isImmediateSafety: false
      },
      {
        id: 'mus-ot-2',
        title: 'Protective Night Irrigation against Frost',
        description: 'Provide a light night irrigation during cold spells; the high specific heat of water protects the crop canopy from freezing injury.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Moisture present in the soil during freezing nights.'
      },
      {
        id: 'mus-ot-3',
        title: 'Foliar Anti-Stress & Sulfur Spray',
        description: 'Spray 1% Urea + 0.5% Wettable Sulfur (80 WDG @ 3 g/L) + Humic acid (2 ml/L) to help plants metabolize stress compounds and correct sulfur deficiency.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Foliar spray applied; toxicity symptoms arrested.'
      },
      {
        id: 'mus-ot-4',
        title: 'Foliar 19:19:19 Nutritional Boost',
        description: 'Apply water-soluble 19:19:19 (5 g/L) + Micronutrients (2 g/L) every 7-10 days until affected plants regain normal growth.',
        timeframe: 'Day 7–12',
        completionCriteria: 'Regrown foliage matches height and vigor of unaffected sections.'
      }
    ],
    precautions: [
      'Do not apply additional weedicides to stressed or frost-injured mustard plants.',
      'Do not flood-irrigate during cold waves; wet cold soils worsen frost injury.'
    ],
    recoveryTimeline: [
      'Day 1–2: Night irrigation and smoke screening.',
      'Day 3–5: Anti-stress foliar spray and sulfur correction.',
      'Week 2: Foliar nutrition and secondary branch development.',
      'Week 3–4: Normal pod set and seed filling.'
    ],
    recoveryIndicators: [
      'New leaves emerge healthy without cupping or purple margins.',
      'Surviving flowers set pods normally.',
      'Healthy secondary branch proliferation.'
    ],
    escalationGuidance: [
      'For severe frost damage, request an official assessment by the Taluka Agriculture Officer for natural calamity relief.',
      'Consult KVK agronomists if sulfur deficiency persists despite foliar sprays.'
    ]
  }
};

