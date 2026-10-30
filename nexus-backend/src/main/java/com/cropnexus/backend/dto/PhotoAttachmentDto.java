package com.cropnexus.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PhotoAttachmentDto {

    private String id;
    private String url;
    private String name;
    private String uploadedAt;
    private Long sizeBytes;
    private Double latitude;
    private Double longitude;
    private String caption;
}

