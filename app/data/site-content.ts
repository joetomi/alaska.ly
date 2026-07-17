export type SiteLanguage = "ar" | "en";
export type SiteDirection = "rtl" | "ltr";

export type TitleParts = {
  readonly primary: string;
  readonly accent: string;
};

export type NavigationItem = {
  readonly label: string;
  readonly href: string;
  readonly previewImage: string;
  readonly previewAlt: string;
};

export type StrengthItem = {
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly tone: "neon" | "amber" | "dark";
};

export type ProductItem = {
  readonly number: string;
  readonly name: string;
  readonly image: string;
  readonly alt: string;
  readonly cta: string;
};

export type ProcessStep = {
  readonly number: string;
  readonly title: string;
  readonly description: string;
};

export type QualityPoint = {
  readonly number: string;
  readonly label: string;
};

export type ContactChannel = {
  readonly label: string;
  readonly value: string;
  readonly href: string;
  readonly external?: boolean;
};

export type EmailPlatform = {
  readonly id: "gmail" | "outlook" | "yahoo" | "default";
  readonly label: string;
  readonly shortLabel: string;
};

export type SiteContent = {
  readonly language: SiteLanguage;
  readonly direction: SiteDirection;
  readonly languageName: string;
  readonly languageSwitchLabel: string;
  readonly brand: {
    readonly name: string;
    readonly descriptor: string;
    readonly logoAlt: string;
    readonly since: string;
    readonly location: string;
  };
  readonly preloader: {
    readonly label: string;
    readonly ariaLabel: string;
  };
  readonly navigation: {
    readonly ariaLabel: string;
    readonly panelLabel: string;
    readonly menuLabel: string;
    readonly closeLabel: string;
    readonly languageAriaLabel: string;
    readonly meta: readonly string[];
    readonly items: readonly NavigationItem[];
  };
  readonly hero: {
    readonly eyebrow: string;
    readonly title: TitleParts;
    readonly description: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly image: string;
    readonly imageAlt: string;
    readonly scrollLabel: string;
    readonly sealLabel: string;
    readonly sealLocation: string;
  };
  readonly marquee: {
    readonly ariaLabel: string;
    readonly words: readonly string[];
  };
  readonly statistics: readonly {
    readonly value: string;
    readonly label: string;
  }[];
  readonly about: {
    readonly label: string;
    readonly title: TitleParts;
    readonly description: string;
    readonly image: string;
    readonly imageAlt: string;
    readonly imageNote: string;
    readonly highlights: readonly string[];
  };
  readonly strengths: {
    readonly label: string;
    readonly title: TitleParts;
    readonly description: string;
    readonly items: readonly StrengthItem[];
  };
  readonly products: {
    readonly label: string;
    readonly title: TitleParts;
    readonly description: string;
    readonly items: readonly ProductItem[];
  };
  readonly process: {
    readonly label: string;
    readonly title: TitleParts;
    readonly description: string;
    readonly image: string;
    readonly imageAlt: string;
    readonly steps: readonly ProcessStep[];
  };
  readonly quality: {
    readonly label: string;
    readonly title: TitleParts;
    readonly description: string;
    readonly image: string;
    readonly imageAlt: string;
    readonly badge: string;
    readonly points: readonly QualityPoint[];
  };
  readonly location: {
    readonly label: string;
    readonly title: TitleParts;
    readonly introTitle: string;
    readonly cardTitle: string;
    readonly address: string;
    readonly coordinatesLabel: string;
    readonly latitude: string;
    readonly longitude: string;
    readonly mapCta: string;
    readonly mapTitle: string;
  };
  readonly contact: {
    readonly label: string;
    readonly title: TitleParts;
    readonly description: string;
    readonly inquiryLabel: string;
    readonly inquiryTitle: string;
    readonly inquiryDescription: string;
    readonly form: {
      readonly nameLabel: string;
      readonly emailLabel: string;
      readonly subjectLabel: string;
      readonly messageLabel: string;
      readonly submitLabel: string;
    };
    readonly channels: readonly ContactChannel[];
    readonly additionalPhonesLabel: string;
    readonly additionalPhones: readonly ContactChannel[];
  };
  readonly emailModal: {
    readonly readyLabel: string;
    readonly title: string;
    readonly description: string;
    readonly closeLabel: string;
    readonly platforms: readonly EmailPlatform[];
  };
  readonly footer: {
    readonly title: string;
    readonly companyDescription: string;
    readonly addressLabel: string;
    readonly phoneLabel: string;
    readonly whatsappLabel: string;
    readonly emailLabel: string;
    readonly websiteLabel: string;
    readonly rights: string;
    readonly tagline: string;
    readonly backToTopLabel: string;
  };
};

export const siteDetails = {
  establishedYear: "2019",
  phone: {
    display: "091 218 2998",
    internationalDisplay: "+218 91 218 2998",
    href: "tel:+218912182998",
  },
  whatsapp: {
    display: "+218 92 314 2069",
    href: "https://wa.me/218923142069",
  },
  email: {
    display: "abdallhmansur68@gmail.com",
    href: "mailto:abdallhmansur68@gmail.com",
  },
  additionalPhones: [
    { display: "094 269 9733", href: "tel:+218942699733" },
    { display: "091 217 2998", href: "tel:+218912172998" },
    { display: "091 314 2069", href: "tel:+218913142069" },
  ],
  coordinates: {
    latitude: "32.4037500° N",
    longitude: "14.5859167° E",
    value: "32.4037500,14.5859167",
  },
  mapEmbedUrl:
    "https://www.google.com/maps?q=32.4037500,14.5859167&z=15&output=embed",
  mapUrl: "https://www.google.com/maps?q=32.4037500,14.5859167",
  website: "alaska.ly",
} as const;

export const siteContent = {
  ar: {
    language: "ar",
    direction: "rtl",
    languageName: "العربية",
    languageSwitchLabel: "EN",
    brand: {
      name: "ALASKA",
      descriptor: "صناعة أكياس الأعلاف والأكياس المنسوجة",
      logoAlt: "شعار شركة الاسكا",
      since: "صناعة ليبية منذ 2019",
      location: "زليتن — ليبيا",
    },
    preloader: {
      label: "جاري تحميل تجربة ألاسكا",
      ariaLabel: "جاري تحميل موقع ألاسكا",
    },
    navigation: {
      ariaLabel: "التنقل الرئيسي",
      panelLabel: "قائمة الموقع",
      menuLabel: "القائمة",
      closeLabel: "إغلاق",
      languageAriaLabel: "Switch to English",
      meta: ["صناعة ليبية منذ 2019", "زليتن — ليبيا"],
      items: [
        {
          label: "الرئيسية",
          href: "#top",
          previewImage: "/menu-home-preview.jpg",
          previewAlt: "مصنع الاسكا",
        },
        {
          label: "من نحن",
          href: "#about",
          previewImage: "/production-line.webp",
          previewAlt: "خط إنتاج الأكياس المنسوجة",
        },
        {
          label: "نقاط القوة",
          href: "#strengths",
          previewImage: "/alaska-logo.webp",
          previewAlt: "شعار شركة الاسكا",
        },
        {
          label: "منتجاتنا",
          href: "#products",
          previewImage: "/product-rice.webp",
          previewAlt: "أحد منتجات أكياس الاسكا",
        },
        {
          label: "التصنيع",
          href: "#process",
          previewImage: "/weaving-line.webp",
          previewAlt: "خط نسج الأكياس",
        },
        {
          label: "الجودة",
          href: "#quality",
          previewImage: "/quality-sample.webp",
          previewAlt: "فحص عينة من الأكياس المنسوجة",
        },
        {
          label: "موقع المصنع",
          href: "#location",
          previewImage: "/menu-location-preview.jpg",
          previewAlt: "مصنع الاسكا في زليتن",
        },
        {
          label: "تواصل معنا",
          href: "#contact",
          previewImage: "/hero-factory-v2.png",
          previewAlt: "شركة الاسكا",
        },
      ],
    },
    hero: {
      eyebrow: "أكياس منسوجة للاستخدامات اليومية",
      title: {
        primary: "شركة الاسكا",
        accent: "لصناعة أكياس الأعلاف",
      },
      description:
        "شركة الاسكا لصناعة أكياس الأعلاف والأكياس المنسوجة، نقدم حلول تعبئة عملية للأرز والأعلاف والفحم والخضروات والأسمدة.",
      primaryCta: "اكتشف المنتجات",
      secondaryCta: "تواصل معنا",
      image: "/hero-factory-v2.png",
      imageAlt: "مصنع الاسكا لصناعة الأكياس المنسوجة",
      scrollLabel: "انتقل إلى قسم من نحن",
      sealLabel: "صناعة ليبية منذ 2019",
      sealLocation: "زليتن · ليبيا",
    },
    marquee: {
      ariaLabel: "قيم الاسكا",
      words: ["صناعة", "جودة", "متانة", "تعبئة", "ثقة"],
    },
    statistics: [
      { value: "05", label: "فئات منتجات" },
      { value: "2019", label: "بداية العمل" },
      { value: "زليتن", label: "موقع المصنع" },
    ],
    about: {
      label: "من نحن",
      title: {
        primary: "صناعة محلية",
        accent: "برؤية عملية",
      },
      description:
        "من مدينة زليتن، تعمل الاسكا على تصنيع الأكياس المنسوجة لتلبية احتياجات التعبئة في قطاعات الزراعة والغذاء والتجارة. نركز على المنتج المناسب، التنفيذ الواضح، والمتابعة في كل مرحلة.",
      image: "/production-line.webp",
      imageAlt: "خط إنتاج صناعي للأكياس المنسوجة",
      imageNote: "صناعة وتشكيل",
      highlights: ["خامة PP", "حلول متعددة", "متابعة الجودة"],
    },
    strengths: {
      label: "نقاط قوتنا",
      title: {
        primary: "حقائق تصنع",
        accent: "ثقة عملية",
      },
      description:
        "أساس عملنا واضح: تصنيع محلي، خامة مناسبة، منتجات متعددة، ومتابعة مستمرة من زليتن.",
      items: [
        {
          number: "01",
          title: "صناعة ليبية منذ 2019",
          description: "بدأت الاسكا عملها في ليبيا عام 2019.",
          tone: "neon",
        },
        {
          number: "02",
          title: "خامة بولي بروبلين PP",
          description: "خامة مهيأة لصناعة أكياس منسوجة للاستخدامات المطلوبة.",
          tone: "dark",
        },
        {
          number: "03",
          title: "خمس فئات منتجات",
          description: "حلول للأرز والأعلاف والفحم والخضروات والأسمدة.",
          tone: "amber",
        },
        {
          number: "04",
          title: "حلول تعبئة متعددة",
          description: "أكياس منسوجة لقطاعات الزراعة والغذاء والتجارة.",
          tone: "dark",
        },
        {
          number: "05",
          title: "متابعة الجودة",
          description: "متابعة العينات والنسيج والتشطيب خلال التجهيز.",
          tone: "neon",
        },
        {
          number: "06",
          title: "مصنع في زليتن",
          description: "يقع مصنع الاسكا في محلة السبعة بمدينة زليتن.",
          tone: "dark",
        },
      ],
    },
    products: {
      label: "منتجاتنا",
      title: {
        primary: "كيس مناسب",
        accent: "لكل استخدام",
      },
      description:
        "مجموعة من حلول التعبئة المنسوجة المخصصة للمنتجات الزراعية والغذائية والتجارية.",
      items: [
        {
          number: "01",
          name: "أكياس الأرز",
          image: "/product-rice.webp",
          alt: "أكياس الأرز من الاسكا",
          cta: "عرض الفئة",
        },
        {
          number: "02",
          name: "أكياس الأعلاف",
          image: "/product-feed.webp",
          alt: "أكياس الأعلاف من الاسكا",
          cta: "عرض الفئة",
        },
        {
          number: "03",
          name: "أكياس الفحم",
          image: "/product-charcoal.webp",
          alt: "أكياس الفحم من الاسكا",
          cta: "عرض الفئة",
        },
        {
          number: "04",
          name: "أكياس الخضروات",
          image: "/product-vegetables.webp",
          alt: "أكياس الخضروات من الاسكا",
          cta: "عرض الفئة",
        },
        {
          number: "05",
          name: "أكياس السماد",
          image: "/product-fertilizer.webp",
          alt: "أكياس السماد من الاسكا",
          cta: "عرض الفئة",
        },
      ],
    },
    process: {
      label: "كيف نصنع",
      title: {
        primary: "من الحبيبات",
        accent: "إلى كيس جاهز",
      },
      description:
        "رحلة تصنيع مترابطة تحول خامات البولي بروبلين إلى نسيج عملي معد للتعبئة.",
      image: "/weaving-line.webp",
      imageAlt: "خط نسج الأكياس في مصنع الاسكا",
      steps: [
        {
          number: "01",
          title: "تجهيز الخام",
          description: "تجهيز حبيبات البولي بروبلين للبدء في عملية الإنتاج.",
        },
        {
          number: "02",
          title: "إنتاج الشرائط",
          description: "تشكيل الخام إلى شرائط متجانسة وتجهيزها للنسج.",
        },
        {
          number: "03",
          title: "النسج والتجهيز",
          description: "نسج الشرائط وتشكيل الأكياس وفق فئة الاستخدام.",
        },
        {
          number: "04",
          title: "الفحص النهائي",
          description: "متابعة العينات والتشطيب قبل تجهيز المنتج.",
        },
      ],
    },
    quality: {
      label: "الجودة",
      title: {
        primary: "العناية تبدأ",
        accent: "من التفاصيل",
      },
      description:
        "تتم متابعة عينات الإنتاج خلال مراحل التجهيز، مع الاهتمام بانتظام النسيج والتشطيب وملاءمة الكيس للاستخدام المطلوب.",
      image: "/quality-sample.webp",
      imageAlt: "متابعة عينة كيس منسوج أثناء فحص الجودة",
      badge: "متابعة الجودة",
      points: [
        { number: "01", label: "متابعة العينات" },
        { number: "02", label: "فحص النسيج" },
        { number: "03", label: "مراجعة التشطيب" },
      ],
    },
    location: {
      label: "موقعنا",
      title: {
        primary: "موقع",
        accent: "المصنع",
      },
      introTitle: "في قلب زليتن",
      cardTitle: "تفاصيل الموقع",
      address: "محلة السبعة، زليتن، ليبيا",
      coordinatesLabel: "إحداثيات المصنع",
      latitude: siteDetails.coordinates.latitude,
      longitude: siteDetails.coordinates.longitude,
      mapCta: "افتح الموقع على الخريطة",
      mapTitle: "موقع مصنع الاسكا على الخريطة",
    },
    contact: {
      label: "تواصل معنا",
      title: {
        primary: "تواصل",
        accent: "عبر البريد",
      },
      description:
        "اكتب رسالتك، ثم اختر منصة البريد التي تفضل إرسالها من خلالها.",
      inquiryLabel: "لنتحدث",
      inquiryTitle: "تبحث عن حل تعبئة مناسب؟",
      inquiryDescription:
        "تواصل مع الاسكا للاستفسار عن فئات الأكياس المتاحة.",
      form: {
        nameLabel: "الاسم",
        emailLabel: "البريد الإلكتروني",
        subjectLabel: "الموضوع",
        messageLabel: "الرسالة",
        submitLabel: "تجهيز الرسالة",
      },
      channels: [
        {
          label: "الهاتف",
          value: siteDetails.phone.display,
          href: siteDetails.phone.href,
        },
        {
          label: "واتساب",
          value: siteDetails.whatsapp.display,
          href: siteDetails.whatsapp.href,
          external: true,
        },
        {
          label: "البريد الإلكتروني",
          value: siteDetails.email.display,
          href: siteDetails.email.href,
        },
      ],
      additionalPhonesLabel: "أرقام اتصال إضافية",
      additionalPhones: siteDetails.additionalPhones.map((phone) => ({
        label: "هاتف إضافي",
        value: phone.display,
        href: phone.href,
      })),
    },
    emailModal: {
      readyLabel: "الرسالة جاهزة",
      title: "بأي منصة بريد تود إرسالها؟",
      description: "سيتم فتح رسالة جديدة تحتوي على البيانات التي أدخلتها.",
      closeLabel: "إغلاق نافذة اختيار البريد",
      platforms: [
        { id: "gmail", label: "Gmail", shortLabel: "G" },
        { id: "outlook", label: "Outlook", shortLabel: "O" },
        { id: "yahoo", label: "Yahoo Mail", shortLabel: "Y!" },
        { id: "default", label: "تطبيق البريد", shortLabel: "✉" },
      ],
    },
    footer: {
      title: "تواصل معنا",
      companyDescription: "شركة الاسكا لصناعة أكياس الأعلاف والأكياس المنسوجة",
      addressLabel: "العنوان",
      phoneLabel: "الهاتف",
      whatsappLabel: "واتساب",
      emailLabel: "البريد الإلكتروني",
      websiteLabel: "الموقع الإلكتروني",
      rights: "جميع الحقوق محفوظة",
      tagline: "ننسج القوة. نحمي منتجك.",
      backToTopLabel: "العودة إلى أعلى الصفحة",
    },
  },
  en: {
    language: "en",
    direction: "ltr",
    languageName: "English",
    languageSwitchLabel: "عربي",
    brand: {
      name: "ALASKA",
      descriptor: "Feed bag and woven packaging manufacturing",
      logoAlt: "Alaska Company logo",
      since: "Made in Libya since 2019",
      location: "Zliten — Libya",
    },
    preloader: {
      label: "LOADING ALASKA EXPERIENCE",
      ariaLabel: "Loading the Alaska website",
    },
    navigation: {
      ariaLabel: "Primary navigation",
      panelLabel: "Site menu",
      menuLabel: "MENU",
      closeLabel: "CLOSE",
      languageAriaLabel: "التبديل إلى العربية",
      meta: ["Made in Libya since 2019", "Zliten — Libya"],
      items: [
        {
          label: "Home",
          href: "#top",
          previewImage: "/menu-home-preview.jpg",
          previewAlt: "Alaska factory",
        },
        {
          label: "About",
          href: "#about",
          previewImage: "/production-line.webp",
          previewAlt: "Woven bag production line",
        },
        {
          label: "Strengths",
          href: "#strengths",
          previewImage: "/alaska-logo.webp",
          previewAlt: "Alaska Company logo",
        },
        {
          label: "Products",
          href: "#products",
          previewImage: "/product-rice.webp",
          previewAlt: "An Alaska woven bag product",
        },
        {
          label: "Process",
          href: "#process",
          previewImage: "/weaving-line.webp",
          previewAlt: "Bag weaving line",
        },
        {
          label: "Quality",
          href: "#quality",
          previewImage: "/quality-sample.webp",
          previewAlt: "Woven bag sample inspection",
        },
        {
          label: "Factory location",
          href: "#location",
          previewImage: "/menu-location-preview.jpg",
          previewAlt: "Alaska factory in Zliten",
        },
        {
          label: "Contact",
          href: "#contact",
          previewImage: "/hero-factory-en.jpg",
          previewAlt: "Alaska Company",
        },
      ],
    },
    hero: {
      eyebrow: "Woven packaging for everyday industries",
      title: {
        primary: "WOVEN FOR STRENGTH.",
        accent: "BUILT FOR YOUR PRODUCT.",
      },
      description:
        "Alaska Company manufactures feed bags and woven packaging solutions for rice, animal feed, charcoal, vegetables and fertilizers.",
      primaryCta: "Explore products",
      secondaryCta: "Contact us",
      image: "/hero-factory-en.jpg",
      imageAlt: "Alaska woven bag factory",
      scrollLabel: "Scroll to the About section",
      sealLabel: "Made in Libya since 2019",
      sealLocation: "ZLITEN · LIBYA",
    },
    marquee: {
      ariaLabel: "Alaska values",
      words: ["INDUSTRY", "QUALITY", "DURABILITY", "PACKAGING", "TRUST"],
    },
    statistics: [
      { value: "05", label: "Product categories" },
      { value: "2019", label: "Established" },
      { value: "Zliten", label: "Factory location" },
    ],
    about: {
      label: "About Alaska",
      title: {
        primary: "Local manufacturing.",
        accent: "Practical thinking.",
      },
      description:
        "Based in Zliten, Alaska manufactures woven bags for agriculture, food and trade. We focus on a suitable product, clear execution and close attention throughout the process.",
      image: "/production-line.webp",
      imageAlt: "Industrial woven bag production line",
      imageNote: "Manufacture & form",
      highlights: ["PP material", "Multiple solutions", "Quality follow-up"],
    },
    strengths: {
      label: "Our strengths",
      title: {
        primary: "Practical facts.",
        accent: "Built on trust.",
      },
      description:
        "Our foundation is clear: local manufacturing, suitable material, multiple products and close follow-up from Zliten.",
      items: [
        {
          number: "01",
          title: "Made in Libya since 2019",
          description: "Alaska began operating in Libya in 2019.",
          tone: "neon",
        },
        {
          number: "02",
          title: "Polypropylene PP material",
          description: "Material prepared for woven bags across the intended uses.",
          tone: "dark",
        },
        {
          number: "03",
          title: "Five product categories",
          description: "Solutions for rice, feed, charcoal, vegetables and fertilizers.",
          tone: "amber",
        },
        {
          number: "04",
          title: "Multiple packaging solutions",
          description: "Woven bags for agriculture, food and trade.",
          tone: "dark",
        },
        {
          number: "05",
          title: "Quality follow-up",
          description: "Samples, weaving and finishing are followed during preparation.",
          tone: "neon",
        },
        {
          number: "06",
          title: "Factory in Zliten",
          description: "The Alaska factory is located in Al Sabaa, Zliten.",
          tone: "dark",
        },
      ],
    },
    products: {
      label: "Our products",
      title: {
        primary: "The right bag",
        accent: "for every use",
      },
      description:
        "A focused range of woven packaging solutions for agricultural, food and commercial products.",
      items: [
        {
          number: "01",
          name: "Rice bags",
          image: "/product-rice.webp",
          alt: "Alaska rice bags",
          cta: "View category",
        },
        {
          number: "02",
          name: "Feed bags",
          image: "/product-feed.webp",
          alt: "Alaska feed bags",
          cta: "View category",
        },
        {
          number: "03",
          name: "Charcoal bags",
          image: "/product-charcoal.webp",
          alt: "Alaska charcoal bags",
          cta: "View category",
        },
        {
          number: "04",
          name: "Vegetable bags",
          image: "/product-vegetables.webp",
          alt: "Alaska vegetable bags",
          cta: "View category",
        },
        {
          number: "05",
          name: "Fertilizer bags",
          image: "/product-fertilizer.webp",
          alt: "Alaska fertilizer bags",
          cta: "View category",
        },
      ],
    },
    process: {
      label: "Our process",
      title: {
        primary: "From pellets",
        accent: "to a finished bag",
      },
      description:
        "A connected manufacturing journey that turns polypropylene material into practical woven packaging.",
      image: "/weaving-line.webp",
      imageAlt: "Bag weaving line at the Alaska factory",
      steps: [
        {
          number: "01",
          title: "Material preparation",
          description: "Polypropylene pellets are prepared for the production process.",
        },
        {
          number: "02",
          title: "Tape production",
          description: "Material is formed into consistent tapes ready for weaving.",
        },
        {
          number: "03",
          title: "Weaving & forming",
          description: "Tapes are woven and bags are formed for each application.",
        },
        {
          number: "04",
          title: "Final inspection",
          description: "Samples and finishing are reviewed before preparation.",
        },
      ],
    },
    quality: {
      label: "Quality",
      title: {
        primary: "Care begins",
        accent: "with the details",
      },
      description:
        "Production samples are followed through preparation, with attention to weave consistency, finishing and suitability for the intended use.",
      image: "/quality-sample.webp",
      imageAlt: "Woven bag sample during quality follow-up",
      badge: "Quality follow-up",
      points: [
        { number: "01", label: "Sample follow-up" },
        { number: "02", label: "Weave inspection" },
        { number: "03", label: "Finishing review" },
      ],
    },
    location: {
      label: "Find us",
      title: {
        primary: "Factory",
        accent: "location",
      },
      introTitle: "At the heart of Zliten",
      cardTitle: "Location details",
      address: "Al Sabaa, Zliten, Libya",
      coordinatesLabel: "Factory coordinates",
      latitude: siteDetails.coordinates.latitude,
      longitude: siteDetails.coordinates.longitude,
      mapCta: "Open in Google Maps",
      mapTitle: "Alaska factory location on the map",
    },
    contact: {
      label: "Connect",
      title: {
        primary: "Connect",
        accent: "Via Email",
      },
      description: "Write your message, then choose the email platform you prefer.",
      inquiryLabel: "Let’s talk",
      inquiryTitle: "Looking for the right packaging solution?",
      inquiryDescription: "Contact Alaska to ask about our available bag categories.",
      form: {
        nameLabel: "Name",
        emailLabel: "Email",
        subjectLabel: "Subject",
        messageLabel: "Message",
        submitLabel: "Prepare email",
      },
      channels: [
        {
          label: "Phone",
          value: siteDetails.phone.display,
          href: siteDetails.phone.href,
        },
        {
          label: "WhatsApp",
          value: siteDetails.whatsapp.display,
          href: siteDetails.whatsapp.href,
          external: true,
        },
        {
          label: "Email",
          value: siteDetails.email.display,
          href: siteDetails.email.href,
        },
      ],
      additionalPhonesLabel: "Additional phone numbers",
      additionalPhones: siteDetails.additionalPhones.map((phone) => ({
        label: "Additional phone",
        value: phone.display,
        href: phone.href,
      })),
    },
    emailModal: {
      readyLabel: "Your email is ready",
      title: "Which email platform would you like to use?",
      description: "A new message will open with the details you entered.",
      closeLabel: "Close the email platform dialog",
      platforms: [
        { id: "gmail", label: "Gmail", shortLabel: "G" },
        { id: "outlook", label: "Outlook", shortLabel: "O" },
        { id: "yahoo", label: "Yahoo Mail", shortLabel: "Y!" },
        { id: "default", label: "Mail app", shortLabel: "✉" },
      ],
    },
    footer: {
      title: "CONTACT US",
      companyDescription: "Alaska Company — Feed bag and woven packaging manufacturing",
      addressLabel: "Address",
      phoneLabel: "Phone",
      whatsappLabel: "WhatsApp",
      emailLabel: "Email",
      websiteLabel: "Website",
      rights: "All rights reserved",
      tagline: "WOVEN FOR STRENGTH. BUILT FOR YOUR PRODUCT.",
      backToTopLabel: "Back to the top",
    },
  },
} as const satisfies Record<SiteLanguage, SiteContent>;

export const defaultLanguage: SiteLanguage = "ar";
