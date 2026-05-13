# Module Atelier — SMU Accountancy Planner

A drag-and-drop module planner for SMU Bachelor of Accountancy students. Plan all 4 years, track difficulty, and avoid workload overload.

![Module Atelier](https://img.shields.io/badge/SMU-BACC-B91C3C?style=flat-square) ![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)

## Features

- **Drag & drop** modules between 8 semesters with **auto-scroll** at screen edges
- **Side-by-side semesters** for each year so you can compare workloads at a glance
- **Difficulty heatmap** (1 Chill → 5 Brutal) on every module + per-semester average
- **Workload warnings** (`HEAVY`, `FULL`) when you over-stuff a semester
- **Status tags**: mark mods as `Completed`, `Taking now`, or `Planned`
- **Exemptions** that count toward CUs without occupying a semester slot
- **Graduation progress** bar tracking all 7 BACC requirement categories
- **Auto-save** to browser localStorage — refresh anytime
- **Export** your plan as a text file
- **Pre-filled** with your Y1 completed mods + suggested Y2 plan

## Quick start

### Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for production

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

Two minutes to a live site:

### 1. Create the repo

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/smu-module-atelier.git
git push -u origin main
```

### 2. Match the repo name in `vite.config.js`

If your repo is named something other than `smu-module-atelier`, open `vite.config.js` and update the `base` field:

```js
base: '/your-repo-name/',
```

(Or use `base: '/'` if you're using a custom domain or `username.github.io` repo.)

### 3. Enable GitHub Pages

On GitHub:

1. Go to your repo → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Push any commit — the workflow at `.github/workflows/deploy.yml` will build and deploy automatically

Your site will be live at: `https://YOUR_USERNAME.github.io/smu-module-atelier/`

Every push to `main` redeploys automatically. ✨

## How to use

1. **Drag modules** from the right-side bank into any semester
2. **Drag between semesters** to rearrange — the page auto-scrolls when you near the edges
3. Click the **status badge** on a module to mark it Completed/Taking/Planned
4. Click **Exemptions** in the header to manage modules you've been exempted from
5. Watch the **difficulty heatmap** on each semester header — avoid stacking too many 4s and 5s
6. Use **Export** to download a text summary of your plan
7. Your plan **auto-saves** to your browser. Use Reset to start fresh.

## Customizing

All module data lives in `src/App.jsx` at the top in the `MODULES` array. Each module looks like:

```js
{ id: 'ACCT334', name: 'Intermediate Financial Accounting',
  cat: 'acct-core', cu: 1, diff: 5, wl: 3 }
```

- `cat`: one of `acct-core`, `biz-core`, `acct-elec`, `cap`, `comm`, `civ`, `free`
- `cu`: course units (almost always 1)
- `diff`: 1 (Chill) → 5 (Brutal)
- `wl`: 1 (Light) → 3 (Heavy)

To change your Y1 placement or pre-filled Y2, edit `DEFAULT_PLAN` in the same file.

## Tech stack

- **React 18** with hooks
- **Vite** for the build
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **localStorage** for persistence
- Plain HTML5 drag-and-drop API (no extra library)

## Notes

Difficulty ratings are estimates based on common SMU student feedback. Actual difficulty varies by professor and your individual strengths. Always cross-check OASIS/BOSS for the latest official curriculum.

## License

Personal project — use it freely, fork it, customize it.
