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
- **Logo**: official brand kit files in `assets/img/logo/brand/` (clean horizontal logo red/white in the header, textured primary white in the menu and red in the footer, white wordmark in the contact block, red icon as favicon). Use the supplied files only, never recolour or retype.
- **Project images**: posters live in `assets/img/works/<id>.jpg` (SongBird, The Mirror, Morrow from the official posters; Footprints still a placeholder), a wide still can be set as `still` in `data.js`, and Rhonda's portrait is `assets/img/rhonda-dent.jpg`.
- Company, project and founder copy comes from paige18productions.ca (Home and About); credits and awards from the official posters. The contact email is a placeholder.

## Design tokens (`assets/css/style.css`)
- Brand colours: Poppy Red `#C72629`, Ink `#111111`, Paper `#F7F5F1` (from the 2026 brand guide)
- Type: Montserrat (headlines, for Gotham Bold) · Nunito Sans (body, for Avenir Next)
- Contact form sends through FormSubmit (formsubmit.co) to the address in `data-to` on `#contact-form` in `index.html`. Empty means not connected. The first message sends an activation link to that inbox.
