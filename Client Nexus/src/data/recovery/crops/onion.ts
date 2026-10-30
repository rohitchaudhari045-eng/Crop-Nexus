import { CropRecoveryPlan } from '../types';

export const onionPlans: Record<string, CropRecoveryPlan> = {
  onion__heavy_rainfall: {
    cropId: 'onion',
    cropName: 'Onion (Pyaz)',
    calamityType: 'HEAVY_RAINFALL',
    calamityName: 'Excessive / Heavy Rainfall',
    damageOverview:
      'Onion has a shallow fibrous root system and cannot tolerate water stagnation. Waterlogging for more than 24-36 hours causes rapid bulb rotting, basal plate decay (Fusarium oxysporum), root dieback, severe purple blotch, and collar rot in flat beds.',
    inspectionChecklist: [
      'Check water levels between raised beds or flat beds.',
      'Gently pull 5 plants and inspect basal plates: look for pink/purple discoloration or soft watery decay.',
      'Check fibrous roots: healthy roots are white; decaying roots are translucent, brown, or mushy.',
      'Inspect tubular leaves for water-soaked purple lesions with yellow halos (Purple Blotch).',
      'Assess bulb firmness by squeezing gently at the neck.'
    ],
    steps: [
      {
        id: 'on-hr-1',
        title: 'Emergency Trench Drainage between Beds',
        description: 'Immediately deepen inter-bed furrows and cut drainage channels to drain all standing water off beds within 12 hours. Convert flat beds to raised beds where possible.',
        timeframe: 'First 12–24 hours',
        completionCriteria: 'All water drained from bed furrows; no standing water around bulb bases.',
        isImmediateSafety: true
      },
      {
        id: 'on-hr-2',
        title: 'Basal Rot & Damping-off Drenching',
        description: 'Drench the beds or spray around plant bases with Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ @ 2.5 g/L) or Carbendazim + Mancozeb (2 g/L) to halt basal plate decay.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Soil around bulbs and roots drenched with fungicide solution.'
      },
      {
        id: 'on-hr-3',
        title: 'Purple Blotch & Stemphylium Foliar Spray',
        description: 'Spray Tebuconazole 25.9 EC (1 ml/L) or Difenoconazole 25 EC (1 ml/L) + agricultural sticker (0.5 ml/L) to prevent purple blotch on moisture-laden foliage.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Tubular leaves coated with fungicide film; sticker ensures adhesion.'
      },
      {
        id: 'on-hr-4',
        title: 'Light Aeration & Sulfur Application',
        description: 'Once bed soil is workable, perform light shallow weeding with a khurpi to break the soil crust, and apply Bensulf (agricultural sulfur @ 10 kg/acre) to disinfect soil and improve bulb firmness.',
        timeframe: 'Day 5–7',
        completionCriteria: 'Bed surface loosened; sulfur incorporated into root zone.'
      },
      {
        id: 'on-hr-5',
        title: 'Foliar Restorative Feed for Bulb Expansion',
        description: 'Spray water-soluble 19:19:19 (5 g/L) + Micronutrient mixture (2 g/L) to revive photosynthetic activity in recovering leaves.',
        timeframe: 'Day 8–12',
        completionCriteria: 'Canopy greenness restored; renewed leaf emergence.'
      }
    ],
    precautions: [
      'Never apply high-dose granular nitrogen (urea) while bed soil is wet; it causes bulb soft rot and thick necks (bolting).',
      'Always add a sticking agent (spreader/sticker) when spraying onion foliage, as wax on tubular leaves causes spray droplets to bounce off.'
    ],
    recoveryTimeline: [
      'Day 1–2: Complete bed drainage and basal rot drenching.',
      'Day 3–5: Purple blotch foliar spray with sticker.',
      'Day 6–8: Soil crust aeration and sulfur application.',
      'Week 2–3: Foliar nutrition and active bulb enlargement.'
    ],
    recoveryIndicators: [
      'Bulbs remain firm and white/red at the neck without soft mushiness.',
      'Absence of purple/brown spreading lesions on tubular leaves.',
      'Emergence of new, erect, waxy green tubular leaves.',
      'Development of fresh white fibrous roots from the basal plate.'
    ],
    escalationGuidance: [
      'If basal rot destroys more than 30% of bulbs, consult the Taluka Krishi Adhikari for crop damage Panchanama.',
      'Consult ICAR-DOGR Rajgurunagar (Directorate of Onion and Garlic Research) for specialized disease advisories.'
    ]
  },

  onion__flooding: {
    cropId: 'onion',
    cropName: 'Onion (Pyaz)',
    calamityType: 'FLOODING',
    calamityName: 'River / Canal Flooding',
    damageOverview:
      'River or canal flooding completely inundates onion beds, burying bulbs and foliage under silt mud, drowning the root system, and causing near-total bulb rotting within 48 hours.',
    inspectionChecklist: [
      'Determine hours of complete submergence under flood water.',
      'Check whether bulbs are mushy, rotten, or foul-smelling.',
      'Examine the depth of silt clay deposited over raised beds.',
      'Count surviving healthy plants per square meter (aim for 35-40 plants/sq.m).',
      'Check for bacterial soft rot (Erwinia carotovora) with foul odor.'
    ],
    steps: [
      {
        id: 'on-fl-1',
        title: 'Drain Inundation & Clear Bed Outlets',
        description: 'Cut exit ditches through field bunds to completely discharge flood water. Lower the water level below raised bed root zones immediately.',
        timeframe: 'Day 1–2',
        completionCriteria: 'All flood water drained; bed surfaces exposed.',
        isImmediateSafety: true
      },
      {
        id: 'on-fl-2',
        title: 'Foliar Silt Washing with Clean Water',
        description: 'Gently spray clean water over silt-covered onion foliage using a knapsack sprayer to rinse away mud before it bakes into a hard crust.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Foliage cleared of mud coating; stomata exposed.'
      },
      {
        id: 'on-fl-3',
        title: 'Sanitation: Remove Rotten Decomposing Bulbs',
        description: 'Walk through beds and carefully pull out and discard all mushy, rotting bulbs to prevent bacterial soft rot from spreading to healthy neighbors.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Decomposing bulbs removed in buckets and buried outside plot.'
      },
      {
        id: 'on-fl-4',
        title: 'Bactericide & Fungicide Protection Spray',
        description: 'Spray Copper Oxychloride 50 WP (2.5 g/L) + Streptocycline (1 g per 10 L) + sticker (0.5 ml/L) across all beds to halt bacterial and fungal rot.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Complete bed canopy coated with protective spray.'
      },
      {
        id: 'on-fl-5',
        title: 'Foliar 19:19:19 & Humic Acid Resuscitation',
        description: 'Spray 19:19:19 (5 g/L) + Humic acid (2 ml/L) to nourish plants whose root systems have been damaged by flood submergence.',
        timeframe: 'Day 6–8',
        completionCriteria: 'Foliar spray absorbed; leaves showing renewed turgor.'
      }
    ],
    precautions: [
      'Do not allow wet silt to bake into a solid concrete crust over onion bulbs.',
      'Never leave mushy rotting bulbs in the field; they release millions of bacterial soft rot cells.'
    ],
    recoveryTimeline: [
      'Day 1–3: Drainage, silt washing, and rotten bulb removal.',
      'Day 4–7: Antibacterial-fungicide spray and foliar feeding.',
      'Week 2: Soil crust breaking and root recovery.',
      'Week 3–4: Resumption of bulb development in surviving plants.'
    ],
    recoveryIndicators: [
      'Bright green tubular leaves pushing through washed collars.',
      'New white feeder roots growing from the basal plate.',
      'Absence of foul-smelling bacterial decay.',
      'Firm bulb texture.'
    ],
    escalationGuidance: [
      'If surviving plant population drops below 20 plants/sq.m, consult KVK for resowing or alternative vegetable relay crops.',
      'Report complete flood loss for disaster relief assessment.'
    ]
  },

  onion__hailstorm: {
    cropId: 'onion',
    cropName: 'Onion (Pyaz)',
    calamityType: 'HAILSTORM',
    calamityName: 'Severe Hailstorm',
    damageOverview:
      'Hail impact punctures and shatters tubular onion leaves, breaks neck tissues, bruises exposed bulb shoulders, and knocks over seed stalks (umbels) in seed crops, inviting devastating Purple Blotch.',
    inspectionChecklist: [
      'Assess defoliation percentage and leaf blade shattering.',
      'Check whether the neck region is intact or bruised and severed.',
      'Inspect exposed bulb shoulders for puncture marks and watery bruises.',
      'Check seed crops: determine percentage of broken or shattered seed umbels.',
      'Examine leaf wounds for early purple blotch or stemphylium infection.'
    ],
    steps: [
      {
        id: 'on-hl-1',
        title: 'Immediate Antiseptic Fungicide Spray with Sticker',
        description: 'Within 24-48 hours, spray Mancozeb 75 WP (2.5 g/L) + Copper Oxychloride (2 g/L) + agricultural sticker (0.5 ml/L) to sterilize puncture wounds and shattered leaf tissues.',
        timeframe: 'First 24–48 hours',
        completionCriteria: 'All wounded leaves and bulb shoulders coated with protective fungicide.',
        isImmediateSafety: false
      },
      {
        id: 'on-hl-2',
        title: 'Clean Removal of Severely Crushed Leaves',
        description: 'Gently snip off completely crushed or hanging leaf tips with sanitized shears to prevent saprophytic mold from traveling downward into the neck.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Crushed rotting tissues trimmed cleanly.'
      },
      {
        id: 'on-hl-3',
        title: 'Growth Hormone & Energy Induction Spray',
        description: 'Spray 12:61:00 (5 g/L) along with Brassinolide (0.5 ml/L) to stimulate rapid emergence of new tubular leaves from the central growing point.',
        timeframe: 'Day 4–6',
        completionCriteria: 'New leaf tips emerging from the central neck.'
      },
      {
        id: 'on-hl-4',
        title: 'Bulb Hardening Nutrition Spray',
        description: 'If crop is in bulb development stage, spray 00:52:34 (5 g/L) + Boron (1 g/L) to heal bulb shoulders and promote firm skin formation.',
        timeframe: 'Day 7–10',
        completionCriteria: 'Bulb shoulders forming firm protective scales.'
      }
    ],
    precautions: [
      'Do not apply heavy urea after hail; excess nitrogen causes neck rotting and poor bulb storage quality.',
      'Always use a quality non-ionic sticker with all sprays on onion.'
    ],
    recoveryTimeline: [
      'Day 1–2: Wound disinfection spray with sticker.',
      'Day 3–5: Clean trimming of crushed leaves and bio-stimulant spray.',
      'Day 6–10: New leaf emergence and bulb nutrition.',
      'Week 3–4: Canopy re-growth and bulb expansion.'
    ],
    recoveryIndicators: [
      'Wounds on tubular leaves dry out and form white/brown calluses.',
      'Vigorous emergence of fresh, upright green tubular leaves.',
      'Bulbs remain firm without rotting at the neck.',
      'Healthy bulb scale development.'
    ],
    escalationGuidance: [
      'If hail struck during bulb maturity and caused extensive neck splitting, harvest mature bulbs within 7-10 days for immediate local market sale rather than storage.',
      'Request revenue-agriculture Panchanama for hailstorm compensation.'
    ]
  },

  onion__strong_winds: {
    cropId: 'onion',
    cropName: 'Onion (Pyaz)',
    calamityType: 'HIGH_VELOCITY_WINDS',
    calamityName: 'High Velocity Winds / Storm',
    damageOverview:
      'Gale winds cause lodging of onion seed stalks (umbels) in seed crops, bending of tubular leaves, soil erosion exposing bulb roots, and mechanical damage to foliar wax.',
    inspectionChecklist: [
      'For bulb crop: check whether tubular leaves are bent or severed at the neck.',
      'For seed crop: assess percentage of lodged or snapped seed stalks (umbels).',
      'Inspect bulbs: determine whether topsoil has blown away, exposing fibrous roots.',
      'Check for sand-blasting injury on leaf surfaces.',
      'Assess pollination in seed crops post-storm.'
    ],
    steps: [
      {
        id: 'on-sw-1',
        title: 'Staking & Twine Support for Seed Crops',
        description: 'In onion seed production plots, immediately install wooden/bamboo pegs along rows and run 2 tiers of jute twine to support and prop lodged seed stalks upright.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Seed stalks held upright between twine lines; umbels elevated.'
      },
      {
        id: 'on-sw-2',
        title: 'Earthing Up Exposed Bulbs',
        description: 'Where wind has eroded topsoil, gently mound loose soil around bulb shoulders to protect roots and bulbs from sunscald and greening.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Exposed bulb shoulders covered with loose soil.'
      },
      {
        id: 'on-sw-3',
        title: 'Protective Fungicide Spray against Blight',
        description: 'Wind damages the protective leaf wax. Spray Mancozeb 75 WP (2.5 g/L) + sticker (0.5 ml/L) to prevent fungal spores from infecting sand-blasted foliage.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Canopy wetted with protective fungicide.'
      },
      {
        id: 'on-sw-4',
        title: 'Light Sprinkler / Drip Irrigation',
        description: 'Apply a light irrigation to settle the disturbed soil around bulb bases and relieve plant transpiration stress.',
        timeframe: 'Day 5–6',
        completionCriteria: 'Soil settled firmly around bulb bases.'
      }
    ],
    precautions: [
      'Do not bend or force brittle lodged seed stalks when soil is dry, as they snap easily.',
      'Do not allow exposed bulbs to remain in direct sunlight; greening and sunscald ruin market value.'
    ],
    recoveryTimeline: [
      'Day 1–2: Staking seed stalks and earthing up exposed bulbs.',
      'Day 3–5: Protective fungicide spray and light irrigation.',
      'Day 6–10: Seed umbel stabilization and pollination recovery.',
      'Week 2–3: Normal bulb expansion and seed filling.'
    ],
    recoveryIndicators: [
      'Tubular leaves stand upright; seed stalks supported firmly.',
      'Bulbs covered with soil without greening.',
      'Absence of purple blotch on wind-damaged leaves.',
      'Healthy seed development in umbels.'
    ],
    escalationGuidance: [
      'If storm winds snapped more than 40% of seed stalks in registered seed plots, contact the Maharashtra State Seed Corporation (Mahabeej) field inspector.',
      'Notify the revenue authority if storm accompanied severe localized damage.'
    ]
  },

  onion__drought: {
    cropId: 'onion',
    cropName: 'Onion (Pyaz)',
    calamityType: 'DROUGHT',
    calamityName: 'Drought / Dry Spell',
    damageOverview:
      'Moisture stress during bulb initiation and development causes bulb splitting (doubling), premature bolting (flowering in bulb crop), undersized bulbs, thick necks, and explosive thrips outbreaks.',
    inspectionChecklist: [
      'Check soil moisture in the top 10 cm root zone.',
      'Inspect leaf tips for dry white/brown dieback.',
      'Check for silvery patches and black fecal spots on leaf undersides (Thrips tabaci).',
      'Examine developing bulbs: check percentage of split/double bulbs or early bolting.',
      'Assess bulb firmness.'
    ],
    steps: [
      {
        id: 'on-dr-1',
        title: 'Frequent Light Micro-Irrigation (Drip / Micro-Sprinkler)',
        description: 'Apply light, frequent irrigations at 3-4 day intervals rather than heavy flood irrigation. Onion roots are very shallow and cannot tap deep moisture.',
        timeframe: 'Immediate',
        completionCriteria: 'Top 15 cm soil maintained with uniform moisture without flooding.'
      },
      {
        id: 'on-dr-2',
        title: 'Targeted Thrips Knockdown Spray',
        description: 'Drought triggers massive thrips explosions. Spray Fipronil 5 SC (1.5 ml/L) or Spinetoram 11.7 SC (1 ml/L) + sticker (0.5 ml/L) directed deep into the leaf axils.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Thrips count reduced below 5 per plant; silvery patches halted.'
      },
      {
        id: 'on-dr-3',
        title: 'Foliar Osmoprotectant & Potassium Spray',
        description: 'Spray 1% Potassium Nitrate (13:00:45 @ 10 g/L) + Boron (1 g/L) to maintain cell turgor and prevent bulb cracking during dry spells.',
        timeframe: 'Day 4–6',
        completionCriteria: 'Canopy sprayed thoroughly in early morning.'
      },
      {
        id: 'on-dr-4',
        title: 'Remove Bolters (Flower Stalks in Bulb Crop)',
        description: 'If water stress triggers bolting (seed stalks in bulb crop), immediately snap off flower heads by hand to divert energy back into bulb enlargement.',
        timeframe: 'Day 6–8',
        completionCriteria: 'Bolter flower stalks snapped off across all beds.'
      }
    ],
    precautions: [
      'Never give heavy flood irrigation after a long dry spell; sudden heavy watering causes massive bulb splitting and cracking.',
      'Do not apply solid urea during severe drought; it burns leaf tips.'
    ],
    recoveryTimeline: [
      'Day 1–2: Frequent light micro-irrigation and thrips knockdown.',
      'Day 3–5: Foliar potassium spray and bolter removal.',
      'Day 6–10: Moisture stabilization and thrips scouting.',
      'Week 2–3: Uniform bulb expansion without splitting.'
    ],
    recoveryIndicators: [
      'Tubular leaves remain upright, waxy, and free of silvery thrips streaks.',
      'Bulbs expand smoothly without splitting into doubles.',
      'Absence of new bolter flower stalks.',
      'Firm, solid bulb development.'
    ],
    escalationGuidance: [
      'If water stress causes bulb splitting on more than 40% of the crop, consult the APMC market representative regarding early marketing strategies.',
      'Contact KVK on drip fertigation schedules for water-stressed onions.'
    ]
  },

  onion__pest_attack: {
    cropId: 'onion',
    cropName: 'Onion (Pyaz)',
    calamityType: 'PEST_DISEASE',
    calamityName: 'Severe Pest / Disease Infestation',
    damageOverview:
      'Severe outbreak of Onion Thrips (Thrips tabaci - causing silvery streaks and leaf curling), Purple Blotch (Alternaria porri - concentric purple lesions with yellow halo), Stemphylium Blight, Basal Rot (Fusarium), or Colletotrichum twister disease.',
    inspectionChecklist: [
      'Examine leaf axils and inner whorls for yellow/brown thrips nymphs and adults (ETL: 15-20 thrips/plant).',
      'Check tubular leaves for dark purple, sunken, oval lesions with concentric rings (Purple Blotch).',
      'Look for curling, twisting, and abnormal elongation of neck and leaves ("Twister" disease).',
      'Inspect basal plate for white/pink mycelium and rotting roots (Basal Rot).',
      'Assess percentage of blighted leaves across the field.'
    ],
    steps: [
      {
        id: 'on-pt-1',
        title: 'Install Blue / Yellow Sticky Traps',
        description: 'Install 20-25 yellow and blue sticky traps per acre at crop height for mass trapping and monitoring of thrips populations.',
        timeframe: 'Day 1–2',
        completionCriteria: 'Sticky traps installed across all beds; high thrips catch visible.',
        isImmediateSafety: false
      },
      {
        id: 'on-pt-2',
        title: 'Targeted Thrips Knockdown Spray with Sticker',
        description: 'Spray Profenophos 50 EC (2 ml/L) or Fipronil 5 SC (1.5 ml/L) + non-ionic agricultural sticker (0.5 ml/L) directed deep into leaf axils.',
        timeframe: 'Day 2–3',
        completionCriteria: 'Axils thoroughly wetted; rapid thrips mortality confirmed.'
      },
      {
        id: 'on-pt-3',
        title: 'Systemic Fungicide Spray for Purple Blotch / Blight',
        description: 'Spray Tebuconazole 50% + Trifloxystrobin 25% WG (Nativo @ 0.6 g/L) or Difenoconazole 25 EC (1 ml/L) + sticker to halt fungal blotch expansion.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Canopy coated with systemic fungicide barrier.'
      },
      {
        id: 'on-pt-4',
        title: 'Foliar Restorative Feed',
        description: 'Spray 19:19:19 (5 g/L) + Micronutrient mixture (2 g/L) 5 days after pest containment to help plants regenerate healthy photosynthetic leaf area.',
        timeframe: 'Day 7–10',
        completionCriteria: 'New, clean tubular leaves emerging from the central neck.'
      }
    ],
    precautions: [
      'Never spray onion without a quality spreader/sticker; the waxy leaf cuticle will cause 80% of the spray to run off onto the ground.',
      'Rotate chemical classes (e.g. Fipronil then Spinetoram) to prevent rapid thrips resistance.'
    ],
    recoveryTimeline: [
      'Day 1–2: Trap installation and thrips knockdown spray.',
      'Day 3–5: Systemic purple blotch fungicide application.',
      'Day 6–8: Thrips mortality assessment.',
      'Week 2–3: Clean canopy regeneration and bulb swelling.'
    ],
    recoveryIndicators: [
      'Thrips counts dropping below 5 per plant.',
      'Purple blotch lesions dry up into pale brown scars without yellow halos.',
      'New tubular leaves emerge clean and upright.',
      'Firm bulb expansion without basal rot.'
    ],
    escalationGuidance: [
      'If twister disease (Colletotrichum + nematode complex) appears, immediately consult ICAR-DOGR Rajgurunagar for specialized drenching protocols.',
      'Report any suspected spurious pesticide batch with invoice to the Krishi Seva Kendra.'
    ]
  },

  onion__unseasonal_rain: {
    cropId: 'onion',
    cropName: 'Onion (Pyaz)',
    calamityType: 'UNSEASONAL_WEATHER',
    calamityName: 'Unseasonal Weather Event',
    damageOverview:
      'Unseasonal rain during harvesting, field curing, or storage (common in November-December for Kharif onion or March-April for Late Kharif/Rabi) causes harvested bulbs to get soaked, leading to neck rot (Botrytis allii), black mold (Aspergillus niger), bacterial soft rot, and complete storage collapse.',
    inspectionChecklist: [
      'Check whether harvested onions are lying in wet fields, in windrows, or under storage sheds.',
      'Inspect bulb necks: is the neck dry and thin (properly cured) or thick, soft, and wet?',
      'Check for black powdery mold between outer scales (Aspergillus black mold).',
      'Examine storage heaps for temperature rise, foul odor, and dripping moisture.',
      'Determine percentage of rotting bulbs in storage.'
    ],
    steps: [
      {
        id: 'on-ur-1',
        title: 'Immediate Evacuation of Wet Onions to Ventilated Sheds',
        description: 'Immediately move all harvested onions out of wet fields into dry, well-ventilated sheds. Do not leave harvested bulbs in the rain or on wet soil.',
        timeframe: 'First 24 hours',
        completionCriteria: 'All harvested onions moved under roof shelter on raised platforms.',
        isImmediateSafety: false
      },
      {
        id: 'on-ur-2',
        title: 'Thin-Layer Spread & Forced Air Aeration',
        description: 'Spread the wet onions in thin layers (not more than 10-15 cm thick) on raised bamboo racks, slatted wooden floors, or dry tarpaulins. Run electric table fans or blowers to circulate air continuously.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Onions spread in thin layers; air blowing continuously through bulbs.'
      },
      {
        id: 'on-ur-3',
        title: 'Neck Trimming with 2.5 cm Collar Intact',
        description: 'Trim foliage leaving at least 2.5 to 3 cm of neck attached to the bulb. Do not cut flush with the bulb shoulder, as an open wound invites neck rot.',
        timeframe: 'Day 2–4',
        completionCriteria: 'Neck trimmed leaving 2.5-3 cm collar intact.'
      },
      {
        id: 'on-ur-4',
        title: 'Sorting & Discarding Decomposing Bulbs',
        description: 'Strictly sort through the onions daily; remove and discard every soft, rotting, or black-molded bulb immediately to prevent contact transmission.',
        timeframe: 'Day 3–7',
        completionCriteria: 'Damaged bulbs culled daily; healthy dry bulbs segregated.'
      },
      {
        id: 'on-ur-5',
        title: 'Dusting with Sulfur / Mancozeb for Storage',
        description: 'Lightly dust healthy dry bulbs with Sulfur 80% WP or Mancozeb (2 g/kg bulbs) to prevent fungal spores from establishing on cured bulb scales.',
        timeframe: 'Day 5–8',
        completionCriteria: 'Bulb scales dusted; bulbs placed in traditional Kanda Chawl.'
      }
    ],
    precautions: [
      'Never heap wet harvested onions in dense piles; heat build-up will rot 100% of the bulbs within 48 hours.',
      'Do not store rain-soaked Kharif onions for long periods; sell them in local markets as soon as surfaces are dry.'
    ],
    recoveryTimeline: [
      'Day 1–2: Emergency evacuation and thin-layer spreading under fans.',
      'Day 2–4: Neck trimming and continuous ventilation.',
      'Day 4–7: Daily sorting, culling, and sulfur dusting.',
      'Week 2: Safe storage in Kanda Chawl or priority market dispatch.'
    ],
    recoveryIndicators: [
      'Bulb necks dry out into tight, paper-thin seals.',
      'Outer dry scales rustle crisply without damp stickiness.',
      'Absence of black mold dust between bulb scales.',
      'No foul rotting odor in the storage shed.'
    ],
    escalationGuidance: [
      'File an intimation within 72 hours under PMFBY post-harvest loss provisions if harvested onions were damaged in the field.',
      'Consult the local APMC market committee if traders attempt unfair price discounting for surface-stained lots.'
    ]
  },

  onion__other: {
    cropId: 'onion',
    cropName: 'Onion (Pyaz)',
    calamityType: 'OTHER',
    calamityName: 'Other Calamity',
    damageOverview:
      'Unforeseen events such as severe broadleaf weedicide drift (e.g. from neighbouring sugarcane or maize fields), localized soil salinity / alkalinity patches causing tip burn, stray animal grazing, or lightning strike.',
    inspectionChecklist: [
      'Examine leaf symptoms: twisted strap-like leaves with yellow chlorotic bands (herbicide drift) vs white necrotic tip burn (salinity).',
      'Assess damage perimeter and map affected bed area.',
      'Check root health in affected soil patches.',
      'Document evidence with date-stamped photographs.',
      'Check for wildlife footprints or fencing breaches.'
    ],
    steps: [
      {
        id: 'on-ot-1',
        title: 'Identify Calamity Source & Prevent Recurrence',
        description: 'Identify the cause. If herbicide drift occurred, document wind direction. If wild animals invaded, install border deterrent ropes or temporary fencing.',
        timeframe: 'Day 1',
        completionCriteria: 'Cause verified; perimeter secured against repeat damage.',
        isImmediateSafety: true
      },
      {
        id: 'on-ot-2',
        title: 'Foliar Neutralizing Spray for Herbicide Drift',
        description: 'If weedicide drift damaged onion, spray 1% Urea + 0.5% Zinc Sulphate + Humic acid (2 ml/L) + sticker to help plants metabolize chemical toxins.',
        timeframe: 'Day 1–3',
        completionCriteria: 'Foliar spray applied; toxicity symptoms arrested.'
      },
      {
        id: 'on-ot-3',
        title: 'Soil Flushing & Gypsum (For Salinity Patches)',
        description: 'If tip burn is due to salinity, flush beds with fresh water and apply agricultural gypsum (20 kg/bed) to displace excess sodium.',
        timeframe: 'Day 3–5',
        completionCriteria: 'Gypsum incorporated; beds flushed with clean water.'
      },
      {
        id: 'on-ot-4',
        title: 'Foliar 19:19:19 & Micronutrient Boost',
        description: 'Apply water-soluble 19:19:19 (5 g/L) + Micronutrients (2 g/L) every 7-10 days until affected plants regain normal growth.',
        timeframe: 'Day 6–10',
        completionCriteria: 'Regrown foliage matches height and vigor of unaffected sections.'
      }
    ],
    precautions: [
      'Do not apply additional weedicides to stressed or chemically injured onion plants.',
      'Avoid walking repeatedly over raised beds while wet.'
    ],
    recoveryTimeline: [
      'Day 1–2: Diagnosis, perimeter securing, and foliage wash.',
      'Day 3–5: Salinity amendment and foliar neutralization.',
      'Week 2: Foliar nutrition and secondary leaf expansion.',
      'Week 3–4: Resumption of normal bulb development.'
    ],
    recoveryIndicators: [
      'New tubular leaves emerge upright with healthy waxy green color.',
      'Basal plate produces clean white fibrous roots.',
      'Smooth bulb development without neck distortion.'
    ],
    escalationGuidance: [
      'For herbicide drift or wildlife damage, request an official spot inspection by the Taluka Agriculture Officer for formal compensation.',
      'Consult ICAR-DOGR Rajgurunagar if physiological disorders persist across multiple beds.'
    ]
  }
};

