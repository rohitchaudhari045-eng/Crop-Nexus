package com.cropnexus.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NotificationDto {

    private String id;
    private String userId;
    private String title;
    private String message;
    private String type;
    private boolean read;
    private String createdAt;
    private String actionUrl;
}

