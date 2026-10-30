import { CropRecoveryPlan } from '../types';

export const tomatoPlans: Record<string, CropRecoveryPlan> = {
  tomato__heavy_rainfall: {
    cropId: 'tomato',
    cropName: 'Tomato',
    calamityType: 'HEAVY_RAINFALL',
    calamityName: 'Excessive / Heavy Rainfall',
    damageOverview:
      'Continuous heavy downpours cause waterlogging between raised beds, rapid root suffocation, splash dispersal of soil-borne Late Blight (Phytophthora infestans) and Early Blight, sudden Bacterial Wilt (Ralstonia solanacearum), severe flower drop, and fruit cracking.',
    inspectionChecklist: [
      'Check furrow depth and standing water stagnation between raised beds.',
      'Inspect lower foliage for water-soaked, dark brown lesions with pale green borders (Late Blight).',
      'Look for sudden daytime wilting of entire green plants without yellowing (Bacterial Wilt).',
      'Examine green and red fruits for radial or concentric cracking around the stem scar.',
      'Check flower trusses for bud yellowing and blossom drop.'
    ],
    steps: [
      {
        id: 'tom-hr-1',
        title: 'Emergency Trench Drainage between Raised Beds',
        description: 'Immediately cut deep furrow outlets to drain all standing water off the beds within 12 hours. Lower the water table below the root zone.',
        timeframe: 'First 12–24 hours',
        completionCriteria: 'All water drained from furrow channels; bed shoulders dry.',
        isImmediateSafety: true
      },
      {
        id: 'tom-hr-2',
        title: 'Late Blight Emergency Systemic Spray',
        description: 'Spray Cymoxanil 8% + Mancozeb 64% WP (Curzate @ 2.5 g/L) or Dimethomorph 50% WP (1 g/L) + Mancozeb (2 g/L) targeting both leaf surfaces and fruit clusters.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Complete canopy coated with systemic anti-blight fungicide.'
      },
      {
        id: 'tom-hr-3',
        title: 'Bacterial Wilt Collar Drenching',
        description: 'Drench the soil collar around each plant with Copper Hydroxide 77 WP (2 g/L) + Streptocycline (1 g per 10 L) to halt the spread of bacterial wilt in wet soil.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Soil collar region drenched with bactericide solution.'
      },
      {
        id: 'tom-hr-4',
        title: 'Foliar Calcium & Boron for Fruit Cracking & Blossom End Rot',
        description: 'Excess soil water prevents calcium uptake, causing Blossom End Rot and fruit cracking. Spray Calcium Nitrate (5 g/L) + Boron (1 g/L) as soon as sunlight returns.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Foliar spray applied; fruit calcium nutrition restored.'
      },
      {
        id: 'tom-hr-5',
        title: 'Trellis Reinforcement & Sanitation Pruning',
        description: 'Tighten loose staking wires, tie up fallen vines, and clip off water-soaked, yellowing, or decaying lower leaves (up to 30 cm height) to improve air circulation.',
        timeframe: 'Day 6–8',
        completionCriteria: 'Vines tied upright; lower 30 cm canopy cleared of touching leaves.'
      }
    ],
    precautions: [
      'Never apply chemical urea while soil is waterlogged; it causes explosive vegetative softness and severe bacterial wilt.',
      'Do not touch or work in wet tomato foliage during late blight outbreaks; brushing against wet leaves spreads millions of zoospores.'
    ],
    recoveryTimeline: [
      'Day 1–2: Complete bed drainage and systemic late blight spray.',
      'Day 2–4: Bacterial wilt drenching and cracked fruit sanitation.',
      'Day 4–7: Foliar calcium spray and trellis reinforcement.',
      'Week 2–3: Canopy stabilization and resumption of flowering.'
    ],
    recoveryIndicators: [
      'Late blight lesions dry up into brittle grey/brown spots without white downy mold.',
      'Arrest of whole-plant daytime wilting.',
      'Fresh flower clusters setting fruit normally without drop.',
      'New fruit growth free of radial cracking or blossom end rot.'
    ],
    escalationGuidance: [
      'If Late Blight causes rapid canopy collapse across more than 30% of the plot, consult the KVK plant pathologist immediately for emergency systemic protocols.',
      'Report complete crop loss for vegetable damage Panchanama.'
    ]
  },

  tomato__flooding: {
    cropId: 'tomato',
    cropName: 'Tomato',
    calamityType: 'FLOODING',
    calamityName: 'River / Canal Flooding',
    damageOverview:
      'River flooding submerges tomato beds completely, depositing silt mud over foliage, knocking down trellises and bamboo stakes, suffocating the root system, and causing near-total plant collapse and fruit decay within 24-48 hours.',
    inspectionChecklist: [
      'Determine hours of complete submergence under muddy flood water.',
      'Check condition of staking bamboo, wire trellises, and jute twine.',
      'Examine whether stems are snapped or submerged in silt mud.',
      'Inspect fruit clusters: check for mud encrustation and soft bacterial fruit rot.',
      'Count surviving live plants with green growing tips.'
    ],
    steps: [
      {
        id: 'tom-fl-1',
        title: 'Drain Inundation & Clear Bed Furrows',
        description: 'Cut drainage channels through bunds to completely discharge flood water. Lower water levels below raised bed shoulders immediately.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Water drained; raised bed tops exposed.',
        isImmediateSafety: true
      },
      {
        id: 'tom-fl-2',
        title: 'Foliar Silt Washing with Clean Water',
        description: 'Using a high-pressure knapsack sprayer with clean water, gently spray leaves and fruit clusters to rinse away thick mud before it dries into a crust.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Canopy cleared of silt mud; leaves exposed to air and light.'
      },
      {
        id: 'tom-fl-3',
        title: 'Re-erect Staking Trellises & Tie Vines',
        description: 'Re-drive dislodged bamboo poles, tighten trellis wires, and tie fallen tomato vines upright with jute twine to lift leaves and fruit off the wet soil.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Trellises re-erected; vines elevated off the ground.'
      },
      {
        id: 'tom-fl-4',
        title: 'Comprehensive Bactericide & Fungicide Protection',
        description: 'Spray Copper Oxychloride 50 WP (2.5 g/L) + Streptocycline (1 g per 10 L) + Mancozeb (2 g/L) to prevent bacterial canker, wilt, and damping-off.',
        timeframe: 'Day 3–5',
        completionCriteria: 'All vines, fruits, and stem collars coated with protective spray.'
      },
      {
        id: 'tom-fl-5',
        title: 'Foliar 19:19:19 & Humic Acid Resuscitation',
        description: 'Spray 19:19:19 (5 g/L) + Humic acid (2 ml/L) to nourish vines whose root systems have been temporarily damaged by flood water.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Foliar spray absorbed; vines showing renewed turgor.'
      }
    ],
    precautions: [
      'Do not allow mud-soaked tomato vines to remain lying on the ground; fruits will rot completely within 24 hours.',
      'Do not apply solid fertilizers until soil is dry and active white roots appear.'
    ],
    recoveryTimeline: [
      'Day 1–3: Drainage, silt washing, and trellis re-erection.',
      'Day 3–6: Protective bactericide spray and foliar feeding.',
      'Week 2: Soil crust breaking and root recovery.',
      'Week 3–4: Resumption of vegetative growth and fruit set.'
    ],
    recoveryIndicators: [
      'Vines standing upright on trellises with turgid green leaves.',
      'New white secondary roots branching into raised bed soil.',
      'Absence of foul-smelling bacterial fruit rot.',
      'Emergence of new flower clusters from apical shoots.'
    ],
    escalationGuidance: [
      'If surviving vine density drops below 40%, consult KVK for resowing or relay vegetable cropping.',
      'Report complete flood loss for disaster relief assessment.'
    ]
  },

  tomato__hailstorm: {
    cropId: 'tomato',
    cropName: 'Tomato',
    calamityType: 'HAILSTORM',
    calamityName: 'Severe Hailstorm',
    damageOverview:
      'Hail impact shatters tender tomato foliage, snaps main vines, breaks staking twine, punctures green and ripe fruits with deep necrotic pits, knocks off flowers, and causes widespread stem splitting.',
    inspectionChecklist: [
      'Assess defoliation percentage across the canopy.',
      'Inspect fruit clusters: check for hail punctures, bruised pericarp, and skin tears.',
      'Check main vines and lateral branches for splitting, crushing, and broken ties.',
      'Count percentage of punctured unmarketable fruits.',
      'Check for early bacterial canker or fungal blight entering fresh hail wounds.'
    ],
    steps: [
      {
        id: 'tom-hl-1',
        title: 'Immediate Antimicrobial Wound Sealing Spray',
        description: 'Within 24 hours of hailstorm cessation, spray Copper Hydroxide (2 g/L) + Streptocycline (1 g/10 L) + Mancozeb (2 g/L) to sterilize stem cracks and fruit punctures.',
        timeframe: 'First 24 hours',
        completionCriteria: 'All broken vines, shredded leaves, and fruits coated with antimicrobial film.',
        isImmediateSafety: false
      },
      {
        id: 'tom-hl-2',
        title: 'Harvest & Remove Pierced Fruits',
        description: 'Handpick and discard all hail-punctured and cracked fruits immediately. Pierced fruits rot quickly and serve as breeding grounds for fruit flies and fungal spores.',
        timeframe: 'Day 2–3',
        completionCriteria: 'All punctured and rotting fruits picked and buried outside plot.'
      },
      {
        id: 'tom-hl-3',
        title: 'Pruning Crushed Vines & Re-tying Stems',
        description: 'Cleanly snip off crushed or dangling vine tips with sanitized shears just above the nearest healthy node. Re-tie surviving vines securely to the trellis wire.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Crushed tissues trimmed; vines re-tied to trellis.'
      },
      {
        id: 'tom-hl-4',
        title: 'Growth Hormone & Energy Induction Spray',
        description: 'Spray 12:61:00 (5 g/L) + Brassinolide (0.5 ml/L) or GA3 (10 ppm) to trigger dormant axillary buds at uninjured nodes into rapid secondary vegetative flushes.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Bud swell visible at axils of trimmed stems.'
      },
      {
        id: 'tom-hl-5',
        title: 'Secondary Flowering & Fruit Nutrition',
        description: 'Spray 00:52:34 (5 g/L) + Boron (1 g/L) to stimulate a vigorous second flush of flowers and assist surviving uninjured fruits to size up.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Fresh flower clusters appearing at newly sprouted axils.'
      }
    ],
    precautions: [
      'Do not uproot hail-damaged tomato vines if lower stem nodes are healthy; indeterminate varieties regenerate a dense fruiting canopy within 2-3 weeks.',
      'Avoid heavy nitrogen application immediately after hail; soft succulent shoots invite severe late blight.'
    ],
    recoveryTimeline: [
      'Day 1–2: Wound disinfection spray within 24 hours.',
      'Day 2–4: Pierced fruit removal, pruning, and trellis re-tying.',
      'Day 4–7: Bio-stimulant spray and dormant bud activation.',
      'Week 3–4: Canopy re-closure and secondary fruit setting.'
    ],
    recoveryIndicators: [
      'Wounds on stems callous over with dry scar tissue without rot.',
      'Vigorous emergence of healthy green lateral shoots from lower nodes.',
      'Abundant new flower cluster initiation.',
      'Unbroken fruits continue sizing up normally.'
    ],
    escalationGuidance: [
      'If hail destroyed more than 75% of fruit load near harvest, request an emergency joint Panchanama by Revenue, Agriculture, and Insurance surveyors within 72 hours.',
      'Consult KVK on pest management during secondary canopy regeneration.'
    ]
  },

  tomato__strong_winds: {
    cropId: 'tomato',
    cropName: 'Tomato',
    calamityType: 'HIGH_VELOCITY_WINDS',
    calamityName: 'High Velocity Winds / Storm',
    damageOverview:
      'Squall winds cause collapse of bamboo trellises and wire staking systems, snapping heavy fruit-laden tomato vines, uprooting plants from raised beds, and causing severe fruit drop and abrasion.',
    inspectionChecklist: [
      'Inspect trellis infrastructure: check for snapped bamboo poles, broken wire, or pulled anchor pegs.',
      'Assess percentage of collapsed or leaning tomato vines.',
      'Check whether main stems are snapped at the base or merely bent.',
      'Inspect fruit clusters: check for contact with wet soil and abrasion scars.',
      'Count dropped fruits beneath the canopy.'
    ],
    steps: [
      {
        id: 'tom-sw-1',
        title: 'Re-erect & Anchor Trellis Poles',
        description: 'Immediately drive support bamboo poles firmly into the ground, replace broken cross-wires, and re-anchor end pegs with heavy stone or anchor pins.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Trellis infrastructure stabilized and tensioned.'
      },
      {
        id: 'tom-sw-2',
        title: 'Gently Lift & Re-tie Fallen Vines',
        description: 'Carefully lift fallen tomato vines from the ground and tie them with soft jute twine to the trellis wire. Avoid twisting or bending brittle stems.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Vines elevated off the ground and tied securely to wires.'
      },
      {
        id: 'tom-sw-3',
        title: 'Collect Fallen Fruits & Clear Ground',
        description: 'Collect all fallen mature and green fruits from the ground to prevent fruit flies and fungal rot from multiplying beneath the canopy.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Ground beneath beds cleared of fallen fruits.'
      },
      {
        id: 'tom-sw-4',
        title: 'Anti-Stress Potassium & Boron Foliar Spray',
        description: 'Spray 00:00:50 (Potassium Sulphate @ 5 g/L) + Boron (1 g/L) to strengthen stem vascular bundles and relieve mechanical stress on disturbed root systems.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Foliar spray applied; vine turgor restored.'
      }
    ],
    precautions: [
      'Do not jerk or violently pull collapsed vines; brittle fruit-bearing branches snap easily.',
      'Do not leave vines lying on wet soil for more than 48 hours; fruit rot will ruin the crop.'
    ],
    recoveryTimeline: [
      'Day 1–2: Trellis re-erection and anchoring.',
      'Day 2–4: Vine re-tying and fallen fruit clearance.',
      'Day 4–7: Anti-stress foliar feeding.',
      'Week 2–3: Canopy stabilization and continued fruit ripening.'
    ],
    recoveryIndicators: [
      'Vines supported firmly on trellis wires without sagging.',
      'Leaves oriented upright toward the sun.',
      'Fruit clusters hanging freely without touching soil.',
      'Absence of fruit rot on surviving clusters.'
    ],
    escalationGuidance: [
      'Contact the local Agriculture Officer if storm damage accompanied cyclonic gale winds requiring disaster relief.',
      'Consult KVK horticulture specialists on heavy-duty trellis design for storm-prone pockets.'
    ]
  },

  tomato__drought: {
    cropId: 'tomato',
    cropName: 'Tomato',
    calamityType: 'DROUGHT',
    calamityName: 'Drought / Dry Spell',
    damageOverview:
      'Severe moisture stress causes extensive flower drop, blossom end rot (BER - calcium deficiency causing sunken black leathery rot on fruit bottoms), leaf rolling, fruit cracking when watered, and heavy whitefly / mite outbreaks.',
    inspectionChecklist: [
      'Check soil moisture in the drip wetting zone.',
      'Inspect fruit bottoms (blossom end) for flat, sunken, black leathery patches (Blossom End Rot).',
      'Examine leaf rolling index during morning and afternoon.',
      'Inspect flower trusses: count percentage of dried, yellowed, or dropped blossoms.',
      'Check leaf undersides for whitefly adults and fine spider mite webbing.'
    ],
    steps: [
      {
        id: 'tom-dr-1',
        title: 'Maintain Consistent Drip Irrigation Scheduling',
        description: 'Operate drip systems in short, frequent cycles (e.g. 1 hour twice daily) rather than one heavy cycle. Consistent soil moisture is essential to maintain calcium transport and prevent BER.',
        timeframe: 'Immediate',
        completionCriteria: 'Root zone maintained with uniform moisture without drying cycles.'
      },
      {
        id: 'tom-dr-2',
        title: 'Foliar Calcium Nitrate + Boron Spray (BER Prevention)',
        description: 'Immediately spray Calcium Nitrate (5 g/L) + Boron (1 g/L) directly over developing fruit clusters. Calcium cannot move through xylem under drought; direct foliar application stops Blossom End Rot.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Fruit clusters coated with calcium solution; BER progression halted.'
      },
      {
        id: 'tom-dr-3',
        title: 'Organic / Plastic Mulching on Raised Beds',
        description: 'Ensure beds are covered with silver-black plastic mulch or thick straw mulch to lower soil temperature and conserve root zone moisture.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Bed surface shaded with mulch; evaporation minimized.'
      },
      {
        id: 'tom-dr-4',
        title: 'Anti-Stress Osmoprotectant Foliar Feed',
        description: 'Spray 1% Potassium Nitrate (13:00:45 @ 10 g/L) across the canopy to maintain cell turgidity and reduce daytime leaf rolling.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Canopy sprayed thoroughly in early morning.'
      },
      {
        id: 'tom-dr-5',
        title: 'Whitefly & Red Spider Mite Management',
        description: 'Drought triggers whiteflies and spider mites. Spray Diafenthiuron 50 WP (1.2 g/L) or Spiromesifen 22.9 SC (1 ml/L) targeting leaf undersides.',
        timeframe: 'Day 6–8',
        completionCriteria: 'Mite and whitefly populations suppressed below economic threshold.'
      }
    ],
    precautions: [
      'Never apply sudden heavy flood irrigation after a dry spell; rapid water uptake causes 80% of developing fruits to crack radially.',
      'Do not apply solid urea during severe drought; it worsens calcium deficiency and burns leaf margins.'
    ],
    recoveryTimeline: [
      'Day 1–2: Drip optimization and foliar calcium spray.',
      'Day 2–4: Mulching and moisture conservation.',
      'Day 5–8: Osmoprotectant spray and sucking pest control.',
      'Week 2–3: Smooth fruit expansion without Blossom End Rot.'
    ],
    recoveryIndicators: [
      'Leaves remain flat and open through midday without rolling.',
      'New developing fruits free of black sunken blossom end rot.',
      'Flower trusses set fruit successfully without dropping.',
      'Absence of fruit cracking around the stem scar.'
    ],
    escalationGuidance: [
      'If water stress causes Blossom End Rot on more than 40% of developing fruits, consult KVK on drip fertigation calcium balancing.',
      'Report drought loss to the Agriculture Officer for PMFBY distress survey.'
    ]
  },

  tomato__pest_attack: {
    cropId: 'tomato',
    cropName: 'Tomato',
    calamityType: 'PEST_DISEASE',
    calamityName: 'Severe Pest / Disease Infestation',
    damageOverview:
      'Catastrophic outbreak of Tomato Leaf Miner / Pinworm (Tuta absoluta - blotch mines on leaves and boring into fruit), Fruit Borer (Helicoverpa armigera), Tomato Leaf Curl Virus (ToLCV - transmitted by whitefly, causing curling, stunting, and bushy sterile growth), Early/Late Blight, or Bacterial Canker.',
    inspectionChecklist: [
      'Inspect leaves for transparent blotch mines with dark frass grains inside (Tuta absoluta).',
      'Check green and red fruits for pinhole boreholes under the calyx and rotting pericarp.',
      'Examine young leaves for upward/downward curling, crinkling, and severe stunting (Leaf Curl Virus).',
      'Check for whitefly adults fluttering around terminal shoots (ToLCV vector).',
      'Look for concentric brown rings with yellow halo on lower leaves (Early Blight).'
    ],
    steps: [
      {
        id: 'tom-pt-1',
        title: 'Install Pheromone Traps for Tuta & Helicoverpa',
        description: 'Install 8-10 Tuta absoluta pheromone water traps per acre and 5 Helicoverpa traps per acre for mass trapping and population monitoring.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Traps installed at crop canopy level; heavy moth catch confirmed.',
        isImmediateSafety: false
      },
      {
        id: 'tom-pt-2',
        title: 'Rogue & Destroy Virus-Infected Plants',
        description: 'Carefully uproot and bag plants showing severe Tomato Leaf Curl Virus (ToLCV) symptoms. Virus-infected plants produce zero marketable yield and act as viral reservoirs.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Stunted virus-infected plants culled and buried outside plot.'
      },
      {
        id: 'tom-pt-3',
        title: 'Targeted Insecticide Spray for Tuta & Borers',
        description: 'Spray Chlorantraniliprole 18.5 SC (0.3 ml/L) or Spinetoram 11.7 SC (1 ml/L) or Flubendiamide (0.3 ml/L) targeting both leaf surfaces and fruit clusters.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Complete canopy coverage in late afternoon; larval mortality confirmed.'
      },
      {
        id: 'tom-pt-4',
        title: 'Whitefly Vector Containment Spray',
        description: 'To stop further spread of Leaf Curl Virus, spray Cyantraniliprole 10.26 OD (1.8 ml/L) or Afidopyropen 50 g/L (2 ml/L) targeting leaf undersides.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Whitefly counts reduced below 2 per plant.'
      },
      {
        id: 'tom-pt-5',
        title: 'Foliar Restorative Nutrition',
        description: 'Spray 19:19:19 (5 g/L) + Micronutrient mixture (2 g/L) 5 days after pest containment to stimulate rapid regrowth of healthy photosynthetic foliage.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Canopy sprayed; vigorous emergence of clean new leaves and flower trusses.'
      }
    ],
    precautions: [
      'Do not apply synthetic pyrethroids repeatedly; they destroy beneficial parasitoids and cause explosive Tuta and red spider mite resurgence.',
      'Always follow Pre-Harvest Interval (PHI) guidelines before harvesting tomatoes for market.'
    ],
    recoveryTimeline: [
      'Day 1–2: Trap installation and rogueing of virus plants.',
      'Day 2–5: Targeted borer and whitefly vector sprays.',
      'Day 6–8: Larval mortality assessment.',
      'Week 2–3: Canopy regeneration with foliar nutrients.'
    ],
    recoveryIndicators: [
      'Complete larval mortality in blotch mines.',
      'Absence of fresh boreholes under fruit calyxes.',
      'Whitefly populations suppressed below economic threshold.',
      'New terminal shoots emerge with broad, flat, green leaves free of curling.'
    ],
    escalationGuidance: [
      'If Tuta absoluta infestation exceeds 20% fruit damage despite recommended sprays, immediately alert the District Agricultural Officer and KVK entomologist.',
      'Report any suspected spurious pesticide batch with invoice to the Krishi Seva Kendra.'
    ]
  },

  tomato__unseasonal_rain: {
    cropId: 'tomato',
    cropName: 'Tomato',
    calamityType: 'UNSEASONAL_WEATHER',
    calamityName: 'Unseasonal Weather Event',
    damageOverview:
      'Unseasonal rain during peak harvesting (October-November or March-April) causes catastrophic fruit cracking (radial and concentric skin splitting), explosive Late Blight, bacterial soft rot on mature fruits, and price collapse in vegetable markets.',
    inspectionChecklist: [
      'Check maturity of fruits (green mature vs breaker stage vs ripe red).',
      'Inspect fruits for sudden skin cracking or watery rot around the stem scar.',
      'Check for Late Blight lesions (brown oily patches on fruit surface).',
      'Examine raised beds for standing water in furrows.',
      'Determine percentage of cracked vs intact marketable fruits.'
    ],
    steps: [
      {
        id: 'tom-ur-1',
        title: 'Priority Harvest of Breaker & Mature Green Fruits',
        description: 'Immediately harvest all fruits at the breaker stage (showing first blush of color) and mature green stage. Do not allow ripe fruits to stay on the vine in rainy weather; skin will crack within hours.',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'Breaker and mature fruits harvested and moved to packing shed.',
        isImmediateSafety: false
      },
      {
        id: 'tom-ur-2',
        title: 'Drain Inter-bed Furrows Immediately',
        description: 'Cut furrow exits to evacuate all rain water from raised beds. Water absorption through roots causes internal turgor pressure that splits tomato skins.',
        timeframe: 'First 24 hours',
        completionCriteria: 'All standing water removed from furrows.'
      },
      {
        id: 'tom-ur-3',
        title: 'Sort & Segregate Cracked Fruits',
        description: 'Carefully sort harvested fruits; segregate split fruits for immediate local sale or processing. Never pack cracked fruits with whole fruits in shipping crates.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Cracked fruits segregated from intact Grade-A fruits.'
      },
      {
        id: 'tom-ur-4',
        title: 'Late Blight Preventative Spray for Retained Vines',
        description: 'Spray Dimethomorph 50% WP (1 g/L) + Mancozeb (2 g/L) across the vines to protect remaining green fruits from late blight and fruit rot.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Standing crop sprayed; green fruits protected.'
      },
      {
        id: 'tom-ur-5',
        title: 'Foliar Calcium & Potassium Silicate Spray',
        description: 'Spray Calcium Nitrate (5 g/L) + Potassium Silicate (2 ml/L) to strengthen fruit cuticle elasticity and prevent further cracking on developing green fruits.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Cuticle elasticity improved; no further splitting.'
      }
    ],
    precautions: [
      'Never pack wet or damp tomatoes into plastic crates or cardboard cartons; wipe fruits with clean dry cloth before grading.',
      'Do not allow harvested tomatoes to sit in direct sunlight after rain; rapid heating accelerates decay.'
    ],
    recoveryTimeline: [
      'Day 1–2: Priority harvest of breaker fruits and furrow drainage.',
      'Day 2–4: Fruit segregation and late blight protective spray.',
      'Day 4–7: Foliar calcium and cuticle strengthening spray.',
      'Week 2: Safe market dispatch and harvest of remaining crop.'
    ],
    recoveryIndicators: [
      'Harvested fruits clean, dry, and free of skin cracks.',
      'Zero secondary fruit cracking on standing green fruits.',
      'Absence of Late Blight rot on retained fruit clusters.',
      'Grade-A quality preserved for market realization.'
    ],
    escalationGuidance: [
      'File an intimation within 72 hours under PMFBY horticulture post-harvest provisions if harvested tomatoes were damaged in the field.',
      'Contact local APMC market representatives for expedited grading and market dispatch.'
    ]
  },

  tomato__other: {
    cropId: 'tomato',
    cropName: 'Tomato',
    calamityType: 'OTHER',
    calamityName: 'Other Calamity',
    damageOverview:
      'Unforeseen events such as severe root knot nematode infestation (Meloidogyne incognita causing root galls, stunting, and midday wilting), herbicide drift (e.g. 2,4-D or glyphosate from neighbouring fields causing leaf strapping and epinasty), localized salinity patches, or stray cattle grazing.',
    inspectionChecklist: [
      'Gently excavate feeder roots and check for bead-like knots / root galls (Nematodes).',
      'Check leaf deformation patterns (cupping / strap leaves / curling from herbicide drift).',
      'Examine leaf margins for white necrotic salt scorch (Salinity).',
      'Assess damage perimeter and map affected bed area.',
      'Document evidence with date-stamped photographs.'
    ],
    steps: [
      {
        id: 'tom-ot-1',
        title: 'Identify Calamity Source & Prevent Recurrence',
        description: 'Identify the exact cause. For herbicide drift, document wind direction. For stray cattle, repair field perimeter fencing immediately.',
        timeframe: 'Day 1',
        completionCriteria: 'Cause identified; physical perimeter secured.',
        isImmediateSafety: true
      },
      {
        id: 'tom-ot-2',
        title: 'Biological Nematicide Drenching (For Nematodes)',
        description: 'If root knot nematodes are present, drench beds with Paecilomyces lilacinus (2 kg/acre enriched in FYM) or Fluopyram 34.48 SC (Velum Prime @ 2 ml/bed) through drip.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Nematicide incorporated into root zone; root gall proliferation halted.'
      },
      {
        id: 'tom-ot-3',
        title: 'Foliar Neutralizing Spray for Chemical Drift',
        description: 'If weedicide drift occurred, spray 1% Urea + 0.5% Zinc Sulphate + Humic acid (2 ml/L) across the canopy to help plants metabolize chemical toxins.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Foliar spray applied; toxicity symptoms arrested.'
      },
      {
        id: 'tom-ot-4',
        title: 'Foliar 19:19:19 & Micronutrient Boost',
        description: 'Apply water-soluble 19:19:19 (5 g/L) + Micronutrients (2 g/L) every 7-10 days until affected vines regain normal vegetative growth.',
        timeframe: 'Day 5–10',
        completionCriteria: 'Canopy sprayed; healthy new leaves and flower trusses emerging.'
      }
    ],
    precautions: [
      'Do not apply additional weedicides to stressed or chemically injured tomato plants.',
      'Avoid walking repeatedly over raised beds while wet.'
    ],
    recoveryTimeline: [
      'Day 1–3: Diagnosis, perimeter securing, and nematicide application.',
      'Day 4–7: Foliar neutralization and bio-stimulant spray.',
      'Week 2: Foliar nutrition and secondary vine growth.',
      'Week 3–4: Resumption of normal flowering and fruit set.'
    ],
    recoveryIndicators: [
      'New leaves emerge upright with healthy green morphology without strapping.',
      'Feeder roots develop clean white root hairs without galls.',
      'Normal flower cluster emergence and fruit set.'
    ],
    escalationGuidance: [
      'For severe nematode or salinity problems, submit root and soil samples to the nearest KVK laboratory for diagnostic analysis.',
      'Report herbicide drift or cattle damage to the Taluka Agriculture Officer for formal compensation.'
    ]
  }
};

