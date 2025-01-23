# Task Management System

## Overview  
The **Task Management System** is a backend application designed to allow users to securely manage their tasks and profiles. It features secure authentication, user registration, and task management functionalities.

## Key Features

### User Management
- **Registration**: Users can register with the system.
- **Login**: Secure user login.
- **Profile Management**: Users can view and update their profiles.
- **Email Verification**: Users can verify their email address.
- **Password Reset**: Users can reset their password if forgotten.

### Task Management
- **Create Task**: Users can create tasks.
- **Update Task Status**: Users can update the status of tasks.
- **View Tasks by Status**: Users can filter tasks by status.
- **Delete Task**: Users can delete tasks.
- **Count Tasks**: Displays the total number of tasks.

## Technologies Used  
- Node.js
- Express.js
- JavaScript
- MongoDB
- Authentication Middleware

## Authentication
- Secure login with session management.
- Middleware to enforce access control for sensitive actions.

## Endpoints  
- **/Registration**: User registration.
- **/Login**: User login.
- **/ProfileDetails**: View user profile details (requires authentication).
- **/ProfileUpdate**: Update user profile (requires authentication).
- **/EmailVerify/:email**: Email verification.
- **/ResetPassword**: Password reset.
- **/CreateTask**: Create new tasks (requires authentication).
- **/UpdateTaskStatus/:id/:status**: Update task status (requires authentication).
- **/TaskListByStatus/:status**: View tasks by status (requires authentication).
- **/DeleteTask/:id**: Delete a task (requires authentication).
- **/CountTask**: Count total tasks (requires authentication).

## Installation  
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up environment variables for database and authentication settings.
4. Run the application with `npm start`.

## License  
This project is licensed under the MIT License.
