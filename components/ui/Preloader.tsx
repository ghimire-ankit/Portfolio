"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onDone }: { onDone: () => void }) {
    const [progress, setProgress] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        let raf: number;
        let start: number | null = null;
        const duration = 2400; // 2.4seconds for loading

        const ease = (t: number) =>
            t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const tick = (now: number) => {
            if (!start) start = now;
            const elapsed = now - start;
            const raw = Math.min(elapsed / duration, 1);
            const p = Math.round(ease(raw) * 100);
            setProgress(p);
            if (raw < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                setTimeout(() => setDone(true), 150);
                setTimeout(() => onDone(), 800);
            }
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [onDone]);

    return (
        <AnimatePresence>
            {!done ? (
                <motion.div
                    key="loader"
                    className="fixed inset-0 z-[9999] bg-[var(--bg-primary)] flex flex-col"
                    exit={{ clipPath: "inset(0 0 100% 0)" }}
                    transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Top bar — thin progress line */}
                    <div className="w-full h-px bg-[var(--border)] relative overflow-hidden">
                        <motion.div
                            className="absolute left-0 top-0 h-full bg-[var(--accent)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />

                    <div className="flex-1 flex flex-col items-center justify-center gap-12 relative z-10">
                        {/* Bold Countdown Text */}
                        <motion.div
                            className="font-outfit font-black tracking-tighter uppercase"
                            style={{ fontSize: "clamp(80px, 15vw, 240px)", lineHeight: 0.8 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {progress.toString().padStart(2, "0")}<span className="text-[var(--accent)]">.</span>
                        </motion.div>

                        <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                            Initializing Workspace
                        </div>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
