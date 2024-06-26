# Frontend Project README

## Project Overview

This project implements a frontend application for managing outpass applications and approvals. It includes user authentication, role-based access control for outpass applications.

## Features

### User Authentication

- Users can register and login to their accounts.
- Authentication is handled securely using JWT tokens.

### Role-Based Access Control

- **Student Role:**
  - Fill out outpass application forms.
  - View status of submitted outpass applications.
  
- **Warden Role:**
  - View pending outpass applications.
  - Approve or reject pending applications.
  - View all approved outpass records.

### Application Workflow

#### Student Application

1. **Login:** User logs into their account.
2. **Fill Outpass Application:**
   - Students fill out an outpass application form and submit it.
   - Applications are stored with an initial status of "Pending".
3. **View Application Status:**
   - Students can view the current status of their submitted outpass applications.

#### Warden Actions

1. **Login:** Warden logs into their account.
2. **View Pending Applications:**
   - Wardens can view a list of pending outpass applications.
3. **Approve or Reject Applications:**
   - Wardens have the ability to approve or reject pending outpass applications, updating their status in the database.
4. **View Approved Records:**
   - Wardens can view a list of all approved outpass records.

## Technologies Used

- **React:** Frontend framework for building user interfaces.
- **React Router:** For client-side routing.
- **Material-UI:** UI component library for React.
- **Axios:** HTTP client for making API requests.
- **React Bootstrap:** UI components from Bootstrap framework for React applications.

## Setup Instructions

1. Clone the repository from GitHub.
2. Install dependencies using `npm install`.
3. Configure Axios instance (`axiosConfig.js`) with backend API URL.
4. Start the development server using `npm start`.


