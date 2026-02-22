import { useEffect, useRef, useCallback } from "react";

/* ── Config ──────────────────────────────────────────────────────────── */
const NODE_COUNT = 55;      // total nodes
const CONNECT_DIST = 160;     // max distance to draw a line
const MOUSE_RADIUS = 200;     // cursor influence radius
const BASE_SPEED = 0.25;    // node drift speed
const PULSE_SPEED = 0.003;   // connection pulse rate
const NODE_MIN_R = 1.2;
const NODE_MAX_R = 3;
const MOBILE_NODE_CT = 28;

interface Node {
    x: number; y: number;
    vx: number; vy: number;
    r: number;
    baseAlpha: number;
    phase: number;  // for pulsing
}

export default function NeuralCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -999, y: -999 });
    const nodesRef = useRef<Node[]>([]);
    const rafRef = useRef(0);
    const sizeRef = useRef({ w: 0, h: 0 });
    const timeRef = useRef(0);

    const createNodes = useCallback((w: number, h: number) => {
        const count = w < 768 ? MOBILE_NODE_CT : NODE_COUNT;
        const nodes: Node[] = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = (Math.random() * 0.5 + 0.5) * BASE_SPEED;
            nodes.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                r: Math.random() * (NODE_MAX_R - NODE_MIN_R) + NODE_MIN_R,
                baseAlpha: Math.random() * 0.4 + 0.15,
                phase: Math.random() * Math.PI * 2,
            });
        }
        return nodes;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (!rect) return;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            sizeRef.current = { w: rect.width, h: rect.height };
            // Re-create nodes on resize
            nodesRef.current = createNodes(rect.width, rect.height);
        };
        resize();
        window.addEventListener("resize", resize);

        const onMouse = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        const onLeave = () => { mouseRef.current = { x: -999, y: -999 }; };
        canvas.addEventListener("mousemove", onMouse);
        canvas.addEventListener("mouseleave", onLeave);

        const draw = () => {
            const { w, h } = sizeRef.current;
            const nodes = nodesRef.current;
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            timeRef.current += PULSE_SPEED;
            const t = timeRef.current;

            ctx.clearRect(0, 0, w, h);

            // Update positions
            for (const n of nodes) {
                n.x += n.vx;
                n.y += n.vy;
                // Bounce off edges
                if (n.x < 0 || n.x > w) n.vx *= -1;
                if (n.y < 0 || n.y > h) n.vy *= -1;
                n.x = Math.max(0, Math.min(w, n.x));
                n.y = Math.max(0, Math.min(h, n.y));

                // Mouse repulsion (gentle)
                const dmx = n.x - mx;
                const dmy = n.y - my;
                const dMouse = Math.sqrt(dmx * dmx + dmy * dmy);
                if (dMouse < MOUSE_RADIUS && dMouse > 0) {
                    const force = (1 - dMouse / MOUSE_RADIUS) * 0.02;
                    n.vx += (dmx / dMouse) * force;
                    n.vy += (dmy / dMouse) * force;
                }
                // Dampen velocity
                n.vx *= 0.999;
                n.vy *= 0.999;
            }

            // Draw connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const a = nodes[i], b = nodes[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist > CONNECT_DIST) continue;

                    const alpha = (1 - dist / CONNECT_DIST) * 0.22;
                    // Pulse effect: sine wave makes connections "light up" in waves
                    const pulse = Math.sin(t * 4 + (a.x + b.y) * 0.01) * 0.5 + 0.5;
                    const finalAlpha = alpha * (0.5 + pulse * 0.5);

                    // Mouse proximity brightens connections
                    const midX = (a.x + b.x) / 2;
                    const midY = (a.y + b.y) / 2;
                    const mDist = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2);
                    const mouseBoost = mDist < MOUSE_RADIUS ? (1 - mDist / MOUSE_RADIUS) * 0.3 : 0;

                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(34,211,238,${Math.min(finalAlpha + mouseBoost, 0.5)})`;
                    ctx.lineWidth = 0.5 + pulse * 0.3;
                    ctx.stroke();

                    // Occasionally draw a "data pulse" dot moving along the connection
                    if (dist < CONNECT_DIST * 0.6 && pulse > 0.75) {
                        const progress = (Math.sin(t * 6 + i * 0.5) * 0.5 + 0.5);
                        const px = a.x + (b.x - a.x) * progress;
                        const py = a.y + (b.y - a.y) * progress;
                        ctx.beginPath();
                        ctx.arc(px, py, 1.2, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(34,211,238,${0.4 + pulse * 0.4})`;
                        ctx.fill();
                    }
                }
            }

            // Draw nodes
            for (const n of nodes) {
                const pulse = Math.sin(t * 3 + n.phase) * 0.5 + 0.5;
                const dMouse = Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2);
                const mouseGlow = dMouse < MOUSE_RADIUS ? (1 - dMouse / MOUSE_RADIUS) : 0;

                // Outer glow
                if (mouseGlow > 0.1 || pulse > 0.6) {
                    const glowR = n.r * (2.5 + mouseGlow * 2);
                    const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
                    gradient.addColorStop(0, `rgba(34,211,238,${(0.15 + mouseGlow * 0.2) * pulse})`);
                    gradient.addColorStop(1, "rgba(34,211,238,0)");
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }

                // Core dot
                const coreAlpha = n.baseAlpha + pulse * 0.3 + mouseGlow * 0.4;
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r * (1 + mouseGlow * 0.5), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(34,211,238,${Math.min(coreAlpha, 1)})`;
                ctx.fill();
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", onMouse);
            canvas.removeEventListener("mouseleave", onLeave);
        };
    }, [createNodes]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-auto"
            style={{ opacity: 0.6 }}
        />
    );
}
