/* ============================================================
   Maryna Zagorodnia — site behaviour (jQuery)
   - multi-page site: one URL per page, shared header
   - legacy #hash links from the old one-page site redirect
   - language toggle (remembered)
   - config-driven on/off switches (js/config.js)
   - gentle reveal-on-scroll
   - click-to-load YouTube
   - web3forms contact form
   ============================================================ */
$(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var forcedLang = null; // set by applyConfig() when only one language is enabled
  var ukOnlyPage = $("body").hasClass("uk-page"); // blog & integration circles

  /* ---------- legacy hash links (old one-page site) ---------- */
  // Old links like safeintegration.space/#service-integration must keep
  // working — send them to the page that now holds that content.
  var LEGACY = {
    "about":               "/about/",
    "services":            "/individual-therapy/",
    "contact":             "/contact/",
    "blog":                "/blog/",
    "service-therapy":     "/individual-therapy/",
    "service-walk":        "/walk-and-talk-therapy/",
    "service-integration": "/psychedelic-integration/",
    "service-circles":     "/integration-circles/",
    "blog-video":          "/blog/#blog-video",
    "blog-post-1":         "/blog/#blog-post-1",
    "blog-post-2":         "/blog/#blog-post-2"
  };
  var path = location.pathname.replace(/index\.html$/, "");
  if (path === "/" && location.hash) {
    var legacyTarget = LEGACY[location.hash.replace("#", "")];
    if (legacyTarget) {
      location.replace(legacyTarget);
      return;
    }
  }

  /* ---------- small helpers ---------- */
  function currentLang() {
    return $("body").hasClass("lang-uk") ? "uk" : "en";
  }
  function t(en, uk) {
    return currentLang() === "uk" ? uk : en;
  }
  function updateHeaderHeight() {
    var h = $(".site-header").outerHeight();
    document.documentElement.style.setProperty("--header-h", h + "px");
  }

  /* ---------- reveal on scroll ---------- */
  function revealInView() {
    var trigger = window.innerHeight - 60;
    $(".section.is-active .reveal").not(".in").each(function () {
      if (this.getBoundingClientRect().top < trigger) {
        $(this).addClass("in");
      }
    });
  }

  /* ---------- language ---------- */
  function setLang(lang) {
    if (lang !== "uk") lang = "en";
    try { localStorage.setItem("lang", lang); } catch (e) {}
    // Ukrainian-only pages have no English content — go home instead.
    if (ukOnlyPage && lang === "en") {
      location.href = "/";
      return;
    }
    $("body").removeClass("lang-en lang-uk").addClass("lang-" + lang);
    document.documentElement.lang = lang;
    updateHeaderHeight();
    revealInView();
  }

  /* ---------- config-driven on/off switches (js/config.js) ---------- */
  function eachFalse(map, fn) {
    if (!map) return;
    Object.keys(map).forEach(function (k) {
      if (map[k] === false) fn(k);
    });
  }

  // Preview override: add ?phoebe to any URL (e.g. safeintegration.space/?phoebe)
  // to show the WHOLE site, ignoring every on/off switch in js/config.js — handy
  // for previewing content that is currently disabled.
  function showEverything() {
    return /phoebe/i.test(location.search);
  }

  // Which page a service id now lives on (for hiding sub-nav links).
  var SERVICE_PAGE = {
    "service-therapy":     "/individual-therapy/",
    "service-walk":        "/walk-and-talk-therapy/",
    "service-integration": "/psychedelic-integration/",
    "service-circles":     "/integration-circles/"
  };

  function applyConfig() {
    if (showEverything()) return; // skip all removal — nothing gets hidden
    var cfg = window.SITE_CONFIG || {};

    // Languages — remove a disabled language's content entirely.
    // (Ukrainian-only pages keep their content: they are only reachable
    // by direct link while their language is switched off.)
    var langs = cfg.languages || {};
    var enOn = langs.en !== false;
    var ukOn = langs.uk !== false;
    if (!enOn && !ukOn) enOn = true; // never hide everything

    if (!ukOnlyPage) {
      // (exclude <body>, whose lang-* class is the active-language state, not content)
      if (!ukOn) $(".lang-uk").not("body").remove();
      if (!enOn) $(".lang-en").not("body").remove();
      if (!enOn || !ukOn) {
        $(".lang-toggle").remove();      // only one language: drop the switcher
        forcedLang = ukOn ? "uk" : "en"; // and lock to it
      }
    }

    // Sections — every section is its own page now; hide its nav link.
    eachFalse(cfg.sections, function (id) {
      $('.main-nav a[data-view="' + id + '"]').remove();
    });

    // Individual services — hide their sub-nav links.
    eachFalse(cfg.services, function (id) {
      $('.sub-nav a[href="' + SERVICE_PAGE[id] + '"]').remove();
    });

    // Individual blog posts — remove the article and its sub-nav link.
    eachFalse(cfg.blogPosts, function (id) {
      $("#" + id).remove();
      $('.blog-link[href="#' + id + '"]').remove();
    });
  }

  /* ============================================================
     WIRING
     ============================================================ */

  // Apply the on/off switches first, so everything below sees the trimmed page.
  applyConfig();

  // Footer year
  $("#year").text(new Date().getFullYear());

  // Restore saved language (or lock to the one the config forces).
  // Ukrainian-only pages always show Ukrainian, whatever was saved.
  if (ukOnlyPage) {
    $("body").removeClass("lang-en").addClass("lang-uk");
    document.documentElement.lang = "uk";
  } else if (forcedLang) {
    setLang(forcedLang);
  } else {
    var saved;
    try { saved = localStorage.getItem("lang"); } catch (e) {}
    setLang(saved || "en");
  }

  // Flag clicks
  $(".flag").on("click", function () {
    setLang($(this).data("lang"));
  });

  // Highlight the current page in the main nav (body carries view-<name>)
  var view = (($("body").attr("class") || "").match(/view-([a-z]+)/) || [])[1];
  if (view) $('.main-nav a[data-view="' + view + '"]').addClass("active");

  // Highlight the current page in the services sub-nav
  $(".sub-nav a").each(function () {
    if ($(this).attr("href") === path) $(this).addClass("active");
  });

  // Blog sub-nav: show the chosen post, hide the rest
  function showBlogItem(id) {
    $(".blog-item").hide();
    $("#" + id).show();
    $(".blog-link").removeClass("active");
    $('.blog-link[href="#' + id + '"]').addClass("active");
    window.scrollTo(0, 0);
  }

  $(".blog-link").on("click", function (e) {
    e.preventDefault();
    showBlogItem($(this).attr("href").replace("#", ""));
  });

  // On the blog page, open the post from the URL hash (or the first one)
  if ($("body").hasClass("view-blog")) {
    var post = (location.hash || "").replace("#", "");
    if (!post || !$("#" + post).length) {
      post = ($(".blog-link").first().attr("href") || "").replace("#", "");
    }
    if (post) showBlogItem(post);
  }

  // Throttled scroll handler
  var ticking = false;
  $(window).on("scroll", function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      revealInView();
      ticking = false;
    });
  });
  $(window).on("resize", updateHeaderHeight);

  /* ---------- Details smooth slide ---------- */
  $(".service-details summary").on("click", function (e) {
    e.preventDefault();
    var $details = $(this).closest("details");
    var $body = $details.find(".details-body");
    if ($details.prop("open")) {
      $body.slideUp(280, function () { $details.prop("open", false); });
    } else {
      $details.prop("open", true);
      $body.hide().slideDown(280);
    }
  });

  /* ---------- YouTube facade ---------- */
  $(".yt").each(function () {
    var id = $(this).data("id");
    if (id && String(id).indexOf("VIDEO_ID") === -1) {
      this.style.backgroundImage =
        "url('https://i.ytimg.com/vi/" + id + "/hqdefault.jpg')";
    }
  });
  $(".yt").on("click keydown", function (e) {
    if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    var id = $(this).data("id");
    if (!id || String(id).indexOf("VIDEO_ID") !== -1) {
      alert(t("Add a YouTube video id in the page (data-id).",
              "Додайте ідентифікатор відео YouTube на сторінці (data-id)."));
      return;
    }
    var $iframe = $("<iframe>", {
      src: "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0",
      title: "YouTube video",
      allow: "autoplay; encrypted-media; picture-in-picture; fullscreen",
      allowfullscreen: true
    });
    $(this).empty().append($iframe);
  });

  /* ---------- Contact form (web3forms) ---------- */
  $("#contact-form").on("submit", function (e) {
    e.preventDefault();
    var $f = $(this);
    var $btn = $f.find("button[type=submit]");
    var $status = $f.find(".form-status");

    $status.attr("class", "form-status").text(t("Sending…", "Надсилання…"));
    $btn.prop("disabled", true);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: new FormData($f[0])
    })
      .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
      .then(function (result) {
        if (result.ok) {
          $f[0].reset();
          $status.attr("class", "form-status ok").text(
            t("Thank you — your message has been sent.",
              "Дякую — ваше повідомлення надіслано.")
          );
        } else {
          $status.attr("class", "form-status err").text(
            t("Something went wrong. Please email me directly.",
              "Сталася помилка. Будь ласка, напишіть мені напряму.")
          );
        }
      })
      .catch(function () {
        $status.attr("class", "form-status err").text(
          t("Something went wrong. Please email me directly.",
            "Сталася помилка. Будь ласка, напишіть мені напряму.")
        );
      })
      .finally(function () {
        $btn.prop("disabled", false);
      });
  });

  /* ---------- initial paint ---------- */
  updateHeaderHeight();
  revealInView();
});
