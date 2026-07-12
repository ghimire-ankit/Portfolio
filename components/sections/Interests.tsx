"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { interests } from "@/lib/data";

/* ─── 3D Tilt Card ─────────────────────────────────────── */
function TiltCard({ interest, index }: { interest: typeof interests[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });
    const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
    const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setHovered(false);
    };

    // Different card sizes for asymmetric layout
    const isWide = index === 0 || index === 5;

    return (
        <motion.div
            ref={ref}
            className={`relative flex-shrink-0 h-72 ${isWide ? "w-80" : "w-56"} cursor-none`}
            style={{ perspective: 800, rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
        >
            {/* Card body */}
            <div className="w-full h-full border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden relative">

                {/* Animated spotlight glow following mouse */}
                <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
                    style={{
                        opacity: hovered ? 1 : 0,
                        background: useTransform(
                            [glowX, glowY],
                            ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(191,155,74,0.12) 0%, transparent 60%)`
                        ),
                    }}
                />

                {/* Ghost number background */}
                <span
                    className="absolute bottom-2 right-3 font-cormorant font-bold text-[120px] leading-none pointer-events-none select-none text-[var(--bg-surface)]"
                    style={{ color: "rgba(191,155,74,0.06)" }}
                >
                    {(index + 1).toString().padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="relative z-10 p-7 flex flex-col h-full">
                    {/* Icon */}
                    <motion.span
                        className="text-4xl block mb-4"
                        animate={hovered ? { scale: 1.2, rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {interest.icon}
                    </motion.span>

                    {/* Title */}
                    <h3 className="font-cormorant text-2xl font-bold text-[var(--text-primary)] leading-tight mb-2">
                        {interest.title}
                    </h3>

                    {/* Gold accent bar */}
                    <motion.div
                        className="h-px bg-[var(--accent)] mb-4"
                        initial={{ width: "24px" }}
                        animate={{ width: hovered ? "100%" : "24px" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Description — slides up on hover */}
                    <motion.p
                        className="text-sm text-[var(--text-secondary)] leading-relaxed font-light"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
                        transition={{ duration: 0.3, delay: hovered ? 0.1 : 0 }}
                    >
                        {interest.description}
                    </motion.p>

                    {/* Bottom accent */}
                    <div className="mt-auto">
                        <motion.div
                            className="w-1 h-1 rounded-full bg-[var(--accent)]"
                            animate={hovered ? { scale: [1, 2, 1], opacity: [1, 0.5, 1] } : {}}
                            transition={{ duration: 1.2, repeat: Infinity }}
                        />
                    </div>
                </div>

                {/* Border glow on hover */}
                <motion.div
                    className="absolute inset-0 border pointer-events-none"
                    animate={{ borderColor: hovered ? "rgba(191,155,74,0.5)" : "transparent" }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </motion.div>
    );
}

export default function Interests() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!trackRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - trackRef.current.offsetLeft);
        setScrollLeft(trackRef.current.scrollLeft);
    };
    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !trackRef.current) return;
        const x = e.pageX - trackRef.current.offsetLeft;
        trackRef.current.scrollLeft = scrollLeft - (x - startX);
    };

    return (
        <section id="interests" className="relative">
            <span className="section-num select-none" aria-hidden>05</span>

            <div className="section-label">
                <span className="text-label text-[var(--accent)]">Interests</span>
            </div>

            <div className="flex items-end justify-between mb-10 relative z-10">
                <motion.h2
                    className="text-subheading text-[var(--text-primary)] font-cormorant"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                >
                    What drives me.
                </motion.h2>
                <motion.p
                    className="text-label hidden sm:block mb-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    ← drag to explore →
                </motion.p>
            </div>

            {/* Horizontal drag-scroll card track */}
            <div
                ref={trackRef}
                className="relative z-10 flex gap-4 overflow-x-auto pb-6 cursor-grab active:cursor-grabbing select-none"
                style={{
                    // Hide scrollbar but keep scrollable
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
            >
                {interests.map((interest, i) => (
                    <TiltCard key={interest.title} interest={interest} index={i} />
                ))}
                {/* Trailing fade */}
                <div className="flex-shrink-0 w-8" />
            </div>

            {/* Scroll track indicator */}
            <motion.div
                className="w-full h-px bg-[var(--border)] mt-2 relative z-10"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
            />
        </section>
    );
}
