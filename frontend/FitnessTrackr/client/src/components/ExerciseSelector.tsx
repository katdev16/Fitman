import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Exercise } from "@/types";

interface ExerciseSelectorProps {
  workouts: Exercise[];
  onSelect: (exercise: Exercise) => void;
}

const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({ workouts, onSelect }) => {
  const itemsPerPage = 5;  // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter workouts based on the search query
  const filteredWorkouts = workouts.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total pages for the filtered workouts
  const totalPages = Math.ceil(filteredWorkouts.length / itemsPerPage);

  // Get the workouts for the current page
  const paginatedWorkouts = filteredWorkouts.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Go to the next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search exercises..."
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {/* Exercise List */}
      {paginatedWorkouts.map((exercise) => (
        <div key={exercise.id} className="flex justify-between items-center">
          <div>{exercise.name}</div>
          <Button onClick={() => onSelect(exercise)} variant="outline">Select</Button>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button onClick={prevPage} disabled={currentPage === 1} variant="outline">
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={nextPage} disabled={currentPage === totalPages} variant="outline">
          Next
        </Button>
      </div>
    </div>
  );
};

export default ExerciseSelector;
