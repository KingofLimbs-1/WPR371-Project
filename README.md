# EventHub — Smart Event Management & Ticketing Platform

> WPR371 Group Project 2026 | Belgium Campus iTversity

## Project Overview

EventHub is a full-stack web application built for Advanced Events (Pty) Ltd. It provides a secure, scalable platform for managing events, booking tickets, and handling customer enquiries. The system supports role-based access control distinguishing between standard users and administrators.

## Technologies Used

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Templating | EJS (Embedded JavaScript) |
| Database | MongoDB + Mongoose ODM |
| Authentication | bcrypt + express-session |
| Styling | Bootstrap 5 + custom CSS |
| Dev tools | nodemon, dotenv |

## Team Members & Roles

| Member | Role | Responsibilities |
|--------|------|-----------------|
| [Member 1 Name] | Team Lead + Frontend | App scaffold, Home page, EJS partials, README, GitHub |
| [Member 2 Name] | Backend Developer | Express routes, controllers, middleware, booking logic |
| [Member 3 Name] | Database Engineer | Mongoose schemas, MongoDB Atlas, Contact page |
| [Member 4 Name] | Security / Auth | bcrypt, sessions, auth middleware, role protection |

## Features

- User registration and login with hashed passwords
- Role-based access control (Admin vs Standard User)
- Event listing with search and filtering (by title, category, date)
- Event CRUD management (admin only)
- Ticket booking with automated capacity validation
- User booking history dashboard
- Admin analytics dashboard
- Contact / Enquiry management system

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB (local) or MongoDB Atlas account

### Installation

```bash
# 1. Clone the repository
git clone <your-github-repo-url>
cd WPR371-Project

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
# Then edit .env with your MongoDB URI and session secret

# 4. Run in development mode
npm run dev

# 5. Open in browser
# http://localhost:3000
```

### Environment Variables (.env)

```
MONGO_URI=mongodb://localhost:27017/eventPlatform
SESSION_SECRET=your_secret_key_here
PORT=3000
```

## Project Structure

```
WPR371-Project/
├── app.js                  # Express entry point
├── package.json
├── .env                    # Environment variables (not committed)
├── .gitignore
├── models/                 # Mongoose schemas
│   ├── User.js
│   ├── Event.js
│   ├── Booking.js
│   └── Enquiry.js
├── views/                  # EJS templates
│   ├── partials/
│   │   ├── head.ejs
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   ├── index.ejs
│   ├── auth/
│   ├── events/
│   ├── bookings/
│   └── contact.ejs
├── controllers/            # Route logic
├── routes/                 # Express routers
├── middleware/             # Auth + role middleware
└── public/                 # Static assets
    ├── css/style.css
    └── js/main.js
```

## Architecture

This project follows the **MVC (Model-View-Controller)** pattern:
- **Models** — Mongoose schemas defining data structure
- **Views** — EJS templates for server-side rendering
- **Controllers** — Business logic separated from route definitions

## GitHub

Repository: https://github.com/KingofLimbs-1/WPR371-Project
