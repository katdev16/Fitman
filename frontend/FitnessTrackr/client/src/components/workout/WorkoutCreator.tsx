import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Exercise, Workout, WorkoutExercise, WorkoutSet } from "../../types";
import { ExerciseCard } from "./ExerciseCard";
import { ExerciseSortControls, SortOption } from "./ExerciseSortControls";

interface WorkoutCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workout: Workout) => void;
  exercises: Exercise[];
  workoutToEdit?: Workout | null;
}

export const WorkoutCreator: React.FC<WorkoutCreatorProps> = ({
  isOpen,
  onClose,
  onSave,
  exercises,
  workoutToEdit
}) => {
  const [workoutName, setWorkoutName] = useState("New Workout");
  const [intensity, setIntensity] = useState<"Low" | "Medium" | "High">("Medium");
  const [duration, setDuration] = useState(30);
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("name");
  const [searchQuery, setSearchQuery] = useState("");
  
  const resetForm = useCallback(() => {
    setWorkoutName("New Workout");
    setIntensity("Medium");
    setDuration(30);
    setSelectedExercises([]);
    setSearchQuery("");
    setSortOption("name");
  }, []);

  // Initialize form with workout data if editing
  useEffect(() => {
    if (workoutToEdit) {
      setWorkoutName(workoutToEdit.name);
      setIntensity(workoutToEdit.intensity);
      setDuration(workoutToEdit.duration);
      setSelectedExercises(workoutToEdit.exercises);
    } else {
      resetForm();
    }
  }, [workoutToEdit, resetForm]);

  const handleAddExercise = (exercise: Exercise) => {
    if (selectedExercises.some((e) => e.exerciseId === exercise.id)) {
      return;
    }

    const newExercise: WorkoutExercise = {
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      sets: [
        { reps: 10, weight: 50, completed: false },
        { reps: 10, weight: 50, completed: false },
        { reps: 10, weight: 50, completed: false },
      ],
    };

    setSelectedExercises([...selectedExercises, newExercise]);
  };

  const handleRemoveExercise = (exerciseId: number) => {
    setSelectedExercises(
      selectedExercises.filter((e) => e.exerciseId !== exerciseId)
    );
  };

  const handleUpdateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: keyof WorkoutSet,
    value: number
  ) => {
    const updatedExercises = [...selectedExercises];
    const updatedSets = [...updatedExercises[exerciseIndex].sets];
    updatedSets[setIndex] = {
      ...updatedSets[setIndex],
      [field]: value,
    };
    updatedExercises[exerciseIndex] = {
      ...updatedExercises[exerciseIndex],
      sets: updatedSets,
    };

    setSelectedExercises(updatedExercises);
  };

  const handleAddSet = (exerciseIndex: number) => {
    const updatedExercises = [...selectedExercises];
    const lastSet = updatedExercises[exerciseIndex].sets.slice(-1)[0];
    const newSet = {
      reps: lastSet ? lastSet.reps : 10,
      weight: lastSet ? lastSet.weight : 50,
      completed: false,
    };
    updatedExercises[exerciseIndex] = {
      ...updatedExercises[exerciseIndex],
      sets: [...updatedExercises[exerciseIndex].sets, newSet],
    };

    setSelectedExercises(updatedExercises);
  };

  const handleRemoveSet = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...selectedExercises];
    const updatedSets = [...updatedExercises[exerciseIndex].sets];
    updatedSets.splice(setIndex, 1);
    updatedExercises[exerciseIndex] = {
      ...updatedExercises[exerciseIndex],
      sets: updatedSets,
    };

    setSelectedExercises(updatedExercises);
  };

  const handleCreateWorkout = () => {
    const workout: Workout = {
      // If we're editing an existing workout, keep its id; otherwise, create a new one
      id: workoutToEdit ? workoutToEdit.id : Date.now(),
      name: workoutName,
      duration,
      intensity,
      exercises: selectedExercises,
      // Keep the completed status if editing, or set to false if new
      completed: workoutToEdit ? workoutToEdit.completed : false,
      // Keep the original date if editing, or set to now if new
      date: workoutToEdit ? workoutToEdit.date : new Date().toISOString(),
    };

    onSave(workout);
    resetForm();
  };

  // Filter and sort exercises based on search and sort option
  const filteredExercises = exercises
    .filter((exercise) => {
      if (!searchQuery.trim()) return true;
      return (
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.targetMuscle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.equipment.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "targetMuscle") {
        return a.targetMuscle.localeCompare(b.targetMuscle);
      } else {
        return a.equipment.localeCompare(b.equipment);
      }
    });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {workoutToEdit ? "Edit Workout" : "Create New Workout"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Workout Name</label>
              <Input
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Intensity</label>
                <Select
                  value={intensity}
                  onValueChange={(value: "Low" | "Medium" | "High") =>
                    setIntensity(value)
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Intensity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Duration (min)</label>
                <Input
                  type="number"
                  min={1}
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 30)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Selected Exercises</h3>
              {selectedExercises.length === 0 ? (
                <div className="text-center p-4 border border-dashed rounded-md text-gray-500">
                  No exercises selected yet. Add some from the right panel.
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedExercises.map((exercise, exerciseIndex) => (
                    <div
                      key={exercise.exerciseId}
                      className="border rounded-md p-3"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{exercise.exerciseName}</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={() => handleRemoveExercise(exercise.exerciseId)}
                        >
                          Remove
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {exercise.sets.map((set, setIndex) => (
                          <div
                            key={setIndex}
                            className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 items-center"
                          >
                            <span className="text-xs font-medium">
                              Set {setIndex + 1}
                            </span>
                            <div>
                              <label className="text-xs">Reps</label>
                              <Input
                                type="number"
                                min={1}
                                className="h-7 text-xs"
                                value={set.reps}
                                onChange={(e) =>
                                  handleUpdateSet(
                                    exerciseIndex,
                                    setIndex,
                                    "reps",
                                    parseInt(e.target.value) || 1
                                  )
                                }
                              />
                            </div>
                            <div>
                              <label className="text-xs">Weight (lbs)</label>
                              <Input
                                type="number"
                                min={0}
                                className="h-7 text-xs"
                                value={set.weight}
                                onChange={(e) =>
                                  handleUpdateSet(
                                    exerciseIndex,
                                    setIndex,
                                    "weight",
                                    parseInt(e.target.value) || 0
                                  )
                                }
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 text-red-500"
                              onClick={() => handleRemoveSet(exerciseIndex, setIndex)}
                              disabled={exercise.sets.length <= 1}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2 text-xs"
                        onClick={() => handleAddSet(exerciseIndex)}
                      >
                        Add Set
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Search Exercises</label>
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, muscle or equipment..."
                  className="mt-1"
                />
              </div>

              <ExerciseSortControls
                sortOption={sortOption}
                setSortOption={setSortOption}
              />

              <div className="border rounded-md overflow-hidden">
                <div className="max-h-[40vh] overflow-y-auto">
                  {filteredExercises.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No exercises found matching your search criteria.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-2 p-2">
                      {filteredExercises.map((exercise) => (
                        <ExerciseCard
                          key={exercise.id}
                          exercise={exercise}
                          isSelected={selectedExercises.some(
                            (e) => e.exerciseId === exercise.id
                          )}
                          onClick={handleAddExercise}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreateWorkout} disabled={selectedExercises.length === 0}>
            {workoutToEdit ? "Save Changes" : "Create Workout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};