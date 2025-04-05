import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Exercise } from "../../types";
import { ExerciseDetailCard } from "./ExerciseDetailCard";
import { ExerciseSortControls, SortOption } from "./ExerciseSortControls";

interface ExerciseLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  exercises: Exercise[];
  onAddExercise?: (exercise: Exercise) => void;
}

export const ExerciseLibrary: React.FC<ExerciseLibraryProps> = ({
  isOpen,
  onClose,
  exercises,
  onAddExercise,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("name");
  const [filterMuscle, setFilterMuscle] = useState<string>("");
  const [filterEquipment, setFilterEquipment] = useState<string>("");

  // Extract unique muscle groups and equipment types using useMemo to improve performance
  const muscleGroups = useMemo(() => {
    const uniqueMuscles: string[] = [];
    exercises.forEach(e => {
      if (!uniqueMuscles.includes(e.targetMuscle)) {
        uniqueMuscles.push(e.targetMuscle);
      }
    });
    return uniqueMuscles;
  }, [exercises]);

  const equipmentTypes = useMemo(() => {
    const uniqueEquipment: string[] = [];
    exercises.forEach(e => {
      if (!uniqueEquipment.includes(e.equipment)) {
        uniqueEquipment.push(e.equipment);
      }
    });
    return uniqueEquipment;
  }, [exercises]);

  // Apply filters and sorting
  const filteredExercises = useMemo(() => {
    return exercises
      .filter((exercise) => {
        // Apply search filter
        if (searchQuery && !exercise.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        
        // Apply muscle filter
        if (filterMuscle && exercise.targetMuscle !== filterMuscle) {
          return false;
        }
        
        // Apply equipment filter
        if (filterEquipment && exercise.equipment !== filterEquipment) {
          return false;
        }
        
        return true;
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
  }, [exercises, searchQuery, filterMuscle, filterEquipment, sortOption]);

  const handleViewExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const handleAddExercise = (exercise: Exercise) => {
    if (onAddExercise) {
      onAddExercise(exercise);
      onClose();
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilterMuscle("");
    setFilterEquipment("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl">Exercise Library</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 space-y-4">
            <div>
              <label className="text-sm font-medium">Search Exercises</label>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name..."
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Filter by Muscle</label>
              <select
                value={filterMuscle}
                onChange={(e) => setFilterMuscle(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mt-1 text-sm p-2"
              >
                <option value="">All Muscles</option>
                {muscleGroups.map((muscle) => (
                  <option key={muscle} value={muscle}>
                    {muscle}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Filter by Equipment</label>
              <select
                value={filterEquipment}
                onChange={(e) => setFilterEquipment(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mt-1 text-sm p-2"
              >
                <option value="">All Equipment</option>
                {equipmentTypes.map((equipment) => (
                  <option key={equipment} value={equipment}>
                    {equipment}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
              <ExerciseSortControls
                sortOption={sortOption}
                setSortOption={setSortOption}
                className="w-full"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            {selectedExercise ? (
              <div className="h-full flex flex-col">
                <div className="mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedExercise(null)}
                    className="text-sm"
                  >
                    ← Back to list
                  </Button>
                </div>

                <div className="bg-white rounded-md p-4 space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3 h-48 bg-gray-200 rounded-md flex items-center justify-center">
                      {selectedExercise.imageUrl ? (
                        <img
                          src={selectedExercise.imageUrl}
                          alt={selectedExercise.name}
                          className="h-full w-full object-cover rounded-md"
                        />
                      ) : (
                        <span className="text-gray-400">No image available</span>
                      )}
                    </div>

                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-2">{selectedExercise.name}</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-medium">Muscle Group:</span> {selectedExercise.muscles}
                        </div>
                        <div>
                          <span className="font-medium">Target Muscle:</span> {selectedExercise.targetMuscle}
                        </div>
                        <div>
                          <span className="font-medium">Equipment:</span> {selectedExercise.equipment}
                        </div>
                        <div>
                          <span className="font-medium">Level:</span> {selectedExercise.level}
                        </div>
                        <div>
                          <span className="font-medium">Type:</span> {selectedExercise.type}
                        </div>
                      </div>
                    </div>
                  </div>

                  {onAddExercise && (
                    <Button
                      className="w-full"
                      onClick={() => handleAddExercise(selectedExercise)}
                    >
                      Add to Workout
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col">
                <div className="text-sm text-gray-500 mb-2">
                  {filteredExercises.length} exercises found
                </div>

                <ScrollArea className="h-[50vh]">
                  <div className="grid grid-cols-1 gap-2">
                    {filteredExercises.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        No exercises found matching your criteria.
                      </div>
                    ) : (
                      filteredExercises.map((exercise) => (
                        <div
                          key={exercise.id}
                          onClick={() => handleViewExercise(exercise)}
                          className="cursor-pointer"
                        >
                          <ExerciseDetailCard exercise={exercise} />
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};