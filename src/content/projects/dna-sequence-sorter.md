---
# ==========================================================================
#  A MINI project — a small tool you wrote to solve a real annoyance.
#  Copy this file to add another; the filename becomes the URL.
# ==========================================================================
title: "DNA sequence sorter: finding a species across many files"
description: "A small Python tool to pull text out of dozens of Sanger sequencing result files at once and search them for a specific species — turning a one-by-one chore into a single run."
category: "mini-unique"        # big-unique | guided | mini-unique
date: 2026-03-30             # YYYY-MM-DD
tags: ["Python", "bioinformatics", "automation"]
# githubUrl: "[[GITHUB_URL]]"   # optional — uncomment and set
featured: true                # show on the home page?
---

<!-- EDIT HERE: this is a real mini-project of yours. Rewrite freely. -->

## The annoyance

After a batch of Sanger sequencing, the results come back as a pile of separate
files inside a single download — one folder per sample. I needed to check which
of them contained a **specific species**, and I was opening and reading them
**one at a time**. For a handful of files that's fine; for dozens it's a slow,
error-prone chore.

## Approach

Rather than reach for a heavyweight tool, I wrote a short Python script to do the
boring part for me. It opens the results archive, reads each sequencing file's
text **without unzipping the whole thing to disk**, and pulls the contents into
one place — optionally tagging each block with its accession number and the
source filename so I can trace any hit back to the exact file it came from.

From there, finding a species is just searching the combined text instead of
hunting through folders by hand.

## Result and what I learned

It collapsed a tedious manual pass into a single command, and — just as usefully —
it removed the mistakes that creep in when you do the same fiddly thing many times
by hand. It's a small program, but it's a genuine real-world problem of my own,
and writing it sharpened my comfort with file handling, archives, and text
processing in Python.

The natural next step is to turn the species search into a proper command-line
option (and maybe report which file each match lives in), so it generalises
beyond this one task.
