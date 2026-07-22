"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

interface PixelPhotoFrameProps {
    src1: string;  // Base grayscale portrait (/images/ankit.webp)
    src2: string;  // Color alternative portrait (/images/ankit2webp.webp)
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

    // Spring physics configuration for heavy inertial motion
    const springConfig = { damping: 22, stiffness: 180, mass: 0.6 };
    const rotateX = useSpring(0, springConfig);
    const rotateY = useSpring(0, springConfig);
    const glintX = useSpring(0, springConfig);
    const glintY = useSpring(0, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = containerRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Normalize cursor position around card center (-1 to 1)
        const normX = (mouseX / rect.width) * 2 - 1;
        const normY = (mouseY / rect.height) * 2 - 1;

        // Apply interactive tilts (max 15 degrees)
        rotateX.set(normY * -15);
        rotateY.set(normX * 15);

        // Track glass flare flash positions
        glintX.set(mouseX);
        glintY.set(mouseY);
    };

    const handleMouseLeave = () => {
        setHovering(false);
        // Reset card orientation
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <div className="relative group" style={{ width, height }}>
            {/* Ambient Background Glow matching the accent gold tone */}
            <div
                className="absolute -inset-6 rounded-3xl bg-[var(--accent)] opacity-0 blur-3xl transition-all duration-700 pointer-events-none group-hover:opacity-15"
                style={{ mixBlendMode: "screen" }}
            />

            {/* Main Interactive 3D Perspective Card Wrapper */}
            <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={handleMouseLeave}
                className="relative w-full h-full select-none overflow-hidden rounded-2xl border border-[var(--border)] bg-[#0d0c10] shadow-[0_20px_45px_-12px_rgba(0,0,0,0.9)] cursor-pointer"
                style={{
                    transformStyle: "preserve-3d",
                    rotateX,
                    rotateY,
                    perspective: 1000,
                }}
            >
                {/* ─── CHROMATIC GLITCH CHANNEL 1: BASE GRAYSCALE IMAGE ─── */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src1}
                    alt={alt}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover object-top filter grayscale transition-all duration-300"
                    style={{
                        transform: hovering ? "scale(1.04)" : "scale(1)",
                    }}
                />

                {/* ─── CHROMATIC GLITCH CHANNEL 2: GOLD SEPARATED LAYER (Offset Left) ─── */}
                <motion.div
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{
                        transformStyle: "preserve-3d",
                        z: 10,
                    }}
                    animate={hovering ? {
                        x: -5,
                        y: -3,
                        opacity: 0.65,
                    } : {
                        x: 0,
                        y: 0,
                        opacity: 0,
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src2}
                        alt="Gold offset holographic channel"
                        draggable={false}
                        className="w-full h-full object-cover object-top filter sepia(90%) hue-rotate(-15deg) saturate(280%)"
                        style={{ mixBlendMode: "color-dodge" }}
                    />
                </motion.div>

                {/* ─── CHROMATIC GLITCH CHANNEL 3: ELECTRIC CYAN LAYER (Offset Right) ─── */}
                <motion.div
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{
                        transformStyle: "preserve-3d",
                        z: 20,
                    }}
                    animate={hovering ? {
                        x: 5,
                        y: 3,
                        opacity: 0.65,
                    } : {
                        x: 0,
                        y: 0,
                        opacity: 0,
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src2}
                        alt="Cyan offset holographic channel"
                        draggable={false}
                        className="w-full h-full object-cover object-top filter invert(40%) sepia(80%) saturate(400%) hue-rotate(140deg)"
                        style={{ mixBlendMode: "screen" }}
                    />
                </motion.div>

                {/* ─── DYNAMIC GLASS FLARE REFLECTION (Tracks Mouse Coordinates) ─── */}
                <motion.div
                    className="absolute inset-0 pointer-events-none z-30"
                    style={{
                        background: `radial-gradient(circle 90px at var(--x, 0px) var(--y, 0px), rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)`,
                        // We map mouse coordinates into standard CSS properties
                        //@ts-ignore
                        "--x": `${glintX.get()}px`,
                        //@ts-ignore
                        "--y": `${glintY.get()}px`,
                    }}
                />

                {/* ─── RETRO TECH HUD OVERLAYS & telemetry ─── */}
                {/* Gold glowing crosshair brackets in the corners */}
                <div className="absolute inset-2.5 border border-white/5 pointer-events-none rounded-lg z-30">
                    <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[var(--accent)]" />
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[var(--accent)]" />
                    <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[var(--accent)]" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[var(--accent)]" />
                </div>

                {/* Matrix Scanlines block overlay */}
                <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none z-30 bg-repeat bg-[size:100%_4px]" />

                {/* HUD telemetry data */}
                <div className="absolute bottom-3 left-3.5 right-3.5 flex justify-between items-center font-mono text-[7px] tracking-[0.2em] text-white/50 z-40 pointer-events-none">
                    <span className="bg-black/75 px-1.5 py-0.5 rounded border border-[#333]/45 uppercase text-[6px]">
                        SYS.DEC_04
                    </span>
                    <span className="bg-black/75 px-1.5 py-0.5 rounded border border-[#333]/45">
                        {hovering ? "SCANNING_CORE" : "LOCK_STABLE"}
                    </span>
                </div>

                {/* Top-right holographic target tag */}
                <div className="absolute top-3 right-3 bg-black/75 border border-[#333]/45 rounded px-2 py-0.5 text-white/70 font-mono text-[7px] tracking-wider z-40 pointer-events-none flex items-center gap-1.5">
                    <span className={`inline-block w-1 h-1 rounded-full ${hovering ? "bg-red-500 animate-pulse" : "bg-[var(--accent)]"}`} />
                    <span>ANKIT_OS_TARGET</span>
                </div>
            </motion.div>

            {/* Subtitle helper badge */}
            <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[8px] uppercase tracking-[0.25em] text-[#666] pointer-events-none transition-all duration-300 whitespace-nowrap"
                style={{
                    color: hovering ? "var(--accent)" : "#555",
                    transform: hovering ? "translate(-50%, -2px)" : "translate(-50%, 0)",
                }}
            >
                {hovering ? "📡 holographic data streams online" : "⚡ interact for scan overview"}
            </div>
        </div>
    );
}
