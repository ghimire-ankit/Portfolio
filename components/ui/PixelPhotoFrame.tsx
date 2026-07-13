"use client";
import { useState } from "react";

interface PixelPhotoFrameProps {
    src1: string;
    src2: string;
    width?: number;
    height?: number;
    alt?: string;
}

// ── Grid config ───────────────────────────────────────────────────────────
const COLS = 10;
const ROWS = 10;
const TOTAL = COLS * ROWS;

// Stagger delay per tile (diagonal wave pattern)
const tileDelay = (col: number, row: number) => {
    // diagonal wave: tiles closest to top-left animate first
    const diag = (col + row) / (COLS + ROWS - 2);
    return diag * 0.38; // max 380ms spread
};

export default function PixelPhotoFrame({
    src1,
    src2,
    width = 270,
    height = 340,
    alt = "Portrait",
}: PixelPhotoFrameProps) {
    const [hovering, setHovering] = useState(false);
    const [touched, setTouched] = useState(false); // toggle for mobile

    const isActive = hovering || touched;

    const handleTouch = () => setTouched(t => !t);

    return (
        <div
            className="relative overflow-hidden select-none"
            style={{ width, height, cursor: "none" }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onTouchStart={handleTouch}
        >
            {/* ── IMAGE 1 — always rendered underneath (base) ── */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src1}
                alt={alt}
                draggable={false}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    display: "block",
                    filter: "grayscale(1)",
                    transition: "filter 0.6s ease",
                }}
            />

            {/* ── IMAGE 2 — sits on top, revealed by grid tiles disappearing ── */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src2}
                alt={alt}
                draggable={false}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    display: "block",
                }}
            />

            {/* ── TILE GRID OVERLAY ── */}
            {/* On hover: tiles scale to 0 → image2 is revealed */}
            {/* On leave: tiles scale back to 1 → back to image1 (grayscale) */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "grid",
                    gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                    gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                    pointerEvents: "none",
                }}
            >
                {Array.from({ length: TOTAL }).map((_, idx) => {
                    const col = idx % COLS;
                    const row = Math.floor(idx / COLS);
                    const delay = tileDelay(col, row);

                    return (
                        <div
                            key={idx}
                            style={{
                                background: "var(--bg-primary)",
                                transform: isActive ? "scale(0)" : "scale(1)",
                                transformOrigin: "center",
                                transition: isActive
                                    ? `transform 0.3s cubic-bezier(0.65, 0, 0.35, 1) ${delay}s`
                                    : `transform 0.35s cubic-bezier(0.65, 0, 0.35, 1) ${0.38 - delay}s`,
                            }}
                        />
                    );
                })}
            </div>

            {/* ── ACCENT BORDER ── */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    border: isActive
                        ? "1px solid var(--accent)"
                        : "1px solid var(--border)",
                    boxShadow: isActive
                        ? "0 0 0 1px var(--accent), inset 0 0 60px rgba(191,155,74,0.08)"
                        : "none",
                    transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                    zIndex: 10,
                }}
            />

            {/* ── AMBIENT GLOW ── */}
            <div
                style={{
                    position: "absolute",
                    inset: "-20px",
                    background: "var(--accent)",
                    filter: "blur(40px)",
                    opacity: isActive ? 0.12 : 0,
                    transition: "opacity 0.5s ease",
                    zIndex: -1,
                    pointerEvents: "none",
                }}
            />

            {/* ── CORNER LABEL ── */}
            <div
                style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    fontFamily: "monospace",
                    fontSize: 7,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    textShadow: "0 0 10px var(--accent)",
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                    zIndex: 20,
                }}
            >
                [ alt view ]
            </div>
        </div>
    );
}
