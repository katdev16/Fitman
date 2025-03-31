package com.fitman.backend.Exercise.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.fitman.backend.Exercise.model.exercise;
import com.fitman.backend.WorkoutGroup.model.workout_groups;

public interface exerciserepository extends CrudRepository<exercise, Integer> {
    exercise findFirstByNameContainingIgnoreCase(String name);

}