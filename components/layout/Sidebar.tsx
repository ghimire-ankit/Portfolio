"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personal, socials } from "@/lib/data";
import { Github, Linkedin, Mail, X } from "lucide-react";

const navItems = [
    { label: "About", href: "#about", num: "01" },
    { label: "Experience", href: "#experience", num: "02" },
    { label: "Projects", href: "#projects", num: "03" },
    { label: "Skills", href: "#skills", num: "04" },
    { label: "Contact", href: "#contact", num: "05" },
];

const SocialIcon = ({ name }: { name: string }) => {
    if (name === "GitHub") return <Github size={15} />;
    if (name === "LinkedIn") return <Linkedin size={15} />;
    if (name === "Email") return <Mail size={15} />;
    return null;
};

export default function Sidebar() {
    const [activeSection, setActiveSection] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -40% 0px" }
        );
        navItems.forEach(({ href }) => {
            const el = document.querySelector(href);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const handleNav = (href: string) => {
        setMobileOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {/* ── Desktop Sidebar ── */}
            <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col justify-between px-8 py-12 z-50 border-r border-[var(--border)]">
                {/* Logo */}
                <div>
                    <motion.a
                        href="#"
                        className="block"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="block font-playfair text-xl font-bold text-[var(--text-primary)] italic">
                            {personal.firstName}
                        </span>
                        <span className="block font-playfair text-xl font-bold text-[var(--accent)]">
                            {personal.lastName}
                        </span>
                    </motion.a>
                    <motion.p
                        className="text-label mt-3 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {personal.role}
                    </motion.p>
                </div>

                {/* Nav */}
                <nav>
                    <ul className="space-y-1">
                        {navItems.map((item, i) => (
                            <motion.li
                                key={item.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i + 0.3 }}
                            >
                                <button
                                    onClick={() => handleNav(item.href)}
                                    className={`group flex items-center gap-3 w-full text-left py-2 transition-colors duration-200 ${activeSection === item.href.slice(1)
                                            ? "text-[var(--text-primary)]"
                                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                        }`}
                                >
                                    <span
                                        className={`font-mono text-[10px] transition-colors duration-200 ${activeSection === item.href.slice(1)
                                                ? "text-[var(--accent)]"
                                                : "text-[var(--border)] group-hover:text-[var(--text-secondary)]"
                                            }`}
                                    >
                                        {item.num}
                                    </span>
                                    <span
                                        className={`h-px transition-all duration-300 ${activeSection === item.href.slice(1) ? "w-8 bg-[var(--accent)]" : "w-4 bg-[var(--border)]"
                                            }`}
                                    />
                                    <span className="text-xs uppercase tracking-widest font-mono">{item.label}</span>
                                </button>
                            </motion.li>
                        ))}
                    </ul>
                </nav>

                {/* Socials */}
                <motion.div
                    className="flex gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    {socials.map((s) => (
                        <a
                            key={s.name}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200"
                            aria-label={s.name}
                        >
                            <SocialIcon name={s.name} />
                        </a>
                    ))}
                </motion.div>
            </aside>

            {/* ── Mobile Nav ── */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 border-b border-[var(--border)] bg-[var(--bg-primary)]/90 backdrop-blur-md">
                <a href="#" className="font-playfair text-lg font-bold italic text-[var(--text-primary)]">
                    {personal.firstName} <span className="text-[var(--accent)]">{personal.lastName}</span>
                </a>
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={20} /> : (
                        <div className="flex flex-col gap-1.5">
                            <span className="block w-5 h-px bg-current" />
                            <span className="block w-3 h-px bg-current ml-auto" />
                            <span className="block w-5 h-px bg-current" />
                        </div>
                    )}
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="lg:hidden fixed inset-0 z-40 bg-[var(--bg-primary)] flex flex-col justify-center items-center gap-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {navItems.map((item, i) => (
                            <motion.button
                                key={item.label}
                                onClick={() => handleNav(item.href)}
                                className="font-playfair text-4xl font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * i }}
                            >
                                {item.label}
                            </motion.button>
                        ))}
                        <div className="flex gap-6 mt-8">
                            {socials.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                                >
                                    <SocialIcon name={s.name} />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
