import { useState, useEffect, useRef } from "react";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import heroImage from "@/assets/jaswanth-kumar.jpg";
import Magnetic from "./Magnetic";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Achievements", id: "achievements" },
  { label: "Certificates", id: "certificates" },
  { label: "Contact", id: "contact" },
];

const SOCIALS = [
  { Icon: Github, href: "https://github.com/jaswanthk993", label: "GitHub" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/jaswanth-kumar-/", label: "LinkedIn" },
  { Icon: Mail, href: "mailto:jaswanthk993@gmail.com", label: "Email" },
];

/* ── Inject CSS ─────────────────────────────────────────────────────── */
const STYLES = `
@keyframes nav-ring-spin { to { transform: rotate(360deg); } }
@keyframes nav-slide-in  { from { opacity:0; transform:translateX(100%); } to { opacity:1; transform:translateX(0); } }
@keyframes nav-fade-up   { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
@keyframes nav-link-in   { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
@keyframes avatar-pulse  { 0%,100% { box-shadow:0 0 0 0 rgba(34,211,238,0.5); } 60% { box-shadow:0 0 0 5px rgba(34,211,238,0); } }

.nav-link-hover::after {
  content:'';
  position:absolute;
  bottom:-2px; left:50%;
  width:0; height:2px;
  background:linear-gradient(90deg,#06b6d4,#3b82f6);
  border-radius:999px;
  transition: width .25s ease, left .25s ease;
  transform:translateX(-50%);
}
.nav-link-hover:hover::after { width:70%; }
.nav-link-hover.active-nav-link::after { width:80%; box-shadow:0 0 6px rgba(34,211,238,.6); }

.nav-cursor-glow {
  pointer-events:none;
  position:absolute;
  top:0; left:0;
  width:160px; height:100%;
  background:radial-gradient(ellipse at center, rgba(34,211,238,0.06) 0%, transparent 70%);
  transition: transform .15s ease;
}
`;

function injectNavStyles() {
  if (document.getElementById("navbar-v2-styles")) return;
  const el = document.createElement("style");
  el.id = "navbar-v2-styles";
  el.textContent = STYLES;
  document.head.appendChild(el);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => { injectNavStyles(); setMounted(true); }, []);

  /* Scroll shadow */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.id).filter(id => id !== "home");
    const ratio = new Map<string, number>();
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => {
          ratio.set(id, e.intersectionRatio);
          // Find the section with the highest visible ratio
          let bestId = "home";
          let bestRatio = 0;
          for (const [k, r] of ratio.entries()) {
            if (r > bestRatio) { bestRatio = r; bestId = k; }
          }
          if (bestRatio > 0.05) setActiveId(bestId);
          else if (window.scrollY < 100) setActiveId("home");
        },
        { threshold: [0, 0.05, 0.1, 0.2, 0.4, 0.6] }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  /* Cursor glow follows mouse on desktop nav */
  const handleNavMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!navRef.current || !glowRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    glowRef.current.style.transform = `translateX(${e.clientX - rect.left - 80}px)`;
  };

  const scrollTo = (id: string) => {
    // Immediately update the active state for instant feedback
    setActiveId(id);
    setMenuOpen(false);
    if (id === "home") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.getElementById(id);
    if (!el) return;
    // Offset by navbar height (64px) so section isn't hidden behind the fixed header
    const navbarHeight = 64;
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(2,11,24,0.9)" : "rgba(2,11,24,0.35)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: scrolled
            ? "1px solid rgba(34,211,238,0.15)"
            : "1px solid rgba(255,255,255,0.04)",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.45)" : "none",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* ── Logo / Avatar ─────────────────────────────────────────── */}
          <button
            onClick={() => scrollTo("home")}
            className="relative group flex items-center gap-2.5 cursor-pointer"
            style={{ opacity: mounted ? 1 : 0, animation: mounted ? "nav-fade-up .5s ease .1s both" : "none" }}
          >
            {/* Spinning gradient ring */}
            <div className="relative w-8 h-8 shrink-0">
              {/* Outer ring — spins */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)",
                  animation: "nav-ring-spin 3s linear infinite",
                  padding: 1.5,
                }}
              />
              {/* Avatar */}
              <div className="absolute inset-[2px] rounded-full overflow-hidden border border-black/40"
                style={{ animation: "avatar-pulse 2.5s ease-in-out infinite" }}>
                <img
                  src={heroImage}
                  alt="Jaswanth Kumar"
                  className="w-full h-full object-cover object-top"
                  draggable={false}
                />
              </div>
              {/* Online dot */}
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 z-10"
                style={{ background: "#22c55e", borderColor: "rgba(2,11,24,0.9)" }} />
            </div>

            <div className="flex flex-col leading-none min-w-0">
              <span className="text-white font-bold text-sm sm:text-base tracking-wide group-hover:text-cyan-300 transition-colors duration-200 truncate">
                Jaswanth <span className="text-cyan-400">Kumar</span>
              </span>
              <span className="text-white/35 text-[9px] sm:text-[10px] font-mono tracking-widest truncate">AI ENGINEER</span>
            </div>
          </button>

          {/* ── Desktop Nav ───────────────────────────────────────────── */}
          <nav
            ref={navRef}
            className="hidden md:flex items-center gap-0.5 relative px-2"
            onMouseMove={handleNavMouseMove}
            onMouseLeave={() => {
              if (glowRef.current) glowRef.current.style.transform = "translateX(-9999px)";
            }}
          >
            {/* Cursor glow */}
            <div ref={glowRef} className="nav-cursor-glow" />

            {NAV_LINKS.map((link, i) => (
              <Magnetic key={link.id} strength={0.15}>
                <button
                  data-id={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`nav-link-hover relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer ${activeId === link.id ? "active-nav-link" : ""}`}
                  style={{
                    color: activeId === link.id ? "#67e8f9" : "rgba(255,255,255,0.55)",
                    background: "none",
                    border: "none",
                    opacity: mounted ? 1 : 0,
                    animation: mounted ? `nav-link-in .4s ease ${0.1 + i * 0.05}s both` : "none",
                  }}
                >
                  {link.label}
                </button>
              </Magnetic>
            ))}
          </nav>

          {/* ── Social + Hamburger ────────────────────────────────────── */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              {SOCIALS.map(({ Icon, href, label }, i) => (
                <Magnetic key={label} strength={0.2}>
                  <a href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 text-white/45 hover:text-cyan-300"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      opacity: mounted ? 1 : 0,
                      animation: mounted ? `nav-link-in .4s ease ${0.55 + i * 0.06}s both` : "none",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = "rgba(34,211,238,0.1)";
                      el.style.borderColor = "rgba(34,211,238,0.3)";
                      el.style.boxShadow = "0 0 14px rgba(34,211,238,0.25)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = "rgba(255,255,255,0.04)";
                      el.style.borderColor = "rgba(255,255,255,0.08)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    <Icon size={15} />
                  </a>
                </Magnetic>
              ))}
            </div>

            <button
              className="md:hidden w-12 h-12 flex items-center justify-center rounded-lg text-white/70 hover:text-white transition-all duration-200 active:scale-90"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                marginLeft: "8px"
              }}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen
                ? <X size={24} style={{ transition: "transform .2s", transform: "rotate(90deg)" }} />
                : <Menu size={24} />
              }
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ───────────────────────────────────────────── */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md md:hidden"
            onClick={() => setMenuOpen(false)}
            style={{ animation: "nav-fade-in .3s ease-out forwards" }}
          />
          <div
            className="fixed top-0 right-0 h-[100dvh] w-72 z-50 flex flex-col md:hidden"
            style={{
              background: "rgba(2,11,24,0.99)",
              borderLeft: "1px solid rgba(34,211,238,0.2)",
              boxShadow: "-10px 0 50px rgba(0,0,0,0.8)",
              animation: "nav-slide-in .4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            {/* Drawer header */}
            <div className="flex items-center gap-2.5 px-5 h-20 border-b border-white/5">
              <div className="relative w-10 h-10 shrink-0">
                <div className="absolute inset-0 rounded-full"
                  style={{ background: "conic-gradient(from 0deg,#06b6d4,#3b82f6,#8b5cf6,#06b6d4)", animation: "nav-ring-spin 3s linear infinite", padding: 1.5 }} />
                <div className="absolute inset-[2px] rounded-full overflow-hidden">
                  <img src={heroImage} alt="Jaswanth Kumar" className="w-full h-full object-cover object-top" />
                </div>
              </div>
              <div className="flex-1 flex flex-col leading-none">
                <span className="text-white font-bold text-base">Jaswanth <span className="text-cyan-400">Kumar</span></span>
                <span className="text-white/35 text-[11px] font-mono tracking-widest">AI ENGINEER</span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
              {NAV_LINKS.map((link, i) => (
                <button
                  key={link.id}
                  onClick={() => {
                    // Close menu slightly before scrolling to avoid visual glitches
                    setMenuOpen(false);
                    setTimeout(() => scrollTo(link.id), 50);
                  }}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-200 cursor-pointer group active:bg-cyan-500/10"
                  style={{
                    background: activeId === link.id ? "rgba(34,211,238,0.1)" : "transparent",
                    border: activeId === link.id ? "1px solid rgba(34,211,238,0.25)" : "1px solid transparent",
                    color: activeId === link.id ? "#67e8f9" : "rgba(255,255,255,0.7)",
                    animation: `nav-fade-up .3s ease ${i * 0.05}s both`,
                  }}
                >
                  <span className="w-2 h-2 rounded-full shrink-0 transition-colors"
                    style={{ background: activeId === link.id ? "#06b6d4" : "rgba(255,255,255,0.2)" }} />
                  <span className="font-semibold text-sm tracking-wide">{link.label}</span>
                  {activeId === link.id && (
                    <span className="ml-auto text-cyan-400/60 text-xs font-mono">●</span>
                  )}
                </button>
              ))}
            </nav>

            {/* Social row */}
            <div className="flex items-center gap-2.5 p-5 border-t border-white/5">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a key={label} href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex-1 flex items-center justify-center py-2.5 rounded-lg text-white/45 hover:text-cyan-400 transition-all duration-200 hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
