/* ============================================================
   Maryna Zagorodnia — site behaviour (jQuery)
   - in-page view switching (no reloads)
   - language toggle (remembered)
   - services sub-nav smooth scroll
   - gentle reveal-on-scroll
   - click-to-load YouTube
   - Formspree contact form
   ============================================================ */
$(function () {
  "use strict";

  var SECTIONS = ["about", "services", "contact", "blog"];
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
    if (SECTIONS.indexOf(name) === -1) name = "about";

    $(".section").removeClass("is-active");
    $("#" + name).addClass("is-active");

    $("body")
      .removeClass("view-about view-services view-contact view-blog")
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

  // Services sub-nav: scroll to the chosen service
  $(".sub-link").on("click", function (e) {
    e.preventDefault();
    scrollToEl($(this).attr("href"));
  });

  // Scroll-spy: highlight the sub-nav link for the service in view
  function syncSubNav() {
    if (!$("body").hasClass("view-services")) return;
    var headerH = $(".site-header").outerHeight() + 40;
    var activeId = null;
    $(".service:visible").each(function () {
      if (this.getBoundingClientRect().top <= headerH) activeId = this.id;
    });
    $(".sub-link").removeClass("active");
    if (activeId) $('.sub-link[href="#' + activeId + '"]').addClass("active");
  }

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

  /* ---------- Contact form (Formspree) ---------- */
  $("#contact-form").on("submit", function (e) {
    e.preventDefault();
    var $f = $(this);
    var $status = $f.find(".form-status");
    var action = $f.attr("action");

    if (action.indexOf("YOUR_FORM_ID") !== -1) {
      $status.attr("class", "form-status err").text(
        t("This form isn’t connected yet. Add your Formspree ID in index.html (see README).",
          "Форму ще не підключено. Додайте свій Formspree ID у index.html (див. README).")
      );
      return;
    }

    $status.attr("class", "form-status").text(t("Sending…", "Надсилання…"));

    $.ajax({
      url: action,
      method: "POST",
      data: $f.serialize(),
      dataType: "json",
      headers: { Accept: "application/json" }
    })
      .done(function () {
        $f[0].reset();
        $status.attr("class", "form-status ok").text(
          t("Thank you — your message has been sent.",
            "Дякую — ваше повідомлення надіслано.")
        );
      })
      .fail(function () {
        $status.attr("class", "form-status err").text(
          t("Something went wrong. Please email me directly.",
            "Сталася помилка. Будь ласка, напишіть мені напряму.")
        );
      });
  });

  /* ---------- initial route ---------- */
  var hash = (location.hash || "").replace("#", "");
  if (hash.indexOf("service-") === 0) {
    // deep link to a specific service
    showSection("services", { keepHash: true, noScroll: true });
    setTimeout(function () { scrollToEl("#" + hash); }, 60);
  } else {
    showSection(SECTIONS.indexOf(hash) !== -1 ? hash : "about", { keepHash: true });
  }

  updateHeaderHeight();
  revealInView();
});
