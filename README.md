# nishit-shivdasani.github.io

Source for my portfolio site, served by GitHub Pages at
**https://nishit-shivdasani.github.io**.

Static HTML, CSS, and JavaScript — no build step, no dependencies. Pages
serves the repository root directly, so `index.html` at the top level is the
live site.

## Layout

| Path | Purpose |
| --- | --- |
| `index.html` | The site |
| `Nishit_Shivdasani_Resume.pdf` | Résumé, linked from the site |

## Local preview

No build step, so any static server works:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.
