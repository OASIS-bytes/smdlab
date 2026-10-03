# SMD Lab

Marketing site for SMD Lab, a small creative technology studio working in web
and software development, video editing, and graphic design.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP · Lenis

---

## Requirements

- Node.js 20.9 or newer (Node 22 LTS recommended)
- npm 10 or newer

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server hot-reloads
as you edit.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (also type-checks the project) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint over the project |

### Configuration

There is no `.env` file and nothing to configure. All copy, project data and
navigation live in `content/*.json` and are read through `src/lib/content.ts`,
which is typed — adding a field to a JSON file without adding it to the matching
type in `content.ts` is a type error.

Brand colours, the type scale and spacing live in the `@theme` block at the top
of `src/app/globals.css`. **Flat colours only: no gradients and no glows
anywhere in the system.** Adding a gradient will break the brand.

### Fonts

Fraunces and DM Sans load through `next/font` in `src/lib/fonts.ts`, so they are
self-hosted, subset to Latin, preloaded, and use `display: swap`. Do not add a
`<link>` to Google Fonts or any other remote font host.

### Media

- Logo: `public/brand/smd-primary.svg`, rendered with `next/image`.
- Project imagery is currently a labelled flat placeholder (`Placeholder`). To
  use a real image, swap the placeholder's inner `<div>` for `<Image>` and keep
  its `className`, which already carries the aspect ratio and positioning.
- Showreel: drop `showreel.mp4` into `public/video/`. The slot detects the file
  and plays it; without the file it renders a flat placeholder. Under
  `prefers-reduced-motion` it never autoplays and shows native controls.

## Deploying to Vercel

The project deploys as-is, with no build settings to change.

### From the dashboard

1. Push the repository to GitHub, GitLab or Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Accept the detected settings — framework "Next.js", build command
   `npm run build`, output from `.next`. Click **Deploy**.

Vercel installs dependencies, runs the build, and serves the output.

### From the CLI

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

### After deploying

`content/site.json` holds the canonical URL in `brand.url` (currently
`https://smdlab.studio`). It feeds `metadataBase`, the Open Graph tags,
`sitemap.xml` and `robots.txt`, so update it if the domain changes.

---

## Project structure

```
content/            All copy and project data as JSON
public/brand/       Logo and showreel poster
src/app/            Routes, layout, metadata files
  layout.tsx        Root layout: fonts, metadata, skip link, motion providers
  sitemap.ts        Generated sitemap.xml
  robots.ts         Generated robots.txt
  icon.svg          Favicon, drawn from the SMD pad mark
  opengraph-image.tsx  Social card, built from flat brand colours
src/components/
  brand/            Logo
  home/             Home page sections
  motion/           Lenis provider, scroll reveals, magnetic hook, pad cursor
  site/             Header, nav, footer
  ui/               Buttons, placeholders, rules, section header
  work/             Case study
src/lib/            Content types and loaders, fonts, class helper
```

## Motion and accessibility notes

- `prefers-reduced-motion: reduce` disables Lenis, every GSAP reveal, the
  magnetic buttons, the pad cursor, and video autoplay. The from-state for each
  animation is applied by GSAP rather than in CSS, so with JavaScript off the
  page renders complete.
- The copper pad cursor only mounts on devices with a fine pointer, and it sits
  over the native cursor rather than replacing it.
- Focus rings are defined once in `globals.css` and meet WCAG AA on every band.
  Verify with a keyboard before shipping: tab through the header, the form and
  each card.
- The skip-to-content link is the first focusable element on every page.

## Known gaps

- Responsive behaviour has been reviewed in the stylesheets for 360, 768 and
  1440 but not in a real browser. Check those three widths, plus a keyboard
  pass, before launch.
- The contact form validates in the browser and does not yet send anything.
  `/privacy` says so explicitly; update that page when it is wired up.
- Placeholder testimonials, case-study result figures and the showreel slot are
  stand-ins awaiting real content.
