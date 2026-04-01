# AGORA 2026 🗳️

**La plateforme du référendum éclairé**

> Transformez chaque citoyen en Citoyen Éclairé. Du débat sourcé, pas du bla-bla partisan.

## Fonctionnalités MVP

- **Quiz de validation** — 3 questions avant de voter, pour prouver que vous comprenez les enjeux
- **Vote Pour/Contre** — Résultats en temps réel
- **L'Arène des Arguments** — Top 3 Pour / Contre, soumission, upvotes et bonus Fair-Play
- **Éclairage Scientifique & Historique** — Données agrégées automatiquement (simulées en MVP)
- **Classement National** — 4 rangs : Citoyen → Délégué → Sénateur → Ambassadeur
- **Proposer un référendum** — Soumettez votre question, la communauté vote

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **localStorage** (MVP — pas de backend)

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Architecture

```
src/
├── app/           # Pages Next.js (App Router)
├── components/    # Composants React
├── data/          # Données mock + interface scraper
├── hooks/         # Logique métier (localStorage)
├── lib/           # Utilitaires (scoring, auth, dates)
└── types/         # Types TypeScript
```

## Déploiement

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seb91140/agora-2026)
