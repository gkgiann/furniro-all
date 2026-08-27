# Furniro — Desafio 3 (Fellowship)

E-commerce de móveis com React + TypeScript + Tailwind e API Express + Prisma (SQLite). Desafio 3 — Fellowship, individual, com Figma, autenticação JWT, checkout com ViaCEP e contato protegidos.

## Monorepo

- `frontend/` — React 19 + TypeScript + Vite + Tailwind 4 + React Hook Form + Zod + Zustand + React Router 8 + Axios + react-hot-toast
- `backend/` — Node + Express 5 + TypeScript + Prisma 6 + SQLite + JWT (`jsonwebtoken`/`bcryptjs`)

## Quick start

```bash
# backend (http://localhost:3000)
cd backend
npm install
cp .env.example .env  # configure JWT_SECRET e JWT_EXPIRES_IN=7d
npm run db:migrate
npm run db:seed       # 32 produtos + usuário teste test@furniro.test / Test123!
npm run dev

# frontend (http://localhost:5173) — em outro terminal
cd frontend
npm install
cp .env.example .env  # VITE_API_URL=http://localhost:3000
npm run dev
```

## Documentação detalhada

- **→ [Frontend](./frontend/README.md)** — rotas, auth, ViaCEP, stores, schemas, scripts e testes
- **→ [Backend](./backend/README.md)** — endpoints, model User, JWT, env e scripts

## Gitflow

- Branch de desenvolvimento: `developer`
- Features: `feature/nome-da-branch` com **conventional commits** (`feat:`, `fix:`, `refactor:`)

## Autor

- [Gian Lucas](https://github.com/gkgiann)