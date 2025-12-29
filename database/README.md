# WalkTrack Database

This directory contains PostgreSQL migrations and a reference SQL schema.

## Migrations

Migrations are written for **node-pg-migrate**.

- Migrations live in: `database/migrations`
- Reference schema (generated from migrations): `database/schema/schema.sql`

### Running migrations (local)

1. Create a database (example):

```bash
createdb walktrack
```

2. Create `config/.env` (see `config/.env.example`) and set either:

- `DATABASE_URL`, or
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

3. Run migrations:

```bash
cd backend
npm install
npm run migrate:up
```
