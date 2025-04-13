package com.fitman.ExerciseService.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.fitman.ExerciseService.model.exercise;
// import com.fitman.ExerciseService.WorkoutGroup.model.workout_groups;

public interface exerciserepository extends CrudRepository<exercise, Integer> {
    exercise findFirstByNameContainingIgnoreCase(String name);
}