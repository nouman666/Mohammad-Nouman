(function () {
  "use strict";

  const skillData = {
    ai: [
      "LLM Evaluation & Training",
      "RAG",
      "Prompt Engineering",
      "Agentic Workflows",
      "Vector Databases",
      "Failure-Mode Analysis",
      "LangChain",
    ],
    ml: [
      "PyTorch",
      "Hugging Face",
      "BERT",
      "GPT",
      "scikit-learn",
      "TensorFlow",
      "OpenCV",
    ],
    lang: ["Python", "JavaScript / TypeScript", "C++", "Bash"],
    front: ["React.js", "React Native", "Expo Go", "Tailwind CSS", "Shadcn"],
    back: [
      "Django",
      "Flask",
      "Node.js",
      "REST APIs",
      "Docker",
      "GitHub Actions",
      "GCP",
      "Linux",
    ],
    db: ["PostgreSQL", "MongoDB", "DynamoDB"],
    test: ["pytest", "End-to-End Testing", "Deterministic Acceptance Criteria"],
  };

  function renderTags(containerId, labels) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = labels
      .map(function (t) {
        return '<span class="tag" tabindex="0">' + escapeHtml(t) + "</span>";
      })
      .join("");
  }

  function escapeHtml(s) {
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  renderTags("tags-ai", skillData.ai);
  renderTags("tags-ml", skillData.ml);
  renderTags("tags-lang", skillData.lang);
  renderTags("tags-front", skillData.front);
  renderTags("tags-back", skillData.back);
  renderTags("tags-db", skillData.db);
  renderTags("tags-test", skillData.test);

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Mobile nav */
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelectorAll(".nav a");

  function closeNav() {
    if (!header || !toggle) return;
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  function openNav() {
    if (!header || !toggle) return;
    header.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  }

  if (toggle && header) {
    toggle.addEventListener("click", function () {
      if (header.classList.contains("is-open")) closeNav();
      else openNav();
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  /* Scroll reveal */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      obs.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Count-up for years */
  var countEl = document.querySelector("[data-count]");
  if (countEl && "IntersectionObserver" in window) {
    var target = parseInt(countEl.getAttribute("data-count"), 10);
    var done = false;
    var countObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || done) return;
          done = true;
          var start = 0;
          var duration = 1200;
          var t0 = null;
          function step(ts) {
            if (!t0) t0 = ts;
            var p = Math.min((ts - t0) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            countEl.textContent = String(Math.round(start + (target - start) * eased));
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          countObs.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    countObs.observe(countEl.closest(".stat") || countEl.closest(".hero") || countEl);
  } else if (countEl) {
    countEl.textContent = countEl.getAttribute("data-count") || "10";
  }

  /* Subtle parallax on mouse for hero (desktop) */
  var hero = document.querySelector(".hero");
  var glow1 = document.querySelector(".bg-glow--1");
  var glow2 = document.querySelector(".bg-glow--2");
  if (hero && glow1 && glow2 && window.matchMedia("(pointer: fine)").matches) {
    hero.addEventListener(
      "mousemove",
      function (e) {
        var r = hero.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        glow1.style.transform = "translate(" + x * 24 + "px, " + y * 16 + "px)";
        glow2.style.transform = "translate(" + x * -18 + "px, " + y * -12 + "px)";
      },
      { passive: true }
    );
  }
})();
