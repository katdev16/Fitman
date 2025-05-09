package com.fitman.WorkoutService.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fitman.WorkoutService.ExerciseService.model.Exercise;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
// [
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://v2.exercisedb.io/image/Y7ZMRcaqOAJ0TM",
//     "id": "0007",
//     "name": "alternate lateral pulldown",
//     "target": "lats",
//     "secondaryMuscles": [
//       "biceps",
//       "rhomboids"
//     ],
//     "instructions": [
//       "Sit on the cable machine with your back straight and feet flat on the ground.",
//       "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
//       "Lean back slightly and pull the handles towards your chest, squeezing your shoulder blades together.",
//       "Pause for a moment at the peak of the movement, then slowly release the handles back to the starting position.",
//       "Repeat for the desired number of repetitions."
//     ]
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://v2.exercisedb.io/image/jnpK6a5TqleIzH",
//     "id": "0015",
//     "name": "assisted parallel close grip pull-up",
//     "target": "lats",
//     "secondaryMuscles": [
//       "biceps",
//       "forearms"
//     ],
//     "instructions": [
//       "Adjust the machine to your desired weight and height.",
//       "Place your hands on the parallel bars with a close grip, palms facing each other.",
//       "Hang from the bars with your arms fully extended and your feet off the ground.",
//       "Engage your back muscles and pull your body up towards the bars, keeping your elbows close to your body.",
//       "Continue pulling until your chin is above the bars.",
//       "Pause for a moment at the top, then slowly lower your body back down to the starting position.",
//       "Repeat for the desired number of repetitions."
//     ]
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://v2.exercisedb.io/image/in2SrrRIFfNUrh",
//     "id": "0017",
//     "name": "assisted pull-up",
//     "target": "lats",
//     "secondaryMuscles": [
//       "biceps",
//       "forearms"
//     ],
//     "instructions": [
//       "Adjust the machine to your desired weight and height settings.",
//       "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
//       "Hang with your arms fully extended and your feet off the ground.",
//       "Engage your back muscles and pull your body up towards the handles, keeping your elbows close to your body.",
//       "Continue pulling until your chin is above the handles.",
//       "Pause for a moment at the top, then slowly lower your body back down to the starting position.",
//       "Repeat for the desired number of repetitions."
//     ]
//   }
// ]
@Entity
@Table(name = "WorkoutServiceGroups")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class WorkoutServiceGroups {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @OneToMany
    private List<Exercise> exercises = new ArrayList<>();




    private int duration; // in minutes, assumed
    private Intensity intensity;
    // private List<WorkoutExercise> exercises;
    private boolean completed;
    private LocalDate date;

    // Enum for intensity
    public enum Intensity {
        LOW, MEDIUM, HIGH
    }

    // getter and Setter
   
    // public String getName() {
    //     return name;
    // }
    // public void setName(String name) {
    //     this.name = name;
    // }
   
    // public List<Exercise>  getWorkouts() {
    //     return exercises;
    // }
    // public void setWorkouts(List<Exercise> exercises) {
    //     this.exercises = exercises;
    // }



    // public WorkoutServiceGroups() {}

    public WorkoutServiceGroups(Long id, String name, int duration, Intensity intensity,
                   List<Exercise> exercises, boolean completed, LocalDate date) {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.intensity = intensity;
        this.exercises = exercises;
        this.completed = completed;
        this.date = date;
    }




    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public Intensity getIntensity() {
        return intensity;
    }

    public void setIntensity(Intensity intensity) {
        this.intensity = intensity;
    }

    public List<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
