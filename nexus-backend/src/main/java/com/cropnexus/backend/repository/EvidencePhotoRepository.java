package com.cropnexus.backend.repository;

import com.cropnexus.backend.entity.EvidencePhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EvidencePhotoRepository extends JpaRepository<EvidencePhoto, UUID> {

    List<EvidencePhoto> findByClaimId(UUID claimId);
}

