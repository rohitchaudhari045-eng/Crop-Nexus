package com.cropnexus.backend.controller;

import com.cropnexus.backend.dto.ApiResponse;
import com.cropnexus.backend.dto.AuthResponseDto;
import com.cropnexus.backend.dto.UserDto;
import com.cropnexus.backend.dto.request.LoginRequest;
import com.cropnexus.backend.dto.request.RegisterRequest;
import com.cropnexus.backend.service.AuthService;
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
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication endpoints")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Login with email and password")
    public ResponseEntity<ApiResponse<AuthResponseDto>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponseDto authResponse = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success(authResponse, "Login successful"));
    }

    @PostMapping("/register")
    @Operation(summary = "Register a new farmer account")
    public ResponseEntity<ApiResponse<AuthResponseDto>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponseDto authResponse = authService.register(request);
        return ResponseEntity.status(201).body(ApiResponse.created(authResponse, "Registration successful"));
    }

    @GetMapping("/me")
    @Operation(summary = "Get current authenticated user")
    public ResponseEntity<ApiResponse<Map<String, UserDto>>> getCurrentUser(
            @AuthenticationPrincipal UserDetails userDetails) {
        UserDto user = authService.getCurrentUser(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(Map.of("user", user)));
    }

    @PutMapping("/me")
    @Operation(summary = "Update current user profile")
    public ResponseEntity<ApiResponse<Map<String, UserDto>>> updateCurrentUser(
            @Valid @RequestBody com.cropnexus.backend.dto.request.UserUpdateDto request,
            @AuthenticationPrincipal UserDetails userDetails) {
        UserDto user = authService.updateCurrentUser(userDetails.getUsername(), request);
        return ResponseEntity.ok(ApiResponse.success(Map.of("user", user), "Profile updated successfully"));
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout (client-side token invalidation)")
    public ResponseEntity<ApiResponse<Map<String, String>>> logout() {
        return ResponseEntity.ok(ApiResponse.success(Map.of("message", "Logged out successfully"), "Logout successful"));
    }
}

