package com.fitman.backend.WorkoutGroup.service;
import com.fitman.backend.WorkoutGroup.repository.WorkGroupRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.hibernate.boot.registry.classloading.spi.ClassLoaderService.Work;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;


import com.fitman.backend.Exercise.model.exercise;

import com.fitman.backend.Exercise.repository.exerciserepository;
import com.fitman.backend.WorkoutGroup.model.workout_groups;
public class WorkoutGroupService{

    private final WorkGroupRepository workoutGroupRepository;
    private final exerciserepository exerciseRepository;


    public WorkoutGroupService(WorkGroupRepository workoutGroupRepository, exerciserepository exerciseRepository) {
        this.workoutGroupRepository = workoutGroupRepository;
        this.exerciseRepository = exerciseRepository;
    }
    

    public Iterable<workout_groups> SaveWorkoutGroups(String workoutname,List<String> names) {
        workout_groups workoutGroup = new workout_groups();
        List<exercise> exercises = new ArrayList<>();
        
        for (String name : names) {
            exercise Exercise = this.exerciseRepository.findFirstByNameContainingIgnoreCase(name);
            if (Exercise != null) {
                exercises.add(Exercise);
            } else {
              
                System.out.println("Exercise not found for: " + name);
            }
        }

        workoutGroup.setWorkouts(exercises);
        
        workoutGroup.setName(workoutname);

        workoutGroupRepository.save(workoutGroup);

        return workoutGroupRepository.findAll(); 
    }
}
