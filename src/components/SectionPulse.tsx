import { useEffect, useRef, useState } from "react";

/**
 * SectionPulse — wraps a section and adds a brief neural "pulse" border
 * glow when the section first scrolls into view (one-shot).
 */

const PULSE_CSS = `
@keyframes section-neural-pulse {
  0%   { opacity: 0; }
  10%  { opacity: 0.8; }
  100% { opacity: 0; }
}
`;

function injectPulseCSS() {
    if (document.getElementById("section-pulse-css")) return;
    const el = document.createElement("style");
    el.id = "section-pulse-css";
    el.textContent = PULSE_CSS;
    document.head.appendChild(el);
}

interface SectionPulseProps {
    children: React.ReactNode;
    className?: string;
}

export default function SectionPulse({ children, className = "" }: SectionPulseProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [fired, setFired] = useState(false);

    useEffect(() => { injectPulseCSS(); }, []);

    useEffect(() => {
        if (fired || !ref.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setFired(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        obs.observe(ref.current);
        return () => obs.disconnect();
    }, [fired]);

    return (
        <div ref={ref} className={`relative ${className}`}>
            {/* Top pulse line */}
            {fired && (
                <div
                    className="absolute top-0 left-0 w-full h-px pointer-events-none"
                    style={{
                        background: "linear-gradient(90deg, transparent 5%, rgba(34,211,238,0.5) 30%, rgba(96,165,250,0.5) 70%, transparent 95%)",
                        animation: "section-neural-pulse 2s ease-out forwards",
                        boxShadow: "0 0 16px rgba(34,211,238,0.2), 0 0 32px rgba(34,211,238,0.08)",
                    }}
                />
            )}

            {/* Corner accents — flash once on entrance */}
            {fired && (
                <>
                    {/* Top-left */}
                    <div className="absolute top-0 left-0 pointer-events-none"
                        style={{
                            width: 30, height: 30,
                            borderTop: "1px solid rgba(34,211,238,0.4)",
                            borderLeft: "1px solid rgba(34,211,238,0.4)",
                            animation: "section-neural-pulse 2.5s ease-out forwards",
                        }}
                    />
                    {/* Top-right */}
                    <div className="absolute top-0 right-0 pointer-events-none"
                        style={{
                            width: 30, height: 30,
                            borderTop: "1px solid rgba(34,211,238,0.4)",
                            borderRight: "1px solid rgba(34,211,238,0.4)",
                            animation: "section-neural-pulse 2.5s ease-out 0.15s forwards",
                        }}
                    />
                </>
            )}

            {children}
        </div>
    );
}
