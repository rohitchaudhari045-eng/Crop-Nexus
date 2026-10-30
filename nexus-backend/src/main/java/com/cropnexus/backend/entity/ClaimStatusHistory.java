package com.cropnexus.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.time.Instant;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClaimStatusHistory {

    @Column(name = "sh_status")
    private String status;

    @Column(name = "sh_timestamp")
    private Instant timestamp;

    @Column(name = "sh_remarks", length = 1000)
    private String remarks;

    @Column(name = "sh_updated_by")
    private String updatedBy;
}

