package com.cropnexus.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    @NotBlank(message = "Email or mobile number is required")
    @JsonAlias({"emailOrPhone", "username", "phone"})
    private String email;

    @NotBlank(message = "Password is required")
    private String password;
}
