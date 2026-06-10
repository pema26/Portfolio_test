---
# ==========================================================================
#  This is a NOTE entry (a short blog post). To add your own, copy this file,
#  rename it, edit the fields, and write below the second "---".
# ==========================================================================
title: "How this site is built (and how I add to it)"
description: "A short note explaining the pattern this site uses, and how new pages and projects get added by editing files."
date: 2026-03-12
tags: ["meta", "astro"]
---

This is an example note. It exists to show the pattern — and to be a template you
can copy.

## How notes work

Every file in `src/content/notes/` becomes a note automatically. To write a new
one:

1. Copy this file and rename it (the new filename becomes the URL).
2. Edit the `title`, `description`, `date`, and `tags` at the top.
3. Write whatever you like below the second `---`, using **Markdown**.
4. Save. It appears on the `/notes` page on its own — newest first.

## Why it's set up this way

The whole site is built so I can add content by editing plain text files, with no
JavaScript involved. Projects work exactly the same way, just in the
`src/content/projects/` folder. The full step-by-step is in the project README.

> The goal: spend my time writing about the work, not wrestling with the website.
