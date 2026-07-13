"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Line = { type: "cmd" | "output" | "blank"; text: string };

const SESSIONS: Line[][] = [
    [
        { type: "cmd", text: `echo "Hello! I am a student & tech explorer learning AI and Web."` },
        { type: "output", text: "Hello! I am a student & tech explorer learning AI and Web." },
        { type: "blank", text: "" },
        { type: "cmd", text: `ls interests/` },
        { type: "output", text: "AI_Research   Web_Dev   Problem_Solving   Global_Cinema   Social_Surfing" },
        { type: "blank", text: "" },
        { type: "cmd", text: `cat status.txt` },
        { type: "output", text: "Currently: Exploring the intersection of code and curiosity." },
        { type: "blank", text: "" },
        { type: "cmd", text: `contact` },
        { type: "output", text: "Email: ankitghimire2004@gmail.com" },
    ],
];

const PROMPT = "~ system / explorer $";
const TYPING_SPEED = 20; // ms per char (snappier experience)
const LINE_DELAY = 120;  // ms between lines

export default function Terminal() {
    const [visibleLines, setVisibleLines] = useState<Line[]>([]);
    const [currentTyping, setCurrentTyping] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);
    const bodyRef = useRef<HTMLDivElement>(null);

    // Auto typing sequence
    useEffect(() => {
        const lines = SESSIONS[0];
        let cancelled = false;

        const runLines = async () => {
            for (let i = 0; i < lines.length; i++) {
                if (cancelled) return;
                const line = lines[i];
                if (line.type === "blank") {
                    await new Promise(r => setTimeout(r, LINE_DELAY));
                    setVisibleLines(prev => [...prev, line]);
                    continue;
                }
                if (line.type === "cmd") {
                    for (let c = 0; c <= line.text.length; c++) {
                        if (cancelled) return;
                        setCurrentTyping(line.text.slice(0, c));
                        await new Promise(r => setTimeout(r, TYPING_SPEED));
                    }
                    await new Promise(r => setTimeout(r, 60));
                    setVisibleLines(prev => [...prev, line]);
                    setCurrentTyping("");
                } else {
                    await new Promise(r => setTimeout(r, LINE_DELAY));
                    setVisibleLines(prev => [...prev, line]);
                }
            }
        };
        runLines();
        const blink = setInterval(() => setCursorVisible(v => !v), 500);
        return () => { cancelled = true; clearInterval(blink); };
    }, []);

    // Scroll only the terminal box inner window (prevents main page jitter)
    useEffect(() => {
        const container = bodyRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [visibleLines, currentTyping]);

    return (
        <motion.div
            className="terminal-window"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="terminal-titlebar">
                <div className="flex items-center gap-2">
                    <span className="terminal-dot bg-[#FF5F57]" />
                    <span className="terminal-dot bg-[#FEBC2E]" />
                    <span className="terminal-dot bg-[#28C840]" />
                </div>
                <span className="terminal-title">ankit_os / observer</span>
                <div className="w-14" />
            </div>

            {/* Stable fixed height container: h-[310px] on mobile to fit wrapped text, h-[256px] on desktop */}
            <div
                ref={bodyRef}
                className="terminal-body h-[310px] sm:h-[256px] overflow-y-auto"
                style={{ scrollbarWidth: "thin" }}
            >
                {visibleLines.map((line, i) => (
                    <div key={i} className="leading-relaxed">
                        {line.type === "cmd" ? (
                            <p className="font-mono text-[11px] mb-1 animate-fadeIn">
                                <span className="text-[var(--accent)] mr-2">{PROMPT}</span>
                                <span className="text-[var(--term-cmd)]">{line.text}</span>
                            </p>
                        ) : line.type === "output" ? (
                            <p className="font-mono text-[11px] text-[var(--term-output)] ml-0 mb-1 leading-snug animate-fadeIn">
                                {line.text}
                            </p>
                        ) : (
                            <div className="h-2 animate-fadeIn" />
                        )}
                    </div>
                ))}

                {currentTyping !== "" && (
                    <p className="font-mono text-[11px] leading-relaxed mb-1">
                        <span className="text-[var(--accent)] mr-2">{PROMPT}</span>
                        <span className="text-[var(--term-cmd)]">{currentTyping}</span>
                        <span
                            className="inline-block w-[6.5px] h-[13px] bg-[var(--text-primary)] ml-1 align-middle"
                            style={{ opacity: cursorVisible ? 1 : 0 }}
                        />
                    </p>
                )}
            </div>
        </motion.div>
    );
}
