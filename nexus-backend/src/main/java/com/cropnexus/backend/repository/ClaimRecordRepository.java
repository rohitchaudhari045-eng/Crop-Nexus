package com.cropnexus.backend.repository;

import com.cropnexus.backend.entity.ClaimRecord;
import com.cropnexus.backend.entity.enums.ClaimStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ClaimRecordRepository extends JpaRepository<ClaimRecord, UUID> {

    List<ClaimRecord> findByUserId(UUID userId);

    List<ClaimRecord> findByStatus(ClaimStatus status);

    Optional<ClaimRecord> findByClaimNumber(String claimNumber);

    @Query("SELECT c FROM ClaimRecord c WHERE " +
           "(:status IS NULL OR c.status = :status) AND " +
           "(:userId IS NULL OR c.userId = :userId) AND " +
           "(:search IS NULL OR LOWER(c.claimNumber) LIKE :search " +
           "OR LOWER(c.farmerName) LIKE :search " +
           "OR LOWER(c.cropName) LIKE :search) " +
           "ORDER BY c.submissionDate DESC")
    List<ClaimRecord> findByFilters(
            @Param("status") ClaimStatus status,
            @Param("userId") UUID userId,
            @Param("search") String search);

    long countByStatus(ClaimStatus status);
}

