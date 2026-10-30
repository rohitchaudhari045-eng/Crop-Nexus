package com.cropnexus.backend.service;

import com.cropnexus.backend.dto.AuthResponseDto;
import com.cropnexus.backend.dto.request.LoginRequest;
import com.cropnexus.backend.dto.request.RegisterRequest;
import com.cropnexus.backend.entity.AppUser;
import com.cropnexus.backend.entity.enums.UserRole;
import com.cropnexus.backend.exception.DuplicateResourceException;
import com.cropnexus.backend.repository.UserRepository;
import com.cropnexus.backend.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    private AppUser testUser;

    @BeforeEach
    void setUp() {
        testUser = AppUser.builder()
                .id(UUID.randomUUID())
                .name("Test Farmer")
                .email("farmer@test.com")
                .phone("9876543210")
                .passwordHash("$2a$10$hashedpassword")
                .role(UserRole.FARMER)
                .district("Pune")
                .preferredLanguage("en")
                .failedLoginAttempts(0)
                .build();
    }

    @Test
    void login_withValidCredentials_returnsAuthResponse() {
        // Given
        LoginRequest request = new LoginRequest("farmer@test.com", "Password@123");

        when(userRepository.findByEmail("farmer@test.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("Password@123", testUser.getPasswordHash())).thenReturn(true);
        when(userRepository.save(any(AppUser.class))).thenReturn(testUser);
        when(jwtService.generateToken(any())).thenReturn("test.jwt.token");

        // When
        AuthResponseDto response = authService.login(request);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.getToken()).isEqualTo("test.jwt.token");
        assertThat(response.getUser()).isNotNull();
        assertThat(response.getUser().getEmail()).isEqualTo("farmer@test.com");
        assertThat(response.getUser().getRole()).isEqualTo("farmer");
    }

    @Test
    void login_withInvalidEmail_throwsBadCredentialsException() {
        // Given
        LoginRequest request = new LoginRequest("nonexistent@test.com", "Password@123");
        when(userRepository.findByEmail("nonexistent@test.com")).thenReturn(Optional.empty());

        // When / Then
        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(BadCredentialsException.class);
    }

    @Test
    void login_withWrongPassword_throwsBadCredentialsException() {
        // Given
        LoginRequest request = new LoginRequest("farmer@test.com", "WrongPassword");
        when(userRepository.findByEmail("farmer@test.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("WrongPassword", testUser.getPasswordHash())).thenReturn(false);
        when(userRepository.save(any(AppUser.class))).thenReturn(testUser);

        // When / Then
        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(BadCredentialsException.class);

        verify(userRepository, times(1)).save(any(AppUser.class));
    }

    @Test
    void register_withValidData_returnsAuthResponse() {
        // Given
        RegisterRequest request = new RegisterRequest(
                "New Farmer", "newfarmer@test.com", "9123456789",
                "Password@123", "Pune", "Haveli", "Vadgaon", "en", null
        );

        when(userRepository.existsByEmail("newfarmer@test.com")).thenReturn(false);
        when(passwordEncoder.encode("Password@123")).thenReturn("$2a$10$encoded");
        when(userRepository.save(any(AppUser.class))).thenReturn(testUser);
        when(jwtService.generateToken(any())).thenReturn("new.jwt.token");

        // When
        AuthResponseDto response = authService.register(request);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.getToken()).isEqualTo("new.jwt.token");
        verify(userRepository).save(any(AppUser.class));
    }

    @Test
    void register_withExistingEmail_throwsDuplicateResourceException() {
        // Given
        RegisterRequest request = new RegisterRequest(
                "Farmer", "farmer@test.com", "9876543210",
                "Password@123", "Pune", null, null, null, null
        );

        when(userRepository.existsByEmail("farmer@test.com")).thenReturn(true);

        // When / Then
        assertThatThrownBy(() -> authService.register(request))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessageContaining("farmer@test.com");
    }

    @Test
    void login_failedAttempts_incrementsCounter() {
        // Given
        LoginRequest request = new LoginRequest("farmer@test.com", "WrongPass");
        when(userRepository.findByEmail("farmer@test.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(false);
        when(userRepository.save(any(AppUser.class))).thenReturn(testUser);

        // When
        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(BadCredentialsException.class);

        // Then - verify save was called (to increment failed attempts)
        verify(userRepository, atLeastOnce()).save(any(AppUser.class));
    }
}

