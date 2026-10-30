import { CropRecoveryPlan } from '../types';

export const pomegranatePlans: Record<string, CropRecoveryPlan> = {
  pomegranate__heavy_rainfall: {
    cropId: 'pomegranate',
    cropName: 'Pomegranate (Anaar)',
    calamityType: 'HEAVY_RAINFALL',
    calamityName: 'Excessive / Heavy Rainfall',
    damageOverview:
      'Continuous heavy rain creates water stagnation in tree basins, saturating the root zone and causing root asphyxiation. It triggers sudden fruit cracking, severe leaf and fruit drop, and rapid flare-up of Bacterial Blight / Telya (Xanthomonas axonopodis pv. punicae) and Wilt (Ceratocystis fimbriata).',
    inspectionChecklist: [
      'Check tree basins for standing water pools and mud accumulation.',
      'Inspect fruit for rind cracking or splitting (common when rain follows a dry spell).',
      'Examine leaves and fruits for water-soaked, dark brown, oily spots (Bacterial Blight / Telya).',
      'Check tree trunks and main branches for gum exudation or wilting of individual scaffold branches.',
      'Inspect root collar region for soft bark decay.'
    ],
    steps: [
      {
        id: 'pom-hr-1',
        title: 'Emergency Drainage of Tree Basins',
        description: 'Immediately cut drainage channels between tree rows to lead all standing water out of the orchard within 12-24 hours. Scrape excess mud away from tree trunks.',
        timeframe: 'First 24 hours',
        completionCriteria: 'No standing water in tree basins; drainage channels flowing freely.',
        isImmediateSafety: true
      },
      {
        id: 'pom-hr-2',
        title: 'Bactericide & Copper Protective Spray (Telya Cover)',
        description: 'Immediately spray Streptocycline (0.5 g/L) + Copper Oxychloride 50 WP (2.5 g/L) or Copper Hydroxide (2 g/L) to prevent bacterial blight invasion in moisture-laden foliage.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Complete canopy wetted thoroughly with bactericide-copper film.'
      },
      {
        id: 'pom-hr-3',
        title: 'Harvest Cracked Fruits Immediately',
        description: 'Handpick and harvest all cracked, split, or punctured fruits immediately. Leaving cracked fruits on trees attracts fruit flies, fungal rot, and spreads bacterial blight.',
        timeframe: 'Day 2–4',
        completionCriteria: 'All split fruits picked and removed from orchard.'
      },
      {
        id: 'pom-hr-4',
        title: 'Root Drenching against Wilt Complex',
        description: 'Drench each tree basin with Propiconazole 25 EC (2 ml/L) or Carbendazim (2 g/L) + Chlorpyrifos (2 ml/L) to prevent Ceratocystis wilt and pinhole borer invasion in saturated soils.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Each tree basin drenched with 5-10 liters of fungicide solution.'
      },
      {
        id: 'pom-hr-5',
        title: 'Foliar Calcium & Boron for Rind Strength',
        description: 'Spray Calcium Nitrate (5 g/L) + Boron (1 g/L) once sunlight returns to strengthen cell walls and prevent further fruit cracking.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Foliar spray applied; fruit rind firmness improved.'
      }
    ],
    precautions: [
      'Never apply chemical nitrogen (urea) while soil is waterlogged; it causes explosive bacterial blight and soft fruit rotting.',
      'Never leave dropped or cracked fruits rotting on the orchard floor; they are primary infection reservoirs.'
    ],
    recoveryTimeline: [
      'Day 1–2: Basin drainage and bactericide spray.',
      'Day 2–4: Cracked fruit removal and sanitation.',
      'Day 4–7: Root wilt drenching and rind strengthening spray.',
      'Week 2–3: Soil aeration and canopy stabilization.'
    ],
    recoveryIndicators: [
      'Arrest of leaf and flower drop.',
      'Absence of fresh oily dark spots on green fruits.',
      'Healthy white roots visible near the dripper line.',
      'Surviving fruits continue uniform expansion without cracking.'
    ],
    escalationGuidance: [
      'If Bacterial Blight (Telya) spreads across more than 25% of fruits, contact ICAR-NRCP Solapur (National Research Centre on Pomegranate) helpline.',
      'Report tree mortality to the Agriculture Officer for horticulture calamity assessment.'
    ]
  },

  pomegranate__flooding: {
    cropId: 'pomegranate',
    cropName: 'Pomegranate (Anaar)',
    calamityType: 'FLOODING',
    calamityName: 'River / Canal Flooding',
    damageOverview:
      'River flooding inundates pomegranate orchards, depositing thick silt over tree basins, submerging lower scaffold branches, washing away mulch and drip lines, and triggering catastrophic Ceratocystis wilt and collar rot.',
    inspectionChecklist: [
      'Determine height and duration of flood water against tree trunks.',
      'Check thickness of silt mud deposited over the graft union and root collar.',
      'Examine whether flood waters have dislodged or tilted trees.',
      'Inspect drip irrigation pipes and lateral lines for silt choking or breakage.',
      'Look for wilting of one or more main scaffold branches (Ceratocystis wilt).'
    ],
    steps: [
      {
        id: 'pom-fl-1',
        title: 'Evacuate Flood Water & Scrape Silt from Trunks',
        description: 'Dig drainage channels to lead flood water out. Physically scrape deposited silt mud away from tree trunks down to the original soil level to prevent collar rot.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Water drained; silt scraped away from tree trunks and graft unions.',
        isImmediateSafety: true
      },
      {
        id: 'pom-fl-2',
        title: 'Bordeaux Paste Trunk Painting (1:1:10)',
        description: 'Apply freshly prepared Bordeaux paste (1 kg Copper Sulphate + 1 kg Slaked Lime in 10 L water) with a brush onto tree trunks from ground level up to 60 cm height.',
        timeframe: 'Day 2–4',
        completionCriteria: 'All tree trunks coated with protective blue Bordeaux paste.'
      },
      {
        id: 'pom-fl-3',
        title: 'Wilt Complex Anti-Fungal Basin Drenching',
        description: 'Drench each tree basin with Propiconazole 25 EC (2 ml/L) or Tebuconazole (1.5 ml/L) along with Trichoderma harzianum to protect roots from Ceratocystis wilt.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Each tree root zone treated with anti-wilt fungicide.'
      },
      {
        id: 'pom-fl-4',
        title: 'Re-align & Flush Drip Irrigation Network',
        description: 'Inspect, flush, and repair submerged drip laterals. Clear silt from drippers to ensure uniform water delivery once the orchard dries.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Drip system flushed clean; all emitters discharging uniformly.'
      },
      {
        id: 'pom-fl-5',
        title: 'Foliar Nutrient Resuscitation',
        description: 'Spray 19:19:19 (5 g/L) + Micronutrient mixture (2 g/L) to replenish lost foliage and restore photosynthetic vitality.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Canopy sprayed thoroughly; renewed leaf gloss visible.'
      }
    ],
    precautions: [
      'Never bury the graft union or root collar under flood silt; collar suffocation will kill the tree within weeks.',
      'Do not apply chemical fertilizers directly onto wet silt until soil is friable.'
    ],
    recoveryTimeline: [
      'Day 1–3: Drainage, silt scraping, and trunk exposure.',
      'Day 3–6: Bordeaux paste application and wilt drenching.',
      'Day 6–10: Drip network repair and foliar nutrition.',
      'Week 3–4: Root revival and secondary branch flushing.'
    ],
    recoveryIndicators: [
      'Leaves regain bright green luster without yellowing.',
      'Bark remains firm and dry without gum oozing.',
      'Emergence of new white feeder roots under drippers.',
      'Absence of scaffold branch wilting.'
    ],
    escalationGuidance: [
      'If sudden wilt (yellowing and drying of individual branches) appears, consult ICAR-NRCP Solapur pathologists immediately for quarantine measures.',
      'Request horticulture department Panchanama for orchard flood rehabilitation assistance.'
    ]
  },

  pomegranate__hailstorm: {
    cropId: 'pomegranate',
    cropName: 'Pomegranate (Anaar)',
    calamityType: 'HAILSTORM',
    calamityName: 'Severe Hailstorm',
    damageOverview:
      'Hail impact causes catastrophic damage to pomegranate orchards: punctured fruit rinds with deep bruises, cracked and stripped bark on scaffold branches, shredded foliage, and open wounds that serve as immediate entry points for Bacterial Blight / Telya.',
    inspectionChecklist: [
      'Assess defoliation percentage across the canopy.',
      'Inspect all fruits: check for hail punctures, bruised rind, or cracked fruit walls.',
      'Examine scaffold branches and main stem for bark peeling, cracks, and deep wood bruises.',
      'Count percentage of unmarketable bruised fruits.',
      'Check for bacterial blight oozing from fresh hail wounds.'
    ],
    steps: [
      {
        id: 'pom-hl-1',
        title: 'Emergency Antimicrobial Wound Spray within 24 Hours',
        description: 'Within 24 hours of hailstorm cessation, spray Streptocycline (0.5 g/L) + Copper Oxychloride 50 WP (2.5 g/L) or 1% Bordeaux mixture to sterilize all open wounds.',
        timeframe: 'First 24 hours',
        completionCriteria: 'All bruised branches, leaves, and fruits coated with antimicrobial film.',
        isImmediateSafety: false
      },
      {
        id: 'pom-hl-2',
        title: 'Pruning Shattered Branches & Chaubattia / Bordeaux Paste',
        description: 'Cleanly prune broken, split, or dangling branches using sanitized secateurs. Immediately apply Bordeaux paste (1:1:10) on every cut surface thicker than a pencil.',
        timeframe: 'Day 2–4',
        completionCriteria: 'All broken branches trimmed; cut ends sealed with blue Bordeaux paste.'
      },
      {
        id: 'pom-hl-3',
        title: 'Harvest Severely Bruised & Pierced Fruits',
        description: 'Remove all hail-punctured and heavily bruised fruits from trees. Pierced fruits will rot on the tree and serve as bacterial blight incubators.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Punctured fruits harvested and buried outside the orchard.'
      },
      {
        id: 'pom-hl-4',
        title: 'Growth Hormone & Energy Induction Spray',
        description: 'Spray 12:61:00 (5 g/L) + GA3 (Gibberellic Acid @ 15 ppm) or Brassinolide (0.5 ml/L) to activate dormant vegetative buds along bruised branches.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Bud swell observed at uninjured nodes along scaffold branches.'
      },
      {
        id: 'pom-hl-5',
        title: 'Balanced NPK & Micronutrient Drip Fertigation',
        description: 'Apply water-soluble 19:19:19 (3 kg/acre) + Micronutrient mixture through drip once topsoil dries to support the energy needs of canopy rebuilding.',
        timeframe: 'Day 8–12',
        completionCriteria: 'Fertigation completed; rapid expansion of new vegetative flushes.'
      }
    ],
    precautions: [
      'Never delay the antimicrobial wound spray beyond 24 hours; hail wounds are the number one highway for devastating Telya epidemics.',
      'Do not apply heavy granular nitrogen to soil immediately after hail; soft succulent shoots invite severe blight.'
    ],
    recoveryTimeline: [
      'Day 1–2: Wound disinfection spray within 24 hours.',
      'Day 2–4: Broken branch pruning and cut-end pasting.',
      'Day 4–7: Pierced fruit sanitation and bio-stimulant spray.',
      'Week 3–5: Dense emergence of new vegetative flushes.'
    ],
    recoveryIndicators: [
      'Stem and branch wounds callous over with dry scar tissue without gumming.',
      'Emergence of healthy green shoots from dormant nodes along scaffold branches.',
      'Absence of black oily spots on new flushes.',
      'Unbroken surviving fruits continue normal ripening.'
    ],
    escalationGuidance: [
      'Request an emergency joint Panchanama by Revenue, Agriculture, and Insurance surveyors within 72 hours for PMFBY horticulture compensation.',
      'Consult ICAR-NRCP Solapur if bacterial blight lesions appear along pruned wood.'
    ]
  },

  pomegranate__strong_winds: {
    cropId: 'pomegranate',
    cropName: 'Pomegranate (Anaar)',
    calamityType: 'HIGH_VELOCITY_WINDS',
    calamityName: 'High Velocity Winds / Storm',
    damageOverview:
      'Squall winds cause limb breakage, split main scaffolds at the crotch, dislodge tree anchoring, cause massive fruit drop, and cause fruit scarring from thorny branch rubbing.',
    inspectionChecklist: [
      'Check for split scaffold branches at main trunk crotches.',
      'Inspect trees for tilting or loosened root balls.',
      'Count percentage of dropped fruits beneath the canopy.',
      'Examine surviving fruits for thorny branch rubbing scars.',
      'Check drip laterals and micro-sprinklers for displacement.'
    ],
    steps: [
      {
        id: 'pom-sw-1',
        title: 'Bolting / Supporting Split Scaffolds',
        description: 'For partially split scaffold branches, gently pull the branches together and secure them with galvanized wire, bolts, or heavy-duty polypropylene rope. Seal the crotch split with Bordeaux paste.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Split branches secured firmly; crotches sealed with paste.'
      },
      {
        id: 'pom-sw-2',
        title: 'Re-aligning & Staking Tilted Trees',
        description: 'Gently pull tilted trees upright while soil is moist. Drive sturdy wooden or bamboo stakes on the windward side and tie the tree with soft rubber or cloth ties.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Tilted trees staked securely without damaging bark.'
      },
      {
        id: 'pom-sw-3',
        title: 'Collect Fallen Fruits & Clean Orchard Floor',
        description: 'Collect all fallen fruits immediately to prevent fruit flies (Bactrocera) from multiplying on rotting fruit on the orchard floor.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Orchard floor cleared of all fallen fruits.'
      },
      {
        id: 'pom-sw-4',
        title: 'Anti-Stress Potassium & Boron Spray',
        description: 'Spray Potassium Nitrate (13:00:45 @ 10 g/L) + Boron (1 g/L) to strengthen fruit pedicels and relieve mechanical stress in surviving canopy.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Canopy sprayed thoroughly; fruit drop arrested.'
      }
    ],
    precautions: [
      'Do not use thin bare wire directly against pomegranate bark; it cuts into cambium and causes girdling.',
      'Do not leave wounded branch crotches unsealed; Ceratocystis wilt readily infects branch tears.'
    ],
    recoveryTimeline: [
      'Day 1–3: Scaffold branch bolting and tree staking.',
      'Day 2–4: Fallen fruit clearance and orchard sanitation.',
      'Day 4–7: Anti-stress foliar spray and drip repair.',
      'Week 2–3: Branch callusing and fruit stabilization.'
    ],
    recoveryIndicators: [
      'Tilted trees firmly anchored without wobbling.',
      'Torn branch crotches callusing cleanly with dry scar tissue.',
      'Surviving fruits remain firmly attached to spurs.',
      'Resumption of normal fruit expansion.'
    ],
    escalationGuidance: [
      'Contact the Taluka Agriculture Officer if storm damage accompanied cyclonic gale winds requiring disaster relief.',
      'Consult KVK horticulture specialists on canopy restructuring for severely split trees.'
    ]
  },

  pomegranate__drought: {
    cropId: 'pomegranate',
    cropName: 'Pomegranate (Anaar)',
    calamityType: 'DROUGHT',
    calamityName: 'Drought / Dry Spell',
    damageOverview:
      'Severe moisture stress during flowering or fruit development (Ambe or Mrig bahar) causes massive flower drop, fruit shrivelling, severe sunscald on exposed fruit shoulders, pinhole borer attacks on stressed trunks, and fruit cracking when irrigation resumes.',
    inspectionChecklist: [
      'Check soil moisture in the drip wetting zone.',
      'Inspect for leaf yellowing, wilting, and premature defoliation.',
      'Check fruits for sunscald (brown scorched leathery patches on southwest-facing fruits).',
      'Inspect trunk base for fine wood powder/frass from Pinhole Borer (Xylosandrus).',
      'Assess fruit firmness and shrinkage.'
    ],
    steps: [
      {
        id: 'pom-dr-1',
        title: 'Deficit Drip Irrigation & Basin Mulching',
        description: 'Maintain deficit drip irrigation (20-25 L/tree/day during fruit development) in early morning. Spread dried sugarcane trash, straw, or farm residue (10 cm thick) in the drip wetting zone to conserve moisture.',
        timeframe: 'Immediate',
        completionCriteria: 'Tree basins covered with organic mulch; drip lines operating under mulch.'
      },
      {
        id: 'pom-dr-2',
        title: 'Sunscald Prevention: Kaolin / Slaked Lime Spray',
        description: 'Spray Kaolin clay (Surround @ 30 g/L) or a 2% Slaked Lime suspension over fruits and canopy. The reflective white coating reduces fruit surface temperature by 4-6°C and prevents sunscald.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Fruits and upper canopy coated with uniform reflective white film.'
      },
      {
        id: 'pom-dr-3',
        title: 'Anti-Stress Osmoprotectant Foliar Feed',
        description: 'Spray 1% Potassium Nitrate (13:00:45 @ 10 g/L) + Boron (1 g/L) to maintain fruit cell turgidity and prevent rind cracking when water is applied.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Canopy wetted in early morning hours.'
      },
      {
        id: 'pom-dr-4',
        title: 'Pinhole Borer & Stem Protection',
        description: 'Drought-stressed trees attract pinhole borers. Paint tree trunks up to 60 cm with Chlorpyrifos 20 EC (2 ml/L) + Copper Oxychloride (3 g/L) mixed into red mud paste.',
        timeframe: 'Day 6–8',
        completionCriteria: 'Tree trunks painted; borer entry holes sealed.'
      }
    ],
    precautions: [
      'Never apply sudden heavy flood irrigation after prolonged water stress; rapid water intake cracks 90% of fruits within 24 hours.',
      'Do not apply solid urea during severe drought; it burns feeder roots.'
    ],
    recoveryTimeline: [
      'Day 1–3: Organic mulching and deficit drip scheduling.',
      'Day 3–6: Sunscald kaolin spray and trunk borer protection.',
      'Day 7–10: Osmoprotectant foliar feeding.',
      'Week 2–3: Smooth fruit expansion without cracking.'
    ],
    recoveryIndicators: [
      'Leaves remain green and turgid throughout midday.',
      'Absence of sunscald scorch on fruit shoulders.',
      'Trunks clean without pinhole borer frass.',
      'Gradual, crack-free fruit enlargement.'
    ],
    escalationGuidance: [
      'If drought forces orchard abandonment, consult ICAR-NRCP Solapur on defoliation protocols (Hastas bahar conversion) to save tree lives.',
      'Report water crisis to the District Collectorate for agricultural tanker water allocation.'
    ]
  },

  pomegranate__pest_attack: {
    cropId: 'pomegranate',
    cropName: 'Pomegranate (Anaar)',
    calamityType: 'PEST_DISEASE',
    calamityName: 'Severe Pest / Disease Infestation',
    damageOverview:
      'Catastrophic outbreak of Bacterial Blight / Telya (Xanthomonas axonopodis pv. punicae - oily brown spots, nodal blighting, L/Y shaped fruit cracks), Ceratocystis Wilt, Fruit Borer / Anar Butterfly (Deudorix isocrates), or Pinhole Borer.',
    inspectionChecklist: [
      'Inspect leaves and fruits for water-soaked, oily, angular dark spots that turn black (Bacterial Blight).',
      'Check for L-shaped or Y-shaped cracking on green fruits with oily margins.',
      'Inspect fruit rind for boreholes plugged with caterpillar excreta (Anar Butterfly).',
      'Check for yellowing and sudden drying of individual scaffold branches (Wilt).',
      'Examine trunk collar for fine white wood dust (Pinhole Borer).'
    ],
    steps: [
      {
        id: 'pom-pt-1',
        title: 'Rigorous Sanitation: Remove Infected Twigs & Fruits',
        description: 'Prune blighted twigs 5 cm below the infected point with sanitized shears (dip in 70% alcohol or sodium hypochlorite between cuts). Collect and burn all blighted fruits and pruned twigs.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Infected plant parts removed, bagged, and burned outside orchard.',
        isImmediateSafety: false
      },
      {
        id: 'pom-pt-2',
        title: 'Strict Bacterial Blight (Telya) Spray Schedule',
        description: 'Spray Streptocycline (0.5 g/L) + Copper Oxychloride 50 WP (2.5 g/L) + 2-Bromo-2-Nitropropane-1,3-Diol (Bactenas / Bronopol @ 0.5 g/L) across the entire orchard canopy.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Complete canopy covered with bactericide film.'
      },
      {
        id: 'pom-pt-3',
        title: 'Fruit Borer (Anar Butterfly) Spray & Bagging',
        description: 'If fruit borer is present, spray Chlorantraniliprole 18.5 SC (0.4 ml/L) or Spinetoram 11.7 SC (1 ml/L). For high-value fruits, bag individual fruits in butter paper or non-woven bags.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Borer spray completed; fruit bagging initiated where feasible.'
      },
      {
        id: 'pom-pt-4',
        title: 'Wilt & Pinhole Borer Basal Drenching',
        description: 'Drench basins of wilt-prone trees with Propiconazole 25 EC (2 ml/L) + Chlorpyrifos 20 EC (2 ml/L) (10 L solution per tree) to suppress Ceratocystis and pinhole borers.',
        timeframe: 'Day 6–8',
        completionCriteria: 'Tree basins drenched; trunk collars treated.'
      },
      {
        id: 'pom-pt-5',
        title: 'Bio-stimulant Recovery Spray',
        description: 'Spray Potassium Silicate (2 ml/L) + 19:19:19 (5 g/L) 5 days after bactericide application to strengthen epidermal cell walls against reinfection.',
        timeframe: 'Day 8–12',
        completionCriteria: 'Foliar spray applied; new flushes emerging clean.'
      }
    ],
    precautions: [
      'Never prune trees during rainy or humid overcast weather; bacterial blight will spread to every single cut surface.',
      'Always sanitize pruning shears between every single tree to prevent cross-contamination.'
    ],
    recoveryTimeline: [
      'Day 1–2: Pruning of blighted twigs and strict sanitation.',
      'Day 2–4: Comprehensive bactericide spray schedule.',
      'Day 4–8: Borer control and anti-wilt root drenching.',
      'Week 2–3: Canopy stabilization with potassium silicate.'
    ],
    recoveryIndicators: [
      'Arrest of oily lesion expansion on fruits and leaves.',
      'Pruned branch ends heal cleanly with dry callous tissue.',
      'No new fruit borer entry holes.',
      'Emergence of clean, unspotted new leaf flushes.'
    ],
    escalationGuidance: [
      'If Bacterial Blight exceeds 30% orchard infection, contact the ICAR-NRCP Solapur Telya Task Force immediately.',
      'Report unmanageable Ceratocystis wilt to the State Horticulture Department.'
    ]
  },

  pomegranate__unseasonal_rain: {
    cropId: 'pomegranate',
    cropName: 'Pomegranate (Anaar)',
    calamityType: 'UNSEASONAL_WEATHER',
    calamityName: 'Unseasonal Weather Event',
    damageOverview:
      'Unseasonal rain during fruit maturity and harvesting (common in October-November or February-March) causes catastrophic fruit cracking, fungal fruit rot (Colletotrichum and Alternaria heart rot), rind staining, and severe price crash in export and domestic markets.',
    inspectionChecklist: [
      'Check maturity of fruits (calyx closure, flat fruit ribs, deep red/yellow skin color).',
      'Inspect fruit rind for sudden hairline cracks, deep splits, or aril exposure.',
      'Check for black/brown fungal rot entering through the calyx cup (Heart Rot).',
      'Examine tree basins for standing water.',
      'Determine percentage of cracked vs intact marketable fruits.'
    ],
    steps: [
      {
        id: 'pom-ur-1',
        title: 'Priority Harvest of Mature Intact Fruits',
        description: 'Immediately harvest all mature and semi-mature uncracked fruits as soon as weather permits. Do not leave ripe fruits on trees during unseasonal rain spells.',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'Mature undamaged fruits harvested and moved to packing shed.'
      },
      {
        id: 'pom-ur-2',
        title: 'Drain Stagnant Water from Tree Basins',
        description: 'Cut furrow outlets to evacuate all rain water from tree basins immediately. Water absorption through roots causes internal aril swelling that cracks the rind.',
        timeframe: 'First 24 hours',
        completionCriteria: 'All standing water drained from basins.'
      },
      {
        id: 'pom-ur-3',
        title: 'Pick & Segregate Cracked Fruits',
        description: 'Harvest all cracked and split fruits into separate crates. Sell them immediately for local juice extraction; never mix cracked fruits with Grade-A export lots.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Cracked fruits segregated from whole fruits.'
      },
      {
        id: 'pom-ur-4',
        title: 'Protective Fungicide Spray for Retained Unripe Fruits',
        description: 'Spray Azoxystrobin 23% SC (1 ml/L) or Difenoconazole 25 EC (1 ml/L) + Copper Oxychloride (2 g/L) on remaining green fruits to prevent fungal rot and heart rot.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Standing crop sprayed; developing fruits protected.'
      },
      {
        id: 'pom-ur-5',
        title: 'Foliar Potassium Silicate & Boron Spray',
        description: 'Spray Potassium Silicate (2 ml/L) + Boron (1 g/L) to strengthen rind elasticity and prevent late cracking in developing green fruits.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Rind elasticity improved; no further splitting.'
      }
    ],
    precautions: [
      'Never wash cracked fruits with water; water entry causes rapid fermentation of sweet arils.',
      'Do not pack damp fruits into cardboard export cartons; wipe fruits with clean dry cloth before grading.'
    ],
    recoveryTimeline: [
      'Day 1–2: Priority harvest of mature fruits and basin drainage.',
      'Day 2–4: Cracked fruit segregation and fungal protection spray.',
      'Day 5–8: Rind elasticity foliar feeding.',
      'Week 2: Safe market dispatch and harvest of remaining crop.'
    ],
    recoveryIndicators: [
      'Harvested fruits clean, dry, and free of fungal staining.',
      'Zero secondary fruit cracking on standing unripe fruits.',
      'Arrest of calyx fungal rot.',
      'Grade-A export quality preserved for intact fruits.'
    ],
    escalationGuidance: [
      'File an intimation within 72 hours under PMFBY horticulture post-harvest / localized calamity provisions for unseasonal rain fruit cracking.',
      'Contact APMC and export packhouses for expedited grading and market dispatch.'
    ]
  },

  pomegranate__other: {
    cropId: 'pomegranate',
    cropName: 'Pomegranate (Anaar)',
    calamityType: 'OTHER',
    calamityName: 'Other Calamity',
    damageOverview:
      'Unforeseen events such as severe root knot nematode infestation (Meloidogyne incognita causing root galls, stunting, and nutrient chlorosis), herbicide drift, localized high salinity in borewell irrigation water, or wild animal / porcupine barking.',
    inspectionChecklist: [
      'Gently excavate feeder roots and check for bead-like knots / root galls (Nematodes).',
      'Examine leaf margins for scorching and salt crust on soil (Salinity).',
      'Check tree trunk base for porcupine teeth marks or bark stripping.',
      'Look for leaf distortion or strap leaves (Herbicide drift).',
      'Document damage with date-stamped photographs.'
    ],
    steps: [
      {
        id: 'pom-ot-1',
        title: 'Identify Calamity Source & Secure Orchard',
        description: 'Identify the exact cause. For porcupine bark stripping, wrap wire mesh around tree trunks. For herbicide drift, trace neighbouring application.',
        timeframe: 'Day 1',
        completionCriteria: 'Cause identified; physical tree protection installed.',
        isImmediateSafety: true
      },
      {
        id: 'pom-ot-2',
        title: 'Biological Nematicide Drenching (For Nematodes)',
        description: 'If root knot nematodes are present, drench tree basins with Paecilomyces lilacinus (2 kg/acre enriched in FYM) or Fluopyram 34.48 SC (Velum Prime @ 2 ml/tree) through drip.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Nematicide incorporated into root zone; root gall proliferation halted.'
      },
      {
        id: 'pom-ot-3',
        title: 'Foliar Neutralizing Spray for Chemical Drift',
        description: 'If weedicide drift occurred, spray 1% Urea + 0.5% Zinc Sulphate + Humic acid (2 ml/L) to assist foliage in metabolizing toxins.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Foliar spray applied; toxicity symptoms arrested.'
      },
      {
        id: 'pom-ot-4',
        title: 'Salinity Management with Gypsum & Leaching',
        description: 'If saline water caused leaf scorch, apply agricultural gypsum (2 kg/tree) in basins and irrigate with low-salinity water to leach salts beyond the root zone.',
        timeframe: 'Day 4–7',
        completionCriteria: 'Gypsum incorporated; soil salts displaced.'
      }
    ],
    precautions: [
      'Do not apply chemical nematicides without wearing protective rubber gloves and mask.',
      'Avoid high-salinity borewell water during flowering and fruit set.'
    ],
    recoveryTimeline: [
      'Day 1–3: Diagnosis, trunk protection, and nematicide application.',
      'Day 4–7: Salinity management and foliar neutralization.',
      'Week 2–3: Fresh root hair development under drippers.',
      'Week 4: Healthy new leaf flush and normal fruit growth.'
    ],
    recoveryIndicators: [
      'Emergence of clean, un-galled white feeder roots.',
      'Arrest of leaf chlorosis and tip burn.',
      'Normal leaf expansion without cupping or strapping.'
    ],
    escalationGuidance: [
      'For severe nematode or salinity problems, submit root and soil samples to ICAR-NRCP Solapur for laboratory diagnostic analysis.',
      'Report wildlife bark stripping to the Forest Range Office for compensation.'
    ]
  }
};

