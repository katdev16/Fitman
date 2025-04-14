package com.fitman.WorkoutService.service;
import com.fitman.WorkoutService.repository.WorkoutGroupRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.hibernate.boot.registry.classloading.spi.ClassLoaderService.Work;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitman.WorkoutService.ExerciseService.model.Exercise;

// import com.fitman.WorkoutService.ExerciseService.repository.exerciserepository;
import com.fitman.WorkoutService.model.WorkoutServiceGroups;


@Service
public class WorkoutGroupService{
       private final ObjectMapper objectMapper = new ObjectMapper();

    private List<Exercise> exercisesMq;

    private final WorkoutGroupRepository workoutGroupRepository;
    // private final exerciserepository exerciseRepository;


    public WorkoutGroupService(WorkoutGroupRepository workoutGroupRepository) {
        this.workoutGroupRepository = workoutGroupRepository;
        // this.exerciseRepository = exerciseRepository;
    }

    public WorkoutServiceGroups getWorkoutGroupByName(String workoutName) {
        return workoutGroupRepository.findByNameIgnoreCase(workoutName);
    }
    

    public void SaveWorkoutGroups() {
        // System.out.println("Received " + exercises.size() + " exercises");
        System.out.println("saved "+exercisesMq);
        // WorkoutServiceGroups group = new WorkoutServiceGroups();
        // group.setWorkouts(exercises);


        // System.out.println("Method used");
        // WorkoutServiceGroups workoutGroup = new WorkoutServiceGroups();
        // List<Exercise> exercises = new ArrayList<>();
        
        // for (String name : names) {
        //     Exercise Exercise = this.exerciseRepository.findFirstByNameContainingIgnoreCase(name);
        //     if (Exercise != null) {
        //         exercises.add(Exercise);
        //     } else {
              
        //         System.out.println("Exercise not found for: " + name);
        //     }
        // }

        // workoutGroup.setWorkouts(exercises);
        
        // workoutGroup.setName(workoutname);

        // workoutGroupRepository.save(workoutGroup);

        // return workoutGroupRepository.findAll(); 
    }
    // @RabbitListener(queues = "exercises.created.queue") 
    // public void SaveWorkoutGroups(String message) {
    //     System.out.println("Received message: " + message);
    // }
    public void saveWorkout(String workoutName, List<String> submittedExercises) {
        List<String> invalidNames = new ArrayList<>();
        List<Exercise> validExercises = new ArrayList<>();
    
        for (String submitted : submittedExercises) {
            for (Exercise exerciseFromMq : exercisesMq) {
                if (exerciseFromMq.getName().equalsIgnoreCase(submitted)) {
                    // Create a new Exercise entity for your own DB
                    Exercise localExercise = new Exercise();
                    localExercise.setName(exerciseFromMq.getName());
                    localExercise.setBodyPart(exerciseFromMq.getBodyPart());
                    localExercise.setEquipment(exerciseFromMq.getEquipment());
                    localExercise.setGifUrl(exerciseFromMq.getGifUrl());
                    localExercise.setTarget(exerciseFromMq.getTarget());
                    localExercise.setInstructions(exerciseFromMq.getInstructions());
                    localExercise.setSecondaryMuscles(exerciseFromMq.getSecondaryMuscles());
                    
                    validExercises.add(localExercise);
                    System.out.println("✅ Valid exercise: " + localExercise.getName());
                    break;
                }
            }
    
            boolean matched = validExercises.stream()
                    .anyMatch(e -> e.getName().equalsIgnoreCase(submitted));
    
            if (!matched) {
                invalidNames.add(submitted);
                System.out.println("❌ Invalid exercise name: " + submitted);
            }
        }
    
        if (!invalidNames.isEmpty()) {
            System.out.println("⚠️ Invalid exercise names: " + invalidNames);
            return; // or throw an exception if needed
        }
    
        WorkoutServiceGroups group = new WorkoutServiceGroups();
        group.setName(workoutName);
        group.setWorkouts(validExercises); // all managed by your local DB
    
        workoutGroupRepository.save(group);
        System.out.println("💾 Workout saved: " + workoutName);
    }
    
    @RabbitListener(queues = "exercises.created.queue") 
    public void MQConsumer(String message) {
       
       
        // System.out.println("Received message: " + message);
        try {
            List<Exercise> exercises = objectMapper.readValue(
                message,
                new TypeReference<List<Exercise>>() {}
            );
            exercisesMq= exercises;
            System.out.println("Received " + exercises.size() + " exercises");

            // Use the deserialized objects
            for (Exercise ex : exercises) {
                System.out.println("📥 Received Exercise: " + ex.getName());
                // You could also call a service method to save it:
                // workoutGroupService.saveExercise(ex);
            }

        } catch (Exception e) {
            System.err.println("❌ Failed to parse JSON: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

