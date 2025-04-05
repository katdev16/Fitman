import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import ExerciseSelector from "./ExerciseSelector";

interface Exercise {
  id: number;
  name: string;
  setsReps: string;
  muscles: string;
  type: string;
  level: string;
  imageUrl: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTitle?: string;
  initialExercises?: Exercise[];
  onSave: (updatedTitle: string, updatedExercises: Exercise[]) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  initialTitle = "",
  initialExercises = [],
  onSave,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);

  useEffect(() => {
    setTitle(initialTitle);
    setExercises(initialExercises);
  }, [initialTitle, initialExercises]);

  const handleExerciseChange = (index: number, field: keyof Exercise, value: string) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value } as Exercise;
    setExercises(updated);
  };

  const addExercise = (exercise: Exercise) => {
    setExercises((prev) => [...prev, exercise]);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(title, exercises);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-40" aria-hidden="true" />
      <Dialog.Panel className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-lg z-50">
        <Dialog.Title className="text-xl font-semibold mb-4">Edit Workout</Dialog.Title>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          placeholder="Workout Title"
        />

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {exercises.map((exercise, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={exercise.name}
                readOnly
                className="w-1/2 p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
              />
              <input
                type="text"
                value={exercise.setsReps}
                readOnly
                className="w-1/2 p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
              />
              <button onClick={() => removeExercise(index)} className="text-red-500">✕</button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between">
          {/* <Button variant="outline" onClick={() => addExercise({
            id: Date.now(), // Temporary id for the new exercise
            name: "New Exercise", 
            setsReps: "3x10", 
            muscles: "Unknown", 
            type: "Strength", 
            level: "Beginner", 
            imageUrl: ""
          })}>
            + Add Exercise
          </Button> */}
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>

        {/* ExerciseSelector embedded directly inside the modal */}
        <div className="mt-4">
          <ExerciseSelector
            workouts={[
              { id: 1, name: "Push-up", setsReps: "3x12", muscles: "Chest", type: "Strength", level: "Beginner", imageUrl: "" },
              { id: 2, name: "Squat", setsReps: "4x15", muscles: "Legs", type: "Strength", level: "Intermediate", imageUrl: "" },
             
              // Add more workouts here
            ]}
            onSelect={addExercise}  // Add exercise when selected
          />
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default EditModal;
