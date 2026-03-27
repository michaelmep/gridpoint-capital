/* ============================================================
   Maverick Energy Partners — Home Landing Page
   Design: Institutional / Restrained
   Sections: Hero, Credibility Strip, What We Do, Why Now,
             Target Site Profile, How Maverick Creates Value,
             Who We Work With, Positioning, About, Contact, Footer
   ============================================================ */

import { useState } from "react";
import { Mail, Menu, X } from "lucide-react";

// ─── Asset URLs ───────────────────────────────────────────────
const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663485169196/GApUs5ni8WEeKZLasNEuAR/logo-mep-2HQMdqhyo2JijDgTSHUCNe.webp";

// ─── Navigation ───────────────────────────────────────────────
function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "What We Do", href: "#what-we-do" },
    { label: "Why Now", href: "#why-now" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f2ed] border-b border-[#d8d3cc]">
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="MEP" className="w-8 h-8" />
          <span className="hidden sm:block font-bold text-base tracking-wide text-[#1a1a18]" style={{ fontFamily: "'Playfair Display', serif" }}>
            MAVERICK ENERGY PARTNERS
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[#4a4a46] hover:text-[#1a1a18] transition-colors duration-150"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#1a1a18]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-5 pt-2 space-y-3 bg-[#f5f2ed] border-t border-[#d8d3cc]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-sm text-[#4a4a46] hover:text-[#1a1a18] py-1.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
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
    <section className="pt-36 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-semibold tracking-widest text-[#7a7a74] uppercase mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Dallas, Texas · ERCOT
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1a1a18] leading-tight mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          ERCOT Power-Ready Site Acquisitions for Data Center Buyers
        </h1>
        <p className="text-lg text-[#4a4a46] leading-relaxed max-w-2xl mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Maverick Energy Partners acquires stalled, distressed, and undercapitalized energy development sites in ERCOT and advances them into buyer-ready site packages for data center users, developers, and infrastructure investors.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#contact"
            className="inline-block px-7 py-3 bg-[#1a1a18] text-[#f5f2ed] text-sm font-semibold tracking-wide hover:bg-[#2e2e2a] transition-colors duration-200"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Discuss Acquisition Criteria
          </a>
          <a
            href="#contact"
            className="inline-block px-7 py-3 border border-[#1a1a18] text-[#1a1a18] text-sm font-semibold tracking-wide hover:bg-[#1a1a18] hover:text-[#f5f2ed] transition-colors duration-200"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Contact Maverick
          </a>
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
    <section className="border-t border-b border-[#d8d3cc] py-6 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-x-10 gap-y-3">
          {points.map((point, i) => (
            <span
              key={i}
              className="text-sm font-medium text-[#4a4a46] tracking-wide"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {point}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section Divider ──────────────────────────────────────────
function Divider() {
  return <div className="max-w-4xl mx-auto px-6"><hr className="border-[#d8d3cc]" /></div>;
}

// ─── What We Do ───────────────────────────────────────────────
function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1a1a18] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          What We Do
        </h2>
        <p className="text-base text-[#4a4a46] leading-relaxed max-w-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Maverick Energy Partners targets stalled, distressed, and undercapitalized energy development sites where meaningful grid, utility, land, or development work has already been completed or set in motion. We evaluate those sites for data center suitability, advance the most compelling opportunities through focused diligence and positioning work, and bring them to market as buyer-ready power site packages.
        </p>
      </div>
    </section>
  );
}

// ─── Why Now ──────────────────────────────────────────────────
function WhyNow() {
  return (
    <section id="why-now" className="py-20 px-6 bg-[#eeebe5]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1a1a18] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Why Now
        </h2>
        <p className="text-base text-[#4a4a46] leading-relaxed max-w-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          In ERCOT, power access and development timing increasingly determine site value. Many energy development sites already contain years of utility coordination, study work, land control, or local development progress. Maverick focuses on identifying those positions and converting that momentum into buyer-ready opportunities for data center use.
        </p>
      </div>
    </section>
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
    <section id="target-profile" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1a1a18] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
          Target Site Profile
        </h2>
        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
          {criteria.map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1a1a18] flex-shrink-0" />
              <p className="text-sm text-[#4a4a46] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────
function Process() {
  const steps = [
    {
      label: "Source",
      desc: "Identify distressed, stalled, and non-core energy development opportunities.",
    },
    {
      label: "Evaluate",
      desc: "Assess power availability, timing, transferability, constraints, and buyer fit.",
    },
    {
      label: "Acquire / Structure",
      desc: "Pursue land, lease, project-position, or other structured site exposure.",
    },
    {
      label: "Advance",
      desc: "Complete targeted diligence and positioning work to improve readiness and marketability.",
    },
    {
      label: "Exit",
      desc: "Deliver buyer-ready opportunities to data center developers, users, and capital partners.",
    },
  ];

  return (
    <section id="process" className="py-20 px-6 bg-[#eeebe5]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1a1a18] mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
          How Maverick Creates Value
        </h2>
        <div className="flex flex-col md:flex-row gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex-1 relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-5 left-full w-full h-px bg-[#c8c3bc] z-0" style={{ width: "calc(100% - 2rem)" }} />
              )}
              <div className="relative z-10 pr-6 pb-8 md:pb-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-full border border-[#1a1a18] flex items-center justify-center text-xs font-bold text-[#1a1a18] bg-[#eeebe5] flex-shrink-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-bold text-[#1a1a18] tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {step.label}
                  </span>
                </div>
                <p className="text-xs text-[#6a6a64] leading-relaxed pl-[52px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Who We Work With ─────────────────────────────────────────
function WhoWeWorkWith() {
  return (
    <section id="who-we-work-with" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1a1a18] mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
          Who We Work With
        </h2>
        <div className="grid sm:grid-cols-2 gap-12">
          <div>
            <h3 className="text-sm font-bold text-[#1a1a18] uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              For Buyers and Capital Partners
            </h3>
            <p className="text-sm text-[#4a4a46] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Maverick develops differentiated ERCOT opportunities for data center users, developers, and infrastructure investors seeking faster access to power-backed sites.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1a1a18] uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              For Sellers and Site Sources
            </h3>
            <p className="text-sm text-[#4a4a46] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              We evaluate distressed, paused, and non-core energy development positions where existing development work may still create meaningful value in a new use case.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Positioning ──────────────────────────────────────────────
function Positioning() {
  return (
    <section className="py-16 px-6 bg-[#1a1a18]">
      <div className="max-w-4xl mx-auto">
        <p className="text-xl sm:text-2xl font-bold text-[#f5f2ed] leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
          Not Raw Land. Not Full Vertical Development.
        </p>
        <p className="text-base text-[#b8b3ac] mt-4 max-w-2xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Maverick focuses on power-driven site opportunities where prior energy development work can create a real timing and execution advantage for data center buyers.
        </p>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1a1a18] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          About Maverick
        </h2>
        <p className="text-base text-[#4a4a46] leading-relaxed max-w-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Maverick Energy Partners is focused on acquiring and advancing ERCOT site opportunities where existing development progress, utility interface, and power-related groundwork can be repositioned for data center use. Our approach is selective, execution-oriented, and shaped by real buyer requirements.
        </p>
        <p className="text-sm text-[#7a7a74] mt-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Michael Siegel, Founder and CEO &mdash; Dallas, Texas
        </p>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-[#eeebe5]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1a1a18] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Contact
        </h2>
        <p className="text-base text-[#4a4a46] mb-6 max-w-xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          For site opportunities, buyer criteria discussions, or strategic conversations, contact:
        </p>
        <a
          href="mailto:info@maverickenergypartners.com"
          className="inline-flex items-center gap-2 text-base font-semibold text-[#1a1a18] hover:underline"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <Mail className="w-4 h-4" />
          info@maverickenergypartners.com
        </a>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-[#d8d3cc] bg-[#f5f2ed]">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm font-bold text-[#1a1a18] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
          MAVERICK ENERGY PARTNERS
        </p>
        <p className="text-xs text-[#7a7a74] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          ERCOT Power-Ready Site Acquisitions for Data Center Development
        </p>
        <a
          href="mailto:info@maverickenergypartners.com"
          className="text-xs text-[#7a7a74] hover:text-[#1a1a18] transition-colors"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          info@maverickenergypartners.com
        </a>
        <p className="text-xs text-[#aaa9a4] mt-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          &copy; {new Date().getFullYear()} Maverick Energy Partners. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f2ed" }}>
      <Nav />
      <Hero />
      <CredibilityStrip />
      <WhatWeDo />
      <Divider />
      <WhyNow />
      <Divider />
      <TargetSiteProfile />
      <Divider />
      <Process />
      <Divider />
      <WhoWeWorkWith />
      <Positioning />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
