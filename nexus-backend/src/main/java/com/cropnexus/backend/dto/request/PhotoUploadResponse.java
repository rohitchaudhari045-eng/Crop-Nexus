package com.cropnexus.backend.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhotoUploadResponse {

    private String id;
    private String url;
    private String name;
    private String uploadedAt;
    private Long sizeBytes;
}

