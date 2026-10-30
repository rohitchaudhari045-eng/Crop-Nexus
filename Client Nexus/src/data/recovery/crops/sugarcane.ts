import { CropRecoveryPlan } from '../types';

export const sugarcanePlans: Record<string, CropRecoveryPlan> = {
  sugarcane__heavy_rainfall: {
    cropId: 'sugarcane',
    cropName: 'Sugarcane (Ganna)',
    calamityType: 'HEAVY_RAINFALL',
    calamityName: 'Excessive / Heavy Rainfall',
    damageOverview:
      'Excess rainfall causes water stagnation in furrows, nitrogen leaching, root asphyxiation, lower leaf yellowing, and induces lodging in tall adsali or suru cane, creating favorable conditions for red rot and wilt.',
    inspectionChecklist: [
      'Check furrow depth and standing water stagnation in low patches.',
      'Inspect root anchorage and soil firmness around stool clumps.',
      'Examine leaf color from lower to middle canopy for chlorosis.',
      'Check for early signs of red rot (reddening of internal tissues with white transverse patches).',
      'Assess drainage ditch function at field boundaries.'
    ],
    steps: [
      {
        id: 'sg-hr-1',
        title: 'Open Furrow Ends & Inter-plot Drainage',
        description: 'Immediately cut furrow ends to connect them into the main drainage channels. Ensure all standing water drains off within 24-36 hours.',
        timeframe: 'First 24 hours',
        completionCriteria: 'No standing water pools between sugarcane rows.',
        isImmediateSafety: true
      },
      {
        id: 'sg-hr-2',
        title: 'Earthing Up & Stool Anchorage',
        description: 'As soon as the soil is workable, perform light earthing up around the base of the cane clumps to support the root system and re-anchor tilted stalks.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Soil mounded 15-20 cm around cane stools.'
      },
      {
        id: 'sg-hr-3',
        title: 'Compensatory Nitrogen & Potash Top-dressing',
        description: 'Heavy rain leaches nitrogen and potassium. Apply 35 kg Urea + 25 kg MOP (Potash) per acre as band placement into moist soil.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Nutrients banded along cane rows and lightly covered with soil.'
      },
      {
        id: 'sg-hr-4',
        title: 'Foliar Nutrient Revitalization Spray',
        description: 'Spray 19:19:19 (10 g/L) + Ferrous Sulphate (5 g/L) + Citric Acid (1 g/L) to correct chlorosis and stimulate chlorophyll synthesis.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Uniform foliar application; canopy greenness restored.'
      },
      {
        id: 'sg-hr-5',
        title: 'Fungicide Protection against Red Rot / Wilt',
        description: 'Drench or spray cane clumps with Carbendazim 50 WP (1 g/L) or Copper Oxychloride (2.5 g/L) around the base if water stagnation exceeded 48 hours.',
        timeframe: 'Day 10–14',
        completionCriteria: 'Base of stalks protected with fungicide barrier.'
      }
    ],
    precautions: [
      'Do not apply urea while water is standing in furrows; this results in severe volatilization and root toxicity.',
      'Avoid driving heavy tractors through soggy furrows, which causes severe soil compaction.'
    ],
    recoveryTimeline: [
      'Day 1–2: Drain all surface water from furrows.',
      'Day 3–5: Stool anchorage and earthing up.',
      'Day 6–10: Nutrient top-dressing and foliar iron spray.',
      'Week 3–4: Re-establishment of vigorous internode elongation.'
    ],
    recoveryIndicators: [
      'Leaves regain deep, dark green coloration.',
      'Emergence of fresh white feeder roots from lower stalk nodes.',
      'Upright, sturdy cane stalks.',
      'Absence of internal red vascular discoloration.'
    ],
    escalationGuidance: [
      'If red rot symptoms (alcoholic smell, hollow drying stalks with white transverse spots) appear, consult the Sugar Factory Agronomist immediately.',
      'Report continuous drainage blockages to the local Irrigation Department.'
    ]
  },

  sugarcane__flooding: {
    cropId: 'sugarcane',
    cropName: 'Sugarcane (Ganna)',
    calamityType: 'FLOODING',
    calamityName: 'River / Canal Flooding',
    damageOverview:
      'River flooding (common along Krishna, Panchganga, and Bhima river basins) submerges mature or ratoon cane for several days, leaving thick silt layers, rotting lower leaf sheaths, exposing root clumps, and causing widespread lodging.',
    inspectionChecklist: [
      'Determine duration of submergence and height of silt deposit.',
      'Check whether the apical spindle leaf (top shoot) is intact and green or decayed.',
      'Examine lower nodes for aerial root emergence (adventitious roots in air).',
      'Check for trash and debris wrapped tightly around cane stalks.',
      'Inspect for white grub or rodent invasion post-flood.'
    ],
    steps: [
      {
        id: 'sg-fl-1',
        title: 'Dislodge Flood Trash & Silt from Foliage',
        description: 'Once water recedes safely, physically strip tangled river trash, weeds, and mud from cane stalks and top shoots to expose leaves to sunlight.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Canopy cleared of silt and tangled debris.',
        isImmediateSafety: true
      },
      {
        id: 'sg-fl-2',
        title: 'De-trashing of Rotting Lower Leaves',
        description: 'Remove rotting, water-soaked lower dried leaves (de-trashing) from the bottom 3-4 nodes to facilitate air movement and prevent fungal rot.',
        timeframe: 'Day 3–6',
        completionCriteria: 'Lower stalk nodes cleared of wet decaying leaf sheaths.'
      },
      {
        id: 'sg-fl-3',
        title: 'Trash Twist Propping for Lodged Stalks',
        description: 'Bring stalks of adjacent rows together and tie them into an "A"-frame using dry sugarcane trash or twine (trash twist propping) to prevent stalks rotting on the mud.',
        timeframe: 'Day 4–8',
        completionCriteria: 'Adjacent rows tied into sturdy upright A-frames.'
      },
      {
        id: 'sg-fl-4',
        title: 'Foliar Nutrient & Micronutrient Feeding',
        description: 'Spray 2% Urea + 1% Potassium Nitrate (13:00:45) + Micronutrient mixture to replenish lost energy and promote root recovery.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Canopy sprayed thoroughly; renewed vegetative vigor.'
      },
      {
        id: 'sg-fl-5',
        title: 'Soil Drenching against Wilt / Root Rot',
        description: 'Drench stools with Carbendazim 12% + Mancozeb 63% WP (2 g/L) + Chlorpyrifos 20 EC (2 ml/L) to prevent fungal wilt and soil-borne insects.',
        timeframe: 'Day 10–14',
        completionCriteria: 'Stool bases drenched; root zone protected.'
      }
    ],
    precautions: [
      'Do not cut off top shoots of flood-damaged cane unless the apical meristem is completely rotten.',
      'Do not burn flood debris in the field; compost it away from cane stools.'
    ],
    recoveryTimeline: [
      'Day 1–3: Clear silt and flood trash.',
      'Day 4–8: De-trashing and trash twist propping.',
      'Day 8–12: Foliar nutrient revitalization.',
      'Week 3–4: Root anchoring and normal cane growth resumption.'
    ],
    recoveryIndicators: [
      'Apical spindle leaves continue upward growth.',
      'Absence of foul-smelling rot in leaf sheaths.',
      'Firm soil consolidation around anchored cane clumps.',
      'Cane stalks securely propped above ground level.'
    ],
    escalationGuidance: [
      'If flooding occurred during crushing season and sugar recovery dropped significantly, coordinate with the sugar mill for priority harvesting.',
      'Request revenue-agriculture Panchanama for river flood damage compensation.'
    ]
  },

  sugarcane__hailstorm: {
    cropId: 'sugarcane',
    cropName: 'Sugarcane (Ganna)',
    calamityType: 'HAILSTORM',
    calamityName: 'Severe Hailstorm',
    damageOverview:
      'Hail impact shreds sugarcane leaf blades into ribbons, snaps top shoots, bruises tender internodes, and breaks eye buds, causing side shoot emergence (piping) that reduces sugar recovery.',
    inspectionChecklist: [
      'Assess defoliation percentage and leaf blade shredding.',
      'Check whether the apical growing point (spindle bud) is destroyed or intact.',
      'Inspect cane internodes for hail bruises, cracks, and split bark.',
      'Check whether lateral eye buds have started sprouting prematurely.',
      'Examine for fungal infection at wound sites.'
    ],
    steps: [
      {
        id: 'sg-hl-1',
        title: 'Disinfection Spray for Hail Wounds',
        description: 'Within 24-48 hours, spray Copper Oxychloride 50 WP (2.5 g/L) + Mancozeb (2 g/L) across the canopy to prevent fungal pathogens from entering bruised stems.',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'All shredded leaves and bruised stalks coated with protective fungicide.',
        isImmediateSafety: false
      },
      {
        id: 'sg-hl-2',
        title: 'Clean Pruning of Broken Tops',
        description: 'If top shoots are snapped and decaying, cleanly cut them back with a sharp cane knife just above the highest intact node to prevent rot spreading downward.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Dead crushed tops removed cleanly.'
      },
      {
        id: 'sg-hl-3',
        title: 'Foliar Energy & Bud Activation Spray',
        description: 'Spray 19:19:19 (10 g/L) + GA3 (Gibberellic Acid @ 10 ppm) to stimulate rapid emergence of new crown leaves from uninjured spindle tissue.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Foliar spray applied; new leaf tips emerging.'
      },
      {
        id: 'sg-hl-4',
        title: 'Balanced Top-dressing for Canopy Rebuilding',
        description: 'Apply 30 kg Urea + 15 kg Potash per acre to supply the energy needed to regenerate a full photosynthetic canopy.',
        timeframe: 'Day 8–12',
        completionCriteria: 'Fertilizer placed along rows and lightly irrigated.'
      }
    ],
    precautions: [
      'Do not cut down entire cane stalks after hail; sugarcane has massive reserve sugars and regrows a full canopy within 3-4 weeks.',
      'Avoid high nitrogen application if cane is already 10-12 months old and approaching harvest.'
    ],
    recoveryTimeline: [
      'Day 1–2: Wound disinfection spray.',
      'Day 3–5: Clean pruning of broken tops.',
      'Day 6–10: Foliar feeding and top-dressing.',
      'Week 3–5: Rebuilding of complete green canopy.'
    ],
    recoveryIndicators: [
      'New spindle leaves unfurl smoothly from the crown.',
      'Hail bruises on stalks dry out and callous over.',
      'Suppression of unwanted lateral eye-bud sprouting.',
      'Canopy shading re-established.'
    ],
    escalationGuidance: [
      'If hail struck mature cane (11+ months) and caused extensive stalk splitting, arrange priority harvesting with the local sugar factory within 15 days.',
      'Notify the Agriculture Officer for PMFBY localized hailstorm claim.'
    ]
  },

  sugarcane__strong_winds: {
    cropId: 'sugarcane',
    cropName: 'Sugarcane (Ganna)',
    calamityType: 'HIGH_VELOCITY_WINDS',
    calamityName: 'High Velocity Winds / Storm',
    damageOverview:
      'Squall winds cause extensive lodging of heavy, mature sugarcane stalks (especially in adsali cane reaching 12-14 feet height), uprooting stool clumps, snapping stalks, and triggering lateral shoot emergence that depletes sucrose.',
    inspectionChecklist: [
      'Determine angle and pattern of lodging across the field.',
      'Check whether stalks are snapped at the base or simply tilted from roots.',
      'Examine whether lodged stalks are in contact with wet soil.',
      'Inspect for rodent burrows and rat gnawing on lodged stalks.',
      'Assess lateral shoot development along lodged stalks.'
    ],
    steps: [
      {
        id: 'sg-sw-1',
        title: 'Trash Twist Propping (Binding Adjacent Rows)',
        description: 'Do not lift individual stalks in isolation. Bring stalks from adjacent rows together and tie them at 2/3rd height using cane trash into interlocking A-frames (trash twist propping).',
        timeframe: 'Day 1–4',
        completionCriteria: 'Lodged cane tied into stable A-frame rows elevated off the ground.'
      },
      {
        id: 'sg-sw-2',
        title: 'De-trashing Lower Nodes for Aeration',
        description: 'Remove dead, dried lower leaves to improve air circulation beneath the lodged canopy, reducing humidity and preventing fungal rot.',
        timeframe: 'Day 3–6',
        completionCriteria: 'Lower 3-4 nodes cleared of decaying leaves.'
      },
      {
        id: 'sg-sw-3',
        title: 'Rodent Management in Lodged Plots',
        description: 'Lodged sugarcane is extremely prone to field rat damage. Install Bromadiolone (0.005%) bait cakes in bait stations at 10-meter intervals along field boundaries.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Bait stations active; rat gnawing prevented.'
      },
      {
        id: 'sg-sw-4',
        title: 'Potash Foliar Spray to Arrest Inversion',
        description: 'Spray 00:00:50 (Potassium Sulphate @ 10 g/L) to maintain stalk vascular integrity and prevent inversion of sucrose into non-crystallizable sugars.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Canopy sprayed with potash solution.'
      }
    ],
    precautions: [
      'Do not attempt to pull lodged stalks upright forcefully when soil is dry, as this snaps the brittle cane base.',
      'Avoid walking heavily through lodged cane without snake gaiters or boots.'
    ],
    recoveryTimeline: [
      'Day 1–4: Trash twist propping of adjacent rows.',
      'Day 4–7: De-trashing and rodent control.',
      'Day 8–12: Potash foliar application.',
      'Week 3–4: Sugar accumulation maintained until harvest.'
    ],
    recoveryIndicators: [
      'Stalks propped securely above ground level.',
      'Tops curved upward into sunlight.',
      'Absence of rat gnawing damage on internodes.',
      'Lateral eye buds remain dormant.'
    ],
    escalationGuidance: [
      'Contact the sugar factory cane development department to register lodged plots for early crushing priority.',
      'Report storm loss to the revenue department for disaster enumeration.'
    ]
  },

  sugarcane__drought: {
    cropId: 'sugarcane',
    cropName: 'Sugarcane (Ganna)',
    calamityType: 'DROUGHT',
    calamityName: 'Drought / Dry Spell',
    damageOverview:
      'Severe moisture stress during formative stage (60-120 days) or grand growth period causes leaf rolling, drying of lower canopy, short stunted internodes, hollow stalks, and heavy outbreaks of early shoot borer and woolly aphid.',
    inspectionChecklist: [
      'Examine leaf rolling index during morning and afternoon.',
      'Check internode length (short internodes reflect drought duration).',
      'Inspect stem base for dead heart symptoms (Early Shoot Borer).',
      'Look for white waxy colonies of Woolly Aphid on leaf undersides.',
      'Assess soil moisture depth in the furrow.'
    ],
    steps: [
      {
        id: 'sg-dr-1',
        title: 'Trash Mulching in Furrows (10 cm Layer)',
        description: 'Spread dried sugarcane trash (5 tonnes/acre or 10 cm thick layer) in all inter-row furrows. Trash mulching reduces soil moisture evaporation by up to 50% and lowers root zone temperature.',
        timeframe: 'Immediate',
        completionCriteria: 'Furrows completely covered with thick trash mulch.'
      },
      {
        id: 'sg-dr-2',
        title: 'Alternate Furrow Irrigation',
        description: 'If irrigation water is limited, irrigate every alternate furrow. Switch furrows in subsequent irrigations. This cuts water consumption by 50% while sustaining the crop.',
        timeframe: 'Ongoing during drought',
        completionCriteria: 'Water applied in alternate furrows; maximum area sustained.'
      },
      {
        id: 'sg-dr-3',
        title: 'Foliar Osmoprotectant & Potassium Spray',
        description: 'Spray 2.5% Urea + 2.5% Potassium Chloride (MOP) or 1% Potassium Nitrate (13:00:45) to enhance drought tolerance and maintain cellular turgor.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Canopy wetted in early morning hours.'
      },
      {
        id: 'sg-dr-4',
        title: 'Early Shoot Borer Suppression',
        description: 'Drought triggers severe shoot borer. Apply Chlorantraniliprole 0.4% G (7.5 kg/acre) or spray Chlorantraniliprole 18.5 SC (0.4 ml/L) directed at the plant base.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Dead hearts removed; stem base protected.'
      },
      {
        id: 'sg-dr-5',
        title: 'Woolly Aphid Bio-Control / Chemical Spray',
        description: 'If woolly aphids appear, release predator larvae (Micromus igorotus / Dipha aphidivora) or spray Thiamethoxam 25 WG (0.3 g/L) targeting leaf undersides.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Aphid colonies suppressed; honeydew cleared.'
      }
    ],
    precautions: [
      'Never apply high-dose solid urea during severe drought; it burns leaf margins and worsens water deficit.',
      'Do not burn trash in furrows during dry spells.'
    ],
    recoveryTimeline: [
      'Day 1–3: Trash mulching and alternate furrow irrigation.',
      'Day 4–7: Foliar potassium spray and shoot borer management.',
      'Day 8–12: Woolly aphid suppression and moisture monitoring.',
      'Week 3–4: Resumption of internode elongation upon rain or water release.'
    ],
    recoveryIndicators: [
      'Leaves remain green and expand flat during morning hours.',
      'Arrest of lower leaf drying.',
      'Absence of shoot borer dead hearts in new tillers.',
      'Clean leaf undersides without woolly aphid colonies.'
    ],
    escalationGuidance: [
      'Coordinate with the Water Users Association and Sugar Mill for emergency canal water quota.',
      'Consult Vasantdada Sugar Institute (VSI) Pune for drought management advisories.'
    ]
  },

  sugarcane__pest_attack: {
    cropId: 'sugarcane',
    cropName: 'Sugarcane (Ganna)',
    calamityType: 'PEST_DISEASE',
    calamityName: 'Severe Pest / Disease Infestation',
    damageOverview:
      'Outbreaks of White Grub (Holotrichia consanguinea / serrata - severing root system and causing entire clumps to dry), Early Shoot Borer, Top Borer, Red Rot (Colletotrichum falcatum), or Sugarcane Smut.',
    inspectionChecklist: [
      'Check for dead hearts in young tillers that pull out easily with a foul odor (Shoot Borer).',
      'Inspect for sudden yellowing and drying of entire mature clumps; uproot dried clump to find C-shaped white grubs feeding on roots.',
      'Split open drying stalks longitudinally: look for dull red vascular tissues with white transverse patches and an alcoholic odor (Red Rot).',
      'Look for black whip-like structures emerging from the apical shoot (Smut).',
      'Check leaf undersides for pyrilla nymphs and adults.'
    ],
    steps: [
      {
        id: 'sg-pt-1',
        title: 'White Grub Biological / Chemical Drenching',
        description: 'If white grub is identified, drench the root zone with Metarhizium anisopliae (2.5 kg/acre in 200 L water) or Fipronil 40% + Imidacloprid 40% WG (4 g/10 L) along with irrigation.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Root zone drenched; grub mortality confirmed in sample pits.',
        isImmediateSafety: false
      },
      {
        id: 'sg-pt-2',
        title: 'Eradicate & Burn Red Rot / Smut Clumps',
        description: 'Immediately uproot and burn clumps showing red rot or smut whips. Do not leave infected stalks in the field or irrigation channels.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Infected stools completely uprooted, removed, and burned.'
      },
      {
        id: 'sg-pt-3',
        title: 'Disinfect Stool Pits with Bleaching Powder / Fungicide',
        description: 'Apply Bleaching powder (10 g per pit) or drench with Copper Oxychloride (3 g/L) in pits from where diseased stools were removed to sanitize the soil.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Sanitizing drench applied to empty pits.'
      },
      {
        id: 'sg-pt-4',
        title: 'Borer & Pyrilla Bio-Control',
        description: 'Release Trichogramma chilonis egg parasitoids (50,000/acre at 10-day intervals) for shoot borer control; release Epiricania melanoleuca for Pyrilla control.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Bio-control cards stapled to leaf undersides across the field.'
      },
      {
        id: 'sg-pt-5',
        title: 'Foliar Health Recovery Spray',
        description: 'Spray 19:19:19 (10 g/L) + Micronutrient mixture (2 g/L) to accelerate vegetative growth in surviving healthy stools.',
        timeframe: 'Day 8–12',
        completionCriteria: 'Canopy sprayed; healthy tiller emergence.'
      }
    ],
    precautions: [
      'Never take seed cane (setts) from a field infected with red rot or smut.',
      'Do not ratoon a sugarcane plot that suffered more than 20% red rot infection.'
    ],
    recoveryTimeline: [
      'Day 1–3: White grub drenching and rogueing of red rot clumps.',
      'Day 3–6: Soil disinfection and bio-control release.',
      'Day 7–12: Foliar nutrient rehabilitation.',
      'Week 3–4: Healthy tiller multiplication in surviving stools.'
    ],
    recoveryIndicators: [
      'Arrest of clump drying across the field.',
      'White grub mortality verified in root zone excavations.',
      'New tillers emerge healthy and free of dead hearts.',
      'Absence of black smut whips.'
    ],
    escalationGuidance: [
      'If red rot is confirmed in multiple contiguous plots, immediately alert the Sugar Mill Cane Department and VSI Pune for quarantine containment.',
      'Report white grub outbreaks to the District Agriculture Officer for community-level light-trap campaigns.'
    ]
  },

  sugarcane__unseasonal_rain: {
    cropId: 'sugarcane',
    cropName: 'Sugarcane (Ganna)',
    calamityType: 'UNSEASONAL_WEATHER',
    calamityName: 'Unseasonal Weather Event',
    damageOverview:
      'Unseasonal rain during harvesting/crushing season (November-February) causes soil waterlogging, halts mechanical and bullock-cart harvesting transport, triggers vegetative flushing that reduces sucrose content (Brix drops), and causes crushing delays at sugar factories.',
    inspectionChecklist: [
      'Check soil firmness and harvester trafficability in furrows.',
      'Monitor Brix / sucrose percentage using a field refractometer.',
      'Inspect cut cane lying in the field for weight loss and fungal staling.',
      'Check for water standing in harvested ratoon fields.',
      'Examine factory crushing schedule and transport queue.'
    ],
    steps: [
      {
        id: 'sg-ur-1',
        title: 'Drain Standing Water from Harvest & Ratoon Plots',
        description: 'Cut furrow exits to drain all rain water from mature fields and freshly harvested ratoon plots immediately. Waterlogging rots harvested stubble.',
        timeframe: 'First 24 hours',
        completionCriteria: 'All standing water removed from furrows.',
        isImmediateSafety: false
      },
      {
        id: 'sg-ur-2',
        title: 'Priority Dispatch of Already Cut Cane',
        description: 'Immediately transport cut cane to the sugar factory. Cane left wet in fields for more than 48 hours loses weight and undergoes rapid sucrose inversion (staling).',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'Cut cane dispatched to sugar mill within 48 hours of harvest.'
      },
      {
        id: 'sg-ur-3',
        title: 'Post-Harvest Ratoon Stubble Shaving & Sanity',
        description: 'In harvested fields, shave stubbles at ground level with a sharp blade as soon as soil dries, and spray Chlorpyrifos + Carbendazim to protect cut stubble from fungal rot.',
        timeframe: 'Day 3–6',
        completionCriteria: 'Stubble shaved at ground level; sanitized with spray.'
      },
      {
        id: 'sg-ur-4',
        title: 'Foliar Ripener Management for Standing Cane',
        description: 'If unseasonal rain stimulated vegetative flushing in standing mature cane, spray Potassium Silicate (2 ml/L) or 00:00:50 (10 g/L) to suppress vegetative growth and maintain sucrose accumulation.',
        timeframe: 'Day 5–8',
        completionCriteria: 'Canopy treated with potassium sulphate; vegetative surge checked.'
      }
    ],
    precautions: [
      'Never burn sugarcane trash while the field is wet or muddy.',
      'Do not allow heavy cane transport tractors into fields while wet, as deep ruts damage ratoon stubble.'
    ],
    recoveryTimeline: [
      'Day 1–2: Drain furrows and dispatch cut cane.',
      'Day 3–6: Ratoon stubble shaving and sanitation.',
      'Day 6–10: Foliar potash spray for standing cane.',
      'Week 2–3: Resumption of regular factory harvesting schedule.'
    ],
    recoveryIndicators: [
      'High Brix percentage maintained on refractometer readings.',
      'Prompt factory acceptance without staling deductions.',
      'Healthy, uniform sprouting of ratoon tillers from shaved stubble.'
    ],
    escalationGuidance: [
      'Coordinate with the Sugar Factory Chief Cane Officer for rescheduled harvesting slips if field transport was blocked by rain.',
      'Notify the revenue authority if harvested cane suffered transit loss due to road flooding.'
    ]
  },

  sugarcane__other: {
    cropId: 'sugarcane',
    cropName: 'Sugarcane (Ganna)',
    calamityType: 'OTHER',
    calamityName: 'Other Calamity',
    damageOverview:
      'Unforeseen events such as accidental sugarcane fires, wild boar / elephant trampling, herbicide drift from adjoining plots, or localized soil salinity / alkalinity patches.',
    inspectionChecklist: [
      'In case of fire, assess proportion of partially burned vs charred stalks.',
      'For wild animals, survey damaged acreage and broken stalk patterns.',
      'For herbicide drift, examine leaf twisting and yellow striping.',
      'Check ratoon stubble viability below soil line.',
      'Document damage with date-stamped photographs.'
    ],
    steps: [
      {
        id: 'sg-ot-1',
        title: 'Emergency Crushing of Burned Cane (Within 48 Hours)',
        description: 'If cane suffered accidental fire, notify the sugar factory immediately. Burned cane must be harvested and crushed within 48 to 72 hours before sucrose inverts and dextran makes juice un-processable.',
        timeframe: 'Immediate (0–48 hours)',
        completionCriteria: 'Burned cane harvested and accepted by sugar mill.',
        isImmediateSafety: true
      },
      {
        id: 'sg-ot-2',
        title: 'Wild Animal Deterrence & Solar Fencing',
        description: 'For wild boar damage, clear border vegetation, install solar pulsating fence wires, or use safe repellent granules around field perimeters.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Perimeter secured against repeat animal intrusion.'
      },
      {
        id: 'sg-ot-3',
        title: 'Foliar Neutralizing Spray for Herbicide Drift',
        description: 'If broadleaf herbicide drift damaged cane, spray 1% Urea + 0.5% Zinc Sulphate + Humic acid (2 ml/L) to assist plants in metabolizing chemical toxins.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Foliar spray applied; toxicity symptoms arrested.'
      },
      {
        id: 'sg-ot-4',
        title: 'Ratoon Stubble Revitalization',
        description: 'For trampled or damaged ratoon stools, cut broken stalks back to ground level, apply 25 kg Urea + 25 kg DAP per acre, and irrigate to trigger vigorous tillering.',
        timeframe: 'Day 5–8',
        completionCriteria: 'Damaged stools cut cleanly and fertilized.'
      }
    ],
    precautions: [
      'Never delay harvesting burned sugarcane beyond 72 hours.',
      'Do not set fire intentionally without factory harvest clearance.'
    ],
    recoveryTimeline: [
      'Day 1–2: Emergency harvest of burned cane or perimeter securing.',
      'Day 3–5: Stubble cutting and herbicide neutralization.',
      'Day 6–10: Fertilization and irrigation.',
      'Week 3–4: Emergence of fresh ratoon tiller canopy.'
    ],
    recoveryIndicators: [
      'Successful delivery of burned cane to factory with minimal deduction.',
      'Vigorous, uniform sprouting of fresh tillers from cut stubble.',
      'Absence of continuing wildlife intrusion.'
    ],
    escalationGuidance: [
      'For accidental fire or wildlife damage, immediately lodge a report with the local Police, Revenue Department, and Forest Range Office for formal compensation.',
      'Consult VSI Pune for ratoon management advisories in stressed plots.'
    ]
  }
};

