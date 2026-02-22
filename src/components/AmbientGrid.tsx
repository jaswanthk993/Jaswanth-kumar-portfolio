import { useEffect, useRef, useMemo, useState } from "react";

/**
 * AmbientGrid — Subtle background for non-hero sections.
 * Renders a very faint static grid + gently drifting micro-particles.
 * Lightweight: uses CSS animations only, no canvas, no RAF.
 */

const GRID_CSS = `
@keyframes ambient-drift { 
  0%,100% { transform: translateY(0) translateX(0); opacity:0.18; } 
  25% { transform: translateY(-14px) translateX(3px); opacity:0.35; }
  50% { transform: translateY(-6px) translateX(-4px); opacity:0.22; }
  75% { transform: translateY(-20px) translateX(2px); opacity:0.30; }
}
`;

function injectGridCSS() {
    if (document.getElementById("ambient-grid-css")) return;
    const el = document.createElement("style");
    el.id = "ambient-grid-css";
    el.textContent = GRID_CSS;
    document.head.appendChild(el);
}

export default function AmbientGrid({ particleCount = 12 }: { particleCount?: number }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        injectGridCSS();
        setIsMobile(window.innerWidth < 768);
    }, []);

    const particles = useMemo(() => {
        const count = isMobile ? Math.floor(particleCount / 2) : particleCount;
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 0.8,
            duration: Math.random() * 6 + 5,
            delay: Math.random() * 5,
        }));
    }, [particleCount, isMobile]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
            {/* Faint grid */}
            <div
                className="absolute inset-0"
                style={{
                    opacity: 0.025,
                    backgroundImage:
                        "linear-gradient(rgba(34,211,238,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.4) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            />
            {/* Micro-particles */}
            {particles.map(p => (
                <div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        backgroundColor: "rgba(34,211,238,0.35)",
                        animation: `ambient-drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
                    }}
                />
            ))}
        </div>
    );
}
