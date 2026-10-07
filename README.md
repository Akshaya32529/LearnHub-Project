# Digital Learning Support and Evaluation System (DLSES)

DLSES is a comprehensive educational platform designed to connect students, instructors, instructors, and administrators. It provides a robust environment for course management, assessments, and AI-driven learning assistance.

## 🚀 Key Features

- **Multi-Role Dashboards**: Tailored experiences for Students, Instructors, Instructors, and Admins.
- **Course Management**: Effortlessly organize and access educational content.
- **Secure Assessments**: Integrated testing and grading modules.
- **AI Learning Assistant**: Real-time support for subject-specific queries.
- **Real-time Notifications**: Keep everyone updated on progress and announcements.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, Bcrypt
- **Local frontend**: http://localhost:5173
- **Local backend API**: http://localhost:5000/api

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB running locally at `mongodb://localhost:27017`
- Docker & Docker Compose (optional)

### Run locally

1. **Configure and start the backend**:
   ```powershell
   cd backend
   npm.cmd install
   Copy-Item .env.example .env
   ```
   Set `JWT_SECRET` and `JWT_REFRESH_SECRET` in `backend/.env` to private
   development-only values, then start the server with `npm.cmd run dev`.
   The backend API and health check are available at
   `http://localhost:5000/api` and `http://localhost:5000/api/health`.

2. **Start the frontend in a second terminal**:
   ```powershell
   cd frontend
   npm.cmd install
   npm.cmd run dev
   ```
   Open `http://localhost:5173`. The Vite development server proxies API and upload requests to the local backend.

### Running with Docker

```bash
docker-compose up --build
```

## 📄 License

This project is licensed under the MIT License.


in  courses -> my courses-> comg to subject wise we have quizzes section right i wanted to make a small change do not remove any the cardss b
