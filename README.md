# Node.js Task Management App

Welcome to the Node.js Task Management App! This application is designed to help users manage their tasks efficiently. It supports user authentication, task creation, retrieval, updating, and completion, utilizing MongoDB for data storage.

## Table of Contents
- Introduction
- Features
- Technologies Used
- Setup
- API Endpoints
- CRUD Operations
- License

## Introduction

This application provides a simple and efficient way to manage tasks. Users can register, log in, create tasks, view their tasks, mark tasks as complete, and sort tasks by various criteria.

## Features
**User Authentication:** Register and log in with secure password hashing and JWT tokens.

**Task Management:** Create, retrieve, update, and complete tasks.
Sorting: Sort tasks by due date, category, or completion status.

**Data Storage:** All data is stored in MongoDB.

## Technologies Used
- **Node.js:** Backend framework.
- **Express:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing user and task data.
- **Mongoose:** ODM for MongoDB and Node.js.
- **bcryptjs:** Password hashing.
- **jsonwebtoken:** JWT token creation and verification.
- **body-parser:** Middleware for parsing incoming request bodies.

## Setup

**Clone the repository:**

git clone https://github.com/yourusername/task-management-app.git

**Install dependencies:**


npm install

**Set up MongoDB connection:**

Replace the MongoDB connection string in app.js with your MongoDB connection string.

**Start the application:**

node app.js

**Access the application:**
Open your browser and navigate to http://localhost:3000.

## API Endpoints

### User Authentication

#### Register a new user

- **URL:** /register
- **Method:** POST
- **Body:** { "username": "your_username", "password": "your_password" }
- **Response:** User object

#### Log in an existing user

- **URL:** /login
- **Method:** POST
- **Body:** { "username": "your_username", "password": "your_password" }
- **Response:** JWT token

### Task Management

#### Create a new task

- **URL:** /create/task
- **Method:** POST
- **Headers:** { "token": "your_jwt_token" }
- **Body:** { "title": "Task Title", "description": "Task Description", "dueDate": "YYYY-MM-DD", "category": "Task Category", "priority": "Task Priority" }
- **Response:** Task object

#### Retrieve user tasks

- **URL:** /my/tasks
- **Method:** GET
- **Headers:** { "token": "your_jwt_token" }
- **Query Parameters:** ?sortBy=dueDate|category|completionStatus
- **Response:** Array of tasks

#### Mark a task as completed

- **URL:** /tasks/:id/complete
- **Method:** PUT
- **Headers:** { "token": "your_jwt_token" }
- **Response:** Message and updated task object

## CRUD Operations

### Create

- **Endpoint:** /create/task
- **Method:** POST
- **Description:** Create a new task. The task includes a title, description, due date, category, and priority.

### Read

- **Endpoint:** /my/tasks
- **Method:** GET
- **Description:** Retrieve all tasks for the authenticated user. The tasks can be sorted by due date, category, or completion status.

### Update

- **Endpoint:** /tasks/:id/complete
- **Method:** PUT
- **Description:** Mark a task as completed by updating its completed status.

### Delete
The current implementation does not include a direct endpoint for deleting tasks, **but tasks can be marked as completed which serves a similar purpose.**


## License
This project is licensed under the MIT License. 
