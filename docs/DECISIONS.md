# Engineering decisions

## CP-001 — Keep demo data explicitly synthetic

The public build demonstrates product behavior, not live commerce coverage. Catalog, store offers and history are marked as synthetic instead of being presented as scraped or provider-backed data.

## CP-002 — Keep the deal score deterministic

The current score is a small pure function. A recruiter or contributor can inspect why a product became `COMPRA AGORA`, `ESPERA` or `CARO` without reverse engineering UI state.

## CP-003 — Separate gesture semantics from drag implementation

`SwipeDeck` owns the interaction. `swipe-action.ts` owns the canonical actions. This keeps `left/right` gesture details out of the API contract and preserves compatibility with older `right/left/skip` payloads.

## CP-004 — Do not fake persistence

Swipe and alert routes return `persisted: false`. Durable storage is a future boundary, not an implied feature.

## CP-005 — Avoid fake outbound shopping links

Synthetic offers use `url: null`. Real affiliate/deep links should only exist after an official provider or affiliate integration is implemented.

## CP-006 — Keep charts dependency-light

The public build uses a small SVG sparkline for price history. The original prototype experimented with a charting library; this reconstruction keeps the visual proof while reducing the dependency surface.

## CP-007 — CI validates product rules and the actual Next.js build

The pipeline runs domain tests, TypeScript checking and a production build. UI polish is useful only if the repository remains buildable.
