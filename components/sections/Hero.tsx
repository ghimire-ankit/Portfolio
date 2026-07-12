"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { personal, socials } from "@/lib/data";
import { Github } from "lucide-react";

/* ─── Hero section Name ─── */
function BoldGlitchName({ text, baseColor, hoverColor, isHovering }: { text: string, baseColor: string, hoverColor: string, isHovering: boolean }) {
    return (
        <span
            className="inline-block transition-colors duration-300"
            style={{ color: isHovering ? hoverColor : baseColor }}
        >
            {text.toUpperCase()}
        </span>
    );
}

/* ─── Mouse Parallax ─────────────────────────────────────── */
function useMouseParallax(strength = 0.02) {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            setPos({
                x: (e.clientX - window.innerWidth / 2) * strength,
                y: (e.clientY - window.innerHeight / 2) * strength,
            });
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, [strength]);
    return pos;
}

const rolesList = personal.roles;

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [nameHovering, setNameHovering] = useState(false);
    const parallax = useMouseParallax(0.015);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    useEffect(() => {
        const id = setInterval(() => setRoleIndex(i => (i + 1) % rolesList.length), 2400);
        return () => clearInterval(id);
    }, []);

    return (
        <section
            ref={ref}
            id="hero"
            className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-24"
        >
            {/* Background grid - like graph paper */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{
                    backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Glowing background meshes */}
            <motion.div
                className="absolute top-1/4 right-[5%] w-[40vw] h-[40vw] rounded-full pointer-events-none blur-[120px] opacity-20"
                style={{
                    background: "var(--accent)",
                    x: parallax.x * -1.5,
                    y: parallax.y * -1.5,
                }}
            />

            <motion.div style={{ y, opacity }} className="relative z-10 px-8 lg:px-16 max-w-7xl mx-auto w-full">

                {/* Top row: available badge & Resume */}
                <motion.div
                    className="flex flex-wrap items-center justify-between gap-4 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                        <span className="text-label">Exploring & Learning &nbsp;·&nbsp; {personal.location}</span>
                    </div>

                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost"
                        style={{ padding: '8px 16px', fontSize: '10px' }}
                    >
                        View Resume (PDF)
                    </a>
                </motion.div>

                {/* Main name — BOLD AND STRAIGHT SANS-SERIF */}
                <div
                    className="mb-6 relative w-max"
                    onMouseEnter={() => setNameHovering(true)}
                    onMouseLeave={() => setNameHovering(false)}
                >
                    <motion.h1
                        className="font-outfit font-black leading-[0.85] tracking-tighter block uppercase"
                        style={{ fontSize: "clamp(60px, 11vw, 150px)" }}
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <BoldGlitchName
                            text={personal.firstName}
                            isHovering={nameHovering}
                            baseColor="var(--text-primary)"
                            hoverColor="var(--accent)"
                        />
                        <br />
                        <span className="text-[var(--accent)]" style={{ color: nameHovering ? "var(--text-primary)" : "var(--accent)" }}>
                            {personal.lastName}
                        </span>
                    </motion.h1>
                </div>

                {/* Divider row */}
                <motion.div
                    className="flex items-center gap-6 mb-10"
                    initial={{ opacity: 0, scaleX: 0, originX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="h-px bg-[var(--border)] flex-1" />
                    {/* Role ticker */}
                    <div className="overflow-hidden h-5 flex-shrink-0">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={roleIndex}
                                className="block font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-secondary)]"
                                initial={{ y: "100%" }}
                                animate={{ y: "0%" }}
                                exit={{ y: "-100%" }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {rolesList[roleIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                    <div className="h-px bg-[var(--border)] w-24" />
                </motion.div>

                {/* Bottom row: tagline + CTAs */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-8 justify-between">
                    <motion.p
                        className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-md font-light"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                    >
                        {personal.tagline}
                    </motion.p>

                    <motion.div
                        className="flex items-center gap-4 flex-shrink-0"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.05, duration: 0.6 }}
                    >
                        <button
                            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                            className="btn-primary"
                        >
                            <span>Explore Work</span>
                            <span className="ml-1">→</span>
                        </button>
                        <a
                            href={socials.find((s) => s.name === "GitHub")?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ghost"
                        >
                            <Github size={13} />
                            <span>GitHub</span>
                        </a>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <motion.div
                    className="w-px h-16 bg-gradient-to-b from-[var(--text-secondary)] to-transparent"
                    animate={{ scaleY: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    style={{ originY: 0 }}
                />
            </motion.div>
        </section>
    );
}
