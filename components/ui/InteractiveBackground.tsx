"use client";
import React, { useEffect, useRef } from "react";

// Helper to convert hex strings to RGB
const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : { r: 226, g: 168, b: 77 }; // default fallback (gold)
};

export default function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Keep track of current dynamic theme coordinates
        let currentRgb = { r: 226, g: 168, b: 77 };

        const updateAccentColor = () => {
            const rawAccent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
            if (rawAccent && rawAccent.startsWith("#")) {
                currentRgb = hexToRgb(rawAccent);
            }
        };

        // Initialize colors
        updateAccentColor();

        // Particle template
        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.radius = Math.random() * 1.5 + 0.65;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce behavior
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw(c: CanvasRenderingContext2D, rgb: { r: number; g: number; b: number }) {
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                c.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`;
                c.fill();
            }
        }

        // Initialize particles
        const particleCount = Math.min(65, Math.floor((width * height) / 22000));
        const particles: Particle[] = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Mouse behavior tracking
        const mouse = { x: -1000, y: -1000, active: false };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        // Periodically verify theme switch color changes
        const themeChecker = setInterval(updateAccentColor, 800);

        // Core render animation
        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Redraw particles
            particles.forEach((p) => {
                p.update();
                p.draw(ctx, currentRgb);

                // Mouse repel force
                if (mouse.active) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 160) {
                        const force = (160 - dist) / 160;
                        p.x -= (dx / dist) * force * 0.75;
                        p.y -= (dy / dist) * force * 0.75;
                    }
                }
            });

            // Repaint lines
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];

                // Mouse link lines
                if (mouse.active) {
                    const dx = mouse.x - p1.x;
                    const dy = mouse.y - p1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        const alpha = (1 - dist / 150) * 0.16;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(${currentRgb.r}, ${currentRgb.g}, ${currentRgb.b}, ${alpha})`;
                        ctx.lineWidth = 0.55;
                        ctx.stroke();
                    }
                }

                // Node link lines
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        const alpha = (1 - dist / 110) * 0.08;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(${currentRgb.r}, ${currentRgb.g}, ${currentRgb.b}, ${alpha})`;
                        ctx.lineWidth = 0.45;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearInterval(themeChecker);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none -z-30 block"
            style={{ mixBlendMode: "difference" }} // Blend perfectly with both dark & light backgrounds
        />
    );
}
