# PAIGE 18 Production — Website (Concept 01 · Light)

Static site for PAIGE 18 Production, a Vancouver film / theatre / web series company.
No build step — open `index.html` or serve the folder (`python3 -m http.server`).

## Pages
- `index.html` — Hero trailer · About summary · Works (filter) · Press & Awards · People · Contact · Footer
- `about.html` — company detail page ("Learn more")
- `work.html?id=<slug>` — project detail page, rendered from `assets/js/data.js`

## Replacing placeholders
- **Hero video**: `assets/video/hero-reel.mp4` plays muted and looped (poster `assets/img/reel.jpg`). The Watch Trailer button links to YouTube; a YouTube background is still supported via `<div class="hero__yt" data-youtube="VIDEO_ID"></div>`.
- **Works**: edit `assets/js/data.js` — set `poster` (2:3 image), `preview` (short hover clip) and `trailer` per project.
- **People / contact images**: replace the `.ph` blocks with `<img>` inside them.
- **Logo**: `assets/img/logo/` — original colours; white versions only for use on red backgrounds.
- All names, numbers, quotes, festivals and addresses are placeholder copy.

## Design tokens (`assets/css/style.css`)
- Point red `#d01d29` (a shade darker than the logo red), background `#f3efea`, pale blue `#cdd8e0`
- Type: Inter Tight (headlines), Jost 200 (wordmark), Mrs Saint Delafield (script accents)
- Contact form & newsletter are front-end only — connect to Formspree / Netlify Forms etc.
