import { CropRecoveryPlan } from '../types';

export const paddyPlans: Record<string, CropRecoveryPlan> = {
  paddy__heavy_rainfall: {
    cropId: 'paddy',
    cropName: 'Paddy (Rice)',
    calamityType: 'HEAVY_RAINFALL',
    calamityName: 'Excessive / Heavy Rainfall',
    damageOverview:
      'Excessive downpours submerge nursery seedlings or freshly transplanted rice fields beyond optimal water depth (3-5 cm), suffocating young tillers, washing away top-dressed nitrogen fertilizers, and inducing severe blast and sheath blight epidemics.',
    inspectionChecklist: [
      'Check water depth across terraces and paddies (water level >10 cm suffocates tillering).',
      'Inspect spillways and bund weirs (moris) for overflow and structural breaches.',
      'Check seedlings for rotting of the collar and soft brown leaves.',
      'Inspect lower leaf sheaths for water-soaked oval lesions (sheath blight).',
      'Examine leaf blades for spindle-shaped blast lesions.'
    ],
    steps: [
      {
        id: 'pad-hr-1',
        title: 'Lower Bund Weirs & Regulate Water Depth',
        description: 'Immediately cut notches into boundary bunds to lower water depth to 3-5 cm. Allow excess water to drain into drainage streams so tillers can breathe.',
        timeframe: 'First 24 hours',
        completionCriteria: 'Water depth reduced to 3-5 cm; seedling tips exposed to air.',
        isImmediateSafety: true
      },
      {
        id: 'pad-hr-2',
        title: 'Replenish Leached Nitrogen & Zinc',
        description: 'Because heavy rain leaches urea rapidly, top-dress 20 kg Urea + 10 kg Zinc Sulphate (21%) per acre mixed with neem cake (5 kg) once water level is stabilized.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Neem-coated urea applied in shallow standing water.'
      },
      {
        id: 'pad-hr-3',
        title: 'Preventive Blast & Sheath Blight Spray',
        description: 'Spray Tricyclazole 75 WP (0.6 g/L) or Azoxystrobin 18.2% + Difenoconazole 11.4% SC (1 ml/L) targeting leaf sheaths and blades.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Canopy thoroughly covered with protective fungicide.'
      },
      {
        id: 'pad-hr-4',
        title: 'Gap Filling with Split Tillers (Kharif / Rabi)',
        description: 'If waterlogging killed patches of seedlings, take vigorous tillers from dense adjoining hills and transplant them into empty gaps (gap-filling).',
        timeframe: 'Day 6–8',
        completionCriteria: 'Uniform plant population re-established across all terrace basins.'
      },
      {
        id: 'pad-hr-5',
        title: 'Potash Application for Stalk Rigidity',
        description: 'Apply 15 kg Muriate of Potash (MOP) per acre at active tillering to strengthen cell walls against lodging and fungal penetration.',
        timeframe: 'Day 10–12',
        completionCriteria: 'Potash incorporated into soil; stems firm and upright.'
      }
    ],
    precautions: [
      'Do not apply excessive granular urea during continuous cloudy weather; it invites explosive blast outbreaks.',
      'Do not allow stagnant water depth to exceed 10 cm during early tillering.'
    ],
    recoveryTimeline: [
      'Day 1–2: Weir adjustment and water depth regulation.',
      'Day 3–5: Leached nitrogen/zinc top-dressing.',
      'Day 6–8: Fungicide spray and tiller gap filling.',
      'Week 2–3: Active tillering and canopy expansion.'
    ],
    recoveryIndicators: [
      'Seedling leaves turn bright green and stand erect.',
      'Emergence of 8-12 sturdy tillers per hill.',
      'Absence of spindle-shaped blast lesions on leaf blades.',
      'Vigorous root anchoring into the puddled mud.'
    ],
    escalationGuidance: [
      'If leaf blast lesions coalesce causing total burn down of seedlings, alert the local KVK rice agronomist immediately.',
      'Notify the revenue authority if terrace bunds were washed away by flash floods.'
    ]
  },

  paddy__flooding: {
    cropId: 'paddy',
    cropName: 'Paddy (Rice)',
    calamityType: 'FLOODING',
    calamityName: 'River / Canal Flooding',
    damageOverview:
      'Flash floods submerge paddy fields completely for several days, depositing thick silt mud over leaves, snapping tillers, and suffocating roots. Submergence beyond 6-7 days causes complete decay of non-submergence tolerant varieties.',
    inspectionChecklist: [
      'Determine days of complete submergence under muddy water.',
      'Check whether the central spindle leaf is green and firmly attached or rotten and foul-smelling.',
      'Examine the thickness of silt clay deposited over leaf blades.',
      'Count viable hills per square meter (aim for at least 25-30 hills/sq.m).',
      'Inspect roots for dark black sulfur/iron toxicity odor.'
    ],
    steps: [
      {
        id: 'pad-fl-1',
        title: 'Drain Stagnant Flood Water Completely',
        description: 'Cut multiple drainage outlets in bunds to completely evacuate muddy flood water. Expose plants to sunlight and fresh air.',
        timeframe: 'Day 1–2',
        completionCriteria: 'All flood water drained; mud surface exposed.',
        isImmediateSafety: true
      },
      {
        id: 'pad-fl-2',
        title: 'Wash Silt Mud off Rice Foliage',
        description: 'Using a high-pressure knapsack sprayer with clean water, spray muddy foliage to rinse away the clay coating before it hardens into an impenetrable crust.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Foliage cleared of silt; green leaves visible.'
      },
      {
        id: 'pad-fl-3',
        title: 'Foliar Nutrient Resuscitation',
        description: 'Spray 1% Urea + 1% MOP (Potash) or 19:19:19 (10 g/L) across the canopy to provide direct foliar nutrition to weakened plants.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Foliar spray absorbed; leaves regaining luster.'
      },
      {
        id: 'pad-fl-4',
        title: 'Bacterial Leaf Blight & Sheath Rot Cover',
        description: 'Flood water spreads Bacterial Leaf Blight (BLB). Spray Copper Oxychloride (2.5 g/L) + Streptocycline (1 g per 10 L) to arrest bacterial invasion.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Complete canopy treated with bactericide-fungicide mix.'
      },
      {
        id: 'pad-fl-5',
        title: 'Alternate Wetting and Drying (AWD) for Root Aeration',
        description: 'Do not flood the field immediately. Allow the soil surface to dry until hair-line cracks appear, then irrigate to 3 cm depth. This draws fresh oxygen into the black anaerobic mud.',
        timeframe: 'Day 7–15',
        completionCriteria: 'Healthy white adventitious roots branching from the crown.'
      }
    ],
    precautions: [
      'Do not apply heavy urea immediately after flood recession; wait until new green leaves appear.',
      'Avoid deep standing water while plants are recovering from flood shock.'
    ],
    recoveryTimeline: [
      'Day 1–3: Drainage, silt washing, and emergency foliar feeding.',
      'Day 4–7: Antibacterial spray and root aeration via AWD.',
      'Week 2: New root and tiller emergence.',
      'Week 3–4: Re-establishment of normal flooded paddy ecology.'
    ],
    recoveryIndicators: [
      'Central spindle leaves unfurl green and crisp.',
      'Appearance of fresh white rootlets near the water line.',
      'Formation of new tillers from lower nodes.',
      'Absence of bacterial leaf blight yellowing.'
    ],
    escalationGuidance: [
      'If more than 60% of hills are dead after 7 days of submergence, contact the Agriculture Assistant for contingency re-transplanting or direct-seeded short-duration varieties (e.g., Karjat 184).',
      'Document flood loss with photos for disaster relief assistance.'
    ]
  },

  paddy__hailstorm: {
    cropId: 'paddy',
    cropName: 'Paddy (Rice)',
    calamityType: 'HAILSTORM',
    calamityName: 'Severe Hailstorm',
    damageOverview:
      'Hail impact shreds rice leaf blades, breaks tender stems, shatters panicles during flowering or dough stage, and knocks grains into the muddy water.',
    inspectionChecklist: [
      'Assess stage of rice crop (tillering vs panicle initiation vs grain filling).',
      'Examine flag leaves for shredding and breakage.',
      'Check panicles for shattered spikelets and broken rachises.',
      'Inspect stem sheaths for bruised and cracked internodes.',
      'Estimate grain loss percentage.'
    ],
    steps: [
      {
        id: 'pad-hl-1',
        title: 'Protective Fungicide Spray for Bruised Foliage',
        description: 'Within 24-48 hours, spray Propiconazole 25 EC (1 ml/L) or Carbendazim + Mancozeb (2 g/L) to prevent blast and false smut from colonizing hail wounds.',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'Injured leaves coated with protective systemic fungicide.',
        isImmediateSafety: false
      },
      {
        id: 'pad-hl-2',
        title: 'Drain & Regulate Water Level',
        description: 'Drain excess water down to 2-3 cm to facilitate aeration around wounded stem bases and prevent rotting of crushed tissues.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Water level lowered to shallow depth.'
      },
      {
        id: 'pad-hl-3',
        title: 'Foliar Nutrient Spray for Tillering Crops',
        description: 'If crop was in vegetative or tillering stage, spray 19:19:19 (10 g/L) + Zinc chelate (1 g/L) to stimulate rapid secondary tiller emergence.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Foliar nutrition applied; dormant buds swelling.'
      },
      {
        id: 'pad-hl-4',
        title: 'Top-dress Split Nitrogen & Potash',
        description: 'Apply 15 kg Urea + 10 kg MOP per acre once new tillers begin emerging to replace the damaged foliage.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Nutrients incorporated into shallow water; vigorous regrowth.'
      }
    ],
    precautions: [
      'Do not abandon the crop if hail struck during vegetative or early tillering stages; rice has tremendous regenerative capacity.',
      'Do not apply heavy nitrogen if hail occurred at dough stage; it will only promote disease and delay harvest.'
    ],
    recoveryTimeline: [
      'Day 1–2: Wound disinfection spray.',
      'Day 3–5: Water regulation and foliar feeding.',
      'Day 6–10: Top-dressing and secondary tiller flush.',
      'Week 3–4: Rebuilt canopy and delayed panicle emergence.'
    ],
    recoveryIndicators: [
      'Emergence of new, unblemished tillers from the base.',
      'Dry calluses forming over bruised leaf blades without spreading rot.',
      'Active root anchorage.'
    ],
    escalationGuidance: [
      'If hail struck during ripening and grain shattering exceeds 50%, request an emergency Panchanama for PMFBY localized hailstorm compensation.',
      'Consult KVK on drying and milling quality of partially bruised grains.'
    ]
  },

  paddy__strong_winds: {
    cropId: 'paddy',
    cropName: 'Paddy (Rice)',
    calamityType: 'HIGH_VELOCITY_WINDS',
    calamityName: 'High Velocity Winds / Storm',
    damageOverview:
      'Gale winds and storms cause severe lodging of tall, high-yielding rice crops into standing water, leading to panicle submergence, grain sprouting, sheath rot, and severe harvest difficulties.',
    inspectionChecklist: [
      'Determine lodging severity: leaning at 45° vs completely flat in water.',
      'Check whether submerged panicles are touching muddy water.',
      'Inspect lower stems for buckling or snapping at the ground line.',
      'Look for early viviparous germination (grain sprouting on the panicle).',
      'Assess sheath rot and brown planthopper resurgence under lodged canopy.'
    ],
    steps: [
      {
        id: 'pad-sw-1',
        title: 'Immediate Field Drainage (Keep Panicles Dry)',
        description: 'Cut bunds to drain every drop of standing water from the field immediately. Keeping panicles out of standing water prevents premature sprouting and grain rotting.',
        timeframe: 'Immediate',
        completionCriteria: 'Standing water drained; soil surface drying rapidly.',
        isImmediateSafety: true
      },
      {
        id: 'pad-sw-2',
        title: 'Upright Sheaf Bundling (Propping)',
        description: 'Gently lift leaning or lodged rice hills and tie 4-6 adjacent hills together with straw or jute twine into an upright standing bundle (sheaf propping).',
        timeframe: 'Day 1–3',
        completionCriteria: 'Lodged hills bundled upright; panicles elevated above soil level.'
      },
      {
        id: 'pad-sw-3',
        title: 'Foliar Salt Spray against Sprouting',
        description: 'If rain continues on lodged mature panicles, spray 5% Common Salt solution (50 g/L) on panicles to inhibit in-panicle seed germination.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Panicles wetted with salt solution; germination delayed.'
      },
      {
        id: 'pad-sw-4',
        title: 'Sheath Rot & BPH Preventive Spray',
        description: 'Spray Hexaconazole 5 EC (2 ml/L) or Carbendazim (1 g/L) around stem bases to prevent sheath rot in the dense canopy.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Stem bases treated; no spreading brown rot.'
      }
    ],
    precautions: [
      'Never allow lodged panicles to remain submerged in stagnant water; grains will germinate within 48 hours.',
      'Do not apply additional nitrogen to lodged rice.'
    ],
    recoveryTimeline: [
      'Day 1–2: Drain all field water.',
      'Day 2–4: Sheaf bundling and anti-sprouting spray.',
      'Day 5–8: Fungal and pest protection.',
      'Week 2–3: Safe manual harvesting.'
    ],
    recoveryIndicators: [
      'Panicles held elevated in dry air.',
      'Absence of white rootlets (sprouting) on grains.',
      'Grain filling proceeds to full dough stage.',
      'Stems remain intact without snapping.'
    ],
    escalationGuidance: [
      'Arrange priority manual harvesting labor if combine harvesters cannot navigate lodged, muddy fields.',
      'Notify the insurance surveyor if lodging during flowering caused extensive sterility (chaffy grain).'
    ]
  },

  paddy__drought: {
    cropId: 'paddy',
    cropName: 'Paddy (Rice)',
    calamityType: 'DROUGHT',
    calamityName: 'Drought / Dry Spell',
    damageOverview:
      'Dry spells cause soil cracking, loss of standing water, severe leaf rolling, spikelet sterility during flowering ("chaffy panicles"), and rapid flare-up of blast disease and brown planthopper.',
    inspectionChecklist: [
      'Monitor depth and width of soil cracks across paddy terraces.',
      'Observe leaf rolling time (morning rolling indicates severe moisture crisis).',
      'Examine panicles for white empty spikelets (chaffiness) during boot/flowering.',
      'Check for neck blast and leaf blast lesions.',
      'Inspect stem base for brown planthopper clustering.'
    ],
    steps: [
      {
        id: 'pad-dr-1',
        title: 'Life-Saving Irrigation at Critical Stages',
        description: 'Prioritize water application for critical stages: Panicle Initiation (45-50 DAS) and Flowering (75-80 DAS). Maintain saturated soil even if standing water is unavailable.',
        timeframe: 'Immediate',
        completionCriteria: 'Soil cracks closed; root zone saturated with water.'
      },
      {
        id: 'pad-dr-2',
        title: 'Alternate Wetting and Drying (AWD)',
        description: 'Practice AWD by allowing water to disappear until soil is saturated (not cracked) before re-irrigating to 2-3 cm. This saves 30-40% water while maintaining yields.',
        timeframe: 'Ongoing during dry spell',
        completionCriteria: 'Water applied in cycles; maximum area covered.'
      },
      {
        id: 'pad-dr-3',
        title: 'Foliar Potassium Nitrate Anti-Stress Spray',
        description: 'Spray 1% Potassium Nitrate (13:00:45 @ 10 g/L) or 1% MOP (Potash) to enhance stomatal regulation and maintain cell turgidity during drought stress.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Foliar application completed in early morning hours.'
      },
      {
        id: 'pad-dr-4',
        title: 'Blast Disease Vigilance',
        description: 'Drought stress makes rice hyper-susceptible to blast. Spray Tricyclazole 75 WP (0.6 g/L) or Isoprothiolane 40 EC (1.5 ml/L) at boot leaf stage.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Fungicide barrier established against leaf and neck blast.'
      }
    ],
    precautions: [
      'Do not apply top-dressed urea while soil is cracked and dry; it will volatilize and cause severe leaf tip burning.',
      'Never let fields dry out completely during the 10 days of peak flowering.'
    ],
    recoveryTimeline: [
      'Day 1–2: Emergency life-saving irrigation to seal soil cracks.',
      'Day 3–5: Foliar potassium anti-stress spray.',
      'Day 6–10: Blast prevention and AWD scheduling.',
      'Week 2–3: Successful pollination and grain development.'
    ],
    recoveryIndicators: [
      'Leaf blades unfurl and remain flat throughout the day.',
      'Panicles emerge with yellow fertile anthers.',
      'Grain filling proceeds smoothly with minimal chaffiness.'
    ],
    escalationGuidance: [
      'If drought continues for over 20 days during flowering, report to the District Agriculture Officer for drought loss assessment under PMFBY.',
      'Consult KVK on drought-tolerant varieties (e.g., Sahbhagi Dhan) for future seasons.'
    ]
  },

  paddy__pest_attack: {
    cropId: 'paddy',
    cropName: 'Paddy (Rice)',
    calamityType: 'PEST_DISEASE',
    calamityName: 'Severe Pest / Disease Infestation',
    damageOverview:
      'Severe infestation of Brown Planthopper (BPH - causing "hopper burn" patches of circular dead brown plants), Yellow Stem Borer ("dead hearts" in vegetative stage, "white ears" in reproductive stage), Blast, or Bacterial Leaf Blight.',
    inspectionChecklist: [
      'Part rice hills at water level and inspect stem bases for BPH nymphs and adults (ETL: 5-10 hoppers/hill).',
      'Look for circular patches of drying, brown, burned-looking plants ("hopper burn").',
      'Check for white, empty, erect panicles that pull out easily ("white ear" from stem borer).',
      'Examine leaf margins for wavy yellow-orange wilting stripes (Bacterial Leaf Blight).',
      'Check panicle neck for brown necrotic lesions (Neck Blast).'
    ],
    steps: [
      {
        id: 'pad-pt-1',
        title: 'Drain Standing Water for 2–3 Days',
        description: 'Immediately drain all water from the field for 48-72 hours. BPH requires high humidity at the stem base; draining water disrupts their microclimate and stops reproduction.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Field water drained; BPH population exposed to sunlight and dry air.',
        isImmediateSafety: false
      },
      {
        id: 'pad-pt-2',
        title: 'Create Alleyways / Pathways in Dense Canopies',
        description: 'Create 30 cm wide alleyways every 2-3 meters through the field by bending hills. This improves sunlight penetration and facilitates targeted pesticide application.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Alleyways opened through dense rice canopy.'
      },
      {
        id: 'pad-pt-3',
        title: 'Targeted BPH Knockdown Spray',
        description: 'Spray Pymetrozine 50 WG (0.6 g/L) or Dinotefuran 20 SG (0.4 g/L) or Triflumezopyrim 10 SC (0.5 ml/L) directing the spray nozzle strictly at the base of rice stems.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Stem bases thoroughly wetted; rapid hopper mortality confirmed.'
      },
      {
        id: 'pad-pt-4',
        title: 'Stem Borer & Blast Simultaneous Management',
        description: 'If stem borer (white ears) or blast is also present, spray Chlorantraniliprole 18.5 SC (0.3 ml/L) + Tricyclazole 75 WP (0.6 g/L).',
        timeframe: 'Day 4–6',
        completionCriteria: 'Borer and blast protection achieved across entire field.'
      },
      {
        id: 'pad-pt-5',
        title: 'Foliar Restorative Nutrition',
        description: 'Once hoppers are controlled, re-irrigate and spray 19:19:19 (5 g/L) to help surviving tillers produce compensatory grain filling.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Green vegetative recovery around margins of hopper burn patches.'
      }
    ],
    precautions: [
      'Never spray synthetic pyrethroids (e.g. cypermethrin) for BPH; this causes catastrophic hopper resurgence by killing spiders and mirid bugs.',
      'Do not apply excess nitrogen fertilizer, which makes rice stems succulent and attractive to BPH.'
    ],
    recoveryTimeline: [
      'Day 1–3: Field drainage and alleyway opening.',
      'Day 2–4: Base-targeted insecticide application.',
      'Day 5–7: Re-irrigation and pest scouting.',
      'Week 2–3: Canopy stabilization and grain maturation.'
    ],
    recoveryIndicators: [
      'Hopper population dropping below 2 per hill.',
      'Halting of hopper burn circular patch expansion.',
      'New tillers remaining green and free of stem borer entry holes.',
      'Clean panicle emergence.'
    ],
    escalationGuidance: [
      'If hopper burn spreads across more than 25% of the field within 4 days, immediately alert the District Agriculture Officer and KVK entomologist.',
      'Report any suspected spurious insecticide batches to Krishi Seva Kendra.'
    ]
  },

  paddy__unseasonal_rain: {
    cropId: 'paddy',
    cropName: 'Paddy (Rice)',
    calamityType: 'UNSEASONAL_WEATHER',
    calamityName: 'Unseasonal Weather Event',
    damageOverview:
      'Unseasonal rain during October-November when paddy is ripe or harvested in sheaves causes panicle submergence, pre-harvest grain sprouting (vivipary), grain discoloration, false smut multiplication, and grain shattering.',
    inspectionChecklist: [
      'Check maturity of the crop (golden brown panicles, hard dough stage).',
      'Inspect whether ripe panicles are resting in water or mud.',
      'Examine grains on the panicle for sprouting (white radicles protruding from husks).',
      'Check harvested heaps (puj) for internal heat and musty odor.',
      'Determine paddy grain moisture.'
    ],
    steps: [
      {
        id: 'pad-ur-1',
        title: 'Emergency Drainage of Paddy Basins',
        description: 'Immediately cut bunds to drain all water from mature fields so panicles dry out quickly.',
        timeframe: 'First 24 hours',
        completionCriteria: 'All standing water removed from mature plots.',
        isImmediateSafety: false
      },
      {
        id: 'pad-ur-2',
        title: 'Anti-Sprouting Salt Spray (NaCl 5%)',
        description: 'Spray 5% Common Salt solution (50 g/L) directly on wet, ripe standing panicles. The high osmotic pressure inhibits grain enzymes and delays in-panicle sprouting for 4-5 days.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Panicles sprayed with salt solution; germination arrested.'
      },
      {
        id: 'pad-ur-3',
        title: 'Priority Manual or Tracked Combine Harvest',
        description: 'Harvest as soon as weather permits. If fields are too wet for wheeled combines, use tracked combine harvesters or manual sickle harvesting.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Crop harvested and moved to elevated dry floors.'
      },
      {
        id: 'pad-ur-4',
        title: 'Dismantle Wet Bundles & Aerate',
        description: 'Do not stack wet paddy sheaves in large heaps. Spread them loosely on threshing floors or tarpaulins to prevent mold and spontaneous heating.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Wet sheaves aerated; internal heating prevented.'
      },
      {
        id: 'pad-ur-5',
        title: 'Threshing & Scientific Drying',
        description: 'Thresh promptly and dry grains in thin layers (3-5 cm) on clean tarpaulins under shade or mild sun until moisture drops below 13-14% for safe storage.',
        timeframe: 'Day 4–7',
        completionCriteria: 'Paddy moisture brought below 14%; grains crisp.'
      }
    ],
    precautions: [
      'Never store damp paddy (moisture >14%) in gunny bags; fungus and yellowing will ruin the milling recovery.',
      'Do not sun-dry wet paddy under harsh scorching sun directly on concrete; rapid moisture loss causes grain cracking (poor head rice recovery).'
    ],
    recoveryTimeline: [
      'Day 1–2: Drain field and apply anti-sprouting salt spray.',
      'Day 2–4: Emergency harvest and sheaf aeration.',
      'Day 4–7: Threshing and gradual shade drying to 13-14% moisture.',
      'Week 2: Safe storage and bagging.'
    ],
    recoveryIndicators: [
      'Grains dried to hard, clean texture without protruding sprouts.',
      'Golden husk color maintained without black fungal discoloration.',
      'Paddy grain moisture verified below 14%.',
      'High milling quality with minimal broken grains.'
    ],
    escalationGuidance: [
      'File an intimation within 72 hours under PMFBY post-harvest loss provisions if harvested paddy was damaged in the field.',
      'Consult the rice millers association and APMC if traders apply excessive deductions for rain-affected paddy.'
    ]
  },

  paddy__other: {
    cropId: 'paddy',
    cropName: 'Paddy (Rice)',
    calamityType: 'OTHER',
    calamityName: 'Other Calamity',
    damageOverview:
      'Unforeseen calamity such as iron toxicity (bronzing of leaves in poorly drained valley bottoms), salinity ingress in coastal Konkan paddies (Kharland), wild boar trampling, or herbicide drift.',
    inspectionChecklist: [
      'Examine leaf symptoms: reddish-brown bronzing and purple spotting (iron toxicity) vs scorched margins (salinity).',
      'Check root color: healthy roots are white/reddish; jet-black roots with rotten egg smell indicate sulfide/iron toxicity.',
      'Map affected area and identify water flow sources.',
      'Check irrigation water EC and pH if available.',
      'Document evidence with timestamped photographs.'
    ],
    steps: [
      {
        id: 'pad-ot-1',
        title: 'Flush & Drain Stagnant Water (For Toxicity / Salinity)',
        description: 'For iron toxicity or salinity ingress, drain the field completely, flush with clean fresh water, and drain again to leach out toxic iron and salts.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Toxic stagnant water flushed out; fresh water introduced.',
        isImmediateSafety: false
      },
      {
        id: 'pad-ot-2',
        title: 'Apply Agricultural Lime / Gypsum',
        description: 'For acid-iron toxicity soils, broadcast agricultural lime (100-150 kg/acre). For saline soils, apply gypsum to displace toxic sodium and iron ions.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Soil amendment incorporated into puddled soil.'
      },
      {
        id: 'pad-ot-3',
        title: 'Intermittent Aeration (AWD)',
        description: 'Avoid continuous flooding. Keep the field alternately wet and dry to oxygenate the soil and oxidize toxic ferrous iron (Fe2+) into harmless ferric forms (Fe3+).',
        timeframe: 'Day 4–10',
        completionCriteria: 'Soil aerated; reduction in rotten egg odor.'
      },
      {
        id: 'pad-ot-4',
        title: 'Foliar Potassium & Zinc Nutrition',
        description: 'Spray 1% Potassium Nitrate + 0.5% Zinc Sulphate to counteract nutrient antagonism caused by soil toxicity.',
        timeframe: 'Day 6–8',
        completionCriteria: 'Foliar spray applied; new leaves emerge without bronzing.'
      }
    ],
    precautions: [
      'Do not apply additional acid-forming fertilizers (like ammonium sulfate) in iron-toxic acidic soils.',
      'Do not keep fields deeply flooded where iron toxicity is recurring.'
    ],
    recoveryTimeline: [
      'Day 1–3: Water flushing and drainage.',
      'Day 4–7: Lime application and intermittent aeration.',
      'Week 2: Foliar nutrition and root recovery.',
      'Week 3–4: Resumption of healthy green tillering.'
    ],
    recoveryIndicators: [
      'New emerging leaves free of brown bronzing and purple specks.',
      'Roots turning creamy-white instead of jet black.',
      'Healthy tiller multiplication.'
    ],
    escalationGuidance: [
      'For recurring Kharland salinity or iron toxicity, consult the Regional Agronomic Research Station (Karjat/Panvel) for salt-tolerant varieties (e.g., Panvel 1, Panvel 2).',
      'Contact Agriculture Assistant for soil testing and reclamation support.'
    ]
  }
};

