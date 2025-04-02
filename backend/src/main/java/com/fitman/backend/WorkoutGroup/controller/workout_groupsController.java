package com.fitman.backend.WorkoutGroup.controller;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import com.fitman.backend.WorkoutGroup.model.workout_groups;
import com.fitman.backend.WorkoutGroup.service.WorkoutGroupService;

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

import com.fitman.backend.WorkoutGroup.model.workout_groups;
@RestController
@RequestMapping("/api")  // Base path for the API
public class workout_groupsController {
    // This class is responsible for handling HTTP requests related to workout groups.
    // It will contain methods to create, read, update, and delete workout groups.
    // Each method will be mapped to a specific URL and HTTP method (GET, POST, PUT, DELETE).
    // The class will also handle validation and error handling for the requests.
    

	WorkoutGroupService workoutGroupService;
    // Accepts GET requests to /groups?name=chest
	// @GetMapping("/workout_groups")
    // public List<workout_groups> getExerises(
    //         @RequestParam(value = "name", defaultValue = "chest") String name) {

<<<<<<< Updated upstream
    //     return workoutGroupService.fetchWorkoutGroups();
    // }
    @Autowired  // Ensure Spring injects the service
    public workout_groupsController(WorkoutGroupService workoutGroupService) {
        this.workoutGroupService = workoutGroupService;
    }

    @PostMapping("/workoutgroups/save")
    public Iterable<workout_groups> saveWorkoutGroups(
        @RequestParam("workoutName") String workoutName, 
        @RequestBody List<String> names) {

        return workoutGroupService.SaveWorkoutGroups(workoutName, names);
    }



    @GetMapping("/find")
    public workout_groups getWorkoutByName(@RequestParam String name) {
        return workoutGroupService.getWorkoutGroupByName(name);
    }
    
=======
    @GetMapping("/workout_groups")
	public workout_groups Getworkout_groups(@RequestParam(value = "name", defaultValue = "chest") String name) {
		return new Greeting(counter.incrementAndGet(), String.format(template, name));
        // example data: 
        // {
        //     "id": 1,
        //     "name": "chest",
        //     "description": "chest workout",
        //     "exercises": [
        //         {
        //             "id": 1,
        //             "name": "bench press",
        //             "description": "bench press workout",
        //             "sets": 3,
        //             "reps": 10
        //         },
        //         {
        //             "id": 2,
        //             "name": "push up",
        //             "description": "push up workout",
        //             "sets": 3,
        //             "reps": 10
        //         }
        //     ]
        // }
	}
>>>>>>> Stashed changes
}
