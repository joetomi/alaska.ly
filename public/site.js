(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine)");
  const destinationEmail = "abdallhmansur68@gmail.com";
  let previousFocus = null;
  let emailDraft = null;
  let lenis = null;

  const updateScrollLock = () => {
    const locked = body.classList.contains("is-loading") || body.classList.contains("menu-open") || body.classList.contains("modal-open") || body.classList.contains("language-transitioning");
    body.classList.toggle("scroll-locked", locked);
  };

  const languageToggle = document.querySelector("[data-language-toggle]");
  const languageTransition = document.querySelector("[data-language-transition]");
  const languageTransitionFrom = document.querySelector("[data-language-transition-from]");
  const languageTransitionTo = document.querySelector("[data-language-transition-to]");
  const languageTransitionMessage = document.querySelector("[data-language-transition-message]");
  let languageTransitionTimers = [];
  const setLanguage = (language) => {
    const isArabic = language === "ar";
    root.lang = language;
    root.dir = isArabic ? "rtl" : "ltr";
    if (languageToggle) {
      languageToggle.textContent = isArabic ? "EN" : "عربي";
      languageToggle.setAttribute("aria-label", isArabic ? "Switch to English" : "التبديل إلى العربية");
    }
    const loader = document.querySelector(".alaska-preloader");
    if (loader) loader.setAttribute("aria-label", isArabic ? "جاري تحميل تجربة ألاسكا" : "Loading Alaska experience");
  };

  languageToggle?.addEventListener("click", () => {
    if (body.classList.contains("language-transitioning")) return;

    const nextLanguage = root.lang === "ar" ? "en" : "ar";
    const movingToArabic = nextLanguage === "ar";
    const swapDelay = reducedMotion.matches ? 160 : 620;
    const finishDelay = reducedMotion.matches ? 520 : 1550;

    languageTransitionTimers.forEach((timer) => window.clearTimeout(timer));
    languageTransitionTimers = [];

    if (languageTransitionFrom) languageTransitionFrom.textContent = movingToArabic ? "ENGLISH" : "العربية";
    if (languageTransitionTo) languageTransitionTo.textContent = movingToArabic ? "العربية" : "ENGLISH";
    if (languageTransitionMessage) languageTransitionMessage.textContent = movingToArabic ? "جاري تثبيت اللغة العربية" : "SWITCHING TO ENGLISH";

    closeMenu();
    body.classList.add("language-transitioning");
    languageTransition?.classList.add("is-active");
    languageTransition?.setAttribute("aria-hidden", "false");
    languageToggle.disabled = true;
    updateScrollLock();

    languageTransitionTimers.push(window.setTimeout(() => {
      setLanguage(nextLanguage);
    }, swapDelay));

    languageTransitionTimers.push(window.setTimeout(() => {
      languageTransition?.classList.remove("is-active");
      languageTransition?.setAttribute("aria-hidden", "true");
      body.classList.remove("language-transitioning");
      languageToggle.disabled = false;
      updateScrollLock();
    }, finishDelay));
  });

  const preloader = document.querySelector(".alaska-preloader");
  const preloaderNumber = document.querySelector(".alaska-preloader__number");
  body.classList.add("is-loading");
  updateScrollLock();

  const finishPreloader = () => {
    if (!preloader) return;
    preloader.classList.add("is-complete");
    window.setTimeout(() => {
      preloader.setAttribute("aria-hidden", "true");
      body.classList.remove("is-loading");
      body.classList.add("site-ready");
      updateScrollLock();
    }, reducedMotion.matches ? 120 : 820);
  };

  if (preloaderNumber && !reducedMotion.matches) {
    let progress = 0;
    const progressTimer = window.setInterval(() => {
      progress += 1;
      preloaderNumber.textContent = `${progress}%`;
      if (progress >= 100) {
        window.clearInterval(progressTimer);
        window.setTimeout(finishPreloader, 500);
      }
    }, 20);
  } else {
    if (preloaderNumber) preloaderNumber.textContent = "100%";
    window.setTimeout(finishPreloader, 180);
  }

  if (!reducedMotion.matches && typeof window.Lenis === "function") {
    lenis = new window.Lenis({ smoothWheel: true, lerp: 0.085, wheelMultiplier: 0.9 });
    window.lenis = lenis;
    const lenisFrame = (time) => {
      lenis.raf(time);
      window.requestAnimationFrame(lenisFrame);
    };
    window.requestAnimationFrame(lenisFrame);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      const target = targetId && targetId !== "#" ? document.querySelector(targetId) : null;
      if (!target) return;
      event.preventDefault();
      closeMenu();
      if (lenis) lenis.scrollTo(target, { offset: -82, duration: 1.1 });
      else target.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", targetId);
    });
  });

  const menu = document.querySelector(".alaska-menu");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const menuPreview = document.querySelector("[data-menu-preview]");
  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function openMenu() {
    if (!menu || !menuButton) return;
    previousFocus = document.activeElement;
    body.classList.add("menu-open");
    menu.setAttribute("aria-hidden", "false");
    menuButton.setAttribute("aria-expanded", "true");
    updateScrollLock();
    window.setTimeout(() => menu.querySelector(focusableSelector)?.focus(), reducedMotion.matches ? 0 : 450);
  }

  function closeMenu() {
    if (!menu || !menuButton || !body.classList.contains("menu-open")) return;
    body.classList.remove("menu-open");
    menu.setAttribute("aria-hidden", "true");
    menuButton.setAttribute("aria-expanded", "false");
    updateScrollLock();
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  }

  menuButton?.addEventListener("click", () => body.classList.contains("menu-open") ? closeMenu() : openMenu());
  menu?.querySelectorAll("a[href^='#']").forEach((link) => link.addEventListener("click", closeMenu));
  menu?.querySelectorAll("[data-preview]").forEach((link) => {
    const updatePreview = () => {
      if (!menuPreview) return;
      const nextSource = link.getAttribute("data-preview");
      if (!nextSource || menuPreview.getAttribute("src") === nextSource) return;
      menuPreview.classList.add("is-changing");
      window.setTimeout(() => {
        menuPreview.setAttribute("src", nextSource);
        menuPreview.classList.remove("is-changing");
      }, 160);
    };
    link.addEventListener("mouseenter", updatePreview);
    link.addEventListener("focus", updatePreview);
  });

  const modal = document.getElementById("email-modal");
  const emailForm = document.querySelector("[data-email-form]");

  const closeModal = () => {
    if (!modal || modal.getAttribute("aria-hidden") === "true") return;
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("modal-open");
    updateScrollLock();
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  };

  const openModal = () => {
    if (!modal) return;
    previousFocus = document.activeElement;
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");
    updateScrollLock();
    modal.querySelector(focusableSelector)?.focus();
  };

  emailForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(emailForm);
    emailDraft = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
    };
    openModal();
  });

  modal?.querySelectorAll("[data-modal-close]").forEach((button) => button.addEventListener("click", closeModal));
  modal?.querySelectorAll("[data-platform]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!emailDraft) return;
      const subject = encodeURIComponent(emailDraft.subject);
      const bodyText = encodeURIComponent(`Name: ${emailDraft.name}\nEmail: ${emailDraft.email}\n\n${emailDraft.message}`);
      const platform = button.getAttribute("data-platform");
      const urls = {
        gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${destinationEmail}&su=${subject}&body=${bodyText}`,
        outlook: `https://outlook.live.com/mail/0/deeplink/compose?to=${destinationEmail}&subject=${subject}&body=${bodyText}`,
        yahoo: `https://compose.mail.yahoo.com/?to=${destinationEmail}&subject=${subject}&body=${bodyText}`,
        default: `mailto:${destinationEmail}?subject=${subject}&body=${bodyText}`,
      };
      const url = urls[platform] || urls.default;
      if (platform === "default") window.location.href = url;
      else window.open(url, "_blank", "noopener,noreferrer");
      closeModal();
    });
  });

  const trapFocus = (event, container) => {
    if (event.key !== "Tab") return;
    const elements = [...container.querySelectorAll(focusableSelector)].filter((element) => !element.hasAttribute("hidden"));
    if (!elements.length) return;
    const first = elements[0];
    const last = elements[elements.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (body.classList.contains("modal-open")) closeModal();
      else closeMenu();
    }
    if (body.classList.contains("modal-open") && modal) trapFocus(event, modal);
    else if (body.classList.contains("menu-open") && menu) trapFocus(event, menu);
  });

  const navigation = document.querySelector(".alaska-nav");
  const heroMedia = document.querySelector("[data-hero-media]");
  const heroContent = document.querySelector("[data-hero-content]");
  const backToTopBtn = document.getElementById("back-to-top");
  let scrollFrame = 0;

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      backToTopBtn.classList.remove("is-visible");
    });
  }

  const updateScrollEffects = () => {
    const scrollTop = window.scrollY;
    if (navigation) navigation.dataset.scrolled = String(scrollTop > 40);
    if (!reducedMotion.matches && heroMedia && heroContent) {
      const heroHeight = Math.max(window.innerHeight, 1);
      const ratio = Math.min(scrollTop / heroHeight, 1);
      heroMedia.style.transform = `scale(${1 + ratio * 0.2})`;
      heroContent.style.opacity = String(Math.max(1 - ratio * 1.7, 0));
      heroContent.style.transform = `translate3d(0, ${ratio * 42}px, 0)`;
    }
    if (backToTopBtn) {
      const heroHeight = Math.max(window.innerHeight, 1);
      if (scrollTop > heroHeight) {
        backToTopBtn.classList.add("is-visible");
      } else {
        backToTopBtn.classList.remove("is-visible");
      }
    }
    scrollFrame = 0;
  };
  window.addEventListener("scroll", () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollEffects);
  }, { passive: true });
  updateScrollEffects();

  const revealItems = document.querySelectorAll(".reveal");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((element) => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8%" });
    revealItems.forEach((element) => revealObserver.observe(element));
  }

  const cursor = document.querySelector(".alaska-cursor");
  if (cursor && finePointer.matches && window.innerWidth >= 1024 && !reducedMotion.matches) {
    body.classList.add("custom-cursor-active");
    let pointerX = -50;
    let pointerY = -50;
    let cursorX = -50;
    let cursorY = -50;
    let cursorScale = 1;
    document.addEventListener("pointermove", (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    }, { passive: true });
    const renderCursor = () => {
      cursorX += (pointerX - cursorX) * 0.24;
      cursorY += (pointerY - cursorY) * 0.24;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%) scale(${cursorScale})`;
      window.requestAnimationFrame(renderCursor);
    };
    window.requestAnimationFrame(renderCursor);
  }

  document.querySelectorAll("[data-year]").forEach((element) => { element.textContent = String(new Date().getFullYear()); });
  setLanguage(root.lang === "en" ? "en" : "ar");
})();
