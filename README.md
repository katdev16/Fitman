# Fitman

1. run RabbitMq
2. run each service
3. run react

<h1>🛠️ Tech Stack</h1>
<ul>
<li>Frontend: React</li>
<li>Backend: Java (Spring Boot)</li>
</ul>

<h1>🏗️ Architecture</h1>
<uL>
<li>Pattern: Microservices</li>
</ul>
<hr></hr>
<h1>📂 Folder Structure</h1>

<pre>
├───.idea
├───.mvn
│   └───wrapper
├───ApiGateWay
│   └───src
│       └───main
│           ├───java
│           │   └───com
│           │       └───fitman
│           │           └───ApiGateway
│           │               ├───Config
│           │               └───resources
│           └───resources
├───ExercisesService
│   ├───.idea
│   ├───src
│   │   └───main
│   │       ├───java
│   │       │   └───com
│   │       │       └───fitman
│   │       │           └───ExerciseService
│   │       │               ├───Config
│   │       │               ├───controller
│   │       │               ├───model
│   │       │               ├───repository
│   │       │               └───service
│   │       └───resources
│   └───target
│       ├───classes
│       │   └───com
│       │       └───fitman
│       │           └───ExerciseService
│       │               ├───Config
│       │               ├───controller
│       │               ├───model
│       │               ├───repository
│       │               └───service
│       ├───generated-sources
│       │   └───annotations
│       ├───generated-test-sources
│       │   └───test-annotations
│       └───test-classes
├───src
│   ├───main
│   │   ├───java
│   │   │   └───com
│   │   │       └───fitman
│   │   │           └───backend
│   │   │               ├───Config
│   │   │               ├───Exercise
│   │   │               │   ├───controller
│   │   │               │   ├───model
│   │   │               │   ├───repository
│   │   │               │   └───service
│   │   │               └───WorkoutGroup
│   │   │                   ├───controller
│   │   │                   ├───model
│   │   │                   ├───repository
│   │   │                   └───service
│   │   └───resources
│   └───test
│       └───java
│           └───com
│               └───example
│                   └───backend
├───target
│   ├───classes
│   │   └───com
│   │       └───fitman
│   │           └───backend
│   │               ├───Config
│   │               ├───Exercise
│   │               │   ├───controller
│   │               │   ├───model
│   │               │   ├───repository
│   │               │   └───service
│   │               └───WorkoutGroup
│   │                   ├───controller
│   │                   ├───model
│   │                   ├───repository
│   │                   └───service
│   ├───generated-sources
│   │   └───annotations
│   ├───generated-test-sources
│   │   └───test-annotations
│   ├───maven-status
│   │   └───maven-compiler-plugin
│   │       └───compile
│   │           └───default-compile
│   └───test-classes
│       └───com
│           └───example
│               └───backend
└───WorkoutService
    ├───.idea
    ├───src
    │   └───main
    │       ├───java
    │       │   └───com
    │       │       └───fitman
    │       │           └───WorkoutService
    │       │               ├───Config
    │       │               ├───controller
    │       │               ├───DTO
    │       │               ├───ExerciseService
    │       │               │   ├───DTO
    │       │               │   └───model
    │       │               ├───model
    │       │               ├───repository
    │       │               └───service
    │       └───resources
    └───target
        ├───classes
        │   └───com
        │       └───fitman
        │           └───WorkoutService
        │               ├───Config
        │               ├───controller
        │               ├───DTO
        │               ├───ExerciseService
        │               │   ├───DTO
        │               │   └───model
        │               ├───model
        │               ├───repository
        │               └───service
        ├───generated-sources
        │   └───annotations
        ├───generated-test-sources
        │   └───test-annotations
        └───test-classes
</pre>
   
Key Features


🏋️ 1. Personalized AI-Generated Workout & Nutrition Plans

      Users enter fitness goals (weight loss, muscle gain, endurance).

      The system adjusts based on user progress and biometric data.

📌 2. Multi-Service Architecture (Microservices)

    User Service → Manages authentication, profiles, and subscriptions.
    
    Workout Service → Tracks exercises, sets, reps, and calories burned.
    
    Diet Service → Suggests meals based on fitness goals.

📊 3. Real-Time Workout & Health Monitoring (IoT & WebSockets)

    Users can sync smart devices (e.g., Fitbit, Apple Watch) for live tracking.
    

<hr></hr>
<h1>📖 API Endpoints</h1>

<table>
  <thead>
    <tr>
      <th>HTTP Method</th>
      <th>Endpoint</th>
      <th>Description</th>
      <th>Request Body</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>POST</strong></td>
      <td><code>/tasks</code></td>
      <td>Adds a new task</td>
      <td>
        <pre>
{
  "title": "Task Title",
  "description": "Task Description",
  "status": "Pending",
  "addedDate": "2024-12-14",
  "completionDate": "2024-12-20"
}
        </pre>
      </td>
    </tr>
    <tr>
      <td><strong>GET</strong></td>
      <td><code>http://localhost:8082/api/exercises</code></td>
      <td>Retrieves all exercises</td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>PUT</strong></td>
      <td><code>http://localhost:8081/api/workoutgroups/1?workoutName=testing2</code></td>
      <td>Edit Workout</td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Delete</strong></td>
      <td><code>http://localhost:8081/api/workoutgroups/4</td>
      <td>Delete workout</td>
      <td>
        <pre>
{
  "title": "Updated Title",
  "description": "Updated Description",
  "status": "Pending",
  "completionDate": "2024-12-22"
}
        </pre>
      </td>
    </tr>
    <tr>
      <td><strong>GET</strong></td>
      <td><code>http://localhost:8081/api/workoutgroups</code></td>
      <td>Get workoutgroups</td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>POST</strong></td>
      <td><code>http://localhost:8081/api/workoutgroups/save?workoutName=New</code></td>
      <td>create workout</td>
      <td>None</td>
    </tr>
  </tbody>
</table>





