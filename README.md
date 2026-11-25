# Donna Norkai Omaboe: Portfolio

**Ethereal Afro-Contemporary Luxury.** The digital portfolio of fashion designer Donna Norkai Omaboe, founder of Norkai.

Built with Next.js (App Router), Tailwind CSS, Motion (Framer Motion) and Lenis smooth scrolling.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Deploy by importing the repo into Vercel. No configuration is needed.

## Structure

| Path | What it is |
| --- | --- |
| `src/content/site.ts` | **All text and images.** Edit this file to change content. |
| `src/components/sections/` | Home page sections: Hero, Marquee, About, Works, Process, Heritage, Contact |
| `src/components/ProjectView.tsx` | Full project presentation (`/work/<slug>`) |
| `src/components/Plate.tsx` | Image wrapper that grades, washes and feathers every image so they blend in |
| `src/components/Motifs.tsx` | Subtle SVG motifs: dotted orbits, strip-weave, resist-dye dashes, arches |
| `public/images/temp/` | Temporary editorial photographs (Unsplash) |

## Content sources

The text comes from Donna's Canva portfolio, *Fashion Designer Portfolio Presentation*:

- the About statement
- the Norkai brand profile (Haute Couture · Luxury · Womenswear · Contemporary; "sophisticated, organic"; in the spirit of Iris van Herpen)
- descriptions of each illustrated look
- the capstone research, *AI-Assisted Dress Reconstruction*

## Replacing images (important)

Every photograph currently on the site is a **temporary placeholder** from Unsplash, chosen for mood only. Each one is marked `temp: true` in `site.ts`, and the site shows a small "Temporary image · not my design" caption on it. The Canva API would not allow full-resolution export of the original illustrations, so they need to be downloaded by hand:

1. In Canva, open the design, select the illustration and use **Share → Download → PNG** (or download the whole page).
2. Save it to `public/images/work/<slug>/`, e.g. `public/images/work/capiz/cover.png`.
3. In `src/content/site.ts`, change that image's `src` and delete `temp: true`, e.g.
   `cover: { src: "/images/work/capiz/cover.png", alt: "Capiz swim set illustration, blue colourway" }`
4. To show croquis, flats or technical drawings, add a `sketches: [...]` array to a project. A **Sketchbook** section then appears on that project page.

Suggested swaps, from the *Fashion Designer Portfolio Presentation* deck:

| Project | Use |
| --- | --- |
| `capiz` | Capiz shell swim boards: blue / butter / blush colourways with fabric swatches |
| `ivory-twist` | Ivory cut-out gown, front & back |
| `gilded-waist` | Scarlet and onyx gowns with gold waist piece |
| `champagne-drape` | Champagne draped gown with flacon study |
| `blush-corsetry` | Blush corset gown board ("How it's going") |
| `atlantic-denim` | Denim corset look, flats, detail callouts & indigo palette |
| `botanical-couture` | Floral halter gown with ruffle cascade, front & back |
| `pattern-intelligence` | Slides / diagrams from the research presentation |
| Hero | A strong full-length illustration or editorial photo, ideally on a soft background |
| About portrait | A portrait of Donna |

If an image has a strong background colour, set the project's `tone` to a matching soft hex so the halo and washes blend with it.

## Still to add

- Instagram: set `site.instagram` and `site.instagramHandle` in `site.ts`. Until then the link reads "Coming soon".
- Years and categories are set to 2026 as a best guess. Adjust them per project.
- Set `site.url` to the real domain once one is chosen. It is used for SEO and the sitemap.

## Accessibility & performance

- Reduced-motion users get static layouts. Smooth scrolling, the cursor, the grain animation and the horizontal pin are all disabled for them.
- The custom cursor only appears on fine-pointer devices.
- Skip link, semantic landmarks, labelled navigation, keyboard-closable mobile menu and visible focus states.
- Images are served through `next/image` as responsive WebP. Project pages are statically generated, with metadata, Open Graph tags, JSON-LD, a sitemap and robots.txt.
