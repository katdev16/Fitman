import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WorkoutModal from "../WorkoutModal";
import ExerciseDetailsModal from "../ExerciseDetailsModal";


// Mock exercise data
const exercises = [
  {
    id: 1,
    name: "Bench Press",
    muscles: "Chest, Triceps, Shoulders",
    type: "Strength",
    level: "Beginner",
    imageUrl: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
  },
  {
    id: 2,
    name: "Squats",
    muscles: "Quadriceps, Hamstrings, Glutes",
    type: "Strength",
    level: "Intermediate",
    imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
  },
  {
    id: 3,
    name: "Pull-ups",
    muscles: "Back, Biceps, Shoulders",
    type: "Strength",
    level: "Advanced",
    imageUrl: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
  },
  {
    id: 1,
    name: "Bench Press",
    muscles: "Chest, Triceps, Shoulders",
    type: "Strength",
    level: "Beginner",
    imageUrl: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
  },
  {
    id: 2,
    name: "Squats",
    muscles: "Quadriceps, Hamstrings, Glutes",
    type: "Strength",
    level: "Intermediate",
    imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
  },
  {
    id: 3,
    name: "Pull-ups",
    muscles: "Back, Biceps, Shoulders",
    type: "Strength",
    level: "Advanced",
    imageUrl: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
  },
  {
    id: 1,
    name: "Bench Press",
    muscles: "Chest, Triceps, Shoulders",
    type: "Strength",
    level: "Beginner",
    imageUrl: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
  },
  {
    id: 2,
    name: "Squats",
    muscles: "Quadriceps, Hamstrings, Glutes",
    type: "Strength",
    level: "Intermediate",
    imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
  },
  {
    id: 3,
    name: "Pull-ups",
    muscles: "Back, Biceps, Shoulders",
    type: "Strength",
    level: "Advanced",
    imageUrl: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
  }
  
];

const ExerciseLibrary = () => {

  const [showWorkouts, setShowWorkouts] = useState(false);

  // const toggleWorkouts = () => {
  //   setShowWorkouts(!showWorkouts);
  // };

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const workouts = [
    "Push-ups",
    "Squats",
    "Deadlifts",
    "Pull-ups",
    "Bench Press",
    "Lunges",
    "Plank",
    "Burpees"
  ];



  const [searchTerm, setSearchTerm] = useState("");
  const [filteredExercises, setFilteredExercises] = useState(exercises);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setFilteredExercises(exercises);
    } else {
      setFilteredExercises(
        exercises.filter(exercise => 
          exercise.name.toLowerCase().includes(term.toLowerCase()) ||
          exercise.muscles.toLowerCase().includes(term.toLowerCase()) ||
          exercise.type.toLowerCase().includes(term.toLowerCase()) ||
          exercise.level.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  const [selectedExercise, setSelectedExercise] = useState<typeof exercises[0] | null>(null);


  const handleCardClick = (exercise: typeof exercises[0]) => {
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  return (
    <Card>
      <CardHeader className="border-b border-gray-200 flex flex-row justify-between items-center">
        <CardTitle className="text-lg font-medium">Exercise Library</CardTitle>
        <div className="flex space-x-2">
          <div className="relative rounded-md shadow-sm">
            <Input
              type="text"
              placeholder="Search exercises"
              value={searchTerm}
              onChange={handleSearch}
              className="pr-10"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <Button variant="outline" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <div 
              key={exercise.id} 
              className="group relative bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
              onClick={() => handleCardClick(exercise)}
            >
              <div className="h-40 bg-gray-200 rounded-md mb-3 overflow-hidden">
                <img 
                  src={exercise.imageUrl}
                  alt={`${exercise.name} exercise`} 
                  className="object-cover w-full h-full"
                />
              </div>
              <h4 className="font-medium text-gray-900">{exercise.name}</h4>
              <p className="text-sm text-gray-500 mb-2">{exercise.muscles}</p>
              <div className="flex space-x-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  {exercise.type}
                </Badge>
                <Badge 
                  variant="secondary" 
                  className={`
                    ${exercise.level === 'Beginner' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                    ${exercise.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : ''}
                    ${exercise.level === 'Advanced' ? 'bg-red-100 text-red-800 hover:bg-red-100' : ''}
                  `}
                >
                  {exercise.level}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-5 py-3 text-center">
      <button
            onClick={() => setShowModal2(true)}
            className="text-sm font-medium text-primary hover:text-blue-700"
          >
            View all exercises
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 inline-block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
      </CardFooter>
      {/* Modal */}
      {showModal && selectedExercise && (
        <WorkoutModal 
          workouts={exercises.map(exercise => exercise.name)} 
          onClose={() => setShowModal(false)}
        />
      )}
      {/* Modal */}
      {/* {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-3">Workout List</h2>
            <ul className="text-gray-700">
              {workouts.map((workout, index) => (
                <li key={index} className="py-1 border-b border-gray-300">{workout}</li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
   */}

  {showModal && selectedExercise && (
    <ExerciseDetailsModal
      exercise={selectedExercise}
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    />
  )}

   {/* Render the modal if showModal is true */}
   {showModal2 && <WorkoutModal workouts={workouts} onClose={() => setShowModal2(false)} />}
    </Card>
    
  );
};

export default ExerciseLibrary;
