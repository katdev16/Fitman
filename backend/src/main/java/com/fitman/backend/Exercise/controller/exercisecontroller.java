package com.fitman.backend.Exercise.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitman.backend.Exercise.model.exercise;
import com.fitman.backend.Exercise.service.exerciseservice;

@RestController
@RequestMapping("/api")  // Base path for the API
public class exercisecontroller {
    // This class is currently empty and can be used to define endpoints for exercise-related operations.
    // You can add methods here to handle HTTP requests related to exercises, such as creating, updating, deleting, or retrieving exercises.
    // For example, you might want to add a method to fetch all exercises, or to create a new exercise.
    exerciseservice exerciseService;

    @Autowired
    public exercisecontroller(exerciseservice exerciseService) {
        this.exerciseService = exerciseService;
    }


    @GetMapping("/exercises")
    public List<exercise> getExerises(){
        return exerciseService.fetchWorkoutGroups();
    }
    
}
