# ሼህ አለሙዲን የአርዳታ ድርጅት — MERN Stack App

A full-stack MERN registration & login system built to match the provided UI design.

## Project Structure

```
ALA/
├── backend/          # Express + MongoDB API
│   ├── models/       # Mongoose schemas
│   ├── routes/       # Auth & user routes
│   ├── middleware/   # JWT auth middleware
│   ├── server.js
│   └── .env
└── frontend/         # React app
    ├── public/
    └── src/
        ├── context/  # AuthContext (global state)
        ├── components/
        ├── pages/    # Login, Register, Dashboard
        └── App.js
```

## Setup & Run

### Prerequisites
- Node.js 18+
- MongoDB running locally on port 27017

### 1. Backend

```bash
cd backend
npm install
# Edit .env if needed (MONGO_URI, JWT_SECRET)
npm run dev
```

Server starts on http://localhost:5000

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

React app starts on http://localhost:3000 (proxies API calls to :5000)

## API Endpoints

| Method | Endpoint              | Description         | Auth |
|--------|-----------------------|---------------------|------|
| POST   | /api/auth/register    | Create new account  | No   |
| POST   | /api/auth/login       | Login (phone+pass)  | No   |
| GET    | /api/users/profile    | Get own profile     | JWT  |
| GET    | /api/users            | List all users      | JWT  |

## Features
- Amharic UI matching the provided design
- Cosmic nebula background with glass-morphism card
- JWT authentication stored in localStorage
- Password hashing with bcrypt
- Form validation (frontend + backend)
- Protected routes — redirects to login if unauthenticated
- Dashboard showing saved user info after login
