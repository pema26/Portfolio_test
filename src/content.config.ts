// ============================================================================
//  src/content.config.ts  —  the "shape" of your content
// ============================================================================
//
//  WHAT THIS FILE DOES:
//  It defines the collections of Markdown files on this site and the list of
//  frontmatter fields each entry is allowed to have. ("Frontmatter" is the
//  block between the two `---` lines at the top of every Markdown file.)
//
//  The collections are:
//    • projects    — your build work, in three tiers (see `category` below)
//    • research    — your scientific / research write-ups
//    • challenges  — solved coding problems (Codeforces, freeCodeCamp, …)
//    • notes       — short blog-style write-ups
//
//  WHY IT'S USEFUL TO YOU:
//  If you mistype a field name or forget a required one when adding a new
//  entry, the dev server shows a clear, friendly error telling you exactly
//  what's wrong — instead of the page silently breaking. You almost never need
//  to edit this file; you just follow the field list when writing Markdown.
//
//  This uses the modern Astro "Content Layer" API (Astro 5/6). The `glob()`
//  loader simply means "load every .md file in this folder".
// ============================================================================

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ---- The "projects" collection -------------------------------------------
// Every file in  src/content/projects/  is one project entry.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    // Required fields (the dev server complains if these are missing):
    title: z.string(),
    description: z.string(),

    // category MUST be one of these three exact words. It decides which
    // section the project appears under on the /projects page:
    //   "big-unique"   -> Flagship projects (your own original, ambitious ideas)
    //   "guided"       -> Guided builds      (you followed a tutorial/curriculum)
    //   "mini-unique"  -> Mini projects      (small tools you wrote to solve a
    //                                         real annoyance of your own)
    category: z.enum(['big-unique', 'guided', 'mini-unique']),

    // How finished it is. Drives the little status pill on the card. Optional —
    // defaults to "complete" (which shows no pill).
    status: z.enum(['planned', 'in-progress', 'complete']).default('complete'),

    date: z.coerce.date(), // written as YYYY-MM-DD in the Markdown
    tags: z.array(z.string()),

    // Optional fields (leave them out if not relevant):
    githubUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    featured: z.boolean().default(false), // show on the home page strip?
  }),
});

// ---- The "research" collection -------------------------------------------
// Every file in  src/content/research/  is one research write-up. Same idea as
// a project, but kept separate so research has its own home on the site.
const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    featured: z.boolean().default(false), // show on the home page strip?
  }),
});

// ---- The "challenges" collection -----------------------------------------
// Every file in  src/content/challenges/  is one solved coding problem. The
// Markdown body holds the problem statement, your solution, the AI's solution
// (Python and C++), and a short complexity note.
const challenges = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/challenges' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Where the problem came from, e.g. "Codeforces" or "freeCodeCamp". This is
    // free text so you can add new sources without editing this file.
    source: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),

    // Optional fields:
    problemUrl: z.string().url().optional(), // link to the original problem
    difficulty: z.string().optional(), // e.g. a Codeforces rating like "800"
  }),
});

// ---- The "notes" collection ----------------------------------------------
// Every file in  src/content/notes/  is one short write-up / blog post.
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

// This line publishes the collections so the rest of the site can read them
// with getCollection('projects') / getCollection('research') / etc.
export const collections = { projects, research, challenges, notes };
