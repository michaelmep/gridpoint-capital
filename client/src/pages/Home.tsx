/* ============================================================
   Maverick Energy Partners — Home Landing Page
   Design: Dark Infrastructure / Cinematic Depth
   Sections: Nav, Hero, Stats Bar, Value Prop, Process, Why Now,
             Portfolio Criteria, Team, Contact CTA, Footer
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Zap, MapPin, Clock, Shield, TrendingUp, ChevronRight,
  ArrowRight, Building2, Bolt, Layers, CheckCircle2,
  BarChart3, Globe2, Mail, Menu, X
} from "lucide-react";

// ─── Asset URLs ───────────────────────────────────────────────
const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663485169196/GApUs5ni8WEeKZLasNEuAR/logo-mep-2HQMdqhyo2JijDgTSHUCNe.webp";
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663485169196/GApUs5ni8WEeKZLasNEuAR/hero-main-3zsqBvvNTiztYStnLq5qgF.webp";
const PROCESS_POWER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663485169196/GApUs5ni8WEeKZLasNEuAR/process-power-k69UneSXEQcCTYTUP4pKcu.webp";
const PROCESS_SITE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663485169196/GApUs5ni8WEeKZLasNEuAR/process-site-atsUvUuMhp53sd6Rr5wbTy.webp";
const PROCESS_DC_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663485169196/GApUs5ni8WEeKZLasNEuAR/process-datacenter-U2SdmxHcMtPkz8fXFMvkuh.webp";
const ABSTRACT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663485169196/GApUs5ni8WEeKZLasNEuAR/abstract-grid-CMsbsrjzWQSVNyXZPFvMAR.webp";

// ─── Animated Counter ─────────────────────────────────────────
function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ─── Navigation ───────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = ["About", "Process", "Why Now", "Portfolio", "Contact"];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "oklch(0.13 0.025 250 / 92%)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(1 0 0 / 8%)" : "none",
      }}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <img src={LOGO_URL} alt="MEP - Maverick Energy Partners" className="w-9 h-9" />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "oklch(0.72 0.015 250)", fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.95 0.005 250)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.72 0.015 250)")}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="gp-btn-primary px-5 py-2.5 rounded-md text-sm font-semibold"
          >
            Inquire Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-6 pt-2 space-y-4"
          style={{ background: "oklch(0.13 0.025 250 / 96%)", borderTop: "1px solid oklch(1 0 0 / 8%)" }}>
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="block text-sm font-medium py-2"
              style={{ color: "oklch(0.72 0.015 250)" }}
              onClick={() => setMobileOpen(false)}
            >
              {link}
            </a>
          ))}
          <a href="#contact" className="gp-btn-primary block text-center px-5 py-2.5 rounded-md text-sm font-semibold">
            Inquire Now
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="about">
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <img
          src={HERO_IMG}
          alt="Electrical infrastructure transformed into data center"
          className="w-full h-full object-cover"
          style={{ transform: "scale(1.1)" }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, oklch(0.13 0.025 250 / 90%) 0%, oklch(0.13 0.025 250 / 60%) 60%, oklch(0.13 0.025 250 / 30%) 100%)"
          }} />
        <div className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, oklch(0.13 0.025 250) 0%, transparent 40%)"
          }} />
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10 container py-32 pt-40" style={{ opacity }}>
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="gp-section-tag mb-6 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              Electrical Infrastructure Repositioning
            </span>
          </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-6"
              style={{ fontFamily: "'Sora', sans-serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Power Already{" "}
              <span className="gp-text-gradient">In The Ground.</span>{" "}
              <span style={{ color: "oklch(0.75 0.14 75)" }}>Ready To Build.</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
              style={{ color: "oklch(0.78 0.015 250)", fontFamily: "'DM Sans', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Maverick Energy Partners identifies, acquires, and repositions existing electrical infrastructure — substations, retired power plants, and grid-connected industrial sites — into fully entitled, shovel-ready data center campuses. We compress years of development timelines into months.
            </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <a href="#contact" className="gp-btn-primary px-8 py-4 rounded-md text-base font-semibold flex items-center gap-2 justify-center">
              Start a Conversation <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#process" className="gp-btn-outline px-8 py-4 rounded-md text-base font-medium flex items-center gap-2 justify-center">
              How It Works
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="gp-label">Scroll</span>
        <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, oklch(0.62 0.22 230), transparent)" }} />
      </motion.div>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: 4200, suffix: "+ MW", label: "Pipeline Capacity" },
    { value: 18, suffix: " Sites", label: "Active Portfolio" },
    { value: 60, suffix: "%", label: "Faster Time-to-Power" },
    { value: 3, suffix: "–7 Yrs", label: "Saved vs. Greenfield", isText: true },
  ];

  return (
    <section className="relative z-10" style={{ background: "oklch(0.17 0.028 250)", borderTop: "1px solid oklch(1 0 0 / 8%)", borderBottom: "1px solid oklch(1 0 0 / 8%)" }}>
      <div className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x" style={{ "--tw-divide-opacity": "0.08" } as React.CSSProperties}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center md:items-start md:px-10 gap-1"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="gp-stat-number text-3xl md:text-4xl font-bold text-white">
                {stat.isText ? (
                  <span>{stat.value}{stat.suffix}</span>
                ) : (
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <div className="gp-label" style={{ fontFamily: "'DM Mono', monospace" }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Value Proposition ────────────────────────────────────────
function ValueProp() {
  const pillars = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Existing Grid Connections",
      description: "We source sites with live or recently retired high-voltage interconnects — eliminating the single longest lead-time item in data center development.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Fully Entitled & Permitted",
      description: "Every site in our portfolio arrives with zoning approvals, environmental clearances, and utility agreements already in place. No permitting risk.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Months, Not Years",
      description: "Traditional greenfield development takes 3–7 years to reach shovel-ready status. Our repositioned sites compress that to 6–18 months.",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Strategic Site Selection",
      description: "We target sites in constrained markets where power scarcity creates a durable competitive moat — maximizing long-term asset value.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Institutional-Grade Returns",
      description: "Our repositioning model captures the spread between distressed industrial asset pricing and premium data center land valuations.",
    },
    {
      icon: <Globe2 className="w-6 h-6" />,
      title: "National Coverage",
      description: "Active pipeline across 14 states, with concentration in power-constrained markets including Northern Virginia, Texas, the Midwest, and Pacific Northwest.",
    },
  ];

  return (
    <section className="py-28" id="about" style={{ background: "oklch(0.13 0.025 250)" }}>
      <div className="container">
        <div className="mb-16">
          <motion.span
            className="gp-section-tag mb-4 inline-flex"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            Our Approach
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight"
            style={{ fontFamily: "'Sora', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            The Infrastructure Is Already There.{" "}
            <span className="gp-text-gradient">Maverick Unlocks It.</span>
          </motion.h2>
          <motion.p
            className="mt-5 text-lg max-w-2xl leading-relaxed"
            style={{ color: "oklch(0.65 0.02 250)" }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            The data center industry faces a fundamental constraint: power. Grid interconnection queues stretch 5–10 years. Maverick Energy Partners' strategy bypasses this bottleneck entirely by repositioning sites that already have what developers need most.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              className="gp-card p-7"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5"
                style={{ background: "oklch(0.62 0.22 230 / 15%)", color: "oklch(0.62 0.22 230)" }}>
                {pillar.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "oklch(0.62 0.02 250)" }}>
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process Section ──────────────────────────────────────────
function Process() {
  const steps = [
    {
      number: "01",
      title: "Site Identification & Acquisition",
      description: "Our proprietary screening process evaluates thousands of grid-connected industrial assets annually. We target sites with 10–75 MW of existing or recently retired capacity, clear title, and favorable zoning.",
      image: PROCESS_POWER_IMG,
      tags: ["Grid Screening", "Title Review", "Utility Coordination"],
    },
    {
      number: "02",
      title: "Repositioning & Entitlement",
      description: "We execute the complex, time-intensive work: environmental remediation, utility agreements, zoning amendments, permitting, and infrastructure upgrades — delivering a fully de-risked, shovel-ready parcel.",
      image: PROCESS_SITE_IMG,
      tags: ["Environmental", "Permitting", "Utility Agreements"],
    },
    {
      number: "03",
      title: "Delivery to Developers",
      description: "Qualified hyperscalers, colocation operators, and institutional developers receive a turnkey site — power secured, permits in hand, ready for vertical construction within 90 days.",
      image: PROCESS_DC_IMG,
      tags: ["Hyperscale Ready", "Colo Ready", "Build-to-Suit"],
    },
  ];

  return (
    <section className="py-28" id="process" style={{ background: "oklch(0.15 0.026 250)" }}>
      <div className="container">
        <div className="mb-16">
          <motion.span
            className="gp-section-tag mb-4 inline-flex"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            The Process
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight"
            style={{ fontFamily: "'Sora', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            From Stranded Asset to{" "}
            <span className="gp-text-gradient">Shovel-Ready Site</span>
          </motion.h2>
        </div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="gp-card overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              <div className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                {/* Image */}
                <div className="lg:w-2/5 h-64 lg:h-auto relative overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to right, transparent, oklch(0.17 0.028 250 / 20%))" }} />
                </div>

                {/* Content */}
                <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-start gap-5 mb-5">
                    <span className="gp-stat-number text-5xl font-bold leading-none"
                      style={{ color: "oklch(0.62 0.22 230 / 25%)" }}>
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
                        {step.title}
                      </h3>
                      <p className="text-base leading-relaxed" style={{ color: "oklch(0.65 0.02 250)" }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-0 lg:ml-20">
                    {step.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1.5 rounded-full"
                        style={{
                          background: "oklch(0.62 0.22 230 / 10%)",
                          border: "1px solid oklch(0.62 0.22 230 / 20%)",
                          color: "oklch(0.72 0.2 225)",
                          fontFamily: "'DM Mono', monospace",
                          letterSpacing: "0.05em"
                        }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Now Section ──────────────────────────────────────────
function WhyNow() {
  const drivers = [
    {
      icon: <BarChart3 className="w-5 h-5" />,
      stat: "35 GW",
      label: "New data center capacity needed by 2030",
      source: "McKinsey, 2025",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      stat: "5–10 Yrs",
      label: "Typical grid interconnection queue wait time",
      source: "FERC, 2025",
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      stat: "$1M+",
      label: "Per-acre premium for power-ready land",
      source: "Bisnow, 2026",
    },
    {
      icon: <Bolt className="w-5 h-5" />,
      stat: "400+",
      label: "Retired power plants with stranded grid connections",
      source: "EIA, 2025",
    },
  ];

  const points = [
    "AI workloads are driving unprecedented, sustained electricity demand growth — far outpacing new grid capacity.",
    "Hyperscalers and colocation operators are paying record premiums for sites with existing power infrastructure.",
    "Regulatory and environmental permitting timelines have lengthened, making entitled brownfield sites exponentially more valuable.",
    "Utility interconnection queues have reached historic lengths, creating a structural bottleneck that repositioned sites bypass entirely.",
  ];

  return (
    <section className="py-28 relative overflow-hidden" id="why-now">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={ABSTRACT_BG} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0" style={{ background: "oklch(0.13 0.025 250 / 85%)" }} />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <motion.span
              className="gp-section-tag mb-4 inline-flex"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              Market Opportunity
            </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "'Sora', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            The Power Constraint Is{" "}
            <span style={{ color: "oklch(0.75 0.14 75)" }}>Structural.</span> Maverick's{" "}
            <span className="gp-text-gradient">Advantage Is Permanent.</span>
          </motion.h2>
            <div className="space-y-4">
              {points.map((point, i) => (
                <motion.div
                  key={i}
                  className="flex gap-3 items-start"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "oklch(0.62 0.22 230)" }} />
                  <p className="text-sm leading-relaxed" style={{ color: "oklch(0.72 0.015 250)" }}>{point}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {drivers.map((d, i) => (
              <motion.div
                key={i}
                className="gp-card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1 }}
              >
                <div className="w-9 h-9 rounded-md flex items-center justify-center mb-4"
                  style={{ background: "oklch(0.75 0.14 75 / 15%)", color: "oklch(0.75 0.14 75)" }}>
                  {d.icon}
                </div>
                <div className="gp-stat-number text-3xl font-bold text-white mb-1">{d.stat}</div>
                <p className="text-xs leading-snug mb-2" style={{ color: "oklch(0.65 0.02 250)" }}>{d.label}</p>
                <span className="gp-label" style={{ color: "oklch(0.5 0.02 250)", fontSize: "0.6rem" }}>{d.source}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio Criteria ───────────────────────────────────────
function PortfolioCriteria() {
  const criteria = [
    { label: "Power Capacity", value: "10 – 75 MW", icon: <Zap className="w-4 h-4" /> },
    { label: "Site Acreage", value: "20 – 500+ acres", icon: <MapPin className="w-4 h-4" /> },
    { label: "Voltage Level", value: "115 kV – 500 kV", icon: <Bolt className="w-4 h-4" /> },
    { label: "Asset Types", value: "Power Plants, Substations, Industrial", icon: <Building2 className="w-4 h-4" /> },
    { label: "Geography", value: "Constrained U.S. Markets", icon: <Globe2 className="w-4 h-4" /> },
    { label: "Timeline to Delivery", value: "6 – 18 Months", icon: <Clock className="w-4 h-4" /> },
  ];

  const targetMarkets = [
    "Northern Virginia / DC Metro",
    "Dallas–Fort Worth, TX",
    "Chicago Metro, IL",
    "Phoenix, AZ",
    "Atlanta, GA",
    "Portland / Seattle, PNW",
    "Columbus, OH",
    "Kansas City, MO/KS",
  ];

  return (
    <section className="py-28" id="portfolio" style={{ background: "oklch(0.13 0.025 250)" }}>
      <div className="container">
        <div className="mb-16">
          <motion.span
            className="gp-section-tag mb-4 inline-flex"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            Site Criteria
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight"
            style={{ fontFamily: "'Sora', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            What Maverick{" "}
            <span className="gp-text-gradient">Acquires & Repositions</span>
          </motion.h2>
          <motion.p
            className="mt-5 text-lg max-w-xl leading-relaxed"
            style={{ color: "oklch(0.65 0.02 250)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Maverick is actively acquiring grid-connected industrial assets. If you own or represent a site that meets our criteria, we want to hear from you.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Criteria table */}
          <motion.div
            className="gp-card overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="px-7 py-5 border-b" style={{ borderColor: "oklch(1 0 0 / 8%)" }}>
              <h3 className="font-semibold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>Acquisition Criteria</h3>
            </div>
            <div className="divide-y" style={{ "--tw-divide-opacity": "1" } as React.CSSProperties}>
              {criteria.map((c, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between px-7 py-4"
                  style={{ borderColor: "oklch(1 0 0 / 6%)" }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="flex items-center gap-3">
                    <span style={{ color: "oklch(0.62 0.22 230)" }}>{c.icon}</span>
                    <span className="text-sm" style={{ color: "oklch(0.65 0.02 250)" }}>{c.label}</span>
                  </div>
                  <span className="gp-stat-number text-sm font-medium text-white">{c.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Target markets */}
          <motion.div
            className="gp-card p-7"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-semibold text-white mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>
              Target Markets
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {targetMarkets.map((market, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2.5 py-3 px-4 rounded-md"
                  style={{ background: "oklch(0.22 0.03 250)" }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "oklch(0.62 0.22 230)" }} />
                  <span className="text-sm" style={{ color: "oklch(0.78 0.015 250)" }}>{market}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg" style={{ background: "oklch(0.75 0.14 75 / 8%)", border: "1px solid oklch(0.75 0.14 75 / 20%)" }}>
              <p className="text-sm" style={{ color: "oklch(0.85 0.12 75)" }}>
                <strong>Actively acquiring.</strong> We close quickly with all-cash offers and can execute NDAs within 24 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Differentiators ──────────────────────────────────────────
function Differentiators() {
  const items = [
    {
      title: "Proprietary Deal Flow",
      description: "Our network of utility executives, industrial asset managers, and real estate brokers surfaces off-market opportunities before they reach the open market.",
    },
    {
      title: "Deep Utility Relationships",
      description: "Decades of combined experience working with transmission operators and distribution utilities enables us to navigate interconnection agreements that others cannot.",
    },
    {
      title: "Integrated Execution",
      description: "We manage every phase in-house: acquisition, environmental, permitting, utility coordination, and site preparation — eliminating the coordination risk of fragmented development.",
    },
    {
      title: "Capital Efficiency",
      description: "Our repositioning model generates premium returns by capturing the valuation spread between distressed industrial pricing and data center land values — without the construction risk of vertical development.",
    },
  ];

  return (
    <section className="py-28" style={{ background: "oklch(0.15 0.026 250)" }}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="gp-section-tag mb-4 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              Competitive Edge
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "'Sora', sans-serif" }}>
              Why Maverick{" "}
              <span className="gp-text-gradient">Outperforms</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "oklch(0.65 0.02 250)" }}>
              Maverick's team combines deep expertise in power infrastructure, real estate development, and institutional capital markets — a combination that is rare and difficult to replicate.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { n: "14", label: "States Active" },
                { n: "25+", label: "Years Combined Experience" },
                { n: "$2B+", label: "Assets Evaluated" },
              ].map((s, i) => (
                <div key={i} className="text-center p-4 rounded-lg" style={{ background: "oklch(0.17 0.028 250)" }}>
                  <div className="gp-stat-number text-2xl font-bold text-white">{s.n}</div>
                  <div className="gp-label mt-1" style={{ fontSize: "0.6rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={i}
                className="gp-card p-6 flex gap-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "oklch(0.62 0.22 230 / 15%)" }}>
                  <ChevronRight className="w-4 h-4" style={{ color: "oklch(0.62 0.22 230)" }} />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "oklch(0.62 0.02 250)" }}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact / CTA ────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", interest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    background: "oklch(0.22 0.03 250)",
    border: "1px solid oklch(1 0 0 / 12%)",
    color: "oklch(0.95 0.005 250)",
    borderRadius: "0.5rem",
    padding: "0.75rem 1rem",
    fontSize: "0.9rem",
    fontFamily: "'DM Sans', sans-serif",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  return (
    <section className="py-28 relative overflow-hidden" id="contact">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ background: "oklch(0.13 0.025 250)" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] opacity-15"
          style={{ background: "oklch(0.62 0.22 230)" }} />
      </div>

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              className="gp-section-tag mb-4 inline-flex"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              Get In Touch
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Sora', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Ready to Move at the{" "}
              <span className="gp-text-gradient">Speed of Maverick?</span>
            </motion.h2>
            <motion.p
              className="mt-4 text-lg max-w-xl mx-auto"
              style={{ color: "oklch(0.65 0.02 250)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              Whether you are a developer seeking shovel-ready sites, an investor evaluating the opportunity, or a site owner with grid-connected assets, we want to connect.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact info */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h3 className="font-semibold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Who We Serve
                </h3>
                {[
                  "Hyperscale cloud providers",
                  "Colocation operators",
                  "AI infrastructure developers",
                  "Institutional real estate investors",
                  "Industrial asset owners",
                  "Utility and energy companies",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 py-2.5 border-b" style={{ borderColor: "oklch(1 0 0 / 6%)" }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.75 0.14 75)" }} />
                    <span className="text-sm" style={{ color: "oklch(0.72 0.015 250)" }}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <a href="mailto:info@maverickenergypartners.com"
                  className="flex items-center gap-3 text-sm transition-colors"
                  style={{ color: "oklch(0.65 0.02 250)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.95 0.005 250)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.65 0.02 250)")}
                >
                  <Mail className="w-4 h-4" style={{ color: "oklch(0.62 0.22 230)" }} />
                  info@maverickenergypartners.com
                </a>

              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {submitted ? (
                <div className="gp-card p-10 text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "oklch(0.62 0.22 230 / 15%)" }}>
                    <CheckCircle2 className="w-7 h-7" style={{ color: "oklch(0.62 0.22 230)" }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
                    Message Received
                  </h3>
                  <p className="text-sm" style={{ color: "oklch(0.65 0.02 250)" }}>
                    A member of our team will respond within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="gp-card p-8 space-y-5">
                  <div>
                    <label className="gp-label block mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Smith"
                      style={inputStyle}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.62 0.22 230 / 60%)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 12%)")}
                    />
                  </div>
                  <div>
                    <label className="gp-label block mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      style={inputStyle}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.62 0.22 230 / 60%)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 12%)")}
                    />
                  </div>

                  <div>
                    <label className="gp-label block mb-2">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your needs or the asset you represent..."
                      style={{ ...inputStyle, resize: "vertical" }}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.62 0.22 230 / 60%)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 12%)")}
                    />
                  </div>
                  <button type="submit" className="gp-btn-primary w-full py-3.5 rounded-md font-semibold text-base flex items-center justify-center gap-2">
                    Send Inquiry <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "oklch(0.10 0.02 250)", borderTop: "1px solid oklch(1 0 0 / 8%)" }}>
      <div className="container py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: "oklch(0.42 0.015 250)", fontFamily: "'DM Mono', monospace" }}>
            © 2026 Maverick Energy Partners. All rights reserved.
          </p>
          <a href="mailto:info@maverickenergypartners.com"
            className="text-xs transition-colors"
            style={{ color: "oklch(0.42 0.015 250)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.65 0.02 250)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.42 0.015 250)")}
          >
            info@maverickenergypartners.com
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Export ──────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.13 0.025 250)" }}>
      <Nav />
      <Hero />
      <StatsBar />
      <ValueProp />
      <Process />
      <WhyNow />
      <PortfolioCriteria />
      <Differentiators />
      <Contact />
      <Footer />
    </div>
  );
}
