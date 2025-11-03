package com.example.notificationservice.scheduler;

import com.example.notificationservice.model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class ScheduledTask {

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Scheduled(fixedRate = 10000)
    public void sendReminder() {
        webClientBuilder.build()
                .get()
                .uri("http://task-management-service/tasks/unfinished")
                .retrieve()
                .bodyToFlux(Long.class)
                .flatMap(userId -> webClientBuilder.build()
                        .get()
                        .uri("http://task-management-service/tasks/" + userId)
                        .retrieve()
                        .bodyToFlux(Task.class))
                .filter(task -> !task.isCompleted())
                .subscribe(task -> {
                    String message = "Don't forget to complete your task: " + task.getDescription();
                    this.template.convertAndSendToUser(task.getUserId().toString(), "/topic/reminders", message);
                });
    }
}
