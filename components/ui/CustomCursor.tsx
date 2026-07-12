"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const ringX = useSpring(mouseX, { stiffness: 120, damping: 24 });
    const ringY = useSpring(mouseY, { stiffness: 120, damping: 24 });

    useEffect(() => {
        const move = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const addHover = () => ringRef.current?.classList.add("hover");
        const removeHover = () => ringRef.current?.classList.remove("hover");

        window.addEventListener("mousemove", move);

        const interactables = document.querySelectorAll("a, button, [data-cursor-hover]");
        interactables.forEach((el) => {
            el.addEventListener("mouseenter", addHover);
            el.addEventListener("mouseleave", removeHover);
        });

        return () => {
            window.removeEventListener("mousemove", move);
            interactables.forEach((el) => {
                el.removeEventListener("mouseenter", addHover);
                el.removeEventListener("mouseleave", removeHover);
            });
        };
    }, [mouseX, mouseY]);

    return (
        <div className="cursor" aria-hidden="true">
            <motion.div
                className="cursor-dot"
                style={{ left: mouseX, top: mouseY }}
            />
            <motion.div
                ref={ringRef}
                className="cursor-ring"
                style={{ left: ringX, top: ringY }}
            />
        </div>
    );
}
