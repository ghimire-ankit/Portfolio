"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { projects } from "@/lib/data";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import TextScramble from "@/components/ui/TextScramble";
import { HoverFeatureCards } from "@/components/ui/HoverFeatureCards";

const techTag = (tag: string) => (
    <span
        key={tag}
        className="skill-pill"
    >
        {tag}
    </span>
);

export default function Projects() {
    const featured = projects.filter((p) => p.featured);
    const others = projects.filter((p) => !p.featured);

    // Floating Image Follower States
    const [hoveredImg, setHoveredImg] = useState<string | null>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 220, damping: 26, mass: 0.5 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        // Track client coordinates
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <section id="projects" className="relative">
            <span className="section-num select-none" aria-hidden>03</span>

            <div className="section-label">
                <span className="text-label text-[var(--accent)]">
                    <TextScramble text="Work / Projects" />
                </span>
            </div>

            <motion.h2
                className="font-outfit text-subheading font-bold text-[var(--text-primary)] mb-16 relative z-10 uppercase tracking-tight"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                Things I&apos;ve Explored.
            </motion.h2>

            {/* Featured Projects with Images */}
            <div className="space-y-32 mb-32 relative z-10">
                {featured.map((project, i) => (
                    <motion.div
                        key={project.id}
                        className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Project visual / image */}
                        <div className={`relative aspect-[4/3] bg-[var(--bg-secondary)] border border-[var(--border)] overflow-hidden group ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="font-outfit text-8xl font-black text-[var(--bg-surface)] select-none">
                                        {project.id.toString().padStart(2, "0")}
                                    </span>
                                </div>
                            )}

                            {/* Hover overlay CTA */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                                <a
                                    href={project.liveUrl || project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-[11px] uppercase tracking-widest text-[var(--bg-primary)] bg-[var(--accent)] flex items-center gap-2 border border-[var(--accent)] px-6 py-3 hover:scale-105 transition-transform duration-300"
                                >
                                    View Project <ArrowUpRight size={14} />
                                </a>
                            </div>
                        </div>

                        {/* Project info */}
                        <div className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                            <span className="text-label text-[var(--accent)] mb-3 block">{project.category}</span>
                            <h3 className="font-outfit text-4xl font-bold text-[var(--text-primary)] mb-1 leading-tight tracking-tight uppercase">
                                {project.name}
                            </h3>
                            <p className="font-mono text-[11px] text-[var(--text-secondary)] mb-5 uppercase tracking-wider">
                                {project.tagline}
                            </p>
                            <div className="border border-[var(--border)] p-6 mb-6 bg-[var(--bg-secondary)]/50">
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                                    {project.description}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tech.map(techTag)}
                            </div>
                            <div className="flex gap-4">
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                                        <span>Live Demo</span>
                                        <ExternalLink size={11} />
                                    </a>
                                )}
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                                    <Github size={12} />
                                    <span>Source Code</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Other Projects using HoverFeatureCards */}
            <div className="relative z-10 mt-20 border-t border-[var(--border)] pt-16">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] mb-10">More Explorations</p>
                <HoverFeatureCards
                    items={[
                        ...others.map((project) => ({
                            name: project.name,
                            description: project.description,
                            href: project.liveUrl || project.githubUrl,
                            img: project.image,
                            imgWidth: 140,
                            fadeBottom: true,
                        })),
                        {
                            name: "AeroShare App",
                            description: "A secure WebRTC Peer-to-Peer file transfer application featuring local-first signalling and canvas styling.",
                            soon: true,
                        }
                    ]}
                />
            </div>
        </section>
    );
}
