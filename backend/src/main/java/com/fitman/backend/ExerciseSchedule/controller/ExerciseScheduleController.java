package com.fitman.backend.ExerciseSchedule.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.fitman.backend.ExerciseSchedule.model.ExerciseSchedule;
import com.fitman.backend.ExerciseSchedule.service.ExerciseScheduleService;

public class ExerciseScheduleController {
    // This class is currently empty. You can add methods and logic here as needed.
    // For example, you might want to add methods to handle HTTP requests related to exercise schedules.
    @Autowired
    private ExerciseScheduleService exerciseScheduleService;

    @GetMapping("/day/{day}")
    public Optional<ExerciseSchedule> getExerciseSchedule(@PathVariable Long day) {
        return exerciseScheduleService.getExerciseSchedule(day);
    }

    @PostMapping("/day/{day}")
    public ExerciseSchedule createExerciseSchedule(@PathVariable int day) {
        // Logic to create a new exercise schedule for the specified day
        // You can use a service class to save data to the database or perform any other operations
        return exerciseScheduleService.createExerciseSchedule(day, ["chest"]);
    }
}
