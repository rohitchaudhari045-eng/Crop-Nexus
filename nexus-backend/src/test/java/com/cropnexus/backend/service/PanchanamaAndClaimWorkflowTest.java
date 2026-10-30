package com.cropnexus.backend.service;

import com.cropnexus.backend.dto.ClaimRecordDto;
import com.cropnexus.backend.dto.EPanchanamaDto;
import com.cropnexus.backend.dto.request.ClaimStatusUpdateRequest;
import com.cropnexus.backend.dto.request.PanchanamaGenerateRequest;
import com.cropnexus.backend.entity.AppUser;
import com.cropnexus.backend.entity.ClaimRecord;
import com.cropnexus.backend.entity.EPanchanama;
import com.cropnexus.backend.entity.InspectionRecord;
import com.cropnexus.backend.entity.enums.ClaimStatus;
import com.cropnexus.backend.entity.enums.CompensationStatus;
import com.cropnexus.backend.entity.enums.DamageCause;
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
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PanchanamaAndClaimWorkflowTest {

    @Mock
    private EPanchanamaRepository ePanchanamaRepository;

    @Mock
    private ClaimRecordRepository claimRecordRepository;

    @Mock
    private InspectionRecordRepository inspectionRecordRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private PanchanamaService panchanamaService;

    @InjectMocks
    private ClaimService claimService;

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
                .status(ClaimStatus.INSPECTED)
                .compensationStatus(CompensationStatus.UNDER_ASSESSMENT)
                .statusHistory(new ArrayList<>())
                .photos(new ArrayList<>())
                .build();
    }

    @Test
    void panchanama_PreventsDuplicates_UpdatesExistingDraft() {
        UUID existingPanchanamaId = UUID.randomUUID();
        EPanchanama existingPanchanama = EPanchanama.builder()
                .id(existingPanchanamaId)
                .reportNumber("EPN-2026-MH-148")
                .claimId(claimId)
                .claimNumber("CN-2026-MH-4863")
                .isDraft(true)
                .witnesses(new ArrayList<>())
                .build();

        InspectionRecord inspection = InspectionRecord.builder()
                .claimId(claimId)
                .verifiedAffectedAreaAcre(new BigDecimal("3.000"))
                .assessedLossPercentage(75)
                .officerObservations("Updated field observations")
                .build();

        when(userRepository.findByEmail(officerUser.getEmail())).thenReturn(Optional.of(officerUser));
        when(claimRecordRepository.findById(claimId)).thenReturn(Optional.of(testClaim));
        when(ePanchanamaRepository.findByClaimId(claimId)).thenReturn(Optional.of(existingPanchanama));
        when(inspectionRecordRepository.findByClaimId(claimId)).thenReturn(Optional.of(inspection));
        when(ePanchanamaRepository.save(any(EPanchanama.class))).thenAnswer(invocation -> invocation.getArgument(0));

        PanchanamaGenerateRequest request = new PanchanamaGenerateRequest();
        request.setClaimId(claimId.toString());

        EPanchanamaDto result = panchanamaService.generateDraft(request, officerUser.getEmail());

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(existingPanchanamaId.toString());
        assertThat(result.getReportNumber()).isEqualTo("EPN-2026-MH-148");
        assertThat(result.getAffectedAreaAcre()).isEqualTo(new BigDecimal("3.000"));
        assertThat(result.getDamagePercentage()).isEqualTo(75);
    }

    @Test
    void panchanama_GetByClaimId_DeniesFarmerAccessToOtherFarmerClaim() {
        AppUser otherFarmer = AppUser.builder()
                .id(UUID.randomUUID())
                .email("intruder.farmer@example.com")
                .role(UserRole.FARMER)
                .build();

        when(claimRecordRepository.findById(claimId)).thenReturn(Optional.of(testClaim));
        when(userRepository.findByEmail(otherFarmer.getEmail())).thenReturn(Optional.of(otherFarmer));

        assertThatThrownBy(() -> panchanamaService.getByClaimId(claimId.toString(), otherFarmer.getEmail()))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void updateClaimStatus_RejectsFarmerRole() {
        ClaimStatusUpdateRequest request = new ClaimStatusUpdateRequest();
        request.setStatus("APPROVED");
        request.setRemarks("Attempted self-approval");

        when(userRepository.findByEmail(farmerUser.getEmail())).thenReturn(Optional.of(farmerUser));

        assertThatThrownBy(() -> claimService.updateClaimStatus(claimId.toString(), request, farmerUser.getEmail()))
                .isInstanceOf(AccessDeniedException.class)
                .hasMessageContaining("Only authorized officers can update claim status");
    }

    @Test
    void updateClaimStatus_OfficerCanUpdate_RequiresRemarksForRejection() {
        ClaimStatusUpdateRequest request = new ClaimStatusUpdateRequest();
        request.setStatus("REJECTED");
        request.setRemarks(""); // empty remarks

        when(userRepository.findByEmail(officerUser.getEmail())).thenReturn(Optional.of(officerUser));
        when(claimRecordRepository.findById(claimId)).thenReturn(Optional.of(testClaim));

        assertThatThrownBy(() -> claimService.updateClaimStatus(claimId.toString(), request, officerUser.getEmail()))
                .isInstanceOf(BusinessRuleException.class)
                .hasMessageContaining("Mandatory remarks must be provided");
    }

    @Test
    void updateClaimStatus_OfficerCanApprove_UpdatesCompensationStatus() {
        ClaimStatusUpdateRequest request = new ClaimStatusUpdateRequest();
        request.setStatus("APPROVED");
        request.setRemarks("Fully sanctioned by committee");

        testClaim.setEstimatedCompensationAmount(new BigDecimal("50000.00"));

        when(userRepository.findByEmail(officerUser.getEmail())).thenReturn(Optional.of(officerUser));
        when(claimRecordRepository.findById(claimId)).thenReturn(Optional.of(testClaim));
        when(claimRecordRepository.save(any(ClaimRecord.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ClaimRecordDto dto = claimService.updateClaimStatus(claimId.toString(), request, officerUser.getEmail());

        assertThat(dto).isNotNull();
        assertThat(dto.getStatus()).isEqualTo("approved");
        assertThat(testClaim.getStatus()).isEqualTo(ClaimStatus.APPROVED);
        assertThat(testClaim.getCompensationStatus()).isEqualTo(CompensationStatus.RECOMMENDED);
        assertThat(testClaim.getSanctionedCompensationAmount()).isEqualTo(new BigDecimal("50000.00"));
    }
}

