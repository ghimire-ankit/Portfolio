"use client";
import React, { useEffect, useRef, useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";

type Line = { type: "cmd" | "output" | "blank"; text: string };

const INTRO_LINES: Line[] = [
    { type: "cmd", text: `echo "Hello! I am a student & tech explorer learning AI and Web."` },
    { type: "output", text: "Hello! I am a student & tech explorer learning AI and Web." },
    { type: "blank", text: "" },
    { type: "cmd", text: `ls interests/` },
    { type: "output", text: "AI_Research   Web_Dev   Problem_Solving   Global_Cinema   Social_Surfing" },
    { type: "blank", text: "" },
    { type: "cmd", text: `cat status.txt` },
    { type: "output", text: "Currently: Exploring the intersection of code and curiosity." },
    { type: "blank", text: "" },
];

const PROMPT = "~ system / visitor $";
const AUTO_TYPING_SPEED = 18; // Fast typing speed
const LINE_DELAY = 100;

export default function Terminal() {
    const [visibleLines, setVisibleLines] = useState<Line[]>([]);
    const [currentTyping, setCurrentTyping] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);
    const [commandInput, setCommandInput] = useState("");
    const [isAutoTyping, setIsAutoTyping] = useState(true);

    const bodyRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-typing of the initial sequence
    useEffect(() => {
        let cancelled = false;

        const runIntro = async () => {
            for (let i = 0; i < INTRO_LINES.length; i++) {
                if (cancelled) return;
                const line = INTRO_LINES[i];
                if (line.type === "blank") {
                    await new Promise(r => setTimeout(r, LINE_DELAY));
                    setVisibleLines(prev => [...prev, line]);
                    continue;
                }
                if (line.type === "cmd") {
                    for (let c = 0; c <= line.text.length; c++) {
                        if (cancelled) return;
                        setCurrentTyping(line.text.slice(0, c));
                        await new Promise(r => setTimeout(r, AUTO_TYPING_SPEED));
                    }
                    await new Promise(r => setTimeout(r, 50));
                    setVisibleLines(prev => [...prev, line]);
                    setCurrentTyping("");
                } else {
                    await new Promise(r => setTimeout(r, LINE_DELAY));
                    setVisibleLines(prev => [...prev, line]);
                }
            }
            if (!cancelled) {
                setIsAutoTyping(false);
                // System Welcome
                setVisibleLines(prev => [
                    ...prev,
                    { type: "output", text: "──────────────────────────────────────────────────────" },
                    { type: "output", text: "Welcome to ANKIT_OS v1.0.4. Type a command or run a preset below:" },
                ]);
            }
        };

        runIntro();
        const blink = setInterval(() => setCursorVisible(v => !v), 500);

        return () => {
            cancelled = true;
            clearInterval(blink);
        };
    }, []);

    // Focus input when clicking anywhere on the terminal body
    const handleBodyClick = () => {
        if (!isAutoTyping && inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Auto-scroll terminal inner container
    useEffect(() => {
        const container = bodyRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [visibleLines, currentTyping, commandInput]);

    // Handle interactive terminal commands
    const executeCommand = (cmdText: string) => {
        const trimmed = cmdText.trim().toLowerCase();
        if (!trimmed) return;

        // 1. Add command to output log
        const newLines: Line[] = [
            { type: "cmd", text: cmdText },
        ];

        // 2. Evaluate command
        switch (trimmed) {
            case "help":
                newLines.push(
                    { type: "output", text: "Available commands:" },
                    { type: "output", text: "  about     - Brief background profile" },
                    { type: "output", text: "  projects  - View featured explorations" },
                    { type: "output", text: "  skills    - List primary engineering tools" },
                    { type: "output", text: "  weather   - Refresh Kathmandu local report" },
                    { type: "output", text: "  clear     - Wipe terminal output log" }
                );
                break;
            case "about":
                newLines.push(
                    { type: "output", text: "Ankit Ghimire | Full-Stack & AI Developer" },
                    { type: "output", text: "Studying Computer Engineering at Kathmandu University." },
                    { type: "output", text: "Interests include custom compilers, browser engines, WebGL," },
                    { type: "output", text: "and designing responsive local-first tooling." }
                );
                break;
            case "projects":
                newLines.push(
                    { type: "output", text: "Featured Projects:" },
                    { type: "output", text: "  * CakeNKitchen (Full-Stack Store & API Server)" },
                    { type: "output", text: "  * Edge-PDF     (Client-side Vector PDF Editor Tool)" },
                    { type: "output", text: "  * Kotha Bhada  (Student Accommodation Listings Hub)" },
                    { type: "output", text: "  * AI Content Generator (Next-level Gemini API Wrapper)" }
                );
                break;
            case "skills":
                newLines.push(
                    { type: "output", text: "Engineering Stack:" },
                    { type: "output", text: "  Languages:  TypeScript, JavaScript, Python, C#" },
                    { type: "output", text: "  Frameworks: Next.js (React), Flask, Express, Prisma" },
                    { type: "output", text: "  Databases:  PostgreSQL, SQLite, Supabase" }
                );
                break;
            case "weather":
                newLines.push(
                    { type: "output", text: "Fetching NPT Weather Station..." },
                    { type: "output", text: "Location: Kathmandu, NP. Temp: 22°C (Mellow Cloudy)" }
                );
                break;
            case "clear":
                setVisibleLines([
                    { type: "output", text: "Terminal history cleared. Type 'help' to get started." }
                ]);
                setCommandInput("");
                return;
            default:
                newLines.push(
                    { type: "output", text: `ankit_os: command not found: '${trimmed}'. Type 'help' for support.` }
                );
                break;
        }

        newLines.push({ type: "blank", text: "" });
        setVisibleLines(prev => [...prev, ...newLines]);
        setCommandInput("");
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            executeCommand(commandInput);
        }
    };

    // Pre-made quick click commands for touch compatibility
    const quickCmds = ["about", "projects", "skills", "weather", "clear"];

    return (
        <motion.div
            className="terminal-window select-none relative"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Title Bar */}
            <div className="terminal-titlebar">
                <div className="flex items-center gap-2">
                    <span className="terminal-dot bg-[#FF5F57]" />
                    <span className="terminal-dot bg-[#FEBC2E]" />
                    <span className="terminal-dot bg-[#28C840]" />
                </div>
                <span className="terminal-title">ankit_os / observer</span>
                <span className="font-mono text-[7px] text-[#555] select-none tracking-widest hidden sm:inline">TTY.1</span>
            </div>

            {/* Terminal Body */}
            <div
                ref={bodyRef}
                onClick={handleBodyClick}
                className="terminal-body h-[290px] overflow-y-auto px-4 py-3 cursor-text font-mono text-[11px]"
                style={{ scrollbarWidth: "thin" }}
            >
                {visibleLines.map((line, i) => (
                    <div key={i} className="leading-relaxed">
                        {line.type === "cmd" ? (
                            <p className="mb-0.5 animate-fadeIn">
                                <span className="text-[var(--accent)] mr-2">{PROMPT}</span>
                                <span className="text-[var(--term-cmd)]">{line.text}</span>
                            </p>
                        ) : line.type === "output" ? (
                            <p className="text-[var(--term-output)] ml-0 mb-0.5 leading-snug animate-fadeIn">
                                {line.text}
                            </p>
                        ) : (
                            <div className="h-1.5 animate-fadeIn" />
                        )}
                    </div>
                ))}

                {/* Auto Typing Render Cursor */}
                {isAutoTyping && currentTyping !== "" && (
                    <p className="leading-relaxed mb-0.5">
                        <span className="text-[var(--accent)] mr-2">{PROMPT}</span>
                        <span className="text-[var(--term-cmd)]">{currentTyping}</span>
                        <span
                            className="inline-block w-[6px] h-[12px] bg-[var(--text-primary)] ml-1 align-middle"
                            style={{ opacity: cursorVisible ? 1 : 0 }}
                        />
                    </p>
                )}

                {/* Live Input Field (Shows after auto-script parses) */}
                {!isAutoTyping && (
                    <div className="flex items-center leading-relaxed">
                        <span className="text-[var(--accent)] mr-2 shrink-0">{PROMPT}</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={commandInput}
                            onChange={(e) => setCommandInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isAutoTyping}
                            className="flex-1 bg-transparent border-none outline-none text-[var(--term-cmd)] font-mono p-0 h-[15px] select-text"
                            placeholder={commandInput ? "" : "..."}
                            autoFocus
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck={false}
                        />
                    </div>
                )}
            </div>

            {/* Quick Command Selector HUD (Increases click engagement) */}
            {!isAutoTyping && (
                <div className="border-t border-[#222] bg-[rgba(13,11,9,0.92)] px-4 py-2 flex flex-wrap gap-2 items-center justify-between pointer-events-auto">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-[#555]">
                        ⚡ PRESET_RUNNERS:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                        {quickCmds.map((preset) => (
                            <button
                                key={preset}
                                onClick={() => executeCommand(preset)}
                                className="font-mono text-[9px] px-2 py-0.5 rounded border border-[#333] text-[#888] bg-[#141210] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-150 active:scale-95"
                            >
                                {preset}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
