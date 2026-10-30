package com.cropnexus.backend.controller;

import com.cropnexus.backend.dto.ApiResponse;
import com.cropnexus.backend.dto.CropRecoveryItemDto;
import com.cropnexus.backend.dto.RecoveryProgressDto;
import com.cropnexus.backend.dto.request.PhotoUploadResponse;
import com.cropnexus.backend.dto.request.RecoveryProgressRequest;
import com.cropnexus.backend.service.FileStorageService;
import com.cropnexus.backend.service.RecoveryAdvisoryService;
import com.cropnexus.backend.service.RecoveryProgressService;
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
@RequestMapping("/recovery")
@RequiredArgsConstructor
@Tag(name = "Recovery", description = "Crop recovery advisories and progress tracking")
public class RecoveryController {

    private final RecoveryAdvisoryService recoveryAdvisoryService;
    private final RecoveryProgressService recoveryProgressService;
    private final FileStorageService fileStorageService;

    @GetMapping("/advisories")
    @Operation(summary = "Get crop recovery advisories")
    public ResponseEntity<ApiResponse<Map<String, List<CropRecoveryItemDto>>>> getAdvisories(
            @RequestParam(required = false) String crop,
            @RequestParam(required = false) String damageType) {
        List<CropRecoveryItemDto> advisories = recoveryAdvisoryService.getAdvisories(crop, damageType);
        return ResponseEntity.ok(ApiResponse.success(Map.of("advisories", advisories)));
    }

    @GetMapping("/progress")
    @Operation(summary = "Get recovery progress records (Farmer views own; Officer can filter by claim/farmer)")
    public ResponseEntity<ApiResponse<Map<String, List<RecoveryProgressDto>>>> getProgress(
            @RequestParam(required = false) String claimId,
            @RequestParam(required = false) String farmerId,
            @AuthenticationPrincipal UserDetails userDetails) {
        List<RecoveryProgressDto> records = recoveryProgressService.getProgress(userDetails.getUsername(), claimId, farmerId);
        return ResponseEntity.ok(ApiResponse.success(Map.of("records", records)));
    }

    @PostMapping("/progress")
    @Operation(summary = "Add a recovery progress record (farmer only)")
    public ResponseEntity<ApiResponse<Map<String, RecoveryProgressDto>>> addProgress(
            @Valid @RequestBody RecoveryProgressRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        RecoveryProgressDto record = recoveryProgressService.addProgress(request, userDetails.getUsername());
        return ResponseEntity.status(201).body(
                ApiResponse.created(Map.of("record", record), "Recovery progress recorded"));
    }

    @PostMapping(value = "/photos", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload progress photo for crop recovery tracking")
    public ResponseEntity<ApiResponse<PhotoUploadResponse>> uploadRecoveryPhoto(
            @RequestParam("file") MultipartFile file) throws IOException {
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
                ApiResponse.created(photoResponse, "Recovery photo uploaded successfully"));
    }
}
