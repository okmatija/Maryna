# Maryna Zagorodnia — website

A fast, static personal website for a psychology practice and psychedelic
integration services. Pure HTML + CSS + a little jQuery — **no build step**.

Hosted on GitHub Pages at **[safeintegration.space](https://safeintegration.space)**.

```
index.html        ← all the content (edit text here)
css/style.css     ← colours, fonts, layout
js/main.js        ← language toggle, navigation, form, video
assets/           ← images (maryna.png portrait, leaf.png favicon)
CNAME             ← custom domain for GitHub Pages
robots.txt        ← search engine crawling rules
sitemap.xml       ← sitemap for Google Search Console
```

## View it locally

Just open `index.html` in a browser. (Some browsers restrict local files;
if anything misbehaves, run a tiny server instead:)

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Editing content

- **Text** lives in `index.html`. Every piece of text appears twice:
  - `<span class="lang-en">English…</span>`
  - `<span class="lang-uk">Українською…</span>`

  Edit both. The site shows the right one based on the selected flag.

- **Layout blocks** you can stack freely inside any `.wrap`:
  - Two columns (text + image): copy a `<div class="row two-col">…</div>`
  - One column of text: copy a `<div class="row one-col">…</div>`

- **Images:** replace `assets/maryna.png` with a new portrait if needed.
  Keep images reasonably sized (~1500px wide max) so the page stays fast.

- **Ukrainian-only service ("Кола інтеграції" / Integration Circles):** it's the
  `<article id="service-circles" … class="… lang-uk">` block and its sub-nav
  link. Because they're marked `lang-uk`, they only appear in Ukrainian.

- **Blog** is Ukrainian-only (`.blog-only` CSS class). The blog sub-nav has
  entries for the video lecture and two text articles. Add new articles by
  copying a `<article class="blog-item">` block and adding a matching link in
  the `.blog-sub-nav`.

## The contact form

The form uses **[web3forms](https://web3forms.com)** — free, works on plain
static hosting (no server needed). Submissions arrive in Maryna's inbox and
the visitor sees a thank-you message without leaving the page.

The `access_key` in `index.html` is already configured. To change the
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
