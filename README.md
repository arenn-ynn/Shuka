# Shuka — local marketplace for Armenia

React + Vite client and Node.js + Express API served as **one process** in production. SQLite (STRICT tables, WAL, foreign keys, conditional stock updates, BEGIN IMMEDIATE transactions). Local filesystem uploads processed through Multer and Sharp. Cookie-based server sessions. Cash on delivery.

## Quick start

```bash
npm install
npm run build
npm run db:seed
npm start
```

Open **http://localhost:3000**. Set `COOKIE_SECRET` and `DATA_DIR` in production as described in `DEPLOY_INSTRUCTIONS.txt`. Run `npm test` for HTTP acceptance tests. Local dev: `npm run dev` opens the Vite UI on port 5173, while the Express API runs on port 3000.

The `db:seed` command automatically applies numbered SQL migrations. `db:migrate` is safe to repeat. Demo users: `seller1@shuka.demo`, `seller2@shuka.demo`, `seller3@shuka.demo`, `buyer1@shuka.demo`, `buyer2@shuka.demo`; development password `ShukaDemo2026!` (override with `SEED_PASSWORD` BEFORE the initial seed). **Never seed known demo credentials in a real public deployment.** Register fresh accounts instead. All demo usernames/passwords are for local development only.

## API

Routes are prefixed by `/api` and match the brief (e.g. `POST /api/orders`). Errors use `{ "error": { "code", "message" } }`. Seller product images additionally support `PATCH /api/seller/products/:id/images/:imageId` to set main image. Upload multipart field: `images`. Product creation accepts `title`, `description`, `category_id`, `price_amd`, `stock`, and `is_published`. Checkout requires an idempotent `request_key` (UUID) and Armenian delivery fields.

## Storage and backup

`DATA_DIR/shuka.sqlite`, `DATA_DIR/uploads/`, and `DATA_DIR/backups/` must all be placed on the Render persistent disk. `npm run backup` creates a consistent SQLite backup. See `DEPLOY_INSTRUCTIONS.txt` for deployment, migration and scheduled backups.

## Production security

Set a unique secure `COOKIE_SECRET`; use HTTPS; never commit `.env` or `data/`. Auth cookies are httpOnly, SameSite Lax and Secure in production. Sessions are stored hashed in SQLite with 14-day expiry. Role and object ownership checks are enforced on the API.
