package com.cropnexus.backend.entity;

import com.cropnexus.backend.entity.enums.WeatherAlertSeverity;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "weather_alerts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WeatherAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Enumerated(EnumType.STRING)
    private WeatherAlertSeverity severity;

    private String category;
    private String title;

    @Column(length = 2000)
    private String description;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "weather_alert_districts", joinColumns = @JoinColumn(name = "alert_id"))
    @Column(name = "district")
    @Builder.Default
    private List<String> affectedDistricts = new ArrayList<>();

    @Column(name = "valid_from")
    private Instant validFrom;

    @Column(name = "valid_until")
    private Instant validUntil;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "weather_advisory_steps", joinColumns = @JoinColumn(name = "alert_id"))
    @Column(name = "step")
    @Builder.Default
    private List<String> advisorySteps = new ArrayList<>();

    private String source;
}

