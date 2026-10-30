package com.cropnexus.backend.service;

import com.cropnexus.backend.dto.CropRecoveryItemDto;
import com.cropnexus.backend.entity.CropRecoveryAdvisory;
import com.cropnexus.backend.entity.enums.DamageCause;
import com.cropnexus.backend.repository.CropRecoveryAdvisoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecoveryAdvisoryService {

    private final CropRecoveryAdvisoryRepository advisoryRepository;

    @Transactional(readOnly = true)
    public List<CropRecoveryItemDto> getAdvisories(String crop, String damageType) {
        List<CropRecoveryAdvisory> advisories;

        if (crop != null && !crop.isBlank()) {
            advisories = advisoryRepository.findByCropNameContainingIgnoreCase(crop);
        } else if (damageType != null && !damageType.isBlank()) {
            try {
                DamageCause cause = DamageCause.valueOf(damageType.toUpperCase());
                advisories = advisoryRepository.findByDamageType(cause);
            } catch (IllegalArgumentException e) {
                advisories = advisoryRepository.findAll();
            }
        } else {
            advisories = advisoryRepository.findAll();
        }

        return advisories.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private CropRecoveryItemDto mapToDto(CropRecoveryAdvisory advisory) {
        return CropRecoveryItemDto.builder()
                .id(advisory.getId().toString())
                .cropName(advisory.getCropName())
                .damageType(advisory.getDamageType() != null ? advisory.getDamageType().name().toLowerCase() : null)
                .symptoms(advisory.getSymptoms())
                .immediateSteps(advisory.getImmediateSteps())
                .soilAndNutrientManagement(advisory.getSoilAndNutrientManagement())
                .waterAndDrainageCare(advisory.getWaterAndDrainageCare())
                .fungicideAndPestManagement(advisory.getFungicideAndPestManagement())
                .expertConsultationCriteria(advisory.getExpertConsultationCriteria())
                .cautionNotes(advisory.getCautionNotes())
                .build();
    }
}

