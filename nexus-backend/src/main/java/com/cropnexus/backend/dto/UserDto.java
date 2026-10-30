package com.cropnexus.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDto {

    private String id;
    private String name;
    private String email;
    private String phone;
    private String role;
    private String avatarUrl;
    private String district;
    private String taluka;
    private String village;
    private String preferredLanguage;
    private String aadhaarLast4;
    private String assignedJurisdiction;
    private String badgeNumber;
    private String createdAt;
}

