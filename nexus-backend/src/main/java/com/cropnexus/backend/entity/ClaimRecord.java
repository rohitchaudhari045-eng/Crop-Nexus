package com.cropnexus.backend.entity;

import com.cropnexus.backend.entity.enums.ClaimStatus;
import com.cropnexus.backend.entity.enums.CompensationStatus;
import com.cropnexus.backend.entity.enums.DamageCause;
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
@Table(name = "claim_records")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClaimRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(name = "claim_number", unique = true, nullable = false)
    private String claimNumber;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "farmer_name", nullable = false)
    private String farmerName;

    @Column(name = "farmer_phone")
    private String farmerPhone;

    @Column(name = "crop_name", nullable = false)
    private String cropName;

    @Column(name = "crop_type")
    private String cropType;

    private String state;
    private String district;
    private String taluka;
    private String village;

    @Column(name = "survey_number")
    private String surveyNumber;

    @Column(name = "total_land_area_acre", precision = 10, scale = 3)
    private BigDecimal totalLandAreaAcre;

    @Column(name = "affected_area_acre", precision = 10, scale = 3)
    private BigDecimal affectedAreaAcre;

    @Column(name = "damage_date")
    private LocalDate damageDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "damage_cause")
    private DamageCause damageCause;

    @Column(name = "estimated_loss_percentage")
    private Integer estimatedLossPercentage;

    @Column(name = "damage_description", length = 2000)
    private String damageDescription;

    @CreationTimestamp
    @Column(name = "submission_date", updatable = false)
    private Instant submissionDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private ClaimStatus status = ClaimStatus.SUBMITTED;

    @Enumerated(EnumType.STRING)
    @Column(name = "compensation_status")
    @Builder.Default
    private CompensationStatus compensationStatus = CompensationStatus.UNDER_ASSESSMENT;

    @Column(name = "estimated_compensation_amount", precision = 12, scale = 2)
    private BigDecimal estimatedCompensationAmount;

    @Column(name = "sanctioned_compensation_amount", precision = 12, scale = 2)
    private BigDecimal sanctionedCompensationAmount;

    @Column(name = "officer_assigned_id")
    private UUID officerAssignedId;

    @Column(name = "officer_assigned_name")
    private String officerAssignedName;

    @Column(name = "inspection_date")
    private LocalDate inspectionDate;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "claim_status_history", joinColumns = @JoinColumn(name = "claim_id"))
    @Builder.Default
    private List<ClaimStatusHistory> statusHistory = new ArrayList<>();

    @OneToMany(mappedBy = "claimId", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @Builder.Default
    private List<EvidencePhoto> photos = new ArrayList<>();
}

