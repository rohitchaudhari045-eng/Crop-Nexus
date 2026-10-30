package com.cropnexus.backend.repository;

import com.cropnexus.backend.entity.EPanchanama;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EPanchanamaRepository extends JpaRepository<EPanchanama, UUID> {

    Optional<EPanchanama> findByClaimId(UUID claimId);

    Optional<EPanchanama> findByReportNumber(String reportNumber);
}

