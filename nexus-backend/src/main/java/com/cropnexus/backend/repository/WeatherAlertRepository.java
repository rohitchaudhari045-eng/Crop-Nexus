package com.cropnexus.backend.repository;

import com.cropnexus.backend.entity.WeatherAlert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface WeatherAlertRepository extends JpaRepository<WeatherAlert, UUID> {
}

