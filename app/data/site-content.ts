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

export type RawMaterialItem = {
  readonly number: string;
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly imageWidth: number;
  readonly imageHeight: number;
};

export type ProcessStep = {
  readonly number: string;
  readonly title: string;
  readonly machine: string;
  readonly description: string;
  readonly result: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly imageWidth: number;
  readonly imageHeight: number;
  readonly imageLinkLabel: string;
};

export type FinishedProduct = {
  readonly label: string;
  readonly name: string;
  readonly description: string;
};

export type QualityPoint = {
  readonly number: string;
  readonly label: string;
};

export type QualityReading = {
  readonly value: string;
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
    readonly rawMaterials: {
      readonly label: string;
      readonly title: TitleParts;
      readonly items: readonly RawMaterialItem[];
    };
    readonly resultLabel: string;
    readonly steps: readonly ProcessStep[];
    readonly finishedProduct: FinishedProduct;
  };
  readonly quality: {
    readonly label: string;
    readonly title: TitleParts;
    readonly description: string;
    readonly image: string;
    readonly imageAlt: string;
    readonly imageWidth: number;
    readonly imageHeight: number;
    readonly imageLinkLabel: string;
    readonly badge: string;
    readonly reading: QualityReading;
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
      logoAlt: "شعار شركة ألاسكا",
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
          previewAlt: "مصنع ألاسكا",
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
          previewAlt: "شعار شركة ألاسكا",
        },
        {
          label: "منتجاتنا",
          href: "#products",
          previewImage: "/product-rice.webp",
          previewAlt: "أحد منتجات أكياس ألاسكا",
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
          previewAlt: "مصنع ألاسكا في زليتن",
        },
        {
          label: "تواصل معنا",
          href: "#contact",
          previewImage: "/hero-factory-v2.png",
          previewAlt: "شركة ألاسكا",
        },
      ],
    },
    hero: {
      eyebrow: "أكياس منسوجة للاستخدامات اليومية",
      title: {
        primary: "شركة ألاسكا",
        accent: "لصناعة أكياس الأعلاف",
      },
      description:
        "شركة ألاسكا لصناعة أكياس الأعلاف والأكياس المنسوجة، نقدم حلول تعبئة عملية للأرز والأعلاف والفحم والخضروات والأسمدة.",
      primaryCta: "اكتشف المنتجات",
      secondaryCta: "تواصل معنا",
      image: "/hero-factory-v2.png",
      imageAlt: "مصنع ألاسكا لصناعة الأكياس المنسوجة",
      scrollLabel: "انتقل إلى قسم من نحن",
      sealLabel: "صناعة ليبية منذ 2019",
      sealLocation: "زليتن · ليبيا",
    },
    marquee: {
      ariaLabel: "قيم ألاسكا",
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
        "من مدينة زليتن، تعمل ألاسكا على تصنيع الأكياس المنسوجة لتلبية احتياجات التعبئة في قطاعات الزراعة والغذاء والتجارة. نركز على المنتج المناسب، التنفيذ الواضح، والمتابعة في كل مرحلة.",
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
          description: "بدأت ألاسكا عملها في ليبيا عام 2019.",
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
          description: "يقع مصنع ألاسكا في محلة السبعة بمدينة زليتن.",
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
          alt: "أكياس الأرز من ألاسكا",
          cta: "عرض الفئة",
        },
        {
          number: "02",
          name: "أكياس الأعلاف",
          image: "/product-feed.webp",
          alt: "أكياس الأعلاف من ألاسكا",
          cta: "عرض الفئة",
        },
        {
          number: "03",
          name: "أكياس الفحم",
          image: "/product-charcoal.webp",
          alt: "أكياس الفحم من ألاسكا",
          cta: "عرض الفئة",
        },
        {
          number: "04",
          name: "أكياس الخضروات",
          image: "/product-vegetables.webp",
          alt: "أكياس الخضروات من ألاسكا",
          cta: "عرض الفئة",
        },
        {
          number: "05",
          name: "أكياس السماد",
          image: "/product-fertilizer.webp",
          alt: "أكياس السماد من ألاسكا",
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
      rawMaterials: {
        label: "المواد الخام",
        title: {
          primary: "بداية الإنتاج.",
          accent: "من خامات واضحة.",
        },
        items: [
          {
            number: "01",
            name: "ماسترباتش الألوان",
            description:
              "حبيبات لونية تخلط مع البولي بروبيلين لإنتاج الأشرطة والأكياس باللون المطلوب.",
            image: "/process/raw-material-color-masterbatch.webp",
            imageAlt: "ماسترباتش الألوان المستخدم في إنتاج الأكياس المنسوجة",
            imageWidth: 700,
            imageHeight: 394,
          },
          {
            number: "02",
            name: "حبيبات البولي بروبيلين PP",
            description:
              "المادة الأساسية التي تدخل خط الإنتاج لتشكيل الأشرطة البلاستيكية المستخدمة في صناعة القماش المنسوج.",
            image: "/process/raw-material-polypropylene-granules.webp",
            imageAlt: "حبيبات البولي بروبيلين المستخدمة في إنتاج القماش المنسوج",
            imageWidth: 800,
            imageHeight: 533,
          },
        ],
      },
      resultLabel: "الناتج",
      steps: [
        {
          number: "01",
          title: "خلط الخام وتغذيته",
          machine: "وحدة خلط وتغذية المواد الخام",
          description:
            "تُخلط حبيبات البولي بروبيلين مع ماسترباتش اللون، ثم تُنقل الخامة إلى قادوس خط إنتاج الأشرطة لبدء عملية التصنيع.",
          result: "خليط خام جاهز لخط الإنتاج",
          image: "/process/process-raw-material-mixing-feeding.webp",
          imageAlt: "خلط وتغذية حبيبات البولي بروبيلين في مصنع ألاسكا",
          imageWidth: 2561,
          imageHeight: 1921,
          imageLinkLabel: "عرض صورة المرحلة كاملة",
        },
        {
          number: "02",
          title: "إنتاج الأشرطة وسحبها ولفها",
          machine: "خط إنتاج أشرطة البولي بروبيلين",
          description:
            "تدخل الخامة إلى خط البثق وتُصهر لتكوين فيلم بلاستيكي. بعد التبريد يُقسّم الفيلم إلى أشرطة مسطحة، ثم تمر الأشرطة عبر وحدات السحب قبل لفها على بكرات وتجهيزها للنسيج.",
          result: "بكرات أشرطة البولي بروبيلين المسطحة",
          image: "/process/process-pp-tape-extrusion-line.webp",
          imageAlt: "خط إنتاج وسحب ولف أشرطة البولي بروبيلين في مصنع ألاسكا",
          imageWidth: 2136,
          imageHeight: 841,
          imageLinkLabel: "عرض صورة المرحلة كاملة",
        },
        {
          number: "03",
          title: "نسج القماش الأنبوبي",
          machine: "آلة النسيج الدائرية",
          description:
            "تُركب بكرات الأشرطة حول آلة النسيج الدائرية، ثم تتشابك الأشرطة طوليًا وعرضيًا لتكوين قماش بولي بروبيلين منسوج على شكل أنبوب مستمر.",
          result: "رول قماش بولي بروبيلين منسوج أنبوبي",
          image: "/process/process-circular-loom.webp",
          imageAlt: "آلة النسيج الدائرية وإنتاج القماش الأنبوبي في مصنع ألاسكا",
          imageWidth: 2136,
          imageHeight: 840,
          imageLinkLabel: "عرض صورة المرحلة كاملة",
        },
        {
          number: "04",
          title: "القطع وثني القاع والخياطة",
          machine: "آلة قص وثني وخياطة أكياس البولي بروبيلين المنسوجة",
          description:
            "يُغذّى رول القماش الأنبوبي إلى خط التحويل ويُقص بالطول المطلوب، ثم تُثنى الحافة السفلية وتُخاط لإغلاق قاع الكيس، مع بقاء الفوهة العلوية مفتوحة للتعبئة.",
          result: "كيس منسوج مفتوح الفوهة ومخيط من الأسفل",
          image: "/process/process-bag-cutting-folding-sewing.webp",
          imageAlt: "خط قص وثني وخياطة أكياس البولي بروبيلين المنسوجة في مصنع ألاسكا",
          imageWidth: 1067,
          imageHeight: 376,
          imageLinkLabel: "عرض صورة المرحلة كاملة",
        },
      ],
      finishedProduct: {
        label: "المنتج الناتج",
        name: "كيس بولي بروبيلين منسوج مفتوح الفوهة",
        description:
          "كيس منسوج مفتوح من الأعلى للتعبئة، ومغلق بخياطة في الجزء السفلي.",
      },
    },
    quality: {
      label: "متابعة الوزن والجودة",
      title: {
        primary: "العناية تبدأ.",
        accent: "من التفاصيل.",
      },
      description:
        "نراجع عينات الأكياس خلال الإنتاج، ونتابع وزن كل عينة باستخدام ميزان رقمي، إلى جانب فحص انتظام النسيج والتشطيب وملاءمة الكيس للاستخدام المطلوب.",
      image: "/quality/quality-bag-sample-weighing.webp",
      imageAlt: "وزن عينة كيس منسوج باستخدام ميزان رقمي في مصنع ألاسكا",
      imageWidth: 720,
      imageHeight: 962,
      imageLinkLabel: "عرض صورة فحص الجودة كاملة",
      badge: "متابعة الوزن والجودة",
      reading: {
        value: "76 g",
        label: "قراءة عينة مصورة",
      },
      points: [
        { number: "01", label: "وزن عينات الأكياس" },
        { number: "02", label: "متابعة انتظام النسيج" },
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
      mapTitle: "موقع مصنع ألاسكا على الخريطة",
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
        "تواصل مع ألاسكا للاستفسار عن فئات الأكياس المتاحة.",
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
      companyDescription: "شركة ألاسكا لصناعة أكياس الأعلاف والأكياس المنسوجة",
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
      rawMaterials: {
        label: "RAW MATERIALS",
        title: {
          primary: "PRODUCTION STARTS.",
          accent: "WITH CLEAR MATERIALS.",
        },
        items: [
          {
            number: "01",
            name: "Color Masterbatch",
            description:
              "Color concentrate mixed with polypropylene to produce tapes and bags in the required color.",
            image: "/process/raw-material-color-masterbatch.webp",
            imageAlt: "Color masterbatch used in woven bag production",
            imageWidth: 700,
            imageHeight: 394,
          },
          {
            number: "02",
            name: "Polypropylene Granules (PP)",
            description:
              "The primary material fed into the production line to form the plastic tapes used in woven fabric manufacturing.",
            image: "/process/raw-material-polypropylene-granules.webp",
            imageAlt: "Polypropylene granules used in woven fabric production",
            imageWidth: 800,
            imageHeight: 533,
          },
        ],
      },
      resultLabel: "OUTPUT",
      steps: [
        {
          number: "01",
          title: "Raw Material Mixing & Feeding",
          machine: "Raw Material Mixing and Feeding Unit",
          description:
            "Polypropylene granules are mixed with color masterbatch, then transferred into the tape production line hopper to begin manufacturing.",
          result: "Prepared raw material mixture",
          image: "/process/process-raw-material-mixing-feeding.webp",
          imageAlt: "Mixing and feeding polypropylene granules at the Alaska factory",
          imageWidth: 2561,
          imageHeight: 1921,
          imageLinkLabel: "VIEW FULL IMAGE",
        },
        {
          number: "02",
          title: "Tape Extrusion, Stretching & Winding",
          machine: "PP Tape Extrusion Line",
          description:
            "The material enters the extrusion line and is melted to form a plastic film. After cooling, the film is divided into flat tapes, drawn through the line and wound onto bobbins for weaving.",
          result: "PP flat tape bobbins",
          image: "/process/process-pp-tape-extrusion-line.webp",
          imageAlt: "PP tape extrusion, stretching and winding line at the Alaska factory",
          imageWidth: 2136,
          imageHeight: 841,
          imageLinkLabel: "VIEW FULL IMAGE",
        },
        {
          number: "03",
          title: "Circular Weaving",
          machine: "Circular Loom",
          description:
            "The tape bobbins are mounted around the circular loom, where the tapes are interwoven to form a continuous tubular polypropylene woven fabric.",
          result: "Tubular PP woven fabric roll",
          image: "/process/process-circular-loom.webp",
          imageAlt: "The circular loom and tubular fabric production at the Alaska factory",
          imageWidth: 2136,
          imageHeight: 840,
          imageLinkLabel: "VIEW FULL IMAGE",
        },
        {
          number: "04",
          title: "Cutting, Bottom Folding & Sewing",
          machine: "Automatic PP Woven Bag Cutting, Bottom Folding and Sewing Machine",
          description:
            "The tubular fabric roll is fed into the conversion line and cut to the required length. The bottom edge is folded and sewn, while the top remains open for filling.",
          result: "Open-mouth, bottom-sewn woven bag",
          image: "/process/process-bag-cutting-folding-sewing.webp",
          imageAlt: "PP woven bag cutting, bottom folding and sewing line at the Alaska factory",
          imageWidth: 1067,
          imageHeight: 376,
          imageLinkLabel: "VIEW FULL IMAGE",
        },
      ],
      finishedProduct: {
        label: "THE FINISHED PRODUCT",
        name: "Open-Mouth PP Woven Bag",
        description:
          "A woven bag with an open top for filling and a sewn bottom closure.",
      },
    },
    quality: {
      label: "WEIGHT & QUALITY FOLLOW-UP",
      title: {
        primary: "CARE STARTS.",
        accent: "WITH DETAILS.",
      },
      description:
        "We review bag samples during production and check each sample using a digital scale, alongside weave consistency, finishing and suitability for the intended use.",
      image: "/quality/quality-bag-sample-weighing.webp",
      imageAlt: "Woven bag sample weighed using a digital scale at the Alaska factory",
      imageWidth: 720,
      imageHeight: 962,
      imageLinkLabel: "VIEW FULL QUALITY IMAGE",
      badge: "WEIGHT & QUALITY FOLLOW-UP",
      reading: {
        value: "76 g",
        label: "PHOTOGRAPHED SAMPLE READING",
      },
      points: [
        { number: "01", label: "BAG SAMPLE WEIGHING" },
        { number: "02", label: "WEAVE CONSISTENCY CHECK" },
        { number: "03", label: "FINISH REVIEW" },
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
