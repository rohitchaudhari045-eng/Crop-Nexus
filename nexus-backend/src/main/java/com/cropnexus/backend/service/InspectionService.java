package com.cropnexus.backend.service;

import com.cropnexus.backend.dto.EPanchanamaDto;
import com.cropnexus.backend.dto.InspectionRecordDto;
import com.cropnexus.backend.dto.PhotoAttachmentDto;
import com.cropnexus.backend.dto.request.InspectionRequest;
import com.cropnexus.backend.entity.AppUser;
import com.cropnexus.backend.entity.ClaimRecord;
import com.cropnexus.backend.entity.ClaimStatusHistory;
import com.cropnexus.backend.entity.InspectionPhoto;
import com.cropnexus.backend.entity.InspectionRecord;
import com.cropnexus.backend.entity.enums.*;
import com.cropnexus.backend.exception.BusinessRuleException;
import com.cropnexus.backend.exception.ResourceNotFoundException;
import com.cropnexus.backend.repository.ClaimRecordRepository;
import com.cropnexus.backend.repository.InspectionRecordRepository;
import com.cropnexus.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class InspectionService {

    private final InspectionRecordRepository inspectionRecordRepository;
    private final ClaimRecordRepository claimRecordRepository;
    private final UserRepository userRepository;
    private final PanchanamaService panchanamaService;
    private final NotificationService notificationService;

    @Transactional
    public InspectionRecordDto submitInspection(InspectionRequest request, String officerEmail) {
        AppUser officer = userRepository.findByEmail(officerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Officer", "email", officerEmail));

        if (officer.getRole() != UserRole.OFFICER) {
            throw new AccessDeniedException("Only authorized government officers can submit inspection reports");
        }

        ClaimRecord claim;
        try {
            claim = claimRecordRepository.findById(UUID.fromString(request.getClaimId()))
                    .or(() -> claimRecordRepository.findByClaimNumber(request.getClaimId()))
                    .orElseThrow(() -> new ResourceNotFoundException("Claim", "id", request.getClaimId()));
        } catch (IllegalArgumentException e) {
            claim = claimRecordRepository.findByClaimNumber(request.getClaimId())
                    .orElseThrow(() -> new ResourceNotFoundException("Claim", "claimNumber", request.getClaimId()));
        }
        UUID claimId = claim.getId();

        // Parse recommendation
        InspectionRecommendation recommendation;
        try {
            recommendation = InspectionRecommendation.valueOf(
                    request.getRecommendation().toUpperCase().replace("-", "_").trim()
            );
        } catch (IllegalArgumentException e) {
            throw new BusinessRuleException("Invalid inspection recommendation: " + request.getRecommendation());
        }

        // Determine next status and validate transition
        ClaimStatus nextStatus = determineNextClaimStatus(
                request.getNextStatus(),
                recommendation,
                request.getAssessedLossPercentage(),
                request.getOfficerRemarks()
        );

        validateWorkflowTransition(
                claim.getStatus(),
                nextStatus,
                recommendation,
                request.getAssessedLossPercentage(),
                request.getOfficerRemarks()
        );

        // 1. Save or update inspection record (preventing duplicates)
        Optional<InspectionRecord> existingInspectionOpt = inspectionRecordRepository.findByClaimId(claimId);
        InspectionRecord inspection;
        if (existingInspectionOpt.isPresent()) {
            inspection = existingInspectionOpt.get();
            inspection.setOfficerId(officer.getId());
            inspection.setOfficerName(officer.getName());
            inspection.setInspectionDate(LocalDate.parse(request.getInspectionDate()));
            inspection.setGpsLatitude(request.getGpsLatitude());
            inspection.setGpsLongitude(request.getGpsLongitude());
            inspection.setVerifiedCrop(request.getVerifiedCrop());
            inspection.setVerifiedSurveyNumber(request.getVerifiedSurveyNumber());
            inspection.setVerifiedAffectedAreaAcre(request.getVerifiedAffectedAreaAcre());
            inspection.setAssessedLossPercentage(request.getAssessedLossPercentage());
            inspection.setDamageCauseConfirmed(DamageCause.valueOf(request.getDamageCauseConfirmed().toUpperCase().replace("-", "_").trim()));
            inspection.setOfficerObservations(request.getOfficerObservations());
            inspection.setCropGrowthStage(CropGrowthStage.valueOf(request.getCropGrowthStage().toUpperCase().replace("-", "_").trim()));
            inspection.setRecommendation(recommendation);
            inspection.setRecommendedCompensationAmount(request.getRecommendedCompensationAmount());
            inspection.setStatus(InspectionStatus.FINALIZED);
        } else {
            inspection = InspectionRecord.builder()
                    .claimId(claimId)
                    .claimNumber(claim.getClaimNumber())
                    .officerId(officer.getId())
                    .officerName(officer.getName())
                    .inspectionDate(LocalDate.parse(request.getInspectionDate()))
                    .gpsLatitude(request.getGpsLatitude())
                    .gpsLongitude(request.getGpsLongitude())
                    .verifiedCrop(request.getVerifiedCrop())
                    .verifiedSurveyNumber(request.getVerifiedSurveyNumber())
                    .verifiedAffectedAreaAcre(request.getVerifiedAffectedAreaAcre())
                    .assessedLossPercentage(request.getAssessedLossPercentage())
                    .damageCauseConfirmed(DamageCause.valueOf(request.getDamageCauseConfirmed().toUpperCase().replace("-", "_").trim()))
                    .officerObservations(request.getOfficerObservations())
                    .cropGrowthStage(CropGrowthStage.valueOf(request.getCropGrowthStage().toUpperCase().replace("-", "_").trim()))
                    .recommendation(recommendation)
                    .recommendedCompensationAmount(request.getRecommendedCompensationAmount())
                    .status(InspectionStatus.FINALIZED)
                    .build();
        }

        InspectionRecord saved = inspectionRecordRepository.save(inspection);

        // Save evidence photos safely with the persisted inspection's ID
        if (request.getEvidencePhotos() != null && !request.getEvidencePhotos().isEmpty()) {
            saved.getEvidencePhotos().clear();
            for (PhotoAttachmentDto photoDto : request.getEvidencePhotos()) {
                if (photoDto.getUrl() == null || photoDto.getUrl().isBlank()) {
                    continue;
                }
                InspectionPhoto photo = InspectionPhoto.builder()
                        .inspectionId(saved.getId())
                        .url(photoDto.getUrl())
                        .name(photoDto.getName() != null ? photoDto.getName() : "evidence.jpg")
                        .sizeBytes(photoDto.getSizeBytes() != null ? photoDto.getSizeBytes() : 0L)
                        .latitude(photoDto.getLatitude())
                        .longitude(photoDto.getLongitude())
                        .caption(photoDto.getCaption())
                        .build();
                saved.getEvidencePhotos().add(photo);
            }
            saved = inspectionRecordRepository.save(saved);
        }

        // 2. Generate or update Panchanama draft atomically
        EPanchanamaDto panchanamaDto = null;
        if (request.getGeneratePanchanama() == null || Boolean.TRUE.equals(request.getGeneratePanchanama())) {
            panchanamaDto = panchanamaService.generateOrUpdateDraft(claim, saved, officer);
        }

        // 3. Update claim status & audit history
        ClaimStatus previousStatus = claim.getStatus();
        claim.setStatus(nextStatus);
        claim.setInspectionDate(LocalDate.parse(request.getInspectionDate()));
        claim.setOfficerAssignedId(officer.getId());
        claim.setOfficerAssignedName(officer.getName());
        if (request.getRecommendedCompensationAmount() != null) {
            claim.setEstimatedCompensationAmount(request.getRecommendedCompensationAmount());
        }

        // Update compensation status aligned with decision
        updateCompensationStatus(claim, nextStatus, recommendation);

        // Format remarks
        String remarks = (request.getOfficerRemarks() != null && !request.getOfficerRemarks().isBlank())
                ? request.getOfficerRemarks().trim()
                : String.format("Inspection recorded by %s. Recommendation: %s, Assessed Loss: %d%%.",
                        officer.getName(), recommendation.name(), request.getAssessedLossPercentage());

        ClaimStatusHistory history = ClaimStatusHistory.builder()
                .status(nextStatus.name())
                .timestamp(Instant.now())
                .remarks(remarks)
                .updatedBy(officer.getName())
                .build();
        claim.getStatusHistory().add(history);
        claimRecordRepository.save(claim);

        // 4. Send notification to farmer
        notificationService.createNotification(
                claim.getUserId(),
                "Claim Status Updated: " + formatStatusLabel(nextStatus),
                String.format("Officer %s recorded inspection for claim %s. Status moved to %s.",
                        officer.getName(), claim.getClaimNumber(), formatStatusLabel(nextStatus)),
                "claim_update",
                "/claims/" + claim.getId()
        );

        log.info("Inspection recorded for claim: {} by officer: {}. Previous status: {}, New status: {}",
                claim.getClaimNumber(), officerEmail, previousStatus, nextStatus);

        InspectionRecordDto dto = mapToDto(saved);
        dto.setClaimStatus(nextStatus.name().toLowerCase());
        dto.setCompensationStatus(claim.getCompensationStatus() != null ? claim.getCompensationStatus().name().toLowerCase() : null);
        dto.setOfficerRemarks(remarks);
        if (panchanamaDto != null) {
            dto.setPanchanamaId(panchanamaDto.getId());
            dto.setPanchanamaReportNumber(panchanamaDto.getReportNumber());
        }
        return dto;
    }

    private ClaimStatus determineNextClaimStatus(String requestedNextStatus,
                                                InspectionRecommendation recommendation,
                                                Integer lossPercentage,
                                                String remarks) {
        if (requestedNextStatus != null && !requestedNextStatus.isBlank()) {
            try {
                return ClaimStatus.valueOf(requestedNextStatus.toUpperCase().replace("-", "_").trim());
            } catch (IllegalArgumentException e) {
                throw new BusinessRuleException("Invalid workflow status: " + requestedNextStatus);
            }
        }
        // Sensible default based on recommendation
        if (recommendation == InspectionRecommendation.REJECT) {
            return ClaimStatus.REJECTED;
        } else if (recommendation == InspectionRecommendation.RE_INSPECTION_NEEDED) {
            return ClaimStatus.INSPECTION_SCHEDULED;
        } else {
            return ClaimStatus.PANCHANAMA_DRAFTED;
        }
    }

    private void validateWorkflowTransition(ClaimStatus currentStatus,
                                            ClaimStatus nextStatus,
                                            InspectionRecommendation recommendation,
                                            Integer lossPercentage,
                                            String remarks) {
        // Validation 1: Remarks mandatory for rejection
        if (nextStatus == ClaimStatus.REJECTED || recommendation == InspectionRecommendation.REJECT) {
            if (remarks == null || remarks.trim().isBlank()) {
                throw new BusinessRuleException("Mandatory remarks must be provided when rejecting a claim.");
            }
        }

        // Validation 2: Remarks mandatory when requesting additional info
        if (nextStatus == ClaimStatus.ADDITIONAL_INFO_REQUIRED) {
            if (remarks == null || remarks.trim().isBlank()) {
                throw new BusinessRuleException("Mandatory remarks must be provided specifying the additional information required.");
            }
        }

        // Validation 3: Remarks mandatory when scheduling re-inspection
        if (nextStatus == ClaimStatus.INSPECTION_SCHEDULED || recommendation == InspectionRecommendation.RE_INSPECTION_NEEDED) {
            if (remarks == null || remarks.trim().isBlank()) {
                throw new BusinessRuleException("Mandatory remarks must be provided explaining why a re-inspection is needed.");
            }
        }

        // Validation 4: Cannot approve if recommendation is REJECT or RE_INSPECTION_NEEDED
        if (nextStatus == ClaimStatus.APPROVED) {
            if (recommendation == InspectionRecommendation.REJECT) {
                throw new BusinessRuleException("Cannot approve claim when officer recommendation is to reject.");
            }
            if (recommendation == InspectionRecommendation.RE_INSPECTION_NEEDED) {
                throw new BusinessRuleException("Cannot approve claim while re-inspection is required.");
            }
            if (lossPercentage == null || lossPercentage < 1) {
                throw new BusinessRuleException("Cannot approve claim with zero or unrecorded damage loss percentage.");
            }
        }
    }

    private void updateCompensationStatus(ClaimRecord claim, ClaimStatus nextStatus, InspectionRecommendation recommendation) {
        if (nextStatus == ClaimStatus.APPROVED) {
            claim.setCompensationStatus(CompensationStatus.RECOMMENDED);
            if (claim.getSanctionedCompensationAmount() == null && claim.getEstimatedCompensationAmount() != null) {
                claim.setSanctionedCompensationAmount(claim.getEstimatedCompensationAmount());
            }
        } else if (nextStatus == ClaimStatus.REJECTED) {
            claim.setCompensationStatus(CompensationStatus.NOT_ELIGIBLE);
        } else if (nextStatus == ClaimStatus.VERIFIED) {
            claim.setCompensationStatus(CompensationStatus.UNDER_ASSESSMENT);
        } else if (nextStatus == ClaimStatus.PANCHANAMA_DRAFTED || nextStatus == ClaimStatus.INSPECTED) {
            claim.setCompensationStatus(CompensationStatus.UNDER_ASSESSMENT);
        }
    }

    private String formatStatusLabel(ClaimStatus status) {
        return switch (status) {
            case SUBMITTED -> "Application Submitted";
            case UNDER_REVIEW -> "Under Initial Review";
            case ADDITIONAL_INFO_REQUIRED -> "Additional Information Required";
            case INSPECTION_SCHEDULED -> "Field Inspection Pending";
            case INSPECTED -> "Field Inspection Completed";
            case PANCHANAMA_DRAFTED -> "e-Panchanama Drafted";
            case VERIFIED -> "Under Eligibility Assessment";
            case APPROVED -> "Approved";
            case REJECTED -> "Rejected";
        };
    }

    @Transactional(readOnly = true)
    public List<InspectionRecordDto> getAllInspections() {
        return inspectionRecordRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public InspectionRecordDto getInspectionByClaimId(String claimId) {
        return getInspectionByClaimId(claimId, null);
    }

    @Transactional(readOnly = true)
    public InspectionRecordDto getInspectionByClaimId(String claimId, String currentUserEmail) {
        ClaimRecord claim;
        try {
            claim = claimRecordRepository.findById(UUID.fromString(claimId))
                    .or(() -> claimRecordRepository.findByClaimNumber(claimId))
                    .orElseThrow(() -> new ResourceNotFoundException("Claim", "id", claimId));
        } catch (IllegalArgumentException e) {
            claim = claimRecordRepository.findByClaimNumber(claimId)
                    .orElseThrow(() -> new ResourceNotFoundException("Claim", "claimNumber", claimId));
        }

        if (currentUserEmail != null) {
            AppUser currentUser = userRepository.findByEmail(currentUserEmail).orElse(null);
            if (currentUser != null && currentUser.getRole() == UserRole.FARMER && !claim.getUserId().equals(currentUser.getId())) {
                throw new ResourceNotFoundException("Inspection", "claimId", claimId);
            }
        }

        InspectionRecord inspection = inspectionRecordRepository.findByClaimId(claim.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Inspection", "claimId", claimId));
        return mapToDto(inspection);
    }

    private InspectionRecordDto mapToDto(InspectionRecord inspection) {
        InspectionRecordDto.GpsCoordinatesDto gps = null;
        if (inspection.getGpsLatitude() != null && inspection.getGpsLongitude() != null) {
            gps = InspectionRecordDto.GpsCoordinatesDto.builder()
                    .latitude(inspection.getGpsLatitude())
                    .longitude(inspection.getGpsLongitude())
                    .build();
        }

        List<PhotoAttachmentDto> photoDtos = inspection.getEvidencePhotos().stream()
                .map(p -> PhotoAttachmentDto.builder()
                        .id(p.getId() != null ? p.getId().toString() : null)
                        .url(p.getUrl())
                        .name(p.getName())
                        .uploadedAt(p.getUploadedAt() != null ? p.getUploadedAt().toString() : null)
                        .sizeBytes(p.getSizeBytes())
                        .latitude(p.getLatitude())
                        .longitude(p.getLongitude())
                        .caption(p.getCaption())
                        .build())
                .collect(Collectors.toList());

        return InspectionRecordDto.builder()
                .id(inspection.getId().toString())
                .claimId(inspection.getClaimId().toString())
                .claimNumber(inspection.getClaimNumber())
                .officerId(inspection.getOfficerId().toString())
                .officerName(inspection.getOfficerName())
                .inspectionDate(inspection.getInspectionDate() != null ? inspection.getInspectionDate().toString() : null)
                .gpsCoordinates(gps)
                .verifiedCrop(inspection.getVerifiedCrop())
                .verifiedSurveyNumber(inspection.getVerifiedSurveyNumber())
                .verifiedAffectedAreaAcre(inspection.getVerifiedAffectedAreaAcre())
                .assessedLossPercentage(inspection.getAssessedLossPercentage())
                .damageCauseConfirmed(inspection.getDamageCauseConfirmed() != null ? inspection.getDamageCauseConfirmed().name().toLowerCase() : null)
                .officerObservations(inspection.getOfficerObservations())
                .cropGrowthStage(inspection.getCropGrowthStage() != null ? inspection.getCropGrowthStage().name().toLowerCase() : null)
                .evidencePhotos(photoDtos)
                .recommendation(inspection.getRecommendation() != null ? inspection.getRecommendation().name().toLowerCase() : null)
                .recommendedCompensationAmount(inspection.getRecommendedCompensationAmount())
                .status(inspection.getStatus() != null ? inspection.getStatus().name().toLowerCase() : null)
                .createdAt(inspection.getCreatedAt() != null ? inspection.getCreatedAt().toString() : null)
                .build();
    }
}
