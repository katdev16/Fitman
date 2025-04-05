// User types
export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

// Exercise types
export interface Exercise {
  id: number;
  name: string;
  setsReps: string;
  muscles: string;
  type: string;
  level: string;
  imageUrl: string;
}


// Workout types
export interface WorkoutSet {
  reps: number;
  weight: number;
  completed: boolean;
}

export interface WorkoutExercise {
  exerciseId: number;
  exerciseName: string;
  sets: WorkoutSet[];
}

export interface Workout {
  id: number;
  name: string;
  duration: number;
  intensity: 'Low' | 'Medium' | 'High';
  exercises: WorkoutExercise[];
  completed: boolean;
  date: string;
}

// Nutrition types
export interface NutritionMacros {
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export interface Meal {
  id: number;
  name: string;
  calories: number;
  macros: NutritionMacros;
  time: string;
  date: string;
}

export interface DailyNutrition {
  date: string;
  caloriesConsumed: number;
  caloriesGoal: number;
  macros: NutritionMacros;
  meals: Meal[];
}

// Progress types
export interface WeightProgress {
  date: string;
  weight: number;
}

export interface StrengthProgress {
  date: string;
  exercise: string;
  weight: number;
  reps: number;
}

export interface CardioProgress {
  date: string;
  activity: string;
  duration: number;
  distance: number;
}

export interface BodyMeasurement {
  date: string;
  measurements: {
    chest: number;
    waist: number;
    hips: number;
    arms: number;
    thighs: number;
  };
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}
