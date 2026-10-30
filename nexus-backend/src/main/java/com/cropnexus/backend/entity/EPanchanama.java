package com.cropnexus.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "epanchanama_documents")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EPanchanama {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(name = "report_number", unique = true, nullable = false)
    private String reportNumber;

    @Column(name = "claim_id", nullable = false, unique = true)
    private UUID claimId;

    @Column(name = "claim_number")
    private String claimNumber;

    @Column(name = "date_generated")
    private LocalDate dateGenerated;

    private String district;
    private String taluka;
    private String village;

    @Column(name = "survey_number")
    private String surveyNumber;

    @Column(name = "farmer_name")
    private String farmerName;

    @Column(name = "farmer_phone")
    private String farmerPhone;

    @Column(name = "crop_name")
    private String cropName;

    @Column(name = "crop_variety")
    private String cropVariety;

    @Column(name = "sowing_date")
    private LocalDate sowingDate;

    @Column(name = "calamity_type")
    private String calamityType;

    @Column(name = "calamity_date")
    private LocalDate calamityDate;

    @Column(name = "total_area_acre", precision = 10, scale = 3)
    private BigDecimal totalAreaAcre;

    @Column(name = "affected_area_acre", precision = 10, scale = 3)
    private BigDecimal affectedAreaAcre;

    @Column(name = "damage_percentage")
    private Integer damagePercentage;

    @Column(name = "officer_name")
    private String officerName;

    @Column(name = "officer_designation")
    private String officerDesignation;

    @Column(name = "officer_office")
    private String officerOffice;

    @Column(name = "officer_signature_date")
    private LocalDate officerSignatureDate;

    @Column(name = "findings_summary", length = 3000)
    private String findingsSummary;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "panchanama_witnesses", joinColumns = @JoinColumn(name = "panchanama_id"))
    @Builder.Default
    private List<PanchanamaWitness> witnesses = new ArrayList<>();

    @Column(name = "is_draft")
    @Builder.Default
    private boolean isDraft = true;

    @Column(name = "official_disclaimer", length = 1000)
    @Builder.Default
    private String officialDisclaimer = "This e-Panchanama is an official document generated under the Maharashtra Relief Code. The assessment has been conducted by an authorized Agriculture Officer and is subject to verification by higher authorities.";
}

