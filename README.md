# Caça Preço

Swipe-first price discovery app that turns price history into a simple buying signal: **buy now, wait, or pass**.

This repository is the public portfolio build of an earlier product prototype. It keeps the original product direction — swipe discovery, product scoring, price history, store comparison and deal alerts — while making the implementation boundary explicit.

## What is implemented

- Next.js App Router application with responsive desktop/mobile UI
- Swipe deck with `like`, `pass` and `alert` actions
- Deterministic deal score based on current price, 30-day average, 90-day minimum and recent drop
- Product detail pages with price history and store comparison
- Synthetic product feed and product lookup routes
- Swipe API contract with payload normalization and validation
- Alert API contract with validation and explicit `persisted: false`
- PWA manifest foundation
- Domain tests for scoring, swipe normalization and catalog consistency
- GitHub Actions for tests, typecheck and production build

## Public data boundary

The public build does **not** claim to have live marketplace data.

| Area | Current state |
| --- | --- |
| Product catalog | Synthetic demo data |
| Store prices | Synthetic demo data |
| Price history | Synthetic demo data |
| Swipe gestures | Working UI + validated API contract, not persisted |
| Alerts | Working API contract, not persisted |
| Marketplace integrations | Roadmap |
| Affiliate links | Roadmap |
| Authentication / database | Roadmap |
| Push notifications | Roadmap |

The demo uses recognizable marketplace names only to model the comparison experience. No live marketplace feed, customer data, credentials or production integration is included.

## Deal score

The score is intentionally simple and inspectable:

- `+30` when the current price is below the 30-day average
- `+40` when the current price is within 2% of the 90-day minimum
- `+20` when the recent drop is at least 10%
- `+10` when the current price is more than 10% below the 30-day average
- capped at `100`

Decision thresholds:

- `75–100` → `COMPRA AGORA`
- `45–74` → `ESPERA`
- `0–44` → `CARO`

The rule lives in `src/lib/scoring.ts`, outside the UI.

## Routes

```text
/                    product discovery
/swipe               swipe-first deal deck
/produto/[id]         product detail + price history + stores
/alertas              alert contract demo
/api/products/feed    synthetic feed
/api/products/[id]    synthetic product detail
/api/swipe            validates swipe semantics
/api/alerts           validates alert requests
/api/health           public demo health contract
```

## Run locally

Requires Node.js 22+.

```bash
npm install
npm run dev
```

Validation:

```bash
npm test
npm run typecheck
npm run build
```

## Architecture

The public build keeps product UI and decision rules separate:

```text
Synthetic catalog
      │
      ├── Deal scoring ───────────────┐
      │                              │
      └── Product model              │
             │                       │
             ▼                       ▼
      Next.js pages/components   API contracts
             │                       │
             ├── discovery           ├── product feed
             ├── swipe               ├── swipe validation
             ├── detail              └── alert validation
             └── alerts demo
```

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) and [`docs/DECISIONS.md`](docs/DECISIONS.md).

## Roadmap

The next meaningful product step is not “more mock UI”. It is replacing the synthetic boundary one layer at a time:

1. official/affiliate product providers
2. normalized offer ingestion
3. persisted price history
4. user accounts and saved interests
5. durable alerts and push delivery
6. affiliate/deep-link routing with provider attribution

See [`docs/ROADMAP.md`](docs/ROADMAP.md).
