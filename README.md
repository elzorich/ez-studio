# EZ Studio — Web Studio Landing Page

A clean, modern, SEO-friendly landing page for a web studio that specialises in websites for **healthcare, wellness, and beauty businesses**.

Built with plain **HTML + SCSS + vanilla JavaScript**, using **Vite** as the development and build tool. No heavy frameworks. No React. Just clean, portable, reusable code.

---

## Features

- **Mobile-first** responsive layout
- **SCSS architecture** — split into `base`, `layout`, `components`, and `sections` partials
- **CSS custom properties** for colours, spacing, and typography — easy to re-theme per client
- **Semantic HTML** with proper heading hierarchy and ARIA attributes
- **SEO-ready** — meta tags, Open Graph, descriptive alt text
- **Vanilla JS** — mobile nav toggle, smooth scroll, form validation, scroll animations
- **Accessible** — keyboard navigation, focus rings, ARIA live regions
- All sections: Header, Hero, Services, Portfolio, Process, About, Contact, Footer

---

## Project structure

```
artifacts/webstudio/
├── index.html               # Main entry point (all sections live here)
├── src/
│   ├── styles/
│   │   ├── main.scss        # Entry: imports all partials
│   │   ├── base.scss        # CSS variables, resets, typography
│   │   ├── layout.scss      # Container, section wrappers, grid
│   │   ├── components.scss  # Buttons, navbar, forms
│   │   └── sections.scss    # Hero, Services, Portfolio, Process, About, Contact, Footer
│   ├── js/
│   │   └── main.js          # Vanilla JS (nav, scroll, form validation, animations)
│   └── assets/
│       ├── images/          # Place your project images here
│       └── icons/
│           └── favicon.svg
├── package.json
├── vite.config.ts           # Vite config (SCSS processing, dev server)
└── dist/                    # Build output (generated, not committed)
```

---

## Getting started — run locally in VS Code

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or later (`node --version`)
- [pnpm](https://pnpm.io/installation) v8 or later (`pnpm --version`)
  - Install pnpm: `npm install -g pnpm`
- [Git](https://git-scm.com/) (`git --version`)

### Step-by-step setup

**1. Clone the repository**

```bash
git clone https://github.com/elzorich/webstudio.git
cd webstudio
```

**2. Install dependencies**

The landing page lives in `artifacts/webstudio/`. Install its dependencies:

```bash
cd artifacts/webstudio
pnpm install
```

**3. Start the development server**

```bash
pnpm dev
```

Vite will start a local server. Open your browser at:

```
http://localhost:5173
```

The page will **hot-reload automatically** whenever you save a file — no browser refresh needed.

**4. Edit the code**

Open the project folder in VS Code:

```bash
code .
```

Recommended VS Code extensions (install from the Extensions panel, `Ctrl+Shift+X`):

| Extension | Why |
|---|---|
| **SCSS IntelliSense** (`mrmlnc.vscode-scss`) | Autocomplete for SCSS variables and mixins |
| **Prettier** (`esbenp.prettier-vscode`) | Auto-format HTML, SCSS, and JS on save |
| **Live Server** (`ritwickdey.LiveServer`) | Alternative static preview (optional — Vite does this already) |
| **GitLens** (`eamodio.gitlens`) | Better Git integration |
| **EditorConfig** (`EditorConfig.EditorConfig`) | Consistent code style across editors |

Key files to edit:

- `index.html` — page content (text, sections, links)
- `src/styles/base.scss` — CSS variables: colours, fonts, spacing
- `src/styles/sections.scss` — visual styling of each section
- `src/js/main.js` — interactive behaviour

### Build for production

```bash
pnpm build
```

Output goes to `dist/public/`. The result is pure static HTML/CSS/JS — deploy it to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, your own server).

### Preview the production build locally

```bash
pnpm serve
```

Then open `http://localhost:5173`.

---

## Customising for a client project

This template is designed to be re-used. Here's how to quickly adapt it:

### 1. Change the colour palette

Open `src/styles/base.scss` and update the CSS custom properties at the top:

```scss
:root {
  --color-primary:        #1a6e6e;   /* Main brand colour */
  --color-primary-light:  #2a8f8f;
  --color-primary-dark:   #134f4f;
  --color-primary-tint:   #e8f5f5;   /* Light background tint */
  --color-accent:         #c97b84;   /* Secondary / warm accent */
  // ... etc
}
```

### 2. Change the studio name and content

Edit `index.html` directly. Search for `EZ Studio` and replace with the client's name. Update all section text, contact details, and meta tags.

### 3. Add real images

Place images in `src/assets/images/` and reference them in `index.html`:

```html
<img src="/src/assets/images/hero.jpg" alt="Descriptive alt text" width="800" height="600" />
```

### 4. Connect the contact form

The form currently simulates a submission. To make it real, replace the `setTimeout` block in `src/js/main.js` with a `fetch()` call to your backend or a service like [Formspree](https://formspree.io/):

```js
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

---

## Tech stack

| Tool | Purpose |
|---|---|
| **HTML5** | Semantic page structure |
| **SCSS** | Modular styles with CSS custom properties |
| **Vanilla JavaScript** (ES2022) | Nav, animations, form validation |
| **Vite** | Dev server, SCSS compilation, production build |
| **pnpm** | Package management |

---

## Contributing / pushing changes

```bash
# Make your changes, then:
git add .
git commit -m "feat: describe what you changed"
git push origin main
```

---

## License

MIT — free to use as a base template for client projects.
