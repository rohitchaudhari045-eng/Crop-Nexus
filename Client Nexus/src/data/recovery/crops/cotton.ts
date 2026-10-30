import { CropRecoveryPlan } from '../types';

export const cottonPlans: Record<string, CropRecoveryPlan> = {
  cotton__heavy_rainfall: {
    cropId: 'cotton',
    cropName: 'Cotton (Kapas)',
    calamityType: 'HEAVY_RAINFALL',
    calamityName: 'Excessive / Heavy Rainfall',
    damageOverview:
      'Excessive rainfall in black cotton soils (Vertisols) causes severe water stagnation, suffocating the taproot system and precipitating "parawilt" (sudden drooping of leaves under bright sun). Excessive soil moisture also triggers square (bud) and young boll shedding, lower leaf chlorosis, and root rot complexes.',
    inspectionChecklist: [
      'Check furrows and low-lying field patches for standing water depth and drainage impediments.',
      'Examine root crowns and taproots by gently exposing soil around 4-5 plants; look for soft brown rotting or healthy white rootlets.',
      'Inspect square and boll retention rates on sympodial (fruiting) branches.',
      'Check for early signs of fungal foliar blights (Alternaria/Cercospora) on moisture-laden lower leaves.',
      'Assess soil firmness; look for heavy surface crusting or anaerobic gray mottling.'
    ],
    steps: [
      {
        id: 'cot-hr-1',
        title: 'Emergency Trench Drainage',
        description: 'Open furrows and cut through boundary bunds at the lowest elevation of the field to clear all standing water within 24 to 36 hours. Do not allow water to stand around the stem base.',
        timeframe: 'First 24 hours',
        completionCriteria: 'No standing water pools visible between rows; furrow channels flowing freely.',
        isImmediateSafety: true
      },
      {
        id: 'cot-hr-2',
        title: 'Prevent Parawilt Drooping with Cobalt / Nutrition',
        description: 'If plants exhibit sudden wilt as the sun comes out after rain, drench root zones with Cobalt Chloride (10 ppm or 10 mg per liter of water) or spray 1% Urea + 1% Potassium Chloride (MOP) to arrest sudden leaf desiccation.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Turgidity stabilized in treated cotton rows; reduction in midday drooping.'
      },
      {
        id: 'cot-hr-3',
        title: 'Inter-row Soil Aeration (Kolpa / Hoeing)',
        description: 'As soon as the topsoil reaches workable condition (vapsa condition), carry out light shallow hoeing with a bullock-drawn or mechanical kolpa to break the soil crust and restore air to the suffocating root zone.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Surface crust pulverized to 2-3 cm depth without disturbing the main taproots.'
      },
      {
        id: 'cot-hr-4',
        title: 'Foliar Booster Spray for Square Retention',
        description: 'Spray 2% DAP (Di-Ammonium Phosphate) or 19:19:19 (10 g/L) combined with Planofix (alpha-naphthyl acetic acid @ 4 ml per 15 L pump) to revive root activity and stop square and green boll drop.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Canopy greenness restored; shedding of squares halted.'
      },
      {
        id: 'cot-hr-5',
        title: 'Preventive Fungicide Cover against Leaf Blight',
        description: 'Apply Copper Oxychloride 50 WP (2.5 g/L) or Carbendazim 12% + Mancozeb 63% WP (2 g/L) targeted towards lower and middle canopy leaves to prevent Alternaria and Cercospora leaf spots.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Entire canopy covered with protective fungicide; no spreading brown circular leaf lesions.'
      },
      {
        id: 'cot-hr-6',
        title: 'Top-dressing Nitrogen & Potash Supplement',
        description: 'Apply 25-30 kg Urea along with 15 kg Muriate of Potash (MOP) per acre as band placement 7-10 cm away from the plant stem once the root system has recovered active white feeder roots.',
        timeframe: 'Day 12–15',
        completionCriteria: 'Band application completed into moist soil; vigorous vegetative flush emerging.'
      }
    ],
    precautions: [
      'Do not apply heavy granular urea while soil is waterlogged or muddy; this leads to severe root burning and gaseous nitrogen losses.',
      'Avoid deep plowing near cotton plants while soil is soggy, as it tears tender feeder roots.',
      'Do not spray chemical systemic insecticides on wilted plants until normal turgidity is restored.'
    ],
    recoveryTimeline: [
      'Day 1–2: Drain field completely and observe parawilt symptoms.',
      'Day 3–5: Root aeration and foliar nutrient resuscitation.',
      'Day 6–10: Protective fungicide spray and square retention hormones.',
      'Day 11–20: Soil side-dressing and emergence of new sympodial flushes.'
    ],
    recoveryIndicators: [
      'Disappearance of midday leaf wilting and drooping.',
      'Appearance of fresh white fibrous feeder roots near root crown.',
      'Halting of square and small boll drop.',
      'Unfurling of new dark green leaves at apical terminal buds.'
    ],
    escalationGuidance: [
      'If more than 40% of the standing crop wilts irreversibly within 48 hours of water recision, contact the Taluka Krishi Adhikari (TKA) for spot assessment.',
      'Consult the nearest Krishi Vigyan Kendra (KVK) if black vascular discoloration is visible inside split stems, indicating Fusarium wilt rather than waterlogging parawilt.'
    ]
  },

  cotton__flooding: {
    cropId: 'cotton',
    cropName: 'Cotton (Kapas)',
    calamityType: 'FLOODING',
    calamityName: 'River / Canal Flooding',
    damageOverview:
      'River or canal overflow deposits fine clay silt over cotton foliage, submerges the crop crown for several days, and erodes fertile topsoil. The deposition suffocates leaf stomata, while submerged bolls rot and develop saprophytic molds.',
    inspectionChecklist: [
      'Determine the depth of silt mud deposited around the stem base and over the canopy.',
      'Check whether the crop has completely lodged or tilted, and whether root anchoring is compromised.',
      'Scrape bark at root collar; green cambium indicates live plant capable of rejuvenation.',
      'Examine whether flood waters have washed away fertilizer beds and exposed lateral roots.',
      'Inspect for insect pest migration, particularly snails, slugs, or soil-borne grubs.'
    ],
    steps: [
      {
        id: 'cot-fl-1',
        title: 'Safe Field Entry & Drainage Outlets',
        description: 'Ensure flood water levels have safely receded before entering. Cut boundary ditches to lead trapped stagnant water back to natural drainage streams.',
        timeframe: 'Immediate upon flood recession',
        completionCriteria: 'Water table lowered below root level; accessible field pathways cleared.',
        isImmediateSafety: true
      },
      {
        id: 'cot-fl-2',
        title: 'Foliage Cleansing & Silt Removal',
        description: 'If power sprayers or pump sets are available, gently spray clean water over silt-caked cotton foliage before the mud bakes into a hard crust under sunlight.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Mud washed off upper leaves; stomatal pores open for transpiration and photosynthesis.'
      },
      {
        id: 'cot-fl-3',
        title: 'Gentle Stalk Staking & Earthing Up',
        description: 'Carefully prop up tilted or lodged plants while soil is soft. Mound fresh soil around the base (earthing up) to anchor exposed root systems.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Cotton stalks positioned upright without cracking root trunks.'
      },
      {
        id: 'cot-fl-4',
        title: 'Drenching Root Collar with Antifungal Solution',
        description: 'Drench the soil around each plant collar with Copper Oxychloride (3 g/L) or Trichoderma viride enriched FYM (2 kg per 100 kg compost) to prevent Rhizoctonia collar rot.',
        timeframe: 'Day 4–6',
        completionCriteria: 'All plant crowns drenched with fungicide solution.'
      },
      {
        id: 'cot-fl-5',
        title: 'Emergency Foliar Feeding',
        description: 'Since flood-damaged roots cannot absorb soil nutrients, spray 19:19:19 (10 g/L) + Micronutrient mixture (2.5 g/L) across the canopy to provide direct leaf nourishment.',
        timeframe: 'Day 6–8',
        completionCriteria: 'Uniform leaf wetting achieved; renewed gloss on upper leaves.'
      },
      {
        id: 'cot-fl-6',
        title: 'Pruning Rotten Low Bolls & Sanitation',
        description: 'Clip and remove water-soaked, black, or moldy bolls on lower branches (monopodia) to prevent spread of internal boll rot to upper developing fruit parts.',
        timeframe: 'Day 8–12',
        completionCriteria: 'Rotten bolls collected in bags and buried away from the plot.'
      }
    ],
    precautions: [
      'Never enter flood-inundated fields during active current or near submerged electricity transformers/lines.',
      'Do not apply chemical fertilizers directly onto wet silt until the soil dries sufficiently to walk without sinking.'
    ],
    recoveryTimeline: [
      'Day 1–3: Drainage, foliage washing, and plant uprighting.',
      'Day 4–7: Collar drenching and emergency foliar nutrition.',
      'Week 2: Sanitation pruning of rotten bolls and field drying.',
      'Week 3–4: New apical growth emergence and secondary flowering.'
    ],
    recoveryIndicators: [
      'Clean green leaves transpiring without leaf burn.',
      'Emergence of new axial shoots along the central stem.',
      'Firm soil consolidation around anchored root collars.',
      'Absence of foul-smelling collar decay.'
    ],
    escalationGuidance: [
      'If silt depth exceeds 15 cm across more than 50% of the land area, request a joint revenue-agriculture Panchanama for silt removal assistance.',
      'Notify the local Agriculture Assistant if collar rot spreads rapidly despite fungicide drenching.'
    ]
  },

  cotton__hailstorm: {
    cropId: 'cotton',
    cropName: 'Cotton (Kapas)',
    calamityType: 'HAILSTORM',
    calamityName: 'Severe Hailstorm',
    damageOverview:
      'Hail impact shatters the cotton canopy, strips leaves to midribs, bruises green bolls, punctures tender bark, and snaps fruiting branches. Open wounds serve as entry points for bacterial blight (Xanthomonas) and fungal rot.',
    inspectionChecklist: [
      'Assess the percentage of defoliation across the top, middle, and bottom canopy.',
      'Examine green bolls for hail punctures, bruised pericarp, or internal boll fiber rot.',
      'Check main stem terminal buds; determine whether apical dominance is broken.',
      'Count intact sympodial (fruiting) nodes remaining per plant.',
      'Inspect cracked bark for bacterial oozing or fungal discoloration.'
    ],
    steps: [
      {
        id: 'cot-hl-1',
        title: 'Antimicrobial Wound Sealing Spray',
        description: 'Within 24 to 48 hours of hailstorm cessation, spray Copper Oxychloride 50 WP (2.5 g/L) + Streptocycline (1 g per 10 L of water) to sterilize stem wounds and bruised bolls.',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'All injured stems and leaves covered with copper-antibiotic film.',
        isImmediateSafety: false
      },
      {
        id: 'cot-hl-2',
        title: 'Selective Pruning of Shattered Branches',
        description: 'Use sharp sanitized secateurs or sickle to cleanly prune hanging, crushed, or split branches just above the nearest healthy node to promote clean healing.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Torn wood removed; no ragged split stems left to foster fungal decay.'
      },
      {
        id: 'cot-hl-3',
        title: 'Growth Regulator & Nutrient Induction',
        description: 'Spray 12:61:00 (Mono-Ammonium Phosphate @ 5 g/L) along with Gibberellic Acid (GA3 @ 10 ppm) or brassinolide to stimulate rapid activation of dormant lateral axillary buds.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Bud swelling observed at axils; vegetative regrowth initiated.'
      },
      {
        id: 'cot-hl-4',
        title: 'Shallow Intercultivation & Weed Suppression',
        description: 'With the canopy open due to defoliation, weed seeds will germinate rapidly. Run a shallow hoe between rows to suppress weeds and conserve soil moisture.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Weed-free inter-row spaces; surface mulch created.'
      },
      {
        id: 'cot-hl-5',
        title: 'Balanced NPK Top-dressing',
        description: 'Apply 20 kg Urea + 15 kg Potash per acre once new shoots emerge to support the energy requirements of the regenerated secondary canopy.',
        timeframe: 'Day 12–15',
        completionCriteria: 'Nutrients placed in root zone; rapid expansion of new foliage.'
      }
    ],
    precautions: [
      'Do not uproot cotton plants hastily; cotton has extraordinary compensatory vegetative branching capacity if the main root and lower stem nodes are intact.',
      'Avoid heavy nitrogen application immediately following hail before wounds seal, as succulent soft tissue invites severe bacterial blight.'
    ],
    recoveryTimeline: [
      'Day 1–2: Wound sealing spray with copper and bactericide.',
      'Day 3–5: Clean pruning of ragged split stems.',
      'Day 6–10: Nutrient spray and dormant bud activation.',
      'Week 3–5: Expansion of secondary fruiting branches (ratoon-like compensation).'
    ],
    recoveryIndicators: [
      'Wounds on stems callous over with dry brown scar tissue.',
      'Vigorous emergence of new side shoots from uninjured nodes.',
      'Retention of uninjured bolls without fungal rot progression.',
      'Re-establishment of a healthy green canopy within 20 days.'
    ],
    escalationGuidance: [
      'If main stem terminal buds are smashed on more than 75% of plants during early vegetative stage, consult the local Agriculture Officer regarding re-sowing or ratoon management.',
      'Seek university advice if bacterial blight leaf lesions turn black and spread along leaf veins.'
    ]
  },

  cotton__strong_winds: {
    cropId: 'cotton',
    cropName: 'Cotton (Kapas)',
    calamityType: 'HIGH_VELOCITY_WINDS',
    calamityName: 'High Velocity Winds / Storm',
    damageOverview:
      'Gale-force squalls and storms cause lodging of heavy, boll-laden cotton plants, root loosening, branch splitting, and mechanical shedding of flowers and squares.',
    inspectionChecklist: [
      'Determine the angle of lodging (tilted 30-45° vs completely flat on the soil).',
      'Inspect root collars for partial uprooting or torn lateral anchor roots.',
      'Check for cracked main stems at branch junctions.',
      'Examine whether open cotton bolls have made contact with wet soil.',
      'Assess boll shedding percentage on the ground.'
    ],
    steps: [
      {
        id: 'cot-sw-1',
        title: 'Field Assessment & Immediate Harvesting of Open Bolls',
        description: 'Immediately pick any mature, opened cotton bolls before undertaking physical plant repositioning to keep lint clean and prevent soil contamination.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Opened white bolls picked and kept in clean dry gunny bags.'
      },
      {
        id: 'cot-sw-2',
        title: 'Manual Re-erection and Earthing Up',
        description: 'Gently lift tilted cotton stalks while soil retains moderate moisture. Mound 10-15 cm of soil firmly around the root collar to anchor the plant in its vertical position.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Plants standing upright; roots firmly covered with compacted soil.'
      },
      {
        id: 'cot-sw-3',
        title: 'Bamboo or Twine Staking for Row Stability',
        description: 'For tall, high-yielding Bt cotton varieties, install sturdy wooden or bamboo pegs at row ends and run jute twine along the row to support upright plants.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Continuous twine support along lodged rows preventing back-falling.'
      },
      {
        id: 'cot-sw-4',
        title: 'Anti-Stress Foliar Nutrition',
        description: 'Spray Potassium Nitrate (13:00:45 @ 10 g/L) + Boron (1 g/L) to relieve mechanical stress, strengthen stem fibers, and prevent boll drop on disturbed root systems.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Full foliar spray coverage; enhanced leaf turgidity.'
      },
      {
        id: 'cot-sw-5',
        title: 'Light Root Zone Irrigation (If Dry)',
        description: 'Give a light furrow irrigation to settle the disturbed soil around the repositioned roots, ensuring no air pockets remain around the root ball.',
        timeframe: 'Day 7–8',
        completionCriteria: 'Soil settled firmly around stems without waterlogging.'
      }
    ],
    precautions: [
      'Do not jerk or violently pull lodged plants when soil is dry, as this snaps the taproot.',
      'Do not leave lodged plants lying on wet soil for more than 48 hours, as bolls touching soil will rot rapidly.'
    ],
    recoveryTimeline: [
      'Day 1–2: Pick open cotton and assess root integrity.',
      'Day 2–4: Manual re-erection and firm earthing up.',
      'Day 5–7: Anti-stress potassium spray and trellis support.',
      'Week 2–3: Root re-anchorage and stabilization of boll development.'
    ],
    recoveryIndicators: [
      'Stalks maintaining vertical orientation without sagging.',
      'Firm soil bond around the root base with no loose wobble.',
      'Resumption of normal flowering and boll development.'
    ],
    escalationGuidance: [
      'Contact the local Gram Sevak if storm winds accompanied an unseasonal cyclone requiring formal crop loss documentation.',
      'Consult the KVK if stem splitting is accompanied by severe bacterial canker.'
    ]
  },

  cotton__drought: {
    cropId: 'cotton',
    cropName: 'Cotton (Kapas)',
    calamityType: 'DROUGHT',
    calamityName: 'Drought / Dry Spell',
    damageOverview:
      'Prolonged dry spells during flowering and boll development cause moisture stress, leaf scorching, extensive square and small boll drop, forced premature opening of bolls with weak fiber, and heightened susceptibility to sucking pests.',
    inspectionChecklist: [
      'Check soil moisture depth by digging 15-20 cm into the inter-row space.',
      'Monitor wilting index (temporary morning wilting indicates critical drought stage).',
      'Inspect square and flower retention rate per sympodial branch.',
      'Scout lower leaf undersides for thrips, jassids, and spider mite explosions.',
      'Examine green bolls for forced premature bursting.'
    ],
    steps: [
      {
        id: 'cot-dr-1',
        title: 'Deficit Drip or Alternate Furrow Irrigation',
        description: 'Apply water using drip systems in the early morning or evening. If using surface irrigation, irrigate alternate furrows to double water efficiency and cover maximum acreage.',
        timeframe: 'Immediate',
        completionCriteria: 'Moisture reached root zone in every second furrow without surface runoff.'
      },
      {
        id: 'cot-dr-2',
        title: 'Dust Mulching / Shallow Inter-cultivation',
        description: 'Run a blade harrow or hoe lightly between rows to break soil capillary pores and create a 3 cm loose soil mulch, which reduces soil moisture evaporation by up to 35%.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Fine dry dust mulch created in all inter-row spaces.'
      },
      {
        id: 'cot-dr-3',
        title: 'Foliar Osmoprotectant & Anti-Transpirant Spray',
        description: 'Spray 1% Potassium Nitrate (KNO3 @ 10 g/L) or Kaolin clay (anti-transpirant @ 30 g/L) to increase leaf cell turgor, reflect excess solar heat, and reduce transpiration losses.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Leaf canopy evenly covered; reduced leaf temperature and wilting.'
      },
      {
        id: 'cot-dr-4',
        title: 'Hormonal Spray to Stop Square Shedding',
        description: 'Spray NAA (Planofix @ 4 ml per 15 L pump) during morning hours to arrest the formation of abscission layers in flower pedicels caused by moisture stress.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Square drop arrested; retained squares opening into healthy flowers.'
      },
      {
        id: 'cot-dr-5',
        title: 'Targeted Sucking Pest Management',
        description: 'Drought conditions trigger rapid whitefly, thrips, and mite surges. Spray Flonicamid 50 WG (0.3 g/L) or Neem oil 10,000 ppm (2 ml/L) targeting leaf undersides.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Sucking pest population kept below economic threshold level (ETL).'
      }
    ],
    precautions: [
      'Never apply high-dose chemical nitrogen (urea) during drought; it increases vegetative water demand and burns leaf margins.',
      'Do not flood dry cracked black soils excessively in one go, as sudden saturation can induce root asphyxiation and sudden wilt.'
    ],
    recoveryTimeline: [
      'Day 1–3: Alternate furrow or drip irrigation and dust mulching.',
      'Day 4–7: Foliar potassium and anti-abscission hormone application.',
      'Week 2: Sucking pest containment and moisture conservation.',
      'Week 3–4: Resumption of regular flowering upon rain arrival or scheduled irrigation.'
    ],
    recoveryIndicators: [
      'Leaves remain erect and turgid throughout midday.',
      'Arrest of square and small green boll drop.',
      'Healthy emergence of white flowers that turn pink normally.',
      'Absence of leaf curling and honeydew sticky deposits.'
    ],
    escalationGuidance: [
      'If the dry spell exceeds 25 consecutive days during peak flowering, notify the District Agriculture Officer for drought distress notification.',
      'Consult KVK specialists if red leaf disease (anthocyanin accumulation) spreads widely across the field.'
    ]
  },

  cotton__pest_attack: {
    cropId: 'cotton',
    cropName: 'Cotton (Kapas)',
    calamityType: 'PEST_DISEASE',
    calamityName: 'Severe Pest / Disease Infestation',
    damageOverview:
      'Severe outbreak of Pink Bollworm (PBW - Pectinophora gossypiella), American bollworm, whitefly, or sudden bacterial blight / fungal wilt outbreaks exceeding Economic Threshold Levels (ETL), devastating fruiting structures and quality.',
    inspectionChecklist: [
      'Inspect 20 randomly selected green bolls per acre for rosette flowers and internal PBW larvae entrance holes.',
      'Check pheromone trap catches (more than 8 moths/trap/night for 3 consecutive days indicates ETL).',
      'Examine leaf undersides for whitefly adults and nymphs (ETL: 6-8 adults/leaf).',
      'Check for yellowing, mosaic mottling, or downward cupping of leaves.',
      'Inspect plant stems for bacterial cankers or vascular wilt browning.'
    ],
    steps: [
      {
        id: 'cot-pt-1',
        title: 'Pheromone Trap Network & Field Sanitation',
        description: 'Install 5-8 pheromone traps per acre with Gossyplure lures for Pink Bollworm monitoring and mass trapping. Handpick and destroy rosette flowers containing larvae.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Traps installed at canopy height; rosette flowers destroyed safely.',
        isImmediateSafety: false
      },
      {
        id: 'cot-pt-2',
        title: 'Bio-pesticide / Neem Initial Suppression',
        description: 'Spray Azadirachtin 1500 ppm (5 ml/L) or release egg parasitoids (Trichogramma bactrae @ 60,000 eggs/acre) to destroy insect egg clutches on terminal foliage.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Egg parasitoid cards tied or neem spray completed across whole field.'
      },
      {
        id: 'cot-pt-3',
        title: 'Targeted KVK Recommended Insecticide Application',
        description: 'If PBW larval entry is confirmed in green bolls, spray Chlorantraniliprole 18.5 SC (0.3 ml/L) or Spinetoram 11.7 SC (1 ml/L) using a hollow cone nozzle with thorough coverage.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Complete canopy spray in late afternoon hours; larval mortality verified.'
      },
      {
        id: 'cot-pt-4',
        title: 'Sucking Pest Knockdown Spray (If Co-infesting)',
        description: 'If whiteflies and jassids exceed ETL, spray Diafenthiuron 50 WP (1.2 g/L) or Afidopyropen 50 g/L (2 ml/L) targeting leaf undersides.',
        timeframe: 'Day 7–9',
        completionCriteria: 'Whitefly counts reduced below 2 per leaf; honeydew secretion stopped.'
      },
      {
        id: 'cot-pt-5',
        title: 'Foliar Rejuvenation Feed',
        description: 'Spray 19:19:19 (5 g/L) + Zinc chelate (1 g/L) 4 days after pesticide application to help plants overcome the metabolic drain of severe pest feeding.',
        timeframe: 'Day 10–13',
        completionCriteria: 'New unattacked terminal leaves expanding rapidly.'
      }
    ],
    precautions: [
      'Never spray synthetic pyrethroids repeatedly in early season, as this destroys natural predators and causes catastrophic resurgence of whiteflies and mites.',
      'Do not mix incompatible insecticides and weedicides in the same tank.',
      'Always observe recommended Waiting Periods (PHI) before picking open bolls.'
    ],
    recoveryTimeline: [
      'Day 1–3: Trapping, egg destruction, and bio-control initiation.',
      'Day 4–7: Targeted insecticide spray against active larvae.',
      'Day 8–12: Sucking pest containment and follow-up trap catch check.',
      'Week 3–4: Flushes of clean bolls and resumption of healthy flowering.'
    ],
    recoveryIndicators: [
      'Trap catches dropping below 3 moths per trap per night.',
      'Absence of fresh boreholes and frass on developing green bolls.',
      'Fresh white flowers opening cleanly without rosette petal twisting.',
      'Lower leaves free of sooty mold and honeydew shine.'
    ],
    escalationGuidance: [
      'If Pink Bollworm infestation exceeds 20% boll damage despite recommended sprays, immediately alert the District Agricultural Officer and KVK entomologist for resistance monitoring.',
      'Report any suspected spurious or ineffective pesticide batch with invoice to the Krishi Seva Kendra.'
    ]
  },

  cotton__unseasonal_rain: {
    cropId: 'cotton',
    cropName: 'Cotton (Kapas)',
    calamityType: 'UNSEASONAL_WEATHER',
    calamityName: 'Unseasonal Weather Event',
    damageOverview:
      'Unseasonal rainfall during November-January coincides with cotton picking season. Open bolls get soaked, causing lint yellowing, seed germination inside the boll, fiber staining, and fungal mold (Aspergillus and Fusarium boll rot).',
    inspectionChecklist: [
      'Check percentage of opened bolls that are water-soaked or stained.',
      'Inspect lint for internal seed sprouting or black/pink fungal mycelium.',
      'Examine mature unopened bolls for rot entering through the bracts.',
      'Determine moisture content of harvested heaps stored in fields.',
      'Check whether wet heavy bolls are causing plant lodging.'
    ],
    steps: [
      {
        id: 'cot-ur-1',
        title: 'Immediate Picking of Mature Wet Bolls',
        description: 'As soon as rain stops, pick all open and semi-open bolls immediately. Do not allow soaked seed cotton to dry on the plant under humid overcast conditions.',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'Soaked open bolls separated from unburst green bolls.'
      },
      {
        id: 'cot-ur-2',
        title: 'Shade Drying & Moisture Reduction',
        description: 'Spread the picked wet seed cotton on clean plastic tarpaulins under a well-ventilated shed in thin layers (5-7 cm thick). Turn every 2 hours until moisture drops below 9%.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Seed cotton moisture reduced; no musty odor or mold developing.'
      },
      {
        id: 'cot-ur-3',
        title: 'Protective Spray for Retained Green Bolls',
        description: 'Spray Propiconazole 25 EC (1 ml/L) or Copper Oxychloride 50 WP (2.5 g/L) on standing green bolls to arrest fungal entry into unburst bolls.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Standing crop sprayed; green bolls protected from secondary rot.'
      },
      {
        id: 'cot-ur-4',
        title: 'Grade Separation of Stained Cotton',
        description: 'Strictly separate clean white lint from discolored or yellow-stained cotton during picking. Mixing stained cotton reduces the entire lot price at APMC markets.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Grade A white cotton bagged separately from stained Grade B/C cotton.'
      },
      {
        id: 'cot-ur-5',
        title: 'Terminal Shoot Nipping for Last Picking',
        description: 'Nip top vegetative growth points (terminal buds) to direct all remaining plant energy into maturing the final flush of upper green bolls.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Top terminal buds nipped across the field.'
      }
    ],
    precautions: [
      'Never pack damp or wet seed cotton into polypropylene bags or closed rooms; it will spontaneously heat, discolor, and destroy germination viability.',
      'Do not sun-dry cotton directly on bare soil where dust and leaf trash contaminate lint.'
    ],
    recoveryTimeline: [
      'Day 1–2: Emergency harvest of soaked bolls.',
      'Day 2–5: Scientific thin-layer drying and fungicide application.',
      'Day 6–10: Grade separation and terminal shoot management.',
      'Week 2–3: Safe market dispatch and final picking of remaining green bolls.'
    ],
    recoveryIndicators: [
      'Harvested lint dried to crisp touch with bright white luster.',
      'Absence of mold growth or rancid sour smell in drying shed.',
      'Green bolls opening smoothly on standing plants without rot.',
      'Clear grade segregation preserved for market realization.'
    ],
    escalationGuidance: [
      'Submit crop damage intimation within 72 hours under PMFBY if unseasonal rain caused severe loss to unpicked cotton.',
      'Contact APMC market quality inspectors if cotton buyers attempt excessive unauthorized price deductions for minor moisture.'
    ]
  },

  cotton__other: {
    cropId: 'cotton',
    cropName: 'Cotton (Kapas)',
    calamityType: 'OTHER',
    calamityName: 'Other Calamity',
    damageOverview:
      'Unforeseen calamity such as herbicide drift from neighbouring plots, sudden micro-burst lightning scorch, localized soil subsidence, or stray cattle herd trampling affecting distinct field zones.',
    inspectionChecklist: [
      'Map the perimeter and boundary of the specifically damaged zone.',
      'Check leaf deformation patterns (e.g. epinasty / strap leaves from 2,4-D herbicide drift vs physical breakage).',
      'Examine whether terminal growing points are viable.',
      'Inspect root system integrity and soil compaction levels.',
      'Document evidence with timestamped photos for insurance and legal clarity.'
    ],
    steps: [
      {
        id: 'cot-ot-1',
        title: 'Identify Calamity Source & Prevent Recurrence',
        description: 'Determine exact cause (chemical drift, wild animal intrusion, soil issue). Install temporary boundary fencing or notify adjacent operators immediately.',
        timeframe: 'Day 1',
        completionCriteria: 'Cause identified; field boundary secured against further intrusion.',
        isImmediateSafety: true
      },
      {
        id: 'cot-ot-2',
        title: 'Foliar Neutralizing / Stress Relief Wash',
        description: 'In case of chemical drift or soot deposition, thoroughly wash crop foliage with clean water containing 1% Activated Charcoal or 0.5% Urea + 0.5% Zinc Sulphate to metabolize toxins.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Canopy washed; toxic residues diluted on plant surfaces.'
      },
      {
        id: 'cot-ot-3',
        title: 'Pruning Crushed or Scorched Branches',
        description: 'Remove mechanically crushed branches or scorched tissue cleanly with sanitized shears to promote axillary bud activation.',
        timeframe: 'Day 3–4',
        completionCriteria: 'Damaged tissue trimmed back to healthy green nodes.'
      },
      {
        id: 'cot-ot-4',
        title: 'Bio-stimulant & Humic Acid Root Drench',
        description: 'Apply Humic acid (12% @ 5 ml/L) or Seaweed extract (2 ml/L) along with light irrigation to stimulate vigorous secondary root proliferation.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Root drench completed; renewed active root hair formation.'
      },
      {
        id: 'cot-ot-5',
        title: 'Compensatory Foliar Nutrition',
        description: 'Spray 19:19:19 (5 g/L) + Micronutrient mixture (2 g/L) every 8-10 days until affected plants match the vigor of undamaged sections.',
        timeframe: 'Day 8–15',
        completionCriteria: 'Symmetrical growth recovery in previously damaged zone.'
      }
    ],
    precautions: [
      'Do not apply broad-spectrum systemic chemicals until the exact cause of damage is diagnosed.',
      'Avoid walking repeatedly over compacted trampled soil while wet.'
    ],
    recoveryTimeline: [
      'Day 1–2: Source identification, perimeter securing, and foliage wash.',
      'Day 3–5: Pruning of damaged tissue and bio-stimulant root application.',
      'Week 2–3: Foliar micronutrient therapy and compensatory vegetative flush.',
      'Week 4: Re-establishment of uniform flowering and boll load.'
    ],
    recoveryIndicators: [
      'Emergence of normal, non-distorted new leaves from axillary nodes.',
      'Restoration of regular sympodial branch development.',
      'Good boll retention in the rehabilitated zone.'
    ],
    escalationGuidance: [
      'For herbicide drift or third-party damage, request an official spot inspection by the Taluka Agriculture Officer and file an intimation with local authorities.',
      'Consult KVK agronomists if unexplained leaf epinasty persists across multiple rows.'
    ]
  }
};

