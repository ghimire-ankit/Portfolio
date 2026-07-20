"use client";
import React, { useState, useRef, useEffect, MouseEvent } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

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
    const [hovering, setHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Spring physics configuration for luxurious Awwwards-style lag-free responsiveness
    const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
    const rotateX = useSpring(0, springConfig);
    const rotateY = useSpring(0, springConfig);

    // Handle magnetic coordinate calculations
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const el = containerRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate cursor offset percentage from center (-0.5 to 0.5)
        const percentX = (e.clientX - centerX) / rect.width;
        const percentY = (e.clientY - centerY) / rect.height;

        // Map to angle limits (max 18deg rotation)
        rotateX.set(-percentY * 22);
        rotateY.set(percentX * 22);
    };

    const handleMouseLeave = () => {
        setHovering(false);
        rotateX.set(0);
        rotateY.set(0);
    };

    const handleTouchStart = () => {
        // Toggle hover state on mobile devices
        setHovering(prev => !prev);
    };

    return (
        <div
            ref={containerRef}
            className="relative cursor-pointer select-none"
            style={{
                width,
                height,
                perspective: "1200px" // Creates depth space for 3D translations
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
        >
            <motion.div
                className="w-full h-full relative"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d", // Required to allow children to exist in separate Z spaces
                }}
            >
                {/* ─── LAYER 1: BACK LAYER (ankit2webp.webp) ─── */}
                <motion.div
                    className="absolute inset-0 rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border)]"
                    style={{
                        transformStyle: "preserve-3d",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
                    }}
                    animate={
                        hovering
                            ? { translateZ: -30, opacity: 0.9, filter: "grayscale(0%)" }
                            : { translateZ: 0, opacity: 0, filter: "grayscale(100%)" }
                    }
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src2}
                        alt="Alternative view"
                        draggable={false}
                        className="w-full h-full object-cover object-top"
                    />
                </motion.div>

                {/* ─── LAYER 2: MIDDLE HOLOGRAPHIC MESH LAYOUT (Interactive Grid & Scanning lines) ─── */}
                <motion.div
                    className="absolute inset-0 rounded-2xl border border-[var(--accent)]/50 pointer-events-none overflow-hidden"
                    style={{
                        backgroundImage: `
                            radial-gradient(var(--accent) 1px, transparent 1.5px),
                            linear-gradient(rgba(191, 155, 74, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(191, 155, 74, 0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: "16px 16px, 16px 16px, 16px 16px",
                        backgroundColor: "rgba(13, 11, 9, 0.55)",
                        backdropFilter: hovering ? "blur(2px)" : "blur(0px)",
                        boxShadow: "0 0 40px rgba(191,155,74,0.15), inset 0 0 20px rgba(191,155,74,0.1)",
                    }}
                    animate={
                        hovering
                            ? { translateZ: 15, opacity: 0.85, scale: 0.98 }
                            : { translateZ: 0, opacity: 0, scale: 1 }
                    }
                    transition={{ type: "spring", stiffness: 240, damping: 22 }}
                >
                    {/* Glowing Mesh lines details */}
                    <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-60 animate-[scan_2.8s_linear_infinite]" />

                    {/* Tech stats floating */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4 font-mono text-[9px] text-[var(--accent)]/90 tracking-widest leading-none select-none">
                        <div className="flex justify-between">
                            <span>[3D_MESH_DECONSTRUCT]</span>
                            <span>ACTIVE: {hovering ? "TRUE" : "FALSE"}</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span>xYZ_COORD: ROT_3D</span>
                            <span>01 / 02</span>
                        </div>
                    </div>
                </motion.div>

                {/* ─── LAYER 3: FRONT LAYER (ankit.webp) ─── */}
                <motion.div
                    className="absolute inset-0 rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border)]"
                    style={{
                        transformStyle: "preserve-3d",
                        boxShadow: hovering
                            ? "0 25px 50px rgba(0,0,0,0.8)"
                            : "0 10px 30px rgba(0,0,0,0.4)",
                    }}
                    animate={
                        hovering
                            ? { translateZ: 60, opacity: 0.65, scale: 1.04, filter: "grayscale(100%)" }
                            : { translateZ: 0, opacity: 1, scale: 1, filter: "grayscale(0%)" }
                    }
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src1}
                        alt={alt}
                        draggable={false}
                        className="w-full h-full object-cover object-top transition-transform duration-700"
                    />

                    {/* Corner badge */}
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-[#333] z-20 pointer-events-none">
                        <span className="font-mono text-[8px] text-[#888] tracking-widest font-bold">ANKIT_OS.SYS</span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Behind Ambient Neon shadow bloom */}
            <div
                className="absolute -inset-4 bg-[var(--accent)] blur-3xl rounded-full transition-opacity duration-700 pointer-events-none -z-20"
                style={{ opacity: hovering ? 0.18 : 0 }}
            />

            {/* Dynamic touch guide overlay */}
            <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#888] transition-opacity duration-300 pointer-events-none"
                style={{ opacity: hovering ? 1 : 0.6 }}
            >
                {hovering ? "⚡ Move cursor to tilt mesh" : "⚡ Hover to explode 3D Mesh"}
            </div>
        </div>
    );
}
