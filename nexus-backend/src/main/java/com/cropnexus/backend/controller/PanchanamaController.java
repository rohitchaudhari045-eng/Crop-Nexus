package com.cropnexus.backend.controller;

import com.cropnexus.backend.dto.ApiResponse;
import com.cropnexus.backend.dto.EPanchanamaDto;
import com.cropnexus.backend.dto.request.PanchanamaGenerateRequest;
import com.cropnexus.backend.dto.request.PanchanamaUpdateRequest;
import com.cropnexus.backend.service.PanchanamaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/panchanama")
@RequiredArgsConstructor
@Tag(name = "e-Panchanama", description = "Electronic Panchanama document management")
public class PanchanamaController {

    private final PanchanamaService panchanamaService;

    @GetMapping("/claim/{claimId}")
    @Operation(summary = "Get Panchanama by claim ID")
    public ResponseEntity<ApiResponse<Map<String, EPanchanamaDto>>> getByClaimId(
            @PathVariable String claimId,
            @AuthenticationPrincipal UserDetails userDetails) {
        EPanchanamaDto panchanama = panchanamaService.getByClaimId(claimId, userDetails != null ? userDetails.getUsername() : null);
        return ResponseEntity.ok(ApiResponse.success(Map.of("panchanama", panchanama)));
    }

    @PostMapping("/generate")
    @Operation(summary = "Generate e-Panchanama draft (officer only)")
    public ResponseEntity<ApiResponse<Map<String, EPanchanamaDto>>> generateDraft(
            @Valid @RequestBody PanchanamaGenerateRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        EPanchanamaDto panchanama = panchanamaService.generateDraft(request, userDetails.getUsername());
        return ResponseEntity.status(201).body(
                ApiResponse.created(Map.of("panchanama", panchanama), "e-Panchanama draft generated"));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update Panchanama draft (officer only)")
    public ResponseEntity<ApiResponse<Map<String, EPanchanamaDto>>> updateDraft(
            @PathVariable String id,
            @RequestBody PanchanamaUpdateRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        EPanchanamaDto panchanama = panchanamaService.updateDraft(id, request);
        return ResponseEntity.ok(ApiResponse.success(Map.of("panchanama", panchanama), "e-Panchanama updated"));
    }
}

