import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "@/assets/jaswanth-kumar.jpg";
import NeuralCanvas from "./NeuralCanvas";

/* ── CSS keyframes injected once ─────────────────────────────────────── */
const CSS_KEYFRAMES = `
@keyframes ring-cw  { to { transform: rotate(360deg); } }
@keyframes ring-ccw { to { transform: rotate(-360deg); } }
@keyframes glow-pulse { 0%,100% { opacity:.25; transform:scale(1); }  50% { opacity:.45; transform:scale(1.08); } }
@keyframes scan-line  { 0% { top:-4%; opacity:0; } 5% { opacity:1; } 90% { opacity:1; } 100% { top:104%; opacity:0; } }
@keyframes float-up  { 0%,100% { transform:translateY(0); opacity:.25; } 50% { transform:translateY(-18px); opacity:.55; } }
@keyframes fade-in-up { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes pulse-flow { 0% { offset-distance:0%; opacity:0; } 10% { opacity:1; } 90% { opacity:1; } 100% { offset-distance:100%; opacity:0; } }
@keyframes node-pulse { 0%,100% { r:2.5; opacity:.3; } 50% { r:4; opacity:.85; } }
@keyframes node-glow  { 0%,100% { filter:drop-shadow(0 0 2px rgba(34,211,238,.3)); } 50% { filter:drop-shadow(0 0 6px rgba(34,211,238,.7)); } }
@keyframes branch-draw { from { stroke-dashoffset:80; } to { stroke-dashoffset:0; } }
@keyframes data-rise   { 0% { transform:translateY(0); opacity:0; } 15% { opacity:.7; } 85% { opacity:.7; } 100% { transform:translateY(-340px); opacity:0; } }
`;

function injectStyles() {
    if (document.getElementById("jarvis-hero-styles")) return;
    const el = document.createElement("style");
    el.id = "jarvis-hero-styles";
    el.textContent = CSS_KEYFRAMES;
    document.head.appendChild(el);
}

/* ── Neural Circuit Animation ────────────────────────────────────────── */
function NeuralCircuit() {
    // Junction nodes along a vertical path
    const nodes = [
        { x: 16, y: 30 },
        { x: 20, y: 80 },
        { x: 14, y: 140 },
        { x: 22, y: 200 },
        { x: 16, y: 260 },
        { x: 20, y: 320 },
        { x: 14, y: 380 },
    ];
    // Branches going right from some nodes
    const branches = [
        { from: nodes[1], to: { x: 50, y: 65 } },
        { from: nodes[2], to: { x: 48, y: 150 } },
        { from: nodes[3], to: { x: 52, y: 215 } },
        { from: nodes[5], to: { x: 48, y: 305 } },
    ];

    return (
        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ width: 60, height: 420, opacity: 0, animation: "fade-in-up 1s ease .8s forwards" }}>
            <svg width="60" height="420" viewBox="0 0 60 420" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Main vertical line */}
                <line x1="18" y1="20" x2="18" y2="400" stroke="rgba(34,211,238,0.12)" strokeWidth="1" />

                {/* Branch lines */}
                {branches.map((b, i) => (
                    <line key={`branch-${i}`}
                        x1={b.from.x} y1={b.from.y} x2={b.to.x} y2={b.to.y}
                        stroke="rgba(34,211,238,0.10)"
                        strokeWidth="1"
                        strokeDasharray="4 3"
                        style={{ animation: `branch-draw 1s ease ${1.2 + i * 0.3}s both` }}
                    />
                ))}

                {/* Flowing data pulses along the main line */}
                {[0, 1.8, 3.6, 5.4].map((delay, i) => (
                    <circle key={`pulse-${i}`}
                        cx="18" cy="400" r="1.5"
                        fill="#22d3ee"
                        style={{ animation: `data-rise ${3.5}s ease-in-out ${delay}s infinite` }}
                    />
                ))}

                {/* Junction nodes with pulse */}
                {nodes.map((n, i) => (
                    <g key={`node-${i}`} style={{ animation: `node-glow 2.5s ease-in-out ${0.3 * i}s infinite` }}>
                        <circle cx={n.x} cy={n.y} r="2.5" fill="rgba(34,211,238,0.4)"
                            style={{ animation: `node-pulse 2.5s ease-in-out ${0.3 * i}s infinite` }} />
                        <circle cx={n.x} cy={n.y} r="1" fill="#22d3ee" />
                    </g>
                ))}

                {/* Branch endpoint dots */}
                {branches.map((b, i) => (
                    <circle key={`endpt-${i}`}
                        cx={b.to.x} cy={b.to.y} r="1.5"
                        fill="rgba(34,211,238,0.3)"
                        style={{ animation: `node-pulse 3s ease-in-out ${1 + i * 0.4}s infinite` }} />
                ))}
            </svg>
        </div>
    );
}

/* ── Typewriter Hook (one-shot) ──────────────────────────────────────── */
function useTypewriter(lines: string[], speed = 55) {
    const [state, setState] = useState({ lineIdx: 0, charIdx: 0, done: false });
    const [displayed, setDisplayed] = useState<string[]>(lines.map(() => ""));

    useEffect(() => {
        if (state.done) return;
        const { lineIdx, charIdx } = state;
        if (lineIdx >= lines.length) { setState(s => ({ ...s, done: true })); return; }

        const delay = charIdx >= lines[lineIdx].length ? 320 : speed;
        const t = setTimeout(() => {
            if (charIdx >= lines[lineIdx].length) {
                setState(s => ({ ...s, lineIdx: s.lineIdx + 1, charIdx: 0 }));
            } else {
                setDisplayed(prev => {
                    const next = [...prev];
                    next[lineIdx] = lines[lineIdx].slice(0, charIdx + 1);
                    return next;
                });
                setState(s => ({ ...s, charIdx: s.charIdx + 1 }));
            }
        }, delay);
        return () => clearTimeout(t);
    }, [state]);

    const activeLine = state.done ? -1 : state.lineIdx;
    return { displayed, activeLine, done: state.done };
}



/* ── Main Component ──────────────────────────────────────────────────── */
export default function JarvisHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const photoRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef(0);
    const mouseRef = useRef({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => { injectStyles(); }, []);

    // Scroll transforms
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });
    const ringsOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
    const glowOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const photoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.84]);
    const whiteBgOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);

    // Detect mobile
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Mouse parallax (RAF — desktop only)
    useEffect(() => {
        if (isMobile) return;
        const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
        window.addEventListener("mousemove", onMove);
        const loop = () => {
            if (photoRef.current) {
                const r = photoRef.current.getBoundingClientRect();
                const dx = (mouseRef.current.x - (r.left + r.width / 2)) / window.innerWidth;
                const dy = (mouseRef.current.y - (r.top + r.height / 2)) / window.innerHeight;
                photoRef.current.style.transform =
                    `perspective(800px) rotateX(${-dy * 10}deg) rotateY(${dx * 10}deg)`;
            }
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
        return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafRef.current); };
    }, [isMobile]);

    // Particles (stable — memoised)
    const particles = useMemo(() =>
        Array.from({ length: isMobile ? 8 : 18 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 4 + 3,
            delay: Math.random() * 4,
        })), [isMobile]);

    // Typewriter
    const roles = ["AI ENGINEER", "CLOUD BUILDER", "PROBLEM SOLVER"];
    const { displayed, activeLine } = useTypewriter(roles, 55);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center overflow-hidden"
            style={{ background: "linear-gradient(135deg,#020b18 0%,#041228 55%,#071a34 100%)" }}
        >
            {/* Neural Network Background */}
            <NeuralCanvas />

            {/* Grid */}
            <div className="absolute inset-0 pointer-events-none" style={{
                opacity: 0.055,
                backgroundImage: "linear-gradient(rgba(34,211,238,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.5) 1px,transparent 1px)",
                backgroundSize: "60px 60px",
            }} />

            {/* White scroll overlay */}
            <motion.div className="absolute inset-0 bg-white pointer-events-none" style={{ opacity: whiteBgOpacity }} />

            {/* Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map(p => (
                    <div key={p.id} className="absolute rounded-full bg-cyan-400/30"
                        style={{
                            left: `${p.x}%`, top: `${p.y}%`,
                            width: p.size, height: p.size,
                            animation: `float-up ${p.duration}s ease-in-out ${p.delay}s infinite`,
                        }}
                    />
                ))}
            </div>

            {/* Neural Circuit — left edge */}
            <NeuralCircuit />

            {/* Layout */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12 py-24 md:py-0">

                {/* ── Left: Text ─────────────────────────────────────────────── */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    {/* Tag */}
                    <p className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-4"
                        style={{ opacity: 0, animation: "fade-in-up .6s ease .2s forwards" }}>
                        — Hello. I am
                    </p>

                    {/* Name */}
                    <h1
                        className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white leading-none mb-8"
                        style={{ opacity: 0, animation: "fade-in-up .7s ease .4s forwards" }}
                    >
                        JASWANTH<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">KUMAR</span>
                    </h1>

                    {/* Typewriter Roles */}
                    <div className="mb-10 space-y-2 min-h-[90px]">
                        {roles.map((role, i) => (
                            <div key={role}
                                className="font-mono text-base sm:text-lg tracking-widest text-white/55 flex items-center gap-3"
                                style={{
                                    opacity: displayed[i].length > 0 ? 1 : 0,
                                    transition: "opacity .3s ease",
                                }}
                            >
                                <span className="w-4 h-px bg-cyan-400/60 shrink-0" />
                                {displayed[i]}
                                {i === activeLine && displayed[i].length > 0 && (
                                    <span className="inline-block w-0.5 h-4 bg-cyan-400"
                                        style={{ animation: "blink .8s step-end infinite" }} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start"
                        style={{ opacity: 0, animation: "fade-in-up .6s ease 1.8s forwards" }}>
                        <button
                            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                            className="px-6 py-3 rounded-lg bg-cyan-500 text-white font-semibold tracking-wider text-sm hover:bg-cyan-400 transition-all duration-200 shadow-[0_0_20px_rgba(34,211,238,.4)] hover:shadow-[0_0_30px_rgba(34,211,238,.65)]"
                        >GET IN TOUCH</button>
                        <button
                            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                            className="px-6 py-3 rounded-lg border border-cyan-400/40 text-cyan-300 font-semibold tracking-wider text-sm hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-200"
                        >VIEW PROJECTS</button>
                    </div>
                </div>

                {/* ── Right: PhotoOrb ─────────────────────────────────────────── */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <motion.div
                        className="relative flex items-center justify-center"
                        style={{ scale: photoScale, width: 440, height: 440 } as React.CSSProperties}
                    >


                        {/* Rings (pure CSS — always stable) */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            style={{ opacity: ringsOpacity }}
                        >
                            {/* Ring 1 */}
                            <div className="absolute rounded-full border border-cyan-400/25"
                                style={{ width: 310, height: 310, animation: "ring-cw 18s linear infinite" }}>
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,.9)]" />
                            </div>
                            {/* Ring 2 */}
                            <div className="absolute rounded-full border border-blue-400/20"
                                style={{ width: 365, height: 365, animation: "ring-ccw 26s linear infinite" }}>
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,.9)]" />
                            </div>
                            {/* Ring 3 dashed */}
                            <div className="absolute rounded-full"
                                style={{ width: 415, height: 415, border: "1px dashed rgba(34,211,238,.12)", animation: "ring-cw 42s linear infinite" }} />
                            {/* Orbiting dots */}
                            {[0, 72, 144, 216, 288].map((deg, i) => (
                                <div key={i} className="absolute rounded-full"
                                    style={{
                                        width: 338, height: 338,
                                        transform: `rotate(${deg}deg)`,
                                        animation: `ring-cw ${14 + i * 2}s linear infinite`,
                                    }}>
                                    <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400/65" />
                                </div>
                            ))}
                        </motion.div>

                        {/* Glow */}
                        <motion.div
                            className="absolute w-60 h-60 rounded-full pointer-events-none"
                            style={{
                                background: "radial-gradient(circle,rgba(34,211,238,.22) 0%,transparent 70%)",
                                animation: "glow-pulse 3s ease-in-out infinite",
                                opacity: glowOpacity as any,
                            } as React.CSSProperties}
                        />

                        {/* Photo */}
                        <div ref={photoRef} style={{ transition: "transform .1s ease-out", willChange: "transform" }}>
                            <div className="relative rounded-full overflow-hidden border-2 border-cyan-400/35 shadow-[0_0_40px_rgba(34,211,238,.25)]"
                                style={{ width: isMobile ? 210 : 248, height: isMobile ? 210 : 248 }}>
                                <img
                                    src={heroImage}
                                    alt="Jaswanth Kumar"
                                    className="w-full h-full object-cover object-top"
                                    draggable={false}
                                />
                                {/* Inner glow rim */}
                                <div className="absolute inset-0 rounded-full pointer-events-none"
                                    style={{ boxShadow: "inset 0 0 28px rgba(34,211,238,.18)" }} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                style={{ opacity: 0, animation: "fade-in-up .6s ease 2.8s forwards" }}>
                <span className="text-white/30 text-xs font-mono tracking-widest uppercase">Scroll</span>
                <div className="w-px h-8 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-b from-cyan-400/70 to-transparent"
                        style={{ animation: "scan-line 1.5s linear infinite" }} />
                </div>
            </div>
        </section>
    );
}
