package com.cropnexus.backend.service;

import com.cropnexus.backend.dto.EPanchanamaDto;
import com.cropnexus.backend.dto.InspectionRecordDto;
import com.cropnexus.backend.dto.PhotoAttachmentDto;
import com.cropnexus.backend.dto.request.InspectionRequest;
import com.cropnexus.backend.entity.AppUser;
import com.cropnexus.backend.entity.ClaimRecord;
import com.cropnexus.backend.entity.EPanchanama;
import com.cropnexus.backend.entity.InspectionRecord;
import com.cropnexus.backend.entity.enums.ClaimStatus;
import com.cropnexus.backend.entity.enums.CompensationStatus;
import com.cropnexus.backend.entity.enums.DamageCause;
import com.cropnexus.backend.entity.enums.InspectionRecommendation;
import com.cropnexus.backend.entity.enums.InspectionStatus;
import com.cropnexus.backend.entity.enums.UserRole;
import com.cropnexus.backend.exception.BusinessRuleException;
import com.cropnexus.backend.exception.ResourceNotFoundException;
import com.cropnexus.backend.repository.ClaimRecordRepository;
import com.cropnexus.backend.repository.EPanchanamaRepository;
import com.cropnexus.backend.repository.InspectionRecordRepository;
import com.cropnexus.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.access.AccessDeniedException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InspectionServiceTest {

    @Mock
    private InspectionRecordRepository inspectionRecordRepository;

    @Mock
    private ClaimRecordRepository claimRecordRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PanchanamaService panchanamaService;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private InspectionService inspectionService;

    private AppUser officerUser;
    private AppUser farmerUser;
    private ClaimRecord testClaim;
    private UUID claimId;
    private UUID officerId;
    private UUID farmerId;

    @BeforeEach
    void setUp() {
        claimId = UUID.randomUUID();
        officerId = UUID.randomUUID();
        farmerId = UUID.randomUUID();

        officerUser = AppUser.builder()
                .id(officerId)
                .name("Suresh Deshmukh")
                .email("suresh.officer@agri.gov.in")
                .role(UserRole.OFFICER)
                .build();

        farmerUser = AppUser.builder()
                .id(farmerId)
                .name("Akshay Patil")
                .email("akshay.farmer@example.com")
                .role(UserRole.FARMER)
                .build();

        testClaim = ClaimRecord.builder()
                .id(claimId)
                .claimNumber("CN-2026-MH-4863")
                .userId(farmerId)
                .farmerName("Akshay Patil")
                .farmerPhone("9876543210")
                .cropName("Tomato")
                .district("Sangli")
                .taluka("Miraj")
                .village("Kupwad")
                .surveyNumber("108/2")
                .totalLandAreaAcre(new BigDecimal("5.000"))
                .affectedAreaAcre(new BigDecimal("2.500"))
                .estimatedLossPercentage(65)
                .damageCause(DamageCause.HEAVY_RAINFALL)
                .status(ClaimStatus.SUBMITTED)
                .compensationStatus(CompensationStatus.UNDER_ASSESSMENT)
                .statusHistory(new ArrayList<>())
                .photos(new ArrayList<>())
                .build();
    }

    private InspectionRequest createValidRequest() {
        InspectionRequest req = new InspectionRequest();
        req.setClaimId(claimId.toString());
        req.setInspectionDate("2026-10-30");
        req.setGpsLatitude(16.7124);
        req.setGpsLongitude(74.5218);
        req.setVerifiedCrop("Tomato");
        req.setVerifiedSurveyNumber("108/2");
        req.setVerifiedAffectedAreaAcre(new BigDecimal("2.500"));
        req.setAssessedLossPercentage(70);
        req.setDamageCauseConfirmed("HEAVY_RAINFALL");
        req.setCropGrowthStage("MATURITY");
        req.setOfficerObservations("Joint field appraisal confirmed extensive rotting due to water stagnation.");
        req.setRecommendation("APPROVE_FULL");
        req.setRecommendedCompensationAmount(new BigDecimal("46250.00"));
        req.setNextStatus("VERIFIED");
        req.setOfficerRemarks("Field loss verified above SDRF threshold; recommended for full compensation.");
        req.setGeneratePanchanama(true);

        PhotoAttachmentDto photo = PhotoAttachmentDto.builder()
                .url("http://example.com/photo1.jpg")
                .name("tomato_damage.jpg")
                .sizeBytes(120400L)
                .caption("Rotting plants")
                .build();
        req.setEvidencePhotos(List.of(photo));
        return req;
    }

    @Test
    void submitInspection_Success_AssociatesCorrectClaimAndOfficer_UpdatesStatus() {
        InspectionRequest req = createValidRequest();

        when(userRepository.findByEmail(officerUser.getEmail())).thenReturn(Optional.of(officerUser));
        when(claimRecordRepository.findById(claimId)).thenReturn(Optional.of(testClaim));
        when(inspectionRecordRepository.findByClaimId(claimId)).thenReturn(Optional.empty());

        UUID generatedInspId = UUID.randomUUID();
        when(inspectionRecordRepository.save(any(InspectionRecord.class))).thenAnswer(invocation -> {
            InspectionRecord rec = invocation.getArgument(0);
            if (rec.getId() == null) rec.setId(generatedInspId);
            return rec;
        });

        EPanchanamaDto mockPanchanama = EPanchanamaDto.builder()
                .id(UUID.randomUUID().toString())
                .reportNumber("EPN-2026-MH-999")
                .build();
        when(panchanamaService.generateOrUpdateDraft(any(), any(), any())).thenReturn(mockPanchanama);

        InspectionRecordDto result = inspectionService.submitInspection(req, officerUser.getEmail());

        assertThat(result).isNotNull();
        assertThat(result.getClaimId()).isEqualTo(claimId.toString());
        assertThat(result.getOfficerId()).isEqualTo(officerId.toString());
        assertThat(result.getClaimStatus()).isEqualTo("verified");
        assertThat(result.getPanchanamaReportNumber()).isEqualTo("EPN-2026-MH-999");

        assertThat(testClaim.getStatus()).isEqualTo(ClaimStatus.VERIFIED);
        assertThat(testClaim.getOfficerAssignedId()).isEqualTo(officerId);
        assertThat(testClaim.getStatusHistory()).isNotEmpty();
        assertThat(testClaim.getStatusHistory().get(0).getStatus()).isEqualTo("VERIFIED");

        verify(notificationService).createNotification(eq(farmerId), anyString(), anyString(), eq("claim_update"), anyString());
    }

    @Test
    void submitInspection_PreventsDuplicate_UpdatesExistingInspectionRecord() {
        InspectionRequest req = createValidRequest();
        UUID existingInspId = UUID.randomUUID();
        InspectionRecord existingRecord = InspectionRecord.builder()
                .id(existingInspId)
                .claimId(claimId)
                .status(InspectionStatus.DRAFT)
                .build();

        when(userRepository.findByEmail(officerUser.getEmail())).thenReturn(Optional.of(officerUser));
        when(claimRecordRepository.findById(claimId)).thenReturn(Optional.of(testClaim));
        when(inspectionRecordRepository.findByClaimId(claimId)).thenReturn(Optional.of(existingRecord));
        when(inspectionRecordRepository.save(any(InspectionRecord.class))).thenAnswer(invocation -> invocation.getArgument(0));

        InspectionRecordDto result = inspectionService.submitInspection(req, officerUser.getEmail());

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(existingInspId.toString());
        verify(inspectionRecordRepository, atLeastOnce()).save(existingRecord);
    }

    @Test
    void submitInspection_Unauthorized_RejectsNonOfficer() {
        InspectionRequest req = createValidRequest();
        when(userRepository.findByEmail(farmerUser.getEmail())).thenReturn(Optional.of(farmerUser));

        assertThatThrownBy(() -> inspectionService.submitInspection(req, farmerUser.getEmail()))
                .isInstanceOf(AccessDeniedException.class)
                .hasMessageContaining("Only authorized government officers");
    }

    @Test
    void submitInspection_ThrowsResourceNotFound_WhenClaimDoesNotExist() {
        InspectionRequest req = createValidRequest();
        UUID nonExistentClaim = UUID.randomUUID();
        req.setClaimId(nonExistentClaim.toString());

        when(userRepository.findByEmail(officerUser.getEmail())).thenReturn(Optional.of(officerUser));
        when(claimRecordRepository.findById(nonExistentClaim)).thenReturn(Optional.empty());
        when(claimRecordRepository.findByClaimNumber(nonExistentClaim.toString())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> inspectionService.submitInspection(req, officerUser.getEmail()))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Claim");
    }

    @Test
    void submitInspection_RejectsRejection_WhenRemarksMissing() {
        InspectionRequest req = createValidRequest();
        req.setRecommendation("REJECT");
        req.setNextStatus("REJECTED");
        req.setOfficerRemarks(""); // empty remarks

        when(userRepository.findByEmail(officerUser.getEmail())).thenReturn(Optional.of(officerUser));
        when(claimRecordRepository.findById(claimId)).thenReturn(Optional.of(testClaim));

        assertThatThrownBy(() -> inspectionService.submitInspection(req, officerUser.getEmail()))
                .isInstanceOf(BusinessRuleException.class)
                .hasMessageContaining("Mandatory remarks must be provided when rejecting a claim");
    }

    @Test
    void submitInspection_RejectsAdditionalInfo_WhenRemarksMissing() {
        InspectionRequest req = createValidRequest();
        req.setNextStatus("ADDITIONAL_INFO_REQUIRED");
        req.setOfficerRemarks("   "); // blank remarks

        when(userRepository.findByEmail(officerUser.getEmail())).thenReturn(Optional.of(officerUser));
        when(claimRecordRepository.findById(claimId)).thenReturn(Optional.of(testClaim));

        assertThatThrownBy(() -> inspectionService.submitInspection(req, officerUser.getEmail()))
                .isInstanceOf(BusinessRuleException.class)
                .hasMessageContaining("specifying the additional information required");
    }

    @Test
    void submitInspection_RejectsApproval_WhenRecommendationIsReject() {
        InspectionRequest req = createValidRequest();
        req.setRecommendation("REJECT");
        req.setNextStatus("APPROVED");
        req.setOfficerRemarks("Trying to approve despite rejecting recommendation");

        when(userRepository.findByEmail(officerUser.getEmail())).thenReturn(Optional.of(officerUser));
        when(claimRecordRepository.findById(claimId)).thenReturn(Optional.of(testClaim));

        assertThatThrownBy(() -> inspectionService.submitInspection(req, officerUser.getEmail()))
                .isInstanceOf(BusinessRuleException.class)
                .hasMessageContaining("Cannot approve claim when officer recommendation is to reject");
    }

    @Test
    void submitInspection_RejectsApproval_WhenReInspectionRequired() {
        InspectionRequest req = createValidRequest();
        req.setRecommendation("RE_INSPECTION_NEEDED");
        req.setNextStatus("APPROVED");
        req.setOfficerRemarks("Trying to approve while re-inspection needed");

        when(userRepository.findByEmail(officerUser.getEmail())).thenReturn(Optional.of(officerUser));
        when(claimRecordRepository.findById(claimId)).thenReturn(Optional.of(testClaim));

        assertThatThrownBy(() -> inspectionService.submitInspection(req, officerUser.getEmail()))
                .isInstanceOf(BusinessRuleException.class)
                .hasMessageContaining("Cannot approve claim while re-inspection is required");
    }

    @Test
    void getInspectionByClaimId_DeniesFarmerAccessToOtherFarmerClaim() {
        AppUser otherFarmer = AppUser.builder()
                .id(UUID.randomUUID())
                .email("other.farmer@example.com")
                .role(UserRole.FARMER)
                .build();

        when(claimRecordRepository.findById(claimId)).thenReturn(Optional.of(testClaim));
        when(userRepository.findByEmail(otherFarmer.getEmail())).thenReturn(Optional.of(otherFarmer));

        assertThatThrownBy(() -> inspectionService.getInspectionByClaimId(claimId.toString(), otherFarmer.getEmail()))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}

