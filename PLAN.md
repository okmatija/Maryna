# Traffic & Visibility Plan

Why inquiries likely dropped after leaving Squarespace: the site became a single
URL (Google can only rank one page for everything), the Ukrainian side — and with
it the blog — is switched off, and there is no analytics so we can't see any of it.

## 1. Measure first (this week — everything else is guesswork without it)

- Add analytics (Plausible, GoatCounter, or GA4) so we can tell whether the
  problem is traffic (nobody arrives) or conversion (visitors don't write).
- Verify the site in Google Search Console + Bing Webmaster Tools, submit the
  sitemap, and see which queries get impressions vs. clicks.
- Find out the old Squarespace URL/domain. If it differed, its Google equity and
  backlinks are lost unless redirects point here — check and fix.
- Check the old Squarespace site isn't still live somewhere competing with us.

## 2. Site structure — the biggest in-repo fix

- Split the single-page app into real pages: `/psychedelic-integration/`,
  `/individual-therapy/`, `/walk-and-talk-therapy/`, `/about/`, `/contact/`.
- Each page gets its own `<title>`, meta description, H1, and schema — this is
  exactly what Squarespace provided and what the current site took away.
- List every page in `sitemap.xml`; link pages with real `<a href>` HTML links.
- Keep old `#service-...` hash links working via small JS redirects.

## 3. On-page SEO quick wins

- Add a keyword H1 — currently the only H1 on the entire site is "Contact".
  E.g. "Psychedelic Integration Therapist in London".
- Fix hreflang: tags advertise a Ukrainian version that doesn't render
  (`uk: false` in config) — remove them or make them true.
- Compress `assets/maryna.png` (1.2 MB → ~150 KB WebP) for page speed.
- Add FAQPage and ProfessionalService structured data next to the Person schema.

## 4. Content — how therapy sites actually get found

- Translate the two Ukrainian blog posts into English and publish each at its
  own URL.
- Write posts for searches real clients type: "how to integrate an ayahuasca
  experience", "anxiety after a psychedelic trip", "ketamine integration".
- Add an English page around the UPRA lecture video with a written summary —
  video plus transcript ranks well.
- Aim for one short post a month: each is a new rankable URL.

## 5. Ukrainian audience — decide deliberately

- Ukrainian is currently OFF, killing the blog and the Integration Circles
  offer. If Squarespace-era inquiries included Ukrainians, re-enable it.
- If re-enabled, give Ukrainian its own URLs (e.g. `/ua/...`) so it can rank in
  Ukrainian-language search rather than hiding behind a JS toggle.

## 6. Conversion — turn visitors into emails

- Add a direct booking link (Calendly / Cal.com) for the free 15-minute intro
  call — far lower friction than composing a message in a form.
- Put the "free intro call" button in the header or top of every page, visible
  without scrolling on mobile.
- Add trust signals near the button: UKCP registration, photo, response time.
- Offer a WhatsApp contact option — many clients prefer it to email.

## 7. Directories & backlinks — fastest external wins

- Create a Psychology Today UK profile (~£25/mo) — it is the top referral
  source for most UK therapists and ranks above personal sites.
- Add profiles on Counselling Directory and Welldoing.org.
- Ensure her UKCP "Find a Therapist" register entry links to
  safeintegration.space.
- Psychedelic-specific directories: Psychedelic Support, Third Wave providers,
  MAPS integration list, ICEERS network.
- Compassionate Inquiry practitioner directory (via the Gabor Maté training).
- Ask Inwardbound to list and link her as their integration therapist —
  a high-relevance backlink plus direct referrals.
- Ask UPRA to host/link her lecture and profile on their site.

## 8. Local presence

- Create a Google Business Profile (Psychotherapist, London / Hampstead service
  area) — key for "therapist near me" and Maps, ideal for Breath. Walk. Talk.
- Add Bing Places (10 minutes, free).
- Note: soliciting client reviews/testimonials breaches therapy ethics
  guidance (UKCP) — rely on credentials and directories for trust instead.

## 9. Paid advertising — test small, after pages exist

- Google Ads on high-intent terms ("psychedelic integration therapist",
  "therapist Hampstead") at £5–10/day; land each ad on its matching page.
- Wording caution: ads mentioning substances get disapproved under drug
  policies — copy must say "integration therapy", never name substances.
- Meta/Instagram ads convert poorly for therapy search; use only to promote
  free content or retarget, if at all.
- A featured/boosted Psychology Today listing often beats raw ads on
  cost-per-inquiry — compare before scaling ad spend.

## 10. Community & referral network

- Post occasionally on LinkedIn/Instagram with the site link — peer therapists
  are a real referral source, especially for a niche like integration.
- Offer free talks/webinars: UK psychedelic societies, breathwork and yoga
  studios, Ukrainian community groups in London.
- Pitch podcast guest spots on psychedelic/integration shows — each is a
  backlink plus a warm audience.
- Contribute helpfully (not promotionally) in communities like
  r/PsychedelicTherapy; many allow verified professionals.
- Build cross-referral relationships with retreat centres beyond Inwardbound
  and with London ketamine clinics.

## Suggested order

1. Analytics + Search Console + old-domain check (week 1, ~2 hours).
2. Directory profiles: Psychology Today, Counselling Directory, UKCP link,
   Psychedelic Support (week 1 — fastest route to new inquiries).
3. Multi-page restructure + on-page fixes (in this repo).
4. Booking link + CTA improvements.
5. English blog content; decide on re-enabling Ukrainian.
6. Google Business Profile, then a small ads test once landing pages exist.
