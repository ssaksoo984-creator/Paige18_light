# Paige 18 Productions — Website (Concept 01 · Light)

Live preview: https://ssaksoo984-creator.github.io/Paige18_light/

Static site for Paige 18 Productions, a boutique film, web series, live theatre and children's book company in Vancouver, B.C.
No build step — open `index.html` or serve the folder (`python3 -m http.server`).

## Pages
- `index.html` — Hero reel · About · Works (filter) · Recognition · Founder · Contact · Footer
- `about.html` — company detail page ("Learn more")
- `work.html?id=<slug>` — project detail page, rendered from `assets/js/data.js`

## Replacing placeholders
- **Hero video**: `assets/video/songbird-reel.mp4` (SongBird clip, muted loop; poster `assets/img/songbird-reel-poster.jpg`). The Watch Reel button links to YouTube; a YouTube background is still supported via `<div class="hero__yt" data-youtube="VIDEO_ID"></div>`.
- **Works**: edit `assets/js/data.js` — set `poster` (2:3 image), `preview` (short hover clip) and `trailer` per project.
- **Contact image**: replace `assets/img/contact.jpg`.
- **Logo**: final Paige 18 logo set in `assets/img/logo/final/` — horizontal logo in the header (white over the hero on desktop, black on phones), white symbol + wordmark in the menu, red primary lockup in the footer, red favicon.
- **Project images**: posters live in `assets/img/works/<id>.jpg` (SongBird, The Mirror, Morrow from the official posters; Footprints still a placeholder), a wide still can be set as `still` in `data.js`, and Rhonda's portrait is `assets/img/rhonda-dent.jpg`.
- Company, project and founder copy comes from paige18productions.ca (Home and About); credits and awards from the official posters. The contact email is a placeholder.

## Design tokens (`assets/css/style.css`)
- Point red `#d01d29` (a shade darker than the logo red), background `#f3efea`, pale blue `#cdd8e0`
- Type: Inter Tight (headlines and body)
- Contact form & newsletter are front-end only — connect to Formspree / Netlify Forms etc.
