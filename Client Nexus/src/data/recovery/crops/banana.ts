import { CropRecoveryPlan } from '../types';

export const bananaPlans: Record<string, CropRecoveryPlan> = {
  banana__heavy_rainfall: {
    cropId: 'banana',
    cropName: 'Banana',
    calamityType: 'HEAVY_RAINFALL',
    calamityName: 'Excessive / Heavy Rainfall',
    damageOverview:
      'Continuous heavy rainfall saturates the soil and causes water stagnation in banana trenches, suffocating the shallow corm root system, causing lower leaf yellowing and petiole collapse, soft rotting of pseudostem bases, and rapid flare-up of Yellow/Black Sigatoka leaf spot.',
    inspectionChecklist: [
      'Check water depth in inter-row trenches and around corm basins.',
      'Inspect corm collar at ground level for soft watery rot or foul odor.',
      'Examine lower leaf petioles for sudden buckling or snapping.',
      'Check leaf blades for narrow brown streaks with yellow halos (Sigatoka leaf spot).',
      'Assess drainage ditch function at field boundaries.'
    ],
    steps: [
      {
        id: 'ban-hr-1',
        title: 'Emergency Trench Drainage between Paired Rows',
        description: 'Deepen drainage trenches between paired rows and cut exit channels through field bunds to drain all standing water within 24 hours. The water table must be lowered below 60 cm.',
        timeframe: 'First 24 hours',
        completionCriteria: 'No standing water in inter-row trenches; drainage channels flowing freely.',
        isImmediateSafety: true
      },
      {
        id: 'ban-hr-2',
        title: 'De-leafing & Sanitation of Sigatoka Leaves',
        description: 'Prune and cut off severely spotted, dry, or water-soaked lower leaves (de-leafing) using sanitized sickles. Place cut leaves face-down on the ground between rows or remove them.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Lower diseased leaves removed; canopy thinned to improve air movement.'
      },
      {
        id: 'ban-hr-3',
        title: 'Sigatoka Preventive Systemic Fungicide Spray',
        description: 'Spray Propiconazole 25 EC (1 ml/L) or Tebuconazole 25.9 EC (1 ml/L) mixed with mineral oil (10 ml/L) + sticker (0.5 ml/L) targeting the lower surface of the 3 youngest open leaves.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Youngest open leaves coated with oil-fungicide film.'
      },
      {
        id: 'ban-hr-4',
        title: 'Corm Drenching against Soft Rot & Wilt',
        description: 'Drench the soil around each corm base with Copper Oxychloride 50 WP (3 g/L) or Carbendazim (1 g/L) (3-5 liters per plant) to prevent Erwinia soft rot and fungal decay.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Each plant corm base treated with protective fungicide.'
      },
      {
        id: 'ban-hr-5',
        title: 'Foliar Nutrient & Potash Application',
        description: 'Heavy rain leaches potassium rapidly. Apply 50 g Muriate of Potash (MOP) + 50 g Urea per plant once soil dries, and spray 19:19:19 (5 g/L) across the canopy.',
        timeframe: 'Day 8–12',
        completionCriteria: 'Nutrients incorporated into root zone; foliar feed absorbed.'
      }
    ],
    precautions: [
      'Do not apply solid nitrogen fertilizers while soil is waterlogged; this causes severe pseudostem collar rot.',
      'Never prune green healthy leaves; banana requires at least 8-10 active green leaves to fill a heavy bunch.'
    ],
    recoveryTimeline: [
      'Day 1–2: Inter-row trench drainage.',
      'Day 2–5: De-leafing and Sigatoka systemic fungicide spray.',
      'Day 6–8: Corm drenching against soft rot.',
      'Week 2–3: Potash top-dressing and new leaf emergence.'
    ],
    recoveryIndicators: [
      'Unfurling of clean, broad green heart leaves (cigar leaves).',
      'Absence of Sigatoka streaks on the youngest 3-4 leaves.',
      'Firm, dry pseudostem base without soft rotting.',
      'Fresh white cord roots branching from the corm.'
    ],
    escalationGuidance: [
      'If pseudostem heart rot or Panama wilt (yellowing and buckling of lower leaves with internal vascular browning) appears, consult ICAR-NRCB Trichy / local KVK immediately.',
      'Report continuous drainage blockages to the local Irrigation Department.'
    ]
  },

  banana__flooding: {
    cropId: 'banana',
    cropName: 'Banana',
    calamityType: 'FLOODING',
    calamityName: 'River / Canal Flooding',
    damageOverview:
      'River or canal flooding submerges banana orchards, depositing thick silt over corms and suckers, eroding topsoil, loosening tree anchorage, rotting lower leaf sheaths, and toppling heavy bunch-bearing pseudostems.',
    inspectionChecklist: [
      'Determine height and duration of flood water against pseudostems.',
      'Check thickness of silt mud deposited around the corm collar.',
      'Examine whether flood waters have tilted or uprooted pseudostems.',
      'Inspect bunch-bearing plants: check for snapped peduncles or bunches touching mud.',
      'Look for foul-smelling bacterial soft rot at the water line.'
    ],
    steps: [
      {
        id: 'ban-fl-1',
        title: 'Drain Flood Water & Expose Corm Collars',
        description: 'Cut exit trenches in field bunds to discharge trapped flood water. Scrape deposited silt mud away from pseudostem collars down to the original soil level to prevent collar rot.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Water drained; silt mud cleared away from corms.',
        isImmediateSafety: true
      },
      {
        id: 'ban-fl-2',
        title: 'Propping & Staking Tilted Pseudostems',
        description: 'Provide double bamboo propping or polypropylene rope ties for leaning pseudostems, especially bunch-bearing plants, to prevent them toppling onto the wet ground.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Leaning plants supported with double bamboo poles or rope anchors.'
      },
      {
        id: 'ban-fl-3',
        title: 'De-trashing of Rotting Lower Leaf Sheaths',
        description: 'Strip off water-soaked, decaying outer leaf sheaths from the pseudostem up to the flood line to facilitate drying and prevent bacterial soft rot.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Decaying outer sheaths removed; pseudostem drying.'
      },
      {
        id: 'ban-fl-4',
        title: 'Corm Collar Disinfection Drenching',
        description: 'Drench each corm collar with Bleaching powder (10 g/L) or Copper Oxychloride (3 g/L) + Streptocycline (1 g/10 L) to halt bacterial and fungal rot.',
        timeframe: 'Day 5–7',
        completionCriteria: 'All corm collars drenched with bactericide-fungicide solution.'
      },
      {
        id: 'ban-fl-5',
        title: 'Foliar Energy & Nutrient Feeding',
        description: 'Spray 19:19:19 (5 g/L) + Micronutrient mixture (2 g/L) to nourish foliage while flood-damaged roots recover.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Canopy sprayed thoroughly; renewed leaf gloss visible.'
      }
    ],
    precautions: [
      'Never bury the corm collar under flood silt; collar suffocation will rot the corm within days.',
      'Do not apply solid chemical fertilizers until soil dries and active white roots appear.'
    ],
    recoveryTimeline: [
      'Day 1–3: Drainage, silt clearing, and plant propping.',
      'Day 3–6: De-trashing and corm collar disinfection.',
      'Day 6–10: Drip network repair and foliar nutrition.',
      'Week 3–4: Root anchoring and bunch filling resumption.'
    ],
    recoveryIndicators: [
      'Pseudostems standing upright and firmly anchored.',
      'Cigar leaves emerging straight and green.',
      'Absence of foul-smelling bacterial decay on outer sheaths.',
      'Bunches continue uniform finger filling.'
    ],
    escalationGuidance: [
      'If flood damage toppled more than 40% of bunch-bearing pseudostems, request an emergency revenue-agriculture Panchanama for disaster relief.',
      'Consult KVK on ratoon sucker selection to replace dead mother plants.'
    ]
  },

  banana__hailstorm: {
    cropId: 'banana',
    cropName: 'Banana',
    calamityType: 'HAILSTORM',
    calamityName: 'Severe Hailstorm',
    damageOverview:
      'Hail impact shreds broad banana leaf blades into thin ribbons, snaps petioles, bruises bunches, scars tender banana fingers with brown necrotic pits, and damages the central cigar leaf.',
    inspectionChecklist: [
      'Assess defoliation percentage and leaf blade shredding.',
      'Count number of functional green leaves remaining per plant (aim for at least 8 leaves for bunch filling).',
      'Inspect banana fingers for hail puncture marks, skin cracking, and brown bruises.',
      'Check whether the central cigar leaf is snapped or intact.',
      'Check bunches: determine whether the bunch stalk (peduncle) is cracked or snapped.'
    ],
    steps: [
      {
        id: 'ban-hl-1',
        title: 'Wound Disinfection Spray',
        description: 'Within 24-48 hours, spray Copper Oxychloride 50 WP (2.5 g/L) + Mancozeb (2 g/L) + sticker across the canopy and over bunches to prevent fungal entry into hail wounds.',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'All shredded foliage and bruised bunches coated with protective fungicide.',
        isImmediateSafety: false
      },
      {
        id: 'ban-hl-2',
        title: 'Pruning Collapsed Petioles (Retain Shredded Lamina)',
        description: 'Cut off only completely broken, dangling petioles. Do not remove shredded leaves if the petiole is upright; even ribboned leaf strips continue photosynthesizing.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Dangling broken petioles removed cleanly.'
      },
      {
        id: 'ban-hl-3',
        title: 'Sleeve Bunches with Non-Woven / Perforated Covers',
        description: 'Cover developing bunches with perforated polyethylene sleeves or non-woven polypropylene bags to protect bruised fingers from sunscald and fruit scarring.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Developing bunches covered with protective sleeves.'
      },
      {
        id: 'ban-hl-4',
        title: 'Foliar Energy & Nutrient Feeding',
        description: 'Spray 19:19:19 (5 g/L) + GA3 (10 ppm) or Brassinolide (0.5 ml/L) to accelerate emergence and expansion of new crown leaves from the central growing tip.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Foliar nutrition applied; rapid cigar leaf emergence.'
      },
      {
        id: 'ban-hl-5',
        title: 'Potash Drip Fertigation for Bunch Filling',
        description: 'Apply water-soluble 00:00:50 (Potassium Sulphate @ 5 kg/acre) through drip fertigation to support finger filling in damaged bunches.',
        timeframe: 'Day 8–12',
        completionCriteria: 'Potash fertigation completed; finger girth expanding.'
      }
    ],
    precautions: [
      'Do not cut off shredded leaves if they are green and attached; excessive de-leafing causes severe bunch weight reduction and delayed maturity.',
      'Avoid high nitrogen application immediately after hail; soft new tissue invites severe Sigatoka.'
    ],
    recoveryTimeline: [
      'Day 1–2: Wound disinfection spray.',
      'Day 2–4: Broken petiole pruning and bunch sleeving.',
      'Day 5–8: Foliar feeding and potash fertigation.',
      'Week 3–5: Emergence of 3-4 fresh, broad green leaves.'
    ],
    recoveryIndicators: [
      'Rapid emergence of new, broad, undamaged heart leaves.',
      'Hail bruises on fingers dry out and callous over without rot.',
      'Banana fingers continue filling to commercial girth.',
      'Canopy shading re-established.'
    ],
    escalationGuidance: [
      'If hail struck mature bunches (ready for harvest in 2-3 weeks) causing severe scarring, arrange immediate local marketing or processing before skin browning deepens.',
      'Request revenue-agriculture Panchanama for PMFBY hailstorm compensation.'
    ]
  },

  banana__strong_winds: {
    cropId: 'banana',
    cropName: 'Banana',
    calamityType: 'HIGH_VELOCITY_WINDS',
    calamityName: 'High Velocity Winds / Storm',
    damageOverview:
      'Gale-force squalls and storms cause catastrophic lodging of tall banana plants, snapping heavy pseudostems, uprooting corms, shredding leaves, and snapping bunch peduncles, causing massive economic loss in mature orchards.',
    inspectionChecklist: [
      'Determine percentage of lodged, snapped, and tilted plants across the orchard.',
      'Check bunch stage: are fallen bunches mature (ready for harvest) or immature?',
      'Inspect corms: are roots torn from the soil or is the pseudostem snapped mid-way?',
      'Check side suckers: are follower suckers intact and available to replace fallen mother plants?',
      'Examine drip laterals for displacement or crushing by fallen trunks.'
    ],
    steps: [
      {
        id: 'ban-sw-1',
        title: 'Emergency Harvest of Fallen Mature Bunches',
        description: 'Immediately cut and salvage all mature (3/4th to fully filled) bunches from fallen or snapped pseudostems. Move them to a packing shed before sunscald or bruising ruins the fruit.',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'Mature bunches harvested, cleaned, and dispatched for marketing.',
        isImmediateSafety: false
      },
      {
        id: 'ban-sw-2',
        title: 'Re-propping & Staking Tilted Surviving Plants',
        description: 'For leaning plants that have not snapped, gently prop them upright using double bamboo poles or polypropylene rope ties anchored to neighbouring plants or boundary anchors.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Leaning plants securely propped with double poles.'
      },
      {
        id: 'ban-sw-3',
        title: 'Cut Down Snapped Pseudostems & Retain Best Sucker',
        description: 'For completely snapped or fallen pseudostems, cleanly cut the trunk at ground level. Select the most vigorous, sword-leaf side sucker to take over as the ratoon crop.',
        timeframe: 'Day 2–5',
        completionCriteria: 'Broken mother trunks removed; single vigorous sword sucker retained per stool.'
      },
      {
        id: 'ban-sw-4',
        title: 'Earthing Up & Corm Anchorage',
        description: 'Mound 20-25 cm of fresh soil firmly around the corm of surviving plants and selected ratoon suckers to reinforce root anchoring against future winds.',
        timeframe: 'Day 4–7',
        completionCriteria: 'Corms earthed up and compacted firmly.'
      },
      {
        id: 'ban-sw-5',
        title: 'Fertigation Boost for Ratoon Sucker Growth',
        description: 'Apply 19:19:19 (5 kg/acre) + Micronutrient mixture through drip to accelerate vegetative growth of the newly selected ratoon suckers.',
        timeframe: 'Day 7–12',
        completionCriteria: 'Fertigation applied; ratoon suckers expanding rapidly.'
      }
    ],
    precautions: [
      'Do not attempt to lift pseudostems that are snapped more than 50% through the trunk; cut them cleanly and manage the sucker instead.',
      'Never allow water suckers (broad-leaved weak suckers) to become the ratoon plant; select only sword suckers (narrow pointed leaves).'
    ],
    recoveryTimeline: [
      'Day 1–2: Emergency harvest of fallen mature bunches.',
      'Day 2–5: Re-propping leaning plants and sucker selection for ratoon crop.',
      'Day 6–10: Earthing up and fertigation boost.',
      'Week 3–4: Rapid growth of ratoon canopy and stabilization of surviving crop.'
    ],
    recoveryIndicators: [
      'Propped pseudostems standing firm without sagging.',
      'Selected ratoon sword suckers growing vigorously with upright green leaves.',
      'Firm soil consolidation around corm collars.',
      'Surviving bunches continue finger filling.'
    ],
    escalationGuidance: [
      'If storm winds destroyed more than 50% of the standing crop, request an emergency joint Panchanama by Revenue and Agriculture departments within 72 hours.',
      'Consult KVK on high-density planting and double-row trenching design to improve wind resistance in future plantings.'
    ]
  },

  banana__drought: {
    cropId: 'banana',
    cropName: 'Banana',
    calamityType: 'DROUGHT',
    calamityName: 'Drought / Dry Spell',
    damageOverview:
      'Severe moisture stress causes leaf scorching, premature drying of lower leaves, "bunch choke" (inability of the bunch to emerge from the throat of the pseudostem, causing rotting inside the trunk), reduced bunch weight, and undersized fingers.',
    inspectionChecklist: [
      'Check soil moisture depth in the drip wetting zone.',
      'Inspect for leaf wilting, drooping, and scorching of leaf margins.',
      'Examine emerging bunches: is the bunch peduncle emerging freely or stuck/bunched up in the throat (bunch choke)?',
      'Check bunch finger size and girth.',
      'Inspect for red spider mite colonies on leaf undersides.'
    ],
    steps: [
      {
        id: 'ban-dr-1',
        title: 'Basin Mulching with Sugarcane Trash / Straw',
        description: 'Immediately spread a 10-15 cm thick layer of dried sugarcane trash, straw, or banana leaves in the drip wetting zone. Mulching reduces soil evaporation by up to 50% and cools the corm.',
        timeframe: 'Immediate',
        completionCriteria: 'All corm wetting zones completely covered with thick organic mulch.'
      },
      {
        id: 'ban-dr-2',
        title: 'Optimize Drip Irrigation Scheduling',
        description: 'Operate drip systems in the early morning and late evening to maximize absorption. Maintain 20-25 liters of water per plant per day during bunch development.',
        timeframe: 'Ongoing during drought',
        completionCriteria: 'Root zone maintained with consistent moisture; no midday water stress.'
      },
      {
        id: 'ban-dr-3',
        title: 'Relieve Bunch Choke Manually & Foliar Spray',
        description: 'If emerging bunches are stuck in the pseudostem throat (choking), carefully slit the constricting outer leaf sheath by 10-15 cm with a sharp knife to release the bunch. Spray 19:19:19 (5 g/L).',
        timeframe: 'Day 2–4',
        completionCriteria: 'Choked bunches released; peduncles curving downward freely.'
      },
      {
        id: 'ban-dr-4',
        title: 'Foliar Osmoprotectant & Anti-Transpirant Spray',
        description: 'Spray Potassium Nitrate (13:00:45 @ 10 g/L) + Boron (1 g/L) or Kaolin clay (30 g/L) across the canopy to reduce transpiration loss and protect leaves from heat scorch.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Canopy wetted thoroughly; leaf temperature reduced.'
      },
      {
        id: 'ban-dr-5',
        title: 'Remove Non-Essential Side Suckers',
        description: 'Desucker all non-essential side suckers immediately (keep only 1 selected follower sucker). Extra suckers compete heavily for scarce water and nutrients.',
        timeframe: 'Day 6–8',
        completionCriteria: 'All extra side suckers pruned at ground level.'
      }
    ],
    precautions: [
      'Never apply high-dose granular nitrogen (urea) during drought stress; it causes leaf margin scorching and severe corm shock.',
      'Do not allow bunches to remain choked inside the pseudostem throat; they will rot internally.'
    ],
    recoveryTimeline: [
      'Day 1–2: Basin mulching and drip optimization.',
      'Day 2–5: Bunch choke relief and foliar potassium spray.',
      'Day 6–10: Desuckering and moisture conservation.',
      'Week 2–3: Finger filling and normal bunch development.'
    ],
    recoveryIndicators: [
      'Leaves remain green and turgid throughout midday.',
      'Bunches emerge freely and curve downward smoothly.',
      'Healthy finger expansion without fruit tip drying.',
      'Absence of leaf margin scorch.'
    ],
    escalationGuidance: [
      'If drought continues and bunch weight is compromised across more than 40% of the crop, notify the District Agriculture Officer for PMFBY drought survey.',
      'Coordinate with the local Irrigation Department or tanker water supply for critical water allocation.'
    ]
  },

  banana__pest_attack: {
    cropId: 'banana',
    cropName: 'Banana',
    calamityType: 'PEST_DISEASE',
    calamityName: 'Severe Pest / Disease Infestation',
    damageOverview:
      'Catastrophic outbreak of Panama Wilt (Fusarium oxysporum f. sp. cubense - yellowing and collapse of lower leaves, internal vascular discoloration), Banana Weevil / Rhizome Borer (Cosmopolites sordidus - tunneling into corms causing toppling), Banana Pseudostem Borer (Odoiporus longicollis), Yellow/Black Sigatoka Leaf Spot, or Banana Bunchy Top Virus (BBTV).',
    inspectionChecklist: [
      'Examine lower leaves: are they turning yellow and buckling at the petiole base while staying attached to the pseudostem (Panama Wilt)?',
      'Split open a wilting pseudostem longitudinally: look for brown, red, or black vascular discoloration in the outer and inner sheaths.',
      'Inspect corm and lower pseudostem for small holes oozing jelly-like gum and filled with larval tunnels (Rhizome / Pseudostem Borer).',
      'Check for narrow dark brown to black streaks with grey centers on leaf blades (Sigatoka).',
      'Check young leaves for bunching at the apex with dark green "dot-dash" streaks on petioles (Bunchy Top Virus).'
    ],
    steps: [
      {
        id: 'ban-pt-1',
        title: 'Quarantine & Rogueing of Panama Wilt / BBTV Plants',
        description: 'Immediately uproot and destroy plants infected with Panama Wilt or Bunchy Top Virus. For BBTV, inject the pseudostem with 2,4-D (4 ml/plant) or kerosene to kill it in-situ, then spray Imidacloprid to kill aphid vectors.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Infected plants rogued, chopped, and burned outside orchard; pit sanitized.',
        isImmediateSafety: false
      },
      {
        id: 'ban-pt-2',
        title: 'Pseudostem / Rhizome Borer Chemical Swabbing',
        description: 'For pseudostem and rhizome borers, swab or inject the pseudostem up to 1 meter height with Chlorpyrifos 20 EC (2.5 ml/L) or Carbaryl (4 g/L), and place Cosmolure pheromone traps (5/acre).',
        timeframe: 'Day 2–4',
        completionCriteria: 'Pseudostem bases swabbed; pheromone traps active.'
      },
      {
        id: 'ban-pt-3',
        title: 'Sigatoka Systemic Fungicide + Mineral Oil Spray',
        description: 'Spray Propiconazole 25 EC (1 ml/L) or Tebuconazole (1 ml/L) + agricultural mineral oil (10 ml/L) targeting the underside of the 3 youngest open leaves.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Canopy wetted thoroughly with oil-fungicide film.'
      },
      {
        id: 'ban-pt-4',
        title: 'Trichoderma / Bio-agent Corm Drenching',
        description: 'Drench surviving neighbouring plants with Trichoderma harzianum (50 g/plant enriched in 5 kg FYM) or Pseudomonas fluorescens to create a biological protective barrier against Panama wilt.',
        timeframe: 'Day 5–8',
        completionCriteria: 'Root zones of all surrounding plants treated with bio-fungicide.'
      },
      {
        id: 'ban-pt-5',
        title: 'Foliar Health Recovery Spray',
        description: 'Spray 19:19:19 (5 g/L) + Micronutrient mixture (2 g/L) to accelerate vegetative growth in surviving healthy plants.',
        timeframe: 'Day 8–12',
        completionCriteria: 'Canopy sprayed; healthy leaf emergence.'
      }
    ],
    precautions: [
      'Never take planting suckers from an orchard infected with Panama Wilt, BBTV, or rhizome weevils.',
      'Do not move soil or tools from a Panama wilt-infected plot to a healthy plot without flaming or dipping in bleach.'
    ],
    recoveryTimeline: [
      'Day 1–2: Rogueing and destruction of virus and wilt plants.',
      'Day 2–5: Borer swabbing, pheromone traps, and Sigatoka spray.',
      'Day 5–8: Biological root drenching with Trichoderma.',
      'Week 2–3: Canopy stabilization and healthy bunch filling.'
    ],
    recoveryIndicators: [
      'Arrest of Panama wilt spread to neighbouring stools.',
      'Borer larval tunnels dry up without gum exudation.',
      'Absence of Sigatoka streaks on newly emerging cigar leaves.',
      'Healthy broad green leaves expanding from the apex.'
    ],
    escalationGuidance: [
      'If Panama Wilt Race 1 or Tropical Race 4 (TR4) is suspected, immediately notify ICAR-NRCB Trichy and the State Agriculture Commissionerate for emergency quarantine.',
      'Report unmanageable borer outbreaks to the local KVK entomologist.'
    ]
  },

  banana__unseasonal_rain: {
    cropId: 'banana',
    cropName: 'Banana',
    calamityType: 'UNSEASONAL_WEATHER',
    calamityName: 'Unseasonal Weather Event',
    damageOverview:
      'Unseasonal rain during bunch maturity and harvesting (October-November or February-March) causes severe finger splitting/cracking, fungal bunch rot (Cigar End Rot / Anthracnose), sooty mold rind staining, and delays field transport to distant urban markets.',
    inspectionChecklist: [
      'Check maturity of bunches (rounding of finger angles, 3/4th to full fill).',
      'Inspect fingers for skin cracking, splitting, or water-soaked lesions.',
      'Check for black dry rot at the tips of fingers (Cigar End Rot).',
      'Examine bunch peduncles for black fungal rot.',
      'Determine road trafficability and transport availability.'
    ],
    steps: [
      {
        id: 'ban-ur-1',
        title: 'Priority Harvest of Mature 3/4th Filled Bunches',
        description: 'Immediately harvest all mature bunches that have reached 3/4th fill. Do not allow ripe bunches to stay on the plant in rainy weather; fingers will split and rot rapidly.',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'Mature bunches harvested and transferred to dry packing sheds.'
      },
      {
        id: 'ban-ur-2',
        title: 'Sleeve Developing Bunches with Perforated Covers',
        description: 'Cover unripe developing bunches with perforated polyethylene sleeves or non-woven polypropylene bags open at the bottom to shed rain water while allowing air flow.',
        timeframe: 'Day 1–3',
        completionCriteria: 'All developing bunches sleeved with protective covers.'
      },
      {
        id: 'ban-ur-3',
        title: 'Protective Fungicide Spray against Cigar End Rot',
        description: 'Spray Copper Oxychloride 50 WP (2.5 g/L) or Carbendazim (1 g/L) directly over bunch tips and hands to prevent Cigar End Rot and Anthracnose.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Bunches wetted with protective fungicide; finger tips coated.'
      },
      {
        id: 'ban-ur-4',
        title: 'Post-Harvest De-handing, Washing & Alum Treatment',
        description: 'De-hand harvested bunches in the packing shed, wash crowns in clean water containing 0.1% Alum (phitkari) to stop latex bleeding, dry under fans, and pack in ventilated CFB cartons.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Hands washed, latex sealed, and packed in dry ventilated cartons.'
      }
    ],
    precautions: [
      'Never pack wet or damp banana fingers into closed plastic crates or cardboard cartons; fruit rot will ruin 100% of the lot in transit.',
      'Do not allow harvested bunches to rest directly on wet muddy ground.'
    ],
    recoveryTimeline: [
      'Day 1–2: Priority harvesting of mature bunches and bunch sleeving.',
      'Day 2–4: Fungicide spray on developing bunches.',
      'Day 3–5: Post-harvest washing, alum treatment, and packing.',
      'Week 2: Safe transport to terminal markets and harvest of remaining crop.'
    ],
    recoveryIndicators: [
      'Harvested fingers clean, dry, with bright green peel free of fungal blemishes.',
      'Absence of Cigar End Rot on developing bunches.',
      'Zero finger splitting in sleeved bunches.',
      'Successful market dispatch with high commercial realization.'
    ],
    escalationGuidance: [
      'File an intimation within 72 hours under PMFBY horticulture post-harvest provisions if harvested bunches were damaged by unseasonal rain.',
      'Coordinate with the Maharashtra State Agricultural Marketing Board (MSAMB) or APMC for refrigerated transport logistics.'
    ]
  },

  banana__other: {
    cropId: 'banana',
    cropName: 'Banana',
    calamityType: 'OTHER',
    calamityName: 'Other Calamity',
    damageOverview:
      'Unforeseen events such as severe winter cold injury (<8°C causing bunch choke, poor fruit filling, and yellowing), accidental weedicide drift (e.g. glyphosate or 2,4-D causing leaf distortion and cigar twisting), wild animal / wild boar corm uprooting, or localized soil salinity.',
    inspectionChecklist: [
      'Inspect emerging leaves for bunching, twisting, or failure of cigar leaves to unfurl (Cold injury / Bunch choke).',
      'Check leaf deformation patterns (narrow strap leaves or chlorotic mottling from herbicide drift).',
      'Examine corms for wild boar excavation or chewing damage.',
      'Check leaf margins for white necrotic salt scorch (Salinity).',
      'Document evidence with date-stamped photographs.'
    ],
    steps: [
      {
        id: 'ban-ot-1',
        title: 'Identify Calamity Source & Secure Orchard',
        description: 'Identify the exact cause. For wild boar corm damage, install solar pulsating fence wires. For herbicide drift, trace neighbouring application.',
        timeframe: 'Day 1',
        completionCriteria: 'Cause identified; physical orchard security established.',
        isImmediateSafety: true
      },
      {
        id: 'ban-ot-2',
        title: 'Cold Wave Mitigation: Night Irrigation & Smoke',
        description: 'During severe winter cold snaps (<8°C), provide light night irrigation through micro-sprinklers and create light smoke screens on field borders to raise ambient temperatures.',
        timeframe: 'During cold event',
        completionCriteria: 'Orchard temperature elevated; frost injury prevented.'
      },
      {
        id: 'ban-ot-3',
        title: 'Foliar Neutralizing Spray for Chemical Drift',
        description: 'If weedicide drift occurred, spray 1% Urea + 0.5% Zinc Sulphate + Humic acid (2 ml/L) across the canopy to help plants metabolize chemical toxins.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Foliar spray applied; toxicity symptoms arrested.'
      },
      {
        id: 'ban-ot-4',
        title: 'Foliar 19:19:19 & Micronutrient Boost',
        description: 'Apply water-soluble 19:19:19 (5 g/L) + Micronutrients (2 g/L) every 8-10 days to stimulate vigorous new cigar leaf emergence.',
        timeframe: 'Day 5–10',
        completionCriteria: 'Canopy sprayed; healthy new leaves unfurling.'
      }
    ],
    precautions: [
      'Do not apply broad-spectrum systemic weedicides (like glyphosate) inside banana orchards without a protective spray hood; banana is hyper-sensitive to drift.',
      'Avoid high-salinity borewell water during bunch emergence.'
    ],
    recoveryTimeline: [
      'Day 1–2: Diagnosis, perimeter securing, and cold mitigation.',
      'Day 3–5: Foliar neutralization and smoke screening.',
      'Week 2: Foliar nutrition and ratoon management.',
      'Week 3–4: Normal heart leaf unfurling and bunch development.'
    ],
    recoveryIndicators: [
      'New cigar leaves unfurl smoothly into broad, undamaged green leaves.',
      'Absence of leaf strapping or petiole distortion.',
      'Healthy finger expansion in developing bunches.'
    ],
    escalationGuidance: [
      'For severe winter cold injury or wildlife damage, request an official assessment by the Taluka Agriculture Officer for natural calamity relief.',
      'Consult ICAR-NRCB Trichy if physiological leaf distortion persists across multiple stools.'
    ]
  }
};

