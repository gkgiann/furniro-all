# Frontend — Furniro

React + TypeScript + Vite para o e-commerce de móveis. Consome a API Express + Prisma.

## Stack

- React 19 + TypeScript
- Vite + Tailwind 4
- React Router 8 + Axios
- React Hook Form + Zod (`@hookform/resolvers`)
- Zustand com persistência + `react-hot-toast`

## Estrutura

```
src/
├── App.tsx                 # BrowserRouter + Routes (ProtectedRoute para /checkout e /contact)
├── layout.tsx              # Header + CartDrawer + Outlet + Footer + Toaster
├── components/
│   ├── Header/             # Header sticky, NavMenu, RigthMenu (user/carrinho)
│   ├── Cart/               # CartDrawer, CartDrawerItem, CartDrawerFooter, CheckoutButton
│   ├── Checkout/           # PaymentOption (radio)
│   ├── Contact/            # ContactInfoItem
│   ├── Shop/               # PageBanner
│   ├── Benefits/           # Benefits + BenefitItem
│   ├── ProductGrid/        # ProductGrid + ProductGridCard
│   ├── ui/                 # Input (padrão Contact) 
│   └── ...
├── pages/                  # Home, Shop, SingleProduct, Cart, Login, Register, Checkout, Contact
├── stores/                 # cart.store (persist cart-storage), auth.store (persist auth-storage), ui.store
├── schemas/                # auth.schema, contact.schema, checkout.schema
├── services/               # product.service, auth.service
├── lib/                    # axios (interceptor Bearer), assets
├── config/                 # env (VITE_API_URL)
└── utils/                  # price, validateVariant
```

## Rotas

| Rota | Pública/Protegida | Descrição |
|------|-------------------|-----------|
| `/` | pública | Home |
| `/shop` | pública | Loja |
| `/shop/:category` | pública | Loja filtrada |
| `/product/:id` | pública | Produto por ID |
| `/product/slug/:slug` | pública | Produto por slug |
| `/cart` | pública | Carrinho |
| `/login` | pública | Login (redireciona para `state.from`) |
| `/register` | pública | Cadastro (name, email, senha, confirmar senha) |
| `/checkout` | protegida | Checkout com ViaCEP |
| `/contact` | protegida | Contato |
| `*` | pública | NotFound |

Proteção via `components/Auth/ProtectedRoute.tsx` (`isAuthenticated()` → `Navigate to="/login" state={{from:location}}`).

## Autenticação

- `stores/auth.store.ts` persiste `{token,user}` em `auth-storage` (`localStorage`)
- `services/auth.service.ts` → `POST /auth/register`, `POST /auth/login` (`{token,user}`), `GET /auth/me`
- `lib/axios.ts` interceptor lê `auth-storage` e envia `Authorization: Bearer <token>`
- `Header/RigthMenu.tsx` exibe ícone `alert.svg → /login` deslogado e círculo com inicial + `Logout` logado

## ViaCEP (Checkout)

`pages/Checkout.tsx` — campo `ZIP Code` com `onBlur={handleZipBlur}`:

```ts
fetch(`https://viacep.com.br/ws/${cep}/json/`)
  .then(data => {
    setValue("streetAddress", data.logradouro)
    setValue("townCity", data.localidade)
    setValue("province", data.uf)
    setValue("country", "Brazil")
  })
```

Falha → `toast.error`. Campos permanecem editáveis. Preenche `Country / Region`, `Street address`, `Town / City`, `Province`.

## Scripts

```bash
npm install
cp .env.example .env
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build
npm run lint       # eslint .
npm run test       # vitest
npm run test:coverage
npm run preview
```

## Env

- `VITE_API_URL` — URL da API (default `http://localhost:3000`)
- `VITE_CLOUDINARY_BASE_URL` — base das imagens

## Testes

```bash
npm test
npm run test:coverage
```

`Cart.test.tsx` — carrinho e navegação para `/checkout`; `SingleProduct.test.tsx`.
