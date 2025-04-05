import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserSchema, insertExerciseSchema, insertWorkoutSchema, insertNutritionSchema, insertProgressSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json({ id: user.id, username: user.username, email: user.email });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create user" });
      }
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.status(200).json({ id: user.id, username: user.username, email: user.email });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  // Exercise routes
  app.post("/api/exercises", async (req, res) => {
    try {
      const exerciseData = insertExerciseSchema.parse(req.body);
      const exercise = await storage.createExercise(exerciseData);
      res.status(201).json(exercise);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create exercise" });
      }
    }
  });

  app.get("/api/exercises", async (req, res) => {
    try {
      const exercises = await storage.getAllExercises();
      res.status(200).json(exercises);
    } catch (error) {
      res.status(500).json({ error: "Failed to get exercises" });
    }
  });

  app.get("/api/exercises/:id", async (req, res) => {
    try {
      const exerciseId = parseInt(req.params.id);
      const exercise = await storage.getExercise(exerciseId);
      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      res.status(200).json(exercise);
    } catch (error) {
      res.status(500).json({ error: "Failed to get exercise" });
    }
  });

  // Workout routes
  app.post("/api/workouts", async (req, res) => {
    try {
      const workoutData = insertWorkoutSchema.parse(req.body);
      const workout = await storage.createWorkout(workoutData);
      res.status(201).json(workout);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create workout" });
      }
    }
  });

  app.get("/api/workouts", async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
      const workouts = await storage.getWorkoutsByUserId(userId);
      res.status(200).json(workouts);
    } catch (error) {
      res.status(500).json({ error: "Failed to get workouts" });
    }
  });

  app.get("/api/workouts/:id", async (req, res) => {
    try {
      const workoutId = parseInt(req.params.id);
      const workout = await storage.getWorkout(workoutId);
      if (!workout) {
        return res.status(404).json({ error: "Workout not found" });
      }
      res.status(200).json(workout);
    } catch (error) {
      res.status(500).json({ error: "Failed to get workout" });
    }
  });

  app.patch("/api/workouts/:id", async (req, res) => {
    try {
      const workoutId = parseInt(req.params.id);
      const workout = await storage.getWorkout(workoutId);
      if (!workout) {
        return res.status(404).json({ error: "Workout not found" });
      }
      const updatedWorkout = await storage.updateWorkout(workoutId, req.body);
      res.status(200).json(updatedWorkout);
    } catch (error) {
      res.status(500).json({ error: "Failed to update workout" });
    }
  });

  app.delete("/api/workouts/:id", async (req, res) => {
    try {
      const workoutId = parseInt(req.params.id);
      const workout = await storage.getWorkout(workoutId);
      if (!workout) {
        return res.status(404).json({ error: "Workout not found" });
      }
      await storage.deleteWorkout(workoutId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete workout" });
    }
  });

  // Nutrition routes
  app.post("/api/nutrition", async (req, res) => {
    try {
      const nutritionData = insertNutritionSchema.parse(req.body);
      const nutrition = await storage.createNutrition(nutritionData);
      res.status(201).json(nutrition);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create nutrition entry" });
      }
    }
  });

  app.get("/api/nutrition", async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
      const date = req.query.date as string;
      const nutrition = await storage.getNutritionByUserIdAndDate(userId, date);
      res.status(200).json(nutrition);
    } catch (error) {
      res.status(500).json({ error: "Failed to get nutrition entries" });
    }
  });

  // Progress routes
  app.post("/api/progress", async (req, res) => {
    try {
      const progressData = insertProgressSchema.parse(req.body);
      const progress = await storage.createProgress(progressData);
      res.status(201).json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create progress entry" });
      }
    }
  });

  app.get("/api/progress", async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
      const type = req.query.type as string;
      const progress = await storage.getProgressByUserIdAndType(userId, type);
      res.status(200).json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to get progress entries" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
