# MuscleTrace – Agent Rules

## Stack
React + Tailwind (frontend), Node/Express (backend), PostgreSQL + Prisma.
Login/signup are working: do not modify them.

## Rules
- Keep code simple and modular.
- Read only task-relevant files.
- Make minimal changes; never rewrite working features unnecessarily.
- Avoid new dependencies; ask first if one seems necessary.
- Implement one feature per task.
- Reuse existing auth middleware, API helpers, components and styling.
- Ask before any major architectural change.
- Run only relevant tests.
- Keep replies under 100 words when practical.
- Report changed files and errors briefly.
- A feature is complete only when database, backend AND frontend all work together.
- Never run Prisma migrations or `prisma db push` without my explicit approval;
  show the schema change and command first.
- Before reporting done, confirm every new endpoint is used by the UI.