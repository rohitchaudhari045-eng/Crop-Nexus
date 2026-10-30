package com.cropnexus.backend.service;

import com.cropnexus.backend.dto.NotificationDto;
import com.cropnexus.backend.entity.AppUser;
import com.cropnexus.backend.entity.Notification;
import com.cropnexus.backend.entity.enums.NotificationType;
import com.cropnexus.backend.exception.ResourceNotFoundException;
import com.cropnexus.backend.repository.NotificationRepository;
import com.cropnexus.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<NotificationDto> getNotifications(String userEmail) {
        AppUser user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        return notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public NotificationDto markAsRead(String notificationId, String userEmail) {
        Notification notification = notificationRepository.findById(UUID.fromString(notificationId))
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", notificationId));

        notification.setRead(true);
        notification = notificationRepository.save(notification);
        return mapToDto(notification);
    }

    @Transactional
    public void markAllAsRead(String userEmail) {
        AppUser user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        notificationRepository.markAllReadByUserId(user.getId());
    }

    @Transactional
    public void createNotification(UUID userId, String title, String message, String type, String actionUrl) {
        NotificationType notificationType;
        try {
            notificationType = NotificationType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            notificationType = NotificationType.SYSTEM;
        }

        Notification notification = Notification.builder()
                .userId(userId)
                .title(title)
                .message(message)
                .type(notificationType)
                .read(false)
                .actionUrl(actionUrl)
                .build();

        notificationRepository.save(notification);
    }

    private NotificationDto mapToDto(Notification notification) {
        return NotificationDto.builder()
                .id(notification.getId().toString())
                .userId(notification.getUserId().toString())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .type(notification.getType() != null ? notification.getType().name().toLowerCase() : null)
                .read(notification.isRead())
                .createdAt(notification.getCreatedAt() != null ? notification.getCreatedAt().toString() : null)
                .actionUrl(notification.getActionUrl())
                .build();
    }
}

