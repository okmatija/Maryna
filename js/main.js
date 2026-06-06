/* ============================================================
   Maryna Zagorodnia — site behaviour (jQuery)
   - in-page view switching (no reloads)
   - language toggle (remembered)
   - services sub-nav
   - gentle reveal-on-scroll
   - click-to-load YouTube
   - web3forms contact form
   ============================================================ */
$(function () {
  "use strict";

  var SECTIONS = ["home", "about", "services", "contact", "blog"];
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  /* ---------- view switching ---------- */
  function showSection(name, opts) {
    opts = opts || {};
    if (SECTIONS.indexOf(name) === -1) name = "home";

    $(".section").removeClass("is-active");
    $("#" + name).addClass("is-active");

    $("body")
      .removeClass("view-home view-about view-services view-contact view-blog")
      .addClass("view-" + name);

    $(".main-nav a").removeClass("active");
    $('.main-nav a[data-section="' + name + '"]').addClass("active");

    if (!opts.keepHash) {
      if (history.replaceState) history.replaceState(null, "", "#" + name);
      else location.hash = name;
    }
    if (!opts.noScroll) window.scrollTo(0, 0);

    updateHeaderHeight();
    revealInView();
  }

  /* ---------- smooth scroll to an element (honours header) ---------- */
  function scrollToEl(selector) {
    var $el = $(selector);
    if (!$el.length) return;
    var headerH = $(".site-header").outerHeight();
    var top = $el.offset().top - headerH - 14;
    if (reduceMotion) {
      window.scrollTo(0, top);
    } else {
      $("html, body").animate({ scrollTop: top }, 450);
    }
  }

  /* ---------- language ---------- */
  function setLang(lang) {
    if (lang !== "uk") lang = "en";
    $("body").removeClass("lang-en lang-uk").addClass("lang-" + lang);
    document.documentElement.lang = lang;
    try { localStorage.setItem("lang", lang); } catch (e) {}
    // Blog is Ukrainian-only; redirect to home if switching away
    if (lang === "en" && $("body").hasClass("view-blog")) showSection("home");
    updateHeaderHeight();
    revealInView();
  }

  /* ============================================================
     WIRING
     ============================================================ */

  // Footer year
  $("#year").text(new Date().getFullYear());

  // Restore saved language
  var saved;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  setLang(saved || "en");

  // Flag clicks
  $(".flag").on("click", function () {
    setLang($(this).data("lang"));
  });

  // Main nav + any link that carries data-section (e.g. "Get in touch")
  $(document).on("click", "[data-section]", function (e) {
    e.preventDefault();
    showSection($(this).data("section"));
  });

  // Services sub-nav: show the chosen service, hide the rest
  function showService(id) {
    $(".service").hide();
    $("#" + id).show();
    $(".sub-link").removeClass("active");
    $('.sub-link[href="#' + id + '"]').addClass("active");
    window.scrollTo(0, 0);
  }

  $(".sub-link").on("click", function (e) {
    e.preventDefault();
    var id = $(this).attr("href").replace("#", "");
    showService(id);
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

  // When entering a section, show the first item in sub-navs
  var _origShowSection = showSection;
  showSection = function (name, opts) {
    _origShowSection(name, opts);
    if (name === "services") {
      var firstService = $(".sub-link:visible").first().attr("href").replace("#", "");
      showService(firstService);
    }
    if (name === "blog") {
      showBlogItem($(".blog-link").first().attr("href").replace("#", ""));
    }
  };

  function syncSubNav() {}

  // Throttled scroll handler
  var ticking = false;
  $(window).on("scroll", function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      revealInView();
      syncSubNav();
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
      alert(t("Add a YouTube video id in index.html (data-id).",
              "Додайте ідентифікатор відео YouTube у index.html (data-id)."));
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

  /* ---------- initial route ---------- */
  var hash = (location.hash || "").replace("#", "");
  if (hash.indexOf("service-") === 0) {
    // deep link to a specific service
    showSection("services", { keepHash: true, noScroll: true });
    setTimeout(function () { scrollToEl("#" + hash); }, 60);
  } else {
    showSection(SECTIONS.indexOf(hash) !== -1 ? hash : "home", { keepHash: true });
  }

  updateHeaderHeight();
  revealInView();
});
