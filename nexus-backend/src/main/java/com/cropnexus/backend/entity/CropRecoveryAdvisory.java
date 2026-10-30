package com.cropnexus.backend.entity;

import com.cropnexus.backend.entity.enums.DamageCause;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "crop_recovery_advisories")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CropRecoveryAdvisory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(name = "crop_name", nullable = false)
    private String cropName;

    @Enumerated(EnumType.STRING)
    @Column(name = "damage_type")
    private DamageCause damageType;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "advisory_symptoms", joinColumns = @JoinColumn(name = "advisory_id"))
    @Column(name = "symptom")
    @Builder.Default
    private List<String> symptoms = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "advisory_immediate_steps", joinColumns = @JoinColumn(name = "advisory_id"))
    @Column(name = "step")
    @Builder.Default
    private List<String> immediateSteps = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "advisory_soil_nutrient", joinColumns = @JoinColumn(name = "advisory_id"))
    @Column(name = "recommendation")
    @Builder.Default
    private List<String> soilAndNutrientManagement = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "advisory_water_drainage", joinColumns = @JoinColumn(name = "advisory_id"))
    @Column(name = "recommendation")
    @Builder.Default
    private List<String> waterAndDrainageCare = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "advisory_fungicide_pest", joinColumns = @JoinColumn(name = "advisory_id"))
    @Column(name = "recommendation")
    @Builder.Default
    private List<String> fungicideAndPestManagement = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "advisory_expert_criteria", joinColumns = @JoinColumn(name = "advisory_id"))
    @Column(name = "criterion")
    @Builder.Default
    private List<String> expertConsultationCriteria = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "advisory_caution_notes", joinColumns = @JoinColumn(name = "advisory_id"))
    @Column(name = "note")
    @Builder.Default
    private List<String> cautionNotes = new ArrayList<>();
}

