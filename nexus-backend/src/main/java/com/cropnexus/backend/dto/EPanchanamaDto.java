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
public class EPanchanamaDto {

    private String id;
    private String reportNumber;
    private String claimId;
    private String claimNumber;
    private String dateGenerated;
    private String district;
    private String taluka;
    private String village;
    private String surveyNumber;
    private String farmerName;
    private String farmerPhone;
    private String cropName;
    private String cropVariety;
    private String sowingDate;
    private String calamityType;
    private String calamityDate;
    private BigDecimal totalAreaAcre;
    private BigDecimal affectedAreaAcre;
    private Integer damagePercentage;
    private String officerName;
    private String officerDesignation;
    private String officerOffice;
    private String officerSignatureDate;
    private String findingsSummary;
    private List<WitnessDto> witnesses;
    private boolean isDraft;
    private String officialDisclaimer;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WitnessDto {
        private String name;
        private String aadhaarLast4;
        private String village;
        private String contactNumber;
    }
}

