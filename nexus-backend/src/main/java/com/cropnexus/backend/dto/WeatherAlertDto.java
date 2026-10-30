package com.cropnexus.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WeatherAlertDto {

    private String id;
    private String severity;
    private String category;
    private String title;
    private String description;
    private List<String> affectedDistricts;
    private String validFrom;
    private String validUntil;
    private List<String> advisorySteps;
    private String source;
}

