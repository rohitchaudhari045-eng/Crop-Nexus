package com.cropnexus.backend.service;

import com.cropnexus.backend.dto.RecoveryProgressDto;
import com.cropnexus.backend.dto.request.RecoveryProgressRequest;
import com.cropnexus.backend.entity.AppUser;
import com.cropnexus.backend.entity.ClaimRecord;
import com.cropnexus.backend.entity.RecoveryProgressRecord;
import com.cropnexus.backend.entity.enums.UserRole;
import com.cropnexus.backend.exception.ResourceNotFoundException;
import com.cropnexus.backend.repository.ClaimRecordRepository;
import com.cropnexus.backend.repository.RecoveryProgressRepository;
import com.cropnexus.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecoveryProgressService {

    private final RecoveryProgressRepository progressRepository;
    private final UserRepository userRepository;
    private final ClaimRecordRepository claimRecordRepository;

    @Transactional(readOnly = true)
    public List<RecoveryProgressDto> getProgress(String userEmail, String claimId, String farmerId) {
        AppUser currentUser = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        List<RecoveryProgressRecord> records;

        if (currentUser.getRole() == UserRole.OFFICER) {
            // Authorized Officer can review by claim, by farmer, or all records
            if (claimId != null && !claimId.isBlank()) {
                UUID claimUuid = parseClaimId(claimId);
                records = claimUuid != null ? progressRepository.findByClaimIdOrderByUpdateDateDesc(claimUuid) : List.of();
            } else if (farmerId != null && !farmerId.isBlank()) {
                records = progressRepository.findByFarmerIdOrderByUpdateDateDesc(UUID.fromString(farmerId));
            } else {
                records = progressRepository.findAllByOrderByUpdateDateDesc();
            }
        } else {
            // Farmer can strictly access only their own records
            records = progressRepository.findByFarmerIdOrderByUpdateDateDesc(currentUser.getId());
            if (claimId != null && !claimId.isBlank()) {
                UUID claimUuid = parseClaimId(claimId);
                records = records.stream()
                        .filter(r -> claimUuid != null && claimUuid.equals(r.getClaimId()))
                        .collect(Collectors.toList());
            }
        }

        return records.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public RecoveryProgressDto addProgress(RecoveryProgressRequest request, String farmerEmail) {
        AppUser farmer = userRepository.findByEmail(farmerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", farmerEmail));

        UUID claimIdUuid = null;
        if (request.getClaimId() != null && !request.getClaimId().isBlank()) {
            claimIdUuid = parseClaimId(request.getClaimId());
        }

        RecoveryProgressRecord record = RecoveryProgressRecord.builder()
                .farmerId(farmer.getId())
                .claimId(claimIdUuid)
                .cropName(request.getCropName())
                .calamityType(request.getCalamityType())
                .recoveryPlanKey(request.getRecoveryPlanKey())
                .stageName(request.getStageName() != null ? request.getStageName() : "vegetative")
                .updateDate(LocalDate.parse(request.getUpdateDate()))
                .notes(request.getNotes())
                .observations(request.getObservations())
                .completedSteps(request.getCompletedSteps())
                .healthRating(request.getHealthRating() != null ? request.getHealthRating() : 3)
                .beforePhotoUrl(request.getBeforePhotoUrl())
                .afterPhotoUrl(request.getAfterPhotoUrl())
                .milestoneReached(request.isMilestoneReached())
                .build();

        record = progressRepository.save(record);
        return mapToDto(record);
    }

    private UUID parseClaimId(String claimIdInput) {
        if (claimIdInput == null || claimIdInput.isBlank()) return null;
        try {
            return UUID.fromString(claimIdInput);
        } catch (IllegalArgumentException e) {
            return claimRecordRepository.findByClaimNumber(claimIdInput)
                    .map(ClaimRecord::getId)
                    .orElse(null);
        }
    }

    private RecoveryProgressDto mapToDto(RecoveryProgressRecord record) {
        String farmerName = null;
        if (record.getFarmerId() != null) {
            farmerName = userRepository.findById(record.getFarmerId())
                    .map(AppUser::getName)
                    .orElse(null);
        }

        String claimNumber = null;
        if (record.getClaimId() != null) {
            claimNumber = claimRecordRepository.findById(record.getClaimId())
                    .map(ClaimRecord::getClaimNumber)
                    .orElse(null);
        }

        return RecoveryProgressDto.builder()
                .id(record.getId().toString())
                .claimId(record.getClaimId() != null ? record.getClaimId().toString() : null)
                .claimNumber(claimNumber)
                .farmerId(record.getFarmerId().toString())
                .farmerName(farmerName)
                .cropName(record.getCropName())
                .calamityType(record.getCalamityType())
                .recoveryPlanKey(record.getRecoveryPlanKey())
                .stageName(record.getStageName())
                .updateDate(record.getUpdateDate() != null ? record.getUpdateDate().toString() : null)
                .notes(record.getNotes())
                .observations(record.getObservations())
                .completedSteps(record.getCompletedSteps())
                .healthRating(record.getHealthRating())
                .beforePhotoUrl(record.getBeforePhotoUrl())
                .afterPhotoUrl(record.getAfterPhotoUrl())
                .milestoneReached(record.isMilestoneReached())
                .createdAt(record.getCreatedAt() != null ? record.getCreatedAt().toString() : null)
                .build();
    }
}
