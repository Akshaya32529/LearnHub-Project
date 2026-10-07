# Local Development Guide

## Prerequisites

- Node.js (v18 or newer)
- MongoDB running at `mongodb://localhost:27017`

## Backend

In a terminal:

```powershell
cd backend
npm.cmd install
Copy-Item .env.example .env
npm.cmd run dev
```

The backend listens on `http://localhost:5000`. Its API is at
`http://localhost:5000/api`, and the health check is at
`http://localhost:5000/api/health`.

Before starting the backend, set `JWT_SECRET` and `JWT_REFRESH_SECRET` in
`backend/.env` to private development-only values.

## Frontend

In a second terminal:

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:5173`. Vite proxies `/api` and `/uploads` requests to
`http://localhost:5000`, so no hosted API URL or frontend API environment
variable is needed for local development.
