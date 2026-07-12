"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Sun, Moon, Github } from "lucide-react";
import { socials } from "@/lib/data";

// ── Swap this URL or use "/your-track.mp3" from public/ ──────────────────────
const MUSIC_SRC = "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946b8f8ef2.mp3";
// ─────────────────────────────────────────────────────────────────────────────

export default function TimeWeatherWidget() {
    const [time, setTime] = useState("00:00:00");
    const [isDark, setIsDark] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const a = new Audio(MUSIC_SRC);
        a.loop = true; a.volume = 0.28;
        audioRef.current = a;
        return () => { a.pause(); a.src = ""; };
    }, []);

    useEffect(() => {
        const tick = () =>
            setTime(new Date().toLocaleTimeString("en-US", {
                timeZone: "Asia/Kathmandu",
                hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit",
            }));
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const toggleMusic = () => {
        const a = audioRef.current; if (!a) return;
        if (isPlaying) { a.pause(); setIsPlaying(false); }
        else { a.play().catch(e => console.warn("Audio blocked:", e)); setIsPlaying(true); }
    };

    const toggleTheme = () => {
        document.documentElement.classList.toggle("light", isDark);
        setIsDark(d => !d);
    };

    const ghUrl = socials.find(s => s.name === "GitHub")?.url ?? "#";

    // Shared icon button classes — bolder border, bigger icon area
    const iconBtn =
        "flex items-center justify-center w-9 h-9 rounded-full " +
        "bg-[#141414] border-2 border-[#333] " +
        "text-[#888] hover:text-white hover:border-[var(--accent)] " +
        "transition-all duration-200 shrink-0";

    return (
        /* Single wrapper — placed right of the centre nav pill */
        <motion.div
            className="fixed top-[22px] z-[90] hidden lg:flex items-center gap-3"
            style={{ left: "calc(50% + 210px)" }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* ── Time pill ── */}
            <div className="flex items-center h-9 rounded-full overflow-hidden
                            bg-[#141414] border-2 border-[#333]">

                {/* pulsing green live dot */}
                <div className="flex items-center px-3 border-r border-[#333]">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full
                                         rounded-full bg-green-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                    </span>
                </div>

                {/* NPT label */}
                <div className="flex items-center px-2.5 border-r border-[#333]">
                    <span className="font-mono text-[8px] font-bold uppercase
                                     tracking-[0.2em] text-[#888]">NPT</span>
                </div>

                {/* white bold clock */}
                <div className="flex items-center px-4">
                    <span className="font-mono text-[13px] font-extrabold tabular-nums
                                     tracking-widest text-white leading-none">
                        {time}
                    </span>
                </div>
            </div>

            {/* ── Three separate icon buttons, close to the time pill ── */}
            <button onClick={toggleMusic}
                title={isPlaying ? "Pause" : "Play lofi music"}
                className={iconBtn}>
                {isPlaying
                    ? <Pause size={14} className="text-[var(--accent)]" />
                    : <Play size={14} />}
            </button>

            <button onClick={toggleTheme}
                title="Toggle theme"
                className={iconBtn}>
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <a href={ghUrl} target="_blank" rel="noopener noreferrer"
                title="GitHub" className={iconBtn}>
                <Github size={14} />
            </a>
        </motion.div>
    );
}
