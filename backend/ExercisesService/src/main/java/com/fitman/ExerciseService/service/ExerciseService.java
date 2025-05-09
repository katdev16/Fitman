package com.fitman.ExerciseService.service;


// import com.fitman.backend.WorkoutGroup.repository.WorkGroupRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.hibernate.boot.registry.classloading.spi.ClassLoaderService.Work;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitman.ExerciseService.model.exercise;
import com.fitman.ExerciseService.Config.RabbitConfig;
import com.fitman.ExerciseService.repository.exerciserepository;
// import com.fitman.backend.WorkoutGroup.model.workout_groups;
@Service 
public class ExerciseService{
    // WorkGroupRepository workoutGroupRepository;
    private final exerciserepository exerciseRepository;
    RabbitTemplate rabbitTemplate = new RabbitTemplate();

    public ExerciseService(exerciserepository exerciseRepository,RabbitTemplate rabbitTemplate) {
        this.exerciseRepository = exerciseRepository;
        this.rabbitTemplate = rabbitTemplate;
    }
    

    private final RestTemplate restTemplate = new RestTemplate();
    private final String BASE_URL = "https://exercisedb.p.rapidapi.com/exercises?limit=0&offset=0";

    public List<exercise> fetchWorkoutGroups() {
        // Create headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-rapidapi-host", "exercisedb.p.rapidapi.com");
        headers.set("x-rapidapi-key", "    ddeaf1ee9bmsh30bddcb15fd6d68p1767fejsn11ffa894743c"); // Replace with your actual API key

        // Create request entity with headers
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // URL parameters
        // Map<String, Object> params = Map.of(
        //         "limit", limit,
        //         "offset", offset
        // );

        // Call external API with dynamic URL
        ResponseEntity<exercise[]> response = restTemplate.exchange(
                BASE_URL,  // Dynamic URL
                HttpMethod.GET,
                entity,
                exercise[].class
                // params
        );
        // Check if the response is successful
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Failed to fetch data from external API");
        }
       exercise[] workoutGroups = response.getBody();
        if (workoutGroups == null) {
            throw new RuntimeException("No data found in the response");
        }
        exerciseRepository.saveAll(Arrays.asList(workoutGroups));
        System.out.println("Response: " + Arrays.toString(workoutGroups));


        // System.out.println("Response: " + response.getBody());
        exerciseRepository.saveAll(Arrays.asList(workoutGroups));
        exerciseRepository.findAll();

        exercise ex = new exercise();
        ex.setName("Chest Press");
        ex.setEquipment("Dumbbell");
        ex.setBodyPart("Chest");
        ex.setGifUrl("https://example.com/chest_press.gif");
        ex.setTarget("Pectorals");


     
        rabbitTemplate.convertAndSend(RabbitConfig.EXERCISE_CREATED_QUEUE,Arrays.asList(workoutGroups));

        return List.of(response.getBody());
    }
}