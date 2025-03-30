package com.fitman.backend.ExerciseSchedule.model;

import java.util.List;

public class ExerciseSchedule {
    private String name;
    private String description;
    private List<String> workoutGroups;


    public ExerciseSchedule() {}

    public ExerciseSchedule(String name, String description, List<String> workoutGroups) {
        this.name = name;
        this.description = description;
        this.workoutGroups = workoutGroups;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getWorkoutGroups() {
        return workoutGroups;
    }

    public void setWorkoutGroups(List<String> workoutGroups) {
        this.workoutGroups = workoutGroups;
    }
}
