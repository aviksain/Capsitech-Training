# Todo Application Documentation

## Table of Contents
- [Overview](#overview)
- [Frontend](#Frontend)
  - [Tech Stack](#tech-stack)
  - [Routes](#routes)
- [Backend](#backend)
  - [Tech Stack](#tech-stack-1)
  - [Routes](#routes-1)

## Overview
This is a full-stack Todo application with user authentication. The frontend is built using React and Formik for form handling, while the backend is implemented with Express.js and MongoDB. Authentication is managed using JWT.

---

## Frontend

### Tech Stack
- React (`react`, `react-dom`)
- Routing: `react-router-dom`
- UI Components: `@fluentui/react`
- Form Handling: `formik`
- API Requests: `axios`

### Routes
| Route      | Description                  |
|------------|------------------------------|
| `/`        | Home page                     |
| `/todos`   | Displays all todos           |
| `/sign-up` | User registration page       |
| `/login`   | User login page              |

---

## Backend

### Tech Stack
- Server: `express`
- Database: `mongoose`
- Authentication: `jsonwebtoken`, `bcrypt`
- Middleware: `cors`, `cookie-parser`, `dotenv`
- Development: `nodemon`

### Routes

| Method | Route                 |  Description                     |
|--------|------------------------|---------------------------------|
| POST   | `/login`               |  Logs in a user                  |
| POST   | `/logout`              |  Logs out the user               |
| POST   | `/sign-up`             |  Registers a new user            |
| GET    | `/current-user`        |  Fetches the logged-in user      |
| POST   | `/create`              |  Creates a new todo              |
| POST   | `/update/:todoId`      |  Updates an existing todo        |
| POST   | `/delete/:todoId`      |  Deletes a todo                  |
| GET    | `/get-all`             |  Retrieves all todos             |

---

### [Live link](https://inspiring-twilight-34044d.netlify.app/)
### [Demo Video](https://drive.google.com/file/d/1ywHWMqt7nPErpCuObAY_nUo4ZvvwmjWz/view?usp=sharing)
