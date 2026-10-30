package com.cropnexus.backend.controller;

import com.cropnexus.backend.dto.ApiResponse;
import com.cropnexus.backend.dto.InspectionRecordDto;
import com.cropnexus.backend.dto.request.InspectionRequest;
import com.cropnexus.backend.service.InspectionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/inspections")
@RequiredArgsConstructor
@Tag(name = "Inspections", description = "Field inspection management")
public class InspectionController {

    private final InspectionService inspectionService;

    @GetMapping
    @Operation(summary = "Get all inspections")
    public ResponseEntity<ApiResponse<Map<String, List<InspectionRecordDto>>>> getAllInspections() {
        List<InspectionRecordDto> inspections = inspectionService.getAllInspections();
        return ResponseEntity.ok(ApiResponse.success(Map.of("inspections", inspections)));
    }

    @GetMapping("/claim/{claimId}")
    @Operation(summary = "Get inspection by claim ID")
    public ResponseEntity<ApiResponse<Map<String, InspectionRecordDto>>> getInspectionByClaimId(
            @PathVariable String claimId,
            @AuthenticationPrincipal UserDetails userDetails) {
        InspectionRecordDto inspection = inspectionService.getInspectionByClaimId(claimId, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(Map.of("inspection", inspection)));
    }

    @PostMapping
    @Operation(summary = "Submit an inspection report (officer only)")
    public ResponseEntity<ApiResponse<Map<String, InspectionRecordDto>>> submitInspection(
            @Valid @RequestBody InspectionRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        InspectionRecordDto inspection = inspectionService.submitInspection(request, userDetails.getUsername());
        return ResponseEntity.status(201).body(
                ApiResponse.created(Map.of("inspection", inspection), "Inspection submitted successfully"));
    }
}

