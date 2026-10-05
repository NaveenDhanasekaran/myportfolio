# Naveen — Portfolio

Personal portfolio of Naveen Dhanasekaran, AI Engineer and Full-Stack Developer. Built with React (Create React App) and Framer Motion.

## Sections

- **About** and **Experience**, including 1.3 years as AI Engineer at Matrimony.com
- **Work**, in three tabs:
  - Matrimony.com: 14 projects, each with its own case-study page at `#/matrimony/<slug>`
  - Products: Intelox Lease and an export-import CRM
  - Websites: client sites, linked to the live versions
- **Services** and **Contact**, with email, phone and a WhatsApp button shown on every page

## Editing content

All text lives in two files. No component changes are needed to update content.

| File | Contains |
|---|---|
| `src/data.js` | Profile, contact details, navigation, services, experience, products, websites |
| `src/matrimonyProjects.js` | The Matrimony.com project list and the content of each case-study page |

Styles are in `src/App.css`. Colours and fonts are CSS variables at the top of that file.

## Run locally

```bash
npm install
npm start
```

The site opens at http://localhost:3000.

```bash
npm test
```

## Deploy on Vercel

1. Go to https://vercel.com/new and import the `NaveenDhanasekaran/myportfolio` GitHub repository.
2. Vercel detects Create React App automatically. Leave the defaults:
   - Build command: `npm run build`
   - Output directory: `build`
3. Click **Deploy**.

Every push to `main` then redeploys automatically. Routing uses URL hashes (`#/matrimony/...`), so no rewrite rules are needed.

Vercel builds with `CI=true`, which turns lint warnings into errors. Check a change builds cleanly before pushing:

```bash
CI=true npm run build
```

To use a custom domain, open the project in Vercel, go to **Settings > Domains**, add the domain, and set the DNS records Vercel shows at your domain registrar.
