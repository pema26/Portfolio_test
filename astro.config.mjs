// @ts-check
//
// ============================================================================
//  astro.config.mjs  —  the main configuration file for the whole website
// ============================================================================
//
//  WHAT THIS FILE DOES (plain English):
//  This tells Astro how to build your site. You rarely need to touch it, but
//  the lines you might want to change are clearly marked with "EDIT HERE".
//
//  Astro docs: https://docs.astro.build/en/reference/configuration-reference/
// ============================================================================

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // -------------------------------------------------------------------------
  //  EDIT HERE: set this to the final web address of your site once you know
  //  it (for example "https://yourname.com"). It is used to generate correct
  //  links in the sitemap.xml and the social-share (Open Graph) tags.
  //  Leave the trailing slash off. It must be a real, valid web address (that
  //  is why this is "example.com" and not a [[...]] placeholder — Astro needs
  //  a working URL here to build the sitemap).
  // -------------------------------------------------------------------------
  site: 'https://example.com',

  // Build a plain, fast, fully static website (just HTML/CSS/JS files).
  // This is what lets you host for free on Cloudflare Pages or GitHub Pages.
  output: 'static',

  // -------------------------------------------------------------------------
  //  GITHUB PAGES NOTE (only relevant if you deploy to GitHub Pages at a URL
  //  like  username.github.io/repo-name ). In that case, uncomment the line
  //  below and set it to "/your-repo-name". If you deploy to Cloudflare Pages
  //  or use a custom domain, LEAVE THIS COMMENTED OUT.
  // -------------------------------------------------------------------------
  // base: '/your-repo-name',

  integrations: [
    // Automatically generates sitemap.xml when you run `npm run build`.
    sitemap(),
  ],

  vite: {
    // Tailwind CSS v4 is wired in here as a Vite plugin. You don't need to
    // edit this — your design tokens live in src/styles/global.css instead.
    plugins: [tailwindcss()],
  },
});
