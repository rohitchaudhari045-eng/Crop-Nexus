package com.cropnexus.backend.controller;

import com.cropnexus.backend.dto.ApiResponse;
import com.cropnexus.backend.dto.NotificationDto;
import com.cropnexus.backend.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
@Tag(name = "Notifications", description = "User notification management")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    @Operation(summary = "Get notifications for authenticated user")
    public ResponseEntity<ApiResponse<Map<String, List<NotificationDto>>>> getNotifications(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<NotificationDto> notifications = notificationService.getNotifications(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(Map.of("notifications", notifications)));
    }

    @PatchMapping("/{id}/read")
    @Operation(summary = "Mark a notification as read")
    public ResponseEntity<ApiResponse<Map<String, NotificationDto>>> markAsRead(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails) {
        NotificationDto notification = notificationService.markAsRead(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(Map.of("notification", notification), "Notification marked as read"));
    }

    @RequestMapping(value = "/read-all", method = {RequestMethod.POST, RequestMethod.PATCH})
    @Operation(summary = "Mark all notifications as read")
    public ResponseEntity<ApiResponse<Map<String, String>>> markAllAsRead(
            @AuthenticationPrincipal UserDetails userDetails) {
        notificationService.markAllAsRead(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(Map.of("message", "All notifications marked as read")));
    }
}

