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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    public void saveWorkoutGroups( 
        @RequestParam("workoutName") String workoutName, 
        @RequestBody List<String> names) {

        workoutGroupService.saveWorkout(workoutName, names);
        
    }



    @GetMapping("/find")
    public WorkoutServiceGroups getWorkoutByName(@RequestParam String name) {
        return workoutGroupService.getWorkoutGroupByName(name);
    }


    @GetMapping
    public List<WorkoutServiceGroups> getAll() {
        return workoutGroupService.getAllWorkouts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutServiceGroups> getById(@PathVariable int id) {
        return workoutGroupService.getWorkoutById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        boolean deleted = workoutGroupService.deleteWorkout(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateWorkout(
            @PathVariable int id,
            @RequestParam String workoutName,
            @RequestBody List<String> submittedExercises
    ) {
        String result = workoutGroupService.updateWorkout(id, workoutName, submittedExercises);
        if (result.startsWith("Invalid")) {
            return ResponseEntity.badRequest().body(result);
        } else if (result.equals("Workout not found")) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(result);
        }
    }


    
}
