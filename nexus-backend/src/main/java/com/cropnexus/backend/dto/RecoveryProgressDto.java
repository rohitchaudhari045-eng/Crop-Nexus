package com.cropnexus.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RecoveryProgressDto {

    private String id;
    private String claimId;
    private String claimNumber;
    private String farmerId;
    private String farmerName;
    private String cropName;
    private String calamityType;
    private String recoveryPlanKey;
    private String stageName;
    private String updateDate;
    private String notes;
    private String observations;
    private String completedSteps;
    private Integer healthRating;
    private String beforePhotoUrl;
    private String afterPhotoUrl;
    private boolean milestoneReached;
    private String createdAt;
}
