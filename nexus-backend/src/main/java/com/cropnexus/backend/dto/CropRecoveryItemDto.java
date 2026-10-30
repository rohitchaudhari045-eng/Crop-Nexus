package com.cropnexus.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CropRecoveryItemDto {

    private String id;
    private String cropName;
    private String damageType;
    private List<String> symptoms;
    private List<String> immediateSteps;
    private List<String> soilAndNutrientManagement;
    private List<String> waterAndDrainageCare;
    private List<String> fungicideAndPestManagement;
    private List<String> expertConsultationCriteria;
    private List<String> cautionNotes;
}

