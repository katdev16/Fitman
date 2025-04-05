import React from "react";
import { Button } from "@/components/ui/button";

export type SortOption = "name" | "targetMuscle" | "equipment" | "bodyPart";

interface ExerciseSortControlsProps {
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  className?: string;
}

export const ExerciseSortControls: React.FC<ExerciseSortControlsProps> = ({
  sortOption,
  setSortOption,
  className = "",
}) => {
  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 ${className}`}>
      <div className="text-sm text-gray-500 whitespace-nowrap">
        Sort by:{" "}
        <span className="font-medium">
          {sortOption === "name"
            ? "Name"
            : sortOption === "bodyPart"
            ? "bodyPart"
            : "Equipment"}
        </span>
      </div>
      <div className="flex flex-wrap gap-1">
        <Button
          variant={sortOption === "name" ? "default" : "outline"}
          size="sm"
          className="h-8 text-xs"
          onClick={() => setSortOption("name")}
        >
          Name
        </Button>
        <Button
          variant={sortOption === "bodyPart" ? "default" : "outline"}
          size="sm"
          className="h-8 text-xs"
          onClick={() => setSortOption("bodyPart")}
        >
          Body Part
        </Button>
        <Button
          variant={sortOption === "equipment" ? "default" : "outline"}
          size="sm"
          className="h-8 text-xs"
          onClick={() => setSortOption("equipment")}
        >
          Equipment
        </Button>
      </div>
    </div>
  );
};