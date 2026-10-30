package com.cropnexus.backend.seeder;

import com.cropnexus.backend.entity.AppUser;
import com.cropnexus.backend.entity.CropRecoveryAdvisory;
import com.cropnexus.backend.entity.WeatherAlert;
import com.cropnexus.backend.entity.enums.DamageCause;
import com.cropnexus.backend.entity.enums.UserRole;
import com.cropnexus.backend.entity.enums.WeatherAlertSeverity;
import com.cropnexus.backend.repository.CropRecoveryAdvisoryRepository;
import com.cropnexus.backend.repository.UserRepository;
import com.cropnexus.backend.repository.WeatherAlertRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements ApplicationRunner {

    private final UserRepository userRepository;
    private final WeatherAlertRepository weatherAlertRepository;
    private final CropRecoveryAdvisoryRepository advisoryRepository;
    private final com.cropnexus.backend.repository.ClaimRecordRepository claimRecordRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        seedUsers();
        seedWeatherAlerts();
        seedRecoveryAdvisories();
        seedSampleClaims();
    }

    private void seedUsers() {
        String officerEmail = "officer@cropnexus.gov.in";
        if (!userRepository.existsByEmail(officerEmail)) {
            AppUser officer = AppUser.builder()
                    .name("Rajesh Patil")
                    .email(officerEmail)
                    .phone("9876543210")
                    .passwordHash(passwordEncoder.encode("Officer@123"))
                    .role(UserRole.OFFICER)
                    .district("Pune")
                    .taluka("Haveli")
                    .assignedJurisdiction("Pune District")
                    .badgeNumber("MH-AGR-2024-001")
                    .preferredLanguage("en")
                    .build();
            userRepository.save(officer);
            log.info("Seeded officer user: {}", officerEmail);
        }

        String demoOfficerEmail = "suresh.deshmukh@agri.gov.demo";
        if (!userRepository.existsByEmail(demoOfficerEmail)) {
            AppUser officerDemo = AppUser.builder()
                    .name("Suresh Deshmukh")
                    .email(demoOfficerEmail)
                    .phone("9876500001")
                    .passwordHash(passwordEncoder.encode("DemoPassword123"))
                    .role(UserRole.OFFICER)
                    .district("Kolhapur")
                    .taluka("Shirol")
                    .assignedJurisdiction("Kolhapur Zone")
                    .badgeNumber("MH-AGR-2024-042")
                    .preferredLanguage("mr")
                    .build();
            userRepository.save(officerDemo);
            log.info("Seeded demo officer user: {}", demoOfficerEmail);
        }

        String demoFarmerEmail = "farmer@cropnexus.gov.in";
        if (!userRepository.existsByEmail(demoFarmerEmail) && !userRepository.existsByPhone("9823411223")) {
            AppUser farmer = AppUser.builder()
                    .name("Rameshwar Patil")
                    .email(demoFarmerEmail)
                    .phone("9823411223")
                    .passwordHash(passwordEncoder.encode("DemoPassword123"))
                    .role(UserRole.FARMER)
                    .district("Kolhapur")
                    .taluka("Shirol")
                    .village("Kurundwad")
                    .preferredLanguage("mr")
                    .aadhaarLast4("4821")
                    .build();
            userRepository.save(farmer);
            log.info("Seeded farmer user: {}", demoFarmerEmail);
        }
    }

    private void seedSampleClaims() {
        if (claimRecordRepository.count() == 0) {
            userRepository.findByPhone("9823411223").ifPresent(farmer -> {
                com.cropnexus.backend.entity.ClaimRecord claim1 = com.cropnexus.backend.entity.ClaimRecord.builder()
                        .claimNumber("CN-2026-MH-4821")
                        .userId(farmer.getId())
                        .farmerName(farmer.getName())
                        .farmerPhone(farmer.getPhone())
                        .cropName("Sugarcane (ऊस)")
                        .cropType("Cash Crop")
                        .state("Maharashtra")
                        .district(farmer.getDistrict())
                        .taluka(farmer.getTaluka())
                        .village(farmer.getVillage())
                        .surveyNumber("142/2A")
                        .totalLandAreaAcre(new java.math.BigDecimal("3.5"))
                        .affectedAreaAcre(new java.math.BigDecimal("2.8"))
                        .damageDate(java.time.LocalDate.now().minusDays(2))
                        .damageCause(DamageCause.HEAVY_RAINFALL)
                        .estimatedLossPercentage(75)
                        .damageDescription("Continuous torrential rainfall submerged the standing crop for 48 hours causing extensive lodging and root choking.")
                        .status(com.cropnexus.backend.entity.enums.ClaimStatus.SUBMITTED)
                        .compensationStatus(com.cropnexus.backend.entity.enums.CompensationStatus.UNDER_ASSESSMENT)
                        .build();

                claim1.getStatusHistory().add(com.cropnexus.backend.entity.ClaimStatusHistory.builder()
                        .status("submitted")
                        .timestamp(Instant.now().minus(2, ChronoUnit.DAYS))
                        .remarks("Initial crop loss intimation submitted by farmer")
                        .updatedBy(farmer.getName())
                        .build());

                claimRecordRepository.save(claim1);
                log.info("Seeded sample claim: CN-2026-MH-4821");
            });
        }
    }

    private void seedWeatherAlerts() {
        if (weatherAlertRepository.count() == 0) {
            Instant now = Instant.now();

            WeatherAlert alert1 = WeatherAlert.builder()
                    .severity(WeatherAlertSeverity.HIGH)
                    .category("heavy_rainfall")
                    .title("Heavy Rainfall Warning - Konkan and Ghat Region")
                    .description("IMD has issued a heavy rainfall warning for Konkan division and adjoining ghat areas. Farmers are advised to take precautionary measures to protect their standing crops.")
                    .affectedDistricts(Arrays.asList("Raigad", "Ratnagiri", "Sindhudurg", "Pune", "Nashik", "Kolhapur"))
                    .validFrom(now.minus(1, ChronoUnit.HOURS))
                    .validUntil(now.plus(48, ChronoUnit.HOURS))
                    .advisorySteps(Arrays.asList(
                            "Harvest mature crops immediately if possible",
                            "Ensure proper drainage in fields to prevent waterlogging",
                            "Tie and support tall crops like sugarcane and banana",
                            "Postpone fertilizer and pesticide application",
                            "Keep livestock in shelter",
                            "Document any crop damage for insurance claims"
                    ))
                    .source("India Meteorological Department (IMD)")
                    .build();

            WeatherAlert alert2 = WeatherAlert.builder()
                    .severity(WeatherAlertSeverity.MODERATE)
                    .category("hailstorm")
                    .title("Hailstorm Alert - Vidarbha and Marathwada")
                    .description("Hailstorm activity expected in parts of Vidarbha and Marathwada regions. Crops in flowering and fruiting stage may suffer significant damage.")
                    .affectedDistricts(Arrays.asList("Nagpur", "Amravati", "Akola", "Yavatmal", "Aurangabad", "Latur", "Osmanabad", "Nanded"))
                    .validFrom(now.plus(2, ChronoUnit.HOURS))
                    .validUntil(now.plus(24, ChronoUnit.HOURS))
                    .advisorySteps(Arrays.asList(
                            "Cover horticulture crops with anti-hail nets if available",
                            "Harvest ripe fruits immediately",
                            "Photograph all hail damage for insurance claims",
                            "Do not enter fields during active hailstorm",
                            "Contact local Krishi Kendra for emergency support",
                            "Report damage to Taluka Agriculture Office within 72 hours"
                    ))
                    .source("Maharashtra State Disaster Management Authority (MSDMA)")
                    .build();

            WeatherAlert alert3 = WeatherAlert.builder()
                    .severity(WeatherAlertSeverity.SEVERE)
                    .category("flood")
                    .title("Flood Warning - Krishna and Godavari River Basins")
                    .description("Rising water levels in Krishna and Godavari rivers. Agricultural lands in low-lying areas near river banks are at high risk of flooding.")
                    .affectedDistricts(Arrays.asList("Sangli", "Satara", "Kolhapur", "Solapur", "Nanded", "Nandurbar"))
                    .validFrom(now)
                    .validUntil(now.plus(72, ChronoUnit.HOURS))
                    .advisorySteps(Arrays.asList(
                            "Immediately move cattle and farm equipment to higher ground",
                            "Do not enter flooded fields",
                            "Contact district collector's office for evacuation assistance",
                            "Document flood extent with GPS-tagged photographs",
                            "Register for crop damage compensation at district agriculture office",
                            "Save important documents in waterproof containers"
                    ))
                    .source("Central Water Commission (CWC)")
                    .build();

            WeatherAlert alert4 = WeatherAlert.builder()
                    .severity(WeatherAlertSeverity.LOW)
                    .category("strong_wind")
                    .title("Strong Wind Advisory - Western Maharashtra")
                    .description("Strong surface winds expected with gusts up to 50-60 km/h. Tall crops and orchards may face wind damage.")
                    .affectedDistricts(Arrays.asList("Pune", "Ahmednagar", "Nashik", "Dhule", "Jalgaon"))
                    .validFrom(now.minus(3, ChronoUnit.HOURS))
                    .validUntil(now.plus(12, ChronoUnit.HOURS))
                    .advisorySteps(Arrays.asList(
                            "Stake and tie tall crops like maize and sorghum",
                            "Prune excessive growth from fruit trees",
                            "Secure farm structures and storage sheds",
                            "Postpone spraying operations"
                    ))
                    .source("India Meteorological Department (IMD)")
                    .build();

            weatherAlertRepository.saveAll(List.of(alert1, alert2, alert3, alert4));
            log.info("Seeded {} weather alerts", 4);
        }
    }

    private void seedRecoveryAdvisories() {
        if (advisoryRepository.count() == 0) {
            CropRecoveryAdvisory riceFlood = CropRecoveryAdvisory.builder()
                    .cropName("Rice (Paddy)")
                    .damageType(DamageCause.FLOODING)
                    .symptoms(Arrays.asList(
                            "Yellowing and wilting of leaves",
                            "Root damage and lodging",
                            "Pale green to yellow discoloration",
                            "Stunted growth after water recedes",
                            "Increased susceptibility to blast and brown spot"
                    ))
                    .immediateSteps(Arrays.asList(
                            "Drain excess water from fields as soon as possible",
                            "Do not apply fertilizers immediately after flooding",
                            "Remove debris and silt deposited on crops",
                            "Apply light irrigation if soil becomes extremely dry after drainage"
                    ))
                    .soilAndNutrientManagement(Arrays.asList(
                            "Apply 10 kg Zinc Sulphate per acre after drainage",
                            "Top-dress with 20 kg Urea per acre 7-10 days after drainage",
                            "Apply potassium fertilizer to improve stem strength",
                            "Conduct soil testing before heavy fertilizer application"
                    ))
                    .waterAndDrainageCare(Arrays.asList(
                            "Maintain drainage channels to prevent waterlogging",
                            "Create field bunds to control water movement",
                            "Alternate wetting and drying (AWD) irrigation after recovery"
                    ))
                    .fungicideAndPestManagement(Arrays.asList(
                            "Apply Carbendazim 1g/L water for blast control",
                            "Spray Propiconazole for sheath blight management",
                            "Monitor for brown plant hopper and apply Imidacloprid if required",
                            "Use Tricyclazole for neck blast prevention at panicle initiation"
                    ))
                    .expertConsultationCriteria(Arrays.asList(
                            "More than 50% crop loss observed",
                            "Disease symptoms appear despite preventive measures",
                            "Crop is at flowering or grain filling stage during flood"
                    ))
                    .cautionNotes(Arrays.asList(
                            "Never apply urea in standing water - causes nitrogen loss",
                            "Avoid DAP application immediately after flooding",
                            "Do not spray pesticides during active rainfall"
                    ))
                    .build();

            CropRecoveryAdvisory cottonHailstorm = CropRecoveryAdvisory.builder()
                    .cropName("Cotton")
                    .damageType(DamageCause.HAILSTORM)
                    .symptoms(Arrays.asList(
                            "Shredded and bruised leaves",
                            "Broken branches and stems",
                            "Damaged bolls and boll shedding",
                            "Bark damage on main stem",
                            "Entry points for secondary infections"
                    ))
                    .immediateSteps(Arrays.asList(
                            "Survey damage within 24 hours and document with photographs",
                            "Remove broken branches to prevent disease entry",
                            "Apply copper oxychloride spray on injured plant parts",
                            "Report damage to local agriculture office for compensation"
                    ))
                    .soilAndNutrientManagement(Arrays.asList(
                            "Apply 20:20:0 fertilizer at 50 kg per acre for recovery",
                            "Foliar spray of 1% KNO3 to stimulate new growth",
                            "Apply micronutrients especially boron at 0.1% spray"
                    ))
                    .waterAndDrainageCare(Arrays.asList(
                            "Ensure good drainage to prevent root rot",
                            "Light irrigation if soil is dry after hailstorm",
                            "Avoid heavy irrigation immediately after damage"
                    ))
                    .fungicideAndPestManagement(Arrays.asList(
                            "Spray Copper Oxychloride (3g/L) to prevent bacterial infection at wound sites",
                            "Apply Mancozeb for alternaria leaf spot prevention",
                            "Monitor for sucking pests that exploit weakened plants",
                            "Use systemic fungicide for stem injuries"
                    ))
                    .expertConsultationCriteria(Arrays.asList(
                            "More than 60% bolls are damaged",
                            "Main stem is broken in majority of plants",
                            "Crop age is less than 60 days at time of damage"
                    ))
                    .cautionNotes(Arrays.asList(
                            "Do not uproot plants immediately - allow 10-15 days for recovery assessment",
                            "Compensation claims must be filed within 72 hours of damage"
                    ))
                    .build();

            CropRecoveryAdvisory soyabeanDrought = CropRecoveryAdvisory.builder()
                    .cropName("Soyabean")
                    .damageType(DamageCause.DROUGHT)
                    .symptoms(Arrays.asList(
                            "Leaf rolling and wilting during daytime",
                            "Premature leaf drop",
                            "Pod abortion and shriveled seeds",
                            "Pale yellow discoloration of leaves",
                            "Reduced nodulation and nitrogen fixation"
                    ))
                    .immediateSteps(Arrays.asList(
                            "Provide life-saving irrigation immediately",
                            "Apply mulching to conserve soil moisture",
                            "Avoid tillage operations during drought stress",
                            "Apply anti-transpirant spray (Kaolin 5%) to reduce water loss"
                    ))
                    .soilAndNutrientManagement(Arrays.asList(
                            "Apply potash fertilizer to improve drought tolerance",
                            "Foliar spray of 2% KCl to improve water use efficiency",
                            "Avoid nitrogen application during severe drought"
                    ))
                    .waterAndDrainageCare(Arrays.asList(
                            "Prioritize critical growth stages: flowering and pod filling",
                            "Use furrow irrigation to minimize evaporation",
                            "Deficit irrigation targeting 50-60% soil moisture"
                    ))
                    .fungicideAndPestManagement(Arrays.asList(
                            "Monitor for whitefly and thrips which intensify under drought",
                            "Apply neem-based pesticides (Azadirachtin) for sucking pests",
                            "Watch for yellow mosaic virus transmitted by whitefly"
                    ))
                    .expertConsultationCriteria(Arrays.asList(
                            "Drought continues beyond 3 weeks during pod filling stage",
                            "More than 40% yield loss anticipated",
                            "Groundwater levels critically low in region"
                    ))
                    .cautionNotes(Arrays.asList(
                            "Do not apply heavy doses of fertilizer without adequate moisture",
                            "Contact district agriculture office for tanker water supply schemes"
                    ))
                    .build();

            CropRecoveryAdvisory wheatHeavyRainfall = CropRecoveryAdvisory.builder()
                    .cropName("Wheat")
                    .damageType(DamageCause.HEAVY_RAINFALL)
                    .symptoms(Arrays.asList(
                            "Lodging (falling over) of plants",
                            "Yellowing and leaf rust symptoms",
                            "Waterlogged roots leading to yellow leaves",
                            "Grain shriveling and poor grain filling",
                            "Increased incidence of fusarium head blight"
                    ))
                    .immediateSteps(Arrays.asList(
                            "Drain excess water urgently to prevent root damage",
                            "Support lodged plants using sticks in small areas",
                            "Spray fungicide immediately to prevent fungal diseases",
                            "Harvest early if crop is near maturity"
                    ))
                    .soilAndNutrientManagement(Arrays.asList(
                            "Apply 15 kg Urea per acre after water recedes for recovery",
                            "Foliar spray of 0.5% ZnSO4 for micronutrient correction",
                            "Avoid heavy fertilization during waterlogged conditions"
                    ))
                    .waterAndDrainageCare(Arrays.asList(
                            "Create surface drainage channels in field",
                            "Do not irrigate for at least 10-15 days after excess rainfall",
                            "Monitor soil moisture before next irrigation"
                    ))
                    .fungicideAndPestManagement(Arrays.asList(
                            "Apply Propiconazole 25EC (0.1%) for yellow rust control",
                            "Spray Tebuconazole for head blight management",
                            "Monitor for aphids which multiply rapidly in humid conditions"
                    ))
                    .expertConsultationCriteria(Arrays.asList(
                            "More than 70% lodging observed",
                            "Visible head blight symptoms appear",
                            "Crop is at grain filling stage"
                    ))
                    .cautionNotes(Arrays.asList(
                            "Harvest damp grain cautiously and dry before storage to prevent mycotoxins",
                            "Test grain quality before selling to avoid rejection"
                    ))
                    .build();

            advisoryRepository.saveAll(List.of(riceFlood, cottonHailstorm, soyabeanDrought, wheatHeavyRainfall));
            log.info("Seeded {} crop recovery advisories", 4);
        }
    }
}

