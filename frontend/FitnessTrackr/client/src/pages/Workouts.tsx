import { useEffect, useState } from 'react';

import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Exercise, Workout } from "@/types";

// Import the refactored components
import { WorkoutCard } from "@/components/workout/WorkoutCard";
import { WorkoutCreator } from "@/components/workout/WorkoutCreator";
import { WorkoutInProgress } from "@/components/workout/WorkoutInProgress";
import { ExerciseLibrary } from "@/components/workout/ExerciseLibrary";

// Mock data
// const exercises = [
//   {
//     id: 1,
//     name: "Bench Presss",
//     muscles: "Chest, Triceps, Shoulders",
//     type: "Strength",
//     level: "Beginner",
//     equipment: "Barbell, Bench",
//     targetMuscle: "Chest",
//     imageUrl: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
//   },
//   {
//     id: 2,
//     name: "Squats",
//     muscles: "Quadriceps, Hamstrings, Glutes",
//     type: "Strength",
//     level: "Intermediate",
//     equipment: "Barbell, Squat Rack",
//     targetMuscle: "Quadriceps",
//     imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
//   },
//   {
//     id: 3,
//     name: "Pull-ups",
//     muscles: "Back, Biceps, Shoulders",
//     type: "Strength",
//     level: "Advanced",
//     equipment: "Pull-up Bar",
//     targetMuscle: "Back",
//     imageUrl: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
//   },
//   {
//     id: 4,
//     name: "Deadlifts",
//     muscles: "Back, Hamstrings, Glutes",
//     type: "Strength",
//     level: "Intermediate",
//     equipment: "Barbell",
//     targetMuscle: "Back",
//     imageUrl: "https://images.unsplash.com/photo-1598575306580-d94e3e5d0d07?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
//   },
//   {
//     id: 5,
//     name: "Shoulder Press",
//     muscles: "Shoulders, Triceps",
//     type: "Strength",
//     level: "Beginner",
//     equipment: "Dumbbells",
//     targetMuscle: "Shoulders",
//     imageUrl: "https://images.unsplash.com/photo-1586401426077-df913431eb41?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
//   },
//   {
//     id: 6,
//     name: "Plank",
//     muscles: "Core, Shoulders, Back",
//     type: "Bodyweight",
//     level: "Beginner",
//     equipment: "None",
//     targetMuscle: "Core",
//     imageUrl: "https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
//   },
//   {
//     id: 7,
//     name: "Bicep Curls",
//     muscles: "Biceps, Forearms",
//     type: "Strength",
//     level: "Beginner",
//     equipment: "Dumbbells",
//     targetMuscle: "Biceps",
//     imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
//   },
//   {
//     id: 8,
//     name: "Leg Press",
//     muscles: "Quadriceps, Hamstrings, Glutes",
//     type: "Strength",
//     level: "Beginner",
//     equipment: "Leg Press Machine",
//     targetMuscle: "Quadriceps",
//     imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
//   },
//   {
//     id: 9,
//     name: "Tricep Dips",
//     muscles: "Triceps, Chest, Shoulders",
//     type: "Strength",
//     level: "Intermediate",
//     equipment: "Dip Station",
//     targetMuscle: "Triceps",
//     imageUrl: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
//   },
//   {
//     id: 10,
//     name: "Lat Pulldown",
//     muscles: "Back, Biceps",
//     type: "Strength",
//     level: "Beginner",
//     equipment: "Cable Machine",
//     targetMuscle: "Back",
//     imageUrl: "https://images.unsplash.com/photo-1597452485677-d661670d9640?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
//   },
//   {
//     id: 11,
//     name: "Push-ups",
//     muscles: "Chest, Triceps, Shoulders, Core",
//     type: "Bodyweight",
//     level: "Beginner",
//     equipment: "None",
//     targetMuscle: "Chest",
//     imageUrl: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
//   },
//   {
//     id: 12,
//     name: "Crunches",
//     muscles: "Abdominals",
//     type: "Bodyweight",
//     level: "Beginner",
//     equipment: "None",
//     targetMuscle: "Core",
//     imageUrl: "https://images.unsplash.com/photo-1601422407194-19dfbf1cdfc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
//   }
// ];

const initialWorkouts: Workout[] = [
  {
    id: 1,
    name: "Upper Body Strength",
    duration: 45,
    intensity: "Medium",
    completed: false,
    date: new Date().toISOString(),
    exercises: [
      {
        exerciseId: 1,
        exerciseName: "Bench Press",
        sets: [
          { reps: 10, weight: 135, completed: false },
          { reps: 10, weight: 135, completed: false },
          { reps: 10, weight: 135, completed: false }
        ]
      },
      {
        exerciseId: 3,
        exerciseName: "Pull-ups",
        sets: [
          { reps: 8, weight: 0, completed: false },
          { reps: 8, weight: 0, completed: false },
          { reps: 8, weight: 0, completed: false }
        ]
      },
      {
        exerciseId: 5,
        exerciseName: "Shoulder Press",
        sets: [
          { reps: 12, weight: 95, completed: false },
          { reps: 12, weight: 95, completed: false },
          { reps: 12, weight: 95, completed: false }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Lower Body Power",
    duration: 50,
    intensity: "High",
    completed: false,
    date: new Date().toISOString(),
    exercises: [
      {
        exerciseId: 2,
        exerciseName: "Squats",
        sets: [
          { reps: 8, weight: 185, completed: false },
          { reps: 8, weight: 185, completed: false },
          { reps: 8, weight: 185, completed: false },
          { reps: 8, weight: 185, completed: false }
        ]
      },
      {
        exerciseId: 4,
        exerciseName: "Deadlifts",
        sets: [
          { reps: 8, weight: 225, completed: false },
          { reps: 8, weight: 225, completed: false },
          { reps: 8, weight: 225, completed: false }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Core Crusher",
    duration: 30,
    intensity: "Medium",
    completed: false,
    date: new Date().toISOString(),
    exercises: [
      {
        exerciseId: 6,
        exerciseName: "Plank",
        sets: [
          { reps: 1, weight: 0, completed: false },
          { reps: 1, weight: 0, completed: false },
          { reps: 1, weight: 0, completed: false }
        ]
      }
    ]
  }
];

const Workouts = () => {



  const [exercises, setExercises] = useState<Exercise[]>([]); // Empty list initially

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch exercises from the API
        const res = await fetch('http://localhost:8080/api/exercises');
        
        // Make sure the response is valid
        if (!res.ok) {
          throw new Error('Failed to fetch exercises');
        }

        // Parse the JSON data
        const data: Exercise[] = await res.json();
        console.log('Fetched exercises:', data);

        // Set the exercises data into state
        setExercises(data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchData();
  }, []);



  const { isAuthenticated, user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [workouts, setWorkouts] = useState<Workout[]>(initialWorkouts);
  const [selectedTab, setSelectedTab] = useState("all");
  const [favoriteWorkouts, setFavoriteWorkouts] = useState<number[]>([]);
  
  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isExerciseLibraryOpen, setIsExerciseLibraryOpen] = useState(false);
  const [isWorkoutInProgressOpen, setIsWorkoutInProgressOpen] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [workoutToEdit, setWorkoutToEdit] = useState<Workout | null>(null);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to access workouts",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [isAuthenticated, navigate, toast]);

  // Filter workouts based on the selected tab
  const filteredWorkouts = (() => {
    switch (selectedTab) {
      case "recent":
        // Sort by date descending and take the first 5
        return [...workouts]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);
      case "favorites":
        return workouts.filter(workout => favoriteWorkouts.includes(workout.id));
      default:
        return workouts;
    }
  })();

  const handleCreateWorkout = (workout: Workout) => {
    // If we're editing an existing workout
    if (workoutToEdit) {
      const updatedWorkouts = workouts.map(w => 
        w.id === workout.id ? workout : w
      );
      setWorkouts(updatedWorkouts);
      setWorkoutToEdit(null);
      
      toast({
        title: "Workout Updated",
        description: `"${workout.name}" has been updated.`,
      });
    } else {
      // Creating a new workout
      setWorkouts([...workouts, workout]);
      
      toast({
        title: "Workout Created",
        description: `"${workout.name}" has been added to your workouts.`,
      });
    }
    
    setIsCreateModalOpen(false);
  };

  const handleDeleteWorkout = (id: number) => {
    const updatedWorkouts = workouts.filter(workout => workout.id !== id);
    setWorkouts(updatedWorkouts);
    
    // Also remove from favorites if present
    if (favoriteWorkouts.includes(id)) {
      setFavoriteWorkouts(favoriteWorkouts.filter(workoutId => workoutId !== id));
    }
    
    toast({
      title: "Workout Deleted",
      description: "The workout has been removed from your list.",
    });
  };

  const toggleFavorite = (id: number) => {
    if (favoriteWorkouts.includes(id)) {
      setFavoriteWorkouts(favoriteWorkouts.filter(workoutId => workoutId !== id));
    } else {
      setFavoriteWorkouts([...favoriteWorkouts, id]);
    }
    
    toast({
      title: favoriteWorkouts.includes(id) ? "Removed from Favorites" : "Added to Favorites",
      description: `Workout has been ${favoriteWorkouts.includes(id) ? "removed from" : "added to"} your favorites.`,
    });
  };

  const startWorkout = (workout: Workout) => {
    setActiveWorkout({
      ...workout,
      exercises: workout.exercises.map(exercise => ({
        ...exercise,
        sets: exercise.sets.map(set => ({ ...set, completed: false }))
      }))
    });
    setIsWorkoutInProgressOpen(true);
  };

  const handleCompleteWorkout = (updatedWorkout: Workout) => {
    const newWorkouts = workouts.map(w => 
      w.id === updatedWorkout.id ? updatedWorkout : w
    );
    
    setWorkouts(newWorkouts);
    setIsWorkoutInProgressOpen(false);
    setActiveWorkout(null);
    
    toast({
      title: "Workout Completed",
      description: "Great job! Your workout has been recorded.",
    });
  };
  
  const handleEditWorkout = (workout: Workout) => {
    setWorkoutToEdit(workout);
    setIsCreateModalOpen(true);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workouts</h1>
          <p className="text-gray-600">Plan and track your fitness routines</p>
        </div>
        <Button 
          className="mt-4 md:mt-0"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create New Workout
        </Button>
      </div>

      {/* Workout Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="all">All Workouts</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Workout Cards */}
      {filteredWorkouts.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 7l-5 5-5-5m10 10l-5-5-5 5" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No workouts found</h3>
          <p className="text-gray-500 mb-4">
            {selectedTab === "favorites" 
              ? "You haven't added any workouts to your favorites yet." 
              : selectedTab === "recent" 
                ? "You don't have any recent workouts." 
                : "Create your first workout to get started."}
          </p>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            Create New Workout
          </Button>
        </div>
      ) : (
        <div className="max-h-[80vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onStart={startWorkout}
                onDelete={handleDeleteWorkout}
                onEdit={handleEditWorkout}
                isFavorite={favoriteWorkouts.includes(workout.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      )}

      {/* Explore Exercise Library Button */}
      <div className="mt-8 text-center">
        <Button
          variant="outline"
          onClick={() => setIsExerciseLibraryOpen(true)}
          className="mx-auto"
        >
          Explore Exercise Library
        </Button>
      </div>

      {/* Create Workout Modal */}
      <WorkoutCreator
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setWorkoutToEdit(null);
        }}
        onSave={handleCreateWorkout}
        exercises={exercises}
        workoutToEdit={workoutToEdit}
      />

      {/* Exercise Library Modal */}
      <ExerciseLibrary
        isOpen={isExerciseLibraryOpen}
        onClose={() => setIsExerciseLibraryOpen(false)}
        exercises={exercises}
      />

      {/* Workout In Progress Modal */}
      {activeWorkout && (
        <WorkoutInProgress
          workout={activeWorkout}
          isOpen={isWorkoutInProgressOpen}
          onClose={() => setIsWorkoutInProgressOpen(false)}
          onComplete={handleCompleteWorkout}
        />
      )}
    </div>
  );
};

export default Workouts;