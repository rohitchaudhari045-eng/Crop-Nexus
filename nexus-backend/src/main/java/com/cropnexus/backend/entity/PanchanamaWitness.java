package com.cropnexus.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PanchanamaWitness {

    @Column(name = "witness_name")
    private String name;

    @Column(name = "witness_aadhaar_last4")
    private String aadhaarLast4;

    @Column(name = "witness_village")
    private String village;

    @Column(name = "witness_contact")
    private String contactNumber;
}

