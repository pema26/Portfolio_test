// ============================================================================
//  src/content.config.ts  —  the "shape" of your content
// ============================================================================
//
//  WHAT THIS FILE DOES:
//  It defines the two collections of Markdown files on this site —
//  "projects" and "notes" — and the list of frontmatter fields each entry is
//  allowed to have. ("Frontmatter" is the block between the two `---` lines at
//  the top of every Markdown file.)
//
//  WHY IT'S USEFUL TO YOU:
//  If you mistype a field name or forget a required one when adding a new
//  project, the dev server shows a clear, friendly error telling you exactly
//  what's wrong — instead of the page silently breaking. You almost never need
//  to edit this file; you just follow the field list when writing Markdown.
//
//  This uses the modern Astro "Content Layer" API (Astro 5/6). The `glob()`
//  loader simply means "load every .md file in this folder".
// ============================================================================

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ---- The "projects" collection -------------------------------------------
// Every file in  src/content/projects/  is one project / research entry.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    // Required fields (the dev server complains if these are missing):
    title: z.string(),
    description: z.string(),
    // category MUST be one of these two exact words. This drives the
    // Software vs Research filter on the /projects page.
    category: z.enum(['software', 'research']),
    date: z.coerce.date(), // written as YYYY-MM-DD in the Markdown
    tags: z.array(z.string()),

    // Optional fields (leave them out if not relevant):
    githubUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    featured: z.boolean().default(false), // show on the home page strip?
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

// This line publishes the two collections so the rest of the site can read
// them with getCollection('projects') / getCollection('notes').
export const collections = { projects, notes };
