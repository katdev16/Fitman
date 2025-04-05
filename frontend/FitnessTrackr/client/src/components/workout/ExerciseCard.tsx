import React from "react";
import { Badge } from "@/components/ui/badge";
import { Exercise } from "../../types";

interface ExerciseCardProps {
  exercise: Exercise;
  isSelected?: boolean;
  onClick?: (exercise: Exercise) => void;
  showBadges?: boolean;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  isSelected = false,
  onClick,
  showBadges = true,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(exercise);
    }
  };

  return (
    <div
      className={`flex items-center p-2 rounded-md ${
        onClick ? "cursor-pointer" : ""
      } ${
        isSelected
          ? "bg-primary-100 border border-primary"
          : onClick
          ? "hover:bg-gray-100"
          : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded overflow-hidden mr-3">
        {exercise.imageUrl && (
          <img
            src={exercise.imageUrl}
            alt={exercise.name}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{exercise.name}</h4>
        <p className="text-xs text-gray-500">{exercise.muscles}</p>
        {showBadges && (
          <div className="flex space-x-1 mt-1">
            <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
              {exercise.targetMuscle}
            </span>
            <span className="text-xs bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded-full">
              {exercise.equipment}
            </span>
          </div>
        )}
      </div>
      {onClick && (
        <div className="ml-3">
          {isSelected ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};