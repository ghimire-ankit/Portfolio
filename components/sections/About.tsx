"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { personal } from "@/lib/data";
import Terminal from "@/components/ui/Terminal";
import { MouseEvent } from "react";

function PhotoFrame() {
    // 3D tilt effect variables
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [15, -15]);
    const rotateY = useTransform(x, [-100, 100], [-15, 15]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className="photo-frame-3d perspective-1000 relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, z: 100 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div style={{ height: "340px", width: "270px" }} className="relative overflow-hidden group">
                {/* Vintage overlay effect on hover */}
                <div className="absolute inset-0 bg-[var(--accent)] opacity-0 group-hover:opacity-20 mix-blend-color-burn transition-opacity duration-500 z-10 pointer-events-none" />

                {/* Geometric scanline overlay on hover */}
                <div className="absolute inset-0 translate-y-[100%] group-hover:translate-y-[-100%] transition-transform duration-[1.5s] ease-in-out bg-gradient-to-b from-transparent via-[rgba(191,155,74,0.3)] to-transparent z-20 pointer-events-none" />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/ankit.webp"
                    alt="Ankit Ghimire"
                    className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700"
                />

                {/* Border frame that expands on hover */}
                <div className="absolute inset-0 border border-[var(--border)] group-hover:border-[var(--accent)] transition-colors duration-500 z-30 pointer-events-none" />
            </div>

            {/* Magnetic shadow */}
            <div className="absolute -inset-4 bg-[var(--accent)] opacity-0 blur-2xl -z-10 group-hover:opacity-10 transition-opacity duration-500" />
        </motion.div>
    );
}

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function About() {
    return (
        <section id="about" className="relative">
            <span className="section-num select-none" aria-hidden>01</span>

            <div className="section-label">
                <span className="text-label text-[var(--accent)]">About</span>
            </div>

            <div className="grid lg:grid-cols-[1fr,auto] gap-16 items-start relative z-10 mb-16">
                <div>
                    <motion.h2
                        className="text-heading text-[var(--text-primary)] mb-8 font-cormorant leading-tight"
                        custom={0} variants={fadeUp} initial="hidden" whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                    >
                        Exploring at the<br />
                        <em className="text-[var(--accent)]" style={{ fontStyle: "italic" }}>
                            edge of curious.
                        </em>
                    </motion.h2>

                    <motion.p
                        className="text-[var(--text-secondary)] leading-relaxed max-w-xl mb-5 text-[15px] font-light"
                        custom={1} variants={fadeUp} initial="hidden" whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                    >
                        {personal.bio}
                    </motion.p>

                    <motion.p
                        className="text-[var(--text-secondary)] leading-relaxed max-w-xl mb-12 text-[15px] font-light"
                        custom={2} variants={fadeUp} initial="hidden" whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                    >
                        When I&apos;m not digging into code, I&apos;m reading about AI breakthroughs, experimenting with new frameworks,
                        or thinking about how emerging tech works behind the scenes. I believe in learning by breaking things, fixing them, and shipping.
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        className="flex flex-wrap gap-10"
                        custom={3} variants={fadeUp} initial="hidden" whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                    >
                        {personal.stats.map((stat) => (
                            <div key={stat.label}>
                                <span className="block font-outfit text-4xl font-bold text-[var(--text-primary)]">
                                    {stat.value}
                                </span>
                                <span className="text-label mt-1 block">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    className="flex justify-center lg:block relative"
                    initial={{ opacity: 0, y: 20, x: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{ perspective: 1000 }}
                >
                    <PhotoFrame />
                </motion.div>
            </div>

            {/* Terminal */}
            <div className="relative z-10 mt-24">
                <Terminal />
            </div>
        </section>
    );
}
