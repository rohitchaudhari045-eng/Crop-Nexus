package com.cropnexus.backend.dto.request;

import com.cropnexus.backend.dto.PhotoAttachmentDto;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InspectionRequest {

    @NotBlank(message = "Claim ID is required")
    private String claimId;

    private String claimNumber;

    private String officerId;

    private String officerName;

    @NotBlank(message = "Inspection date is required")
    private String inspectionDate;

    private Double gpsLatitude;
    private Double gpsLongitude;
    private GpsCoordinatesDto gpsCoordinates;

    @NotBlank(message = "Verified crop is required")
    private String verifiedCrop;

    @NotBlank(message = "Verified survey number is required")
    private String verifiedSurveyNumber;

    @NotNull(message = "Verified affected area is required")
    private BigDecimal verifiedAffectedAreaAcre;

    @NotNull(message = "Assessed loss percentage is required")
    @Min(1) @Max(100)
    private Integer assessedLossPercentage;

    @NotBlank(message = "Damage cause is required")
    private String damageCauseConfirmed;

    @NotBlank(message = "Officer observations is required")
    private String officerObservations;

    @NotBlank(message = "Crop growth stage is required")
    private String cropGrowthStage;

    @NotBlank(message = "Recommendation is required")
    private String recommendation;

    private BigDecimal recommendedCompensationAmount;

    private String status = "SUBMITTED";

    private String nextStatus;

    private String officerRemarks;

    private Boolean generatePanchanama = true;

    private List<PhotoAttachmentDto> evidencePhotos;

    public Double getGpsLatitude() {
        if (gpsLatitude != null) return gpsLatitude;
        return gpsCoordinates != null ? gpsCoordinates.getLatitude() : null;
    }

    public Double getGpsLongitude() {
        if (gpsLongitude != null) return gpsLongitude;
        return gpsCoordinates != null ? gpsCoordinates.getLongitude() : null;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GpsCoordinatesDto {
        private Double latitude;
        private Double longitude;
    }
}
