
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
This is a full-stack Todo application with user authentication. The frontend is built using React, Redux, Tailwind CSS, and Formik for form handling. A backend server built using ASP.NET Core (.NET 8) with JWT authentication, MongoDB integration, and Swagger (OpenAPI) documentation support.

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
- **.NET 8.0**
- **ASP.NET Core Web API**
- **MongoDB** (via `MongoDB.Driver`)
- **JWT Authentication**
- **Swagger / OpenAPI** (via Swashbuckle)

### Routes
| Method | Route                 | Description                     |
|--------|------------------------|---------------------------------|
| POST   | `/login`               | Logs in a user                  |
| POST   | `/logout`              | Logs out the user               |
| POST   | `/sign-up`             | Registers a new user            |
| GET    | `/current-user`        | Fetches the logged-in user      |
| POST   | `/create`              | Creates a new todo              |
| POST   | `/update/:todoId`      | Updates an existing todo        |
| DELETE   | `/delete/:todoId`      | Deletes a todo                  |
| GET    | `/get-all`             | Retrieves all todos             |

---

### 🔗 Backend Live Link : https://dotnet-server-1.onrender.com/api
### 🎥 [Demo Video](https://drive.google.com/file/d/12Igjj_csIT8rmgmrUxqXhVWMuv5uzi06/view?usp=sharing)