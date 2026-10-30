package com.cropnexus.backend.dto.request;

import com.cropnexus.backend.dto.PhotoAttachmentDto;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DamageReportRequest {

    @NotBlank(message = "Farmer name is required")
    private String farmerName;

    @NotBlank(message = "Farmer phone is required")
    private String farmerPhone;

    @NotBlank(message = "Crop name is required")
    private String cropName;

    @NotBlank(message = "Crop type is required")
    private String cropType;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "District is required")
    private String district;

    @NotBlank(message = "Taluka is required")
    private String taluka;

    @NotBlank(message = "Village is required")
    private String village;

    @NotBlank(message = "Survey number is required")
    private String surveyNumber;

    @NotNull(message = "Total land area is required")
    @DecimalMin(value = "0.01", message = "Total land area must be greater than 0")
    private BigDecimal totalLandAreaAcre;

    @NotNull(message = "Affected area is required")
    @DecimalMin(value = "0.01", message = "Affected area must be greater than 0")
    private BigDecimal affectedAreaAcre;

    @NotBlank(message = "Damage date is required")
    private String damageDate;

    @NotBlank(message = "Damage cause is required")
    private String damageCause;

    @NotNull(message = "Estimated loss percentage is required")
    @Min(value = 1, message = "Estimated loss percentage must be at least 1")
    @Max(value = 100, message = "Estimated loss percentage cannot exceed 100")
    private Integer estimatedLossPercentage;

    @NotBlank(message = "Damage description is required")
    @Size(min = 10, message = "Damage description must be at least 10 characters")
    private String damageDescription;

    private List<PhotoAttachmentDto> photos;
}

