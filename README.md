# Maryna Zagorodnia — website

A fast, static personal website for a psychology practice and psychedelic
integration services. Pure HTML + CSS + a little jQuery — **no build step**.

Hosted on GitHub Pages at **[safeintegration.space](https://safeintegration.space)**.

```
index.html                    ← Home page
about/index.html              ← About page
individual-therapy/           ← service page
walk-and-talk-therapy/        ← service page (Breath. Walk. Talk.)
psychedelic-integration/      ← service page
integration-circles/          ← Ukrainian-only service page
contact/index.html            ← Contact page (web3forms)
blog/index.html               ← Ukrainian-only blog (video + articles)
css/style.css                 ← colours, fonts, layout
js/config.js                  ← on/off switches for languages/pages
js/main.js                    ← language toggle, form, video, legacy links
assets/                       ← images (maryna.webp/jpg portrait, leaf.png favicon)
CNAME                         ← custom domain for GitHub Pages
robots.txt                    ← search engine crawling rules
sitemap.xml                   ← sitemap for Google Search Console
```

Each page is a real URL with its own `<title>`, meta description and H1, so
search engines can rank every service separately. Old one-page links like
`safeintegration.space/#service-integration` still work — `js/main.js`
redirects them to the right page.

## View it locally

Pages use absolute paths (`/css/...`), so run a tiny server from the repo
root (opening the file directly won't find the styles):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Editing content

- **Text** lives in each page's `index.html`. Every piece of text appears twice:
  - `<span class="lang-en">English…</span>`
  - `<span class="lang-uk">Українською…</span>`

  Edit both. The site shows the right one based on the selected flag.

- **The header and footer are duplicated in every page** (that's the price of
  having no build step). If you change the nav, flags, or footer, copy the
  change to all eight `index.html` files.

- **Images:** the portrait is served as `assets/maryna.webp` (with
  `assets/maryna.jpg` fallback); `assets/maryna.png` is the full-quality
  original. To replace it, overwrite the png and regenerate:
  `convert maryna.png -strip -quality 85 maryna.jpg` and
  `convert maryna.png -strip -quality 80 maryna.webp`.

- **Ukrainian-only pages** (`/blog/`, `/integration-circles/`): their body tag
  carries `class="lang-uk … uk-page"` — they always display Ukrainian, and the
  flag switcher sends English visitors back to the home page.

## Analytics

Every page loads a [GoatCounter](https://www.goatcounter.com) snippet
(privacy-friendly, free, no cookie banner needed). For it to start counting,
register the code **safeintegration** at goatcounter.com — the dashboard will
then live at `https://safeintegration.goatcounter.com`. Until the account
exists the snippet does nothing (it fails silently).

## The contact form

The form uses **[web3forms](https://web3forms.com)** — free, works on plain
static hosting (no server needed). Submissions arrive in Maryna's inbox and
the visitor sees a thank-you message without leaving the page.

The `access_key` in `contact/index.html` is already configured. To change the
destination email, update the key at web3forms.com.

## Blog videos

Each video is a `<div class="yt" data-id="VIDEO_ID">`. Replace `VIDEO_ID`
with the YouTube id — the part after `v=` in a URL
(`https://youtube.com/watch?v=`**`dQw4w9WgXcQ`**). The video only loads when a
visitor clicks it, so the page stays fast.

## Publishing

The site is deployed via **GitHub Pages** from the `main` branch. Pushing to
`main` automatically updates the live site within a minute or two.

The custom domain `safeintegration.space` is configured via the `CNAME` file
and DNS records at the domain registrar.
