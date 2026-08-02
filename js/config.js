/* =====================================================================
   SITE CONFIG  —  the on/off switches for the website
   ---------------------------------------------------------------------
   Flip any value to false to hide that part of the site, then reload
   the page. No build step, no other files to touch.

   • languages  — turn a language off to remove ALL of its content.
                  If only one language is left, the flag switcher is
                  hidden and the site is locked to that language.
                  (The Ukrainian-only pages /blog/ and /integration-circles/
                  keep their content but become unlinked.)
   • sections   — the items in the top navigation. Each section is its
                  own page now; switching one off hides its nav link
                  (the page stays reachable by direct URL).
   • services   — the individual services (Services sub-nav links).
   • blogPosts  — the individual blog articles (Blog sub-nav).

   Keys match the ids used in the pages, so nothing else needs to
   change when you toggle something.
   ===================================================================== */
window.SITE_CONFIG = {

  languages: {
    en: true,
    uk: false,
  },

  sections: {
    home:     true,
    about:    true,
    services: true,
    contact:  true,
    blog:     true,
  },

  services: {
    "service-therapy":     true,
    "service-walk":        true,
    "service-integration": true,
    "service-circles":     true,
  },

  blogPosts: {
    "blog-video":  true,
    "blog-post-1": true,
    "blog-post-2": true,
  },

};
