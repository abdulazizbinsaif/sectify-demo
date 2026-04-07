"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Braces,
  CheckCircle2,
  Layers3,
  Link2,
  MousePointer2,
  Rocket,
  Sparkles,
} from "lucide-react";
import { createFullpage } from "sectify";
import type { SectifyInstance } from "sectify";

const siteSections = [
  { id: "intro" },
  { id: "what-is-sectify" },
  { id: "installation" },
  { id: "features" },
  { id: "api" },
] as const;

const npmPackageUrl = "https://www.npmjs.com/package/sectify";

const apiSnippet = `sectify.next();
sectify.prev();
sectify.goTo(3);
sectify.setAllowScrolling(true);
sectify.update();
sectify.destroy();`;

type Locale = "en" | "ar";

type FeatureItem = { title: string; text: string };
type BuiltCardItem = { title: string; text: string };
type StatItem = { value: string; label: string };
type ProcessStep = { title: string; text: string };

type SiteCopy = {
  sectionLabels: string[];
  brandSubtitle: string;
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  installCta: string;
  featuresCta: string;
  heroChecks: string[];
  builtForTitle: string;
  builtCards: BuiltCardItem[];
  whatTitle: string;
  whatParagraph1: string;
  whatParagraph2: string;
  whyTitle: string;
  whyItems: string[];
  packageTitle: string;
  packageDescription: string;
  packageButtonLabel: string;
  featuresTitle: string;
  featureItems: FeatureItem[];
  apiTitle: string;
  apiDescription: string;
  stats: StatItem[];
  processTitle: string;
  processSteps: ProcessStep[];
  finalCtaTitle: string;
  finalCtaText: string;
  finalCtaButton: string;
};

const COPY: Record<Locale, SiteCopy> = {
  en: {
    sectionLabels: ["Intro", "What It Is", "Install", "Features", "API"],
    brandSubtitle: "Section navigation library",
    heroBadge: "Full-Page Navigation Library",
    heroTitle: "Build smooth section-based websites with Sectify",
    heroDescription:
      "Sectify is a lightweight JavaScript library that adds smooth wheel, touch, and keyboard navigation between full-page sections. It is framework-agnostic and easy to integrate.",
    installCta: "Install Sectify",
    featuresCta: "See Features",
    heroChecks: ["Tiny API surface", "Framework-agnostic", "Production-friendly"],
    builtForTitle: "Built for modern product sites",
    builtCards: [
      {
        title: "Precise wheel gestures",
        text: "Momentum-safe snapping and tunable thresholds.",
      },
      {
        title: "Touch support included",
        text: "Smooth swipe behavior for mobile-first sections.",
      },
      {
        title: "Keyboard-first accessibility",
        text: "Arrow, Home, and End support out of the box.",
      },
    ],
    whatTitle: "What is Sectify?",
    whatParagraph1:
      "Sectify is a lightweight library for one-page and section-based experiences where users navigate cleanly between full-page sections. It handles wheel sensitivity, touch gestures, keyboard shortcuts, URL anchors, and active section state.",
    whatParagraph2:
      "You can use it with plain HTML/JS or inside frameworks like React and Next.js, with the same predictable API.",
    whyTitle: "Why teams use it",
    whyItems: ["Small and fast", "Easy to wire up", "Great for landing pages", "Works with custom UI"],
    packageTitle: "Get Sectify on npm",
    packageDescription:
      "Install, read usage docs, and track releases from the official npm package page.",
    packageButtonLabel: "View package on npm",
    featuresTitle: "Key features",
    featureItems: [
      { title: "Wheel + touch + keyboard", text: "Navigate naturally across desktop and mobile devices." },
      { title: "Anchors + hash", text: "Deep-link directly to sections with clean URL behavior." },
      { title: "Programmatic control", text: "Use next, prev, and goTo from your own custom UI." },
      { title: "Navigation dots", text: "Enable optional side navigation with active states." },
      { title: "Framework-agnostic", text: "Works with vanilla JS, React, Vue, and more." },
      { title: "Lifecycle ready", text: "Call update and destroy safely during route changes." },
    ],
    apiTitle: "API at a glance",
    apiDescription:
      "Sectify exposes a minimal API so you can build custom controls and integrate with your app lifecycle without complexity.",
    stats: [
      { value: "~4KB", label: "Lightweight bundle" },
      { value: "5+", label: "Navigation controls" },
      { value: "2 min", label: "Average setup time" },
    ],
    processTitle: "How it works",
    processSteps: [
      { title: "Define your sections", text: "Mark each full-screen block with your section selector." },
      { title: "Initialize once", text: "Run createFullpage on your root container with options." },
      { title: "Control and extend", text: "Use the API, hooks, and anchors to match your UX flow." },
    ],
    finalCtaTitle: "Ship a smoother section experience",
    finalCtaText: "Add Sectify to your landing page or product site and keep navigation crisp across touch, wheel, and keyboard input.",
    finalCtaButton: "Get started now",
  },
  ar: {
    sectionLabels: ["المقدمة", "ما هو Sectify", "التثبيت", "المميزات", "الواجهة البرمجية"],
    brandSubtitle: "مكتبة للتنقل بين الأقسام",
    heroBadge: "مكتبة تنقل صفحة كاملة",
    heroTitle: "ابنِ مواقع سلسة تعتمد على الأقسام باستخدام Sectify",
    heroDescription:
      "Sectify مكتبة JavaScript خفيفة تضيف تنقلا سلسا عبر عجلة الماوس واللمس ولوحة المفاتيح بين أقسام الصفحة الكاملة. تعمل مع أي إطار وتتكامل بسرعة.",
    installCta: "تثبيت Sectify",
    featuresCta: "عرض المميزات",
    heroChecks: ["واجهة API صغيرة", "تعمل مع أي إطار", "جاهزة للإنتاج"],
    builtForTitle: "مصممة لمواقع المنتجات الحديثة",
    builtCards: [
      {
        title: "تعامل دقيق مع عجلة الماوس",
        text: "تنقل ثابت مع حماية من قفزات الزخم وإعدادات قابلة للضبط.",
      },
      {
        title: "دعم لمس مدمج",
        text: "سحب سلس لواجهات تعتمد على الموبايل.",
      },
      {
        title: "دعم قوي للوحة المفاتيح",
        text: "دعم الأسهم و Home و End بشكل افتراضي.",
      },
    ],
    whatTitle: "ما هو Sectify؟",
    whatParagraph1:
      "Sectify مكتبة خفيفة لبناء تجارب صفحة واحدة تعتمد على الأقسام، حيث ينتقل المستخدم بين الأقسام بشكل واضح وسلس. تتعامل مع حساسية عجلة الماوس، وإيماءات اللمس، واختصارات لوحة المفاتيح، وروابط الأقسام، وحالة القسم النشط.",
    whatParagraph2:
      "يمكنك استخدامها مع HTML/JS مباشرة أو داخل React و Next.js بنفس الواجهة البرمجية المتوقعة.",
    whyTitle: "لماذا تستخدمه الفرق؟",
    whyItems: ["خفيفة وسريعة", "سهلة الدمج", "ممتازة لصفحات الهبوط", "تعمل مع واجهات مخصصة"],
    packageTitle: "احصل على Sectify عبر npm",
    packageDescription: "ثبّت المكتبة واطّلع على التوثيق وآخر الإصدارات من صفحة الحزمة الرسمية في npm.",
    packageButtonLabel: "عرض الحزمة على npm",
    featuresTitle: "أهم المميزات",
    featureItems: [
      { title: "عجلة + لمس + لوحة مفاتيح", text: "تنقل طبيعي على سطح المكتب والجوال." },
      { title: "روابط الأقسام + hash", text: "الانتقال المباشر لأقسام محددة عبر الرابط." },
      { title: "تحكم برمجي", text: "استخدم next و prev و goTo من واجهتك الخاصة." },
      { title: "نقاط تنقل", text: "فعّل نقاط تنقل جانبية بحالة نشطة." },
      { title: "متوافقة مع كل الأطر", text: "تعمل مع JavaScript الخام و React و Vue وغيرهم." },
      { title: "دورة حياة جاهزة", text: "استخدم update و destroy بأمان أثناء تغييرات التطبيق." },
    ],
    apiTitle: "نظرة سريعة على API",
    apiDescription:
      "توفر Sectify واجهة API بسيطة لتبني عناصر تحكم مخصصة وتدمجها بسهولة مع دورة حياة تطبيقك.",
    stats: [
      { value: "~4KB", label: "حجم خفيف" },
      { value: "+5", label: "خيارات تنقل" },
      { value: "دقيقتان", label: "متوسط وقت الإعداد" },
    ],
    processTitle: "كيف يعمل",
    processSteps: [
      { title: "عرّف الأقسام", text: "حدّد كل قسم كامل الشاشة عبر section selector الخاص بك." },
      { title: "تهيئة مرة واحدة", text: "شغّل createFullpage على عنصر الجذر مع الإعدادات." },
      { title: "تحكم ووسّع", text: "استخدم API والـ anchors والأحداث لتناسب تجربة منتجك." },
    ],
    finalCtaTitle: "ابنِ تجربة أقسام أكثر سلاسة",
    finalCtaText: "أضف Sectify لصفحة الهبوط أو موقع المنتج لتحصل على تنقل ثابت عبر اللمس وعجلة الماوس ولوحة المفاتيح.",
    finalCtaButton: "ابدأ الآن",
  },
};

const FEATURE_ICONS: LucideIcon[] = [MousePointer2, Link2, Layers3, Sparkles, Braces, Rocket];

export default function Home() {
  const siteRootRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<SectifyInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [locale, setLocale] = useState<Locale>("en");
  const isArabic = locale === "ar";
  const t = COPY[locale];
  const progressPct = Math.round(((activeIndex + 1) / siteSections.length) * 100);

  useEffect(() => {
    if (!siteRootRef.current) return;

    const sectify = createFullpage(siteRootRef.current, {
      selectors: {
        header: ".site-header",
        section: "[data-sectify-page-section]",
      },
      anchors: siteSections.map((section) => section.id),
      useUrlHash: true,
      lockBodyScroll: true,
      keyboard: true,
      wheelMinDelta: 24,
      wheelCooldown: 1.35,
      navigation: { enabled: false, clickable: false },
    });

    instanceRef.current = sectify;
    setActiveIndex(sectify.index);

    const unsubscribe = sectify.on("change", ({ index }) => {
      setActiveIndex(index);
    });

    return () => {
      unsubscribe();
      sectify.destroy();
      instanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, locale]);

  return (
    <main
      ref={siteRootRef}
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      className="relative bg-[#f7f8fa] text-slate-900"
    >
      <header className="site-header relative z-30 border-b border-slate-200 bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-xs font-semibold text-white">
              S
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-800">Sectify</p>
              <p className="text-xs text-slate-500">{t.brandSubtitle}</p>
            </div>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {siteSections.map((section, index) => (
              <button
                key={section.id}
                type="button"
                onClick={() => instanceRef.current?.goTo(section.id)}
                className={`px-1 py-1 text-sm transition ${
                  index === activeIndex
                    ? "font-bold text-slate-900"
                    : "font-medium text-slate-500 hover:text-slate-700"
                }`}
              >
                {t.sectionLabels[index]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden min-w-[96px] md:block">
              <div className="mb-1 flex items-center justify-between text-[10px] text-slate-500">
                <span>Progress</span>
                <span>{progressPct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-slate-900 transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setLocale((prev) => (prev === "en" ? "ar" : "en"))}
              className=" px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {locale === "en" ? "عربي" : "EN"}
            </button>
          </div>
        </div>
      </header>

      <section
        data-sectify-page-section
        data-sectify-anchor="intro"
        className="relative flex items-center overflow-hidden px-6 py-12 md:px-10"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(15,23,42,0.05),transparent_45%),radial-gradient(circle_at_90%_90%,rgba(99,102,241,0.06),transparent_35%)]" />
        <div className="mx-auto w-full max-w-6xl">
          <article className="anim-reveal relative z-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-9">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600">
              <Sparkles className="h-3.5 w-3.5 text-slate-700" />
              {t.heroBadge}
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
              {t.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
              {t.heroDescription}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => instanceRef.current?.goTo("installation")}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <span className="inline-flex items-center gap-1">
                  {t.installCta}
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
              <button
                type="button"
                onClick={() => instanceRef.current?.goTo("features")}
                className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                {t.featuresCta}
              </button>
            </div>
            <div className="mt-7 hidden gap-3 md:grid md:grid-cols-3">
              {t.stats.map((stat) => (
                <div key={stat.label} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-lg font-semibold">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl bg-[#0b1020] p-6 text-slate-100 shadow-[0_20px_40px_-28px_rgba(2,6,23,0.8)]">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{t.builtForTitle}</p>
              <div className="mt-5 space-y-3">
                {t.builtCards.map((card) => (
                  <div key={card.title}>
                    <p className="text-sm font-medium">{card.title}</p>
                    <p className="mt-1 text-xs text-slate-300">{card.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-300">
                {t.heroChecks.map((item) => (
                  <span key={item} className="inline-flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section
        data-sectify-page-section
        data-sectify-anchor="what-is-sectify"
        className="relative flex items-center overflow-hidden px-6 py-12 md:px-10"
      >
        <div className="mx-auto w-full max-w-6xl">
          <article className="anim-reveal rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold md:text-4xl">{t.whatTitle}</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">{t.whatParagraph1}</p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">{t.whatParagraph2}</p>
            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-600">{t.processTitle}</p>
              <div className="mt-4 space-y-3">
              {t.processSteps.map((step, idx) => (
                <div key={step.title} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-700">{`0${idx + 1}`}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{step.title}</p>
                  <p className="mt-1 text-xs text-slate-600">{step.text}</p>
                </div>
              ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section
        data-sectify-page-section
        data-sectify-anchor="installation"
        className="relative flex items-center overflow-hidden px-6 py-12 md:px-10"
      >
        <div className="mx-auto w-full max-w-5xl">
          <article className="anim-reveal rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-600">npm package</p>
            <h3 className="mt-3 text-4xl font-semibold text-slate-900">{t.packageTitle}</h3>
            <p className="mx-auto mt-4 max-w-3xl text-slate-600">{t.packageDescription}</p>
            <a
              href={npmPackageUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {t.packageButtonLabel}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </article>
        </div>
      </section>

      <section
        data-sectify-page-section
        data-sectify-anchor="features"
        className="relative flex items-center overflow-hidden px-6 py-12 md:px-10"
      >
        <div className="mx-auto w-full max-w-6xl">
          <article className="anim-reveal rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold md:text-4xl">{t.featuresTitle}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
            {t.featureItems.map((feature, index) => {
              const Icon = FEATURE_ICONS[index] ?? Sparkles;
              return (
                <div
                  key={`${locale}-${feature.title}`}
                  className="rounded-xl bg-slate-50 p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg border border-slate-200 bg-white p-2">
                      <Icon className="h-4 w-4 text-slate-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{feature.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </article>
          </div>
      </section>

      <section
        data-sectify-page-section
        data-sectify-anchor="api"
        className="relative flex items-center overflow-hidden px-6 py-12 md:px-10"
      >
        <div className="mx-auto w-full max-w-6xl">
          <article className="anim-reveal rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold md:text-4xl">{t.apiTitle}</h2>
            <p className="mt-4 text-slate-600">{t.apiDescription}</p>
            <pre
              dir="ltr"
              className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-[#f8fafc] p-4 text-sm text-slate-900"
            >
              <code>{apiSnippet}</code>
            </pre>
            <div className="mt-8 rounded-2xl bg-slate-50 p-6">
              <p className="text-lg font-semibold text-slate-900">{t.finalCtaTitle}</p>
              <p className="mt-3 text-slate-600">{t.finalCtaText}</p>
              <div className="mt-5 space-y-2 text-sm text-slate-700">
                {t.whyItems.map((item) => (
                  <p key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {item}
                  </p>
                ))}
              </div>
              <button
                type="button"
                onClick={() => instanceRef.current?.goTo("installation")}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {t.finalCtaButton}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
