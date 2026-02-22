import { useEffect, useRef, useCallback } from "react";

/**
 * FooterNeural — A smaller, dimmer canvas neural network for the footer area.
 * Fewer nodes, lower opacity, no mouse interaction — just ambient atmosphere.
 */

const NODE_COUNT = 20;
const CONNECT_DIST = 120;
const BASE_SPEED = 0.15;

interface FNode {
    x: number; y: number;
    vx: number; vy: number;
    r: number;
    phase: number;
}

export default function FooterNeural() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodesRef = useRef<FNode[]>([]);
    const rafRef = useRef(0);
    const sizeRef = useRef({ w: 0, h: 0 });
    const timeRef = useRef(0);

    const createNodes = useCallback((w: number, h: number) => {
        const nodes: FNode[] = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = (Math.random() * 0.5 + 0.5) * BASE_SPEED;
            nodes.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                r: Math.random() * 1.5 + 0.8,
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
            nodesRef.current = createNodes(rect.width, rect.height);
        };
        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            const { w, h } = sizeRef.current;
            const nodes = nodesRef.current;
            timeRef.current += 0.002;
            const t = timeRef.current;

            ctx.clearRect(0, 0, w, h);

            // Update
            for (const n of nodes) {
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > w) n.vx *= -1;
                if (n.y < 0 || n.y > h) n.vy *= -1;
                n.x = Math.max(0, Math.min(w, n.x));
                n.y = Math.max(0, Math.min(h, n.y));
            }

            // Connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const a = nodes[i], b = nodes[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist > CONNECT_DIST) continue;
                    const alpha = (1 - dist / CONNECT_DIST) * 0.12;
                    const pulse = Math.sin(t * 3 + (a.x + b.y) * 0.01) * 0.5 + 0.5;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(34,211,238,${alpha * (0.5 + pulse * 0.5)})`;
                    ctx.lineWidth = 0.4;
                    ctx.stroke();
                }
            }

            // Nodes
            for (const n of nodes) {
                const pulse = Math.sin(t * 2 + n.phase) * 0.5 + 0.5;
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(34,211,238,${0.15 + pulse * 0.2})`;
                ctx.fill();
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
        };
    }, [createNodes]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.35 }}
        />
    );
}
