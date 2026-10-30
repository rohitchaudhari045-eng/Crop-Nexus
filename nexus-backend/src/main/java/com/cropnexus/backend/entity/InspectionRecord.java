package com.cropnexus.backend.entity;

import com.cropnexus.backend.entity.enums.CropGrowthStage;
import com.cropnexus.backend.entity.enums.DamageCause;
import com.cropnexus.backend.entity.enums.InspectionRecommendation;
import com.cropnexus.backend.entity.enums.InspectionStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "inspection_records")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InspectionRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(name = "claim_id", nullable = false, unique = true)
    private UUID claimId;

    @Column(name = "claim_number")
    private String claimNumber;

    @Column(name = "officer_id", nullable = false)
    private UUID officerId;

    @Column(name = "officer_name")
    private String officerName;

    @Column(name = "inspection_date")
    private LocalDate inspectionDate;

    @Column(name = "gps_latitude")
    private Double gpsLatitude;

    @Column(name = "gps_longitude")
    private Double gpsLongitude;

    @Column(name = "verified_crop")
    private String verifiedCrop;

    @Column(name = "verified_survey_number")
    private String verifiedSurveyNumber;

    @Column(name = "verified_affected_area_acre", precision = 10, scale = 3)
    private BigDecimal verifiedAffectedAreaAcre;

    @Column(name = "assessed_loss_percentage")
    private Integer assessedLossPercentage;

    @Enumerated(EnumType.STRING)
    @Column(name = "damage_cause_confirmed")
    private DamageCause damageCauseConfirmed;

    @Column(name = "officer_observations", length = 2000)
    private String officerObservations;

    @Enumerated(EnumType.STRING)
    @Column(name = "crop_growth_stage")
    private CropGrowthStage cropGrowthStage;

    @Enumerated(EnumType.STRING)
    private InspectionRecommendation recommendation;

    @Column(name = "recommended_compensation_amount", precision = 12, scale = 2)
    private BigDecimal recommendedCompensationAmount;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private InspectionStatus status = InspectionStatus.DRAFT;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @OneToMany(mappedBy = "inspectionId", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @Builder.Default
    private List<InspectionPhoto> evidencePhotos = new ArrayList<>();
}

