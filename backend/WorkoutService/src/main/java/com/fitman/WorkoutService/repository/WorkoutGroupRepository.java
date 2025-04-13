package com.fitman.WorkoutService.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.fitman.WorkoutService.ExerciseService.model.Exercise;
import com.fitman.WorkoutService.model.WorkoutServiceGroups;

public interface WorkoutGroupRepository extends CrudRepository<WorkoutServiceGroups, Integer> {
    WorkoutServiceGroups findByNameIgnoreCase(String name);
}