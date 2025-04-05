import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Workout, WorkoutExercise, WorkoutSet } from "../../types";
import { ClockIcon, XCircleIcon, DumbbellIcon } from "lucide-react";

interface WorkoutInProgressProps {
  workout: Workout;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (workout: Workout) => void;
}

export const WorkoutInProgress: React.FC<WorkoutInProgressProps> = ({
  workout,
  isOpen,
  onClose,
  onComplete,
}) => {
  const [activeWorkout, setActiveWorkout] = useState<Workout>({
    ...workout,
    completed: false,
  });
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (isOpen && !timer) {
      const interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
      setTimer(interval);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
    };
  }, [isOpen, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleSetCompleted = (
    exerciseIndex: number,
    setIndex: number,
    completed: boolean
  ) => {
    const updatedExercises = [...activeWorkout.exercises];
    const updatedSets = [...updatedExercises[exerciseIndex].sets];
    updatedSets[setIndex] = {
      ...updatedSets[setIndex],
      completed,
    };
    updatedExercises[exerciseIndex] = {
      ...updatedExercises[exerciseIndex],
      sets: updatedSets,
    };

    setActiveWorkout({
      ...activeWorkout,
      exercises: updatedExercises,
    });
  };

  const handleCompleteWorkout = () => {
    // Mark all incomplete sets as completed
    const completedExercises = activeWorkout.exercises.map((exercise) => ({
      ...exercise,
      sets: exercise.sets.map((set) => ({ ...set, completed: true })),
    }));

    onComplete({
      ...activeWorkout,
      exercises: completedExercises,
      completed: true,
      duration: Math.max(Math.floor(elapsedTime / 60), 1), // At least 1 minute
    });

    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  const handleEndEarly = () => {
    const completedSets = activeWorkout.exercises.map((exercise) => ({
      ...exercise,
      // Only keep completed sets
      sets: exercise.sets.filter((set) => set.completed),
    }));

    // Filter out exercises with no completed sets
    const completedExercises = completedSets.filter(
      (exercise) => exercise.sets.length > 0
    );

    onComplete({
      ...activeWorkout,
      exercises: completedExercises,
      completed: false,
      duration: Math.max(Math.floor(elapsedTime / 60), 1), // At least 1 minute
    });

    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  // Calculate progress percentage
  const totalSets = activeWorkout.exercises.reduce(
    (acc, exercise) => acc + exercise.sets.length,
    0
  );
  const completedSets = activeWorkout.exercises.reduce(
    (acc, exercise) =>
      acc + exercise.sets.filter((set) => set.completed).length,
    0
  );
  const progressPercentage = totalSets > 0 ? (completedSets / totalSets) * 100 : 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Workout in Progress</DialogTitle>
          <div className="flex items-center justify-between mt-2">
            <Badge
              variant="outline"
              className="flex items-center text-sm py-1 px-2"
            >
              <ClockIcon className="w-4 h-4 mr-1" />
              {formatTime(elapsedTime)}
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              {completedSets} / {totalSets} sets completed
            </Badge>
          </div>
        </DialogHeader>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="space-y-4">
          {activeWorkout.exercises.map((exercise, exerciseIndex) => (
            <div
              key={exercise.exerciseId}
              className="border rounded-md p-3 bg-gray-50"
            >
              <h3 className="font-medium text-sm flex items-center">
                <DumbbellIcon className="w-4 h-4 mr-1 text-gray-600" />
                {exercise.exerciseName}
              </h3>

              <div className="mt-2 space-y-2">
                {exercise.sets.map((set, setIndex) => (
                  <div
                    key={setIndex}
                    className={`flex items-center justify-between p-2 rounded ${
                      set.completed ? "bg-green-50" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center">
                      <Checkbox
                        id={`set-${exerciseIndex}-${setIndex}`}
                        checked={set.completed}
                        onCheckedChange={(checked) =>
                          toggleSetCompleted(
                            exerciseIndex,
                            setIndex,
                            checked as boolean
                          )
                        }
                      />
                      <label
                        htmlFor={`set-${exerciseIndex}-${setIndex}`}
                        className="ml-2 text-sm font-medium"
                      >
                        Set {setIndex + 1}
                      </label>
                    </div>
                    <div className="text-sm text-gray-600">
                      {set.reps} reps × {set.weight} lbs
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="mt-4 flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleEndEarly}
            className="flex items-center"
          >
            <XCircleIcon className="w-4 h-4 mr-1" />
            End Workout Early
          </Button>
          <Button onClick={handleCompleteWorkout} className="w-full sm:w-auto">
            Complete Workout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};