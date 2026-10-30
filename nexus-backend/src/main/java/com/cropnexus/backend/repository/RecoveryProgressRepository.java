package com.cropnexus.backend.repository;

import com.cropnexus.backend.entity.RecoveryProgressRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RecoveryProgressRepository extends JpaRepository<RecoveryProgressRecord, UUID> {

    List<RecoveryProgressRecord> findByFarmerIdOrderByUpdateDateDesc(UUID farmerId);

    List<RecoveryProgressRecord> findByClaimIdOrderByUpdateDateDesc(UUID claimId);

    List<RecoveryProgressRecord> findAllByOrderByUpdateDateDesc();
}
