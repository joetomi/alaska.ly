"use client";

import { useState, useEffect } from "react";
import type { FormEvent } from "react";

type Lang = "ar" | "en";

type EmailDraft = {
  name: string;
  senderEmail: string;
  subject: string;
  message: string;
};

const copy = {
  ar: {
    nav: [
      ["عن الاسكا", "#about"],
      ["منتجاتنا", "#products"],
      ["التصنيع", "#process"],
      ["الجودة", "#quality"],
      ["تواصل معنا", "#contact"],
    ],
    since: "صناعة ليبية منذ 2019",
    location: "زليتن — ليبيا",
    eyebrow: "أكياس منسوجة للاستخدامات اليومية",
    heroTitleA: "ننسج القوة.",
    heroTitleB: "نحمي منتجك.",
    heroText:
      "شركة الاسكا لصناعة أكياس الأعلاف والأكياس المنسوجة، نقدم حلول تعبئة عملية للأرز والأعلاف والفحم والخضروات والأسمدة.",
    productsCta: "اكتشف المنتجات",
    contactCta: "تواصل معنا",
    statProducts: "فئات منتجات",
    statSince: "بداية العمل",
    statCity: "موقع المصنع",
    aboutLabel: "من نحن",
    aboutTitle: "صناعة محلية برؤية عملية",
    aboutText:
      "من مدينة زليتن، تعمل الاسكا على تصنيع الأكياس المنسوجة لتلبية احتياجات التعبئة في قطاعات الزراعة والغذاء والتجارة. نركز على المنتج المناسب، التنفيذ الواضح، والمتابعة في كل مرحلة.",
    aboutPill1: "خامة PP",
    aboutPill2: "حلول متعددة",
    aboutPill3: "متابعة الجودة",
    productsLabel: "منتجاتنا",
    productsTitle: "كيس مناسب لكل استخدام",
    productsText:
      "مجموعة من حلول التعبئة المنسوجة المخصصة للمنتجات الزراعية والغذائية والتجارية.",
    productNames: [
      "أكياس الأرز",
      "أكياس الأعلاف",
      "أكياس الفحم",
      "أكياس الخضروات",
      "أكياس السماد",
    ],
    viewProduct: "عرض الفئة",
    processLabel: "كيف نصنع",
    processTitle: "من الحبيبات إلى كيس جاهز",
    processText:
      "رحلة تصنيع مترابطة تحول خامات البولي بروبلين إلى نسيج عملي معد للتعبئة.",
    steps: [
      ["01", "تجهيز الخام", "تجهيز حبيبات البولي بروبلين للبدء في عملية الإنتاج."],
      ["02", "إنتاج الشرائط", "تشكيل الخام إلى شرائط متجانسة وتجهيزها للنسج."],
      ["03", "النسج والتجهيز", "نسج الشرائط وتشكيل الأكياس وفق فئة الاستخدام."],
      ["04", "الفحص النهائي", "متابعة العينات والتشطيب قبل تجهيز المنتج."],
    ],
    qualityLabel: "الجودة",
    qualityTitle: "العناية تبدأ من التفاصيل",
    qualityText:
      "تتم متابعة عينات الإنتاج خلال مراحل التجهيز، مع الاهتمام بانتظام النسيج والتشطيب وملاءمة الكيس للاستخدام المطلوب.",
    qualityPoints: ["متابعة العينات", "فحص النسيج", "مراجعة التشطيب"],
    mapLabel: "موقعنا",
    mapTitle: "في قلب زليتن",
    mapText: "المحلة السبعة، زليتن، ليبيا",
    mapCta: "افتح الموقع على الخريطة",
    contactLabel: "لنتحدث",
    contactTitle: "تبحث عن حل تعبئة مناسب؟",
    contactText: "تواصل مع الاسكا للاستفسار عن فئات الأكياس المتاحة.",
    call: "اتصل الآن",
    whatsapp: "واتساب",
    email: "البريد الإلكتروني",
    footerText: "شركة الاسكا لصناعة أكياس الأعلاف",
    rights: "جميع الحقوق محفوظة",
  },
  en: {
    nav: [
      ["About", "#about"],
      ["Products", "#products"],
      ["Process", "#process"],
      ["Quality", "#quality"],
      ["Contact", "#contact"],
    ],
    since: "Made in Libya since 2019",
    location: "Zliten — Libya",
    eyebrow: "Woven packaging for everyday industries",
    heroTitleA: "Woven for strength.",
    heroTitleB: "Built for your product.",
    heroText:
      "Alaska Company manufactures feed bags and woven packaging solutions for rice, animal feed, charcoal, vegetables and fertilizers.",
    productsCta: "Explore products",
    contactCta: "Contact us",
    statProducts: "Product categories",
    statSince: "Established",
    statCity: "Factory location",
    aboutLabel: "About Alaska",
    aboutTitle: "Local manufacturing. Practical thinking.",
    aboutText:
      "Based in Zliten, Alaska manufactures woven bags for agriculture, food and trade. We focus on a suitable product, clear execution and close attention throughout the process.",
    aboutPill1: "PP material",
    aboutPill2: "Multiple solutions",
    aboutPill3: "Quality follow-up",
    productsLabel: "Our products",
    productsTitle: "The right bag for every use",
    productsText:
      "A focused range of woven packaging solutions for agricultural, food and commercial products.",
    productNames: [
      "Rice bags",
      "Feed bags",
      "Charcoal bags",
      "Vegetable bags",
      "Fertilizer bags",
    ],
    viewProduct: "View category",
    processLabel: "Our process",
    processTitle: "From pellets to a finished bag",
    processText:
      "A connected manufacturing journey that turns polypropylene material into practical woven packaging.",
    steps: [
      ["01", "Material preparation", "Polypropylene pellets are prepared for the production process."],
      ["02", "Tape production", "Material is formed into consistent tapes ready for weaving."],
      ["03", "Weaving & forming", "Tapes are woven and bags are formed for each application."],
      ["04", "Final inspection", "Samples and finishing are reviewed before preparation."],
    ],
    qualityLabel: "Quality",
    qualityTitle: "Care begins with the details",
    qualityText:
      "Production samples are followed through preparation, with attention to weave consistency, finishing and suitability for the intended use.",
    qualityPoints: ["Sample follow-up", "Weave inspection", "Finishing review"],
    mapLabel: "Find us",
    mapTitle: "At the heart of Zliten",
    mapText: "Al Sabaa, Zliten, Libya",
    mapCta: "Open in Google Maps",
    contactLabel: "Let’s talk",
    contactTitle: "Looking for the right packaging solution?",
    contactText: "Contact Alaska to ask about our available bag categories.",
    call: "Call now",
    whatsapp: "WhatsApp",
    email: "Email us",
    footerText: "Alaska Company — For the manufacture of feed bags",
    rights: "All rights reserved",
  },
};

const products = [
  "/product-rice.webp",
  "/product-feed.webp",
  "/product-charcoal.webp",
  "/product-vegetables.webp",
  "/product-fertilizer.webp",
];

export default function Home() {
  const [lang, setLang] = useState<Lang>("ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [emailDraft, setEmailDraft] = useState<EmailDraft | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight - 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const t = copy[lang];
  const isAr = lang === "ar";

  const closeMenu = () => setMenuOpen(false);

  const prepareEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setEmailDraft({
      name: String(form.get("name") || ""),
      senderEmail: String(form.get("email") || ""),
      subject: String(form.get("subject") || ""),
      message: String(form.get("message") || ""),
    });
  };

  const openEmailPlatform = (platform: "gmail" | "outlook" | "yahoo" | "default") => {
    if (!emailDraft) return;
    const body = `${isAr ? "الاسم" : "Name"}: ${emailDraft.name}\n${isAr ? "البريد" : "Email"}: ${emailDraft.senderEmail}\n\n${emailDraft.message}`;
    const to = "abdallhmansur68@gmail.com";
    const subject = encodeURIComponent(emailDraft.subject);
    const encodedBody = encodeURIComponent(body);
    const links = {
      gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${encodedBody}`,
      outlook: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${subject}&body=${encodedBody}`,
      yahoo: `https://compose.mail.yahoo.com/?to=${to}&subject=${subject}&body=${encodedBody}`,
      default: `mailto:${to}?subject=${subject}&body=${encodedBody}`,
    };
    window.open(links[platform], "_blank", "noopener,noreferrer");
    setEmailDraft(null);
  };

  return (
    <main className="site-shell" dir={isAr ? "rtl" : "ltr"} lang={lang}>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>{t.since}</span>
          <span className="topbar-dot" aria-hidden="true" />
          <span>{t.location}</span>
        </div>
      </div>

      <header className="header">
        <div className="container nav-wrap">
          <a className="brand" href="#top" aria-label="Alaska home">
            <img src="/alaska-logo.webp" alt={isAr ? "شعار شركة الاسكا" : "Alaska Company logo"} />
            <span>
              <strong>ALASKA</strong>
              <small>{isAr ? "صناعة أكياس الأعلاف" : "Woven bag manufacturing"}</small>
            </span>
          </a>

          <nav className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
            {t.nav.map(([label, href]) => (
              <a key={href} href={href} onClick={closeMenu} className={isAr && label.includes("الاسكا") ? "alaska-ar" : undefined}>{label}</a>
            ))}
          </nav>

          <div className="nav-actions">
            <button className="lang-switch" onClick={() => setLang(isAr ? "en" : "ar")} aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}>
              {isAr ? "EN" : "عربي"}
            </button>
            <button className={`menu-toggle ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true">
          <img src={isAr ? "/hero-factory-v2.png" : "/hero-factory-en.jpg"} alt="" />
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-pattern" aria-hidden="true" />
        <div className="container hero-content">
          <div className="hero-copy">
            <p className="eyebrow light"><span />{t.eyebrow}</p>
            <h1><span>{t.heroTitleA}</span><em>{t.heroTitleB}</em></h1>
            <p className={`hero-text ${isAr ? "alaska-ar" : ""}`}>{t.heroText}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#products">{t.productsCta}<span aria-hidden="true">↗</span></a>
              <a className="btn btn-ghost" href="#contact">{t.contactCta}</a>
            </div>
          </div>
          <div className="hero-seal" aria-label={t.since}>
            <span>ALASKA</span>
            <strong>2019</strong>
            <small>ZLITEN · LIBYA</small>
          </div>
        </div>
        <a href="#about" className="scroll-cue" aria-label="Scroll to about"><span /></a>
      </section>

      <section className="stats-band" aria-label="Company highlights">
        <div className="container stats-grid">
          <div><strong>05</strong><span>{t.statProducts}</span></div>
          <div><strong>2019</strong><span>{t.statSince}</span></div>
          <div><strong>{isAr ? "زليتن" : "Zliten"}</strong><span>{t.statCity}</span></div>
        </div>
      </section>

      <section className="section about" id="about">
        <div className="container split-grid">
          <div className="media-card reveal-frame">
            <img src="/production-line.webp" alt={isAr ? "خط إنتاج صناعي للأكياس المنسوجة" : "Industrial woven bag production line"} />
            <div className="image-note"><span>01</span>{isAr ? "صناعة وتشكيل" : "Manufacture & form"}</div>
          </div>
          <div className="section-copy">
            <p className="eyebrow"><span />{t.aboutLabel}</p>
            <h2>{t.aboutTitle}</h2>
            <p className={`lead ${isAr ? "alaska-ar" : ""}`}>{t.aboutText}</p>
            <div className="pill-row">
              <span>{t.aboutPill1}</span><span>{t.aboutPill2}</span><span>{t.aboutPill3}</span>
            </div>
            <div className="signature-row">
              <img src="/alaska-logo.webp" alt="" />
              <div><strong>ALASKA</strong><small>{t.since}</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section products" id="products">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow"><span />{t.productsLabel}</p>
              <h2>{t.productsTitle}</h2>
            </div>
            <p>{t.productsText}</p>
          </div>
          <div className="product-grid">
            {products.map((image, index) => (
              <article className="product-card" key={image}>
                <div className="product-image"><img src={image} alt={t.productNames[index]} /></div>
                <div className="product-meta">
                  <span>0{index + 1}</span>
                  <h3>{t.productNames[index]}</h3>
                  <a href="#contact" aria-label={`${t.viewProduct}: ${t.productNames[index]}`}>{t.viewProduct}<i aria-hidden="true">↗</i></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process" id="process">
        <div className="process-bg" aria-hidden="true"><img src="/weaving-line.webp" alt="" /></div>
        <div className="process-overlay" aria-hidden="true" />
        <div className="container process-inner">
          <div className="process-intro">
            <p className="eyebrow light"><span />{t.processLabel}</p>
            <h2>{t.processTitle}</h2>
            <p>{t.processText}</p>
          </div>
          <div className="steps-list">
            {t.steps.map(([number, title, text]) => (
              <article className="step" key={number}>
                <span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><i aria-hidden="true">→</i>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section quality" id="quality">
        <div className="container split-grid quality-grid">
          <div className="section-copy">
            <p className="eyebrow"><span />{t.qualityLabel}</p>
            <h2>{t.qualityTitle}</h2>
            <p className="lead">{t.qualityText}</p>
            <ul className="quality-list">
              {t.qualityPoints.map((point, index) => <li key={point}><span>0{index + 1}</span>{point}</li>)}
            </ul>
          </div>
          <div className="quality-visual">
            <img src="/quality-sample.webp" alt={isAr ? "متابعة عينة كيس منسوج أثناء فحص الجودة" : "Woven bag sample during quality follow-up"} />
            <div className="quality-badge"><strong>QC</strong><span>{isAr ? "متابعة الجودة" : "Quality follow-up"}</span></div>
          </div>
        </div>
      </section>

      <section className="location" id="location">
        <div className="location-grid" aria-hidden="true" />
        <div className="container location-section-head">
          <h2>{isAr ? "موقع المصنع" : "Factory location"}</h2>
        </div>
        <div className="container location-layout">
          <div className="map-frame">
            <iframe
              src="https://www.google.com/maps?q=32.4037500,14.5859167&z=15&output=embed"
              title={isAr ? "موقع مصنع الاسكا على الخريطة" : "Alaska factory location on the map"}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="location-card">
            <h3>{isAr ? "تفاصيل الموقع" : "Location details"}</h3>
            <p>{isAr ? "محلة السبعة، زليتن، ليبيا" : t.mapText}</p>
            <div className="coordinates">
              <small>32.4037500° N</small><small>14.5859167° E</small>
            </div>
            <a className="map-button" href="https://www.google.com/maps?q=32.4037500,14.5859167" target="_blank" rel="noreferrer">
              <span className="map-pin" aria-hidden="true" />{t.mapCta}<i aria-hidden="true">↗</i>
            </a>
          </div>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="container email-contact">
          <div className="email-contact-head">
            <p className="eyebrow light"><span />{isAr ? "تواصل معنا" : "Connect"}</p>
            <h2><strong>{isAr ? "تواصل" : "Connect"}</strong><em>{isAr ? "عبر البريد" : "Via Email"}</em></h2>
            <p>{isAr ? "اكتب رسالتك، ثم اختر منصة البريد التي تفضل إرسالها من خلالها." : "Write your message, then choose the email platform you prefer."}</p>
          </div>
          <form className="email-form" onSubmit={prepareEmail}>
            <div className="email-form-row">
              <label><span>{isAr ? "الاسم" : "Name"}</span><input name="name" type="text" autoComplete="name" required /></label>
              <label><span>{isAr ? "البريد الإلكتروني" : "Email"}</span><input name="email" type="email" autoComplete="email" dir="ltr" required /></label>
            </div>
            <label><span>{isAr ? "الموضوع" : "Subject"}</span><input name="subject" type="text" required /></label>
            <label><span>{isAr ? "الرسالة" : "Message"}</span><textarea name="message" rows={7} required /></label>
            <button type="submit">{isAr ? "تجهيز الرسالة" : "Prepare email"}<i aria-hidden="true">↗</i></button>
          </form>
          <div className="email-direct">
            <a href="tel:+218912182998" dir="ltr">091 218 2998</a>
            <a href="https://wa.me/218923142069" target="_blank" rel="noreferrer" dir="ltr">WhatsApp +218 92 314 2069</a>
            <a href="mailto:abdallhmansur68@gmail.com" dir="ltr">abdallhmansur68@gmail.com</a>
          </div>
        </div>
        {emailDraft && (
          <div className="email-modal" role="dialog" aria-modal="true" aria-labelledby="email-platform-title">
            <button className="email-modal-backdrop" type="button" onClick={() => setEmailDraft(null)} aria-label={isAr ? "إغلاق" : "Close"} />
            <div className="email-modal-card">
              <button className="email-modal-close" type="button" onClick={() => setEmailDraft(null)} aria-label={isAr ? "إغلاق" : "Close"}>×</button>
              <small>{isAr ? "الرسالة جاهزة" : "Your email is ready"}</small>
              <h3 id="email-platform-title">{isAr ? "بأي منصة بريد تود إرسالها؟" : "Which email platform would you like to use?"}</h3>
              <div className="email-platforms">
                <button type="button" onClick={() => openEmailPlatform("gmail")}><b>G</b><span>Gmail</span></button>
                <button type="button" onClick={() => openEmailPlatform("outlook")}><b>O</b><span>Outlook</span></button>
                <button type="button" onClick={() => openEmailPlatform("yahoo")}><b>Y!</b><span>Yahoo Mail</span></button>
                <button type="button" onClick={() => openEmailPlatform("default")}><b>✉</b><span>{isAr ? "تطبيق البريد" : "Mail app"}</span></button>
              </div>
              <p>{isAr ? "سيتم فتح رسالة جديدة تحتوي على البيانات التي أدخلتها." : "A new message will open with the details you entered."}</p>
            </div>
          </div>
        )}
        <div className="container contact-grid">
          <div className="contact-title">
            <p className="eyebrow"><span />{t.contactLabel}</p>
            <h2>{t.contactTitle}</h2>
            <p className={isAr ? "alaska-ar" : undefined}>{t.contactText}</p>
          </div>
          <div className="contact-links">
            <a href="tel:+218912182998"><span>{t.call}</span><strong dir="ltr">091 218 2998</strong><i>↗</i></a>
            <a href="https://wa.me/218923142069" target="_blank" rel="noreferrer"><span>{t.whatsapp}</span><strong dir="ltr">+218 92 314 2069</strong><i>↗</i></a>
            <a href="mailto:abdallhmansur68@gmail.com"><span>{t.email}</span><strong dir="ltr">abdallhmansur68@gmail.com</strong><i>↗</i></a>
          </div>
          <div className="other-phones" dir="ltr">
            <a href="tel:+218942699733">094 269 9733</a>
            <a href="tel:+218912172998">091 217 2998</a>
            <a href="tel:+218913142069">091 314 2069</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-main">
          <div className="footer-brand"><img src="/alaska-logo.webp" alt="" /><div><strong>ALASKA</strong><span className={isAr ? "alaska-ar" : undefined}>{t.footerText}</span></div></div>
          <a href="#top" className={`back-top ${showScrollTop ? "is-visible" : ""}`} aria-label="Back to top">↑</a>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} ALASKA. {t.rights}</span><span>alaska.ly</span></div>
      </footer>
    </main>
  );
}
