---
# ==========================================================================
#  A CODING CHALLENGE entry. Copy this file to add another; the filename
#  becomes the URL. The body holds the problem, your solution, the AI's
#  solution (Python + C++), and a short complexity note.
# ==========================================================================
title: "Helpful Maths"
description: "Rearrange a sum of 1s, 2s and 3s into non-decreasing order — a warm-up in counting and stable output."
source: "Codeforces"
problemUrl: "https://codeforces.com/problemset/problem/339/A"
difficulty: "800"             # Codeforces rating; optional
date: 2026-01-20             # YYYY-MM-DD
tags: ["strings", "sorting", "counting"]
---

## The problem

> **339A — Helpful Maths.** You are given a sum (a string of the digits `1`, `2`,
> `3` joined by `+`). Rearrange the summands so they appear in **non-decreasing**
> order, and print the new sum. For example, `3+2+1` becomes `1+2+3`.

## My solution (Python)

Because the only operator is `+`, I can ignore the operator entirely: just count
how many 1s, 2s and 3s there are, then print them back in order.

```python
question = input()
counts = [0, 0, 0]

for ch in question:
    if ch.isdigit():
        counts[int(ch) - 1] += 1

parts = []
for digit in range(1, 4):
    parts += [str(digit)] * counts[digit - 1]

print("+".join(parts))
```

<!-- EDIT HERE: add YOUR OWN C++ solution once you've written it. -->

## AI's solution (Python)

The same counting idea, expressed as a single comprehension:

```python
s = input()
print('+'.join(d for d in '123' for _ in range(s.count(d))))
```

## AI's solution (C++)

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    getline(cin, s);

    string out;
    for (char d : {'1', '2', '3'})       // output 1s, then 2s, then 3s
        for (char c : s)
            if (c == d) {
                if (!out.empty()) out += '+';
                out += d;
            }

    cout << out << "\n";
}
```

## Complexity

Both approaches are **O(n)** time, where *n* is the length of the input string:
the counting versions make a constant number of passes over it. Extra space is
**O(1)** beyond the output itself — the Python version keeps only a fixed array
of three counts, and the C++ version a few characters of state. (The output
string is unavoidably O(n).)

The lesson: spotting that the `+` characters carry no information turns a
"sorting" problem into a counting one, which is simpler and strictly linear.
