import {
  users,
  exercises,
  workouts,
  workoutExercises,
  nutrition,
  progress,
  type User,
  type Exercise,
  type Workout,
  type WorkoutExercise,
  type Nutrition,
  type Progress,
  type InsertUser,
  type InsertExercise,
  type InsertWorkout,
  type InsertWorkoutExercise,
  type InsertNutrition,
  type InsertProgress
} from "@shared/schema";

// Storage interface definition
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Exercise methods
  getAllExercises(): Promise<Exercise[]>;
  getExercise(id: number): Promise<Exercise | undefined>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;
  
  // Workout methods
  getWorkout(id: number): Promise<Workout | undefined>;
  getWorkoutsByUserId(userId: number): Promise<Workout[]>;
  createWorkout(workout: InsertWorkout): Promise<Workout>;
  updateWorkout(id: number, workout: Partial<InsertWorkout>): Promise<Workout>;
  deleteWorkout(id: number): Promise<void>;
  
  // Workout Exercise methods
  getWorkoutExercisesByWorkoutId(workoutId: number): Promise<WorkoutExercise[]>;
  createWorkoutExercise(workoutExercise: InsertWorkoutExercise): Promise<WorkoutExercise>;
  updateWorkoutExercise(id: number, workoutExercise: Partial<InsertWorkoutExercise>): Promise<WorkoutExercise>;
  deleteWorkoutExercise(id: number): Promise<void>;
  
  // Nutrition methods
  getNutritionByUserIdAndDate(userId: number, date: string): Promise<Nutrition[]>;
  createNutrition(nutrition: InsertNutrition): Promise<Nutrition>;
  
  // Progress methods
  getProgressByUserIdAndType(userId: number, type: string): Promise<Progress[]>;
  createProgress(progress: InsertProgress): Promise<Progress>;
}

// Memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private exercises: Map<number, Exercise>;
  private workouts: Map<number, Workout>;
  private workoutExercises: Map<number, WorkoutExercise>;
  private nutritions: Map<number, Nutrition>;
  private progresses: Map<number, Progress>;
  
  private userId: number = 1;
  private exerciseId: number = 1;
  private workoutId: number = 1;
  private workoutExerciseId: number = 1;
  private nutritionId: number = 1;
  private progressId: number = 1;

  constructor() {
    this.users = new Map();
    this.exercises = new Map();
    this.workouts = new Map();
    this.workoutExercises = new Map();
    this.nutritions = new Map();
    this.progresses = new Map();
    
    // Initialize with some sample exercises
    this.initializeExercises();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }

  // Exercise methods
  async getAllExercises(): Promise<Exercise[]> {
    return Array.from(this.exercises.values());
  }

  async getExercise(id: number): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const id = this.exerciseId++;
    const exercise: Exercise = { ...insertExercise, id };
    this.exercises.set(id, exercise);
    return exercise;
  }

  // Workout methods
  async getWorkout(id: number): Promise<Workout | undefined> {
    return this.workouts.get(id);
  }

  async getWorkoutsByUserId(userId: number): Promise<Workout[]> {
    return Array.from(this.workouts.values()).filter(
      (workout) => workout.userId === userId
    );
  }

  async createWorkout(insertWorkout: InsertWorkout): Promise<Workout> {
    const id = this.workoutId++;
    const date = insertWorkout.date || new Date();
    const workout: Workout = { ...insertWorkout, id, date };
    this.workouts.set(id, workout);
    return workout;
  }

  async updateWorkout(id: number, workoutUpdate: Partial<InsertWorkout>): Promise<Workout> {
    const workout = this.workouts.get(id);
    if (!workout) {
      throw new Error(`Workout with id ${id} not found`);
    }
    
    const updatedWorkout: Workout = { ...workout, ...workoutUpdate };
    this.workouts.set(id, updatedWorkout);
    return updatedWorkout;
  }

  async deleteWorkout(id: number): Promise<void> {
    this.workouts.delete(id);
    
    // Also delete associated workout exercises
    const exercisesToDelete = Array.from(this.workoutExercises.values())
      .filter(exercise => exercise.workoutId === id)
      .map(exercise => exercise.id);
      
    exercisesToDelete.forEach(exerciseId => {
      this.workoutExercises.delete(exerciseId);
    });
  }

  // Workout Exercise methods
  async getWorkoutExercisesByWorkoutId(workoutId: number): Promise<WorkoutExercise[]> {
    return Array.from(this.workoutExercises.values()).filter(
      (workoutExercise) => workoutExercise.workoutId === workoutId
    );
  }

  async createWorkoutExercise(insertWorkoutExercise: InsertWorkoutExercise): Promise<WorkoutExercise> {
    const id = this.workoutExerciseId++;
    const workoutExercise: WorkoutExercise = { ...insertWorkoutExercise, id };
    this.workoutExercises.set(id, workoutExercise);
    return workoutExercise;
  }

  async updateWorkoutExercise(id: number, workoutExerciseUpdate: Partial<InsertWorkoutExercise>): Promise<WorkoutExercise> {
    const workoutExercise = this.workoutExercises.get(id);
    if (!workoutExercise) {
      throw new Error(`Workout exercise with id ${id} not found`);
    }
    
    const updatedWorkoutExercise: WorkoutExercise = { ...workoutExercise, ...workoutExerciseUpdate };
    this.workoutExercises.set(id, updatedWorkoutExercise);
    return updatedWorkoutExercise;
  }

  async deleteWorkoutExercise(id: number): Promise<void> {
    this.workoutExercises.delete(id);
  }

  // Nutrition methods
  async getNutritionByUserIdAndDate(userId: number, date: string): Promise<Nutrition[]> {
    return Array.from(this.nutritions.values()).filter(
      (nutrition) => {
        if (nutrition.userId !== userId) return false;
        
        if (date) {
          const nutritionDate = new Date(nutrition.date);
          const queryDate = new Date(date);
          return nutritionDate.toDateString() === queryDate.toDateString();
        }
        
        return true;
      }
    );
  }

  async createNutrition(insertNutrition: InsertNutrition): Promise<Nutrition> {
    const id = this.nutritionId++;
    const date = insertNutrition.date || new Date();
    const nutrition: Nutrition = { ...insertNutrition, id, date };
    this.nutritions.set(id, nutrition);
    return nutrition;
  }

  // Progress methods
  async getProgressByUserIdAndType(userId: number, type: string): Promise<Progress[]> {
    return Array.from(this.progresses.values()).filter(
      (progress) => {
        if (progress.userId !== userId) return false;
        
        if (type) {
          return progress.type === type;
        }
        
        return true;
      }
    );
  }

  async createProgress(insertProgress: InsertProgress): Promise<Progress> {
    const id = this.progressId++;
    const date = insertProgress.date || new Date();
    const progress: Progress = { ...insertProgress, id, date };
    this.progresses.set(id, progress);
    return progress;
  }

  // Initialize with some sample exercises
  private initializeExercises() {
    const sampleExercises: InsertExercise[] = [
      {
        name: "Bench Press",
        description: "A compound exercise that targets the chest, shoulders, and triceps.",
        muscles: "Chest, Triceps, Shoulders",
        type: "Strength",
        level: "Beginner",
        imageUrl: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
      },
      {
        name: "Squats",
        description: "A compound exercise that targets the legs and core.",
        muscles: "Quadriceps, Hamstrings, Glutes",
        type: "Strength",
        level: "Intermediate",
        imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
      },
      {
        name: "Pull-ups",
        description: "A compound exercise that targets the back and biceps.",
        muscles: "Back, Biceps, Shoulders",
        type: "Strength",
        level: "Advanced",
        imageUrl: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
      }
    ];

    sampleExercises.forEach(exercise => {
      this.createExercise(exercise);
    });
  }
}

export const storage = new MemStorage();
