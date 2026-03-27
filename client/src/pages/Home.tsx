/* ============================================================
   Maverick Energy Partners — Home Landing Page
   Design: Dark Cinematic / Institutional
   Palette: Deep navy-charcoal bg, electric blue accents, warm gold callouts
   Typography: Sora (display) + DM Sans (body)
   Sections: Hero, Credibility Strip, What We Do, Why Now,
             Target Site Profile, How Maverick Creates Value,
             Who We Work With, Positioning, About, Contact, Footer
   ============================================================ */

import { useState, useEffect, useRef } from "react";
import { Mail, Menu, X, ChevronRight } from "lucide-react";

// ─── Asset URLs ───────────────────────────────────────────────
const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663485169196/GApUs5ni8WEeKZLasNEuAR/logo-mep-2HQMdqhyo2JijDgTSHUCNe.webp";
const HERO_BG  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663485169196/GApUs5ni8WEeKZLasNEuAR/hero-bg-v2-Hh9i578wsHn9rgtbRhUBBw.webp";

// ─── Design tokens ────────────────────────────────────────────
const C = {
  bg:        "#0a0e1a",   // deep navy
  bgCard:    "#0f1525",   // card surface
  bgSection: "#0d1220",   // alternate section
  border:    "rgba(255,255,255,0.07)",
  blue:      "#3b82f6",   // electric blue
  blueLight: "#60a5fa",
  gold:      "#d4a853",   // warm gold
  textPrimary:   "#e8eaf0",
  textSecondary: "#8b92a8",
  textMuted:     "#5a6070",
};

// ─── Fade-in on scroll hook ───────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "What We Do", href: "#what-we-do" },
    { label: "Why Now",    href: "#why-now"    },
    { label: "Process",    href: "#process"    },
    { label: "About",      href: "#about"      },
    { label: "Contact",    href: "#contact"    },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,14,26,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="MEP" className="w-9 h-9" />
          <span
            className="hidden sm:block font-bold text-base tracking-wide"
            style={{ color: C.textPrimary, fontFamily: "'Sora', sans-serif" }}
          >
            Maverick Energy Partners
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm transition-colors duration-150"
              style={{ color: C.textSecondary, fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.textPrimary)}
              onMouseLeave={e => (e.currentTarget.style.color = C.textSecondary)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm font-semibold px-5 py-2 transition-all duration-200"
            style={{
              background: C.blue,
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
              borderRadius: "2px",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = C.blueLight)}
            onMouseLeave={e => (e.currentTarget.style.background = C.blue)}
          >
            Contact
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" style={{ color: C.textPrimary }} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-5 pt-2 space-y-3"
          style={{ background: "rgba(10,14,26,0.98)", borderTop: `1px solid ${C.border}` }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-sm py-1.5"
              style={{ color: C.textSecondary, fontFamily: "'DM Sans', sans-serif" }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center px-6 overflow-hidden"
      style={{
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
      }}
    >
      {/* Multi-layer dark overlay for depth */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,8,18,0.93) 0%, rgba(10,14,26,0.82) 50%, rgba(5,8,18,0.90) 100%)" }} />
      {/* Subtle blue vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.08) 0%, transparent 60%)" }} />
      {/* Bottom fade to bg */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: `linear-gradient(to bottom, transparent, ${C.bg})` }} />

      <div className="relative z-10 max-w-6xl mx-auto w-full pt-24 pb-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-px" style={{ background: C.blue }} />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: C.blue, fontFamily: "'DM Sans', sans-serif" }}
            >
              Dallas, Texas · ERCOT
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-8"
            style={{ color: C.textPrimary, fontFamily: "'Sora', sans-serif" }}
          >
            ERCOT Power-Ready Site Acquisitions{" "}
            <span style={{ color: C.blue }}>for Data Center Buyers</span>
          </h1>

          <p
            className="text-lg leading-relaxed mb-10 max-w-2xl"
            style={{ color: C.textSecondary, fontFamily: "'DM Sans', sans-serif" }}
          >
            Maverick Energy Partners acquires stalled, distressed, and undercapitalized energy development sites in ERCOT and advances them into buyer-ready site packages for data center users, developers, and infrastructure investors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-all duration-200"
              style={{ background: C.blue, color: "#fff", fontFamily: "'DM Sans', sans-serif", borderRadius: "2px" }}
              onMouseEnter={e => (e.currentTarget.style.background = C.blueLight)}
              onMouseLeave={e => (e.currentTarget.style.background = C.blue)}
            >
              Discuss Acquisition Criteria
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-all duration-200"
              style={{
                border: `1px solid rgba(255,255,255,0.25)`,
                color: C.textPrimary,
                fontFamily: "'DM Sans', sans-serif",
                borderRadius: "2px",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.color = C.blue; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = C.textPrimary; }}
            >
              Contact Maverick
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Credibility Strip ────────────────────────────────────────
function CredibilityStrip() {
  const points = [
    "ERCOT-Focused",
    "Sub-75 MW Target Profile",
    "Power-First Site Strategy",
    "Utility and Development Diligence",
    "Buyer-Aligned Advancement",
  ];
  return (
    <section style={{ background: C.bgCard, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <div className="max-w-6xl mx-auto px-6 py-5">
        <div className="flex flex-wrap gap-x-10 gap-y-3">
          {points.map((p, i) => (
            <span key={i} className="flex items-center gap-2 text-sm font-medium" style={{ color: C.textSecondary, fontFamily: "'DM Sans', sans-serif" }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.blue }} />
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section wrapper ──────────────────────────────────────────
function Section({ id, alt, children }: { id?: string; alt?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className="py-20 px-6" style={{ background: alt ? C.bgSection : C.bg }}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-6 h-px" style={{ background: C.blue }} />
      <h2 className="text-2xl font-bold" style={{ color: C.textPrimary, fontFamily: "'Sora', sans-serif" }}>
        {children}
      </h2>
    </div>
  );
}

// ─── What We Do ───────────────────────────────────────────────
function WhatWeDo() {
  return (
    <Section id="what-we-do">
      <FadeIn>
        <SectionHeading>What We Do</SectionHeading>
        <p className="text-base leading-relaxed max-w-3xl" style={{ color: C.textSecondary, fontFamily: "'DM Sans', sans-serif" }}>
          Maverick Energy Partners targets stalled, distressed, and undercapitalized energy development sites where meaningful grid, utility, land, or development work has already been completed or set in motion. We evaluate those sites for data center suitability, advance the most compelling opportunities through focused diligence and positioning work, and bring them to market as buyer-ready power site packages.
        </p>
      </FadeIn>
    </Section>
  );
}

// ─── Why Now ──────────────────────────────────────────────────
function WhyNow() {
  return (
    <Section id="why-now" alt>
      <FadeIn>
        <SectionHeading>Why Now</SectionHeading>
        <p className="text-base leading-relaxed max-w-3xl" style={{ color: C.textSecondary, fontFamily: "'DM Sans', sans-serif" }}>
          In ERCOT, power access and development timing increasingly determine site value. Many energy development sites already contain years of utility coordination, study work, land control, or local development progress. Maverick focuses on identifying those positions and converting that momentum into buyer-ready opportunities for data center use.
        </p>
      </FadeIn>
    </Section>
  );
}

// ─── Target Site Profile ──────────────────────────────────────
function TargetSiteProfile() {
  const criteria = [
    "ERCOT locations with strong data center relevance",
    "Sub-75 MW opportunities, generally where timing and study complexity remain manageable",
    "Stalled, distressed, or undercapitalized energy development sites",
    "Existing utility interface, study progress, or grid-related groundwork",
    "Land control, permitting progress, entitlement work, or development momentum already in place",
    "Situations where prior project work can create a faster path than raw land sourcing",
  ];
  return (
    <Section id="target-profile">
      <FadeIn>
        <SectionHeading>Target Site Profile</SectionHeading>
        <div className="grid sm:grid-cols-2 gap-4">
          {criteria.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 p-5"
              style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "2px" }}
            >
              <span
                className="text-xs font-bold mt-0.5 flex-shrink-0 w-5 h-5 flex items-center justify-center"
                style={{ color: C.blue, fontFamily: "'Sora', sans-serif" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: C.textSecondary, fontFamily: "'DM Sans', sans-serif" }}>
                {item}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

// ─── Process ──────────────────────────────────────────────────
function Process() {
  const steps = [
    { label: "Source",            desc: "Identify distressed, stalled, and non-core energy development opportunities." },
    { label: "Evaluate",          desc: "Assess power availability, timing, transferability, constraints, and buyer fit." },
    { label: "Acquire / Structure", desc: "Pursue land, lease, project-position, or other structured site exposure." },
    { label: "Advance",           desc: "Complete targeted diligence and positioning work to improve readiness and marketability." },
    { label: "Exit",              desc: "Deliver buyer-ready opportunities to data center developers, users, and capital partners." },
  ];
  return (
    <Section id="process" alt>
      <FadeIn>
        <SectionHeading>How Maverick Creates Value</SectionHeading>
        <div className="flex flex-col md:flex-row gap-px" style={{ background: C.border }}>
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex-1 p-6"
              style={{ background: C.bgSection }}
            >
              <div
                className="text-xs font-bold mb-3 tracking-widest"
                style={{ color: C.blue, fontFamily: "'Sora', sans-serif" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div
                className="text-sm font-bold mb-2"
                style={{ color: C.textPrimary, fontFamily: "'Sora', sans-serif" }}
              >
                {step.label}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

// ─── Who We Work With ─────────────────────────────────────────
function WhoWeWorkWith() {
  return (
    <Section id="who-we-work-with">
      <FadeIn>
        <SectionHeading>Who We Work With</SectionHeading>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: "For Buyers and Capital Partners",
              body: "Maverick develops differentiated ERCOT opportunities for data center users, developers, and infrastructure investors seeking faster access to power-backed sites.",
            },
            {
              title: "For Sellers and Site Sources",
              body: "We evaluate distressed, paused, and non-core energy development positions where existing development work may still create meaningful value in a new use case.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="p-7"
              style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "2px" }}
            >
              <h3
                className="text-sm font-bold mb-3 uppercase tracking-widest"
                style={{ color: C.gold, fontFamily: "'Sora', sans-serif" }}
              >
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: C.textSecondary, fontFamily: "'DM Sans', sans-serif" }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

// ─── Positioning ──────────────────────────────────────────────
function Positioning() {
  return (
    <section
      className="py-16 px-6"
      style={{ background: `linear-gradient(135deg, ${C.bgCard} 0%, rgba(59,130,246,0.06) 100%)`, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p
            className="text-2xl sm:text-3xl font-bold leading-snug mb-4"
            style={{ color: C.textPrimary, fontFamily: "'Sora', sans-serif" }}
          >
            Not Raw Land.{" "}
            <span style={{ color: C.blue }}>Not Full Vertical Development.</span>
          </p>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: C.textSecondary, fontFamily: "'DM Sans', sans-serif" }}>
            Maverick focuses on power-driven site opportunities where prior energy development work can create a real timing and execution advantage for data center buyers.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────
function About() {
  return (
    <Section id="about" alt>
      <FadeIn>
        <SectionHeading>About Maverick</SectionHeading>
        <p className="text-base leading-relaxed max-w-3xl mb-6" style={{ color: C.textSecondary, fontFamily: "'DM Sans', sans-serif" }}>
          Maverick Energy Partners is focused on acquiring and advancing ERCOT site opportunities where existing development progress, utility interface, and power-related groundwork can be repositioned for data center use. Our approach is selective, execution-oriented, and shaped by real buyer requirements.
        </p>
        <p className="text-sm" style={{ color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
          Michael Siegel, Founder and CEO &mdash; Dallas, Texas
        </p>
      </FadeIn>
    </Section>
  );
}

// ─── Contact ──────────────────────────────────────────────────
function Contact() {
  return (
    <Section id="contact">
      <FadeIn>
        <SectionHeading>Contact</SectionHeading>
        <p className="text-base mb-6 max-w-xl" style={{ color: C.textSecondary, fontFamily: "'DM Sans', sans-serif" }}>
          For site opportunities, buyer criteria discussions, or strategic conversations, contact:
        </p>
        <a
          href="mailto:info@maverickenergypartners.com"
          className="inline-flex items-center gap-2 text-base font-semibold transition-colors duration-150"
          style={{ color: C.blue, fontFamily: "'DM Sans', sans-serif" }}
          onMouseEnter={e => (e.currentTarget.style.color = C.blueLight)}
          onMouseLeave={e => (e.currentTarget.style.color = C.blue)}
        >
          <Mail className="w-4 h-4" />
          info@maverickenergypartners.com
        </a>
      </FadeIn>
    </Section>
  );
}

// ─── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="py-10 px-6"
      style={{ background: C.bgCard, borderTop: `1px solid ${C.border}` }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <img src={LOGO_URL} alt="MEP" className="w-7 h-7" />
          <span className="text-sm font-bold" style={{ color: C.textPrimary, fontFamily: "'Sora', sans-serif" }}>
            Maverick Energy Partners
          </span>
        </div>
        <p className="text-xs mb-1" style={{ color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
          ERCOT Power-Ready Site Acquisitions for Data Center Development
        </p>
        <a
          href="mailto:info@maverickenergypartners.com"
          className="text-xs transition-colors"
          style={{ color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}
          onMouseEnter={e => (e.currentTarget.style.color = C.blue)}
          onMouseLeave={e => (e.currentTarget.style.color = C.textMuted)}
        >
          info@maverickenergypartners.com
        </a>
        <p className="text-xs mt-4" style={{ color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
          &copy; {new Date().getFullYear()} Maverick Energy Partners. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: C.bg }}>
      <Nav />
      <Hero />
      <CredibilityStrip />
      <WhatWeDo />
      <WhyNow />
      <TargetSiteProfile />
      <Process />
      <WhoWeWorkWith />
      <Positioning />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
