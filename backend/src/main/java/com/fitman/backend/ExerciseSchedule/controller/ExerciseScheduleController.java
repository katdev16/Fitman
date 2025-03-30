package com.fitman.backend.ExerciseSchedule.controller;

public class ExerciseScheduleController {
    // This class is currently empty. You can add methods and logic here as needed.
    // For example, you might want to add methods to handle HTTP requests related to exercise schedules.
    

    @GetMapping("/day/{day}")
    public fruit isFruitAvailable(@RequestParam String fruitType) {
      return fruit.find(fruitType);
    }

    @PostMapping("/day/{day}")
    public fruit isFruitAvailable(@RequestParam String fruitType) {
      return fruit.find(fruitType);
    }
}
