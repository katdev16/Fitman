package com.fitman.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

import com.fitman.backend.Exercise.model.exercise;
import com.fitman.backend.Exercise.service.exerciseservice;

public class exercisecontroller {
    // This class is currently empty and can be used to define endpoints for exercise-related operations.
    // You can add methods here to handle HTTP requests related to exercises, such as creating, updating, deleting, or retrieving exercises.
    // For example, you might want to add a method to fetch all exercises, or to create a new exercise.
    exerciseservice exerciseService;
    @GetMapping("/exercises")
    public List<exercise> getExerises(){
        return exerciseService.fetchWorkoutGroups();
    }
    
}
