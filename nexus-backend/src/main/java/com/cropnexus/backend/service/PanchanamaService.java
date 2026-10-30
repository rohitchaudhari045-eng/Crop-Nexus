package com.cropnexus.backend.service;

import com.cropnexus.backend.dto.EPanchanamaDto;
import com.cropnexus.backend.dto.request.PanchanamaGenerateRequest;
import com.cropnexus.backend.dto.request.PanchanamaUpdateRequest;
import com.cropnexus.backend.entity.*;
import com.cropnexus.backend.entity.enums.ClaimStatus;
import com.cropnexus.backend.exception.ResourceNotFoundException;
import com.cropnexus.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PanchanamaService {

    private final EPanchanamaRepository ePanchanamaRepository;
    private final ClaimRecordRepository claimRecordRepository;
    private final InspectionRecordRepository inspectionRecordRepository;
    private final UserRepository userRepository;

    @Transactional
    public EPanchanamaDto generateOrUpdateDraft(ClaimRecord claim, InspectionRecord inspection, AppUser officer) {
        UUID claimId = claim.getId();

        Optional<EPanchanama> existing = ePanchanamaRepository.findByClaimId(claimId);

        var affectedArea = (inspection != null && inspection.getVerifiedAffectedAreaAcre() != null)
                ? inspection.getVerifiedAffectedAreaAcre()
                : claim.getAffectedAreaAcre();
        var lossPercentage = (inspection != null && inspection.getAssessedLossPercentage() != null)
                ? inspection.getAssessedLossPercentage()
                : claim.getEstimatedLossPercentage();
        var findings = (inspection != null && inspection.getOfficerObservations() != null && !inspection.getOfficerObservations().isBlank())
                ? inspection.getOfficerObservations()
                : "Provisional assessment compiled based on farmer intimation and revenue circle records.";

        EPanchanama panchanama;
        if (existing.isPresent()) {
            panchanama = existing.get();
            panchanama.setAffectedAreaAcre(affectedArea);
            panchanama.setDamagePercentage(lossPercentage);
            panchanama.setFindingsSummary(findings);
            panchanama.setOfficerName(officer.getName());
            if (claim.getDistrict() != null && !claim.getDistrict().isBlank()) {
                panchanama.setOfficerOffice("District Agriculture Office, " + claim.getDistrict());
            }
            panchanama = ePanchanamaRepository.save(panchanama);
            log.info("e-Panchanama draft updated: {} for claim: {}", panchanama.getReportNumber(), claim.getClaimNumber());
        } else {
            String reportNumber = generateReportNumber();
            panchanama = EPanchanama.builder()
                    .reportNumber(reportNumber)
                    .claimId(claimId)
                    .claimNumber(claim.getClaimNumber())
                    .dateGenerated(LocalDate.now())
                    .district(claim.getDistrict())
                    .taluka(claim.getTaluka())
                    .village(claim.getVillage())
                    .surveyNumber((inspection != null && inspection.getVerifiedSurveyNumber() != null) ? inspection.getVerifiedSurveyNumber() : claim.getSurveyNumber())
                    .farmerName(claim.getFarmerName())
                    .farmerPhone(claim.getFarmerPhone())
                    .cropName((inspection != null && inspection.getVerifiedCrop() != null) ? inspection.getVerifiedCrop() : claim.getCropName())
                    .calamityType((inspection != null && inspection.getDamageCauseConfirmed() != null)
                            ? inspection.getDamageCauseConfirmed().name().toLowerCase().replace("_", " ")
                            : (claim.getDamageCause() != null ? claim.getDamageCause().name().toLowerCase().replace("_", " ") : ""))
                    .calamityDate(claim.getDamageDate())
                    .totalAreaAcre(claim.getTotalLandAreaAcre())
                    .affectedAreaAcre(affectedArea)
                    .damagePercentage(lossPercentage)
                    .officerName(officer.getName())
                    .officerDesignation("Agriculture Officer")
                    .officerOffice("District Agriculture Office, " + (claim.getDistrict() != null ? claim.getDistrict() : "Maharashtra"))
                    .findingsSummary(findings)
                    .isDraft(true)
                    .build();
            panchanama = ePanchanamaRepository.save(panchanama);
            log.info("e-Panchanama generated: {} for claim: {}", reportNumber, claim.getClaimNumber());
        }
        return mapToDto(panchanama);
    }

    @Transactional
    public EPanchanamaDto generateDraft(PanchanamaGenerateRequest request, String officerEmail) {
        AppUser officer = userRepository.findByEmail(officerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Officer", "email", officerEmail));

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

        InspectionRecord inspection = inspectionRecordRepository.findByClaimId(claimId).orElse(null);

        EPanchanamaDto dto = generateOrUpdateDraft(claim, inspection, officer);

        // Only transition status to PANCHANAMA_DRAFTED if current status is prior to it
        if (claim.getStatus() == ClaimStatus.SUBMITTED || claim.getStatus() == ClaimStatus.UNDER_REVIEW || claim.getStatus() == ClaimStatus.INSPECTED) {
            claim.setStatus(ClaimStatus.PANCHANAMA_DRAFTED);
            ClaimStatusHistory history = ClaimStatusHistory.builder()
                    .status(ClaimStatus.PANCHANAMA_DRAFTED.name())
                    .timestamp(Instant.now())
                    .remarks("e-Panchanama drafted: " + dto.getReportNumber())
                    .updatedBy(officer.getName())
                    .build();
            claim.getStatusHistory().add(history);
            claimRecordRepository.save(claim);
        }

        return dto;
    }

    @Transactional(readOnly = true)
    public EPanchanamaDto getByClaimId(String claimId) {
        return getByClaimId(claimId, null);
    }

    @Transactional(readOnly = true)
    public EPanchanamaDto getByClaimId(String claimId, String currentUserEmail) {
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
            if (currentUser != null && currentUser.getRole() == com.cropnexus.backend.entity.enums.UserRole.FARMER && !claim.getUserId().equals(currentUser.getId())) {
                throw new ResourceNotFoundException("Panchanama", "claimId", claimId);
            }
        }

        EPanchanama panchanama = ePanchanamaRepository.findByClaimId(claim.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Panchanama", "claimId", claimId));
        return mapToDto(panchanama);
    }

    @Transactional
    public EPanchanamaDto updateDraft(String id, PanchanamaUpdateRequest request) {
        EPanchanama panchanama = ePanchanamaRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new ResourceNotFoundException("Panchanama", "id", id));

        if (request.getCropVariety() != null) panchanama.setCropVariety(request.getCropVariety());
        if (request.getSowingDate() != null) panchanama.setSowingDate(LocalDate.parse(request.getSowingDate()));
        if (request.getOfficerSignatureDate() != null) panchanama.setOfficerSignatureDate(LocalDate.parse(request.getOfficerSignatureDate()));
        if (request.getFindingsSummary() != null) panchanama.setFindingsSummary(request.getFindingsSummary());
        if (request.getOfficerDesignation() != null) panchanama.setOfficerDesignation(request.getOfficerDesignation());
        if (request.getOfficerOffice() != null) panchanama.setOfficerOffice(request.getOfficerOffice());
        if (request.getIsDraft() != null) panchanama.setDraft(request.getIsDraft());

        if (request.getWitnesses() != null) {
            List<PanchanamaWitness> witnesses = request.getWitnesses().stream()
                    .map(w -> PanchanamaWitness.builder()
                            .name(w.getName())
                            .aadhaarLast4(w.getAadhaarLast4())
                            .village(w.getVillage())
                            .contactNumber(w.getContactNumber())
                            .build())
                    .collect(Collectors.toList());
            panchanama.setWitnesses(witnesses);
        }

        panchanama = ePanchanamaRepository.save(panchanama);
        return mapToDto(panchanama);
    }

    private String generateReportNumber() {
        int year = Year.now().getValue();
        int randomPart = 100 + new Random().nextInt(900);
        return String.format("EPN-%d-MH-%03d", year, randomPart);
    }

    private EPanchanamaDto mapToDto(EPanchanama panchanama) {
        List<EPanchanamaDto.WitnessDto> witnessDtos = panchanama.getWitnesses().stream()
                .map(w -> EPanchanamaDto.WitnessDto.builder()
                        .name(w.getName())
                        .aadhaarLast4(w.getAadhaarLast4())
                        .village(w.getVillage())
                        .contactNumber(w.getContactNumber())
                        .build())
                .collect(Collectors.toList());

        return EPanchanamaDto.builder()
                .id(panchanama.getId().toString())
                .reportNumber(panchanama.getReportNumber())
                .claimId(panchanama.getClaimId().toString())
                .claimNumber(panchanama.getClaimNumber())
                .dateGenerated(panchanama.getDateGenerated() != null ? panchanama.getDateGenerated().toString() : null)
                .district(panchanama.getDistrict())
                .taluka(panchanama.getTaluka())
                .village(panchanama.getVillage())
                .surveyNumber(panchanama.getSurveyNumber())
                .farmerName(panchanama.getFarmerName())
                .farmerPhone(panchanama.getFarmerPhone())
                .cropName(panchanama.getCropName())
                .cropVariety(panchanama.getCropVariety())
                .sowingDate(panchanama.getSowingDate() != null ? panchanama.getSowingDate().toString() : null)
                .calamityType(panchanama.getCalamityType())
                .calamityDate(panchanama.getCalamityDate() != null ? panchanama.getCalamityDate().toString() : null)
                .totalAreaAcre(panchanama.getTotalAreaAcre())
                .affectedAreaAcre(panchanama.getAffectedAreaAcre())
                .damagePercentage(panchanama.getDamagePercentage())
                .officerName(panchanama.getOfficerName())
                .officerDesignation(panchanama.getOfficerDesignation())
                .officerOffice(panchanama.getOfficerOffice())
                .officerSignatureDate(panchanama.getOfficerSignatureDate() != null ? panchanama.getOfficerSignatureDate().toString() : null)
                .findingsSummary(panchanama.getFindingsSummary())
                .witnesses(witnessDtos)
                .isDraft(panchanama.isDraft())
                .officialDisclaimer(panchanama.getOfficialDisclaimer())
                .build();
    }
}

