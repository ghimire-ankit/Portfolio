"use client";
import { motion } from "framer-motion";
import { experiences } from "@/lib/data";

export default function Experience() {
    return (
        <section id="experience" className="relative">
            <span className="section-num select-none" aria-hidden>02</span>

            <div className="section-label">
                <span className="text-label text-[var(--accent)]">Experience & Education</span>
            </div>

            <motion.h2
                className="text-subheading text-[var(--text-primary)] mb-12 font-cormorant relative z-10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                The path so far.
            </motion.h2>

            <div className="timeline max-w-2xl relative z-10">
                {experiences.map((exp, i) => (
                    <motion.div
                        key={exp.id}
                        className="timeline-item group"
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="font-cormorant text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                                {exp.title}
                            </h3>
                            <span className={`text-label shrink-0 px-2 py-0.5 border ${exp.status === "Running"
                                ? "border-[var(--accent)] text-[var(--accent)]"
                                : "border-[var(--border)] text-[var(--text-secondary)]"
                                }`}>
                                {exp.status}
                            </span>
                        </div>

                        <p className="font-mono text-[11px] text-[var(--accent)] mb-1 tracking-widest">
                            {exp.institution}
                        </p>
                        <p className="text-label mb-3">{exp.period}</p>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                            {exp.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
