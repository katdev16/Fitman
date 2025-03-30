package com.fitman.backend.ExerciseSchedule.repository;

import org.springframework.data.repository.CrudRepository; 
import com.fitman.backend.ExerciseSchedule.model.ExerciseSchedule;

public interface ExerciseScheduleRepository extends CrudRepository<ExerciseSchedule, Long> {}