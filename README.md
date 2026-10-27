# MuscleTrace

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

MuscleTrace is a fitness tracking and social workout platform. It pairs a React workout experience with an Express and Prisma API for managing routines, exercises, profiles, friends, clubs, and workout sessions.

## Features

- Create and manage saved workout routines and exercises.
- Browse the ExerciseDB-powered exercise library and view exercise instructions, equipment, target muscles, and media when available.
- Start a workout session, record set/repetition/weight progress, pause or resume the timer, and complete a session.
- Review recent completed workouts and friends' activity on the dashboard.
- Complete and edit a personal fitness profile.
- Search for users, add or remove friends, and view privacy-safe friend workout summaries.
- Create, browse, search, join, and leave fitness clubs.
- JWT-protected API routes and client-side protected routes.

> Profile image, gallery-photo, and workout-photo fields exist in the database schema, but this repository does not currently include an image-upload or external storage integration.

## Tech stack

| Area | Technology |
| --- | --- |
| Frontend | React 19, Vite, React Router, Tailwind CSS, Axios |
| Backend | Node.js, Express 5, Zod |
| Database | PostgreSQL (configured for Supabase) |
| ORM | Prisma 7 with `@prisma/adapter-pg` |
| Authentication | JWT and bcrypt |
| Exercise data | [ExerciseDB](https://oss.exercisedb.dev/) public API |
| Backend deployment target | Render (the checked-in frontend environment points to a Render backend URL) |

## Project structure

```text
MuscleTrace/
├── Backend/
│   ├── controllers/     # API handlers
│   ├── middlewares/     # JWT authentication middleware
│   ├── prisma/          # Prisma schema and migrations
│   ├── routes/          # Express route modules
│   ├── tests/           # Node test runner tests
│   └── utils/           # Prisma client and request helpers
└── Frontend/
    └── src/
        ├── api/         # API clients
        ├── components/  # Reusable UI components
        ├── context/     # Workout state
        ├── pages/       # Routed screens
        └── routes/      # Route guards and route definitions
```

## Getting started

### Prerequisites

- Node.js 20+ (the project uses modern Vite and Prisma releases)
- npm
- A PostgreSQL database compatible with Prisma (Supabase PostgreSQL is the current configuration target)

### Install

Install dependencies separately for each application:

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

### Environment configuration

Create `Backend/.env` and `Frontend/.env`. Never commit these files or real credentials.

| File | Variable | Purpose |
| --- | --- | --- |
| `Backend/.env` | `DATABASE_URL` | PostgreSQL connection string used by Prisma at runtime |
| `Backend/.env` | `DIRECT_URL` | Direct PostgreSQL connection used by Prisma CLI configuration |
| `Backend/.env` | `JWT_SECRET` | Secret used to sign and verify login tokens |
| `Backend/.env` | `PORT` | Optional Express port; defaults to `5000` |
| `Frontend/.env` | `VITE_API_URL` | Base URL of the Express API, for example `http://localhost:5000` locally |

### Run locally

Start the API:

```bash
cd Backend
npm run dev
```

In a second terminal, start the web app:

```bash
cd Frontend
npm run dev
```

The frontend sends its authenticated requests to the URL in `VITE_API_URL` and automatically attaches the stored JWT as a Bearer token.

## Database setup

Prisma is configured in `Backend/prisma.config.ts`; the schema and migration history are in `Backend/prisma/`.

Validate the schema before changing the database:

```bash
cd Backend
npx prisma validate --schema prisma/schema.prisma
```

For a development database, create and apply a reviewed migration with `npx prisma migrate dev --name <descriptive_name>`. For an existing or shared Supabase database, inspect migration status and SQL first, back up important data, and use the team-approved migration workflow. Do **not** use `prisma db push` or `prisma migrate reset` against a populated database.

## API overview

All endpoints below, except authentication, require `Authorization: Bearer <token>`.

| Area | Endpoints |
| --- | --- |
| Authentication | `POST /api/auth/register`, `POST /api/auth/login` |
| Profile | `GET`, `PUT /api/profile` |
| Workouts | `POST`, `GET /workouts`; `GET`, `DELETE /workouts/:id` |
| Exercises | `POST /exercises`, `PUT`, `DELETE /exercises/:id` |
| Sessions | `POST /workouts/sessions`, `GET /workouts/sessions/active`, `GET/PATCH /workouts/sessions/:id`, pause/resume/complete actions |
| Friends | `GET /api/users/search`, `GET/POST/DELETE /api/friends`, `GET /api/friends/:id/profile` |
| Clubs | `GET/POST /api/clubs`, `GET /api/clubs/mine`, join/leave actions |
| Dashboard | `GET /api/dashboard` |

## Usage

1. Create an account and sign in.
2. Complete the one-time profile form.
3. Create a workout routine and add exercises from the library.
4. Start the routine, track the session, and complete it to save its active duration.
5. Use the dashboard to review recent activity.
6. Search for friends, join clubs, and explore shared fitness activity.

## Testing and builds

```bash
# Backend validation tests
cd Backend
npm test

# Frontend production build
cd ../Frontend
npm run build
```

## Deployment

The checked-in frontend environment is configured to call a Render-hosted backend. Deploy the backend from the `Backend` directory with the existing `npm start` command and provide its database, JWT, and port environment variables in Render. Set `VITE_API_URL` in the frontend deployment environment to that backend's public URL, then rebuild the frontend.

No frontend-host configuration file is committed to this repository, so choose and configure a static-host provider outside the repository rather than assuming a specific platform.

## Future improvements

- Add a committed deployment configuration and repeatable CI workflow.
- Add focused API integration tests for session timing and social flows.
- Add a reviewed image-upload/storage integration for profile and workout photos.
- Add pagination controls to every list that exposes paginated API data.
