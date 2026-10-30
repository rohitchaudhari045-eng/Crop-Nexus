import { CropRecoveryPlan } from '../types';

export const soybeanPlans: Record<string, CropRecoveryPlan> = {
  soybean__heavy_rainfall: {
    cropId: 'soybean',
    cropName: 'Soybean',
    calamityType: 'HEAVY_RAINFALL',
    calamityName: 'Excessive / Heavy Rainfall',
    damageOverview:
      'Soybean is extremely sensitive to waterlogging. Stagnant water for more than 36-48 hours causes oxygen deprivation in the root zone, suffocating nitrogen-fixing Rhizobium nodules, causing severe yellowing (chlorosis), leaf drop, collar rot, and premature flower or pod abortion.',
    inspectionChecklist: [
      'Examine the field for standing water pockets, especially in depressed plots.',
      'Gently uproot 3-4 representative plants and cut open root nodules; pink/red interior indicates living nitrogen fixation, while greenish/brown or mushy nodules indicate nodule death.',
      'Inspect the collar region at ground level for soft rot or white fungal mycelium (Sclerotium rolfsii).',
      'Assess flower and young pod retention rates on lower branches.',
      'Check for yellow mosaic or leaf crinkling spreading post-rain.'
    ],
    steps: [
      {
        id: 'soy-hr-1',
        title: 'Emergency Drainage Channels (Nali / Furrows)',
        description: 'Immediately dig drainage furrows every 4-6 rows to evacuate all surface water within 24 hours. Connect these into field boundary drains.',
        timeframe: 'First 24 hours',
        completionCriteria: 'No standing water between soybean ridges or flat beds.',
        isImmediateSafety: true
      },
      {
        id: 'soy-hr-2',
        title: 'Foliar Nitrogen Resuscitation Spray',
        description: 'Because drowned nodules have stopped fixing atmospheric nitrogen, spray 2% Urea (20 g/L) or 19:19:19 (10 g/L) to supply direct nitrogen to yellowing leaves.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Leaves absorb foliar spray; yellowing turns back to lime green within 4 days.'
      },
      {
        id: 'soy-hr-3',
        title: 'Collar & Root Rot Preventative Drenching',
        description: 'Spray or root-drench with Carbendazim 12% + Mancozeb 63% WP (Saaf @ 2 g/L) or Tebuconazole 25.9 EC (1.5 ml/L) to protect moisture-damaged collars from fungal infection.',
        timeframe: 'Day 4–5',
        completionCriteria: 'Root collar base wetted with fungicide solution.'
      },
      {
        id: 'soy-hr-4',
        title: 'Shallow Hoeing for Soil Aeration (Vapsa Condition)',
        description: 'As soon as soil reaches workable moisture (vapsa), run a light hoe (kolpa) between rows to break the hard crust and introduce oxygen into the root zone.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Soil crust broken without shaking or cutting soybean root systems.'
      },
      {
        id: 'soy-hr-5',
        title: 'Pod Development Booster Spray',
        description: 'If crop is in flowering or pod initiation stage, spray 00:52:34 (Mono-Potassium Phosphate @ 5 g/L) + Boron (1 g/L) to prevent pod abortion and encourage bold seed formation.',
        timeframe: 'Day 8–12',
        completionCriteria: 'Pods remain firmly attached; healthy green color maintained.'
      }
    ],
    precautions: [
      'Do not broadcast solid urea on wet saturated soil, as it will cause nitrogen loss and toxic root burn.',
      'Do not allow cattle or heavy machinery into the field while soil is still soft and muddy.'
    ],
    recoveryTimeline: [
      'Day 1–2: Evacuate all standing water.',
      'Day 3–4: Foliar urea resuscitation spray.',
      'Day 5–7: Crust breaking and aeration.',
      'Week 2–3: Pod nutrition and fungal protection.'
    ],
    recoveryIndicators: [
      'Yellow leaves regain healthy green pigmentation.',
      'Formation of new pink-colored active root nodules.',
      'Emergence of new trifoliate leaves from the apex.',
      'Arrest of flower and premature pod drop.'
    ],
    escalationGuidance: [
      'If collar rot kills more than 35% of the plant population, contact the Agriculture Assistant for loss assessment.',
      'Consult KVK if leaves develop circular brown pustules indicating soybean rust (Phakopsora pachyrhizi).'
    ]
  },

  soybean__flooding: {
    cropId: 'soybean',
    cropName: 'Soybean',
    calamityType: 'FLOODING',
    calamityName: 'River / Canal Flooding',
    damageOverview:
      'River or nala flooding submerges soybean fields, leaving a heavy silt layer that suffocates leaves, flattens weak stems, and washes away fertile topsoil. Submergence for over 3 days usually results in complete plant mortality.',
    inspectionChecklist: [
      'Determine how many hours the crop was completely submerged underwater.',
      'Check whether the central growing tip (apical meristem) is intact or rotten.',
      'Examine the thickness of silt clay deposited over leaves and stems.',
      'Count the number of surviving live plants per square meter (aim for at least 25-30 plants/sq.m for economic viability).',
      'Inspect for uprooted or lodged plants.'
    ],
    steps: [
      {
        id: 'soy-fl-1',
        title: 'Safe Entry & Perimeter Drainage',
        description: 'Wait for flood waters to safely recede. Cut boundary trenches to channel trapped water out into natural runoff streams.',
        timeframe: 'Immediate upon flood recession',
        completionCriteria: 'Water table lowered below soil surface; field pathways safe.',
        isImmediateSafety: true
      },
      {
        id: 'soy-fl-2',
        title: 'Foliar Silt Washing',
        description: 'Using a high-pressure knapsack sprayer with clean water, spray leaves gently to wash off thick mud coatings before sunlight bakes them hard.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Leaf surfaces cleared of clay silt so photosynthesis can resume.'
      },
      {
        id: 'soy-fl-3',
        title: 'Gentle Uprighting of Lodged Plants',
        description: 'While soil is damp and pliable, gently lift plants that are plastered into mud so their leaves are elevated above the ground.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Plants lifted from mud bed without snapping tender main stems.'
      },
      {
        id: 'soy-fl-4',
        title: 'Collar Fungicide Application',
        description: 'Drench or spray with Metalaxyl 8% + Mancozeb 64% WP (2.5 g/L) to prevent Rhizoctonia and Pythium damping-off in the flood-affected root crowns.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Soil collar region coated with protective fungicide.'
      },
      {
        id: 'soy-fl-5',
        title: 'Micro-nutrient & 19:19:19 Foliar Revitalization',
        description: 'Spray water-soluble 19:19:19 (10 g/L) + Grade-II micronutrient mixture (2.5 g/L) to bypass flood-damaged roots and revitalize metabolism.',
        timeframe: 'Day 6–8',
        completionCriteria: 'Uniform foliar application completed; new green leaflets emerging.'
      }
    ],
    precautions: [
      'Do not walk on flooded soil excessively, as heavy footprints form hard impermeable compact mud holes.',
      'Do not apply granular fertilizers until active white roots are visible.'
    ],
    recoveryTimeline: [
      'Day 1–3: Drainage, silt washing, and lifting lodged plants.',
      'Day 4–7: Fungicide application and foliar nutrient resuscitation.',
      'Week 2: Soil crust breaking and root recovery.',
      'Week 3–4: Re-establishment of vegetative and reproductive development.'
    ],
    recoveryIndicators: [
      'Green apical shoots pushing through muddy stems.',
      'New white secondary roots branching from the upper taproot.',
      'Leaves standing upright and transpiring freely.',
      'Absence of blackening at the stem base.'
    ],
    escalationGuidance: [
      'If plant population drops below 15 plants per square meter, consult the Taluka Krishi Adhikari to evaluate contingency catch-crops (like chickpea/gram, rabi jowar, or safflower).',
      'Report complete crop loss for government relief claim Panchanama.'
    ]
  },

  soybean__hailstorm: {
    cropId: 'soybean',
    cropName: 'Soybean',
    calamityType: 'HAILSTORM',
    calamityName: 'Severe Hailstorm',
    damageOverview:
      'Hailstones shred trifoliate leaves, split hollow succulent stems, knock off flowers, and pierce developing green pods. Wounds invite severe fungal infections like anthracnose and pod blight.',
    inspectionChecklist: [
      'Assess defoliation percentage across upper and lower canopy layers.',
      'Check whether the main stem is completely severed below the cotyledonary node (plants severed below cotyledons cannot regenerate).',
      'Examine pods for puncture holes, bruised seeds, or cracked pod walls.',
      'Count remaining viable nodes per plant.',
      'Check for fungal mycelium on bruised tissue.'
    ],
    steps: [
      {
        id: 'soy-hl-1',
        title: 'Immediate Antiseptic Fungicide Spray',
        description: 'Within 24 to 48 hours of hailstorm, spray Carbendazim 50 WP (1 g/L) or Copper Oxychloride 50 WP (2.5 g/L) across the entire plot to seal open stem wounds.',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'All broken stems and shredded leaves coated with protective fungicide.',
        isImmediateSafety: false
      },
      {
        id: 'soy-hl-2',
        title: 'Growth Hormone & Energy Induction Spray',
        description: 'Spray 12:61:00 (5 g/L) along with Brassinolide (0.5 ml/L) or GA3 (10 ppm) to trigger dormant axillary buds at uninjured stem nodes into rapid new vegetative shoots.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Bud swell visible at axils of shattered leaves.'
      },
      {
        id: 'soy-hl-3',
        title: 'Weed Management in Open Canopy',
        description: 'Because hail has opened up the canopy to sunlight, weed seeds will quickly choke the weakened crop. Hand weed or carry out light shallow hoeing.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Inter-row spaces clear of competing weeds.'
      },
      {
        id: 'soy-hl-4',
        title: 'Pod Salvage & Secondary Flowering Nutrition',
        description: 'If the crop was at flowering/early pod stage, spray 00:52:34 (5 g/L) + Boron (1 g/L) to encourage a second flush of flowers and assist unpunctured pods to fill normally.',
        timeframe: 'Day 8–12',
        completionCriteria: 'Fresh flower buds appearing at newly sprouted axils.'
      }
    ],
    precautions: [
      'Do not plow down the crop immediately after hail; soybean can regenerate an impressive canopy from dormant axillary nodes if lower stem nodes are intact.',
      'Avoid heavy nitrogen application, which can cause excessive soft succulent growth prone to anthracnose.'
    ],
    recoveryTimeline: [
      'Day 1–2: Wound sealing fungicide application.',
      'Day 3–5: Bio-stimulant spray and weed clearing.',
      'Day 6–10: Activation of dormant axillary branch flushes.',
      'Week 3–4: Canopy re-closure and secondary pod development.'
    ],
    recoveryIndicators: [
      'Wounds on stems dry out and form hard calluses without black rotting.',
      'Vigorous green side branches emerging from lower nodes.',
      'New trifoliate leaves expanding cleanly.',
      'Unbroken pods continuing seed filling.'
    ],
    escalationGuidance: [
      'If more than 80% of stems are snapped at the ground line, request a revenue-agriculture Panchanama for complete hailstorm damage assessment.',
      'Consult KVK for seed viability testing if damaged pods were near harvest maturity.'
    ]
  },

  soybean__strong_winds: {
    cropId: 'soybean',
    cropName: 'Soybean',
    calamityType: 'HIGH_VELOCITY_WINDS',
    calamityName: 'High Velocity Winds / Storm',
    damageOverview:
      'Squall winds cause lodging in tall, lush soybean stands, especially when preceded by heavy rain that softens the soil. Lodging creates a dense tangled mat, reducing light penetration and increasing ground-level humidity which triggers pod blight.',
    inspectionChecklist: [
      'Determine the extent and direction of lodging across the field.',
      'Check whether stems are snapped or merely bent at ground level.',
      'Inspect lower pods for direct contact with damp soil.',
      'Assess whether leaves on the underside of the lodged mat are turning yellow and rotting.',
      'Look for early signs of Rhizoctonia aerial blight.'
    ],
    steps: [
      {
        id: 'soy-sw-1',
        title: 'Evaluate Natural Self-Righting (Phototropism)',
        description: 'Do not attempt to pull up lodged soybean plants manually, as their brittle stems easily snap. In most cases, terminal shoots will naturally curve upright towards the sun within 48-72 hours.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Terminal growing points curving upward on their own.'
      },
      {
        id: 'soy-sw-2',
        title: 'Open Furrows for Canopy Aeration & Drainage',
        description: 'Clear inter-row furrows to drain any trapped water and improve air circulation beneath the lodged canopy to prevent mold.',
        timeframe: 'Day 2–4',
        completionCriteria: 'No standing water beneath lodged canopy; air moving through furrows.'
      },
      {
        id: 'soy-sw-3',
        title: 'Preventive Spray for Aerial & Pod Blight',
        description: 'Spray Tebuconazole 10% + Sulphur 65% WG (2 g/L) or Azoxystrobin + Difenoconazole (1 ml/L) to prevent fungal blight in the shaded, high-humidity lodged microclimate.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Canopy underside wetted with protective fungicide.'
      },
      {
        id: 'soy-sw-4',
        title: 'Foliar Potassium to Strengthen Stem Fibers',
        description: 'Spray 00:00:50 (Potassium Sulphate @ 5 g/L) to strengthen vascular tissues and improve grain filling in lodged plants.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Foliar potash absorbed; stem rigidity improved.'
      }
    ],
    precautions: [
      'Never walk heavily over lodged soybean mats, as this crushes pods into the mud.',
      'Do not attempt to tie or stake individual soybean plants; let natural phototropic curvature restore canopy height.'
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
      'If lodging occurs during pod maturity and soil is saturated, contact the local Harvester Operator or TKA regarding prompt manual harvesting to prevent seed germination in pods.',
      'Consult KVK if aerial blight spreads rapidly across lodged foliage.'
    ]
  },

  soybean__drought: {
    cropId: 'soybean',
    cropName: 'Soybean',
    calamityType: 'DROUGHT',
    calamityName: 'Drought / Dry Spell',
    damageOverview:
      'Dry spells of 15-20 days during flowering and pod development cause massive flower drop, flat empty pods ("popa"), stunted growth, leaf scorch, and severe red spider mite or spodoptera outbreaks.',
    inspectionChecklist: [
      'Check soil moisture in the top 15 cm of soil.',
      'Observe leaf rolling during morning hours (indicates severe moisture deficit).',
      'Inspect flower and pod drop rates at leaf axils.',
      'Check pod development: count flat seedless pods vs pods with developing seeds.',
      'Examine leaf undersides for fine webbing and red spider mites.'
    ],
    steps: [
      {
        id: 'soy-dr-1',
        title: 'Life-Saving Sprinkler / Furrow Irrigation',
        description: 'If irrigation is available, apply a light protective irrigation using sprinklers or in alternate furrows during cool evening hours.',
        timeframe: 'Immediate',
        completionCriteria: 'Root zone moistened; plants recover turgor by morning.'
      },
      {
        id: 'soy-dr-2',
        title: 'Foliar Potassium Nitrate (KNO3) Spray',
        description: 'Spray 1% Potassium Nitrate (13:00:45 @ 10 g/L) across the canopy. Potassium acts as an osmoprotectant, maintaining cell turgor and stomatal regulation during heat and drought.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Canopy sprayed thoroughly; reduced daytime leaf rolling.'
      },
      {
        id: 'soy-dr-3',
        title: 'Dust Mulching (Inter-row Hoeing)',
        description: 'Run a shallow blade hoe (kolpa) lightly between rows to break capillary pores and create a loose surface dust layer that conserves deep soil moisture.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Dust mulch established; inter-row weeds eliminated.'
      },
      {
        id: 'soy-dr-4',
        title: 'Straw / Organic Residue Mulching',
        description: 'Spread wheat straw or sugarcane trash in inter-row spaces to lower soil temperatures and reduce moisture evaporation.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Soil between rows shaded with organic mulch.'
      },
      {
        id: 'soy-dr-5',
        title: 'Mite and Sucking Pest Containment',
        description: 'Drought favors red spider mites. If webbing is noticed, spray Wettable Sulphur 80 WDG (3 g/L) or Propargite 57 EC (2 ml/L) targeting leaf undersides.',
        timeframe: 'Day 7–9',
        completionCriteria: 'Mite webbing eradicated; healthy leaf greenness preserved.'
      }
    ],
    precautions: [
      'Do not apply solid urea during drought stress, as it exacerbates water loss and burns leaf margins.',
      'Avoid high-volume flood irrigation during mid-day heat, as hot water shocks the root system.'
    ],
    recoveryTimeline: [
      'Day 1–2: Protective irrigation and foliar potassium spray.',
      'Day 3–5: Dust mulching and moisture conservation.',
      'Day 6–10: Pest management and organic mulching.',
      'Week 2–3: Resumption of pod development upon rainfall or continued irrigation.'
    ],
    recoveryIndicators: [
      'Trifoliate leaves remain flat and open through midday without rolling.',
      'Retention of developing green pods without yellowing or drop.',
      'Absence of spider mite webbing and bronzing on leaf undersides.',
      'Seeds swelling noticeably inside pod chambers.'
    ],
    escalationGuidance: [
      'If rain fails for more than 25 days and pods remain flat, notify the District Agriculture Officer for drought compensation survey under PMFBY.',
      'Consult KVK agronomists on salvage harvesting for green fodder if grain yield is completely compromised.'
    ]
  },

  soybean__pest_attack: {
    cropId: 'soybean',
    cropName: 'Soybean',
    calamityType: 'PEST_DISEASE',
    calamityName: 'Severe Pest / Disease Infestation',
    damageOverview:
      'Outbreaks of Girdle Beetle (Oberereopsis brevis), Spodoptera litura (tobacco caterpillar), Semilooper, Yellow Mosaic Virus (YMV transmitted by whitefly), or Soybean Rust causing severe leaf defoliation, stem drying, and yield loss.',
    inspectionChecklist: [
      'Inspect plants for girdle rings on petioles and main stems (characteristic of girdle beetle).',
      'Check for gregarious young Spodoptera larvae skeletonizing leaves on the underside.',
      'Count defoliation percentage across the canopy (ETL: 20-25% defoliation during flowering).',
      'Look for yellow mosaic mottling or puckering on young trifoliate leaves.',
      'Examine leaf undersides for brown-red rust pustules.'
    ],
    steps: [
      {
        id: 'soy-pt-1',
        title: 'Manual Clipping of Girdled Branches & Egg Masses',
        description: 'Handpick and destroy Spodoptera egg masses and gregarious early-instar larvae clustered on leaves. Clip off wilted stems just below the lower girdle ring to kill inside larvae.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Girdled stems clipped and destroyed away from the field.',
        isImmediateSafety: false
      },
      {
        id: 'soy-pt-2',
        title: 'Install Pheromone Traps & Bird Perches',
        description: 'Install 4-5 Spodoptera pheromone traps per acre and erect 10-15 "T"-shaped bird perches per acre to encourage insectivorous birds (drongos, egrets) to prey on caterpillars.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Traps and bird perches active across the field.'
      },
      {
        id: 'soy-pt-3',
        title: 'Targeted Insecticide Spray per KVK Guidelines',
        description: 'Spray Chlorantraniliprole 18.5 SC (0.3 ml/L) or Flubendiamide 39.35 SC (0.3 ml/L) or Emamectin Benzoate 5 SG (0.4 g/L) for caterpillar complex and girdle beetle.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Complete canopy coverage in late afternoon; caterpillar mortality confirmed.'
      },
      {
        id: 'soy-pt-4',
        title: 'Whitefly & Yellow Mosaic Virus Vector Control',
        description: 'If whiteflies are present with yellow mosaic symptoms, spray Thiamethoxam 25 WG (0.3 g/L) or Acetamiprid 20 SP (0.3 g/L) to stop further virus transmission.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Whitefly counts minimized; healthy non-symptomatic plants protected.'
      },
      {
        id: 'soy-pt-5',
        title: 'Post-Attack Foliar Nutrient Recovery Spray',
        description: 'Spray 19:19:19 (5 g/L) + Micronutrient mixture (2 g/L) 5 days after pest containment to stimulate rapid regrowth of new photosynthetic leaf area.',
        timeframe: 'Day 8–12',
        completionCriteria: 'Vigorous emergence of new green leaves free of pest feeding.'
      }
    ],
    precautions: [
      'Do not apply broad-spectrum organophosphates indiscriminately, as this destroys natural parasitoids and causes resurgence of mites and whiteflies.',
      'Always follow Pre-Harvest Interval (PHI) guidelines before harvesting.'
    ],
    recoveryTimeline: [
      'Day 1–2: Cultural and mechanical removal of egg masses and girdled stems.',
      'Day 3–5: Targeted insecticide spray against active caterpillars.',
      'Day 6–8: Vector control for Yellow Mosaic Virus.',
      'Week 2–3: Canopy regeneration with foliar nutrients.'
    ],
    recoveryIndicators: [
      'Total caterpillar mortality on treated leaves.',
      'Halting of new girdle rings on stems.',
      'Rapid unfurling of clean, intact trifoliate leaves from the apex.',
      'Absence of new yellow mosaic patches on young growth.'
    ],
    escalationGuidance: [
      'If soybean rust (Phakopsora) is detected in the district, immediately spray Hexaconazole 5 EC (1 ml/L) or Propiconazole 25 EC (1 ml/L) and alert the local KVK.',
      'Report any widespread pest resistance or ineffective pesticide batches to the Quality Control Inspector.'
    ]
  },

  soybean__unseasonal_rain: {
    cropId: 'soybean',
    cropName: 'Soybean',
    calamityType: 'UNSEASONAL_WEATHER',
    calamityName: 'Unseasonal Weather Event',
    damageOverview:
      'Unseasonal rain during September-October coincides with soybean maturity. Wet pods absorb water rapidly, leading to pod shattering, in-pod seed sprouting (vivipary), fungal seed rot (Phomopsis / Colletotrichum), and severe loss of germination viability and market value.',
    inspectionChecklist: [
      'Check maturity stage of the crop (foliage yellowing, leaves dropped, brown dry pods).',
      'Inspect pods for premature splitting and seed shedding on the ground.',
      'Open 20 pods to check for seed swelling, skin wrinkling, or radicle emergence (sprouting).',
      'Examine harvested windrows or heaps in the field for temperature rise and internal molding.',
      'Determine seed moisture content.'
    ],
    steps: [
      {
        id: 'soy-ur-1',
        title: 'Emergency Priority Harvesting',
        description: 'As soon as rain clears, harvest mature fields immediately using combine harvesters or manual sickle labor. Do not allow mature pods to undergo alternate wetting and sun-drying cycles, which causes massive pod shattering.',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'Mature crop harvested and moved off wet field soil.',
        isImmediateSafety: false
      },
      {
        id: 'soy-ur-2',
        title: 'Avoid Field Heaping & Ensure Air Circulation',
        description: 'Never leave harvested soybean bundles in dense heaps on the ground. Stack them upright in small loose shocks (tipis) or move immediately to covered sheds to allow air to pass through.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Harvested bundles aerated; no internal heating or foul moisture smell.'
      },
      {
        id: 'soy-ur-3',
        title: 'Threshing at Optimum Moisture Window',
        description: 'Thresh as soon as pods become crisp. Set thresher cylinder speed to 400-500 RPM (low speed) to prevent cracking the fragile seed coats of moisture-stressed seeds.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Clean threshing completed with minimal split grain percentage.'
      },
      {
        id: 'soy-ur-4',
        title: 'Scientific Shade Drying & Moisture Reduction',
        description: 'Spread the threshed soybean seeds on clean tarpaulins in thin layers (3-5 cm thick) under shade. Turn seeds 3-4 times daily until moisture drops to 9-10% for safe storage.',
        timeframe: 'Day 4–7',
        completionCriteria: 'Seed moisture brought below 10%; grain crisp to bite.'
      },
      {
        id: 'soy-ur-5',
        title: 'Seed Viability Segregation',
        description: 'Conduct a simple floatation or rag-doll germination test. Do not keep seeds that underwent in-pod wetting for next season sowing; sell for commercial crushing instead.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Commercial crushing grade separated from certified sowing seed stock.'
      }
    ],
    precautions: [
      'Never pack damp soybean seeds (moisture >12%) in plastic or gunny bags; fungus will destroy the entire lot within 48 hours.',
      'Do not sun-dry harvested soybean seeds under scorching mid-day sun, as rapid desiccation cracks the seed coat and ruins germination.'
    ],
    recoveryTimeline: [
      'Day 1–2: Priority harvesting of mature crop.',
      'Day 2–4: Upright stacking, aeration, and thresher adjustment.',
      'Day 4–7: Thin-layer shade drying down to 9-10% moisture.',
      'Week 2: Safe storage in aerated bags and market dispatch.'
    ],
    recoveryIndicators: [
      'Threshed grains clean, golden-yellow, without black fungal spots.',
      'No musty sour odor in storage heaps.',
      'Seed moisture verified below 10% on moisture meter.',
      'Minimal split or crushed seed percentage.'
    ],
    escalationGuidance: [
      'If in-pod sprouting exceeds 15% across the crop, immediately notify the insurance company and Taluka Agriculture Officer within 72 hours for PMFBY harvest-loss claims.',
      'Consult the local APMC market committee if traders attempt unfair price discounting for unseasonal rain affected lots.'
    ]
  },

  soybean__other: {
    cropId: 'soybean',
    cropName: 'Soybean',
    calamityType: 'OTHER',
    calamityName: 'Other Calamity',
    damageOverview:
      'Unexpected events such as broadleaf herbicide drift (e.g., from 2,4-D or atrazine applied in neighbouring sugarcane/maize fields), localized soil toxicity, lightning strike, or wild boar / deer grazing.',
    inspectionChecklist: [
      'Identify damage pattern (herbicide drift follows wind direction with curling; wild animals leave clipped stems and footprints).',
      'Examine terminal buds and leaf petioles for twisting, cupping, or swelling.',
      'Check root nodule health and root collar condition.',
      'Delimit the exact affected acreage with GPS or landmark markers.',
      'Photograph evidence of the damage source.'
    ],
    steps: [
      {
        id: 'soy-ot-1',
        title: 'Diagnose Damage Agent & Secure Perimeter',
        description: 'Identify the cause. If herbicide drift occurred, document wind direction. If wild animals invaded, install border deterrent ropes, sound makers, or temporary solar fencing.',
        timeframe: 'Day 1',
        completionCriteria: 'Cause verified; perimeter secured against repeat damage.',
        isImmediateSafety: true
      },
      {
        id: 'soy-ot-2',
        title: 'Foliar Detoxification & Wash Spray',
        description: 'For herbicide drift, spray clean water with 0.5% Urea + 0.5% Zinc Sulphate or Activated Charcoal (5 g/L) to dilute and metabolize chemical residues on leaves.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Foliage washed thoroughly; toxic residues diluted.'
      },
      {
        id: 'soy-ot-3',
        title: 'Bio-stimulant & Amino Acid Therapy',
        description: 'Spray Amino Acid + Fulvic Acid bio-stimulant (2 ml/L) to reactivate dormant apical buds and alleviate chemical or physical shock.',
        timeframe: 'Day 3–5',
        completionCriteria: 'New buds swelling at uninjured lower nodes.'
      },
      {
        id: 'soy-ot-4',
        title: 'Shallow Intercultivation & Soil Loosening',
        description: 'Run a shallow hoe between rows to aerate compacted soil caused by animal trampling or spray equipment.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Soil loosened; surface crust broken.'
      },
      {
        id: 'soy-ot-5',
        title: 'Foliar 19:19:19 Nutritional Boost',
        description: 'Apply water-soluble 19:19:19 (5 g/L) + Micronutrients (2 g/L) every 7-10 days until affected plants regain normal growth.',
        timeframe: 'Day 8–15',
        completionCriteria: 'Regrown foliage matches height and vigor of unaffected sections.'
      }
    ],
    precautions: [
      'Do not apply additional chemical weedicides to already stressed or injured soybean plants.',
      'Do not uproot plants exhibiting herbicide leaf cupping hastily; many varieties recover if terminal buds are alive.'
    ],
    recoveryTimeline: [
      'Day 1–2: Diagnosis, perimeter securing, and foliage wash.',
      'Day 3–5: Bio-stimulant spray and soil aeration.',
      'Week 2–3: Foliar nutrition and secondary branching.',
      'Week 4: Normal flowering and pod formation.'
    ],
    recoveryIndicators: [
      'New trifoliate leaves unfurling with normal broad green morphology without curling.',
      'Active pink nodules functioning on taproots.',
      'Resumption of healthy flower cluster development at leaf axils.'
    ],
    escalationGuidance: [
      'For herbicide drift or wild animal depredation, request an official spot inspection by the Taluka Agriculture Officer and Forest Range Officer for official loss certification.',
      'Seek KVK advice if plants fail to recover within 10 days of bio-stimulant application.'
    ]
  }
};

