# Riva Bella — Revenue Lab

**Independent, mobile-first restaurant menu and revenue analytics concept demo.**

This proof of concept reuses the validated interactive prototype and presents the user experience in three languages (TR / RU / EN), with transparent basket behavior, compatibility-based cross-sells and an illustrative owner revenue dashboard.

> ⚠️ **DEMO / NOT OFFICIAL RESTAURANT DATA.** All 8 menu products, descriptions, photographs, prices, costs and sales counts are fictional examples. The demo is not the official Riva Bella menu or an operating checkout.

## Demo and deployment

- Repository: https://github.com/safal207/riva-bella-revenue
- When GitHub Pages is enabled, the intended preview is https://safal207.github.io/riva-bella-revenue/
- Source: `index.html`, `styles.css`, `src/app.js`, `src/core.js`, `src/menu.js`, `src/i18n.js`, `src/analytics.js`.
- CI: `.github/workflows/pages.yml` checks code and tests, builds the `dist` directory, and attempts a Pages deployment on pushes to `main`.

GitHub repository owner should select **Settings → Pages → Build and deployment → Source → GitHub Actions** if Pages is not already configured. A successful CI workflow, not the mere existence of this README, is evidence of deployment.

## What's implemented

- Responsive desktop and mobile menu with RU / EN / TR and category quick choices.
- Local cart with plus/minus actions; basket changes do not rerender the whole menu.
- Context-sensitive add-on suggestions based on explicit compatible product pairs.
- Pure unit-economics functions and an owner-facing demo contribution simulator.
- Session-only interaction counters; no remote tracking pixel.
- Demo order draft can be copied to clipboard. **No orders are submitted, and no payments are charged.**
- English, Russian and Turkish labeling. Demo thumbnails currently use third-party Unsplash photography and are **not verified restaurant photos**.
- No login, back office access control, inventory or POS integration yet.

## Develop and test

Requires Node.js 20+ and npm. No external npm packages are needed.

```bash
npm run check      # JavaScript syntax and 10 unit tests
npm run build      # generates dist/ for static hosting
```

For local preview after build you can serve the repository with any static file server, e.g. `python -m http.server 4173` and visit `http://localhost:4173`.

## Economics methodology

Per-item contribution = **sales revenue excluding sales tax − directly variable costs**. The current figures are invented teaching examples. Contribution is **not net profit** because rent, staffing, utilities, equipment and other fixed overhead are excluded.

The simulator models `orders × attach rate × incremental unit contribution`. It does not account for cannibalization, changes in purchase behavior, capacity, seasonality, or fixed costs. No ROI claim is made.

## Next gates before use by a real restaurant

1. Obtain owner-approved complete menu, prices, legal translations, actual photographs, allergens and availability. Do not infer ingredients from pictures.
2. Use backend-validated prices and a transactionally safe order workflow with idempotency before connecting payment/POS systems.
3. Add authenticated restaurant owner management and a role-based content approval workflow.
4. Join confirmed POS receipts to menu interactions using privacy-compliant consent and data minimization, observing Turkish KVKK requirements.
5. Compare actual contribution per exposed session via controlled experiments before claiming revenue uplift.
6. Perform regression testing for mobile widths, Safari/Chrome/Edge/Firefox, slow networks, repeat clicks, screen readers and reduced-motion settings.

This repository is independent of Robys, Pacelli, AI Café Network and any live Riva Bella domain. Do not redirect customers to this concept before restaurant-owner approval.
