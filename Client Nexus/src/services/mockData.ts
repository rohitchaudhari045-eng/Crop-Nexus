import {
  User,
  ClaimRecord,
  InspectionRecord,
  EPanchanamaDocument,
  WeatherAlertItem,
  WeatherForecastDay,
  CropRecoveryItem,
  CropRecoveryProgressRecord,
  NotificationItem
} from '@/types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-farmer-01',
    name: 'Rameshwar Patil',
    email: 'rameshwar.patil@example.com',
    phone: '+91 98234 11223',
    role: 'farmer',
    district: 'Kolhapur',
    village: 'Shirol',
    aadhaarLast4: '8821',
    createdAt: '2026-01-15T09:30:00Z'
  },
  {
    id: 'usr-officer-01',
    name: 'Suresh Deshmukh',
    email: 'suresh.deshmukh@agri.gov.demo',
    phone: '+91 94220 54321',
    role: 'officer',
    assignedJurisdiction: 'Kolhapur District - Zone A',
    badgeNumber: 'AGR-INSP-449',
    district: 'Kolhapur',
    createdAt: '2025-11-10T11:00:00Z'
  }
];

export const INITIAL_CLAIMS: ClaimRecord[] = [
  {
    id: 'clm-001',
    claimNumber: 'CN-2026-MH-1042',
    userId: 'usr-farmer-01',
    farmerName: 'Rameshwar Patil',
    farmerPhone: '+91 98234 11223',
    cropName: 'Sugarcane (Ganna)',
    cropType: 'Cash Crop',
    state: 'Maharashtra',
    district: 'Kolhapur',
    taluka: 'Shirol',
    village: 'Ganeshwadi',
    surveyNumber: '142/3-B',
    totalLandAreaAcre: 4.5,
    affectedAreaAcre: 3.2,
    damageDate: '2026-10-18',
    damageCause: 'heavy_rainfall',
    estimatedLossPercentage: 70,
    damageDescription: 'Panchaganga river backwater inundated field continuously for 72 hours. Standing mature cane submerged and lodged. Soil erosion along the boundary.',
    photos: [
      {
        id: 'p-01',
        url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
        name: 'submerged_cane_field.jpg',
        uploadedAt: '2026-10-19T10:15:00Z',
        caption: 'Standing water level up to 3 feet in survey 142/3-B'
      },
      {
        id: 'p-02',
        url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
        name: 'lodged_stalks.jpg',
        uploadedAt: '2026-10-19T10:17:00Z',
        caption: 'Root rot beginning due to waterlogging'
      }
    ],
    submissionDate: '2026-10-19T10:30:00Z',
    status: 'panchanama_drafted',
    compensationStatus: 'under_assessment',
    estimatedCompensationAmount: 64000,
    officerAssignedId: 'usr-officer-01',
    officerAssignedName: 'Suresh Deshmukh',
    inspectionDate: '2026-10-22T14:30:00Z',
    statusHistory: [
      {
        status: 'submitted',
        timestamp: '2026-10-19T10:30:00Z',
        remarks: 'Claim submitted by farmer Rameshwar Patil via Crop Nexus portal',
        updatedBy: 'Rameshwar Patil'
      },
      {
        status: 'under_review',
        timestamp: '2026-10-20T09:00:00Z',
        remarks: 'Land revenue records and 7/12 extract cross-referenced with survey 142/3-B',
        updatedBy: 'System Desk'
      },
      {
        status: 'inspection_scheduled',
        timestamp: '2026-10-21T11:20:00Z',
        remarks: 'Field inspection assigned to Agriculture Officer Suresh Deshmukh',
        updatedBy: 'District Ag Officer'
      },
      {
        status: 'inspected',
        timestamp: '2026-10-22T15:45:00Z',
        remarks: 'On-site physical spot inspection completed with village talathi and witnesses',
        updatedBy: 'Suresh Deshmukh'
      },
      {
        status: 'panchanama_drafted',
        timestamp: '2026-10-23T12:10:00Z',
        remarks: 'Draft e-Panchanama generated with geo-tagged plot observations',
        updatedBy: 'Suresh Deshmukh'
      }
    ]
  },
  {
    id: 'clm-002',
    claimNumber: 'CN-2026-MH-1088',
    userId: 'usr-farmer-01',
    farmerName: 'Rameshwar Patil',
    farmerPhone: '+91 98234 11223',
    cropName: 'Cotton (Kapas)',
    cropType: 'Kharif',
    state: 'Maharashtra',
    district: 'Kolhapur',
    taluka: 'Hatkanangale',
    village: 'Alte',
    surveyNumber: '88/1',
    totalLandAreaAcre: 3.0,
    affectedAreaAcre: 2.1,
    damageDate: '2026-10-14',
    damageCause: 'hailstorm',
    estimatedLossPercentage: 55,
    damageDescription: 'Intense hailstorm shattered flowering squares and bolls. Foliage punctured and severe defoliation observed.',
    photos: [
      {
        id: 'p-03',
        url: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80',
        name: 'hail_damaged_cotton.jpg',
        uploadedAt: '2026-10-15T08:30:00Z',
        caption: 'Boll drop and shredded leaves across survey 88/1'
      }
    ],
    submissionDate: '2026-10-15T09:00:00Z',
    status: 'inspection_scheduled',
    compensationStatus: 'under_assessment',
    estimatedCompensationAmount: 38000,
    officerAssignedId: 'usr-officer-01',
    officerAssignedName: 'Suresh Deshmukh',
    inspectionDate: '2026-10-28T10:00:00Z',
    statusHistory: [
      {
        status: 'submitted',
        timestamp: '2026-10-15T09:00:00Z',
        remarks: 'Report registered for hailstorm loss',
        updatedBy: 'Rameshwar Patil'
      },
      {
        status: 'inspection_scheduled',
        timestamp: '2026-10-18T16:00:00Z',
        remarks: 'Officer visit scheduled for field verification',
        updatedBy: 'Desk Officer'
      }
    ]
  },
  {
    id: 'clm-003',
    claimNumber: 'CN-2026-MH-0921',
    userId: 'usr-farmer-02',
    farmerName: 'Balasaheb Shinde',
    farmerPhone: '+91 94211 88990',
    cropName: 'Soybean',
    cropType: 'Kharif',
    state: 'Maharashtra',
    district: 'Kolhapur',
    taluka: 'Karveer',
    village: 'Chikhali',
    surveyNumber: '53/A',
    totalLandAreaAcre: 2.5,
    affectedAreaAcre: 2.5,
    damageDate: '2026-09-28',
    damageCause: 'flooding',
    estimatedLossPercentage: 90,
    damageDescription: 'Entire standing crop washed away during flash flood. Pods sprouted in field.',
    photos: [
      {
        id: 'p-04',
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        name: 'flooded_soybean.jpg',
        uploadedAt: '2026-09-29T11:00:00Z',
        caption: 'Severe inundation and silt deposit'
      }
    ],
    submissionDate: '2026-09-29T11:30:00Z',
    status: 'approved',
    compensationStatus: 'sanctioned',
    estimatedCompensationAmount: 52000,
    sanctionedCompensationAmount: 50000,
    officerAssignedId: 'usr-officer-01',
    officerAssignedName: 'Suresh Deshmukh',
    inspectionDate: '2026-10-02T11:00:00Z',
    statusHistory: [
      {
        status: 'submitted',
        timestamp: '2026-09-29T11:30:00Z',
        remarks: 'Claim submitted with photos',
        updatedBy: 'Balasaheb Shinde'
      },
      {
        status: 'inspected',
        timestamp: '2026-10-02T12:00:00Z',
        remarks: 'Joint spot inspection verified 90% crop loss',
        updatedBy: 'Suresh Deshmukh'
      },
      {
        status: 'verified',
        timestamp: '2026-10-08T15:30:00Z',
        remarks: 'Revenue and taluka committee cross-verified e-Panchanama',
        updatedBy: 'Tehsildar Office'
      },
      {
        status: 'approved',
        timestamp: '2026-10-15T14:00:00Z',
        remarks: 'State Disaster Relief Fund (SDRF) sanction order approved',
        updatedBy: 'District Collectorate'
      }
    ]
  },
  {
    id: 'clm-004',
    claimNumber: 'CN-2026-MH-1130',
    userId: 'usr-farmer-03',
    farmerName: 'Sunita Gaikwad',
    farmerPhone: '+91 97654 33211',
    cropName: 'Paddy (Rice)',
    cropType: 'Kharif',
    state: 'Maharashtra',
    district: 'Kolhapur',
    taluka: 'Radhanagari',
    village: 'Tarale',
    surveyNumber: '211/4',
    totalLandAreaAcre: 1.8,
    affectedAreaAcre: 1.2,
    damageDate: '2026-10-23',
    damageCause: 'strong_winds',
    estimatedLossPercentage: 45,
    damageDescription: 'Squall wind caused lodging of panicle-bearing paddy plants just 15 days before harvest.',
    photos: [
      {
        id: 'p-05',
        url: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
        name: 'lodged_paddy.jpg',
        uploadedAt: '2026-10-24T07:15:00Z',
        caption: 'Paddy stalks flattened to muddy ground'
      }
    ],
    submissionDate: '2026-10-24T08:00:00Z',
    status: 'submitted',
    compensationStatus: 'under_assessment',
    estimatedCompensationAmount: 24000,
    statusHistory: [
      {
        status: 'submitted',
        timestamp: '2026-10-24T08:00:00Z',
        remarks: 'Initial damage intimation submitted',
        updatedBy: 'Sunita Gaikwad'
      }
    ]
  }
];

export const INITIAL_INSPECTIONS: InspectionRecord[] = [
  {
    id: 'insp-001',
    claimId: 'clm-001',
    claimNumber: 'CN-2026-MH-1042',
    officerId: 'usr-officer-01',
    officerName: 'Suresh Deshmukh',
    inspectionDate: '2026-10-22T14:30:00Z',
    gpsCoordinates: {
      latitude: 16.7124,
      longitude: 74.5218
    },
    verifiedCrop: 'Sugarcane (Co-86032)',
    verifiedSurveyNumber: '142/3-B',
    verifiedAffectedAreaAcre: 3.1,
    assessedLossPercentage: 68,
    damageCauseConfirmed: 'heavy_rainfall',
    officerObservations: 'Physical verification confirmed persistent water stagnation for over 3 days. Root aeration was severely compromised. Silt layer of ~4 inches deposited over the root zone. Expected yield loss is around 65-70%.',
    cropGrowthStage: 'maturity',
    evidencePhotos: [
      {
        id: 'ep-01',
        url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
        name: 'officer_geo_check.jpg',
        uploadedAt: '2026-10-22T14:45:00Z',
        latitude: 16.7124,
        longitude: 74.5218,
        caption: 'Officer verification of field boundaries and watermark on sugarcane stalks'
      }
    ],
    recommendation: 'approve_full',
    recommendedCompensationAmount: 62000,
    status: 'finalized',
    createdAt: '2026-10-22T16:00:00Z'
  }
];

export const INITIAL_PANCHANAMA: EPanchanamaDocument[] = [
  {
    id: 'pan-001',
    reportNumber: 'EPN-2026-MH-0842-DRAFT',
    claimId: 'clm-001',
    claimNumber: 'CN-2026-MH-1042',
    dateGenerated: '2026-10-23T12:00:00Z',
    district: 'Kolhapur',
    taluka: 'Shirol',
    village: 'Ganeshwadi',
    surveyNumber: '142/3-B',
    farmerName: 'Rameshwar Patil',
    farmerPhone: '+91 98234 11223',
    cropName: 'Sugarcane (Co-86032)',
    cropVariety: 'Co-86032 (Adasali planting)',
    sowingDate: '2025-07-20',
    calamityType: 'Torrential Rainfall & River Inundation',
    calamityDate: '2026-10-18',
    totalAreaAcre: 4.5,
    affectedAreaAcre: 3.1,
    damagePercentage: 68,
    officerName: 'Suresh Deshmukh',
    officerDesignation: 'Circle Agriculture Officer (Grade II)',
    officerOffice: 'Shirol Taluka Agriculture Department',
    officerSignatureDate: '2026-10-23',
    findingsSummary: 'During joint spot inspection with village Talathi and two local panchas, standing water up to 2.5 feet was recorded. Crop lodging and root necrosis confirmed across 3.10 acres of survey 142/3-B. Estimated yield reduction is assessed at 68%.',
    witnesses: [
      {
        name: 'Vilas Maruti Kadam',
        aadhaarLast4: '3412',
        village: 'Ganeshwadi',
        contactNumber: '+91 94231 66778'
      },
      {
        name: 'Pandurang Sitaram Mane',
        aadhaarLast4: '9105',
        village: 'Ganeshwadi',
        contactNumber: '+91 98222 34567'
      }
    ],
    isDraft: true,
    officialDisclaimer: 'PROVISIONAL DRAFT REPORT: This digital e-Panchanama draft is generated through Crop Nexus for administrative compilation and digital field review. It does not constitute a final government sanction until countersigned by the competent revenue authority.'
  }
];

export const INITIAL_WEATHER_ALERTS: WeatherAlertItem[] = [
  {
    id: 'wa-001',
    severity: 'severe',
    category: 'heavy_rainfall',
    title: 'Orange Warning: Intense Rain & Backwater Inundation',
    description: 'Isolated heavy to very heavy rainfall (70-120 mm) expected in catchment areas. High risk of waterlogging in low-lying riverbed farms.',
    affectedDistricts: ['Kolhapur', 'Sangli', 'Satara'],
    validFrom: '2026-10-26T06:00:00Z',
    validUntil: '2026-10-29T18:00:00Z',
    advisorySteps: [
      'Ensure immediate field trenches and clearing of natural drainage outlets',
      'Postpone any scheduled fertilizer top-dressing or chemical sprays until rainfall subsides',
      'Move portable farm machinery and diesel pump sets away from riverbanks'
    ],
    source: 'India Meteorological Department (Agromet Advisory Services)'
  },
  {
    id: 'wa-002',
    severity: 'moderate',
    category: 'strong_wind',
    title: 'Gusty Winds Advisory (40-55 km/h)',
    description: 'Convective storm cloud build-up likely to trigger short-duration squalls during late afternoons.',
    affectedDistricts: ['Kolhapur', 'Solapur', 'Pune'],
    validFrom: '2026-10-27T12:00:00Z',
    validUntil: '2026-10-28T20:00:00Z',
    advisorySteps: [
      'Provide mechanical staking for banana plants and young fruit orchards',
      'Delay harvesting of dry kharif pulses until wind conditions stabilize'
    ],
    source: 'Regional Weather Forecast Centre'
  }
];

export const INITIAL_WEATHER_FORECAST: WeatherForecastDay[] = [
  {
    date: '2026-10-26',
    tempMaxC: 30,
    tempMinC: 22,
    condition: 'Heavy Rain Showers',
    icon: 'CloudRain',
    humidityPct: 88,
    rainfallProbabilityPct: 85,
    windSpeedKmh: 24
  },
  {
    date: '2026-10-27',
    tempMaxC: 29,
    tempMinC: 21,
    condition: 'Thunderstorms Likely',
    icon: 'CloudLightning',
    humidityPct: 85,
    rainfallProbabilityPct: 75,
    windSpeedKmh: 30
  },
  {
    date: '2026-10-28',
    tempMaxC: 31,
    tempMinC: 21,
    condition: 'Moderate Rain',
    icon: 'CloudDrizzle',
    humidityPct: 78,
    rainfallProbabilityPct: 60,
    windSpeedKmh: 18
  },
  {
    date: '2026-10-29',
    tempMaxC: 32,
    tempMinC: 20,
    condition: 'Partly Cloudy',
    icon: 'CloudSun',
    humidityPct: 68,
    rainfallProbabilityPct: 25,
    windSpeedKmh: 14
  },
  {
    date: '2026-10-30',
    tempMaxC: 33,
    tempMinC: 19,
    condition: 'Sunny & Clear',
    icon: 'Sun',
    humidityPct: 58,
    rainfallProbabilityPct: 10,
    windSpeedKmh: 12
  }
];

export const INITIAL_RECOVERY_ITEMS: CropRecoveryItem[] = [
  {
    id: 'rec-001',
    cropName: 'Sugarcane',
    damageType: 'heavy_rainfall',
    symptoms: [
      'Yellowing of bottom leaves due to anoxia in roots',
      'Silt crust impeding soil gas exchange',
      'Lodged canes with adventitious root development'
    ],
    immediateSteps: [
      'Dig out peripheral drain channels to drain standing water within 24 to 48 hours',
      'Avoid heavy tractor movement immediately to prevent subsoil compaction'
    ],
    soilAndNutrientManagement: [
      'Once soil is workable, apply Urea (25 kg/acre) + Potassium (20 kg/acre) to stimulate root vigor',
      'Foliar spray with 1% 19:19:19 water-soluble NPK + Micronutrient mixture'
    ],
    waterAndDrainageCare: [
      'Withhold further irrigation until top 3 inches of soil dries out',
      'Break soil crust by light hoeing or intercultural weeding'
    ],
    fungicideAndPestManagement: [
      'Drench root zone or spray Copper Oxychloride (0.25%) to prevent red rot and root fungal attacks',
      'Inspect for white grub or root borer resurgence in moisture-laden soil'
    ],
    expertConsultationCriteria: [
      'If leaf yellowing spreads to upper shoot tips after 7 days',
      'If cane stalks exhibit internal reddish discoloration when cut horizontally'
    ],
    cautionNotes: [
      'Illustrative agronomical recommendation. Dosages must be confirmed with your local Taluka Krishi Adhikari based on specific soil test values.'
    ]
  },
  {
    id: 'rec-002',
    cropName: 'Cotton',
    damageType: 'hailstorm',
    symptoms: [
      'Punctured foliage, broken side sympodial branches',
      'Square (bud) and young boll shedding',
      'Exposed internal plant tissues vulnerable to secondary infections'
    ],
    immediateSteps: [
      'Do not uproot partially damaged plants immediately; cotton has high compensatory vegetative flush capacity',
      'Clear fallen dead debris from around plant bases'
    ],
    soilAndNutrientManagement: [
      'Foliar spray with 1.5% DAP (Diammonium Phosphate) or 1% Urea to trigger rapid axillary bud growth',
      'Apply bio-stimulants / amino acid sprays at 2 ml/L after 4 days'
    ],
    waterAndDrainageCare: [
      'Maintain moderate soil moisture; avoid water stress during new flush development'
    ],
    fungicideAndPestManagement: [
      'Immediate protective spray of Carbendazim + Mancozeb (2 g/L) within 36 hours of hailstorm to prevent boll rot and blight entry through mechanical wounds'
    ],
    expertConsultationCriteria: [
      'If more than 75% of main stems are broken below the first node',
      'If black fungal spots expand rapidly along damaged twigs'
    ],
    cautionNotes: [
      'Preliminary guidance. Please consult the nearest Krishi Vigyan Kendra (KVK) for variety-specific advice.'
    ]
  },
  {
    id: 'rec-003',
    cropName: 'Soybean',
    damageType: 'flooding',
    symptoms: [
      'Root rot (Rhizoctonia/Phytophthora)',
      'Premature leaf shedding and pod blackening'
    ],
    immediateSteps: [
      'Expedite perimeter drainage channels',
      'Remove submerged weeds that compete for surviving root moisture'
    ],
    soilAndNutrientManagement: [
      'Spray 2% Urea solution on leaves as soon as clear weather returns'
    ],
    waterAndDrainageCare: [
      'Avoid standing moisture around root collars'
    ],
    fungicideAndPestManagement: [
      'Foliar spray of Tebuconazole + Trifloxystrobin (0.7 g/L) to arrest aerial blight'
    ],
    expertConsultationCriteria: [
      'If entire plot shows root collar blackening with decaying odor'
    ],
    cautionNotes: [
      'Illustrative demo recommendations for guidance only.'
    ]
  }
];

export const INITIAL_RECOVERY_PROGRESS: CropRecoveryProgressRecord[] = [
  {
    id: 'recp-001',
    claimId: 'clm-001',
    farmerId: 'usr-farmer-01',
    cropName: 'Sugarcane',
    stageName: 'Day 5 Post-Drainage — Initial Soil Treatment',
    updateDate: '2026-10-23',
    notes: 'Drainage ditches fully excavated. Standing water evacuated. Applied 19:19:19 foliar spray and Copper Oxychloride soil drench around perimeter.',
    healthRating: 3,
    beforePhotoUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
    afterPhotoUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
    milestoneReached: true
  },
  {
    id: 'recp-002',
    claimId: 'clm-001',
    farmerId: 'usr-farmer-01',
    cropName: 'Sugarcane',
    stageName: 'Day 10 Follow-up — New Shoot Emergence',
    updateDate: '2026-10-28',
    notes: 'Visible recovery in upper leaves. Lateral tillers beginning to sprout from unlodged nodes. Soil crust loosened with light hoeing.',
    healthRating: 4,
    beforePhotoUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
    afterPhotoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    milestoneReached: true
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    userId: 'usr-farmer-01',
    title: 'e-Panchanama Draft Ready for Review',
    message: 'Agriculture Officer Suresh Deshmukh has submitted the digital draft report for claim CN-2026-MH-1042.',
    type: 'inspection',
    read: false,
    createdAt: '2026-10-23T12:15:00Z',
    actionUrl: '/claims/clm-001'
  },
  {
    id: 'notif-02',
    userId: 'usr-farmer-01',
    title: 'Severe Weather Alert: Heavy Rainfall Expected',
    message: 'Orange alert issued for Kolhapur district. Review drainage recommendations in Crop Nexus Weather.',
    type: 'weather_alert',
    read: false,
    createdAt: '2026-10-26T06:30:00Z',
    actionUrl: '/weather'
  },
  {
    id: 'notif-03',
    userId: 'usr-farmer-01',
    title: 'Field Inspection Completed',
    message: 'Officer completed joint field survey at Ganeshwadi survey 142/3-B.',
    type: 'claim_update',
    read: true,
    createdAt: '2026-10-22T16:00:00Z',
    actionUrl: '/claims/clm-001'
  }
];
