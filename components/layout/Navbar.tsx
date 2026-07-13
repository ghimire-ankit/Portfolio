"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personal, socials } from "@/lib/data";
import { Github, Linkedin, Mail, Play, Pause, Sun, Moon } from "lucide-react";

const navItems = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

const SocialIcon = ({ name }: { name: string }) => {
    if (name === "GitHub") return <Github size={15} />;
    if (name === "LinkedIn") return <Linkedin size={15} />;
    if (name === "Email") return <Mail size={15} />;
    return null;
};

const getSharedAudio = (): HTMLAudioElement | null => {
    if (typeof window === "undefined") return null;
    if (!(window as any).__lofiAudio) {
        const a = new Audio("https://cdn.pixabay.com/download/audio/2022/10/25/audio_946b8f8ef2.mp3");
        a.loop = true;
        a.volume = 0.28;
        (window as any).__lofiAudio = a;
    }
    return (window as any).__lofiAudio;
};

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastY, setLastY] = useState(0);
    const [time, setTime] = useState("");
    const [isDark, setIsDark] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    // Hydrate audio state on mount/change
    useEffect(() => {
        const audio = getSharedAudio();
        if (audio) {
            setIsPlaying(!audio.paused);
        }
        const handleAudioChange = () => {
            const a = getSharedAudio();
            if (a) setIsPlaying(!a.paused);
        };
        window.addEventListener("lofi-audio-state", handleAudioChange);
        return () => window.removeEventListener("lofi-audio-state", handleAudioChange);
    }, []);

    // Live clock for mobile view
    useEffect(() => {
        const tick = () => {
            setTime(new Date().toLocaleTimeString("en-US", {
                timeZone: "Asia/Kathmandu",
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }));
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    // Scroll trigger show/hide navigation
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            if (y < 80) { setVisible(true); setLastY(y); return; }
            setVisible(y < lastY);
            setLastY(y);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [lastY]);

    const toggleMusic = () => {
        const a = getSharedAudio();
        if (!a) return;
        if (isPlaying) {
            a.pause();
        } else {
            a.play().catch(e => console.warn("Blocked:", e));
        }
        window.dispatchEvent(new Event("lofi-audio-state"));
    };

    const toggleTheme = () => {
        document.documentElement.classList.toggle("light", isDark);
        setIsDark(!isDark);
    };

    const handleNav = (href: string) => {
        setMenuOpen(false);
        setTimeout(() => {
            document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }, menuOpen ? 480 : 0);
    };

    return (
        <>
            {/* ─── DESKTOP TOP-LEFT: Open to Work badge ─── */}
            <motion.a
                href="mailto:ankitghimire2004@gmail.com"
                className="fixed top-5 left-6 z-[90] hidden lg:flex items-center gap-2.5
                           h-10 px-4 rounded-full select-none
                           bg-[var(--bg-secondary)]/80 border border-[var(--border)]
                           backdrop-blur-xl text-[var(--text-secondary)]
                           hover:border-emerald-500/60 hover:text-[var(--text-primary)]
                           transition-colors duration-200"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                title="Available — send a mail"
            >
                <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full
                                     rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-400">
                    Open to Work
                </span>
            </motion.a>

            {/* ─── DESKTOP CENTRE: Nav pill ─── */}
            <motion.div
                className="fixed top-5 left-1/2 z-50 hidden lg:flex"
                style={{ x: "-50%" }}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="flex items-center h-10 gap-1 px-2
                                bg-[var(--bg-secondary)]/80 border border-[var(--border)]
                                backdrop-blur-xl rounded-full">
                    {navItems.map(item => (
                        <button
                            key={item.label}
                            onClick={() => handleNav(item.href)}
                            className="nav-link"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* ─── MOBILE: Header top bar ─── */}
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 flex lg:hidden items-center
                           justify-between px-6 py-4
                           bg-[var(--bg-primary)]/80 backdrop-blur-lg
                           border-b border-[var(--border)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {/* Mobile Identity with pulsing Open-To-Work dot */}
                <a href="mailto:ankitghimire2004@gmail.com" className="flex items-center gap-2">
                    <span className="font-outfit font-black uppercase text-sm tracking-tight
                                     text-[var(--text-primary)]">
                        {personal.firstName}
                    </span>
                    <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full
                                         rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                </a>

                {/* Hamburger menu button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-8 h-8 flex flex-col justify-center gap-1.5 items-end"
                    aria-label="Menu"
                >
                    <motion.span className="block h-px bg-[var(--text-primary)] w-6 origin-center"
                        animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.3 }} />
                    <motion.span className="block h-px bg-[var(--text-primary)] w-4"
                        animate={{ opacity: menuOpen ? 0 : 1 }}
                        transition={{ duration: 0.2 }} />
                    <motion.span className="block h-px bg-[var(--text-primary)] w-6 origin-center"
                        animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.3 }} />
                </button>
            </motion.header>

            {/* Mobile fullscreen overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="lg:hidden fixed inset-0 z-40 bg-[var(--bg-primary)]
                                   flex flex-col justify-center px-8"
                        initial={{ clipPath: "inset(0 0 100% 0)" }}
                        animate={{ clipPath: "inset(0 0 0% 0)" }}
                        exit={{ clipPath: "inset(0 0 100% 0)" }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    >
                        {/* Navigation Links */}
                        <div className="flex flex-col gap-2 mt-8">
                            {navItems.map((item, i) => (
                                <motion.button
                                    key={item.label}
                                    onClick={() => handleNav(item.href)}
                                    className="font-outfit text-4.5xl font-black uppercase text-left
                                               py-1.5 leading-tight border-b border-[var(--border)]
                                               last:border-0 text-[var(--text-secondary)]
                                               hover:text-[var(--text-primary)] transition-colors"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.08 * i + 0.15 }}
                                >
                                    <span className="text-[var(--accent)] text-sm font-mono mr-3">
                                        {(i + 1).toString().padStart(2, "0")}
                                    </span>
                                    {item.label}
                                </motion.button>
                            ))}
                        </div>

                        {/* Divider line */}
                        <div className="h-px bg-[var(--border)] my-6 w-full" />

                        {/* Mobile HUD Controls */}
                        <div className="flex flex-col gap-3.5 w-full">
                            {/* Live Clock Card */}
                            <div className="flex items-center justify-between bg-[#141414] border border-[#333] px-4 py-2.5 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                    </span>
                                    <span className="font-mono text-[9px] font-bold text-[#888] tracking-widest uppercase">NEPAL TIME</span>
                                </div>
                                <span className="font-mono text-sm font-extrabold text-white tracking-widest tabular-nums">{time || "00:00:00"}</span>
                            </div>

                            {/* Control row */}
                            <div className="flex items-center gap-3 w-full">
                                <button
                                    onClick={toggleMusic}
                                    className="flex-1 flex items-center justify-center gap-2 h-11 rounded-lg bg-[#141414] border border-[#333] text-[#888] active:text-[#fff] transition-colors"
                                >
                                    {isPlaying ? <Pause size={14} className="text-[var(--accent)]" /> : <Play size={14} />}
                                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider">Lofi Chill</span>
                                </button>

                                <button
                                    onClick={toggleTheme}
                                    className="w-12 h-11 flex items-center justify-center rounded-lg bg-[#141414] border border-[#333] text-[#888] active:text-[#fff] transition-colors"
                                >
                                    {isDark ? <Sun size={14} /> : <Moon size={14} />}
                                </button>
                            </div>
                        </div>

                        {/* Footer Socials */}
                        <motion.div className="flex gap-4 mt-8"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            transition={{ delay: 0.55 }}>
                            {socials.map(s => (
                                <a key={s.name} href={s.url}
                                    target="_blank" rel="noopener noreferrer"
                                    className="text-[var(--text-secondary)] hover:text-[var(--accent)]
                                              transition-colors p-2 border border-[var(--border)] rounded">
                                    <SocialIcon name={s.name} />
                                </a>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
