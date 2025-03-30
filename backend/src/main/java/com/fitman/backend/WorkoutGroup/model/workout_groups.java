package com.fitman.backend.WorkoutGroup.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "workout_groups")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class workout_groups {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private List<String> workouts = new ArrayList<>();
}
