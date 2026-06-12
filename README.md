# Personal Portfolio Website

A clean, fast personal portfolio for a developer-researcher, built
with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).
It follows the visitor's system dark/light preference by default, with a
toggle to override it (remembered, and kept in sync across open tabs).
It presents software projects, solved coding problems, and scientific research
side by side as short case studies, with a notes/blog section and an interactive
graphics demo on the home page.

The site is organised into these sections:

- **Projects** — your build work in three tiers: *Flagship* (your own original,
  ambitious ideas), *Guided builds* (you followed a tutorial/course), and *Mini*
  (small tools that solve a real, everyday annoyance).
- **Problems** — your competitive-programming profile (a link to Codeforces),
  plus worked coding-challenge solutions with complexity analysis.
- **Research** — your scientific work, kept in its own section.
- **Notes** — short blog-style write-ups.

This README is written for someone who has **never used JavaScript**. You can
run and maintain this whole site by editing text files. Take it step by step.

---

## Table of contents

1. [What you need installed](#1-what-you-need-installed)
2. [Running the site on your computer](#2-running-the-site-on-your-computer)
3. [The folder layout (what each thing is)](#3-the-folder-layout-what-each-thing-is)
4. [How to add a new project](#4-how-to-add-a-new-project) ← most common task
5. [How to add a research entry](#5-how-to-add-a-research-entry)
6. [How to add a solved coding problem](#6-how-to-add-a-solved-coding-problem)
7. [How to add a new page](#7-how-to-add-a-new-page)
8. [How to add a note / blog post](#8-how-to-add-a-note--blog-post)
9. [The placeholders you must replace](#9-the-placeholders-you-must-replace)
10. [The interactive canvas demo](#10-the-interactive-canvas-demo)
11. [Deploying for free](#11-deploying-for-free)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. What you need installed

**Node.js version 22.12.0 or newer** (Astro 6 requires this). To check what you
have, open a terminal and run:

```bash
node --version
```

If it prints something lower than `v22.12.0`, or "command not found", install
the latest **LTS** version from <https://nodejs.org>. On macOS you can also use
[`nvm`](https://github.com/nvm-sh/nvm) (`nvm install --lts`).

That's the only prerequisite — `npm` (the package installer) comes bundled with
Node.

---

## 2. Running the site on your computer

In a terminal, from this project folder, run these three commands. You only run
the first one once (and again whenever dependencies change):

```bash
npm install      # download the building blocks (creates a node_modules folder)
npm run dev      # start the live preview server
```

After `npm run dev`, the terminal prints a local web address (usually
`http://localhost:4321`). Open it in your browser. As you edit and save files,
the page **reloads automatically** — keep this running while you work.

To stop the server, press `Ctrl + C` in the terminal.

When you want to produce the final files for the live website:

```bash
npm run build    # creates a "dist" folder full of plain HTML/CSS/JS
npm run preview  # (optional) preview that built version locally
```

You normally don't touch the `dist` folder by hand — the host builds it for you.

---

## 3. The folder layout (what each thing is)

```
.
├── astro.config.mjs      # main site config (domain, sitemap). Rarely edited.
├── package.json          # the list of dependencies and the npm commands.
├── public/               # files served exactly as-is (see below).
│   ├── cv.pdf            #   ← replace with your real CV (keep the name).
│   ├── og-image.png      #   ← social-share preview image (1200×630).
│   ├── favicon.svg       #   ← the little icon in the browser tab.
│   └── robots.txt        #   ← tells search engines they can crawl the site.
└── src/                   # everything you actually edit lives here.
    ├── content.config.ts #   defines the fields each kind of entry can have.
    ├── content/          #   YOUR CONTENT — plain Markdown files.
    │   ├── projects/     #     one .md file per project (copy to add more).
    │   ├── research/     #     one .md file per research write-up.
    │   ├── challenges/   #     one .md file per solved coding problem.
    │   └── notes/        #     one .md file per note / blog post.
    ├── lib/
    │   └── projectMeta.ts #   the labels/colours for the project tiers + status.
    ├── pages/            #   each file here becomes a page (a URL).
    │   ├── index.astro   #     the home page  ("/")
    │   ├── about.astro   #     "/about"
    │   ├── contact.astro #     "/contact"
    │   ├── 404.astro     #     the "page not found" page
    │   ├── projects/     #     "/projects" list + individual project pages
    │   ├── problems/     #     "/problems" list + individual challenge pages
    │   ├── research/     #     "/research" list + individual research pages
    │   └── notes/        #     "/notes" list + individual note pages
    ├── layouts/          #   the shared page "frame" (header, footer, head).
    │   └── BaseLayout.astro
    ├── components/       #   reusable building blocks used by the pages.
    │   ├── Header.astro       (top navigation bar)
    │   ├── Footer.astro       (bottom bar with social links)
    │   ├── ThemeToggle.astro  (the dark/light switch)
    │   ├── SEO.astro          (the search + social tags in <head>)
    │   ├── ProjectCard.astro  (one project/research card in a list)
    │   ├── ChallengeCard.astro (one solved-problem card in a list)
    │   └── CanvasDemo.astro   (the animated graphics demo)
    └── styles/
        └── global.css    #   colours and fonts for the whole site.
```

**Two ideas that explain almost everything:**

- **File-based routing:** a file in `src/pages/` automatically becomes a page at
  the matching URL. `about.astro` → `/about`. No routing to configure.
- **Content collections:** the Markdown files in `src/content/` are your
  projects, research, challenges, and notes. The list pages read those folders
  and build themselves, so adding content never means editing page code.

Every `.astro` file has comments at the top explaining its job, and
`<!-- EDIT HERE: ... -->` markers wherever you're meant to change something.

---

## 4. How to add a new project

This is the task you'll do most. **You never write any code — you copy a
Markdown file and edit the text.**

1. Go to `src/content/projects/`.
2. **Copy** an existing file, e.g. `tinyrenderer.md`, and give the copy a new
   name. The filename (without `.md`) becomes the URL, so
   `my-new-project.md` → `/projects/my-new-project`. Use lowercase words joined
   by hyphens.
3. Open your new file and edit the part between the two `---` lines (this is
   called the "frontmatter"):

   ```markdown
   ---
   title: "My new project"
   description: "One or two sentences shown in lists and previews."
   category: "mini-unique"       # MUST be "big-unique", "guided", or "mini-unique"
   status: "complete"            # optional: "planned", "in-progress", or "complete"
   date: 2026-06-10              # the date, written as YYYY-MM-DD
   tags: ["Python", "data"]      # any number of short tags
   githubUrl: "https://github.com/you/repo"   # optional — delete if none
   demoUrl: "https://example.com/demo"        # optional — delete if none
   featured: true                # true = also show on the home page
   ---
   ```

   **Which `category` to choose** (it decides the section on `/projects`):
   - `big-unique` → **Flagship projects**: your own original, ambitious ideas.
   - `guided` → **Guided builds**: you followed a tutorial or course.
   - `mini-unique` → **Mini projects**: a small tool solving a real annoyance.

   **The optional `status`** shows a little pill on the card. Use `planned` or
   `in-progress` for work you haven't finished (great for Flagship ideas);
   leave it off or set `complete` for finished work (no pill shows).

4. Below the second `---`, write the project write-up in **Markdown**. A good
   shape is: Problem → Approach → Solution → Result/tradeoffs. Use `##` for a
   heading, `**bold**`, `*italics*`, and `-` for bullet points.
5. **Save.** The project now appears automatically under the matching heading on
   `/projects`, gets its own page, and (if `featured: true`) shows on the home
   page. Nothing else to edit.

> **Helpful safety net:** if you mistype a field name or forget a required one,
> the `npm run dev` terminal shows a clear, friendly error naming the file and
> the problem. Fix it and save — no silent breakage.

---

## 5. How to add a research entry

Research lives in its own folder and its own `/research` section, but the steps
are the same as a project — just simpler frontmatter (no `category`).

1. Copy a file in `src/content/research/`, e.g. `kinase-inhibitors.md`, to a new
   name (the filename becomes the URL: `/research/your-file-name`).
2. Edit the frontmatter:

   ```markdown
   ---
   title: "My research write-up"
   description: "One or two sentences shown in lists and previews."
   date: 2026-06-10              # YYYY-MM-DD
   tags: ["molecular biology"]   # any number of short tags
   featured: true                # true = show in the "Selected research" strip on home
   ---
   ```

3. Write the body in Markdown below the `---`, and **save**. It appears on
   `/research` automatically.

---

## 6. How to add a solved coding problem

These power the **Problems** page. Each one is a Markdown file holding the
problem statement, your solution, the AI's solution, and a complexity note.

1. Copy a file in `src/content/challenges/`, e.g.
   `codeforces-helpful-maths.md`, to a new name.
2. Edit the frontmatter:

   ```markdown
   ---
   title: "Problem name"
   description: "One sentence on what the problem is about."
   source: "Codeforces"          # the platform — free text (e.g. "freeCodeCamp")
   date: 2026-06-10              # YYYY-MM-DD
   tags: ["sorting", "strings"]
   problemUrl: "https://codeforces.com/problemset/problem/339/A"  # optional
   difficulty: "800"             # optional (e.g. a Codeforces rating)
   ---
   ```

3. Below the `---`, write the body. The existing files show the pattern to copy:
   a `## The problem` quote, then `## My solution (Python)`, an `EDIT HERE`
   marker for your own C++, `## AI's solution (Python)`, `## AI's solution
   (C++)`, and `## Complexity`. **Code goes in fenced blocks** and is
   colour-highlighted automatically — open a block with three backticks and the
   language, and close it with three backticks:

   ````markdown
   ```python
   print("hello")
   ```
   ````

4. **Save.** It appears on `/problems`, grouped under its `source`, with its own
   page. The Codeforces profile card at the top of that page is separate — set
   its link via the `[[CODEFORCES_URL]]` placeholder (see the next section).

---

## 7. How to add a new page

For a brand-new top-level page like `/teaching`:

1. Copy an existing simple page, e.g. `src/pages/about.astro`, to
   `src/pages/teaching.astro` (the filename becomes the URL).
2. Change the `title` and `description` near the top, and rewrite the content
   between `<BaseLayout ...>` and `</BaseLayout>`.
3. **Save.** The page now exists at `/teaching`.
4. To add it to the menu, open `src/components/Header.astro` and add one line to
   the `links` list:
   ```js
   { href: '/teaching', label: 'Teaching' },
   ```

---

## 8. How to add a note / blog post

Exactly like a project, but in the `src/content/notes/` folder:

1. Copy `src/content/notes/welcome.md` to a new name.
2. Edit the `title`, `description`, `date`, and `tags`.
3. Write your post below the `---`.
4. Save — it appears on `/notes`, newest first.

---

## 9. The placeholders you must replace

The site ships with obvious placeholders so nothing personal is invented for
you. Find them by searching the project for the double-bracket pattern, e.g.:

```bash
grep -rn "\[\[" src astro.config.mjs public
```

| Placeholder        | What to put there                          | Where it appears |
| ------------------ | ------------------------------------------ | ---------------- |
| `[[YOUR_NAME]]`    | Your name                                  | every page title, header, footer, hero |
| `[[YOUR_EMAIL]]`   | Your email address                         | `src/pages/contact.astro` |
| `[[GITHUB_URL]]`   | Your GitHub profile URL                    | contact page, footer, project frontmatter |
| `[[LINKEDIN_URL]]` | Your LinkedIn URL                          | contact page, footer |
| `[[ORCID_URL]]`    | Your ORCID profile URL                     | contact page, footer |
| `[[SCHOLAR_URL]]`  | Your Google Scholar URL                    | contact page, footer |
| `[[CODEFORCES_URL]]`    | Your Codeforces profile URL           | `src/pages/problems/index.astro` |
| `[[CODEFORCES_HANDLE]]` | Your Codeforces handle                | `src/pages/problems/index.astro` |
| `[[CODEFORCES_RATING]]` | Your current Codeforces rating        | `src/pages/problems/index.astro` |
| `[[YOUR_DOMAIN]]`  | Your final domain, e.g. `yourname.com`     | `astro.config.mjs`, `public/robots.txt` |

Also replace these files in `public/` with your real versions (keep the same
filenames):

- `public/cv.pdf` — your CV/résumé.
- `public/og-image.png` — a 1200×630 image shown when your link is shared.
- `public/favicon.svg` — the browser-tab icon.

Tip: most editors have a "Replace in all files" feature — use it to swap each
`[[YOUR_NAME]]` everywhere at once.

---

## 10. The interactive canvas demo

The home page shows a spinning 3D wireframe cube drawn line-by-line with
Bresenham's algorithm — a nod to the tinyrenderer work. It lives in
`src/components/CanvasDemo.astro`.

**This is the only place on the site with real JavaScript logic**, and the file
is heavily commented so you can read it top to bottom. It automatically:

- pauses when scrolled off-screen or when the browser tab is hidden (saves
  battery),
- shows a single still frame instead of animating if the visitor has asked their
  device to reduce motion (accessibility),
- falls back to plain text if the browser can't draw at all.

You don't need to touch it, but if you want to recolour it, change the
`lineColour` value inside the file.

---

## 11. Deploying for free

The site is fully static, so any static host works. Keep your source on GitHub
either way.

### Option A — Cloudflare Pages (recommended, simplest)

1. Push this project to a GitHub repository.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to
   Git**, and pick your repo.
3. Set the build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy. Cloudflare serves from the domain root, so there's nothing else to
   configure. Every future `git push` redeploys automatically.

### Option B — GitHub Pages

GitHub Pages works too, with **one extra step** if your site lives at
`username.github.io/repo-name`:

1. Open `astro.config.mjs` and uncomment + set the `base` line to your repo
   name, e.g. `base: '/repo-name'`.
2. Add the official Astro deploy workflow (see
   <https://docs.astro.build/en/guides/deploy/github/>). It uses
   `withastro/action` to build and publish on every push.
3. Your repo must be **public** on the free plan.

If you use a **custom domain** on GitHub Pages, you can leave `base` commented
out (the site serves from the root).

---

## 12. Troubleshooting

- **`npm run dev` fails right away** → check `node --version` is 22.12.0+.
- **A new project doesn't show up** → make sure the file is in
  `src/content/projects/`, ends in `.md`, and the frontmatter has all required
  fields. The dev terminal will name the problem.
- **The error mentions a `category`** → it must be exactly `big-unique`,
  `guided`, or `mini-unique` (lowercase, in quotes).
- **A coding problem doesn't show up** → make sure it's in
  `src/content/challenges/` and has a `source`; it's grouped on `/problems` by
  that value.
- **Links look broken after deploying to GitHub Pages** → you likely need the
  `base` setting (see Option B above).
- **Changes don't appear** → save the file; if still stuck, stop the server
  (`Ctrl + C`) and run `npm run dev` again.

---

Built with Astro + Tailwind CSS. Have fun making it yours.
