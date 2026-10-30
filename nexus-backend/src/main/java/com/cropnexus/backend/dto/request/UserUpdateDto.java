package com.cropnexus.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDto {
    private String name;
    private String phone;
    private String district;
    private String taluka;
    private String village;
    private String preferredLanguage;
}

