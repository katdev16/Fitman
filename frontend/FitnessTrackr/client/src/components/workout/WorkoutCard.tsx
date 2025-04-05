import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Workout } from "../../types";
import { CalendarIcon, DumbbellIcon, ClockIcon, TrashIcon, PencilIcon } from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
  onStart: (workout: Workout) => void;
  onDelete: (id: number) => void;
  onEdit?: (workout: Workout) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
  onStart,
  onDelete,
  onEdit,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(workout.id);
  };
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(workout);
    }
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(workout.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{workout.name}</CardTitle>
          {onToggleFavorite && (
            <button
              onClick={handleFavoriteToggle}
              className="text-gray-400 hover:text-yellow-500"
            >
              {isFavorite ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <CalendarIcon className="w-4 h-4 mr-1" />
          <span>{formatDate(workout.date)}</span>
        </div>
      </CardHeader>

      <CardContent className="py-2 flex-grow">
        <div className="flex space-x-2 mb-2">
          <Badge className={getIntensityColor(workout.intensity)}>
            {workout.intensity} Intensity
          </Badge>
          <Badge variant="outline" className="flex items-center">
            <ClockIcon className="w-3 h-3 mr-1" />
            {workout.duration} min
          </Badge>
        </div>

        <div className="text-sm">
          <div className="flex items-center mb-1">
            <DumbbellIcon className="w-4 h-4 mr-1 text-gray-500" />
            <span className="font-medium">
              {workout.exercises.length} Exercise{workout.exercises.length !== 1 ? "s" : ""}
            </span>
          </div>

          <ul className="list-disc list-inside pl-1 text-gray-600 text-xs">
            {workout.exercises.slice(0, 3).map((exercise) => (
              <li key={exercise.exerciseId} className="truncate">
                {exercise.exerciseName}
              </li>
            ))}
            {workout.exercises.length > 3 && (
              <li className="text-gray-500">+{workout.exercises.length - 3} more</li>
            )}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <div className="flex w-full gap-2">
          <Button
            variant="destructive"
            size="sm"
            className="px-3 text-xs"
            onClick={handleDelete}
          >
            <TrashIcon className="w-4 h-4 mr-1" />
            Delete
          </Button>
          
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              className="px-3 text-xs"
              onClick={handleEdit}
            >
              <PencilIcon className="w-4 h-4 mr-1" />
              Edit
            </Button>
          )}
          
          <Button
            variant="default"
            size="sm"
            className="px-4 text-xs ml-auto"
            onClick={() => onStart(workout)}
          >
            Start Workout
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};