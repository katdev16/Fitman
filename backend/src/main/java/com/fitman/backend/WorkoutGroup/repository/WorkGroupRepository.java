package com.fitman.backend.WorkoutGroup.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.fitman.backend.Exercise.model.exercise;
import com.fitman.backend.WorkoutGroup.model.workout_groups;

public interface WorkGroupRepository extends CrudRepository<workout_groups, Integer> {
    exercise findFirstByNameContainingIgnoreCase(String name);
}