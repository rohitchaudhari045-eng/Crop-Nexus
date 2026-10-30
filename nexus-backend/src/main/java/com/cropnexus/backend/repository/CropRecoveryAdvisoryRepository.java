package com.cropnexus.backend.repository;

import com.cropnexus.backend.entity.CropRecoveryAdvisory;
import com.cropnexus.backend.entity.enums.DamageCause;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CropRecoveryAdvisoryRepository extends JpaRepository<CropRecoveryAdvisory, UUID> {

    List<CropRecoveryAdvisory> findByCropNameContainingIgnoreCase(String cropName);

    List<CropRecoveryAdvisory> findByDamageType(DamageCause damageType);
}

