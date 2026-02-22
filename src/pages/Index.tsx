import Navbar from "@/components/Navbar";
import JarvisHero from "@/components/JarvisHero";

import About from "@/components/About";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingBackground from "@/components/FloatingBackground";
import CustomCursor from "@/components/CustomCursor";
import AmbientGrid from "@/components/AmbientGrid";
import SectionPulse from "@/components/SectionPulse";
import FooterNeural from "@/components/FooterNeural";
import { useEffect } from "react";

import { motion, useScroll, useSpring } from "framer-motion";
import { HoverAnimation } from "@/components/ui/hover-animation";

/* ── Shared ultra-smooth spring config ────────────────────────────────── */
const sectionTransition = {
  type: "spring" as const,
  stiffness: 40,
  damping: 25,
  mass: 0.8,
};

/* ── Reusable section wrapper ─────────────────────────────────────────── */
function SmoothSection({
  children,
  particles = 10,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  particles?: number;
  className?: string;
  delay?: number;
}) {
  return (
    <SectionPulse>
      <motion.div
        className={`relative overflow-hidden ${className}`}
        style={{ willChange: "transform, opacity" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05, margin: "-40px" }}
        transition={{ ...sectionTransition, delay }}
      >
        <AmbientGrid particleCount={particles} />
        {children}
      </motion.div>
    </SectionPulse>
  );
}

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.0005,
  });

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* 3D Floating Background */}
      <FloatingBackground />

      {/* Custom AI Cursor */}
      <CustomCursor />

      {/* Progress Bar — ultra-smooth spring */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 origin-left z-50 shadow-[0_0_20px_rgba(34,211,238,0.6)]"
        style={{ scaleX }}
      />

      <HoverAnimation variant="lift" className="sticky top-0 z-40">
        <Navbar />
      </HoverAnimation>

      {/* Hero — full neural canvas already built in */}
      <JarvisHero />

      {/* ── Content sections with smooth springs ──────────────────── */}

      <SmoothSection particles={10}>
        <About />
      </SmoothSection>

      <SmoothSection particles={10}>
        <Skills />
      </SmoothSection>

      <SmoothSection particles={14} className="bg-slate-950">
        <Projects />
      </SmoothSection>

      <SmoothSection particles={8}>
        <Experience />
      </SmoothSection>

      <SmoothSection particles={8}>
        <Education />
      </SmoothSection>

      <SmoothSection particles={8}>
        <Achievements />
      </SmoothSection>

      <SmoothSection particles={8}>
        <Certificates />
      </SmoothSection>

      <SmoothSection particles={10}>
        <Contact />
      </SmoothSection>

      {/* Footer with dimmer neural canvas callback */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <FooterNeural />
        <Footer />
      </motion.div>
    </div>
  );
};

export default Index;