"use client";
import { motion } from "framer-motion";
import { personal } from "@/lib/data";
import Terminal from "@/components/ui/Terminal";
import RingGallery from "@/components/ui/RingGallery";
import TextScramble from "@/components/ui/TextScramble";


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
                <span className="text-label text-[var(--accent)]">
                    <TextScramble text="About" />
                </span>
            </div>

            <div className="grid lg:grid-cols-[1fr,auto] gap-16 items-center relative z-10 mb-16">
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
                    className="flex justify-center items-center relative overflow-visible"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <RingGallery
                        images={[
                            { image: { src: "/images/ankit.webp" }, focusY: 15 },
                            { image: { src: "/images/ankit2webp.webp" }, focusY: 25 },
                            { image: { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/859c75ea-953e-489e-be61-91a03a35d700/w=800" }, focusY: 40 },
                            { image: { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/7d4d2641-d6a8-4fef-e85c-b12ed100d500/w=800" }, focusY: 0 },
                            { image: { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/f8b3688c-11d0-425c-0b6f-66f133322c00/w=800" }, focusY: 50 }
                        ]}
                    />
                </motion.div>
            </div>

            {/* Terminal */}
            <div className="relative z-10 mt-24">
                <Terminal />
            </div>
        </section>
    );
}
