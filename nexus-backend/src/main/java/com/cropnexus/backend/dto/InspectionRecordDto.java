package com.cropnexus.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class InspectionRecordDto {

    private String id;
    private String claimId;
    private String claimNumber;
    private String officerId;
    private String officerName;
    private String inspectionDate;
    private GpsCoordinatesDto gpsCoordinates;
    private String verifiedCrop;
    private String verifiedSurveyNumber;
    private BigDecimal verifiedAffectedAreaAcre;
    private Integer assessedLossPercentage;
    private String damageCauseConfirmed;
    private String officerObservations;
    private String cropGrowthStage;
    private List<PhotoAttachmentDto> evidencePhotos;
    private String recommendation;
    private BigDecimal recommendedCompensationAmount;
    private String status;
    private String claimStatus;
    private String compensationStatus;
    private String officerRemarks;
    private String panchanamaId;
    private String panchanamaReportNumber;
    private String createdAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GpsCoordinatesDto {
        private Double latitude;
        private Double longitude;
    }
}

