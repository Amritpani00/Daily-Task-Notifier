package com.example.taskmanagementservice.service;

import com.example.taskmanagementservice.model.Task;
import com.example.taskmanagementservice.repository.TaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private static final Logger logger = LoggerFactory.getLogger(TaskService.class);

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> getTasksByUserId(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    public List<Long> getUsersWithUnfinishedTasks() {
        return taskRepository.findUsersWithUnfinishedTasks();
    }

    public Task createTask(Task task) {
        logger.info("Creating task: {}", task);
        return taskRepository.save(task);
    }

    public Task updateTask(Task task) {
        logger.info("Updating task: {}", task);
        Task existingTask = taskRepository.findById(task.getId()).get();
        existingTask.setDescription(task.getDescription());
        existingTask.setCompleted(task.isCompleted());
        if (task.isCompleted()) {
            logger.info("Sending task completion event for task: {}", task.getId());
            kafkaTemplate.send("task-completion-events", "Task with id " + task.getId() + " is completed");
        }
        return taskRepository.save(existingTask);
    }

    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }
}
