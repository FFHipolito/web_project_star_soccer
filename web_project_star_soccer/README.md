# Super Star Soccer

## Project Overview

**Super Star Soccer** is a Single Page Application (SPA) developed in React that allows friends to organize amateur soccer matches on weekends. The application supports user management and match scheduling, providing a seamless experience for users to engage in sports activities.

## Features

- **User Types**:

- **Standard Users**: Can register, edit their profiles, and sign up for created matches.

- **Administrators**: In addition to standard user functions, administrators can create and end matches and view the list of players registered for each match.

- **Form Validation**: The application includes error validation for forms to ensure that user input is correct before submission.

- **API Call Alerts**: Success and error messages are displayed in response to API calls, enhancing user feedback.

- **Simulated API Calls**: All API calls are simulated using Promises within try-catch blocks, returning mock data as if connected to a live API.

- **Success/Error Logic**: Each API call has a 90% chance of success and a 10% chance of failure, utilizing `Math.random()` to simulate realistic API behavior.

- **Authentication**:

  **Login and Signup** functionality, including token management.
  Protected routes that allow only logged-in users access, as well as routes restricted to administrators.

- **Styling**:

The application employs the BEM (Block Element Modifier) methodology for CSS and is responsive across various devices.

## Development Process

1. **Branching Strategy**:

   - New features are developed from the `stage-react-api` branch. Each feature branch is created for specific functionalities, ensuring a clean and organized codebase.

2. **Feature Branches**:

   - When starting a new feature, create a branch off `stage-react-api` using the naming convention `feature/[feature-name]`.

3. **Error Handling**:

   - Implemented using try-catch blocks to manage exceptions during API calls, ensuring that users receive appropriate feedback in case of issues.

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

5. Open your browser and visit http://localhost:3000.

## Access Instructions

1. Create Your Account (Standard User):

- Visit the signup page and register as a standard user.

2. Access as Administrator:

- Use the following credentials to log in as an administrator:
  - Email: useradmin@email.com
  - Password: 123456

## Usage

- Users can register for an account, log in, and start organizing matches.
- Administrators can create new matches and manage user registrations.

## Acknowledgments

Thanks to the TRIPLETEN bootcamp instructors and fellow students for their support.
