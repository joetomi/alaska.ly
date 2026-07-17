"use client";

import Lenis from "lenis";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type {
  FormEvent,
  RefObject,
} from "react";
import {
  defaultLanguage,
  siteContent,
  siteDetails,
} from "../data/site-content";
import type {
  EmailPlatform,
  SiteContent,
  SiteLanguage,
  TitleParts,
} from "../data/site-content";

const EASE_EXPO: [number, number, number, number] = [0.76, 0, 0.24, 1];
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

type EmailDraft = {
  name: string;
  senderEmail: string;
  subject: string;
  message: string;
};

let bodyLockCount = 0;
let bodyOverflow = "";
let bodyPaddingInlineEnd = "";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function useIndustrialDepthEffects<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  prefersReducedMotion: boolean,
  trackProgress = false,
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-depth-card]"),
    );
    const progressTrack = trackProgress
      ? container.querySelector<HTMLElement>("[data-process-progress]")
      : null;
    container.classList.add("industrial-effects-ready");

    if (prefersReducedMotion) {
      cards.forEach((card) => card.classList.add("is-stage-visible"));
      progressTrack?.style.setProperty("--process-progress", "1");
      return () => container.classList.remove("industrial-effects-ready");
    }

    let revealObserver: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-stage-visible", entry.isIntersecting);
        });
      }, {
        threshold: 0.08,
        rootMargin: "24% 0px 24% 0px",
      });
      cards.forEach((card) => revealObserver?.observe(card));
    } else {
      cards.forEach((card) => card.classList.add("is-stage-visible"));
    }

    const cleanups: Array<() => void> = [];
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (finePointer.matches) {
      cards.forEach((card) => {
        let tiltFrame = 0;
        let nextX = 0;
        let nextY = 0;

        const renderTilt = () => {
          const rotateX = nextY * -5;
          const rotateY = nextX * 5;
          card.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
          card.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
          card.style.setProperty("--parallax-x", `${(nextX * 9).toFixed(2)}px`);
          card.style.setProperty("--parallax-y", `${(nextY * 7).toFixed(2)}px`);
          tiltFrame = 0;
        };

        const handlePointerMove = (event: PointerEvent) => {
          const bounds = card.getBoundingClientRect();
          nextX = ((event.clientX - bounds.left) / Math.max(bounds.width, 1)) * 2 - 1;
          nextY = ((event.clientY - bounds.top) / Math.max(bounds.height, 1)) * 2 - 1;
          card.classList.add("is-pointer-active");
          if (!tiltFrame) tiltFrame = window.requestAnimationFrame(renderTilt);
        };

        const resetTilt = () => {
          nextX = 0;
          nextY = 0;
          card.classList.remove("is-pointer-active");
          if (!tiltFrame) tiltFrame = window.requestAnimationFrame(renderTilt);
        };

        card.addEventListener("pointermove", handlePointerMove, { passive: true });
        card.addEventListener("pointerleave", resetTilt);
        card.addEventListener("focusout", resetTilt);
        cleanups.push(() => {
          if (tiltFrame) window.cancelAnimationFrame(tiltFrame);
          card.removeEventListener("pointermove", handlePointerMove);
          card.removeEventListener("pointerleave", resetTilt);
          card.removeEventListener("focusout", resetTilt);
        });
      });
    }

    let progressFrame = 0;
    const updateProgress = () => {
      if (!progressTrack) return;
      const bounds = container.getBoundingClientRect();
      const viewportHeight = Math.max(window.innerHeight, 1);
      const travel = Math.max(bounds.height - viewportHeight * 0.18, 1);
      const progress = Math.min(
        Math.max((viewportHeight * 0.68 - bounds.top) / travel, 0),
        1,
      );
      progressTrack.style.setProperty("--process-progress", progress.toFixed(4));
      progressFrame = 0;
    };

    const scheduleProgress = () => {
      if (!progressFrame) progressFrame = window.requestAnimationFrame(updateProgress);
    };

    if (progressTrack) {
      window.addEventListener("scroll", scheduleProgress, { passive: true });
      window.addEventListener("resize", scheduleProgress);
      const progressResizeObserver = "ResizeObserver" in window
        ? new ResizeObserver(scheduleProgress)
        : null;
      progressResizeObserver?.observe(container);
      scheduleProgress();
      cleanups.push(() => {
        if (progressFrame) window.cancelAnimationFrame(progressFrame);
        progressResizeObserver?.disconnect();
        window.removeEventListener("scroll", scheduleProgress);
        window.removeEventListener("resize", scheduleProgress);
      });
    }

    return () => {
      revealObserver?.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      container.classList.remove("industrial-effects-ready");
    };
  }, [containerRef, prefersReducedMotion, trackProgress]);
}

function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    if (bodyLockCount === 0) {
      bodyOverflow = document.body.style.overflow;
      bodyPaddingInlineEnd = document.body.style.paddingInlineEnd;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingInlineEnd = `${scrollbarWidth}px`;
      }
    }
    bodyLockCount += 1;

    return () => {
      bodyLockCount = Math.max(0, bodyLockCount - 1);
      if (bodyLockCount === 0) {
        document.body.style.overflow = bodyOverflow;
        document.body.style.paddingInlineEnd = bodyPaddingInlineEnd;
      }
    };
  }, [active]);
}

type FocusTrapOptions = {
  active: boolean;
  containerRef: RefObject<HTMLElement | null>;
  onEscape: () => void;
  initialFocusRef?: RefObject<HTMLElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
  extraFocusRef?: RefObject<HTMLElement | null>;
  secondExtraFocusRef?: RefObject<HTMLElement | null>;
};

function useFocusTrap({
  active,
  containerRef,
  onEscape,
  initialFocusRef,
  returnFocusRef,
  extraFocusRef,
  secondExtraFocusRef,
}: FocusTrapOptions) {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const getFocusableElements = () => {
      const elements = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => {
        const style = window.getComputedStyle(element);
        return style.visibility !== "hidden" && style.display !== "none";
      });

      for (const ref of [extraFocusRef, secondExtraFocusRef]) {
        if (ref?.current && !elements.includes(ref.current)) {
          elements.push(ref.current);
        }
      }
      return elements;
    };

    const focusFrame = window.requestAnimationFrame(() => {
      const initialTarget = initialFocusRef?.current ?? getFocusableElements()[0] ?? container;
      initialTarget.focus({ preventScroll: true });
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscape();
        return;
      }
      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        container.focus({ preventScroll: true });
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      const returnTarget = returnFocusRef?.current ?? previouslyFocused;
      if (returnTarget?.isConnected) {
        returnTarget.focus({ preventScroll: true });
      }
    };
  }, [
    active,
    containerRef,
    extraFocusRef,
    initialFocusRef,
    onEscape,
    returnFocusRef,
    secondExtraFocusRef,
  ]);
}

function SectionTitle({ id, title }: { id?: string; title: TitleParts }) {
  return (
    <h2 id={id}>
      <span>{title.primary}</span>
      <br />
      <em>{title.accent}</em>
    </h2>
  );
}

function AlaskaButtonLabel({ label }: { label: string }) {
  return <span className="alaska-button__label">{label}</span>;
}

function SmoothScroll() {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let frameId = 0;
    const lenis = prefersReducedMotion
      ? null
      : new Lenis({
          duration: 1.05,
          smoothWheel: true,
          syncTouch: false,
        });

    if (lenis) {
      (window as any).lenis = lenis;
    }

    const frame = (time: number) => {
      lenis?.raf(time);
      frameId = window.requestAnimationFrame(frame);
    };
    if (lenis) frameId = window.requestAnimationFrame(frame);

    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const targetElement = document.getElementById(decodeURIComponent(href.slice(1)));
      if (!targetElement) return;

      event.preventDefault();
      window.requestAnimationFrame(() => {
        const navbarHeight =
          document.querySelector<HTMLElement>(".alaska-nav")?.offsetHeight ?? 0;
        const top = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

        if (lenis) {
          lenis.scrollTo(targetElement, {
            offset: -navbarHeight,
            duration: 1.05,
          });
        } else {
          window.scrollTo({ top, behavior: "auto" });
        }

        if (window.location.hash !== href) {
          window.history.pushState(null, "", href);
        }
        if (anchor.classList.contains("skip-link")) {
          targetElement.focus({ preventScroll: true });
        }
      });
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
      if (frameId) window.cancelAnimationFrame(frameId);
      if (lenis) {
        (window as any).lenis = undefined;
        lenis.destroy();
      }
    };
  }, [prefersReducedMotion]);

  return null;
}

function AlaskaPreloader({
  content,
  onComplete,
}: {
  content: SiteContent;
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [lockBody, setLockBody] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const hasCompleted = useRef(false);

  useBodyScrollLock(lockBody);

  useEffect(() => {
    let value = 0;
    let holdTimer: number | undefined;
    const increment = prefersReducedMotion ? 5 : 1;
    const intervalDelay = prefersReducedMotion ? 12 : 20;
    const interval = window.setInterval(() => {
      value = Math.min(100, value + increment);
      setProgress(value);
      if (value === 100) {
        window.clearInterval(interval);
        holdTimer = window.setTimeout(
          () => setVisible(false),
          prefersReducedMotion ? 120 : 500,
        );
      }
    }, intervalDelay);

    return () => {
      window.clearInterval(interval);
      if (holdTimer) window.clearTimeout(holdTimer);
    };
  }, [prefersReducedMotion]);

  const finishLoading = () => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;
    setLockBody(false);
    onComplete();
  };

  return (
    <AnimatePresence onExitComplete={finishLoading}>
      {visible && (
        <motion.div
          className="alaska-preloader"
          role="status"
          aria-live="polite"
          aria-label={content.preloader.ariaLabel}
          initial={false}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { y: "-100%" }
          }
          transition={{
            duration: prefersReducedMotion ? 0.2 : 0.8,
            ease: EASE_EXPO,
          }}
        >
          <div className="alaska-preloader__inner">
            <motion.strong
              className="alaska-preloader__number"
              aria-hidden="true"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, ease: EASE_EXPO }}
            >
              {progress}%
            </motion.strong>
            <span>{content.preloader.label}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CustomCursor() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [visible, setVisible] = useState(false);
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const springX = useSpring(pointerX, { stiffness: 500, damping: 28 });
  const springY = useSpring(pointerY, { stiffness: 500, damping: 28 });
  const cursorX = useTransform(springX, (value) => value - 8);
  const cursorY = useTransform(springY, (value) => value - 8);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const updateEnabledState = () => setEnabled(pointerQuery.matches && !prefersReducedMotion);
    updateEnabledState();
    pointerQuery.addEventListener("change", updateEnabledState);
    return () => pointerQuery.removeEventListener("change", updateEnabledState);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("alaska-cursor-enabled", "custom-cursor-active");
      return;
    }

    document.documentElement.classList.add("alaska-cursor-enabled", "custom-cursor-active");
    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setVisible(true);
    };
    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target;
      setInteractive(
        target instanceof Element &&
          Boolean(
            target.closest(
              "a, button, input, textarea, select, [role='button'], [data-cursor-interactive]",
            ),
          ),
      );
    };
    const handlePointerLeave = () => setVisible(false);
    const handlePointerEnter = () => setVisible(true);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    document.documentElement.addEventListener("pointerenter", handlePointerEnter);
    return () => {
      document.documentElement.classList.remove("alaska-cursor-enabled", "custom-cursor-active");
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.documentElement.removeEventListener("pointerenter", handlePointerEnter);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) return null;

  return (
    <motion.div
      className="alaska-cursor"
      aria-hidden="true"
      style={{ x: cursorX, y: cursorY }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: 1,
      }}
      transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.22 } }}
    />
  );
}

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setVisible(window.scrollY > heroHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    setVisible(false);
    const globalLenis = (window as any).lenis;
    if (globalLenis) {
      globalLenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      className={`back-to-top ${visible ? "is-visible" : ""}`}
      onClick={handleClick}
      aria-label="العودة إلى الأعلى"
      type="button"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <line x1={12} y1={19} x2={12} y2={5} />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  );
}

type NavbarProps = {
  content: SiteContent;
  menuOpen: boolean;
  languageTransitioning: boolean;
  onMenuOpenChange: (open: boolean) => void;
  onLanguageChange: () => void;
};

function SiteNavbar({
  content,
  menuOpen,
  languageTransitioning,
  onMenuOpenChange,
  onLanguageChange,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const menuRef = useRef<HTMLElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const languageButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(
    () => onMenuOpenChange(false),
    [onMenuOpenChange],
  );

  useBodyScrollLock(menuOpen);
  useFocusTrap({
    active: menuOpen,
    containerRef: menuRef,
    onEscape: closeMenu,
    initialFocusRef: firstMenuLinkRef,
    returnFocusRef: menuButtonRef,
    extraFocusRef: languageButtonRef,
    secondExtraFocusRef: menuButtonRef,
  });

  useEffect(() => {
    const updateScrolledState = () => setScrolled(window.scrollY > 48);
    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  useEffect(() => setPreviewIndex(0), [content.language]);

  const activePreview = content.navigation.items[previewIndex] ?? content.navigation.items[0];

  return (
    <>
      <header className="alaska-nav" data-scrolled={String(scrolled)}>
        <a className="alaska-nav__brand" href="#top" aria-label={`${content.brand.name} — ${content.navigation.items[0].label}`}>
          <img src="/alaska-logo.webp" width={52} height={52} alt={content.brand.logoAlt} />
          <span>
            <strong>{content.brand.name}</strong>
            <small>{content.brand.descriptor}</small>
          </span>
        </a>
        <div className="alaska-nav__actions">
          <button
            ref={languageButtonRef}
            className="language-button"
            type="button"
            onClick={onLanguageChange}
            disabled={languageTransitioning}
            aria-label={content.navigation.languageAriaLabel}
          >
            {content.languageSwitchLabel}
          </button>
          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            onClick={() => onMenuOpenChange(!menuOpen)}
            aria-label={menuOpen ? content.navigation.closeLabel : content.navigation.menuLabel}
            aria-expanded={menuOpen}
            aria-controls="alaska-site-menu"
          >
            <span className="menu-button__label">{content.navigation.menuLabel}</span>
            <span className="menu-button__close">{content.navigation.closeLabel}</span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            ref={menuRef}
            className="alaska-menu"
            id="alaska-site-menu"
            role="dialog"
            aria-modal="true"
            aria-label={content.navigation.panelLabel}
            tabIndex={-1}
            style={{ visibility: "visible", pointerEvents: "auto" }}
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              closed: {
                clipPath: "ellipse(100% 0% at 50% 0%)",
                transition: { duration: 0.7, ease: EASE_EXPO },
              },
              open: {
                clipPath: "ellipse(150% 150% at 50% 0%)",
                transition: { duration: 0.8, ease: EASE_EXPO },
              },
            }}
          >
            <div className="alaska-menu__preview" aria-hidden="true">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activePreview.previewImage}
                  src={activePreview.previewImage}
                  alt=""
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: EASE_EXPO }}
                />
              </AnimatePresence>
              <div className="alaska-menu__preview-shade" />
              <p>{content.navigation.meta[0]}<br />{content.navigation.meta[1]}</p>
            </div>
            <div className="alaska-menu__panel">
              <nav className="alaska-menu__links" aria-label={content.navigation.ariaLabel}>
                {content.navigation.items.map((item, index) => (
                  <motion.a
                    ref={index === 0 ? firstMenuLinkRef : undefined}
                    key={item.href}
                    href={item.href}
                    data-menu-link="true"
                    onClick={closeMenu}
                    onMouseEnter={() => setPreviewIndex(index)}
                    onFocus={() => setPreviewIndex(index)}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.65,
                      delay: 0.12 + index * 0.055,
                      ease: EASE_EXPO,
                    }}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item.label}</strong>
                  </motion.a>
                ))}
              </nav>
              <div className="alaska-menu__meta">
                <a href={siteDetails.phone.href} dir="ltr">{siteDetails.phone.display}</a>
                <a href={siteDetails.email.href} dir="ltr">{siteDetails.email.display}</a>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function HeroSection({
  content,
  experienceReady,
  prefersReducedMotion,
}: {
  content: SiteContent;
  experienceReady: boolean;
  prefersReducedMotion: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 44]);
  const arrow = "↗";

  return (
    <section ref={sectionRef} className="alaska-hero" id="top" aria-labelledby="hero-title">
      <motion.div
        className="alaska-hero__media"
        style={{ scale: prefersReducedMotion ? 1 : mediaScale }}
      >
        <img
          src={content.hero.image}
          width={content.language === "ar" ? 1672 : 1024}
          height={content.language === "ar" ? 941 : 576}
          alt={content.hero.imageAlt}
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>
      <div className="alaska-hero__shade" aria-hidden="true" />
      <div className="alaska-hero__grid" aria-hidden="true" />
      <motion.div
        className="alaska-hero__content"
        style={{
          opacity: prefersReducedMotion ? 1 : contentOpacity,
          y: prefersReducedMotion ? 0 : contentY,
        }}
        initial={prefersReducedMotion ? false : "hidden"}
        animate={experienceReady ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: { delayChildren: 0.05, staggerChildren: 0.09 },
          },
        }}
      >
        <motion.p
          className="section-kicker"
          variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
        >
          <span aria-hidden="true" />
          {content.hero.eyebrow}
        </motion.p>
        <motion.h1
          id="hero-title"
          className={content.language === "ar" ? "alaska-hero__company-title" : undefined}
          variants={{ hidden: { opacity: 0, y: 55 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.75, ease: EASE_EXPO }}
        >
          <span>{content.hero.title.primary}</span>
          <em>{content.hero.title.accent}</em>
        </motion.h1>
        <motion.p
          className="alaska-hero__lead"
          variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
        >
          {content.hero.description}
        </motion.p>
        <motion.div
          className="alaska-hero__actions"
          variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
        >
          <a
            className="alaska-button alaska-button--primary"
            href="#products"
            data-label={content.hero.primaryCta}
          >
            <AlaskaButtonLabel label={content.hero.primaryCta} />
            <i aria-hidden="true">{arrow}</i>
          </a>
          <a
            className="alaska-button alaska-button--ghost"
            href="#contact"
            data-label={content.hero.secondaryCta}
          >
            <AlaskaButtonLabel label={content.hero.secondaryCta} />
            <i aria-hidden="true">{arrow}</i>
          </a>
        </motion.div>
      </motion.div>
      <div className="alaska-hero__foot">
        <span>ALASKA / 2019 / ZLITEN · LIBYA</span>
        <a href="#about" aria-label={content.hero.scrollLabel}>
          <span>{content.hero.scrollLabel}</span>
          <i aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </i>
        </a>
      </div>
    </section>
  );
}

function MarqueeBand({ content }: { content: SiteContent }) {
  const repeatedWords = Array.from({ length: 3 }, () => content.marquee.words).flat();

  return (
    <div
      className="marquee-band"
      aria-label={content.marquee.ariaLabel}
      data-direction={content.direction}
    >
      <div className="marquee-band__track" aria-hidden="true">
        {repeatedWords.map((word, index) => (
          <span className={index % 2 === 1 ? "outline" : undefined} key={`${word}-${index}`}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

function AboutSection({
  content,
  prefersReducedMotion,
}: {
  content: SiteContent;
  prefersReducedMotion: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.82, 1],
    [0, 1, 1, 0],
  );

  return (
    <section ref={sectionRef} className="alaska-section about-section" id="about">
      <div className="alaska-container about-section__grid">
        <motion.div
          className="about-section__copy reveal"
          style={{
            y: prefersReducedMotion ? 0 : copyY,
            opacity: prefersReducedMotion ? 1 : copyOpacity,
          }}
        >
          <p className="section-kicker"><span aria-hidden="true" />{content.about.label}</p>
          <SectionTitle title={content.about.title} />
          <p className="section-lead">{content.about.description}</p>
          <div className="about-section__highlights">
            {content.about.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
          </div>
          <div className="about-section__facts">
            {content.statistics.map((statistic) => (
              <span key={statistic.label}>
                {statistic.value}
                <b>{statistic.label}</b>
              </span>
            ))}
          </div>
        </motion.div>
        <motion.figure
          className="about-section__visual reveal"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 70 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE_EXPO }}
        >
          <img
            src={content.about.image}
            width={1672}
            height={941}
            alt={content.about.imageAlt}
            loading="lazy"
          />
          <figcaption>
            <span>{content.about.imageNote}</span>
            <strong>ALASKA / ZLITEN</strong>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

function StrengthsSection({
  content,
  prefersReducedMotion,
}: {
  content: SiteContent;
  prefersReducedMotion: boolean;
}) {
  const arrow = "↗";

  return (
    <section className="alaska-section strengths-section" id="strengths" aria-labelledby="strengths-title">
      <div className="alaska-container">
        <motion.header
          className="section-heading reveal"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 55 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: EASE_EXPO }}
        >
          <p className="section-kicker"><span aria-hidden="true" />{content.strengths.label}</p>
          <SectionTitle id="strengths-title" title={content.strengths.title} />
          <p className="section-description section-lead">{content.strengths.description}</p>
        </motion.header>
        <div className="strengths-grid">
          {content.strengths.items.map((item, index) => {
            const toneClass =
              item.tone === "neon"
                ? " strength-card--green"
                : item.tone === "amber"
                  ? " strength-card--amber"
                  : "";
            return (
              <motion.article
                className={`strength-card reveal${toneClass}`}
                key={item.number}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 55 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: index * 0.06, ease: EASE_EXPO }}
              >
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <i aria-hidden="true">{arrow}</i>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductsSection({
  content,
  prefersReducedMotion,
}: {
  content: SiteContent;
  prefersReducedMotion: boolean;
}) {
  const arrow = "↗";
  const dimensions = [
    [666, 660],
    [800, 800],
    [900, 900],
    [800, 800],
    [900, 900],
  ] as const;

  return (
    <section className="alaska-section products-section" id="products" aria-labelledby="products-title">
      <div className="alaska-container">
        <motion.header
          className="section-heading reveal"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 55 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: EASE_EXPO }}
        >
          <p className="section-kicker"><span aria-hidden="true" />{content.products.label}</p>
          <SectionTitle id="products-title" title={content.products.title} />
          <p className="section-description section-lead">{content.products.description}</p>
        </motion.header>
        <div className="products-grid">
          {content.products.items.map((product, index) => (
            <motion.article
              className={`product-card reveal${index === 1 || index === 3 ? " product-card--wide" : ""}`}
              key={product.number}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 65 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.7, delay: index * 0.065, ease: EASE_EXPO }}
            >
              <img
                src={product.image}
                width={dimensions[index]?.[0] ?? 900}
                height={dimensions[index]?.[1] ?? 900}
                alt={product.alt}
                loading="lazy"
              />
              <div>
                <span>{product.number}</span>
                <h3>{product.name}</h3>
                <a href="#contact" aria-label={`${product.cta}: ${product.name}`}>
                  {product.cta}<i aria-hidden="true">{arrow}</i>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({
  content,
  prefersReducedMotion,
}: {
  content: SiteContent;
  prefersReducedMotion: boolean;
}) {
  const stagesRef = useRef<HTMLDivElement>(null);
  useIndustrialDepthEffects(stagesRef, prefersReducedMotion, true);

  return (
    <section className="alaska-section process-section" id="process" aria-labelledby="process-title">
      <div className="alaska-container process-section__content">
        <motion.header
          className="section-heading section-heading--center reveal"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 55 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: EASE_EXPO }}
        >
          <p className="section-kicker"><span aria-hidden="true" />{content.process.label}</p>
          <SectionTitle id="process-title" title={content.process.title} />
          <p className="section-description section-lead">{content.process.description}</p>
        </motion.header>

        <section className="raw-materials" aria-labelledby="raw-materials-title">
          <motion.header
            className="raw-materials__heading reveal"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 35 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
          >
            <p className="section-kicker"><span aria-hidden="true" />{content.process.rawMaterials.label}</p>
            <SectionTitle id="raw-materials-title" title={content.process.rawMaterials.title} />
          </motion.header>
          <div className="raw-materials__grid">
            {content.process.rawMaterials.items.map((material, index) => (
              <motion.article
                className="raw-material-card reveal"
                key={material.name}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 35 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: EASE_EXPO }}
              >
                <div className="raw-material-card__media">
                  <img
                    src={material.image}
                    width={material.imageWidth}
                    height={material.imageHeight}
                    alt={material.imageAlt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="raw-material-card__copy">
                  <span>{material.number}</span>
                  <h3>{material.name}</h3>
                  <p>{material.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <div className="process-stages" ref={stagesRef} data-process-stages>
          <div className="process-progress" data-process-progress aria-hidden="true">
            <span />
          </div>
          {content.process.steps.map((step) => (
            <article
              className="process-stage"
              key={step.number}
              data-depth-card
              data-stage-number={step.number}
            >
              <div className="process-stage__scene" data-depth-scene>
                <span className="process-stage__neon-frame" aria-hidden="true" />
                <a
                  className="process-stage__media"
                  href={step.image}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${step.imageLinkLabel}: ${step.title}`}
                >
                  <span className="process-stage__media-surface">
                    <img
                      src={step.image}
                      width={step.imageWidth}
                      height={step.imageHeight}
                      alt={step.imageAlt}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                </a>
                <span className="process-stage__floating-number" aria-hidden="true">
                  {step.number}
                </span>
              </div>
              <div className="process-stage__copy">
                <span className="process-stage__number">{step.number}</span>
                <h3>{step.title}</h3>
                <p className="process-stage__machine">{step.machine}</p>
                <p className="process-stage__description">{step.description}</p>
                <div className="process-stage__result">
                  <span>{content.process.resultLabel}</span>
                  <strong>{step.result}</strong>
                </div>
                <a
                  className="process-stage__image-link"
                  href={step.image}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${step.imageLinkLabel}: ${step.title}`}
                >
                  {step.imageLinkLabel}<i aria-hidden="true">↗</i>
                </a>
              </div>
            </article>
          ))}
        </div>

        <motion.aside
          className="finished-product reveal"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 35 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: EASE_EXPO }}
        >
          <span>{content.process.finishedProduct.label}</span>
          <h3>{content.process.finishedProduct.name}</h3>
          <p>{content.process.finishedProduct.description}</p>
        </motion.aside>
      </div>
    </section>
  );
}

function QualitySection({
  content,
  prefersReducedMotion,
}: {
  content: SiteContent;
  prefersReducedMotion: boolean;
}) {
  const qualityRef = useRef<HTMLDivElement>(null);
  useIndustrialDepthEffects(qualityRef, prefersReducedMotion);

  return (
    <section className="alaska-section quality-section" id="quality" aria-labelledby="quality-title">
      <div className="alaska-container quality-section__grid" ref={qualityRef}>
        <figure className="quality-section__visual" data-depth-card data-quality-visual>
          <div className="quality-section__scene" data-depth-scene>
            <a
              className="quality-section__frame"
              href={content.quality.image}
              target="_blank"
              rel="noreferrer"
              aria-label={content.quality.imageLinkLabel}
            >
              <img
                src={content.quality.image}
                width={content.quality.imageWidth}
                height={content.quality.imageHeight}
                alt={content.quality.imageAlt}
                loading="lazy"
                decoding="async"
              />
            </a>
            <span className="quality-section__detail" aria-hidden="true" />
          </div>
          <div
            className="quality-reading"
            aria-label={`${content.quality.reading.label}: ${content.quality.reading.value}`}
          >
            <strong dir="ltr">{content.quality.reading.value}</strong>
            <span>{content.quality.reading.label}</span>
          </div>
          <figcaption><strong>QC</strong><span>{content.quality.badge}</span></figcaption>
        </figure>
        <motion.div
          className="quality-section__copy reveal"
          initial={prefersReducedMotion ? false : { opacity: 0, x: 80 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE_EXPO }}
        >
          <p className="section-kicker"><span aria-hidden="true" />{content.quality.label}</p>
          <SectionTitle id="quality-title" title={content.quality.title} />
          <p className="section-lead">{content.quality.description}</p>
          <ol className="quality-list">
            {content.quality.points.map((point) => (
              <li key={point.number}><span>{point.number}</span><span>{point.label}</span></li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}

function LocationSection({
  content,
  prefersReducedMotion,
}: {
  content: SiteContent;
  prefersReducedMotion: boolean;
}) {
  const arrow = "↗";

  return (
    <section className="alaska-section location-section" id="location" aria-labelledby="location-title">
      <div className="alaska-container">
        <motion.header
          className="section-heading reveal"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 55 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: EASE_EXPO }}
        >
          <p className="section-kicker"><span aria-hidden="true" />{content.location.label}</p>
          <SectionTitle id="location-title" title={content.location.title} />
          <p className="section-description section-lead">{content.location.introTitle}</p>
        </motion.header>
        <motion.div
          className="location-layout reveal"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 60 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.8, ease: EASE_EXPO }}
        >
          <div className="map-frame">
            <iframe
              src={siteDetails.mapEmbedUrl}
              title={content.location.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <aside className="location-card" aria-label={content.location.cardTitle}>
            <span>{content.location.coordinatesLabel}</span>
            <h3>{content.location.address}</h3>
            <p dir="ltr">{siteDetails.coordinates.value}</p>
            <small dir="ltr">{content.location.latitude} / {content.location.longitude}</small>
            <a
              className="alaska-button alaska-button--primary"
              href={siteDetails.mapUrl}
              target="_blank"
              rel="noreferrer"
              data-label={content.location.mapCta}
            >
              <AlaskaButtonLabel label={content.location.mapCta} />
              <i aria-hidden="true">{arrow}</i>
            </a>
          </aside>
        </motion.div>
      </div>
    </section>
  );
}

type EmailModalProps = {
  content: SiteContent;
  draft: EmailDraft | null;
  onClose: () => void;
  onPlatformSelect: (platform: EmailPlatform["id"]) => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
};

function EmailPlatformModal({
  content,
  draft,
  onClose,
  onPlatformSelect,
  returnFocusRef,
}: EmailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const headingId = useId();
  const isOpen = Boolean(draft);

  useBodyScrollLock(isOpen);
  useFocusTrap({
    active: isOpen,
    containerRef: modalRef,
    onEscape: onClose,
    initialFocusRef: closeButtonRef,
    returnFocusRef,
  });

  return (
    <AnimatePresence>
      {draft && (
        <motion.div
          ref={modalRef}
          className="email-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          aria-hidden="false"
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.25 }}
        >
          <button
            className="email-modal__backdrop"
            type="button"
            onClick={onClose}
            aria-label={content.emailModal.closeLabel}
          />
          <motion.div
            className="email-modal__card"
            role="document"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 55, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 35, scale: 0.97 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, ease: EASE_EXPO }}
          >
            <button
              ref={closeButtonRef}
              className="email-modal__close"
              type="button"
              onClick={onClose}
              aria-label={content.emailModal.closeLabel}
            >
              ×
            </button>
            <small>{content.emailModal.readyLabel}</small>
            <h2 id={headingId}>{content.emailModal.title}</h2>
            <div className="email-platforms">
              {content.emailModal.platforms.map((platform) => (
                <button
                  type="button"
                  key={platform.id}
                  onClick={() => onPlatformSelect(platform.id)}
                  aria-label={platform.label}
                >
                  <b aria-hidden="true">{platform.shortLabel}</b>
                  <span>{platform.label}</span>
                </button>
              ))}
            </div>
            <p>{content.emailModal.description}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ContactSection({
  content,
  prefersReducedMotion,
}: {
  content: SiteContent;
  prefersReducedMotion: boolean;
}) {
  const [emailDraft, setEmailDraft] = useState<EmailDraft | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const formId = useId();
  const arrow = "↗";
  const fieldIds = {
    name: `${formId}-name`,
    email: `${formId}-email`,
    subject: `${formId}-subject`,
    message: `${formId}-message`,
  };

  const prepareEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setEmailDraft({
      name: String(formData.get("name") ?? ""),
      senderEmail: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    });
  };

  const closeEmailModal = useCallback(() => setEmailDraft(null), []);
  const openEmailPlatform = (platform: EmailPlatform["id"]) => {
    if (!emailDraft) return;

    const fieldLabels = content.contact.form;
    const body = `${fieldLabels.nameLabel}: ${emailDraft.name}\n${fieldLabels.emailLabel}: ${emailDraft.senderEmail}\n\n${emailDraft.message}`;
    const recipient = siteDetails.email.display;
    const subject = encodeURIComponent(emailDraft.subject);
    const encodedBody = encodeURIComponent(body);
    const links: Record<EmailPlatform["id"], string> = {
      gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${encodedBody}`,
      outlook: `https://outlook.live.com/mail/0/deeplink/compose?to=${recipient}&subject=${subject}&body=${encodedBody}`,
      yahoo: `https://compose.mail.yahoo.com/?to=${recipient}&subject=${subject}&body=${encodedBody}`,
      default: `mailto:${recipient}?subject=${subject}&body=${encodedBody}`,
    };

    if (platform === "default") {
      window.location.href = links.default;
    } else {
      const emailWindow = window.open(links[platform], "_blank", "noopener,noreferrer");
      if (emailWindow) emailWindow.opener = null;
    }
    closeEmailModal();
  };

  return (
    <>
      <section className="alaska-section contact-section" id="contact" aria-labelledby="contact-title">
        <div className="alaska-container">
          <motion.header
            className="contact-section__head reveal"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 55 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: EASE_EXPO }}
          >
            <p className="section-kicker"><span aria-hidden="true" />{content.contact.label}</p>
            <h2 id="contact-title"><span>{content.contact.title.primary}</span><em>{content.contact.title.accent}</em></h2>
            <p>{content.contact.description}</p>
          </motion.header>
          <motion.form
            className="contact-form reveal"
            onSubmit={prepareEmail}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 60 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
          >
            <div className="contact-form__row">
              <label htmlFor={fieldIds.name}>
                <span>{content.contact.form.nameLabel}</span>
                <input id={fieldIds.name} name="name" type="text" autoComplete="name" required />
              </label>
              <label htmlFor={fieldIds.email}>
                <span>{content.contact.form.emailLabel}</span>
                <input id={fieldIds.email} name="email" type="email" autoComplete="email" dir="ltr" required />
              </label>
            </div>
            <label htmlFor={fieldIds.subject}>
              <span>{content.contact.form.subjectLabel}</span>
              <input id={fieldIds.subject} name="subject" type="text" required />
            </label>
            <label htmlFor={fieldIds.message}>
              <span>{content.contact.form.messageLabel}</span>
              <textarea id={fieldIds.message} name="message" rows={7} required />
            </label>
            <button
              ref={submitButtonRef}
              className="alaska-button alaska-button--primary"
              type="submit"
              data-label={content.contact.form.submitLabel}
            >
              <AlaskaButtonLabel label={content.contact.form.submitLabel} />
              <i aria-hidden="true">{arrow}</i>
            </button>
          </motion.form>
          <div className="contact-direct">
            {content.contact.channels.map((channel) => (
              <a
                href={channel.href}
                key={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noreferrer" : undefined}
                dir="ltr"
              >
                <small dir={content.direction}>{channel.label}</small>
                {channel.value}
              </a>
            ))}
          </div>
          <aside className="contact-inquiry" aria-label={content.contact.inquiryLabel}>
            <p className="section-kicker"><span aria-hidden="true" />{content.contact.inquiryLabel}</p>
            <h3>{content.contact.inquiryTitle}</h3>
            <p>{content.contact.inquiryDescription}</p>
          </aside>
          <div className="contact-additional" aria-label={content.contact.additionalPhonesLabel}>
            <strong>{content.contact.additionalPhonesLabel}</strong>
            {content.contact.additionalPhones.map((channel) => (
              <a href={channel.href} key={channel.href} dir="ltr">{channel.value}</a>
            ))}
          </div>
        </div>
      </section>
      <EmailPlatformModal
        content={content}
        draft={emailDraft}
        onClose={closeEmailModal}
        onPlatformSelect={openEmailPlatform}
        returnFocusRef={submitButtonRef}
      />
    </>
  );
}

function SiteFooter({ content }: { content: SiteContent }) {
  const arrow = "↗";

  return (
    <footer className="alaska-footer">
      <div className="alaska-footer__main">
        <p>{content.footer.title}</p>
        <a href={siteDetails.email.href} dir="ltr">
          {siteDetails.email.display}<i aria-hidden="true">{arrow}</i>
        </a>
      </div>
      <div className="alaska-footer__details">
        <div className="alaska-footer__brand">
          <img src="/alaska-logo.webp" width={76} height={76} alt="" />
          <strong>{content.brand.name}</strong>
          <span>{content.footer.companyDescription}</span>
        </div>
        <address>
          <small>{content.footer.addressLabel}</small>
          {content.location.address}
        </address>
        <div className="alaska-footer__contact">
          <a href={siteDetails.phone.href} dir="ltr"><small dir={content.direction}>{content.footer.phoneLabel}</small>{siteDetails.phone.display}</a>
          <a href={siteDetails.whatsapp.href} target="_blank" rel="noreferrer" dir="ltr"><small dir={content.direction}>{content.footer.whatsappLabel}</small>{siteDetails.whatsapp.display}</a>
          <a href={siteDetails.email.href} dir="ltr"><small dir={content.direction}>{content.footer.emailLabel}</small>{siteDetails.email.display}</a>
          <a href="https://alaska.ly" dir="ltr"><small dir={content.direction}>{content.footer.websiteLabel}</small>{siteDetails.website}</a>
        </div>
      </div>
      <div className="alaska-footer__bottom">
        <span>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> ALASKA — {content.footer.rights}</span>
        <span>{content.footer.tagline}</span>
      </div>
    </footer>
  );
}

type LanguageTransitionOverlayProps = {
  active: boolean;
  targetLanguage: SiteLanguage;
};

function LanguageTransitionOverlay({ active, targetLanguage }: LanguageTransitionOverlayProps) {
  const movingToArabic = targetLanguage === "ar";

  return (
    <div
      className={`language-transition${active ? " is-active" : ""}`}
      role="status"
      aria-live="polite"
      aria-hidden={!active}
      dir="ltr"
    >
      <div className="language-transition__grid" aria-hidden="true" />
      <div className="language-transition__content">
        <div className="language-transition__mark" aria-hidden="true">
          <span>ع</span>
          <span>A</span>
        </div>
        <p>{movingToArabic ? "جاري تثبيت اللغة العربية" : "SWITCHING TO ENGLISH"}</p>
        <div className="language-transition__route" aria-hidden="true">
          <span>{movingToArabic ? "ENGLISH" : "العربية"}</span>
          <b>→</b>
          <strong>{movingToArabic ? "العربية" : "ENGLISH"}</strong>
        </div>
        <div className="language-transition__progress" aria-hidden="true"><span /></div>
      </div>
    </div>
  );
}

export default function AlaskaExperience() {
  const [language, setLanguage] = useState<SiteLanguage>(defaultLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [experienceReady, setExperienceReady] = useState(false);
  const [languageTransitionTarget, setLanguageTransitionTarget] = useState<SiteLanguage | null>(null);
  const scrollPositionRef = useRef({ x: 0, y: 0 });
  const pendingLanguageScrollRef = useRef(false);
  const languageTransitionTimersRef = useRef<number[]>([]);
  const content = siteContent[language];
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    document.documentElement.lang = content.language;
    document.documentElement.dir = content.direction;
    if (!pendingLanguageScrollRef.current) return;
    pendingLanguageScrollRef.current = false;
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo(scrollPositionRef.current.x, scrollPositionRef.current.y);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [content.direction, content.language]);

  useEffect(() => () => {
    languageTransitionTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    document.body.classList.remove("language-transitioning");
  }, []);

  const switchLanguage = useCallback(() => {
    if (languageTransitionTarget) return;

    const nextLanguage: SiteLanguage = language === "ar" ? "en" : "ar";
    const swapDelay = prefersReducedMotion ? 160 : 620;
    const finishDelay = prefersReducedMotion ? 520 : 1550;

    scrollPositionRef.current = { x: window.scrollX, y: window.scrollY };
    pendingLanguageScrollRef.current = true;
    setMenuOpen(false);
    setLanguageTransitionTarget(nextLanguage);
    document.body.classList.add("language-transitioning");

    languageTransitionTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    languageTransitionTimersRef.current = [
      window.setTimeout(() => setLanguage(nextLanguage), swapDelay),
      window.setTimeout(() => {
        document.body.classList.remove("language-transitioning");
        setLanguageTransitionTarget(null);
        const { x, y } = scrollPositionRef.current;
        window.requestAnimationFrame(() => {
          window.scrollTo(x, y);
          window.requestAnimationFrame(() => window.scrollTo(x, y));
        });
      }, finishDelay),
    ];
  }, [language, languageTransitionTarget, prefersReducedMotion]);

  const setMenuState = useCallback((open: boolean) => setMenuOpen(open), []);
  const completePreloader = useCallback(() => setExperienceReady(true), []);

  return (
    <div
      className={`alaska-experience${menuOpen ? " menu-open" : ""}${experienceReady ? " site-ready" : ""}`}
      lang={content.language}
      dir={content.direction}
    >
      <a className="skip-link" href="#main-content">
        {content.language === "ar" ? "تجاوز إلى المحتوى" : "Skip to content"}
      </a>
      <SmoothScroll />
      <AlaskaPreloader content={content} onComplete={completePreloader} />
      <LanguageTransitionOverlay
        active={languageTransitionTarget !== null}
        targetLanguage={languageTransitionTarget ?? language}
      />
      <CustomCursor />
      <BackToTopButton />
      <SiteNavbar
        content={content}
        menuOpen={menuOpen}
        languageTransitioning={languageTransitionTarget !== null}
        onMenuOpenChange={setMenuState}
        onLanguageChange={switchLanguage}
      />
      <main id="main-content" tabIndex={-1}>
        <HeroSection
          content={content}
          experienceReady={experienceReady}
          prefersReducedMotion={prefersReducedMotion}
        />
        <MarqueeBand content={content} />
        <AboutSection content={content} prefersReducedMotion={prefersReducedMotion} />
        <StrengthsSection content={content} prefersReducedMotion={prefersReducedMotion} />
        <ProductsSection content={content} prefersReducedMotion={prefersReducedMotion} />
        <ProcessSection content={content} prefersReducedMotion={prefersReducedMotion} />
        <QualitySection content={content} prefersReducedMotion={prefersReducedMotion} />
        <LocationSection content={content} prefersReducedMotion={prefersReducedMotion} />
        <ContactSection content={content} prefersReducedMotion={prefersReducedMotion} />
      </main>
      <SiteFooter content={content} />
    </div>
  );
}
