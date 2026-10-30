package com.cropnexus.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "evidence_photos")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EvidencePhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(name = "claim_id", nullable = false)
    private UUID claimId;

    @Column(nullable = false)
    private String url;

    private String name;

    @CreationTimestamp
    @Column(name = "uploaded_at")
    private Instant uploadedAt;

    @Column(name = "size_bytes")
    private Long sizeBytes;

    private Double latitude;
    private Double longitude;

    @Column(length = 500)
    private String caption;
}

