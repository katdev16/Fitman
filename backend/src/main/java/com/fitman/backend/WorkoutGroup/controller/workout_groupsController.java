package com.fitman.backend.WorkoutGroup.controller;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import com.fitman.backend.WorkoutGroup.model.workout_groups;
import com.fitman.backend.WorkoutGroup.service.WorkoutGroupService;

import org.hibernate.boot.registry.classloading.spi.ClassLoaderService.Work;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import com.fitman.backend.WorkoutGroup.model.workout_groups;

public class workout_groupsController {
    // This class is responsible for handling HTTP requests related to workout groups.
    // It will contain methods to create, read, update, and delete workout groups.
    // Each method will be mapped to a specific URL and HTTP method (GET, POST, PUT, DELETE).
    // The class will also handle validation and error handling for the requests.
    

	WorkoutGroupService workoutGroupService;
    // Accepts GET requests to /groups?name=chest
	@GetMapping("/workout_groups")
    public List<workout_groups> getWorkoutGroups(
            @RequestParam(value = "name", defaultValue = "chest") String name) {

        return workoutGroupService.fetchWorkoutGroups(name, 3, 0);
    }

    // @PostMapping("/workout_groups")
	// public Iterable<workout_groups> Sendworkout_groups(@RequestParam(value = "name", defaultValue = "chest") String name) {
	// 	return workoutGroupService.Getworkoutgoup();
	// }
    
}
