package com.cropnexus.backend.controller;

import com.cropnexus.backend.dto.ApiResponse;
import com.cropnexus.backend.dto.ClaimRecordDto;
import com.cropnexus.backend.dto.request.ClaimStatusUpdateRequest;
import com.cropnexus.backend.dto.request.DamageReportRequest;
import com.cropnexus.backend.dto.request.PhotoUploadResponse;
import com.cropnexus.backend.service.ClaimService;
import com.cropnexus.backend.service.FileStorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Tag(name = "Claims", description = "Damage reports and claims management")
public class DamageReportController {

    private final ClaimService claimService;
    private final FileStorageService fileStorageService;

    @PostMapping("/damage-reports")
    @Operation(summary = "Submit a damage report (creates a claim)")
    public ResponseEntity<ApiResponse<Map<String, ClaimRecordDto>>> submitDamageReport(
            @Valid @RequestBody DamageReportRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        ClaimRecordDto claim = claimService.submitClaim(request, userDetails.getUsername());
        return ResponseEntity.status(201).body(
                ApiResponse.created(Map.of("claim", claim), "Damage report submitted successfully"));
    }

    @PostMapping(value = "/damage-reports/photos", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload evidence photo for a damage report")
    public ResponseEntity<ApiResponse<PhotoUploadResponse>> uploadPhoto(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal UserDetails userDetails) throws IOException {

        String url = fileStorageService.storeFile(file);
        long size = fileStorageService.getFileSize(file);

        PhotoUploadResponse photoResponse = new PhotoUploadResponse(
                UUID.randomUUID().toString(),
                url,
                file.getOriginalFilename(),
                Instant.now().toString(),
                size
        );

        return ResponseEntity.status(201).body(
                ApiResponse.created(photoResponse, "Photo uploaded successfully"));
    }

    @GetMapping("/claims")
    @Operation(summary = "List claims with optional filters")
    public ResponseEntity<ApiResponse<Map<String, List<ClaimRecordDto>>>> getClaims(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String userId,
            @AuthenticationPrincipal UserDetails userDetails) {
        List<ClaimRecordDto> claims = claimService.getClaims(status, search, userId, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(Map.of("claims", claims)));
    }

    @GetMapping("/claims/{id}")
    @Operation(summary = "Get claim by ID")
    public ResponseEntity<ApiResponse<Map<String, ClaimRecordDto>>> getClaimById(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails) {
        ClaimRecordDto claim = claimService.getClaimById(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(Map.of("claim", claim)));
    }

    @PatchMapping("/claims/{id}/status")
    @Operation(summary = "Update claim status (officer only)")
    public ResponseEntity<ApiResponse<Map<String, ClaimRecordDto>>> updateClaimStatus(
            @PathVariable String id,
            @Valid @RequestBody ClaimStatusUpdateRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        ClaimRecordDto claim = claimService.updateClaimStatus(id, request, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(Map.of("claim", claim), "Claim status updated"));
    }
}

