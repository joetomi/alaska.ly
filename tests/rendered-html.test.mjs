import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = (path) => readFile(new URL(path, root), "utf8");

const requiredAssets = [
  "public/alaska-logo.webp",
  "public/hero-factory-v2.png",
  "public/hero-factory-en.jpg",
  "public/hero-factory.webp",
  "public/production-line.webp",
  "public/weaving-line.webp",
  "public/quality-sample.webp",
  "public/product-rice.webp",
  "public/product-feed.webp",
  "public/product-charcoal.webp",
  "public/product-vegetables.webp",
  "public/product-fertilizer.webp",
  "public/process/raw-material-color-masterbatch.webp",
  "public/process/raw-material-polypropylene-granules.webp",
  "public/process/process-raw-material-mixing-feeding.webp",
  "public/process/process-pp-tape-extrusion-line.webp",
  "public/process/process-circular-loom.webp",
  "public/process/process-bag-cutting-folding-sewing.webp",
  "public/quality/quality-bag-sample-weighing.webp",
  "public/fonts/JumanArabic-Light.ttf",
  "public/fonts/JumanArabic-Normal.ttf",
  "public/fonts/JumanArabic-SemiBold.ttf",
  "public/favicon.png",
  "public/og.png",
];

test("keeps every required Alaska asset", async () => {
  await Promise.all(requiredAssets.map((path) => access(new URL(path, root))));
});

test("static production source contains the complete bilingual experience", async () => {
  const html = await source("index.html");

  assert.match(html, /class="alaska-preloader"/);
  assert.match(html, /<noscript><style>\.alaska-preloader\{display:none!important\}\.reveal\{opacity:1!important;transform:none!important\}<\/style><\/noscript>/);
  assert.match(html, /class="alaska-menu"[^>]*role="dialog"/);
  assert.match(html, /data-language-toggle/);
  assert.match(html, /class="lang-ar"/);
  assert.match(html, /class="lang-en"/);
  assert.match(html, /ننسج القوة\./);
  assert.match(html, /WOVEN FOR STRENGTH\./);

  for (const product of [
    "أكياس الأرز",
    "أكياس الأعلاف",
    "أكياس الفحم",
    "أكياس الخضروات",
    "أكياس السماد",
  ]) {
    assert.match(html, new RegExp(product));
  }

  assert.match(html, /32\.4037500,14\.5859167/);
  assert.match(html, /091 218 2998/);
  assert.match(html, /\+218 92 314 2069/);
  assert.match(html, /abdallhmansur68@gmail\.com/);
  assert.match(html, /data-email-form/);
  assert.match(html, /data-platform="gmail"/);
  assert.match(html, /data-platform="outlook"/);
  assert.match(html, /data-platform="yahoo"/);
  assert.match(html, /data-platform="default"/);

  assert.doesNotMatch(html, /Libyan Lands|llc\.com\.ly/i);
});

test("production and quality sections use the supplied local images and exact four-stage flow", async () => {
  const html = await source("index.html");

  assert.equal((html.match(/class="raw-material-card reveal"/g) ?? []).length, 2);
  assert.equal((html.match(/class="process-stage" data-depth-card data-stage-number=/g) ?? []).length, 4);
  assert.match(html, /data-process-stages/);
  assert.match(html, /data-process-progress/);
  assert.match(html, /data-quality-visual/);
  assert.doesNotMatch(html, /<div class="process-section__media"/);
  assert.match(html, /Color Masterbatch/);
  assert.match(html, /Polypropylene Granules \(PP\)/);
  assert.match(html, /Raw Material Mixing and Feeding Unit/);
  assert.match(html, /PP Tape Extrusion Line/);
  assert.match(html, /Circular Loom/);
  assert.match(html, /Automatic PP Woven Bag Cutting, Bottom Folding and Sewing Machine/);
  assert.match(html, /public\/quality\/quality-bag-sample-weighing\.webp/);
  assert.match(html, /PHOTOGRAPHED SAMPLE READING/);
  assert.match(html, /76 g/);
  assert.doesNotMatch(html, /74 g/);
  assert.equal((html.match(/data-aria-en=/g) ?? []).length, 5);
  assert.equal((html.match(/data-alt-en=/g) ?? []).length, 5);
  assert.match(html, /quality-reading[\s\S]*<figcaption>[\s\S]*<\/figure>/);
});

test("production and quality sections define the scoped cinematic depth interactions", async () => {
  const [html, css, script, component] = await Promise.all([
    source("index.html"),
    source("app/globals.css"),
    source("public/site.js"),
    source("app/components/AlaskaExperience.tsx"),
  ]);

  assert.equal((html.match(/data-depth-scene/g) ?? []).length, 5);
  assert.match(css, /perspective:\s*1[45-6]00px/);
  assert.match(css, /transform-style:\s*preserve-3d/);
  assert.match(css, /translateZ\(/);
  assert.doesNotMatch(css, /grayscale\(1\)\s+saturate\(0\)/);
  assert.match(css, /grayscale\(0\)\s+saturate\(1\)\s+contrast\(1\.03\)\s+brightness\(1\)/);
  assert.match(css, /:focus-within[\s\S]*grayscale\(0\)\s+saturate\(1\)/);
  assert.match(css, /@media \(hover: none\), \(pointer: coarse\), \(max-width: 900px\)/);
  assert.match(css, /filter:\s*grayscale\(0\) saturate\(1\)[^;]*!important/);
  assert.match(css, /process-stage:not\(\.is-stage-visible\)[\s\S]*clip-path:[\s\S]*blur\(5px\)/);
  assert.match(css, /process-stage:not\(\.is-stage-visible\) \.process-stage__copy/);
  assert.match(css, /\.custom-cursor-active \*[\s\S]*cursor:\s*none\s*!important/);
  assert.doesNotMatch(css, /\[id\]\s*\{\s*scroll-margin-top/);

  assert.match(script, /#process \[data-depth-card\], #quality \[data-depth-card\]/);
  assert.match(script, /classList\.toggle\("is-stage-visible", entry\.isIntersecting\)/);
  assert.match(script, /\(hover: hover\) and \(pointer: fine\)/);
  assert.match(script, /--process-progress/);
  assert.match(script, /--tilt-x/);
  assert.match(script, /pointermove/);
  assert.match(script, /pointerleave/);
  assert.match(script, /addEventListener\("resize", scheduleScrollEffects\)/);
  assert.match(script, /new ResizeObserver\(scheduleScrollEffects\)/);
  assert.match(component, /useIndustrialDepthEffects/);
  assert.match(component, /new ResizeObserver\(scheduleProgress\)/);
  assert.match(component, /data-process-stages/);
  assert.match(component, /data-quality-visual/);
});

test("design system defines Juman, dark Alaska tokens, responsiveness and reduced motion", async () => {
  const css = await source("app/globals.css");

  assert.equal((css.match(/@font-face/g) ?? []).length, 3);
  assert.match(css, /font-family:\s*"Juman Arabic"/);
  assert.match(css, /--alaska-bg:\s*#062f2a/i);
  assert.match(css, /--alaska-neon:\s*#31c56b/i);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media \(max-width:\s*640px\)/);
  assert.match(css, /overflow-x:\s*clip/);
});

test("interaction scripts preserve menu, modal and mail-platform behavior", async () => {
  const script = await source("public/site.js");

  assert.match(script, /new window\.Lenis/);
  assert.match(script, /prefers-reduced-motion:\s*reduce/);
  assert.match(script, /event\.key === "Escape"/);
  assert.match(script, /trapFocus/);
  assert.match(script, /mail\.google\.com\/mail/);
  assert.match(script, /outlook\.live\.com/);
  assert.match(script, /compose\.mail\.yahoo\.com/);
  assert.match(script, /mailto:/);
});

test("React source uses the requested motion and smooth-scroll libraries", async () => {
  const [component, content, layout, packageJson] = await Promise.all([
    source("app/components/AlaskaExperience.tsx"),
    source("app/data/site-content.ts"),
    source("app/layout.tsx"),
    source("package.json"),
  ]);

  assert.match(component, /from "framer-motion"/);
  assert.match(component, /from "lenis"/);
  assert.match(component, /AnimatePresence/);
  assert.match(component, /useScroll/);
  assert.match(component, /useTransform/);
  assert.match(content, /export const siteContent/);
  assert.match(layout, /https:\/\/alaska\.ly/);
  assert.match(layout, /\/og\.png/);
  assert.match(packageJson, /"framer-motion": "12\.42\.2"/);
  assert.match(packageJson, /"lenis": "1\.3\.25"/);

  assert.doesNotMatch(component + content, /Libyan Lands|llc\.com\.ly/i);
});
