# Zorich Studio — Landing Page

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
.
├── index.html               # Local Vite preview of the full page
├── modx/                    # Ready-to-paste MODX template, chunks, and resource content
├── public/                  # Static images copied into the Vite build
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
- npm, which ships with Node.js (`npm --version`)
- [Git](https://git-scm.com/) (`git --version`)

### Step-by-step setup

**1. Clone the repository**

```bash
git clone https://github.com/elzorich/webstudio.git
cd webstudio
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
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
npm run build
```

Output goes to `dist/`. For MODX, upload `dist/assets/main.css`, `dist/assets/main.js`, and the required images from `public/` as described in `modx/README.md`.

### Preview the production build locally

```bash
npm run preview
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

Edit `index.html` for the local preview and the matching files in `modx/` for the live MODX site. Keep both aligned when changing section text, contact details, and meta tags.

### 3. Add real images

Place static images in `public/` and reference them from the site root in `index.html`:

```html
<img src="/hero.jpg" alt="Descriptive alt text" width="800" height="600" />
```

### 4. Connect the contact form

The local preview uses JavaScript validation in `src/js/main.js`. The live MODX version uses FormIt in `modx/chunk--ezs-contact.html`; see `modx/README.md` for setup details.

---

## Tech stack

| Tool | Purpose |
|---|---|
| **HTML5** | Semantic page structure |
| **SCSS** | Modular styles with CSS custom properties |
| **Vanilla JavaScript** (ES2022) | Nav, animations, form validation |
| **Vite** | Dev server, SCSS compilation, production build |
| **npm** | Package management |

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
