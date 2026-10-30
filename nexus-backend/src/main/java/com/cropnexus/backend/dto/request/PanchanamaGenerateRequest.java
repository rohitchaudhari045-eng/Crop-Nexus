package com.cropnexus.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PanchanamaGenerateRequest {

    @NotBlank(message = "Claim ID is required")
    private String claimId;

    private String inspectionId;
}

