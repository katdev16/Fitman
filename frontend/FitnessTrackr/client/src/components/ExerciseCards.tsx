import React, { useState } from "react";
import ExerciseDetailsModal from "./ExerciseDetailsModal";  // Import the modal component

const ExerciseCards = ({ filteredExercises }: { filteredExercises: any[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);

  const openModal = (exercise: any) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExercise(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredExercises.map((exercise) => (
        <div
          key={exercise.id}
          className="group relative bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
          onClick={() => openModal(exercise)}  // Open the modal when clicked
        >
          <div className="h-40 bg-gray-200 rounded-md mb-3 overflow-hidden">
            <img
              src={exercise.imageUrl}
              alt={`${exercise.name} exercise`}
              className="object-cover w-full h-full"
            />
          </div>
          <h4 className="font-medium text-gray-900">{exercise.name}</h4>
          <p className="text-sm text-gray-500 mb-2">{exercise.muscles}</p>
          <div className="flex space-x-2">
            <span className="px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full">
              {exercise.type}
            </span>
            <span
              className={`
                px-3 py-1 text-sm rounded-full
                ${exercise.level === "Beginner" ? "bg-green-100 text-green-800" : ""}
                ${exercise.level === "Intermediate" ? "bg-yellow-100 text-yellow-800" : ""}
                ${exercise.level === "Advanced" ? "bg-red-100 text-red-800" : ""}
              `}
            >
              {exercise.level}
            </span>
          </div>
        </div>
      ))}
      
      {/* Pass the selectedExercise and modal state to the modal component */}
      <ExerciseDetailsModal
        exercise={selectedExercise}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default ExerciseCards;
