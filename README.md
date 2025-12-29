# WalkTrack

WalkTrack is a walking tracker app.

This repository is organized as a small monorepo:

- `backend/` – Node.js + Express API server
- `database/` – PostgreSQL migrations and reference schema
- `mobile/` – React Native scaffolding (placeholder for now)
- `config/` – environment configuration templates
- `app/` – (existing) Next.js web app scaffold

## Backend (Express)

### 1) Configure environment

Copy the example env file and update as needed:

```bash
cp config/.env.example config/.env
```

Set either `DATABASE_URL` **or** the individual `DB_*` variables.

### 2) Install backend dependencies

```bash
cd backend
npm install
```

### 3) Run database migrations

```bash
npm run migrate:up
```

### 4) Start the API

```bash
npm run dev
```

The API will start on `http://localhost:4000` by default.

Health endpoints:

- `GET /health` – basic process health
- `GET /health/db` – verifies PostgreSQL connectivity (`SELECT 1`)

## Database

See `database/README.md` for migration details and `database/schema/schema.sql` for the current schema reference.
