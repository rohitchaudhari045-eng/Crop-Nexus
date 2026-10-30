package com.cropnexus.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClaimStatusUpdateRequest {

    @NotBlank(message = "Status is required")
    private String status;

    private String remarks;

    @NotBlank(message = "updatedBy is required")
    private String updatedBy;
}

