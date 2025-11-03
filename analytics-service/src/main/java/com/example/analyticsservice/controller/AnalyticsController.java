package com.example.analyticsservice.controller;

import com.example.analyticsservice.model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.util.Map;

@RestController
public class AnalyticsController {

    @Autowired
    private WebClient.Builder webClientBuilder;

    @GetMapping("/analytics")
    public Flux<Map<String, Double>> getAnalytics(@RequestParam Long userId) {
        return webClientBuilder.build()
                .get()
                .uri("http://task-management-service/tasks/" + userId)
                .retrieve()
                .bodyToFlux(Task.class)
                .collectList()
                .map(tasks -> {
                    long completedTasks = tasks.stream().filter(Task::isCompleted).count();
                    double completionRate = (double) completedTasks / tasks.size() * 100;
                    return Map.of("completionRate", completionRate);
                })
                .flux();
    }
}
