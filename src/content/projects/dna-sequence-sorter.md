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

## The code

The core is a small helper that reads a named file **inside** the results
archive without unzipping the whole thing to disk:

```python
import io
import os
import zipfile

def read_file_in_zip(zip_path, file_name):
    """
    Reads the content of a file inside a ZIP archive without extracting it.

    :param zip_path: Path to the ZIP file.
    :param file_name: Name of the file inside the ZIP to read.
    :return: Content of the file as bytes.
    """
    try:
        # Open the ZIP file in read mode
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            # Check if the file exists in the archive
            if file_name not in zip_ref.namelist():
                raise FileNotFoundError(f"'{file_name}' not found in the ZIP archive.")

            # Open the file inside the ZIP (returns a file-like object)
            with zip_ref.open(file_name) as file:
                content = file.read()  # Read file content into memory
                return content

    except zipfile.BadZipFile:
        raise ValueError("The provided file is not a valid ZIP archive.")
    except Exception as e:
        raise RuntimeError(f"Error reading file from ZIP: {e}")


# Example usage
if __name__ == "__main__":
    zip_file_path = "example.zip"
    inner_file_name = "data.txt"

    try:
        data = read_file_in_zip(zip_file_path, inner_file_name)
        print("File content inside ZIP:")
        print(data.decode('utf-8'))  # Decode if it's text
    except Exception as err:
        print(err)
```

With that in place, the rest of the tool loops over the sequencing files in the
archive, pulls each one's text, and searches the combined result for the species
I'm after — no more opening them one by one.
