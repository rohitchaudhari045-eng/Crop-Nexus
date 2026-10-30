package com.cropnexus.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "recovery_progress_records")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecoveryProgressRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(name = "claim_id")
    private UUID claimId;

    @Column(name = "farmer_id", nullable = false)
    private UUID farmerId;

    @Column(name = "crop_name", nullable = false)
    private String cropName;

    @Column(name = "calamity_type")
    private String calamityType;

    @Column(name = "recovery_plan_key")
    private String recoveryPlanKey;

    @Column(name = "stage_name")
    private String stageName;

    @Column(name = "update_date")
    private LocalDate updateDate;

    @Column(length = 2000)
    private String notes;

    @Column(name = "observations", length = 2000)
    private String observations;

    @Column(name = "completed_steps", length = 2000)
    private String completedSteps;

    @Column(name = "health_rating")
    private Integer healthRating;

    @Column(name = "before_photo_url")
    private String beforePhotoUrl;

    @Column(name = "after_photo_url")
    private String afterPhotoUrl;

    @Column(name = "milestone_reached")
    @Builder.Default
    private boolean milestoneReached = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;
}
