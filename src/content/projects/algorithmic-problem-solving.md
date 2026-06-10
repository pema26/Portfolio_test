---
title: "Algorithmic problem solving"
description: "Competitive-programming practice on Codeforces, and what it taught me about complexity, data structures, and writing code under constraints."
category: "software"
date: 2026-01-20
tags: ["Python", "algorithms", "Codeforces"]
featured: true
---

## The problem

I wanted to get genuinely comfortable with algorithms and data structures, not
just recognise their names. Competitive programming is a demanding but honest way
to do that: the tests are unforgiving and either your solution is fast enough or
it isn't.

## Approach

I worked through problems on **Codeforces** in Python, deliberately starting below
my comfort level and climbing. For each problem I tried to name the underlying
pattern — sorting, two pointers, binary search, greedy, dynamic programming, graph
traversal — before writing any code.

## What I learned

The biggest shift was learning to reason about **time and space complexity up
front**. A solution that is correct but O(n²) will fail where an O(n log n) one
passes, so the constraints in the problem statement became my first clue about
which approach to reach for. I also got much faster at translating a clean idea
into bug-free code under time pressure.

## Tradeoffs

Competitive style isn't production style — it rewards terse, single-use code. The
transferable win is the mental library of patterns and the habit of estimating
cost before committing to an implementation.
