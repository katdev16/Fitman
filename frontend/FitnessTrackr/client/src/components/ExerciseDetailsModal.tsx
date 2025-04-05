import React from "react";

interface ExerciseDetailsModalProps {
  exercise: any;
  isOpen: boolean;
  onClose: () => void;
}

const ExerciseDetailsModal: React.FC<ExerciseDetailsModalProps> = ({ exercise, isOpen, onClose }) => {
  if (!isOpen) return null;  // Do not render if the modal is not open

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          <span className="sr-only">Close</span> ×
        </button>

        <div className="h-56 bg-gray-200 rounded-md mb-6 overflow-hidden">
          <img
            src={exercise.imageUrl}
            alt={`${exercise.name} exercise`}
            className="object-cover w-full h-full transition-transform transform hover:scale-105"
          />
        </div>

        <h4 className="font-semibold text-3xl text-gray-900 mb-2">{exercise.name}</h4>
        <p className="text-sm text-gray-600 mb-4">{exercise.muscles}</p>

        <div className="flex space-x-2 mb-6">
          <span className="px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full font-medium">
            {exercise.type}
          </span>
          <span
            className={`
              px-3 py-1 text-sm rounded-full font-medium
              ${exercise.level === "Beginner" ? "bg-green-100 text-green-800" : ""}
              ${exercise.level === "Intermediate" ? "bg-yellow-100 text-yellow-800" : ""}
              ${exercise.level === "Advanced" ? "bg-red-100 text-red-800" : ""}
            `}
          >
            {exercise.level}
          </span>
        </div>

        <p className="text-gray-700 leading-relaxed">{exercise.description}</p>
      </div>
    </div>
  );
};

export default ExerciseDetailsModal;
