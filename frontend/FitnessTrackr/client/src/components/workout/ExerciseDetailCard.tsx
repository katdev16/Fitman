import React from "react";
import { Badge } from "@/components/ui/badge";
import { Exercise } from "../../types";

interface ExerciseDetailCardProps {
  exercise: Exercise;
}

export const ExerciseDetailCard: React.FC<ExerciseDetailCardProps> = ({
  exercise,
}) => {
  return (
    <div className="border rounded-md p-3 hover:border-primary hover:bg-gray-50 transition-colors duration-200">
      <div className="flex">
        <div className="h-16 w-16 bg-gray-200 rounded overflow-hidden mr-3 flex-shrink-0">
          {exercise.gifUrl && (
            <img
              src={exercise.gifUrl}
              alt={exercise.name}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div>
          <h4 className="font-medium text-sm">{exercise.name}</h4>
          <p className="text-xs text-gray-500 mb-1">{exercise.muscles}</p>
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
              {exercise.type}
            </Badge>
            <Badge
              variant="secondary"
              className={`text-xs ${
                exercise.level === "Beginner"
                  ? "bg-green-100 text-green-800"
                  : exercise.level === "Intermediate"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {exercise.level}
            </Badge>
            <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800">
              {exercise.targetMuscle}
            </Badge>
            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-800">
              {exercise.equipment}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};