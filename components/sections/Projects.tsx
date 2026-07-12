"use client";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Image from "next/image";

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

    return (
        <section id="projects" className="relative">
            <span className="section-num select-none" aria-hidden>03</span>

            <div className="section-label">
                <span className="text-label text-[var(--accent)]">Work / Projects</span>
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

            {/* Other Projects */}
            <div className="relative z-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] mb-6">More Explorations</p>
                <div className="border-t border-[var(--border)]">
                    {others.map((project, i) => (
                        <motion.a
                            key={project.id}
                            href={project.liveUrl || project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-row group block"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.45, delay: i * 0.1 }}
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-2">
                                <span className="project-row-num hidden sm:block">{(i + 1).toString().padStart(2, "0")}</span>
                                <div className="flex-1 min-w-0">
                                    <span className="font-outfit text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300 block leading-tight tracking-tight">
                                        {project.name}
                                    </span>
                                    <span className="font-mono text-[10px] text-[var(--text-secondary)] mt-1 block tracking-widest uppercase">{project.tagline}</span>
                                </div>
                                <div className="hidden lg:flex flex-wrap gap-2">
                                    {project.tech.slice(0, 3).map((tag) => (
                                        <span key={tag} className="text-[9px] font-mono text-[var(--text-secondary)] border border-[var(--border)] px-2 py-1 uppercase">{tag}</span>
                                    ))}
                                </div>
                                <ArrowUpRight
                                    size={18}
                                    className="text-[var(--border)] group-hover:text-[var(--accent)] transition-colors duration-300 shrink-0 self-end sm:self-auto"
                                />
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
