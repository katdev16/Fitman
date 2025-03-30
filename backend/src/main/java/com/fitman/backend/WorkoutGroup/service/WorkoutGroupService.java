package com.fitman.backend.WorkoutGroup.service;
import com.fitman.backend.WorkoutGroup.repository.WorkGroupRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.fitman.backend.WorkoutGroup.model.workout_groups;
public class WorkoutGroupService{
    WorkGroupRepository workoutGroupRepository;
    

    private final RestTemplate restTemplate = new RestTemplate();
    private final String BASE_URL = "https://exercisedb.p.rapidapi.com/exercises/bodyPart/{bodyPart}?limit={limit}&offset={offset}";

    public List<workout_groups> fetchWorkoutGroups(String bodyPart, int limit, int offset) {
        // Create headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-rapidapi-host", "exercisedb.p.rapidapi.com");
        headers.set("x-rapidapi-key", "    ddeaf1ee9bmsh30bddcb15fd6d68p1767fejsn11ffa894743c"); // Replace with your actual API key

        // Create request entity with headers
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // URL parameters
        Map<String, Object> params = Map.of(
                "bodyPart", bodyPart,
                "limit", limit,
                "offset", offset
        );

        // Call external API with dynamic URL
        ResponseEntity<workout_groups[]> response = restTemplate.exchange(
                BASE_URL,  // Dynamic URL
                HttpMethod.GET,
                entity,
                workout_groups[].class,
                params
        );
        // Check if the response is successful
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Failed to fetch data from external API");
        }
        // Print the response body
        // Assuming the response body is an array of workout_groups
        workout_groups[] workoutGroups = response.getBody();
        if (workoutGroups == null) {
            throw new RuntimeException("No data found in the response");
        }
        // Print the response body          
        System.out.println("Response: " + Arrays.toString(workoutGroups));


        // System.out.println("Response: " + response.getBody());

        return List.of(response.getBody());
    }
}
