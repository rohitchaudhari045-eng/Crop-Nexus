package com.cropnexus.backend.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecoveryProgressRequest {

    private String claimId;

    @NotBlank(message = "Crop name is required")
    private String cropName;

    private String calamityType;

    private String recoveryPlanKey;

    private String stageName = "vegetative";

    @NotBlank(message = "Update date is required")
    private String updateDate;

    private String notes;

    private String observations;

    private String completedSteps;

    private Integer healthRating = 3;

    private String beforePhotoUrl;
    private String afterPhotoUrl;
    private Boolean milestoneReached = false;

    public boolean isMilestoneReached() {
        return Boolean.TRUE.equals(milestoneReached);
    }
}
