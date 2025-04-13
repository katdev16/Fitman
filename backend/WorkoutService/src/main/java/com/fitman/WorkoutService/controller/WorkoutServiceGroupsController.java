package com.fitman.WorkoutService.controller;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import com.fitman.WorkoutService.ExerciseService.model.Exercise;
import com.fitman.WorkoutService.model.WorkoutServiceGroups;
import com.fitman.WorkoutService.service.WorkoutGroupService;

import org.hibernate.boot.registry.classloading.spi.ClassLoaderService.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")  // Base path for the API
public class WorkoutServiceGroupsController {
    // This class is responsible for handling HTTP requests related to workout groups.
    // It will contain methods to create, read, update, and delete workout groups.
    // Each method will be mapped to a specific URL and HTTP method (GET, POST, PUT, DELETE).
    // The class will also handle validation and error handling for the requests.
    

	WorkoutGroupService workoutGroupService;
    // Accepts GET requests to /groups?name=chest
	// @GetMapping("/workout_groups")
    // public List<workout_groups> getExerises(
    //         @RequestParam(value = "name", defaultValue = "chest") String name) {

    //     return workoutGroupService.fetchWorkoutGroups();
    // }
    @Autowired  // Ensure Spring injects the service
    public WorkoutServiceGroupsController(WorkoutGroupService workoutGroupService) {
        this.workoutGroupService = workoutGroupService;
    }

    @PostMapping("/workoutgroups/save")
    public void saveWorkoutGroups() {
        // @RequestParam("workoutName") String workoutName, 
        // @RequestBody List<String> names) {

        workoutGroupService.SaveWorkoutGroups();
    }



    @GetMapping("/find")
    public WorkoutServiceGroups getWorkoutByName(@RequestParam String name) {
        return workoutGroupService.getWorkoutGroupByName(name);
    }
    
}
