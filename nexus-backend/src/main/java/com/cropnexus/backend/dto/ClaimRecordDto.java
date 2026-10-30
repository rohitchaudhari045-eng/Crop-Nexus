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
public class ClaimRecordDto {

    private String id;
    private String claimNumber;
    private String userId;
    private String farmerName;
    private String farmerPhone;
    private String cropName;
    private String cropType;
    private String state;
    private String district;
    private String taluka;
    private String village;
    private String surveyNumber;
    private BigDecimal totalLandAreaAcre;
    private BigDecimal affectedAreaAcre;
    private String damageDate;
    private String damageCause;
    private Integer estimatedLossPercentage;
    private String damageDescription;
    private List<PhotoAttachmentDto> photos;
    private String submissionDate;
    private String status;
    private String compensationStatus;
    private BigDecimal estimatedCompensationAmount;
    private BigDecimal sanctionedCompensationAmount;
    private String officerAssignedId;
    private String officerAssignedName;
    private String inspectionDate;
    private List<StatusHistoryDto> statusHistory;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StatusHistoryDto {
        private String status;
        private String timestamp;
        private String remarks;
        private String updatedBy;
    }
}

