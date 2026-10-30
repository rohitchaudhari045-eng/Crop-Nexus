package com.cropnexus.backend.repository;

import com.cropnexus.backend.entity.InspectionRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InspectionRecordRepository extends JpaRepository<InspectionRecord, UUID> {

    List<InspectionRecord> findByOfficerId(UUID officerId);

    Optional<InspectionRecord> findByClaimId(UUID claimId);

    List<InspectionRecord> findAllByOrderByCreatedAtDesc();
}

