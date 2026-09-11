# Zorich Studio — React migration

The new Zorich Studio landing page is built with React, TypeScript, Vite and SCSS. It keeps the existing visual language and assets while moving the interface into reusable components and typed content collections.

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local URL in the terminal, normally `http://localhost:5173`.

## Validate a change

```bash
npm run typecheck
npm run build
npm run preview
```

## Contact form

The form is prepared for Formspree. Create a form in Formspree, copy `.env.example` to `.env.local`, and replace `your_form_id` with the ID from the endpoint:

```dotenv
VITE_FORMSPREE_FORM_ID=your_form_id
```

The form ID is safe to use in browser code. Never commit account credentials or private API keys.

## Structure

```text
src/
├── App.tsx             React sections, typed content and form behaviour
├── main.tsx            Application entry point
└── styles/             Existing SCSS design system
public/                 Images, favicon and social preview
modx/                   Legacy MODX reference files (not used by React)
```

## Migration workflow

Development happens on `redesign/react-migration`. The production site and the `main` branch remain unchanged until the React version has been reviewed and deliberately merged.
