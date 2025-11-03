package com.example.analyticsservice.listener;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class TaskCompletionListener {

    @KafkaListener(topics = "task-completion-events", groupId = "analytics-group")
    public void listen(String message) {
        System.out.println("Received message in analytics service: " + message);
        // Logic to process the completion event will be added here
    }
}
