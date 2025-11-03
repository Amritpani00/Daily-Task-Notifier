package com.example.notificationservice.listener;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class TaskCompletionListener {

    @KafkaListener(topics = "task-completion-events", groupId = "notification-group")
    public void listen(String message) {
        System.out.println("Received message in notification service: " + message);
        // Logic to handle the completion event will be added here
    }
}
