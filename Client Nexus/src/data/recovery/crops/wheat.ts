import { CropRecoveryPlan } from '../types';

export const wheatPlans: Record<string, CropRecoveryPlan> = {
  wheat__heavy_rainfall: {
    cropId: 'wheat',
    cropName: 'Wheat (Gehun)',
    calamityType: 'HEAVY_RAINFALL',
    calamityName: 'Excessive / Heavy Rainfall',
    damageOverview:
      'Excess rainfall during Crown Root Initiation (CRI at 20-25 DAS) or tillering stage causes soil saturation, suffocating young crown roots, causing leaf yellowing from base to top, stunting tillers, and increasing foot rot (Fusarium / Rhizoctonia).',
    inspectionChecklist: [
      'Check water levels in field depressions and furrows.',
      'Examine crown root development (2-3 cm below soil surface); healthy roots are creamy-white, not water-soaked or brown.',
      'Check tiller count per plant compared to standard (ideal: 4-6 tillers/plant).',
      'Look for yellowing starting from lower leaves moving upward.',
      'Inspect stem base for brown discoloration or sheath rot.'
    ],
    steps: [
      {
        id: 'wht-hr-1',
        title: 'Immediate Field Surface Drainage',
        description: 'Dig shallow cross-drains across the field and open border bunds to clear all standing water within 12-24 hours. Wheat roots cannot tolerate standing water.',
        timeframe: 'First 24 hours',
        completionCriteria: 'No standing water between wheat rows; drains flowing freely.',
        isImmediateSafety: true
      },
      {
        id: 'wht-hr-2',
        title: 'Foliar Nitrogen & Zinc Resuscitation',
        description: 'Spray 2% Urea (20 g/L) + 0.5% Zinc Sulphate (5 g/L) + 0.25% Lime to immediately correct nitrogen leaching and waterlogging chlorosis through the leaves.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Foliar spray absorbed; leaves turning from pale yellow to light green within 72 hours.'
      },
      {
        id: 'wht-hr-3',
        title: 'Shallow Surface Hoeing (Vapsa)',
        description: 'Once topsoil is workable, perform light hoeing with a khurpi or hand weeder to break the surface crust and admit oxygen to the crown roots.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Hard crust broken to 2 cm depth without cutting crown roots.'
      },
      {
        id: 'wht-hr-4',
        title: 'Top-dressing Nitrogen & Potash',
        description: 'Top-dress 25-30 kg Urea along with 10 kg MOP (Potash) per acre once the soil surface dries to stimulate active tiller formation.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Uniform broadcasting completed into moist soil.'
      },
      {
        id: 'wht-hr-5',
        title: 'Foot Rot / Root Rot Preventive Spray',
        description: 'Spray Carbendazim 50 WP (1 g/L) or Tebuconazole 25.9 EC (1 ml/L) directed at the stem base if brown foot rot lesions appear.',
        timeframe: 'Day 8–12',
        completionCriteria: 'Stem bases wetted with fungicide; lesion expansion halted.'
      }
    ],
    precautions: [
      'Never broadcast urea on flooded or completely saturated wheat soil; it causes root rot and severe gaseous loss.',
      'Do not perform deep inter-cultivation, as crown roots are shallow and easily severed.'
    ],
    recoveryTimeline: [
      'Day 1–2: Complete field surface drainage.',
      'Day 3–4: Foliar nitrogen and zinc resuscitation spray.',
      'Day 5–7: Surface crust breaking and aeration.',
      'Week 2–3: Top-dressing and active tiller multiplication.'
    ],
    recoveryIndicators: [
      'Pale yellow leaves regain dark green hue.',
      'Vigorous emergence of fresh crown roots from the crown node.',
      'Appearance of secondary and tertiary tillers.',
      'Firm upright growth of tillers.'
    ],
    escalationGuidance: [
      'If crown rot destroys more than 30% of hills, consult the Taluka Krishi Adhikari for reseeding or gap-filling strategies.',
      'Consult KVK if lower leaf sheaths develop black powdery spots.'
    ]
  },

  wheat__flooding: {
    cropId: 'wheat',
    cropName: 'Wheat (Gehun)',
    calamityType: 'FLOODING',
    calamityName: 'River / Canal Flooding',
    damageOverview:
      'Canal breach or river inundation coats wheat seedlings with sticky silt mud, submerges tillers, and erodes fertile seed beds. Submergence for over 48 hours causes widespread root asphyxiation and damping-off.',
    inspectionChecklist: [
      'Determine hours of complete submergence.',
      'Check thickness of silt mud deposited on leaves and crown.',
      'Examine whether growing points are alive by slicing open the stem base.',
      'Assess surviving plant density per square meter (aim for at least 250-300 tillers/sq.m).',
      'Look for soil wash-out exposing root bases.'
    ],
    steps: [
      {
        id: 'wht-fl-1',
        title: 'Drain Inundation & Clear Silt Deposition',
        description: 'Cut exit channels in field bunds to discharge flood water. Gently wash thick mud off seedlings using clean water sprayers if feasible.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Water evacuated; mud deposits removed from leaf blades.',
        isImmediateSafety: true
      },
      {
        id: 'wht-fl-2',
        title: 'Fungicide Drenching against Seedling Rot',
        description: 'Drench or spray with Copper Oxychloride 50 WP (2.5 g/L) or Metalaxyl + Mancozeb (2 g/L) to prevent seedling blight in the wet silt layer.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Seedling crowns drenched with protective fungicide.'
      },
      {
        id: 'wht-fl-3',
        title: 'Foliar Energy & Nutrient Feeding',
        description: 'Spray 19:19:19 (10 g/L) + Humic acid (2 ml/L) to nourish seedlings whose root functions have been temporarily suspended.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Foliar nutrition applied evenly; leaves showing new turgor.'
      },
      {
        id: 'wht-fl-4',
        title: 'Crust Pulverization for Soil Aeration',
        description: 'As silt dries into a hard cake, lightly rake or hoe between rows to prevent crust cracking from tearing tender seedlings.',
        timeframe: 'Day 6–8',
        completionCriteria: 'Silt cake broken into fine friable crumb texture.'
      },
      {
        id: 'wht-fl-5',
        title: 'Split Top-dressing of Nitrogen',
        description: 'Apply 25 kg Urea per acre in two split doses 7 days apart to drive renewed tillering once new white roots appear.',
        timeframe: 'Day 10–18',
        completionCriteria: 'Rapid vegetative recovery and dense tiller carpet.'
      }
    ],
    precautions: [
      'Never allow silt to dry into a cement-like solid sheet over the young seedlings.',
      'Do not apply un-decomposed manure or heavy chemicals on flood-shocked plants.'
    ],
    recoveryTimeline: [
      'Day 1–3: Drainage, silt washing, and seedling rot prevention.',
      'Day 4–7: Foliar energy feeding and crust breaking.',
      'Week 2: Split nitrogen top-dressing.',
      'Week 3–4: Crown root revival and tiller canopy closure.'
    ],
    recoveryIndicators: [
      'Bright green leaves emerging from central whorl.',
      'Development of new white crown roots.',
      'Disappearance of foul anaerobic soil odor.'
    ],
    escalationGuidance: [
      'If surviving tiller count is below 150 tillers/sq.m, consult KVK for resowing or zero-tillage relay cropping.',
      'Report canal breach inundation to irrigation authorities and agriculture department.'
    ]
  },

  wheat__hailstorm: {
    cropId: 'wheat',
    cropName: 'Wheat (Gehun)',
    calamityType: 'HAILSTORM',
    calamityName: 'Severe Hailstorm',
    damageOverview:
      'Hail during boot leaf, flowering, or grain milking stage causes earhead shattering, snapping of stalks (lodging with crimped stems), bruised leaf blades, and premature grain loss.',
    inspectionChecklist: [
      'Assess stage of wheat (vegetative vs booting vs grain filling).',
      'Count percentage of broken or crimped stems per square meter.',
      'Inspect earheads for shattered spikelets and bruised grains.',
      'Check flag leaf intactness (flag leaf contributes 45-50% of grain weight).',
      'Determine whether damaged crop is salvageable for grain or better utilized as green fodder.'
    ],
    steps: [
      {
        id: 'wht-hl-1',
        title: 'Disinfect Broken Stems & Wounds',
        description: 'Within 24-48 hours, spray Propiconazole 25 EC (1 ml/L) or Carbendazim + Mancozeb (2 g/L) to prevent Karnal bunt and rust from entering hail-bruised tissues.',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'All injured foliage covered with protective systemic fungicide.',
        isImmediateSafety: false
      },
      {
        id: 'wht-hl-2',
        title: 'Foliar Potassium & Micronutrient Feed',
        description: 'If crop was in boot or flowering stage, spray 13:00:45 (Potassium Nitrate @ 10 g/L) + Boron (1 g/L) to assist surviving tillers in grain filling.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Foliar spray completed; remaining earheads receiving direct nutrition.'
      },
      {
        id: 'wht-hl-3',
        title: 'Light Protective Irrigation',
        description: 'Give a light, quiet irrigation to help surviving plants maintain cellular turgidity and avoid water stress in wounded tissues.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Soil moisture maintained without causing lodging of weakened stalks.'
      },
      {
        id: 'wht-hl-4',
        title: 'Fodder Salvage (If Damage >80%)',
        description: 'If stems are completely flattened and earheads smashed during milking stage, harvest the green crop immediately for nutritious cattle fodder to recover input costs.',
        timeframe: 'Day 5–10',
        completionCriteria: 'Green fodder harvested, chopped, and fed or ensiled.'
      }
    ],
    precautions: [
      'Do not apply heavy urea after hail in late-stage wheat, as it delays maturity and encourages rust.',
      'Do not irrigate during windy periods; weakened crimped stalks will lodge completely.'
    ],
    recoveryTimeline: [
      'Day 1–2: Wound disinfection spray.',
      'Day 3–5: Potassium foliar feed and damage triage.',
      'Day 6–10: Light irrigation and salvage harvesting where necessary.',
      'Week 3–4: Maturation of surviving grain heads.'
    ],
    recoveryIndicators: [
      'Surviving earheads maintain green glumes and continue grain filling.',
      'Absence of black smut or pink mold on bruised spikes.',
      'Plump grains developing in uninjured spikelets.'
    ],
    escalationGuidance: [
      'Request joint Panchanama by Revenue, Agriculture, and Insurance officials within 72 hours for PMFBY hailstorm compensation.',
      'Consult KVK on seed germination testing if crop was meant for certified seed production.'
    ]
  },

  wheat__strong_winds: {
    cropId: 'wheat',
    cropName: 'Wheat (Gehun)',
    calamityType: 'HIGH_VELOCITY_WINDS',
    calamityName: 'High Velocity Winds / Storm',
    damageOverview:
      'High velocity squalls cause lodging of tall, heavy wheat crops during grain filling, particularly when fields were irrigated just before the windstorm. Lodged wheat suffers poor aeration, rat damage, and mildew.',
    inspectionChecklist: [
      'Determine direction and severity of lodging (leaning at 45° vs flat on the ground).',
      'Check whether stems are snapped at the lower nodes or bent at the soil line.',
      'Inspect earheads for contact with damp soil.',
      'Check for rodent burrows and bird activity in lodged patches.',
      'Assess powdery mildew or rust development inside the dense lodged canopy.'
    ],
    steps: [
      {
        id: 'wht-sw-1',
        title: 'Stop Immediate Irrigation & Withhold Water',
        description: 'Immediately stop any ongoing irrigation. Allow the soil surface to dry out quickly so that lodged earheads are not resting on moist soil.',
        timeframe: 'Immediate',
        completionCriteria: 'Soil surface dried; earheads prevented from rotting on wet mud.'
      },
      {
        id: 'wht-sw-2',
        title: 'Do Not Attempt Manual Lifting',
        description: 'Do not attempt to lift or bundle lodged wheat plants manually, as brittle stems snap easily and grains shatter. Allow natural upward curvature of earheads.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Plants left undisturbed to curvature naturally.'
      },
      {
        id: 'wht-sw-3',
        title: 'Foliar Fungicide & Micro-climate Protection',
        description: 'Spray Propiconazole 25 EC (1 ml/L) or Tebuconazole (1 ml/L) using a high-pressure mist sprayer to prevent powdery mildew and foliar blight in the shaded lodged mat.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Thorough coverage achieved without stepping directly onto lodged ears.'
      },
      {
        id: 'wht-sw-4',
        title: 'Rodent Management in Lodged Plots',
        description: 'Install zinc phosphide or bromadiolone bait stations at field boundaries to prevent field rats from feasting on easily accessible lodged earheads.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Bait stations placed safely in dry burrows and field corners.'
      }
    ],
    precautions: [
      'Never walk repeatedly over lodged wheat; walking crushes spikelets into the soil.',
      'Never irrigate wheat during forecast high-wind days; always check weather alerts before scheduling irrigations.'
    ],
    recoveryTimeline: [
      'Day 1–2: Stop irrigation and dry soil surface.',
      'Day 3–5: Fungicide misting and rodent prevention.',
      'Day 6–10: Natural earhead curvature and grain filling.',
      'Week 3–4: Careful manual or adjusted combine harvesting.'
    ],
    recoveryIndicators: [
      'Earheads curve upward away from the soil.',
      'Grains continue milky and dough stages to full maturity.',
      'Absence of fungal mold on lower leaves and spikes.'
    ],
    escalationGuidance: [
      'Contact local harvester operators to fit crop lifters / pick-up reels to combine harvesters for efficient harvesting of lodged wheat.',
      'Notify the insurance surveyor if lodging exceeds 50% during grain filling.'
    ]
  },

  wheat__drought: {
    cropId: 'wheat',
    cropName: 'Wheat (Gehun)',
    calamityType: 'DROUGHT',
    calamityName: 'Drought / Dry Spell',
    damageOverview:
      'Terminal drought and heat stress during tillering, heading, or grain filling cause stunted tillers, white/empty earheads, shrivelled grains, and drastically reduced 1000-grain weight.',
    inspectionChecklist: [
      'Check soil moisture at 15-20 cm depth in the root zone.',
      'Inspect for leaf rolling during midday hours.',
      'Examine developing spikes for sterile spikelets at base and apex (empty tips).',
      'Assess 1000-grain weight and grain plumpness during milky stage.',
      'Check for early premature yellowing of the flag leaf.'
    ],
    steps: [
      {
        id: 'wht-dr-1',
        title: 'Critical Stage Life-Saving Irrigation',
        description: 'Provide a light irrigation prioritizing the most critical growth stages: Crown Root Initiation (21 DAS), Flowering (65 DAS), or Grain Milking (85 DAS).',
        timeframe: 'Immediate',
        completionCriteria: 'Root zone moistened; plants regain turgor.'
      },
      {
        id: 'wht-dr-2',
        title: 'Foliar Potassium Nitrate Anti-Stress Spray',
        description: 'Spray 1% Potassium Nitrate (13:00:45 @ 10 g/L) or 2% Potassium Chloride (KCl) to regulate stomatal closure, maintain grain water potential, and reduce heat shock.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Canopy sprayed thoroughly in the early morning.'
      },
      {
        id: 'wht-dr-3',
        title: 'Salicylic Acid Spray for Thermal Resilience',
        description: 'Spray Salicylic Acid @ 100 ppm (100 mg per liter of water) during early heading to induce physiological heat and drought tolerance in wheat cells.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Foliar application completed; reduced flag leaf scorching.'
      },
      {
        id: 'wht-dr-4',
        title: 'Night / Evening Irrigation Schedule',
        description: 'If irrigating, apply water exclusively during night or late evening hours to minimize evaporation losses and cool the soil temperature.',
        timeframe: 'Day 7 onwards',
        completionCriteria: 'Irrigation water utilized with maximum cooling and absorption efficiency.'
      }
    ],
    precautions: [
      'Avoid high-volume flood irrigation during windy afternoons, which causes lodging in drought-weakened plants.',
      'Do not apply chemical nitrogen fertilizer without adequate soil moisture.'
    ],
    recoveryTimeline: [
      'Day 1–2: Critical stage irrigation and foliar potassium application.',
      'Day 3–5: Salicylic acid thermal resilience spray.',
      'Day 6–10: Night irrigation scheduling and moisture conservation.',
      'Week 2–3: Plump grain maturation and sustained flag leaf greenness.'
    ],
    recoveryIndicators: [
      'Flag leaves remain flat and green until dough stage.',
      'Grains fill out smoothly without wrinkling or pinched tips.',
      'Spikelets at earhead base produce viable grains.'
    ],
    escalationGuidance: [
      'If canal water rotation is delayed by more than 15 days, report to the Water Users Association (WUA) and District Collector for emergency water release.',
      'Consult KVK for heat-tolerant wheat varieties (e.g., HD 2967, DBW 187) for subsequent rabi planning.'
    ]
  },

  wheat__pest_attack: {
    cropId: 'wheat',
    cropName: 'Wheat (Gehun)',
    calamityType: 'PEST_DISEASE',
    calamityName: 'Severe Pest / Disease Infestation',
    damageOverview:
      'Outbreaks of Yellow/Brown Rust (Puccinia spp.), Karnal Bunt, Powdery Mildew, Termites, or Earhead Aphids (Rhopalosiphum padi) causing devastating loss of green leaf area, grain shrivelling, or unmarketable grain quality.',
    inspectionChecklist: [
      'Inspect leaf surfaces for yellow stripe pustules or brown circular pustules (rust).',
      'Check earheads for black powdery grains with fishy odor (Karnal Bunt).',
      'Examine leaf sheaths and flag leaves for white powdery fungal patches (mildew).',
      'Check earheads and tender stems for dense colonies of green/black aphids.',
      'Inspect stem base for termite tunneling and wilting tillers.'
    ],
    steps: [
      {
        id: 'wht-pt-1',
        title: 'Targeted Systemic Fungicide for Rust Control',
        description: 'At the very first appearance of yellow or brown rust pustules, spray Propiconazole 25 EC (Tilt @ 1 ml/L) or Tebuconazole 25.9 EC (1 ml/L). Repeat after 15 days if rust pressure persists.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Rust pustules dry up and turn brown-black; no new yellow spore dust on clothes.',
        isImmediateSafety: false
      },
      {
        id: 'wht-pt-2',
        title: 'Aphid Suppression at Booting / Heading',
        description: 'If aphids exceed ETL (10-15 aphids per earhead/tiller), spray Thiamethoxam 25 WG (0.25 g/L) or Neem oil 1500 ppm (3 ml/L).',
        timeframe: 'Day 2–4',
        completionCriteria: 'Aphid colonies eliminated from earheads; honeydew secretion stopped.'
      },
      {
        id: 'wht-pt-3',
        title: 'Termite Control in Light Soils',
        description: 'If termite attack causes wilting tillers, drench Chlorpyrifos 20 EC (2 ml/L) or Fipronil 5 SC (2 ml/L) with irrigation water into affected patches.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Termite mounds and subterranean tunnels neutralized.'
      },
      {
        id: 'wht-pt-4',
        title: 'Post-Treatment Foliar Nutrient Spray',
        description: 'Spray 19:19:19 (5 g/L) + Zinc chelate (1 g/L) to replenish photosynthetic vitality lost to fungal feeding.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Healthy green leaf area restored; grain filling continues.'
      }
    ],
    precautions: [
      'Never delay spraying when yellow rust is observed; yellow rust can destroy an entire field within 7-10 days under cool cloudy weather.',
      'Do not harvest within the fungicide Pre-Harvest Interval (PHI).'
    ],
    recoveryTimeline: [
      'Day 1–2: Immediate systemic rust and powdery mildew spray.',
      'Day 3–5: Aphid and termite intervention.',
      'Day 6–10: Follow-up scouting and foliar nutrition.',
      'Week 2–3: Grain filling stabilization.'
    ],
    recoveryIndicators: [
      'Pustules turn necrotic and cease releasing powdery spores.',
      'Earheads clean of aphid clustering.',
      'Flag leaves remain functional and green.',
      'Grain development proceeds to milky and dough stages.'
    ],
    escalationGuidance: [
      'If yellow rust appears in epidemic proportions, immediately report to the Regional Wheat Research Station (Mahabaleshwar/Niphad) and KVK.',
      'Notify the Agriculture Officer if certified seed lots show signs of seed-borne loose smut.'
    ]
  },

  wheat__unseasonal_rain: {
    cropId: 'wheat',
    cropName: 'Wheat (Gehun)',
    calamityType: 'UNSEASONAL_WEATHER',
    calamityName: 'Unseasonal Weather Event',
    damageOverview:
      'Unseasonal rain during March-April when wheat is ripe or harvested in heaps causes grain blackening, fungal smudge (Alternaria / Helminthosporium), pre-harvest sprouting in earheads, and severe dockage in APMC markets.',
    inspectionChecklist: [
      'Check maturity of the crop (golden brown earheads, moisture <15%).',
      'Examine whether standing wheat has lodged into mud.',
      'Open earheads and check grains for radicle emergence (sprouting) or black tips.',
      'Inspect harvested heaps for heat build-up and mold.',
      'Check grain moisture level.'
    ],
    steps: [
      {
        id: 'wht-ur-1',
        title: 'Immediate Field Drainage & Stagnation Relief',
        description: 'Cut bunds to drain all water from mature wheat fields so lodged plants do not stay soaked.',
        timeframe: 'First 24 hours',
        completionCriteria: 'Field surface drained; mud drying out.',
        isImmediateSafety: false
      },
      {
        id: 'wht-ur-2',
        title: 'Mechanized Quick Harvesting',
        description: 'As soon as combine harvesters can enter, harvest standing wheat before repeat rain showers occur.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Crop harvested and moved to elevated dry floors.'
      },
      {
        id: 'wht-ur-3',
        title: 'Aeration & Unpacking of Stored Heaps',
        description: 'Immediately dismantle any wet heaps or bundles stored in the field. Spread them out loosely on dry paved surfaces or plastic tarpaulins.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Wet heaps opened; internal heat and moisture vented.'
      },
      {
        id: 'wht-ur-4',
        title: 'Grain Cleaning & Solar Shade Drying',
        description: 'Thresh carefully and dry grains in thin layers (3-4 cm) in well-ventilated sheds or on tarpaulins until moisture drops below 11% for safe storage.',
        timeframe: 'Day 3–6',
        completionCriteria: 'Grain moisture reduced below 11%; grains crisp.'
      },
      {
        id: 'wht-ur-5',
        title: 'Quality Segregation for Market Realization',
        description: 'Separate luster-lost or blackened grains from bright golden grains using winnowing or seed graders to maximize market price.',
        timeframe: 'Day 6–8',
        completionCriteria: 'Grade-1 golden grains separated from rain-affected grains.'
      }
    ],
    precautions: [
      'Never store damp wheat grain (moisture >12%) in closed metal silos or gunny bags; it will spoil and produce mycotoxins.',
      'Do not burn rain-damaged straw; use it for animal fodder or compost.'
    ],
    recoveryTimeline: [
      'Day 1–2: Drainage and emergency harvesting.',
      'Day 2–4: Heap dismantling, aeration, and threshing.',
      'Day 4–7: Moisture reduction to <11%.',
      'Week 2: Safe storage in sealed bins with neem leaves.'
    ],
    recoveryIndicators: [
      'Grain dried to hard, clean texture.',
      'Absence of musty sour odor in storage bags.',
      'Grain moisture verified below 11%.',
      'No secondary fungal mold on stored grains.'
    ],
    escalationGuidance: [
      'File an intimation within 72 hours under PMFBY post-harvest loss provisions if rain damaged harvested crops lying in the field.',
      'Contact APMC market secretary if traders apply excessive deductions for luster-lost wheat.'
    ]
  },

  wheat__other: {
    cropId: 'wheat',
    cropName: 'Wheat (Gehun)',
    calamityType: 'OTHER',
    calamityName: 'Other Calamity',
    damageOverview:
      'Unforeseen events such as severe cold wave / ground frost during flowering, chemical weedicide drift (e.g. from neighbouring sugarcane), localized salinity patches, or stray cattle grazing.',
    inspectionChecklist: [
      'Inspect earheads for frost sterility (white, bleached spikelets with no grain formation).',
      'Check leaf tips for chemical burn or yellow chlorotic banding.',
      'Assess damage perimeter and map affected zone.',
      'Check root health in affected soil patches.',
      'Take photos of damage patterns.'
    ],
    steps: [
      {
        id: 'wht-ot-1',
        title: 'Frost Mitigation / Smoke Screening (Dhuan)',
        description: 'If a cold wave / frost (<4°C) is forecast, create light smoke screens along the north-west field borders at night by burning farm trash to raise field temperatures by 2-3°C.',
        timeframe: 'During frost event',
        completionCriteria: 'Smoke blanket maintained over the field during pre-dawn hours.',
        isImmediateSafety: false
      },
      {
        id: 'wht-ot-2',
        title: 'Protective Night Irrigation against Frost',
        description: 'Provide a light night irrigation during cold spells; the high specific heat of water protects the crop canopy from freezing injury.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Moisture present in the soil during freezing nights.'
      },
      {
        id: 'wht-ot-3',
        title: 'Foliar Anti-Stress & Detoxification Spray',
        description: 'For weedicide drift or frost injury, spray 1% Urea + 0.5% Zinc Sulphate + Humic acid (2 ml/L) to help plants metabolize stress compounds.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Foliar spray applied; green recovery in unaffected tillers.'
      },
      {
        id: 'wht-ot-4',
        title: 'Compensatory Nutrient Feeding',
        description: 'Spray water-soluble 19:19:19 (5 g/L) 7 days after the first spray to stimulate secondary tiller growth.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Healthy tillering in damaged patches.'
      }
    ],
    precautions: [
      'Do not apply additional herbicides to frost-stressed or chemically injured wheat.',
      'Avoid flood irrigation if frost is accompanied by gale winds.'
    ],
    recoveryTimeline: [
      'Day 1–2: Night irrigation and smoke screening.',
      'Day 3–5: Anti-stress foliar spray and damage assessment.',
      'Week 2: Secondary tiller nutrition.',
      'Week 3–4: Grain development in surviving tillers.'
    ],
    recoveryIndicators: [
      'Absence of leaf tip necrosis on emerging leaves.',
      'Viable grain formation in surviving earheads.',
      'Healthy secondary tillering.'
    ],
    escalationGuidance: [
      'For severe frost damage, request an official assessment by the Taluka Agriculture Officer for natural calamity relief.',
      'Consult KVK regarding soil salinity amendments (gypsum application) if salinity is the root cause.'
    ]
  }
};

