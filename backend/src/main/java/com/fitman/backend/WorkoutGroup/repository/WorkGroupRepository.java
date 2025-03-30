package com.fitman.backend.WorkoutGroup.repository;

import org.springframework.data.repository.CrudRepository; 
import com.fitman.backend.WorkoutGroup.model.workout_groups;

public interface WorkGroupRepository extends CrudRepository<workout_groups, Integer> {}