"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";

const innerSkills = ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML / CSS", "WordPress", "Canva"];
const outerSkills = ["Node.js", "Python", "Flask", "MySQL", "PostgreSQL", "Express.js", "Git / GitHub", "Figma", "Vercel", "Gemini API", "Zustand"];
const INNER_R = 130;
const OUTER_R = 215;
const INNER_DURATION = 22;
const OUTER_DURATION = 38;

/* ─── Single Orbit Ring ─────────────────────────────────── */
function OrbitRing({
    items, radius, duration, reverse = false,
}: { items: string[]; radius: number; duration: number; reverse?: boolean }) {
    const [paused, setPaused] = useState(false);

    return (
        <motion.div
            className="absolute inset-0"
            animate={{ rotate: reverse ? -360 : 360 }}
            transition={{ duration, repeat: Infinity, ease: "linear", ...(paused ? { playState: "paused" } : {}) }}
            style={{ animationPlayState: paused ? "paused" : "running" }}
            onHoverStart={() => setPaused(true)}
            onHoverEnd={() => setPaused(false)}
        >
            {items.map((item, i) => {
                const angle = (i / items.length) * 2 * Math.PI;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                    <div
                        key={item}
                        className="absolute"
                        style={{
                            top: "50%",
                            left: "50%",
                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        }}
                    >
                        {/* Counter-rotate text so it stays upright */}
                        <motion.span
                            className="skill-orbit-pill"
                            animate={{ rotate: reverse ? 360 : -360 }}
                            transition={{ duration, repeat: Infinity, ease: "linear" }}
                            whileHover={{ scale: 1.15, color: "var(--accent)", transition: { duration: 0.2 } }}
                        >
                            {item}
                        </motion.span>
                    </div>
                );
            })}
        </motion.div>
    );
}

/* ─── Orbit circles decoration ──────────────────────────── */
function OrbitPath({ r }: { r: number }) {
    return (
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
                borderRadius: "50%",
                position: "absolute",
                top: "50%",
                left: "50%",
                width: r * 2 + "px",
                height: r * 2 + "px",
                transform: "translate(-50%, -50%)",
                border: "1px dashed rgba(191,155,74,0.15)",
            }}
        />
    );
}

/* ─── Category pills (below orbit) ─────────────────────── */
const categories = ["frontend", "backend", "tools"] as const;
const catLabels = { frontend: "Frontend", backend: "Back-End", tools: "Tools & Infra" };

export default function Skills() {
    return (
        <section id="skills" className="relative overflow-hidden">
            <span className="section-num select-none" aria-hidden>04</span>

            <div className="section-label">
                <span className="text-label text-[var(--accent)]">Skills</span>
            </div>

            <motion.h2
                className="text-subheading text-[var(--text-primary)] mb-3 font-cormorant relative z-10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
            >
                The toolkit.
            </motion.h2>

            <motion.p
                className="text-label text-[var(--text-secondary)] mb-16 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                hover to pause the orbit
            </motion.p>

            {/* ── Orbital galaxy ── */}
            <motion.div
                className="relative w-full flex justify-center items-center"
                style={{ height: "520px" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
            >
                {/* Container sized to outer orbit */}
                <div className="relative" style={{ width: OUTER_R * 2 + 100, height: OUTER_R * 2 + 100 }}>
                    {/* Dashed orbit paths */}
                    <OrbitPath r={INNER_R} />
                    <OrbitPath r={OUTER_R} />

                    {/* Center circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="relative">
                            {/* Pulsing rings */}
                            <motion.div
                                className="absolute inset-0 rounded-full border border-[var(--accent)]"
                                animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                            />
                            <motion.div
                                className="absolute inset-0 rounded-full border border-[var(--accent)]"
                                animate={{ scale: [1, 1.5, 1.5], opacity: [0.4, 0, 0] }}
                                transition={{ duration: 2.5, delay: 0.8, repeat: Infinity, ease: "easeOut" }}
                            />
                            {/* Center disc */}
                            <div className="w-24 h-24 rounded-full bg-[var(--bg-surface)] border border-[var(--border)] flex flex-col items-center justify-center relative z-10">
                                <span className="font-cormorant text-2xl font-bold text-[var(--text-primary)] italic leading-none">AG</span>
                                <span className="text-[8px] font-mono uppercase tracking-widest text-[var(--accent)] mt-0.5">stack</span>
                            </div>
                        </div>
                    </div>

                    {/* Inner ring — CW */}
                    <OrbitRing items={innerSkills} radius={INNER_R} duration={INNER_DURATION} />

                    {/* Outer ring — CCW */}
                    <OrbitRing items={outerSkills} radius={OUTER_R} duration={OUTER_DURATION} reverse />
                </div>
            </motion.div>

            {/* ── Grouped pills below orbit ── */}
            <motion.div
                className="grid sm:grid-cols-3 gap-8 border-t border-[var(--border)] pt-12 mt-4 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {categories.map((cat) => (
                    <div key={cat}>
                        <h3 className="text-label text-[var(--accent)] mb-4">{catLabels[cat]}</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.filter((s) => s.category === cat).map((s) => (
                                <span key={s.name} className="skill-pill">{s.name}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
