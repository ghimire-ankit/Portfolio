"use client";
import React, { useState, useRef, useEffect, MouseEvent, TouchEvent } from "react";
import { motion, useSpring } from "framer-motion";

interface PixelPhotoFrameProps {
    src1: string;  // Base image (ankit.webp)
    src2: string;  // Second image (ankit2webp.webp)
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
    const containerRef = useRef<HTMLDivElement>(null);
    const [hovering, setHovering] = useState(false);

    // Dynamic slider center-point (0 to 100%)
    const targetWipe = useSpring(0, { damping: 28, stiffness: 350 });

    const updateWipe = (clientX: number) => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Calculate X coordinate relative to container width (clamped between 0 and 1)
        const relX = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        targetWipe.set(relX * 100);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        updateWipe(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        if (e.touches[0]) {
            updateWipe(e.touches[0].clientX);
        }
    };

    const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
        setHovering(true);
        updateWipe(e.clientX);
    };

    const handleMouseLeave = () => {
        setHovering(false);
        // Animate slider back to default (0% - fully showing base image)
        targetWipe.set(0);
    };

    // We keep track of the current spring value of targetWipe to animate style properties
    const [wipeValue, setWipeValue] = useState(0);
    useEffect(() => {
        const unsubscribe = targetWipe.on("change", (latest) => {
            setWipeValue(latest);
        });
        return () => unsubscribe();
    }, [targetWipe]);

    return (
        <div
            ref={containerRef}
            className="relative select-none overflow-hidden rounded-2xl border border-[var(--border)] transition-colors duration-500"
            style={{
                width,
                height,
                boxShadow: hovering
                    ? "0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px var(--accent)"
                    : "0 10px 30px rgba(0,0,0,0.4)"
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchStart={() => setHovering(true)}
            onTouchEnd={handleMouseLeave}
        >
            {/* ─── IMAGE 2: ALT VIEW (Always sits fully visible in background) ─── */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src2}
                alt="Alternative Portrait view"
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover object-top filter grayscale-0 transition-transform duration-700"
                style={{
                    transform: hovering ? "scale(1.03)" : "scale(1)"
                }}
            />

            {/* ─── IMAGE 1: BASE VIEW (Sits on top, clipped horizontally via clipPath) ─── */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    clipPath: `inset(0 ${wipeValue}% 0 0)`, // Clips the right side as slider moves left
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src1}
                    alt={alt}
                    draggable={false}
                    className="w-full h-full object-cover object-top filter grayscale transition-transform duration-700"
                    style={{
                        transform: hovering ? "scale(1.03)" : "scale(1)"
                    }}
                />
            </div>

            {/* ─── INTERACTIVE RADAR DIVIDER BAR ─── */}
            {/* Draws a high-end active line exactly at the sliding boundary */}
            <div
                className="absolute top-0 bottom-0 w-0.5 bg-[var(--accent)] pointer-events-none z-20 transition-opacity duration-300"
                style={{
                    left: `${100 - wipeValue}%`,
                    opacity: hovering ? 1 : 0,
                    boxShadow: "0 0 10px var(--accent), 0 0 20px var(--accent)"
                }}
            >
                {/* Radial handle glow block */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-16 rounded-full bg-[var(--accent)] border border-black shadow-lg" />
            </div>

            {/* ─── DETAILS & METADATA OVERLAYS (Awwwards-style HUD feel) ─── */}
            <div className="absolute inset-x-0 bottom-3 px-3 flex justify-between items-center font-mono text-[8px] tracking-widest text-white/50 z-30 pointer-events-none">
                <span className="bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10 uppercase">
                    {wipeValue > 50 ? "ALT_02" : "SYS_01"}
                </span>
                <span className="bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10">
                    WIPE: {Math.round(wipeValue)}%
                </span>
            </div>

            {/* Scan text helper */}
            <div
                className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-white/70 font-mono text-[8px] tracking-wider z-30 pointer-events-none opacity-0 transition-opacity duration-300"
                style={{ opacity: hovering ? 1 : 0 }}
            >
                [ INTERACTIVE WIPE ]
            </div>

            {/* Bottom help label */}
            <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#888] pointer-events-none transition-opacity duration-300 whitespace-nowrap"
                style={{ opacity: hovering ? 1 : 0.6 }}
            >
                {hovering ? "⚡ drag left/right to compare" : "⚡ hover / swipe to interact"}
            </div>

            {/* Ambient Background Glow */}
            <div
                className="absolute -inset-4 bg-[var(--accent)] blur-2xl rounded-full transition-opacity duration-500 pointer-events-none -z-10"
                style={{ opacity: hovering ? 0.1 : 0 }}
            />
        </div>
    );
}
