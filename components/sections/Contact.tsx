"use client";
import { motion } from "framer-motion";
import { socials, personal } from "@/lib/data";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import TextScramble from "@/components/ui/TextScramble";

const getSocialIcon = (name: string) => {
    if (name === "GitHub") return <Github size={16} />;
    if (name === "LinkedIn") return <Linkedin size={16} />;
    if (name === "Email") return <Mail size={16} />;
    return null;
};

export default function Contact() {
    return (
        <section id="contact" className="text-center">
            <motion.span
                className="text-label block mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <TextScramble text="Get in touch" />
            </motion.span>

            <motion.h2
                className="text-heading text-[var(--text-primary)] mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                Let&apos;s build<br />
                <span className="text-[var(--accent)] italic">something.</span>
            </motion.h2>

            <motion.p
                className="text-[var(--text-secondary)] max-w-md mx-auto mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
            >
                Whether it&apos;s a project collab, an opportunity, or just a conversation about
                tech, my inbox is always open.
            </motion.p>

            <motion.div
                className="flex flex-wrap justify-center gap-4 mb-16"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                <a
                    href={`mailto:${personal.stats ? "ankitghimire2004@gmail.com" : ""}`}
                    className="btn-primary"
                >
                    <Mail size={13} />
                    <span><TextScramble text="Say Hello" /></span>
                </a>
            </motion.div>

            {/* Social links row */}
            <motion.div
                className="flex justify-center gap-8 border-t border-[var(--border)] pt-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                {socials.map((s) => (
                    <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 group"
                    >
                        {getSocialIcon(s.name)}
                        <span className="font-mono text-xs uppercase tracking-wider group-hover:underline">
                            {s.name}
                        </span>
                        <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                ))}
            </motion.div>
        </section>
    );
}
