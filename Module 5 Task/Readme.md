
# Todo Application Documentation

## Table of Contents
- [Overview](#overview)
- [Frontend](#frontend)
  - [Tech Stack](#tech-stack)
  - [Routes](#routes)
- [Backend](#backend)
  - [Tech Stack](#tech-stack-1)
  - [Routes](#routes-1)

---

## Overview
This is a full-stack Todo application with user authentication. The frontend is built using React, Redux, Tailwind CSS, and Formik for form handling, while the backend is implemented using TypeScript, Express.js, and MongoDB. Authentication is managed with JWT and Zod is used for validation.

---

## Frontend

### Tech Stack
- **Framework**: React 19
- **Routing**: `react-router-dom`
- **State Management**: Redux Toolkit
- **Form Handling**: Formik
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **HTTP Requests**: Axios
- **Bundler**: Vite
- **Linting**: ESLint

### Routes
| Route      | Description                  |
|------------|------------------------------|
| `/`        | Home page                    |
| `/todos`   | Displays all todos           |
| `/sign-up` | User registration page       |
| `/login`   | User login page              |

---

## Backend

### Tech Stack
- **Language**: TypeScript
- **Server Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Token (JWT), Bcrypt
- **Validation**: Zod
- **Middleware**: `cors`, `cookie-parser`, `dotenv`
- **Development Tools**: Nodemon, ts-node-dev

### Routes
| Method | Route                 | Description                     |
|--------|------------------------|---------------------------------|
| POST   | `/login`               | Logs in a user                  |
| POST   | `/logout`              | Logs out the user               |
| POST   | `/sign-up`             | Registers a new user            |
| GET    | `/current-user`        | Fetches the logged-in user      |
| POST   | `/create`              | Creates a new todo              |
| POST   | `/update/:todoId`      | Updates an existing todo        |
| POST   | `/delete/:todoId`      | Deletes a todo                  |
| GET    | `/get-all`             | Retrieves all todos             |

---

### 🔗 [Live link](https://amazing-yeot-a3f9b2.netlify.app/)  
### 🎥 [Demo Video](https://drive.google.com/file/d/1jl6GY0SpSaz_agQhcQ0aHtJXakg1_zeo/view?usp=sharing)
