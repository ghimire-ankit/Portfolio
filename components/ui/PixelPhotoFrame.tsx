"use client";
import { useEffect, useRef, useState, useCallback } from "react";

interface PixelPhotoFrameProps {
    src1: string;  // base image (default shown)
    src2: string;  // hover image (revealed on interaction)
    width?: number;
    height?: number;
    alt?: string;
}

/**
 * PixelPhotoFrame
 * ─────────────────────────────────────────────────────
 * On hover / tap, the image pixelates into blocks then
 * resolves into the alternate photo. On leave, it
 * pixelates back to the original. Uses HTML5 Canvas with
 * ctx.imageSmoothingEnabled = false for crisp pixel art.
 */

// Pixel resolution steps: big numbers = more pixelated
const PIXEL_STEPS = [120, 80, 48, 28, 16, 8, 4, 2, 1];
const FRAME_INTERVAL = 55; // ms between each pixel step

export default function PixelPhotoFrame({
    src1,
    src2,
    width = 270,
    height = 340,
    alt = "Portrait",
}: PixelPhotoFrameProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const img1Ref = useRef<HTMLImageElement | null>(null);
    const img2Ref = useRef<HTMLImageElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [hovering, setHovering] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const stepRef = useRef(0);          // current PIXEL_STEPS index
    const dirRef = useRef<"in" | "out">("in"); // "in" = toward img2, "out" = toward img1
    const targetRef = useRef<"img1" | "img2">("img1"); // which image to fully show at transition end

    // ─── Pre-load both images ───────────────────────────────────────────────
    useEffect(() => {
        let loadedCount = 0;
        const onLoad = () => { loadedCount++; if (loadedCount === 2) setImagesLoaded(true); };

        const i1 = new Image(); i1.crossOrigin = "anonymous"; i1.src = src1; i1.onload = onLoad; img1Ref.current = i1;
        const i2 = new Image(); i2.crossOrigin = "anonymous"; i2.src = src2; i2.onload = onLoad; img2Ref.current = i2;
    }, [src1, src2]);

    // ─── Draw a pixelated version of `img` at pixel-block size `px` ─────────
    const drawPixelated = useCallback((img: HTMLImageElement, px: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, width, height);

        // Clamp px to minimum 1
        const blockSize = Math.max(1, px);

        // 1) Draw tiny version (no smoothing → crisp blocks)
        ctx.imageSmoothingEnabled = false;
        const tinyW = Math.max(1, Math.floor(width / blockSize));
        const tinyH = Math.max(1, Math.floor(height / blockSize));

        // Off-screen canvas for downscale
        const off = document.createElement("canvas");
        off.width = tinyW;
        off.height = tinyH;
        const octx = off.getContext("2d")!;
        octx.imageSmoothingEnabled = false;
        octx.drawImage(img, 0, 0, tinyW, tinyH);

        // 2) Draw back scaled up — nearest-neighbor gives pixel art
        ctx.drawImage(off, 0, 0, tinyW, tinyH, 0, 0, width, height);
    }, [width, height]);

    // ─── Run animation loop ──────────────────────────────────────────────────
    const animate = useCallback(() => {
        if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }

        const steps = PIXEL_STEPS; // PIXEL_STEPS[0]=most pixelated, last=sharpest

        const tick = () => {
            const dir = dirRef.current;
            const step = stepRef.current;

            // Determine which image and pixel amount to show
            // "in" means: start from img1 at full res, pixelate up, cross halfway, then depixelate to img2
            // "out" means: reverse

            // Phase 1: pixelate current image (0 → mid)
            // Phase 2: depixelate into target image (mid → end)
            const mid = Math.floor(steps.length / 2);

            let img: HTMLImageElement | null;
            let px: number;

            if (dir === "in") {
                if (step <= mid) {
                    // pixelating img1
                    img = img1Ref.current;
                    px = steps[step];
                } else {
                    // depixelating img2
                    img = img2Ref.current;
                    px = steps[steps.length - 1 - (step - mid)];
                }
            } else {
                if (step <= mid) {
                    // pixelating img2
                    img = img2Ref.current;
                    px = steps[step];
                } else {
                    // depixelating img1
                    img = img1Ref.current;
                    px = steps[steps.length - 1 - (step - mid)];
                }
            }

            if (img && img.complete) drawPixelated(img, px);

            if (step < steps.length - 1) {
                stepRef.current++;
                timerRef.current = setTimeout(tick, FRAME_INTERVAL);
            } else {
                // Animation done — just draw the final image cleanly
                const finalImg = dir === "in" ? img2Ref.current : img1Ref.current;
                if (finalImg) drawPixelated(finalImg, 1);
                stepRef.current = 0;
            }
        };

        stepRef.current = 0;
        tick();
    }, [drawPixelated]);

    // ─── Draw initial image after load ───────────────────────────────────────
    useEffect(() => {
        if (imagesLoaded && img1Ref.current) {
            drawPixelated(img1Ref.current, 1);
        }
    }, [imagesLoaded, drawPixelated]);

    // ─── On hover / touch ────────────────────────────────────────────────────
    const handleEnter = useCallback(() => {
        if (!imagesLoaded) return;
        setHovering(true);
        dirRef.current = "in";
        animate();
    }, [imagesLoaded, animate]);

    const handleLeave = useCallback(() => {
        if (!imagesLoaded) return;
        setHovering(false);
        dirRef.current = "out";
        animate();
    }, [imagesLoaded, animate]);

    // ─── Touch support ────────────────────────────────────────────────────────
    const handleTouchStart = useCallback(() => {
        if (hovering) handleLeave();
        else handleEnter();
    }, [hovering, handleEnter, handleLeave]);

    return (
        <div
            className="relative select-none"
            style={{ width, height }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onTouchStart={handleTouchStart}
        >
            {/* Canvas renders the pixel transitions */}
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    imageRendering: "pixelated",
                }}
            />

            {/* Accent border hover effect */}
            <div
                className="absolute inset-0 border border-[var(--border)] transition-colors duration-300 pointer-events-none z-10"
                style={{
                    borderColor: hovering ? "var(--accent)" : undefined,
                    boxShadow: hovering
                        ? "0 0 0 1px var(--accent), inset 0 0 40px rgba(191,155,74,0.06)"
                        : undefined,
                }}
            />

            {/* Pixel grid overlay (appears when heavily pixelated) — subtle and atmospheric */}
            <div
                className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-150"
                style={{
                    backgroundImage: `repeating-linear-gradient(
                        0deg, transparent, transparent 3px, rgba(255,255,255,0.025) 3px, rgba(255,255,255,0.025) 4px
                    ), repeating-linear-gradient(
                        90deg, transparent, transparent 3px, rgba(255,255,255,0.025) 3px, rgba(255,255,255,0.025) 4px
                    )`,
                    opacity: hovering ? 0.6 : 0,
                }}
            />

            {/* Glowing shadow */}
            <div
                className="absolute -inset-4 -z-10 blur-2xl bg-[var(--accent)] transition-opacity duration-500 pointer-events-none"
                style={{ opacity: hovering ? 0.12 : 0 }}
            />

            {/* Floating corner labels in pixel style */}
            <div
                className="absolute top-2 right-2 z-30 font-mono text-[7px] uppercase tracking-[0.2em] transition-opacity duration-200 pointer-events-none"
                style={{
                    opacity: hovering ? 1 : 0,
                    color: "var(--accent)",
                    textShadow: "0 0 8px var(--accent)",
                }}
            >
                [ pixel mode ]
            </div>
        </div>
    );
}
