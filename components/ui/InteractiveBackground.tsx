"use client";
import React, { useEffect, useRef } from "react";

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

        // Particle class definition
        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                // very slow, elegant drifts
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
                this.radius = Math.random() * 1.5 + 0.5;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw(c: CanvasRenderingContext25D) {
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                c.fillStyle = "rgba(191, 155, 74, 0.22)"; // gold tint
                c.fill();
            }
        }

        // Initialize particles
        const particleCount = Math.min(65, Math.floor((width * height) / 22000));
        const particles: Particle[] = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Track cursor coordinates
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

        // Core animation loop
        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Update & draw particles
            particles.forEach((p) => {
                p.update();
                p.draw(ctx);

                // Magnetic attraction/repulsion logic from cursor
                if (mouse.active) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 180) {
                        // Gently push the particle away from cursor
                        const force = (180 - dist) / 180;
                        p.x -= (dx / dist) * force * 0.9;
                        p.y -= (dy / dist) * force * 0.9;
                    }
                }
            });

            // Draw link connections between nodes
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];

                // Connect to cursor
                if (mouse.active) {
                    const dx = mouse.x - p1.x;
                    const dy = mouse.y - p1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        const alpha = (1 - dist / 150) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(191, 155, 74, ${alpha})`;
                        ctx.lineWidth = 0.55;
                        ctx.stroke();
                    }
                }

                // Connect to neighboring nodes
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        const alpha = (1 - dist / 110) * 0.07;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(191, 155, 74, ${alpha})`;
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
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none -z-30 block"
            style={{ mixBlendMode: "screen" }}
        />
    );
}
// Fix canvas rendering context typing
interface CanvasRenderingContext25D extends CanvasRenderingContext2D { }
