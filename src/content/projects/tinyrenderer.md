---
# ==========================================================================
#  This is a PROJECT entry. To add your own, copy this whole file, rename it
#  (the filename becomes the URL), and edit the fields below + the prose.
#  Fields marked "optional" can be deleted if they don't apply.
# ==========================================================================
title: "tinyrenderer: a software rasterizer from scratch"
description: "Building a 3D renderer with no graphics library — Bresenham line drawing, wireframes, and triangle rasterization, one pixel at a time."
category: "guided"           # big-unique | guided | mini-unique
date: 2026-02-15             # YYYY-MM-DD
tags: ["C++", "graphics", "rendering"]
demoUrl: "https://haqr.eu/tinyrenderer"   # optional
# githubUrl: "[[GITHUB_URL]]"             # optional — uncomment and set
featured: true                            # show on the home page?
---

<!-- EDIT HERE: write your case study below. A useful shape is
     Problem -> Approach -> Solution -> Result / tradeoffs. -->

## The problem

Modern graphics APIs hide an enormous amount of machinery behind a few function
calls. I wanted to understand what actually happens between "here is some 3D
geometry" and "here are coloured pixels on a screen" — so I set out to build a
renderer that uses no graphics library at all, following the well-known
*tinyrenderer* tutorial.

## Approach

I worked up from the most basic primitive. The first milestone was drawing a
single straight line between two points using **Bresenham's algorithm**, which
decides which pixels to fill using only integer addition and comparisons. From
there I connected lines into **wireframe** models, then moved on to filling
**triangles** so surfaces became solid.

Each step forced a concrete decision: how to handle steep versus shallow lines,
how to walk the edges of a triangle, and how to map 3D coordinates down onto the
2D image plane.

## Solution

The result is a small renderer that loads a model and produces an image entirely
in code I wrote myself — projection, rasterization, and the pixel-level line
drawing included. The live demo shows it running.

## What I learned / tradeoffs

Doing it by hand made the performance tradeoffs tangible: a software rasterizer
is far slower than the GPU, but writing every stage myself turned "graphics" from
a black box into a set of ideas I genuinely understand. The next natural steps are
z-buffering for correct depth and simple shading.
