# MODx — Ready-to-Paste Files

This folder contains all HTML files needed to set up Zorich Studio in MODx Revolution.
Each file maps to one element in the MODx admin (which is in Russian).

---

## Overview of files

| File | MODx type | Where to paste |
|---|---|---|
| `template--home-page.html` | Шаблон (Template) | Код шаблона (HTML) field |
| `chunk--ezs-header.html` | Чанк (Chunk) | Код чанка (HTML) field |
| `chunk--ezs-hero.html` | Чанк (Chunk) | Код чанка (HTML) field |
| `chunk--ezs-services.html` | Чанк (Chunk) | Код чанка (HTML) field |
| `chunk--ezs-portfolio.html` | Чанк (Chunk) | Код чанка (HTML) field |
| `chunk--ezs-process.html` | Чанк (Chunk) | Код чанка (HTML) field |
| `chunk--ezs-about.html` | Чанк (Chunk) | Код чанка (HTML) field |
| `chunk--ezs-contact.html` | Чанк (Chunk) | Код чанка (HTML) field |
| `chunk--ezs-footer.html` | Чанк (Chunk) | Код чанка (HTML) field |
| `chunk--ezs-email-tpl.html` | Чанк (Chunk) | Код чанка (HTML) field — email body template for FormIt |
| `resource--home-content.html` | Ресурс (Resource) | Содержание (Content) field |

---

## Step 1 — Upload assets to the server

After running `npm run build` locally, upload the contents of the `dist/assets/` folder to your MODx server:

```
dist/assets/main.css   →   /assets/main.css   (on the server)
dist/assets/main.js    →   /assets/main.js    (on the server)
dist/assets/favicon.svg →  /assets/favicon.svg
```

Also upload the images from `public/` to the server webroot (the MODx site root):
```
public/hands-creation-v2.png  →  hands-creation-v2.png  (at site root)
public/vitruvian.png           →  vitruvian.png
public/bee-logo.png            →  bee-logo.png
public/preview-medicamente.jpg →  preview-medicamente.jpg
public/preview-gynecomente.jpg →  preview-gynecomente.jpg
public/preview-zoryx.jpg       →  preview-zoryx.jpg
```

In MODx, `[[++base_url]]` resolves to the site root URL (e.g. `https://zorich.studio/`),
so `[[++base_url]]vitruvian.png` becomes `https://zorich.studio/vitruvian.png`.
This is how image references work in all the chunk files.

---

## Step 2 — Create the Template (Шаблон)

1. In MODx admin go to: **Элементы → Шаблоны → Создать шаблон**
2. Fill in:
   - **Название** (Name): `ZorichStudio - Home page`
   - **Код шаблона (HTML)**: paste the full contents of `template--home-page.html`
3. Click **Сохранить** (Save)

---

## Step 3 — Create all Chunks (Чанки)

For each chunk file, repeat these steps:

1. Go to: **Элементы → Чанки → Создать чанк**
2. Fill in:
   - **Название** (Name): use the name from the table below
   - **Код чанка**: paste the full contents of the matching file
3. Click **Сохранить** (Save)

Chunk names (copy exactly, including case):

| File | Название чанка |
|---|---|
| `chunk--ezs-header.html` | `ezs-header` |
| `chunk--ezs-hero.html` | `ezs-hero` |
| `chunk--ezs-services.html` | `ezs-services` |
| `chunk--ezs-portfolio.html` | `ezs-portfolio` |
| `chunk--ezs-process.html` | `ezs-process` |
| `chunk--ezs-about.html` | `ezs-about` |
| `chunk--ezs-contact.html` | `ezs-contact` |
| `chunk--ezs-footer.html` | `ezs-footer` |
| `chunk--ezs-email-tpl.html` | `ezs-email-tpl` |

---

## Step 4 — Update the Home Page Resource (Ресурс)

1. Go to: **Ресурсы** in the left sidebar — find the Home page resource
2. Click to edit it
3. In the **Шаблон** (Template) dropdown: select `ZorichStudio - Home page`
4. Scroll to the **Содержание** (Content) field at the bottom
5. Paste the full contents of `resource--home-content.html`
6. Click **Сохранить** (Save)

---

## How MODx tags work in these files

| Tag | What it outputs |
|---|---|
| `[[++assets_url]]` | URL to the site's `/assets/` folder, e.g. `https://zorich.studio/assets/` |
| `[[++base_url]]` | URL to the site root, e.g. `https://zorich.studio/` — used for image paths |
| `[[++cultureKey]]` | Language code, e.g. `en` (set in system settings) |
| `[[*pagetitle]]` | The page title set in the resource editor |
| `[[*description]]` | The resource description field (used for SEO meta) |
| `[[$ezs-hero]]` | Calls (inserts) the chunk named `ezs-hero` |
| `[[date? &format=\`%Y\`]]` | Outputs the current year (for the footer copyright) |
| `[[!+fi.error.name]]` | FormIt: validation error text for the `name` field |
| `[[!+fi.name]]` | FormIt: repopulates the `name` field value after a failed submit |
| `[[!+fi.successMessage]]` | FormIt: renders the success message after a valid submit |

---

## After each Vite build

Because we've configured Vite to output fixed filenames (`main.css`, `main.js`), you only need to re-upload those two files after each build. No need to update the template asset paths.

```bash
# Local: build the site
npm run build

# Then upload dist/assets/main.css and dist/assets/main.js to the server
# Template references stay valid — filenames don't change
```

---

## Contact form — FormIt setup

The contact form uses **FormIt** to send emails server-side. Follow these steps:

### A — Install FormIt (once)
1. Go to **Пакеты → Управление пакетами**
2. Search for `FormIt` → click **Скачать** → **Установить**

### B — Create the email template chunk
1. Go to **Элементы → Чанки → Создать чанк**
2. **Название**: `ezs-email-tpl`
3. Paste the contents of `chunk--ezs-email-tpl.html`
4. Click **Сохранить**

### C — Update the contact chunk
1. Edit the existing `ezs-contact` chunk (or create it if new)
2. Paste the full contents of `chunk--ezs-contact.html`
3. Click **Сохранить**

### How it works
- The `[[!FormIt? ...]]` call at the top of the chunk handles submission, validation, and email sending
- On success, `[[!+fi.successMessage]]` renders the confirmation message
- On error, `[[!+fi.error.fieldname]]` renders per-field error text and fields retain their typed values
- The hidden `nospam` field is a basic honeypot — bots fill it in and get silently rejected
- The email body is rendered from the `ezs-email-tpl` chunk and sent to `hello@zorich.studio`

### Adding anti-spam later (optional)
Add `math` to the `&hooks` parameter to show a simple maths question:
```
&hooks=`math,email`
&mathMinRange=`1`
&mathMaxRange=`10`
```
