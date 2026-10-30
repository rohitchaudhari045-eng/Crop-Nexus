package com.cropnexus.backend.service;

import com.cropnexus.backend.dto.ClaimRecordDto;
import com.cropnexus.backend.dto.PhotoAttachmentDto;
import com.cropnexus.backend.dto.request.ClaimStatusUpdateRequest;
import com.cropnexus.backend.dto.request.DamageReportRequest;
import com.cropnexus.backend.entity.AppUser;
import com.cropnexus.backend.entity.ClaimRecord;
import com.cropnexus.backend.entity.ClaimStatusHistory;
import com.cropnexus.backend.entity.EvidencePhoto;
import com.cropnexus.backend.entity.enums.ClaimStatus;
import com.cropnexus.backend.entity.enums.DamageCause;
import com.cropnexus.backend.exception.BusinessRuleException;
import com.cropnexus.backend.exception.ResourceNotFoundException;
import com.cropnexus.backend.repository.ClaimRecordRepository;
import com.cropnexus.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClaimService {

    private final ClaimRecordRepository claimRecordRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Transactional
    public ClaimRecordDto submitClaim(DamageReportRequest request, String userEmail) {
        AppUser user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        String claimNumber = generateClaimNumber();

        ClaimRecord claim = ClaimRecord.builder()
                .claimNumber(claimNumber)
                .userId(user.getId())
                .farmerName(request.getFarmerName())
                .farmerPhone(request.getFarmerPhone())
                .cropName(request.getCropName())
                .cropType(request.getCropType())
                .state(request.getState())
                .district(request.getDistrict())
                .taluka(request.getTaluka())
                .village(request.getVillage())
                .surveyNumber(request.getSurveyNumber())
                .totalLandAreaAcre(request.getTotalLandAreaAcre())
                .affectedAreaAcre(request.getAffectedAreaAcre())
                .damageDate(LocalDate.parse(request.getDamageDate()))
                .damageCause(DamageCause.valueOf(request.getDamageCause().toUpperCase().replace("-", "_").trim()))
                .estimatedLossPercentage(request.getEstimatedLossPercentage())
                .damageDescription(request.getDamageDescription())
                .status(ClaimStatus.SUBMITTED)
                .build();

        // Add initial status history
        ClaimStatusHistory history = ClaimStatusHistory.builder()
                .status(ClaimStatus.SUBMITTED.name())
                .timestamp(Instant.now())
                .remarks("Claim submitted by farmer")
                .updatedBy(user.getName())
                .build();
        claim.getStatusHistory().add(history);

        claim = claimRecordRepository.save(claim);

        // Handle photos if any
        if (request.getPhotos() != null && !request.getPhotos().isEmpty()) {
            for (PhotoAttachmentDto photoDto : request.getPhotos()) {
                if (photoDto.getUrl() == null || photoDto.getUrl().isBlank()) {
                    continue;
                }
                EvidencePhoto photo = EvidencePhoto.builder()
                        .claimId(claim.getId())
                        .url(photoDto.getUrl())
                        .name(photoDto.getName() != null ? photoDto.getName() : "evidence.jpg")
                        .sizeBytes(photoDto.getSizeBytes() != null ? photoDto.getSizeBytes() : 0L)
                        .latitude(photoDto.getLatitude())
                        .longitude(photoDto.getLongitude())
                        .caption(photoDto.getCaption())
                        .build();
                claim.getPhotos().add(photo);
            }
            claim = claimRecordRepository.save(claim);
        }

        log.info("Claim submitted: {} by user: {}", claimNumber, userEmail);

        // Send notification
        notificationService.createNotification(
                user.getId(),
                "Claim Submitted Successfully",
                "Your claim " + claimNumber + " has been submitted and is under review.",
                "claim_update",
                "/claims/" + claim.getId()
        );

        return mapToDto(claim);
    }

    @Transactional(readOnly = true)
    public List<ClaimRecordDto> getClaims(String status, String search, String userId, String currentUserEmail) {
        AppUser currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", currentUserEmail));

        ClaimStatus claimStatus = null;
        if (status != null && !status.isBlank() && !status.equalsIgnoreCase("all")) {
            try {
                claimStatus = ClaimStatus.valueOf(status.toUpperCase().replace("-", "_").trim());
            } catch (IllegalArgumentException e) {
                log.warn("Invalid claim status filter requested: {}", status);
            }
        }

        UUID userIdUuid = null;
        // For farmers, always filter by their own userId
        if (currentUser.getRole().name().equals("FARMER")) {
            userIdUuid = currentUser.getId();
        } else if (userId != null && !userId.isBlank() && !userId.equalsIgnoreCase("all")) {
            try {
                userIdUuid = UUID.fromString(userId);
            } catch (IllegalArgumentException ignored) {}
        }

        String searchPattern = (search != null && !search.isBlank())
                ? "%" + search.trim().toLowerCase() + "%"
                : null;

        return claimRecordRepository.findByFilters(claimStatus, userIdUuid, searchPattern)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ClaimRecord findClaimByIdOrNumber(String id) {
        try {
            UUID uuid = UUID.fromString(id);
            return claimRecordRepository.findById(uuid)
                    .or(() -> claimRecordRepository.findByClaimNumber(id))
                    .orElseThrow(() -> new ResourceNotFoundException("Claim", "id", id));
        } catch (IllegalArgumentException e) {
            return claimRecordRepository.findByClaimNumber(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Claim", "claimNumber", id));
        }
    }

    @Transactional(readOnly = true)
    public ClaimRecordDto getClaimById(String id, String currentUserEmail) {
        AppUser currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", currentUserEmail));

        ClaimRecord claim = findClaimByIdOrNumber(id);

        // Farmers can only see their own claims
        if (currentUser.getRole().name().equals("FARMER") && !claim.getUserId().equals(currentUser.getId())) {
            throw new ResourceNotFoundException("Claim", "id", id);
        }

        return mapToDto(claim);
    }

    @Transactional
    public ClaimRecordDto updateClaimStatus(String id, ClaimStatusUpdateRequest request, String officerEmail) {
        AppUser currentUser = userRepository.findByEmail(officerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", officerEmail));
        if (currentUser.getRole() != com.cropnexus.backend.entity.enums.UserRole.OFFICER) {
            throw new org.springframework.security.access.AccessDeniedException("Only authorized officers can update claim status");
        }

        ClaimRecord claim = findClaimByIdOrNumber(id);

        ClaimStatus newStatus;
        try {
            newStatus = ClaimStatus.valueOf(request.getStatus().toUpperCase().replace("-", "_").trim());
        } catch (IllegalArgumentException e) {
            throw new BusinessRuleException("Invalid status: " + request.getStatus());
        }

        if (newStatus == ClaimStatus.REJECTED || newStatus == ClaimStatus.ADDITIONAL_INFO_REQUIRED) {
            if (request.getRemarks() == null || request.getRemarks().trim().isBlank()) {
                throw new BusinessRuleException("Mandatory remarks must be provided for status " + newStatus.name());
            }
        }

        claim.setStatus(newStatus);

        if (newStatus == ClaimStatus.APPROVED) {
            claim.setCompensationStatus(com.cropnexus.backend.entity.enums.CompensationStatus.RECOMMENDED);
            if (claim.getSanctionedCompensationAmount() == null && claim.getEstimatedCompensationAmount() != null) {
                claim.setSanctionedCompensationAmount(claim.getEstimatedCompensationAmount());
            }
        } else if (newStatus == ClaimStatus.REJECTED) {
            claim.setCompensationStatus(com.cropnexus.backend.entity.enums.CompensationStatus.NOT_ELIGIBLE);
        } else if (newStatus == ClaimStatus.VERIFIED) {
            claim.setCompensationStatus(com.cropnexus.backend.entity.enums.CompensationStatus.UNDER_ASSESSMENT);
        }

        String updatedBy = (request.getUpdatedBy() != null && !request.getUpdatedBy().isBlank())
                ? request.getUpdatedBy()
                : currentUser.getName();

        ClaimStatusHistory history = ClaimStatusHistory.builder()
                .status(newStatus.name())
                .timestamp(Instant.now())
                .remarks(request.getRemarks() != null ? request.getRemarks() : "")
                .updatedBy(updatedBy)
                .build();
        claim.getStatusHistory().add(history);

        claim = claimRecordRepository.save(claim);

        // Notify farmer
        notificationService.createNotification(
                claim.getUserId(),
                "Claim Status Updated",
                "Your claim " + claim.getClaimNumber() + " status has been updated to " + newStatus.name().toLowerCase().replace("_", " "),
                "claim_update",
                "/claims/" + claim.getId()
        );

        log.info("Claim {} status updated to {} by {}", claim.getClaimNumber(), newStatus, officerEmail);

        return mapToDto(claim);
    }

    private String generateClaimNumber() {
        int year = Year.now().getValue();
        int randomPart = 1000 + new Random().nextInt(9000);
        return String.format("CN-%d-MH-%04d", year, randomPart);
    }

    public ClaimRecordDto mapToDto(ClaimRecord claim) {
        List<ClaimRecordDto.StatusHistoryDto> historyDtos = claim.getStatusHistory().stream()
                .map(h -> ClaimRecordDto.StatusHistoryDto.builder()
                        .status(h.getStatus() != null ? h.getStatus().toLowerCase() : null)
                        .timestamp(h.getTimestamp() != null ? h.getTimestamp().toString() : null)
                        .remarks(h.getRemarks())
                        .updatedBy(h.getUpdatedBy())
                        .build())
                .collect(Collectors.toList());

        List<PhotoAttachmentDto> photoDtos = claim.getPhotos().stream()
                .map(p -> PhotoAttachmentDto.builder()
                        .id(p.getId().toString())
                        .url(p.getUrl())
                        .name(p.getName())
                        .uploadedAt(p.getUploadedAt() != null ? p.getUploadedAt().toString() : null)
                        .sizeBytes(p.getSizeBytes())
                        .latitude(p.getLatitude())
                        .longitude(p.getLongitude())
                        .caption(p.getCaption())
                        .build())
                .collect(Collectors.toList());

        return ClaimRecordDto.builder()
                .id(claim.getId().toString())
                .claimNumber(claim.getClaimNumber())
                .userId(claim.getUserId().toString())
                .farmerName(claim.getFarmerName())
                .farmerPhone(claim.getFarmerPhone())
                .cropName(claim.getCropName())
                .cropType(claim.getCropType())
                .state(claim.getState())
                .district(claim.getDistrict())
                .taluka(claim.getTaluka())
                .village(claim.getVillage())
                .surveyNumber(claim.getSurveyNumber())
                .totalLandAreaAcre(claim.getTotalLandAreaAcre())
                .affectedAreaAcre(claim.getAffectedAreaAcre())
                .damageDate(claim.getDamageDate() != null ? claim.getDamageDate().toString() : null)
                .damageCause(claim.getDamageCause() != null ? claim.getDamageCause().name().toLowerCase() : null)
                .estimatedLossPercentage(claim.getEstimatedLossPercentage())
                .damageDescription(claim.getDamageDescription())
                .photos(photoDtos)
                .submissionDate(claim.getSubmissionDate() != null ? claim.getSubmissionDate().toString() : null)
                .status(claim.getStatus() != null ? claim.getStatus().name().toLowerCase() : null)
                .compensationStatus(claim.getCompensationStatus() != null ? claim.getCompensationStatus().name().toLowerCase() : null)
                .estimatedCompensationAmount(claim.getEstimatedCompensationAmount())
                .sanctionedCompensationAmount(claim.getSanctionedCompensationAmount())
                .officerAssignedId(claim.getOfficerAssignedId() != null ? claim.getOfficerAssignedId().toString() : null)
                .officerAssignedName(claim.getOfficerAssignedName())
                .inspectionDate(claim.getInspectionDate() != null ? claim.getInspectionDate().toString() : null)
                .statusHistory(historyDtos)
                .build();
    }
}

