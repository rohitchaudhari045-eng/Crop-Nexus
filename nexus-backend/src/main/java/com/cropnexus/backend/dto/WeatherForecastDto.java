package com.cropnexus.backend.dto;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WeatherForecastDto {
    private String location;
    private List<ForecastDayDto> forecast;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ForecastDayDto {
        private String date;
        private String dayOfWeek;
        private Integer tempMaxC;
        private Integer tempMinC;
        private String condition;
        private Integer rainProbability;
        private String icon;
        private String advisory;
    }
}

