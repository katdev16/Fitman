import React, { useState } from "react";
import CreateWorkoutModal from "@/components/CreateWorkoutModal";
import ExerciseDetailsModal from "@/components/ExerciseDetailsModal";
import { Exercise } from "@/types";

interface WorkoutModalProps {
  workouts: string[];
  onClose: () => void;
  onSelect: (exercise: Exercise) => void;
}

const WorkoutModal: React.FC<WorkoutModalProps> = ({ workouts, onClose, onSelect }) => {
  
  const [search, setSearch] = useState<string>("");

  const [showModal, setShowModal] = useState(false);

  const exercises = [
    {
      id: 1,
      name: "Bench Press",
      muscles: "Chest, Triceps, Shoulders",
      type: "Strength",
      level: "Beginner",
      setsReps: "3 sets of 10 reps",
      imageUrl: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
    },
    {
      id: 2,
      name: "Squats",
      muscles: "Quadriceps, Hamstrings, Glutes",
      type: "Strength",
      level: "Intermediate",
      setsReps: "3 sets of 10 reps",
      imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
    },
    {
      id: 3,
      name: "Pull-ups",
      muscles: "Back, Biceps, Shoulders",
      type: "Strength",
      level: "Advanced",
      setsReps: "3 sets of 10 reps",
      imageUrl: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
    },
    
  ];

   const [selectedExercise, setSelectedExercise] = useState<typeof exercises[0] | null>(null);

  // const handleCardClick = (exercise: typeof exercises[0]) => {
  //   setSelectedExercise(exercise);
  //   setShowModal(true);
  // };

  // Filter workouts based on search input
  const filteredWorkouts = workouts.filter((workout) =>
    workout.toLowerCase().includes(search.toLowerCase())
  );

  const handleWorkoutClick = (workout: string) => {
    const foundExercise = exercises.find((exercise) => exercise.name === workout);
    if (foundExercise) {
 
      setSelectedExercise(foundExercise);
      setShowModal(true);
    } else {
      alert("Exercise not found");
    }
    // alert(`You selected: ${workout}`); // Change this to your desired action
    
  };

  //  const handleSaveWorkout = (name: string, exercises: string[]) => {
  //   setWorkouts([...workouts, { name, exercises }]);
  // };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-3">Workout List</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search workouts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Workout List */}
        <ul className="text-gray-700 max-h-60 overflow-y-auto">
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout, index) => (
              <li
                key={index}
                onClick={() => handleWorkoutClick(workout)}
                className="py-2 px-3 cursor-pointer hover:bg-gray-100 border-b border-gray-300"
              >
                {workout}
              </li>
            ))
          ) : (
            <li className="text-gray-500 py-2 text-center">No workouts found</li>
          )}
        </ul>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Close
        </button>
      </div>
      {showModal && selectedExercise && (
      <ExerciseDetailsModal
        exercise={selectedExercise}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    )}

      
    </div>

    
  );
};

export default WorkoutModal;
