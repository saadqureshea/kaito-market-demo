# Kaito Market

A modern general marketplace (Amazon/Etsy-style) built as a **frontend-only** app.
Browse, search and filter products, view product pages, register/log in, add to
cart, list items for sale, and check out with a mock order flow.

Everything persists in the browser via `localStorage`, so the deployed link
behaves like a real app — accounts, listings, carts and orders all survive a
reload. There is **no backend**: a real API can be dropped in later by replacing
the side effects in `src/context/StoreContext.jsx` with `fetch` calls; the
component tree does not change.

## Tech

- React 18 + React Router 6
- Vite 5
- Tailwind CSS 4 (via `@tailwindcss/vite`)

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

Output goes to `dist/`.

## Deploy to Vercel

**Option A — dashboard (no CLI):**

1. Push this folder to a GitHub repo.
2. Go to https://vercel.com/new and import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output dir `dist`
   (Vercel detects these automatically).
4. Click **Deploy**. Share the `*.vercel.app` link.

**Option B — Vercel CLI:**

```bash
npm i -g vercel
vercel
```

`vercel.json` already contains the SPA rewrite so deep links like
`/product/p-1001` resolve to `index.html` instead of 404ing.

## Project layout

```
src/
  data/products.js          seed catalogue + categories
  context/StoreContext.jsx  auth, cart, listings, orders (localStorage)
  components/                Navbar, Footer, ProductCard, Rating, ...
  pages/                     Home, Products, ProductDetail, Cart, Checkout,
                             Login, Register, Sell, Orders, NotFound
```

## Notes for review / grading

- Auth is simulated client-side. Passwords are stored in plain `localStorage`
  and never leave the browser — do not reuse a real password.
- The payment step is a mock; no card data is processed or sent anywhere.
- To reset all demo data, clear site data for the domain (or run
  `localStorage.removeItem('kaito-market-state-v1')` in the console).
