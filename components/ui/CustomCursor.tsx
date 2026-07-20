"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    // Track mouse coordinates
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Standard springs for ultra-smooth lagging ring follow
    const ringX = useSpring(mouseX, { stiffness: 100, damping: 22 });
    const ringY = useSpring(mouseY, { stiffness: 100, damping: 22 });

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Prevent registering cursor on touch screen devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const move = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        // Event delegation for hover states (dynamic and robust)
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;

            // Check if hover target is interactive
            const closest = target.closest("a, button, [role='button'], input, textarea, .cursor-pointer, [data-cursor-hover]");
            if (closest) {
                setIsHovered(true);
                ringRef.current?.classList.add("hover");
                dotRef.current?.classList.add("hover");
            } else {
                setIsHovered(false);
                ringRef.current?.classList.remove("hover");
                dotRef.current?.classList.remove("hover");
            }
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="cursor" aria-hidden="true">
            {/* Smooth inner dot */}
            <motion.div
                ref={dotRef}
                className="cursor-dot"
                style={{ left: mouseX, top: mouseY }}
            />
            {/* Trailing secondary ring */}
            <motion.div
                ref={ringRef}
                className="cursor-ring"
                style={{ left: ringX, top: ringY }}
            />
        </div>
    );
}
