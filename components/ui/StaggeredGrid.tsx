"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail, Send, Radio } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export interface BentoItem {
    id: number | string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    url: string;
    image?: string;
}

export interface StaggeredGridProps {
    images: string[];
    bentoItems: BentoItem[];
    centerText?: string;
    className?: string;
}

export default function StaggeredGrid({
    images,
    bentoItems,
    centerText = "Connect",
    className,
}: StaggeredGridProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const gridFullRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    // Active Bento State for Accordion Grid item
    const [activeBento, setActiveBento] = useState<number>(0);

    const splitText = (text: string) => {
        return text.split("").map((char, i) => (
            <span key={i} className="char inline-block" style={{ transformStyle: "preserve-3d" }}>
                {char === " " ? "\u00A0" : char}
            </span>
        ));
    };

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        // Custom GSAP character transitions
        let textCtx: gsap.Context | null = null;
        if (textRef.current) {
            textCtx = gsap.context(() => {
                const chars = textRef.current?.querySelectorAll(".char");
                if (chars && chars.length > 0) {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: "top bottom-=50",
                            end: "bottom center",
                            scrub: 1,
                        },
                    }).from(chars, {
                        opacity: 0,
                        yPercent: 120,
                        rotateX: -45,
                        stagger: 0.05,
                        ease: "power2.out",
                    });
                }
            }, textRef);
        }

        // Custom Column Stagger GSAP animations
        let gridCtx: gsap.Context | null = null;
        if (gridFullRef.current) {
            gridCtx = gsap.context(() => {
                const gridFullItems = gridFullRef.current?.querySelectorAll(".grid__item");
                if (!gridFullItems) return;

                // Sort children into columns based on CSS grid positioning
                // Grid layout has 7 columns
                const numColumns = 7;
                const middleColumnIndex = 3;
                const columns: Element[][] = Array.from({ length: numColumns }, () => []);

                gridFullItems.forEach((item: any, idx) => {
                    // Stagger columns symmetrically
                    const colIndex = idx % numColumns;
                    if (columns[colIndex]) {
                        columns[colIndex].push(item);
                    }
                });

                columns.forEach((columnItems, columnIndex) => {
                    const delayFactor = Math.abs(columnIndex - middleColumnIndex) * 0.15;

                    gsap.timeline({
                        scrollTrigger: {
                            trigger: gridFullRef.current,
                            start: "top bottom",
                            end: "center center-=10%",
                            scrub: 1.5,
                        },
                    }).from(columnItems, {
                        yPercent: 80,
                        opacity: 0,
                        delay: delayFactor,
                        ease: "sine.out",
                        stagger: 0.06,
                    });
                });
            }, gridFullRef);
        }

        return () => {
            if (textCtx) textCtx.revert();
            if (gridCtx) gridCtx.revert();
        };
    }, [isLoaded]);

    // Create 21 elements grid layout template
    const mixedGridItems: (string | "BENTO_GROUP")[] = Array.from(
        { length: 21 },
        (_, i) => images[i % images.length]
    );

    // Place Bento Accordion Group at the center
    mixedGridItems[10] = "BENTO_GROUP";

    return (
        <div
            className={cn("relative w-full overflow-hidden select-none", className)}
        >
            {/* Split Title Heading */}
            <div className="w-full text-center mt-12 mb-6">
                <div
                    ref={textRef}
                    className="flex justify-center text-[clamp(2.5rem,7vw,5.5rem)] font-mono uppercase font-bold tracking-widest text-[var(--accent)]"
                    style={{ perspective: "1000px" }}
                >
                    {splitText(centerText)}
                </div>
            </div>

            {/* Staggered Grid Container */}
            <div className="max-w-[1200px] mx-auto px-4 mt-6">
                <div
                    ref={gridFullRef}
                    className="relative w-full grid grid-cols-3 md:grid-cols-7 gap-4 auto-rows-[160px]"
                >
                    {mixedGridItems.map((item, i) => {
                        if (item === "BENTO_GROUP") {
                            if (!bentoItems || bentoItems.length === 0) return null;

                            return (
                                <div
                                    key="bento-group"
                                    className="col-span-3 row-span-2 relative z-20 flex items-stretch gap-3 w-full h-full min-h-[336px]"
                                >
                                    {bentoItems.map((bentoItem, index) => {
                                        const isActive = activeBento === index;
                                        return (
                                            <a
                                                key={bentoItem.id}
                                                href={bentoItem.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={cn(
                                                    "relative cursor-pointer overflow-hidden rounded-2xl h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border border-[var(--border)]",
                                                    isActive
                                                        ? "bg-[var(--bg-surface)] shadow-2xl scale-[1.01]"
                                                        : "bg-[var(--bg-secondary)] hover:bg-[var(--bg-surface)]"
                                                )}
                                                style={{ width: isActive ? "60%" : "20%" }}
                                                onMouseEnter={() => setActiveBento(index)}
                                                onClick={() => setActiveBento(index)}
                                            >
                                                {/* Outer Glow Highlight Overlay */}
                                                <div
                                                    className={cn(
                                                        "absolute inset-0 rounded-2xl border pointer-events-none transition-colors duration-700 z-30",
                                                        isActive
                                                            ? "border-[var(--accent)]/55"
                                                            : "border-[var(--border)] group-hover:border-zinc-800"
                                                    )}
                                                />

                                                {/* Active state content container */}
                                                <div className="relative z-10 w-full h-full flex flex-col p-4 justify-between">
                                                    {/* Background Image layer */}
                                                    <div
                                                        className={cn(
                                                            "absolute inset-0 bg-black overflow-hidden z-0 transition-opacity duration-700",
                                                            isActive ? "opacity-45" : "opacity-0"
                                                        )}
                                                    >
                                                        {bentoItem.image && (
                                                            <>
                                                                <img
                                                                    src={bentoItem.image}
                                                                    alt={bentoItem.title}
                                                                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
                                                            </>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-col relative z-20 h-full justify-between">
                                                        {/* Top indicator row */}
                                                        <div className="flex justify-between items-start">
                                                            <div className="text-[var(--accent)]">
                                                                {bentoItem.icon}
                                                            </div>
                                                            {isActive && (
                                                                <span className="text-[9px] font-mono text-[var(--accent)] tracking-widest uppercase bg-[var(--bg-primary)] px-2 py-0.5 rounded border border-[var(--border)] animate-pulse">
                                                                    Active Link
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Text segment revealed only when active */}
                                                        <div
                                                            className={cn(
                                                                "transition-all duration-500 ease-in-out mt-auto",
                                                                isActive
                                                                    ? "opacity-100 translate-y-0"
                                                                    : "opacity-0 translate-y-4 pointer-events-none"
                                                            )}
                                                        >
                                                            <span className="block text-[8px] font-mono text-[var(--accent)] uppercase tracking-[0.2em] mb-1">
                                                                {bentoItem.subtitle}
                                                            </span>
                                                            <h3 className="text-sm font-bold text-[var(--text-primary)] leading-tight tracking-tight uppercase font-mono">
                                                                {bentoItem.title}
                                                            </h3>
                                                            <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed mt-1 font-sans">
                                                                {bentoItem.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Inactive state centered elements */}
                                                <div
                                                    className={cn(
                                                        "absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-500",
                                                        isActive ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
                                                    )}
                                                >
                                                    <div className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                                                        {bentoItem.icon}
                                                    </div>
                                                    <span className="text-[8px] font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase tracking-wider">
                                                        {bentoItem.title}
                                                    </span>
                                                </div>
                                            </a>
                                        );
                                    })}
                                </div>
                            );
                        }

                        // Skip layout spots that the 3-columns-wide BENTO_GROUP takes up
                        // Since row-span-2 on col-span-3 takes 6 spots (indices 10,11,12 + 17,18,19 in absolute math)
                        if (i === 11 || i === 12 || i === 17 || i === 18 || i === 19) return null;

                        // Decorator Grid Cell
                        const cellIndex = i % 3;
                        let targetLink = "https://github.com/ghimire-ankit";
                        let cellIcon = <Github size={20} />;
                        let cellTitle = "GitHub";
                        let labelTag = "Code Repos";

                        if (cellIndex === 1) {
                            targetLink = "https://www.linkedin.com/in/ankit-ghimire-b83a72280/";
                            cellIcon = <Linkedin size={20} />;
                            cellTitle = "LinkedIn";
                            labelTag = "Social Net";
                        } else if (cellIndex === 2) {
                            targetLink = "mailto:ankitghimire2004@gmail.com";
                            cellIcon = <Mail size={20} />;
                            cellTitle = "Email Link";
                            labelTag = "General Mail";
                        }

                        return (
                            <a
                                key={`img-${i}`}
                                href={targetLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="grid__item block m-0 relative z-10 will-change-[transform,opacity] group cursor-pointer"
                            >
                                <div className="w-full h-full relative rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border)] flex flex-col items-center justify-center transition-all duration-300 ease-out group-hover:border-[var(--accent)] group-hover:bg-[var(--bg-surface)] p-4">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Icon */}
                                    <div className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] group-hover:scale-105 transition-all duration-300">
                                        {cellIcon}
                                    </div>

                                    {/* Text reveal on hover */}
                                    <span className="block text-[8px] font-mono text-[var(--accent)] uppercase tracking-wider mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {labelTag}
                                    </span>
                                    <h4 className="text-[10px] font-bold text-[var(--text-primary)] font-mono uppercase tracking-widest mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {cellTitle}
                                    </h4>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
