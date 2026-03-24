# Git Workflow — Zorich Studio

This guide explains the three-location setup for this project and the exact
commands to use in each scenario. Read this before touching git.

---

## How the three locations relate

```
┌──────────────────────────────────────────┐
│  Replit (monorepo)                       │
│  /home/runner/workspace/                 │
│  └── artifacts/webstudio/  ← webstudio lives here, inside a bigger repo
│       ├── index.html                     │
│       ├── src/                           │
│       ├── modx/                          │
│       └── ...                            │
│  (has its own git history — never push   │
│   the monorepo root to GitHub directly)  │
└──────────────────────┬───────────────────┘
                       │  /tmp copy + force-push  (ONLY safe path)
                       ▼
┌──────────────────────────────────────────┐
│  GitHub: elzorich/ez-studio              │
│  root = webstudio content                │
│       ├── index.html                     │
│       ├── src/                           │
│       ├── modx/                          │
│       └── ...                            │
└──────────────────────┬───────────────────┘
                       │  git clone / git pull  (normal git)
                       ▼
┌──────────────────────────────────────────┐
│  Mac local clone                         │
│  ~/Documents/DEV/ez-studio/              │
│  root = webstudio content  (same as GH)  │
│       ├── index.html                     │
│       ├── src/                           │
│       ├── modx/                          │
│       └── ...                            │
└──────────────────────────────────────────┘
```

**Key rule:** The Replit monorepo root and the GitHub repo root are different things.
The Mac clone IS a normal clone of GitHub — its root maps directly to the webstudio
content. Replit's monorepo root must never be pushed to GitHub directly.

---

## Scenario 1 — Push Replit changes to GitHub

Use this every time the Replit agent (or you inside Replit) updates files and you
want those changes to appear on GitHub.

The script creates a clean copy of just the webstudio folder and force-pushes it,
so GitHub only ever receives the right files regardless of Replit's monorepo structure.

**Run this in the Replit terminal:**

```bash
cd /tmp
rm -rf ez-studio-push
mkdir ez-studio-push
cp -r /home/runner/workspace/artifacts/webstudio/. ez-studio-push/
rm -rf ez-studio-push/node_modules
cd ez-studio-push
git init
git remote add origin https://github.com/elzorich/ez-studio.git
git add .
git commit -m "Zorich Studio — <describe what changed>"
git push --force origin main
```

> `--force` is intentional and safe here. Each push is a complete, clean snapshot
> of the webstudio. There is no incremental history to preserve on the GitHub side.

---

## Scenario 2 — Edit files locally on Mac and push to GitHub

Your Mac clone (`~/Documents/DEV/ez-studio`) is a normal git repo whose root maps
directly to the webstudio content — same structure as GitHub. Edit files there,
commit, and push as usual:

```bash
# In ~/Documents/DEV/ez-studio
git add .
git commit -m "Your commit message"
git push origin main
```

No special steps needed — a standard push works because the Mac clone root and
the GitHub repo root are the same structure.

---

## Scenario 3 — Pull Replit changes into your Mac clone

Do this **after** Replit's changes have already been pushed to GitHub via Scenario 1.
At that point the remote is a clean webstudio snapshot and a normal pull is safe:

```bash
# In ~/Documents/DEV/ez-studio
git pull origin main
```

**Important:** Only pull after the Replit → GitHub push (Scenario 1) has been done.
Before pulling, check GitHub to confirm the root only shows webstudio files
(`index.html`, `src/`, `modx/`, etc.). If you see `artifacts/`, `.replit`, or
`pnpm-workspace.yaml` at the root, the repo is polluted — fix it first (see
Troubleshooting below) before pulling.

---

## Scenario 4 — Pull Mac changes into Replit

Since the Replit monorepo and the GitHub repo have different git histories, you
cannot do a `git pull` inside Replit. Instead, download individual changed files
directly from GitHub using `curl`.

**Run this in the Replit terminal** for each file you changed on the Mac:

```bash
curl -o /home/runner/workspace/artifacts/webstudio/src/styles/sections.scss \
  https://raw.githubusercontent.com/elzorich/ez-studio/main/src/styles/sections.scss
```

Pattern: `raw.githubusercontent.com/elzorich/ez-studio/main/` + the file path as it
appears in the GitHub repo root. Examples:

```bash
# SCSS file
curl -o /home/runner/workspace/artifacts/webstudio/src/styles/sections.scss \
  https://raw.githubusercontent.com/elzorich/ez-studio/main/src/styles/sections.scss

# JS file
curl -o /home/runner/workspace/artifacts/webstudio/src/js/main.js \
  https://raw.githubusercontent.com/elzorich/ez-studio/main/src/js/main.js

# MODx chunk
curl -o /home/runner/workspace/artifacts/webstudio/modx/chunk--ezs-contact.html \
  https://raw.githubusercontent.com/elzorich/ez-studio/main/modx/chunk--ezs-contact.html
```

This works because the GitHub repo is public — no authentication needed.

---

## Scenario 5 — Deploy SCSS changes to MODx

When you change styles in `src/styles/*.scss`, MODx does not update automatically.
The SCSS must be compiled into `main.css` first, then uploaded to the server.

**Step 1 — Build** (run in Replit terminal or Mac terminal inside the webstudio folder):

```bash
# In Replit:
cd /home/runner/workspace/artifacts/webstudio
pnpm build

# On Mac:
cd ~/Documents/DEV/ez-studio
npm run build
```

Vite compiles all SCSS and outputs a single file: `dist/assets/main.css`
(and `dist/assets/main.js` for JavaScript).

**Step 2 — Upload to the MODx server**

Upload `dist/assets/main.css` to your server at:
```
/assets/main.css
```

This is the path the MODx template references via `[[++assets_url]]main.css`.
If you also changed JavaScript, upload `dist/assets/main.js` too.

You can use any FTP/SFTP client (Transmit, Cyberduck, FileZilla) or your hosting
control panel's file manager.

**That's it** — refresh the MODx site and the new styles are live.

> No need to update the MODx template itself. The filenames (`main.css`, `main.js`)
> never change between builds — Vite is configured to use stable filenames.

---

## Order of operations when both sides have changes

1. Replit agent finishes work → run **Scenario 1** from the Replit terminal
2. In your Mac clone → run **Scenario 3** (`git pull`) to get those changes
3. Make your edits on Mac → run **Scenario 2** (`git add / commit / push`)

Do not skip step 2 before step 3. If your Mac clone is behind the remote you will
get a rejected push and be tempted to reach for `--force` from the Mac, which would
overwrite Replit's work.

---

## Never do this

| Action | Why it breaks things |
|---|---|
| `git push` from the Replit terminal (monorepo root) | Replit root ≠ webstudio root — all internal Replit files (`artifacts/`, `.replit`, `pnpm-workspace.yaml`, etc.) get pushed to GitHub |
| `git pull` in the Mac clone when GitHub has Replit monorepo files | Imports the wrong directory structure into your Mac clone |
| `git pull --allow-unrelated-histories` | Merges Replit's monorepo history into the Mac clone and GitHub — pollutes everything |
| Clicking VS Code "Sync Changes" without checking the ↑/↓ count | VS Code can auto-pull divergent history — always check what's incoming before syncing |

---

## Troubleshooting — GitHub repo is polluted with monorepo files

**Symptom:** GitHub root shows `artifacts/`, `attached_assets/`, `lib/`, `.replit`,
`pnpm-workspace.yaml`, or `replit.md`.

**Fix:** Run the Scenario 1 script from the Replit terminal to restore a clean state:

```bash
cd /tmp
rm -rf ez-studio-push
mkdir ez-studio-push
cp -r /home/runner/workspace/artifacts/webstudio/. ez-studio-push/
rm -rf ez-studio-push/node_modules
cd ez-studio-push
git init
git remote add origin https://github.com/elzorich/ez-studio.git
git add .
git commit -m "Zorich Studio — restore clean webstudio-only snapshot"
git push --force origin main
```

Then update your Mac clone to match the restored remote:

```bash
# In ~/Documents/DEV/ez-studio
git fetch origin
git reset --hard origin/main
```

> `reset --hard` discards any uncommitted local changes. If you have edits you want
> to keep, stash them first: `git stash` before the reset, then `git stash pop` after.

---

## Quick reference

| Scenario | Where to run | Commands |
|---|---|---|
| Push Replit work → GitHub | Replit terminal | `/tmp` copy + force-push script (Scenario 1) |
| Push Mac edits → GitHub | `~/Documents/DEV/ez-studio` | `git add . && git commit -m "..." && git push origin main` |
| Get Replit changes into Mac clone | `~/Documents/DEV/ez-studio` | `git pull origin main` (only after Replit has pushed first) |
| Get Mac changes into Replit | Replit terminal | `curl -o <replit-path> https://raw.githubusercontent.com/elzorich/ez-studio/main/<file>` |
| Deploy SCSS/JS changes to MODx | Replit or Mac terminal | `pnpm build` → upload `dist/assets/main.css` (and `main.js`) to server |
| Fix polluted GitHub repo | Replit terminal, then Mac | Scenario 1 force-push, then `git reset --hard origin/main` in Mac clone |

---

## Why force-push is safe here

Normally `--force` is dangerous because it overwrites history other people depend on.
In this project it is safe because:

- The GitHub repo is a solo project with no other contributors pushing
- Each `/tmp` push is a complete, self-contained snapshot — no work is ever lost
  (all real history lives in Replit and in the Mac clone)
- The GitHub history exists as a deployment/reference snapshot, not as the primary
  source of truth for development
