/* ==========================================================================
   PAIGE 18 Production — interactions
   ========================================================================== */

(function () {
  "use strict";

  var works = window.PAIGE_WORKS || [];
  var TYPES = window.PAIGE_TYPES || {};

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Image block: real image when a path is given, tinted placeholder otherwise.
  function media(src, tone, label) {
    var inner = src ? '<img src="' + escapeHtml(src) + '" alt="" loading="lazy" onerror="this.remove()">' : '<span class="ph__mark">IMG</span>';
    return '<div class="ph ph--' + tone + '" data-label="' + escapeHtml(label) + '">' + inner + "</div>";
  }

  /* ---------- Header ---------- */

  var header = $(".site-header");
  if (header && !header.classList.contains("site-header--solid")) {
    var hero = $(".hero");
    var onScroll = function () {
      var limit = hero ? hero.offsetHeight - 80 : 40;
      header.classList.toggle("is-solid", window.scrollY > limit);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var menuBtn = $(".menu-btn");
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$(".nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Hero trailer (YouTube, muted loop) ---------- */

  var yt = $(".hero__yt");
  if (yt && yt.getAttribute("data-youtube")) {
    var vid = encodeURIComponent(yt.getAttribute("data-youtube"));
    var iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube-nocookie.com/embed/" + vid +
      "?autoplay=1&mute=1&loop=1&playlist=" + vid +
      "&controls=0&disablekb=1&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&enablejsapi=1" +
      "&origin=" + encodeURIComponent(location.origin);
    iframe.title = "Featured trailer";
    iframe.allow = "autoplay; encrypted-media; picture-in-picture";
    iframe.tabIndex = -1;
    // Reveal only once YouTube reports the video is playing, so a blocked or
    // failed embed never covers the still image underneath.
    iframe.addEventListener("load", function () {
      try { iframe.contentWindow.postMessage('{"event":"listening","id":"hero","channel":"widget"}', "*"); } catch (e) {}
    });
    window.addEventListener("message", function (e) {
      if (!/^https:\/\/(www\.)?youtube(-nocookie)?\.com$/.test(e.origin)) return;
      var data;
      try { data = typeof e.data === "string" ? JSON.parse(e.data) : e.data; } catch (err) { return; }
      var state = data && (data.info && data.info.playerState !== undefined ? data.info.playerState : data.event === "onStateChange" ? data.info : undefined);
      if (state === 1) yt.classList.add("is-ready");
    });
    yt.appendChild(iframe);
  }

  /* ---------- Works grid (home) ---------- */

  var grid = $("#works-grid");
  if (grid) {
    grid.innerHTML = works.map(function (w, i) {
      var hoverMedia = w.preview
        ? '<video src="' + escapeHtml(w.preview) + '" muted loop playsinline preload="none"></video>'
        : "";
      return (
        '<article class="work" data-type="' + w.type + '" style="animation-delay:' + (i % 4) * 60 + 'ms">' +
          '<div class="work__poster">' + media(w.poster, w.tone, "Poster · 2:3") + "</div>" +
          '<div class="work__hover" aria-hidden="true">' +
            hoverMedia +
            '<span class="preview-tag"><span class="sound-dot"></span>Preview</span>' +
            '<p class="work__logline">' + escapeHtml(w.logline) + "</p>" +
            '<span class="eyebrow">View project →</span>' +
          "</div>" +
          '<div class="work__meta">' +
            '<span class="work__name">' + escapeHtml(w.title) + "</span>" +
            '<span class="work__year">' + w.year + "</span>" +
            '<span class="work__type">' + TYPES[w.type] + " · " + escapeHtml(w.runtime) + "</span>" +
          "</div>" +
          '<a class="work__link" href="work.html?id=' + encodeURIComponent(w.id) + '"><span class="sr-only">' + escapeHtml(w.title) + "</span></a>" +
        "</article>"
      );
    }).join("");

    // Hover previews (if a preview clip exists)
    $$(".work", grid).forEach(function (card) {
      var v = $("video", card);
      if (!v) return;
      v.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-1;opacity:.55";
      card.addEventListener("mouseenter", function () { v.play().catch(function () {}); });
      card.addEventListener("mouseleave", function () { v.pause(); });
    });

    // Filter counts + behaviour
    var filters = $$(".filter");
    filters.forEach(function (btn) {
      var f = btn.getAttribute("data-filter");
      var count = f === "all" ? works.length : works.filter(function (w) { return w.type === f; }).length;
      var c = $(".count", btn);
      if (c) c.textContent = String(count).padStart(2, "0");

      btn.addEventListener("click", function () {
        filters.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        var visible = 0;
        $$(".work", grid).forEach(function (card) {
          var show = f === "all" || card.getAttribute("data-type") === f;
          card.classList.toggle("is-hidden", !show);
          if (show) {
            card.style.animation = "none";
            void card.offsetWidth;
            card.style.animation = "";
            card.style.animationDelay = (visible % 4) * 60 + "ms";
            visible++;
          }
        });
        fixGridBorders();
      });
    });

    // Keep the right-edge border clean when filtering changes the layout
    var fixGridBorders = function () {
      var cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
      $$(".work:not(.is-hidden)", grid).forEach(function (card, i) {
        card.style.borderRightColor = (i + 1) % cols === 0 ? "transparent" : "";
      });
    };
    fixGridBorders();
    window.addEventListener("resize", fixGridBorders);

    var total = $("#works-total");
    if (total) total.textContent = String(works.length).padStart(2, "0");
  }

  /* ---------- Work detail page ---------- */

  var detail = $("#work-detail");
  if (detail) {
    var id = new URLSearchParams(location.search).get("id");
    var idx = Math.max(0, works.findIndex(function (w) { return w.id === id; }));
    var w = works[idx];
    var prev = works[(idx - 1 + works.length) % works.length];
    var next = works[(idx + 1) % works.length];

    document.title = w.title + " — PAIGE 18 Production";

    var facts = Object.keys(w.credits).map(function (k) {
      return "<div><dt>" + escapeHtml(k) + "</dt><dd>" + escapeHtml(w.credits[k]) + "</dd></div>";
    }).join("");

    detail.innerHTML =
      '<section class="page-hero">' +
        '<div class="crumbs"><a href="index.html#works">Works</a> / ' + TYPES[w.type] + "</div>" +
        '<h1 class="display">' + escapeHtml(w.title) + "</h1>" +
        '<div class="page-hero__row">' +
          '<span class="eyebrow">' + TYPES[w.type] + " · " + w.year + " · " + escapeHtml(w.runtime) + "</span>" +
          '<span class="eyebrow">' + escapeHtml(w.status) + "</span>" +
        "</div>" +
      "</section>" +
      '<section class="work-hero" style="margin-top:0">' +
        media(w.id === "salt-and-cedar" ? "assets/img/hero.jpg" : w.poster, w.tone === "dark" || w.tone === "ash" ? w.tone : "dark", "Trailer · 16:9") +
        '<a class="work-hero__play" href="' + (w.trailer ? escapeHtml(w.trailer) : "#") + '"><span>Play</span></a>' +
      "</section>" +
      '<section class="work-detail">' +
        '<div><span class="eyebrow red">Credits</span><dl class="facts" style="margin-top:16px">' + facts + "</dl></div>" +
        '<div class="prose">' +
          '<p class="lead">' + escapeHtml(w.logline) + "</p>" +
          "<p>" + escapeHtml(w.synopsis) + "</p>" +
          '<p style="margin-top:28px"><a class="link-arrow red" href="index.html#contact">Screening & distribution enquiries <span class="arrow">→</span></a></p>' +
        "</div>" +
      "</section>" +
      '<section class="gallery">' +
        media(w.poster, w.tone, "Still 01") + media("", "stone", "Still 02") + media("", "blue", "Still 03") +
        media("", "sand", "Still 04") + media("", "ash", "Still 05") +
      "</section>" +
      '<nav class="pager" aria-label="More works">' +
        '<a href="work.html?id=' + encodeURIComponent(prev.id) + '"><span class="eyebrow">← Previous</span><div class="display">' + escapeHtml(prev.title) + "</div></a>" +
        '<a href="work.html?id=' + encodeURIComponent(next.id) + '"><span class="eyebrow">Next →</span><div class="display">' + escapeHtml(next.title) + "</div></a>" +
      "</nav>";
  }

  /* ---------- Stat counters ---------- */

  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var start = null;
    var dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- Reveal on scroll ---------- */

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        $$("[data-count]", e.target).forEach(animateCount);
        io.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Contact: inquiry type ---------- */

  var tabs = $$(".inquiry-tab");
  var typeSelect = $("#f-type");
  var subjectLabel = $("#f-extra-label");
  var extraLabels = {
    coproduction: "Company / Fund",
    casting: "Role or department",
    general: "Subject"
  };

  function setInquiry(type) {
    tabs.forEach(function (t) {
      var on = t.getAttribute("data-type") === type;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    if (typeSelect) typeSelect.value = type;
    if (subjectLabel) subjectLabel.textContent = extraLabels[type];
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () { setInquiry(t.getAttribute("data-type")); });
  });
  if (typeSelect) typeSelect.addEventListener("change", function () { setInquiry(typeSelect.value); });

  // Front-end only — connect to a form service (Formspree, Netlify Forms, etc.)
  var form = $("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = $(".form__status", form);
      if (!form.checkValidity()) { form.reportValidity(); return; }
      status.textContent = "Thank you — we'll be in touch within a few working days.";
      form.reset();
      setInquiry("coproduction");
    });
  }

  $$(".newsletter").forEach(function (nl) {
    nl.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = $("input", nl);
      if (!input.checkValidity()) { input.reportValidity(); return; }
      input.value = "";
      input.placeholder = "Subscribed — thank you";
    });
  });

  var year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
