# For you, detective 🤍

A complete, responsive GitHub Pages website. Plain HTML, CSS, and JavaScript. No installation or build step.

## Publish

1. Create a GitHub repository (for example, `little-moments`).
2. Upload the **contents** of this folder: `index.html`, `style.css`, `script.js`, `.nojekyll`, and the entire `assets` folder. Keep `index.html` at the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose **main** and **/ (root)**, then **Save**.
6. When deployment finishes, open the website URL shown in Pages settings. Usually it is `https://YOUR-USERNAME.github.io/little-moments/`.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Preview and edit

Open `index.html` in a browser, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000.

- Edit the letter directly in `index.html`.
- Change colors, typography, motion, and spacing in `style.css`.
- Change reveal and luck-button behavior in `script.js`.
- Fonts load from Google Fonts, with local serif/sans-serif fallbacks if offline.
- All images use relative paths, so GitHub project pages work.
- `assets/baby-original.png` is an exact, unchanged copy of the uploaded childhood picture.
- The three adult portraits are AI-generated Studio Ghibli-style gym illustrations, with gentle CSS camera motion. They are still images, not frame-by-frame character animation.
- The page respects the device's reduced-motion preference. No analytics or data collection is included; the luck button does not send a message.

## Visibility

GitHub Pages publishes a web-accessible page. `noindex` asks search engines not to index it, but does not make the photos or letter private. Only upload material you are comfortable making accessible online.

## Files

```
index.html
style.css
script.js
.nojekyll
assets/
  her-gym-1.png
  her-gym-2.png
  him-gym.png
  baby-original.png
```
