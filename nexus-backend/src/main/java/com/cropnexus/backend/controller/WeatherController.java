package com.cropnexus.backend.controller;

import com.cropnexus.backend.dto.ApiResponse;
import com.cropnexus.backend.dto.WeatherAlertDto;
import com.cropnexus.backend.dto.WeatherForecastDto;
import com.cropnexus.backend.service.WeatherAlertService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/weather")
@RequiredArgsConstructor
@Tag(name = "Weather", description = "Weather alerts and forecast for Maharashtra districts")
public class WeatherController {

    private final WeatherAlertService weatherAlertService;

    @GetMapping("/alerts")
    @Operation(summary = "Get weather alerts, optionally filtered by district")
    public ResponseEntity<ApiResponse<Map<String, List<WeatherAlertDto>>>> getAlerts(
            @RequestParam(required = false) String district) {
        List<WeatherAlertDto> alerts = weatherAlertService.getAlerts(district);
        return ResponseEntity.ok(ApiResponse.success(Map.of("alerts", alerts)));
    }

    @GetMapping("/forecast")
    @Operation(summary = "Get 5-day agricultural weather forecast via AgroMonitoring")
    public ResponseEntity<ApiResponse<WeatherForecastDto>> getForecast(
            @RequestParam(required = false) String district) {
        WeatherForecastDto forecast = weatherAlertService.getForecast(district);
        return ResponseEntity.ok(ApiResponse.success(forecast));
    }
}
