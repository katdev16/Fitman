import { pgTable, text, serial, integer, boolean, timestamp, real, foreignKey, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Exercises table
export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  muscles: text("muscles").notNull(),
  type: text("type").notNull(),
  level: text("level").notNull(),
  imageUrl: text("image_url"),
});

// Workouts table
export const workouts = pgTable("workouts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  duration: integer("duration"),
  intensity: text("intensity"),
  date: timestamp("date").defaultNow().notNull(),
  completed: boolean("completed").default(false),
});

// Workout exercises table
export const workoutExercises = pgTable("workout_exercises", {
  id: serial("id").primaryKey(),
  workoutId: integer("workout_id").notNull().references(() => workouts.id),
  exerciseId: integer("exercise_id").notNull().references(() => exercises.id),
  sets: integer("sets"),
  reps: integer("reps"),
  weight: real("weight"),
  notes: text("notes"),
});

// Nutrition tracking table
export const nutrition = pgTable("nutrition", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  date: timestamp("date").defaultNow().notNull(),
  mealType: text("meal_type").notNull(), // breakfast, lunch, dinner, snack
  foodName: text("food_name").notNull(),
  calories: integer("calories"),
  protein: real("protein"),
  carbs: real("carbs"),
  fat: real("fat"),
  notes: text("notes"),
});

// Progress tracking table
export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  date: timestamp("date").defaultNow().notNull(),
  type: text("type").notNull(), // weight, strength, cardio, body_measurement
  data: jsonb("data").notNull(), // flexible JSON data for different progress types
  notes: text("notes"),
});

// Creating insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
});

export const insertExerciseSchema = createInsertSchema(exercises);

export const insertWorkoutSchema = createInsertSchema(workouts).pick({
  userId: true,
  name: true,
  description: true,
  duration: true,
  intensity: true,
  date: true,
  completed: true,
});

export const insertWorkoutExerciseSchema = createInsertSchema(workoutExercises);

export const insertNutritionSchema = createInsertSchema(nutrition);

export const insertProgressSchema = createInsertSchema(progress);

// Types for the insert schemas
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;
export type InsertWorkout = z.infer<typeof insertWorkoutSchema>;
export type InsertWorkoutExercise = z.infer<typeof insertWorkoutExerciseSchema>;
export type InsertNutrition = z.infer<typeof insertNutritionSchema>;
export type InsertProgress = z.infer<typeof insertProgressSchema>;

// Types for the select schemas
export type User = typeof users.$inferSelect;
export type Exercise = typeof exercises.$inferSelect;
export type Workout = typeof workouts.$inferSelect;
export type WorkoutExercise = typeof workoutExercises.$inferSelect;
export type Nutrition = typeof nutrition.$inferSelect;
export type Progress = typeof progress.$inferSelect;
