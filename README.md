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
<li>Pattern: Model-View-Controller (MVC)</li>
</ul>
<hr></hr>
<h1>📂 Folder Structure</h1>
   
Key Features


🏋️ 1. Personalized AI-Generated Workout & Nutrition Plans

      Users enter fitness goals (weight loss, muscle gain, endurance).

      AI/ML generates customized workout routines and meal plans.

      The system adjusts based on user progress and biometric data.

📌 2. Multi-Service Architecture (Microservices)

    User Service → Manages authentication, profiles, and subscriptions.
    
    Workout Service → Tracks exercises, sets, reps, and calories burned.
    
    Diet Service → Suggests meals based on fitness goals.
    
    Analytics Service → Uses AI/ML to adjust fitness plans dynamically.
    
    Social Service → Allows users to share progress and join fitness challenges.

📊 3. Real-Time Workout & Health Monitoring (IoT & WebSockets)


    Users can sync smart devices (e.g., Fitbit, Apple Watch) for live tracking.
    
    Data updates in real-time via WebSockets (e.g., heart rate, steps, calories burned).
    
    Uses MQTT/WebSockets for real-time data sync.



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
      <td><code>/tasks</code></td>
      <td>Retrieves all tasks</td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>GET</strong></td>
      <td><code>/tasks/{id}</code></td>
      <td>Retrieves a task by its ID</td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>PUT</strong></td>
      <td><code>/tasks/{id}</code></td>
      <td>Updates a task by its ID</td>
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
      <td><strong>DELETE</strong></td>
      <td><code>/tasks/{id}</code></td>
      <td>Deletes a task by its ID</td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>PATCH</strong></td>
      <td><code>/tasks/{id}/complete</code></td>
      <td>Marks a task as completed</td>
      <td>None</td>
    </tr>
  </tbody>
</table>





