# Paige 18 Productions — Website (Concept 01 · Light)

Static site for Paige 18 Productions, a boutique film, web series, live theatre and children's book company in Vancouver, B.C.
No build step — open `index.html` or serve the folder (`python3 -m http.server`).

## Pages
- `index.html` — Logo chooser · Hero reel · About · Works (filter) · Recognition · Founder · Contact · Footer
- `about.html` — company detail page ("Learn more")
- `work.html?id=<slug>` — project detail page, rendered from `assets/js/data.js`

## Replacing placeholders
- **Hero video**: `assets/video/hero-reel.mp4` plays muted and looped (poster `assets/img/reel.jpg`). The Watch Trailer button links to YouTube; a YouTube background is still supported via `<div class="hero__yt" data-youtube="VIDEO_ID"></div>`.
- **Works**: edit `assets/js/data.js` — set `poster` (2:3 image), `preview` (short hover clip) and `trailer` per project.
- **Contact image**: replace `assets/img/contact.jpg`.
- **Logo concepts**: the entry screen on `index.html` lets you pick Logo A (sketch poppy) or Logo B (red poppy); the A/B toggle in the header switches at any time and the choice is remembered. Files live in `assets/img/logo/concepts/` (full lockup, mark only, white versions, favicons).
- **Project images**: put each project's image at `assets/img/works/<id>.jpg` (`songbird`, `the-mirror`, `morrow`, `footprints`) and Rhonda's portrait at `assets/img/rhonda-dent.jpg`.
- Company, project and founder copy comes from paige18productions.ca (Home and About). The contact email is a placeholder.

## Design tokens (`assets/css/style.css`)
- Point red `#d01d29` (a shade darker than the logo red), background `#f3efea`, pale blue `#cdd8e0`
- Type: Inter Tight (headlines and body)
- Contact form & newsletter are front-end only — connect to Formspree / Netlify Forms etc.
