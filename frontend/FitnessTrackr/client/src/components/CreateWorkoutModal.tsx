import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface CreateWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, exercises: string[]) => void;
}

const CreateWorkoutModal: React.FC<CreateWorkoutModalProps> = ({ isOpen, onClose, onSave }) => {
  const { toast } = useToast();
  const [workoutName, setWorkoutName] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  // Mock exercise list (You can replace this with real data)
  const allExercises = ["Push-ups", "Squats", "Deadlifts", "Planks", "Pull-ups"];

  // Filter exercises based on search input
  const filteredExercises = allExercises.filter((exercise) =>
    exercise.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (!workoutName.trim()) {
      toast({ title: "Error", description: "Workout name is required", variant: "destructive" });
      return;
    }
    if (selectedExercises.length === 0) {
      toast({ title: "Error", description: "At least one exercise must be selected", variant: "destructive" });
      return;
    }

    onSave(workoutName, selectedExercises);
    console.log("Workout saved:", { name: workoutName, exercises: selectedExercises });
    setWorkoutName(""); // Reset after saving
    setSelectedExercises([]);
    onClose();
  };

  const toggleExercise = (exercise: string) => {
    setSelectedExercises((prev) =>
      prev.includes(exercise) ? prev.filter((ex) => ex !== exercise) : [...prev, exercise]
    );
  };

  return (
    <>
      {/* Overlay for Modal visibility */}
      <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? "block" : "hidden"}`}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-3">Create New Workout</h2>

          {/* Workout Name Input */}
          <Input
            placeholder="Workout Name"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Search Input */}
          <Input
            placeholder="Search Exercises"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Exercise Selection */}
          <div className="space-y-2 mt-4">
            <p className="font-medium text-gray-700">Select Exercises:</p>
            <div className="space-y-2">
              {filteredExercises.map((exercise) => (
                <div key={exercise} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedExercises.includes(exercise)}
                    onChange={() => toggleExercise(exercise)}
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                  />
                  <label className="text-gray-700">{exercise}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Save and Close Buttons */}
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={onClose} className="w-1/3">
              Cancel
            </Button>
            <Button onClick={handleSave} className="w-1/3">
              Save Workout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateWorkoutModal;
