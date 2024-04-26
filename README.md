# Learning Management System (LMS)

Welcome to our Learning Management System (LMS) project! This repository contains the frontend and backend code for our LMS application.

## Technologies Used

### Frontend

- React.js
- React Router
- Context API
- React Toastify
- React Icons
- Tailwind CSS

### Backend

- ASP.NET Web API
- Entity Framework Core (for database access)

## Getting Started

### Frontend Setup

```bash
git clone https://github.com/your-username/lms-project.git
cd lms-project/frontend
npm install
npm start
```

## Backend Setup
### Ensure you have .NET Core SDK installed.
```bash
cd lms-project/backend
dotnet restore
dotnet run
```


## Project Structure

### Frontend

The `frontend/` directory contains the React.js frontend code:

- **`src/`**: Main source code directory for the frontend.
- **`pages/`**: Contains all the pages
- **`types`**: Contains TS type
- **`Components`**: Contains all the components
- **`API`**: Contains all the end points

### Backend

The `backend/` directory contains the ASP.NET Web API backend code:

- **`Controllers/`**: Contains API controllers responsible for handling HTTP requests.
- **`Models/`**: Includes entity models representing database tables.
- **`DbContext/`**: Contains database context and migrations for Entity Framework Core.

