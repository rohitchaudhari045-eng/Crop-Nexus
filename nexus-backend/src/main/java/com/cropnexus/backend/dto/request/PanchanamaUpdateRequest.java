package com.cropnexus.backend.dto.request;

import com.cropnexus.backend.dto.EPanchanamaDto;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PanchanamaUpdateRequest {

    private String cropVariety;
    private String sowingDate;
    private String officerSignatureDate;
    private String findingsSummary;
    private List<EPanchanamaDto.WitnessDto> witnesses;
    private Boolean isDraft;
    private String officerDesignation;
    private String officerOffice;
}

