# Super Star Soccer - Backend

## Project Overview

The Super Star Soccer Backend is a RESTful API developed in Node.js using Express and Mongoose to manage user authentication, player registration, and match scheduling. It supports two types of users (standard and administrator), ensuring proper access control and management of soccer match events. The API is designed to be robust, scalable, and secure, handling authentication with JSON Web Tokens (JWT) and input validation with Celebrate.

## Features

**User Authentication**:

- **Signup/Login**: Users can create accounts and log in to access protected features.
  JWT Authentication: Protected routes require valid JWTs to access, ensuring secure user sessions.
  User Roles:

- **Standard Users**: Can register, view, and join matches.

- **Administrators**: Can create and manage matches, as well as view registered players.

- **Match Management**:
  Create, view, and delete matches.
  Join matches (standard users) and close matches (admin users).

- **Input Validation**:
  Celebrate is used to validate incoming request data, ensuring that only valid information reaches the database.

- **Error Handling**:
  Structured error handling with custom messages to provide user-friendly feedback during failures such as authentication issues or invalid requests.

## Development Process

1. **Branching Strategy**:

   - New features are developed from the `stage-backend` branch. Each feature branch is created for specific functionalities, ensuring a clean and organized codebase.

2. **Feature Branches**:

   - When starting a new feature, create a branch off `stage-backend` using the naming convention `feature/[feature-name]`.

3. **Error Handling**:

   - Implemented using try-catch blocks to manage exceptions during API calls, ensuring that users receive appropriate feedback in case of issues.

## Technology Stack

Node.js: JavaScript runtime for building scalable server-side applications.
Express: Web framework for building RESTful APIs.
Mongoose: ODM for MongoDB, used to define and manage data models.
MongoDB: Database to store user data, matches, and player registrations.
JWT: Token-based authentication for secure access to protected routes.
Celebrate: Middleware for request validation, powered by Joi.
Winston: Logging utility for server-side event logging and error tracking.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

```
   git clone https://github.com/FFHipolito/web_project_star_soccer.git
```

2. Navigate to the project directory:

```
cd super-star-soccer
```

3. Install dependencies:

```
npm install
# or
yarn install
```

4. Start the development server:

```
npm start
# or
yarn start
```
