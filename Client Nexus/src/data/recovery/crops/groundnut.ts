import { CropRecoveryPlan } from '../types';

export const groundnutPlans: Record<string, CropRecoveryPlan> = {
  groundnut__heavy_rainfall: {
    cropId: 'groundnut',
    cropName: 'Groundnut',
    calamityType: 'HEAVY_RAINFALL',
    calamityName: 'Excessive / Heavy Rainfall',
    damageOverview:
      'Heavy rainfall causes water stagnation in groundnut furrows, suffocates nitrogen-fixing Rhizobium nodules, causes severe soil crusting that blocks subterranean peg penetration, rots underground pods, and triggers Collar Rot (Aspergillus niger) and Tikka leaf spot.',
    inspectionChecklist: [
      'Check furrows and depressions for standing water pools.',
      'Gently excavate pegging zone (top 5-7 cm of soil): are pegs penetrating smoothly or trapped/rotting at the hard surface?',
      'Check root collar at soil surface: look for dark brown rot covered with black sooty fungal powder (Collar Rot).',
      'Examine leaf surfaces for circular brown-black spots with yellow halo (Tikka leaf spot).',
      'Inspect root nodules: healthy nodules are pink; green/black nodules indicate suffocation.'
    ],
    steps: [
      {
        id: 'gnd-hr-1',
        title: 'Emergency Trench Drainage between Ridges',
        description: 'Immediately cut drainage channels to drain all standing water from the field within 12-24 hours. Standing water rots developing subterranean pods rapidly.',
        timeframe: 'First 24 hours',
        completionCriteria: 'All surface water evacuated; furrow channels dry.',
        isImmediateSafety: true
      },
      {
        id: 'gnd-hr-2',
        title: 'Shallow Hoeing to Break Soil Crust for Peg Entry',
        description: 'As soon as the topsoil reaches workable condition (vapsa), run a light blade hoe (kolpa) or hand weeder between rows to break the hard soil crust so developing pegs can penetrate freely.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Surface crust pulverized to 2-3 cm loose friable texture without severing pegs.'
      },
      {
        id: 'gnd-hr-3',
        title: 'Collar Rot & Root Drenching',
        description: 'Drench or spray collar regions with Carbendazim 12% + Mancozeb 63% WP (Saaf @ 2 g/L) or Tebuconazole (1.5 ml/L) to prevent Aspergillus collar rot in wet soil.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Plant collars wetted with protective fungicide solution.'
      },
      {
        id: 'gnd-hr-4',
        title: 'Foliar Nitrogen & Sulfur Resuscitation',
        description: 'Because waterlogged nodules temporarily stop fixing nitrogen, spray 2% Urea (20 g/L) + 0.5% Ferrous Sulphate + 0.1% Citric Acid to revive yellowing foliage.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Foliar spray absorbed; canopy greenness restored.'
      },
      {
        id: 'gnd-hr-5',
        title: 'Gypsum Top-dressing for Shell Hardening',
        description: 'Apply agricultural Gypsum (200 kg/acre) around the root and pegging zone at vapsa condition. Calcium from gypsum is absorbed directly by pods to prevent "pops" (empty shells) and pod rot.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Gypsum broadcast around plant bases and lightly incorporated into moist soil.'
      }
    ],
    precautions: [
      'Do not perform deep inter-cultivation after pegging (40-45 DAS); deep hoeing cuts and destroys subterranean pegs.',
      'Never apply high-dose chemical nitrogen while soil is wet; it encourages collar rot.'
    ],
    recoveryTimeline: [
      'Day 1–2: Complete field surface drainage.',
      'Day 2–4: Soil crust breaking and pegging zone loosening.',
      'Day 4–7: Collar rot fungicide and foliar resuscitation.',
      'Week 2–3: Gypsum application and active pod filling.'
    ],
    recoveryIndicators: [
      'Pale yellow leaves regain deep green color.',
      'Pegs penetrate smoothly into the loose friable soil bed.',
      'Absence of collar rot blackening at the soil line.',
      'Healthy pink nodules reforming on roots.'
    ],
    escalationGuidance: [
      'If collar rot destroys more than 25% of plants, consult the Taluka Krishi Adhikari for gap-filling or plant protection advice.',
      'Consult KVK if Tikka leaf spot defoliates more than 30% of leaves.'
    ]
  },

  groundnut__flooding: {
    cropId: 'groundnut',
    cropName: 'Groundnut',
    calamityType: 'FLOODING',
    calamityName: 'River / Canal Flooding',
    damageOverview:
      'River flooding inundates groundnut plots, leaving a thick layer of fine silt mud that suffocates subterranean pods, drowns taproots, glues foliage to the ground, and causes complete collar and pod rotting within 36-48 hours.',
    inspectionChecklist: [
      'Determine hours of complete submergence under flood water.',
      'Check thickness of silt mud deposited over the pegging zone.',
      'Examine developing pods: are they firm and white/cream or soft, black, and rotting?',
      'Check root collar condition: look for mushy black bark decay.',
      'Count surviving live plants per square meter (aim for at least 30-33 plants/sq.m).'
    ],
    steps: [
      {
        id: 'gnd-fl-1',
        title: 'Evacuate Flood Water & Clear Silt Deposition',
        description: 'Cut exit channels in field bunds to completely discharge flood water. Gently wash thick mud off leaves using clean water sprayers if feasible.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Water evacuated; mud deposits removed from foliage.',
        isImmediateSafety: true
      },
      {
        id: 'gnd-fl-2',
        title: 'Collar & Pod Rot Preventative Drenching',
        description: 'Drench plant collars and the pegging zone with Metalaxyl + Mancozeb (2.5 g/L) or Carbendazim (1 g/L) to prevent fungal decay in the wet silt layer.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Collar and pegging zone drenched with protective fungicide.'
      },
      {
        id: 'gnd-fl-3',
        title: 'Foliar Energy & Nutrient Feeding',
        description: 'Spray 19:19:19 (5 g/L) + Humic acid (2 ml/L) to nourish plants whose root systems have been temporarily damaged by flood water.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Foliar nutrition applied; leaves showing renewed turgor.'
      },
      {
        id: 'gnd-fl-4',
        title: 'Crust Pulverization for Soil Aeration',
        description: 'As silt dries into a hard cake, lightly rake or shallow-hoe between rows to prevent the hard crust from trapping underground pods.',
        timeframe: 'Day 6–8',
        completionCriteria: 'Silt cake broken into fine friable crumb texture.'
      }
    ],
    precautions: [
      'Never allow silt mud to dry into a hard solid sheet over groundnut pegging zones.',
      'Do not apply solid fertilizers until soil is completely dry and active white roots appear.'
    ],
    recoveryTimeline: [
      'Day 1–3: Drainage, silt washing, and collar rot prevention.',
      'Day 4–7: Foliar energy feeding and crust breaking.',
      'Week 2: Root recovery and pegging resumption.',
      'Week 3–4: Canopy re-establishment.'
    ],
    recoveryIndicators: [
      'Bright green shoots pushing through muddy stems.',
      'New white secondary roots branching from the taproot.',
      'Absence of black rot at the stem base.',
      'Subterranean pods remain firm without rotting.'
    ],
    escalationGuidance: [
      'If surviving plant density drops below 15 plants/sq.m, consult KVK for resowing or relay cropping.',
      'Report complete flood loss for disaster relief assessment.'
    ]
  },

  groundnut__hailstorm: {
    cropId: 'groundnut',
    cropName: 'Groundnut',
    calamityType: 'HAILSTORM',
    calamityName: 'Severe Hailstorm',
    damageOverview:
      'Hail impact shreds groundnut foliage, snaps prostrate or erect branches, knocks off yellow flowers, and breaks aerial pegs before they can penetrate the soil. Fortunately, subterranean pods already underground remain protected.',
    inspectionChecklist: [
      'Assess defoliation percentage across the canopy.',
      'Check whether the root crown and lower branches are intact.',
      'Inspect aerial pegs: count percentage of snapped pegs vs intact underground pods.',
      'Examine stem wounds for bacterial or fungal rotting.',
      'Check subterranean pods: determine whether they are undamaged.'
    ],
    steps: [
      {
        id: 'gnd-hl-1',
        title: 'Antimicrobial Wound Sealing Spray',
        description: 'Within 24-48 hours, spray Carbendazim 12% + Mancozeb 63% WP (2 g/L) or Copper Oxychloride 50 WP (2.5 g/L) across the entire plot to seal open stem wounds.',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'All broken stems and shredded leaves coated with protective fungicide.',
        isImmediateSafety: false
      },
      {
        id: 'gnd-hl-2',
        title: 'Growth Regulator & Energy Induction Spray',
        description: 'Spray 12:61:00 (5 g/L) along with Brassinolide (0.5 ml/L) or GA3 (10 ppm) to trigger dormant axillary buds at uninjured stem nodes into rapid new vegetative flushes.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Bud swell visible at axils of shredded branches.'
      },
      {
        id: 'gnd-hl-3',
        title: 'Secondary Flowering & Pegging Nutrition',
        description: 'Spray 00:52:34 (5 g/L) + Boron (1 g/L) to encourage a vigorous second flush of yellow flowers and stimulate new peg formation.',
        timeframe: 'Day 5–8',
        completionCriteria: 'Fresh yellow flowers appearing at newly sprouted axils.'
      },
      {
        id: 'gnd-hl-4',
        title: 'Gypsum Application for Pod Nutrition',
        description: 'Apply agricultural Gypsum (150-200 kg/acre) around plant bases to nourish existing subterranean pods and assist new pegs in pod formation.',
        timeframe: 'Day 8–12',
        completionCriteria: 'Gypsum incorporated into moist root zone.'
      }
    ],
    precautions: [
      'Do not abandon the crop after hail; groundnut subterranean pods are safe underground and will continue developing if foliage recovers.',
      'Avoid heavy nitrogen application, which causes excessive vegetative lushness at the expense of pod filling.'
    ],
    recoveryTimeline: [
      'Day 1–2: Wound sealing fungicide application.',
      'Day 2–5: Bio-stimulant spray and dormant bud activation.',
      'Day 6–10: Secondary flowering and pegging support.',
      'Week 3–4: Canopy re-closure and active pod filling.'
    ],
    recoveryIndicators: [
      'Wounds on stems dry out and form hard calluses without rot.',
      'Vigorous green side branches emerging from lower nodes.',
      'Abundant new yellow flowers opening in morning hours.',
      'Subterranean pods continue normal seed development.'
    ],
    escalationGuidance: [
      'If hail occurred near harvest and destroyed foliage on more than 75% of plants, request an emergency revenue-agriculture Panchanama within 72 hours.',
      'Consult KVK on optimum harvest timing for hail-stressed groundnut.'
    ]
  },

  groundnut__strong_winds: {
    cropId: 'groundnut',
    cropName: 'Groundnut',
    calamityType: 'HIGH_VELOCITY_WINDS',
    calamityName: 'High Velocity Winds / Storm',
    damageOverview:
      'High velocity winds cause topsoil erosion in light sandy soils, exposing shallow developing pods to direct sunlight (causing pod greening and dessication), wind-whipping foliage, and sand-blasting tender pegs.',
    inspectionChecklist: [
      'Inspect sandy plots: determine whether topsoil has blown away, exposing pods or taproots.',
      'Check exposed pods for greening, sunscald, or shrivelling.',
      'Examine leaf surfaces for sand-blasting abrasions and shredded margins.',
      'Check whether aerial pegs are detached from the plant.',
      'Assess soil moisture depletion caused by dry gale winds.'
    ],
    steps: [
      {
        id: 'gnd-sw-1',
        title: 'Earthing Up & Covering Exposed Pods',
        description: 'Immediately mound loose soil around plant bases to re-cover all exposed subterranean pods and roots. Exposed pods turn green, become bitter, and lose commercial value.',
        timeframe: 'Day 1–2',
        completionCriteria: 'All exposed pods covered with 4-5 cm of loose soil.'
      },
      {
        id: 'gnd-sw-2',
        title: 'Light Sprinkler / Furrow Irrigation',
        description: 'Apply a light irrigation to settle the disturbed soil around plant bases, relieve wind desiccation stress, and prevent further soil erosion.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Soil settled firmly around plant bases; moisture restored.'
      },
      {
        id: 'gnd-sw-3',
        title: 'Protective Fungicide Spray against Tikka & Rust',
        description: 'Sand-blasted leaves are highly susceptible to infection. Spray Mancozeb 75 WP (2.5 g/L) + Carbendazim (1 g/L) to prevent Tikka leaf spot and Rust.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Canopy wetted with protective fungicide.'
      },
      {
        id: 'gnd-sw-4',
        title: 'Anti-Stress Potassium & Boron Foliar Spray',
        description: 'Spray 00:00:50 (Potassium Sulphate @ 5 g/L) + Boron (1 g/L) to strengthen vascular tissues and improve grain filling.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Foliar spray absorbed; leaf turgor restored.'
      }
    ],
    precautions: [
      'Never allow exposed groundnut pods to sit in direct sunlight; solanine-like bitter compounds develop rapidly.',
      'Do not perform deep hoeing near earthed-up pods.'
    ],
    recoveryTimeline: [
      'Day 1–2: Earthing up exposed pods.',
      'Day 2–4: Light irrigation and protective fungicide spray.',
      'Day 5–8: Anti-stress foliar feeding.',
      'Week 2–3: Normal subterranean pod filling.'
    ],
    recoveryIndicators: [
      'All pods buried safely underground in loose soil.',
      'Leaves remain green and expand flat without wilting.',
      'Absence of Tikka leaf spot on wind-damaged foliage.',
      'Pods fill out with bold, plump kernels.'
    ],
    escalationGuidance: [
      'If storm winds caused severe sand erosion across large acreages, notify the Taluka Agriculture Officer for soil conservation support.',
      'Consult KVK on shelterbelt planting for wind-prone sandy belts.'
    ]
  },

  groundnut__drought: {
    cropId: 'groundnut',
    cropName: 'Groundnut',
    calamityType: 'DROUGHT',
    calamityName: 'Drought / Dry Spell',
    damageOverview:
      'Moisture stress during flowering, pegging, or pod development causes soil baking (preventing pegs from penetrating), extensive flower drop, "pops" (empty pods), pod shrivelling, and rapid infection by Aspergillus flavus causing deadly Aflatoxin contamination.',
    inspectionChecklist: [
      'Check soil moisture in the top 10 cm pegging zone.',
      'Observe leaf folding during morning hours (groundnut folds leaves face-to-face under moisture stress).',
      'Inspect peg entry: are pegs penetrating the soil or bending/drying at the hard baked crust?',
      'Open 20 pods: check percentage of empty shells ("pops") vs developing kernels.',
      'Check for yellowing and drying of lower canopy.'
    ],
    steps: [
      {
        id: 'gnd-dr-1',
        title: 'Life-Saving Sprinkler / Furrow Irrigation at Pegging',
        description: 'Apply one protective irrigation prioritizing the pegging (40-50 DAS) or pod addition stage (60-70 DAS). Moistening the topsoil allows pegs to enter and expand into pods.',
        timeframe: 'Immediate',
        completionCriteria: 'Top 10 cm soil moistened; soil crust softened for peg entry.'
      },
      {
        id: 'gnd-dr-2',
        title: 'Foliar Potassium Nitrate (KNO3) Anti-Stress Spray',
        description: 'Spray 1% Potassium Nitrate (13:00:45 @ 10 g/L) across the canopy. Potassium acts as an osmoprotectant, maintaining cell turgor and stomatal regulation during heat and drought.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Canopy sprayed thoroughly in early morning.'
      },
      {
        id: 'gnd-dr-3',
        title: 'Dust Mulching in Inter-row Spaces',
        description: 'Run a shallow blade hoe (kolpa) lightly between rows to break capillary pores and create a loose surface dust layer that conserves deep soil moisture.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Dust mulch established; inter-row weeds eliminated.'
      },
      {
        id: 'gnd-dr-4',
        title: 'Gypsum Application for Pod Nutrition',
        description: 'Apply agricultural Gypsum (150-200 kg/acre) around plant bases during irrigation. Calcium is essential for pod shell development and prevents empty pods.',
        timeframe: 'Day 5–8',
        completionCriteria: 'Gypsum incorporated into moist root zone.'
      }
    ],
    precautions: [
      'Never allow the pegging zone to bake into a rock-hard crust during 40 to 70 DAS; pegs cannot penetrate dry soil.',
      'Do not apply solid urea during drought stress; it burns leaf margins.'
    ],
    recoveryTimeline: [
      'Day 1–2: Critical stage irrigation and foliar potassium spray.',
      'Day 3–5: Dust mulching and moisture conservation.',
      'Day 6–10: Gypsum application and pegging monitoring.',
      'Week 2–3: Bold seed filling in subterranean pods.'
    ],
    recoveryIndicators: [
      'Leaves remain open and flat throughout midday without folding.',
      'Pegs penetrate easily into the softened soil bed.',
      'Pod chambers fill with plump, solid kernels.',
      'Absence of empty pod shells ("pops").'
    ],
    escalationGuidance: [
      'If drought continues and pod filling drops below 30%, notify the District Agriculture Officer for PMFBY drought survey.',
      'Consult KVK on drought-tolerant varieties (e.g., TAG 24, Phule Unnati) for future seasons.'
    ]
  },

  groundnut__pest_attack: {
    cropId: 'groundnut',
    cropName: 'Groundnut',
    calamityType: 'PEST_DISEASE',
    calamityName: 'Severe Pest / Disease Infestation',
    damageOverview:
      'Devastating outbreak of Tikka Leaf Spot (Cercospora arachidicola / Phaeoisariopsis personata - causing severe defoliation), Rust (Puccinia arachidis), White Grub (Holotrichia serrata - severing taproots and subterranean pods), Spodoptera litura (defoliator), or Collar Rot.',
    inspectionChecklist: [
      'Inspect leaf undersides for dark brown/black circular spots with yellow halo (Early Tikka) or black carbonaceous spots on lower leaves (Late Tikka).',
      'Look for reddish-brown pustules on leaf undersides (Rust).',
      'Check for sudden wilting of patches of plants; excavate root zone to find C-shaped white grubs.',
      'Inspect leaves for gregarious Spodoptera caterpillars skeletonizing foliage.',
      'Count defoliation percentage across the canopy.'
    ],
    steps: [
      {
        id: 'gnd-pt-1',
        title: 'Tikka & Rust Systemic Fungicide Spray',
        description: 'At first appearance of Tikka spots or rust pustules, spray Hexaconazole 5% + Captan 70% WP (Taqat @ 1.5 g/L) or Tebuconazole 25.9 EC (1 ml/L) or Carbendazim + Mancozeb (2 g/L).',
        timeframe: 'Day 1–2',
        completionCriteria: 'Complete canopy coated with systemic fungicide; spot expansion halted.',
        isImmediateSafety: false
      },
      {
        id: 'gnd-pt-2',
        title: 'White Grub Drenching in Root Zone',
        description: 'If white grub is identified, drench the root zone with Chlorpyrifos 20 EC (4 ml/L) or Clothianidin 50 WDG (2 g/10 L) or Metarhizium anisopliae (2.5 kg/acre) along with irrigation.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Root zone drenched; grub mortality confirmed in sample pits.'
      },
      {
        id: 'gnd-pt-3',
        title: 'Spodoptera Defoliator Suppression',
        description: 'If leaf-eating caterpillars exceed ETL, spray Chlorantraniliprole 18.5 SC (0.3 ml/L) or Emamectin Benzoate 5 SG (0.4 g/L) targeting both leaf surfaces.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Complete canopy coverage in late afternoon; caterpillar mortality confirmed.'
      },
      {
        id: 'gnd-pt-4',
        title: 'Foliar Restorative Nutrition',
        description: 'Spray 19:19:19 (5 g/L) + Micronutrient mixture (2 g/L) 5 days after pest containment to stimulate rapid regrowth of photosynthetic leaf area.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Vigorous emergence of clean new leaflets.'
      }
    ],
    precautions: [
      'Do not delay spraying when Tikka leaf spot is observed; Tikka causes 100% defoliation within 10 days if unchecked.',
      'Always follow Pre-Harvest Interval (PHI) guidelines before harvesting.'
    ],
    recoveryTimeline: [
      'Day 1–2: Tikka and rust systemic fungicide spray.',
      'Day 2–5: White grub drenching and caterpillar suppression.',
      'Day 6–8: Pest mortality assessment.',
      'Week 2–3: Canopy stabilization and pod filling.'
    ],
    recoveryIndicators: [
      'Tikka spots dry up into grey scars without yellow halos.',
      'Total caterpillar mortality on treated leaves.',
      'Arrest of plant wilting from white grub.',
      'Fresh green leaves expanding from the apex.'
    ],
    escalationGuidance: [
      'If Tikka and Rust defoliation exceeds 40% across the field, consult the KVK plant pathologist immediately.',
      'Report white grub outbreaks to the District Agriculture Officer for community-level light-trap campaigns.'
    ]
  },

  groundnut__unseasonal_rain: {
    cropId: 'groundnut',
    cropName: 'Groundnut',
    calamityType: 'UNSEASONAL_WEATHER',
    calamityName: 'Unseasonal Weather Event',
    damageOverview:
      'Unseasonal rain during harvesting, field drying, or pod curing (October-November or April-May) causes mature pods to absorb soil moisture, leading to in-soil seed sprouting (vivipary), pod rot, shell blackening, and rapid infection by Aspergillus flavus producing carcinogenic Aflatoxins.',
    inspectionChecklist: [
      'Check maturity of pods (internal shell wall dark brown/black, seeds separate easily from shell).',
      'Inspect subterranean pods for sprouting (white radicles piercing shell wall).',
      'Check for black/yellow-green powdery mold inside split pods (Aspergillus flavus).',
      'Examine harvested windrows or heaps in the field for temperature rise and musty odor.',
      'Determine pod moisture content.'
    ],
    steps: [
      {
        id: 'gnd-ur-1',
        title: 'Priority Harvesting of Mature Plots',
        description: 'Harvest mature groundnut immediately as soon as soil permits. Do not leave mature pods underground during wet spells; they will germinate in the soil within 48-72 hours.',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'Crop uprooted and pods lifted out of wet soil.',
        isImmediateSafety: false
      },
      {
        id: 'gnd-ur-2',
        title: 'Pod Inversion / Aerated Windrowing',
        description: 'Invert harvested groundnut plants so that pod bunches face upward toward the sun and air, while the leafy vines face downward on the soil.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Harvested plants inverted; pods elevated and exposed to air.'
      },
      {
        id: 'gnd-ur-3',
        title: 'Move to Dry Ventilated Sheds / Tarpaulins',
        description: 'If rain continues, transport harvested plants immediately to dry sheds or spread them on clean plastic tarpaulins. Do not leave pods on wet mud.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Harvested crop moved under shelter on raised surfaces.'
      },
      {
        id: 'gnd-ur-4',
        title: 'Stripping & Scientific Thin-Layer Shade Drying',
        description: 'Strip pods from vines and dry pods on clean tarpaulins in thin layers (3-5 cm thick) under shade with continuous air circulation until moisture drops below 8-9%.',
        timeframe: 'Day 4–7',
        completionCriteria: 'Pod moisture brought below 9%; kernels rattle crisply inside pods.'
      }
    ],
    precautions: [
      'Never store damp groundnut pods (moisture >10%) in gunny or plastic bags; Aspergillus flavus will produce dangerous Aflatoxins within 36 hours.',
      'Do not sun-dry harvested groundnut under scorching mid-day sun directly on concrete; rapid drying cracks the pod shell and shrivels kernels.'
    ],
    recoveryTimeline: [
      'Day 1–2: Priority harvest and pod inversion.',
      'Day 2–4: Transfer to dry sheds and continuous aeration.',
      'Day 4–7: Stripping and thin-layer shade drying to <9% moisture.',
      'Week 2: Safe storage in aerated gunny bags with wooden dunnage.'
    ],
    recoveryIndicators: [
      'Clean, bright golden-yellow pod shells without black mold stains.',
      'Kernels rattle freely inside pod shells when shaken.',
      'Pod moisture verified below 9% on moisture meter.',
      'Zero sprouted kernels; free of musty sour odor.'
    ],
    escalationGuidance: [
      'File an intimation within 72 hours under PMFBY post-harvest loss provisions if harvested groundnut was damaged in the field.',
      'Consult the local APMC market committee if traders attempt unfair price discounting for surface-stained lots.'
    ]
  },

  groundnut__other: {
    cropId: 'groundnut',
    cropName: 'Groundnut',
    calamityType: 'OTHER',
    calamityName: 'Other Calamity',
    damageOverview:
      'Unforeseen events such as severe Iron Deficiency Chlorosis in calcareous black soils ("lime-induced chlorosis" - entire canopy turns paper-white), broadleaf herbicide drift, wild boar pod excavation, or localized soil salinity patches.',
    inspectionChecklist: [
      'Examine young terminal leaves: are they ivory-white or pale yellow with veins remaining green (Iron Deficiency Chlorosis)?',
      'Check leaf deformation patterns (cupping / strap leaves from herbicide drift).',
      'Check fields for wild boar digging holes and scattered excavated pods.',
      'Examine leaf margins for white necrotic salt scorch (Salinity).',
      'Document damage with date-stamped photographs.'
    ],
    steps: [
      {
        id: 'gnd-ot-1',
        title: 'Identify Calamity Source & Secure Field',
        description: 'Identify the exact cause. For wild boar pod digging, install solar pulsating fence wires or border deterrent ropes. For herbicide drift, trace neighbouring application.',
        timeframe: 'Day 1',
        completionCriteria: 'Cause identified; physical field protection established.',
        isImmediateSafety: true
      },
      {
        id: 'gnd-ot-2',
        title: 'Iron Deficiency Chlorosis Correction Spray',
        description: 'If paper-white chlorosis appears, spray Ferrous Sulphate (FeSO4 @ 5 g/L) + Citric Acid (1 g/L) + Urea (10 g/L) twice at 5-day intervals.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Ivory-white leaves turn lime-green within 4-5 days of spray.'
      },
      {
        id: 'gnd-ot-3',
        title: 'Foliar Neutralizing Spray for Chemical Drift',
        description: 'If weedicide drift occurred, spray 1% Urea + 0.5% Zinc Sulphate + Humic acid (2 ml/L) across the canopy to help plants metabolize chemical toxins.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Foliar spray applied; toxicity symptoms arrested.'
      },
      {
        id: 'gnd-ot-4',
        title: 'Foliar 19:19:19 & Micronutrient Boost',
        description: 'Apply water-soluble 19:19:19 (5 g/L) + Micronutrients (2 g/L) every 7-10 days until affected plants regain normal growth.',
        timeframe: 'Day 6–10',
        completionCriteria: 'Canopy sprayed; healthy new leaves and pegs emerging.'
      }
    ],
    precautions: [
      'Do not apply additional weedicides to stressed or chlorotic groundnut plants.',
      'Do not omit citric acid when spraying ferrous sulphate; citric acid prevents iron from precipitating into an unavailable form.'
    ],
    recoveryTimeline: [
      'Day 1–3: Diagnosis, perimeter securing, and iron chlorosis spray.',
      'Day 4–7: Foliar neutralization and bio-stimulant spray.',
      'Week 2: Foliar nutrition and secondary pegging.',
      'Week 3–4: Normal subterranean pod development.'
    ],
    recoveryIndicators: [
      'Leaves regain rich green color without white chlorotic interveinal banding.',
      'Healthy peg penetration into the soil bed.',
      'Absence of wildlife pod excavation.',
      'Normal pod set and kernel filling.'
    ],
    escalationGuidance: [
      'For severe lime-induced chlorosis, consult KVK soil scientists on basal iron chelate (Fe-EDDHA) applications for calcareous soils.',
      'Report wildlife pod destruction to the Forest Range Office for formal compensation.'
    ]
  }
};

