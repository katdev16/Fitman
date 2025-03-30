package com.fitman.backend.WorkoutGroup.controller;

import java.util.concurrent.atomic.AtomicLong;
import com.fitman.backend.WorkoutGroup.model.workout_groups;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

public class workout_groupsController {
    // This class is responsible for handling HTTP requests related to workout groups.
    // It will contain methods to create, read, update, and delete workout groups.
    // Each method will be mapped to a specific URL and HTTP method (GET, POST, PUT, DELETE).
    // The class will also handle validation and error handling for the requests.
    

    private static final String template = "Hello, %s!";
	private final AtomicLong counter = new AtomicLong();

    // Accepts GET requests to /groups?name=chest
	@PostMapping("/workout_groups")
	public workout_groups workout_groups(@RequestParam(value = "name", defaultValue = "chest") String name) {
		return new Greeting(counter.incrementAndGet(), String.format(template, name));
	}

    @PostMapping("/workout_groups")
	public workout_groups workout_groups(@RequestParam(value = "name", defaultValue = "chest") String name) {
		return new Greeting(counter.incrementAndGet(), String.format(template, name));
	}
}
