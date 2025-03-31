package com.fitman.backend.Exercise.service;


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
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitman.backend.Exercise.model.exercise;

import com.fitman.backend.Exercise.repository.exerciserepository;
import com.fitman.backend.WorkoutGroup.model.workout_groups;
public class exerciseservice{
    WorkGroupRepository workoutGroupRepository;
    private final exerciserepository exerciseRepository;

    public exerciseservice(exerciserepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
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
        return List.of(response.getBody());
    }
}