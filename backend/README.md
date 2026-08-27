# Backend — Furniro

API RESTful com Node + Express + TypeScript + Prisma (SQLite) + JWT.

## Stack

- Express 5 + TypeScript
- Prisma 6 + SQLite (`prisma/dev.db`)
- JWT (`jsonwebtoken` + `bcryptjs`)

## Estrutura

```
src/
├── controllers/     # ProductController, AuthController
├── services/        # ProductService, AuthService (register/login/getMe)
├── repositories/    # PrismaProductRepository, PrismaUserRepository
├── routes/          # productRouter (/products), authRouter (/auth)
├── middlewares/     # authMiddleware (Bearer), errorHandler, loggerMiddleware
├── factories/       # ProductFactory, AuthFactory
├── model/           # product.ts, user.ts (UserCreateDTO, UserPublic)
├── lib/             # prisma (singleton)
└── exceptions/      # AppError
prisma/
├── schema.prisma    # Product, User
├── seed.ts          # 32 produtos + usuário teste
└── migrations/
```

## Modelos

**Product** — `id` (uuid), `sku` @unique, `name`, `slug`, `category`, `price`, `discount`, `description`, `fullDescription`, `additionalInfo`, `image`, `additionalImages` (JSON), `colors` (JSON), `sizes` (JSON), `isNew`, `createdAt`, `updatedAt`

**User** — `id` (uuid), `name`, `email` @unique, `passwordHash`, `createdAt`, `updatedAt`

## Endpoints

### Auth

| Método | Rota | Auth | Descrição | Respostas |
|--------|------|------|-----------|-----------|
| `POST` | `/auth/register` | não | Cria conta `{name,email,password}` | `201 UserPublic` / `400` / `409 Email already in use.` |
| `POST` | `/auth/login` | não | Login `{email,password}` | `200 {token,user}` / `400` / `401 Invalid credentials.` |
| `GET` | `/auth/me` | **Bearer** | Retorna usuário autenticado | `200 UserPublic` / `401` |

### Produtos

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/products` | Lista com paginação, filtro `category` e ordenação `price` |
| `GET` | `/products/:id` | Busca por ID |
| `GET` | `/products/slug/:slug` | Busca por slug |
| `POST` | `/products` | Cria produto |
| `PUT` | `/products/:id` | Atualiza produto |
| `DELETE` | `/products/:id` | Remove produto |

`GET /products` query params: `category`, `_page`/`page`, `_limit`/`limit` (max `100`), `_sort`/`sort`/`sortBy` + `_order`/`order` (`asc`/`desc` ou `price_asc`/`price_desc`).

## Env

Copie `cp .env.example .env`:

```
PORT=3000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=change_me_to_a_strong_random_secret # gere com openssl rand -base64 32
JWT_EXPIRES_IN=7d
```

## Como rodar

```bash
cd backend
npm install
cp .env.example .env
npm run db:migrate   # npx prisma migrate dev
npm run db:seed      # popula 32 produtos + test@furniro.test / Test123!
npm run dev          # http://localhost:3000
npm run build        # tsc → dist/
npm start            # node --env-file=.env dist/index.js
```

## Docker

```bash
docker build -t api-furniro .
docker run -p 3000:3000 --name api-furniro --env-file .env -d api-furniro
```

## Seed

`prisma/seed.ts` limpa `User` e `Product`, cria 32 produtos (9 base + 23 variantes) e usuário teste `test@furniro.test` com senha `Test123!` hasheada.
