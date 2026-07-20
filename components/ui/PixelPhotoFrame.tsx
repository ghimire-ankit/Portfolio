"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PixelPhotoFrameProps {
    src1: string;
    src2: string;
    width?: number;
    height?: number;
    alt?: string;
}

export default function PixelPhotoFrame({
    src1,
    src2,
    width = 270,
    height = 340,
    alt = "Portrait",
}: PixelPhotoFrameProps) {
    const [hovering, setHovering] = useState(false);
    const [clickIndex, setClickIndex] = useState(0);

    // Swap trigger: true if hovered OR odd number of clicks on mobile
    const showAlt = hovering || (clickIndex % 2 !== 0);

    const toggleClick = () => {
        setClickIndex(prev => prev + 1);
    };

    // Transition configurations for high-speed spring feels
    const springTransition = {
        type: "spring",
        stiffness: 420,
        damping: 28,
        mass: 0.8
    };

    return (
        <div
            className="relative select-none cursor-pointer"
            style={{ width, height }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onClick={toggleClick}
        >
            {/* Card Deck container */}
            <div className="relative w-full h-full">

                {/* ── CARD 2 (ankit2webp.webp) ── */}
                <motion.div
                    className="absolute inset-0 rounded-2xl overflow-hidden border bg-[var(--bg-secondary)]"
                    style={{
                        width: "100%",
                        height: "100%",
                        originX: 0.5,
                        originY: 0.5,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    }}
                    animate={
                        showAlt
                            ? {
                                // Swaps to front
                                x: 0,
                                y: 0,
                                rotate: -3,
                                scale: 1.02,
                                zIndex: 30,
                                filter: "grayscale(0%)",
                                borderColor: "var(--accent)",
                            }
                            : {
                                // Back in stack (peeking out)
                                x: 18,
                                y: 12,
                                rotate: 5,
                                scale: 0.94,
                                zIndex: 10,
                                filter: "grayscale(100%)",
                                borderColor: "var(--border)",
                            }
                    }
                    transition={springTransition}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src2}
                        alt="Alternative views"
                        draggable={false}
                        className="w-full h-full object-cover object-top"
                    />
                    {/* Card info label */}
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-[#333] z-20 pointer-events-none">
                        <span className="font-mono text-[8px] text-[var(--accent)] tracking-widest font-bold">ALT/02</span>
                    </div>
                </motion.div>

                {/* ── CARD 1 (ankit.webp) ── */}
                <motion.div
                    className="absolute inset-0 rounded-2xl overflow-hidden border bg-[var(--bg-secondary)]"
                    style={{
                        width: "100%",
                        height: "100%",
                        originX: 0.5,
                        originY: 0.5,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    }}
                    animate={
                        showAlt
                            ? {
                                // Back in stack (peeking out)
                                x: -18,
                                y: 12,
                                rotate: -5,
                                scale: 0.94,
                                zIndex: 10,
                                filter: "grayscale(100%)",
                                borderColor: "var(--border)",
                            }
                            : {
                                // Swaps to front
                                x: 0,
                                y: 0,
                                rotate: 2,
                                scale: 1,
                                zIndex: 30,
                                filter: "grayscale(0%)",
                                borderColor: "var(--border)",
                            }
                    }
                    transition={springTransition}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src1}
                        alt={alt}
                        draggable={false}
                        className="w-full h-full object-cover object-top"
                    />
                    {/* Card info label */}
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-[#333] z-20 pointer-events-none">
                        <span className="font-mono text-[8px] text-[#888] tracking-widest font-bold">BASE/01</span>
                    </div>
                </motion.div>

            </div>

            {/* Glowing active card backdrop */}
            <div
                className="absolute -inset-4 bg-[var(--accent)] blur-2xl transition-opacity duration-500 rounded-full pointer-events-none -z-10"
                style={{ opacity: hovering ? 0.12 : 0 }}
            />

            {/* Interactive hint label */}
            <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#888] transition-opacity duration-300 pointer-events-none whitespace-nowrap"
                style={{ opacity: hovering ? 1 : 0.6 }}
            >
                {showAlt ? "⚡ touch / leave to restack" : "⚡ hover / tap to swap"}
            </div>
        </div>
    );
}
