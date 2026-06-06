# Maryna Zagorodnia — website

A fast, static personal website for a psychology practice and psychedelic
integration services. Pure HTML + CSS + a little jQuery — **no build step**.

```
index.html        ← all the content (edit text here)
css/style.css     ← colours, fonts, layout
js/main.js        ← language toggle, navigation, form, video
assets/           ← images (replace the placeholder .svg files)
```

## View it locally

Just open `index.html` in a browser. (Some browsers restrict local files;
if anything misbehaves, run a tiny server instead:)

```bash
cd /mnt/c/Dev/Maryna
python3 -m http.server 8000
# then open http://localhost:8000
```

## Editing content

- **Text** lives in `index.html`. Every piece of text appears twice:
  - `<span class="lang-en">English…</span>`
  - `<span class="lang-uk">Українською…</span>`

  Edit both. The site shows the right one based on the selected flag.
  *(Replace the placeholder Ukrainian — it’s a first draft for review.)*

- **Layout blocks** you can stack freely inside any `.wrap`:
  - Two columns (text + image): copy a `<div class="row two-col">…</div>`
  - One column of text: copy a `<div class="row one-col">…</div>`

- **Images:** replace `assets/maryna.svg` and `assets/park.svg` with your own
  (a `.jpg` is fine — update the `src` in `index.html`). Keep them reasonably
  sized (~1500px wide max) so the page stays fast.

- **Ukrainian-only service (“Кола інтеграції” / Integration Circles):** it’s the
  `<article id="service-circles" … class="… lang-uk">` block and its sub-nav
  link. Because they’re marked `lang-uk`, they only appear in Ukrainian.

## The contact form (sends to your email)

The form uses **[Formspree](https://formspree.io)** — free, and works on plain
static hosting (no server needed).

1. Sign up at formspree.io with the email where you want to *receive* messages.
2. Create a new form; copy its endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
3. In `index.html`, find `action="https://formspree.io/f/YOUR_FORM_ID"` and
   replace `YOUR_FORM_ID` with your id (`abcdwxyz`).

That’s it — submissions arrive in your inbox, and the visitor sees a thank-you
message without leaving the page.

## Blog videos

Each video is a `<div class="yt" data-id="VIDEO_ID_1">`. Replace `VIDEO_ID_1`
with the YouTube id — the part after `v=` in a URL
(`https://youtube.com/watch?v=`**`dQw4w9WgXcQ`**). The video only loads when a
visitor clicks it, so the page stays fast.

## Publishing (very simple hosting)

Any of these host static files for free — drag-and-drop or connect a folder:

- **Netlify** (drag the whole folder onto app.netlify.com) — easiest.
- **Cloudflare Pages** or **GitHub Pages** — connect a repo, done.

A custom domain (e.g. `marynazagorodnia.com`) can be pointed at any of them.
