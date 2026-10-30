package com.cropnexus.backend.service;

import com.cropnexus.backend.dto.AuthResponseDto;
import com.cropnexus.backend.dto.UserDto;
import com.cropnexus.backend.dto.request.LoginRequest;
import com.cropnexus.backend.dto.request.RegisterRequest;
import com.cropnexus.backend.entity.AppUser;
import com.cropnexus.backend.entity.enums.UserRole;
import com.cropnexus.backend.exception.BusinessRuleException;
import com.cropnexus.backend.exception.DuplicateResourceException;
import com.cropnexus.backend.exception.ResourceNotFoundException;
import com.cropnexus.backend.repository.UserRepository;
import com.cropnexus.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private static final int MAX_FAILED_ATTEMPTS = 5;
    private static final long LOCK_DURATION_MINUTES = 15;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public AuthResponseDto login(LoginRequest request) {
        String identifier = request.getEmail().trim();
        AppUser user = userRepository.findByEmail(identifier)
                .or(() -> !identifier.contains("@") ? userRepository.findByPhone(identifier) : userRepository.findByEmailIgnoreCase(identifier))
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        // Check account lock
        if (user.getAccountLockedUntil() != null && Instant.now().isBefore(user.getAccountLockedUntil())) {
            throw new LockedException("Account is temporarily locked");
        }

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            handleFailedLogin(user);
            throw new BadCredentialsException("Invalid email or password");
        }

        // Reset failed attempts on success
        user.setFailedLoginAttempts(0);
        user.setAccountLockedUntil(null);
        userRepository.save(user);

        // Generate JWT
        var userDetails = User.builder()
                .username(user.getEmail())
                .password(user.getPasswordHash())
                .authorities(List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name())))
                .build();

        String token = jwtService.generateToken(userDetails);

        return AuthResponseDto.builder()
                .token(token)
                .user(mapToUserDto(user))
                .build();
    }

    @Transactional
    public AuthResponseDto register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already registered: " + request.getEmail());
        }
        if (request.getPhone() != null && userRepository.existsByPhone(request.getPhone())) {
            throw new DuplicateResourceException("Phone number already registered: " + request.getPhone());
        }

        AppUser user = AppUser.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.FARMER)
                .district(request.getDistrict())
                .taluka(request.getTaluka())
                .village(request.getVillage())
                .preferredLanguage(request.getPreferredLanguage() != null ? request.getPreferredLanguage() : "en")
                .aadhaarLast4(request.getAadhaarLast4())
                .build();

        user = userRepository.save(user);
        log.info("New FARMER registered: {}", user.getEmail());

        var userDetails = User.builder()
                .username(user.getEmail())
                .password(user.getPasswordHash())
                .authorities(List.of(new SimpleGrantedAuthority("ROLE_FARMER")))
                .build();

        String token = jwtService.generateToken(userDetails);

        return AuthResponseDto.builder()
                .token(token)
                .user(mapToUserDto(user))
                .build();
    }

    public UserDto getCurrentUser(String email) {
        AppUser user = userRepository.findByEmail(email)
                .or(() -> userRepository.findByPhone(email))
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return mapToUserDto(user);
    }

    @Transactional
    public UserDto updateCurrentUser(String email, com.cropnexus.backend.dto.request.UserUpdateDto dto) {
        AppUser user = userRepository.findByEmailIgnoreCase(email)
                .or(() -> userRepository.findByPhone(email))
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        if (dto.getName() != null && !dto.getName().isBlank()) {
            user.setName(dto.getName().trim());
        }
        if (dto.getPhone() != null && !dto.getPhone().isBlank()) {
            user.setPhone(dto.getPhone().trim());
        }
        if (dto.getDistrict() != null && !dto.getDistrict().isBlank()) {
            user.setDistrict(dto.getDistrict().trim());
        }
        if (dto.getTaluka() != null && !dto.getTaluka().isBlank()) {
            user.setTaluka(dto.getTaluka().trim());
        }
        if (dto.getVillage() != null && !dto.getVillage().isBlank()) {
            user.setVillage(dto.getVillage().trim());
        }
        if (dto.getPreferredLanguage() != null && !dto.getPreferredLanguage().isBlank()) {
            user.setPreferredLanguage(dto.getPreferredLanguage().trim());
        }

        user = userRepository.save(user);
        return mapToUserDto(user);
    }

    private void handleFailedLogin(AppUser user) {
        int attempts = user.getFailedLoginAttempts() + 1;
        user.setFailedLoginAttempts(attempts);

        if (attempts >= MAX_FAILED_ATTEMPTS) {
            user.setAccountLockedUntil(Instant.now().plusSeconds(LOCK_DURATION_MINUTES * 60));
            log.warn("Account locked for user: {} after {} failed attempts", user.getEmail(), attempts);
        }

        userRepository.save(user);
    }

    public static UserDto mapToUserDto(AppUser user) {
        return UserDto.builder()
                .id(user.getId().toString())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole().name().toLowerCase())
                .avatarUrl(user.getAvatarUrl())
                .district(user.getDistrict())
                .taluka(user.getTaluka())
                .village(user.getVillage())
                .preferredLanguage(user.getPreferredLanguage())
                .aadhaarLast4(user.getAadhaarLast4())
                .assignedJurisdiction(user.getAssignedJurisdiction())
                .badgeNumber(user.getBadgeNumber())
                .createdAt(user.getCreatedAt() != null ? user.getCreatedAt().toString() : null)
                .build();
    }
}

