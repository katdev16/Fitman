package com.fitman.backend.ExerciseSchedule.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import com.fitman.backend.ExerciseSchedule.repository.*;
import com.fitman.backend.ExerciseSchedule.model.*;



public class ExerciseScheduleService {
    private final ExerciseScheduleRepository repository;

    public ExerciseScheduleService(ExerciseScheduleRepository repository) {
        this.repository = repository;
    }

    // Example method to create an exercise schedule
    public ExerciseSchedule createExerciseSchedule(int day, List<String> WorkoutGroup) {
        // HashMap<Integer, String> exerciseSchedule = new HashMap<>();
        // exerciseSchedule.put(day, WorkoutGroup);
        ExerciseSchedule Group = new ExerciseSchedule("Day "+day, "Workout Group", WorkoutGroup);
        return repository.save(Group);
    }

    // Example method to update an exercise schedule
    public void updateExerciseSchedule() {
        // Implementation goes here
    }

    // Example method to delete an exercise schedule
    public void deleteExerciseSchedule() {
        // Implementation goes here
    }

    // Example method to retrieve an exercise schedule
    public Optional<ExerciseSchedule> getExerciseSchedule(Long id) {
        return repository.findById(id);
    }
    
}
