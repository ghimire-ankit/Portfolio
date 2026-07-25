"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface HoverFeatureCardItem {
    name: string;
    description: string;
    href?: string;
    img?: string;
    imgLight?: string;
    imgClassName?: string;
    imgWidth?: number;
    containerClassName?: string;
    fadeBottom?: boolean;
    soon?: boolean;
}

export interface HoverFeatureCardsProps {
    items: HoverFeatureCardItem[];
    className?: string;
    renderLink?: (href: string, children: React.ReactNode) => React.ReactNode;
}

function HoverFeatureCard({
    item,
    renderLink,
}: {
    item: HoverFeatureCardItem;
    renderLink?: HoverFeatureCardsProps["renderLink"];
}) {
    const inner = (
        <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            whileTap={{ scale: item.href && !item.soon ? 0.98 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            variants={{ rest: { scale: 1, y: 0 } }}
            className={cn(
                "group flex flex-col w-full relative",
                item.soon
                    ? "opacity-80 cursor-not-allowed"
                    : item.href
                        ? "cursor-pointer"
                        : "",
            )}
        >
            <div
                className={cn(
                    "flex flex-col rounded-3xl border h-52 relative z-[5] bg-[var(--bg-secondary)] transition-all duration-300 w-full overflow-hidden",
                    !item.soon && item.href ? "hover:border-[var(--accent)]/50 hover:shadow-[0_0_25px_rgba(189,134,247,0.15)]" : "",
                    item.soon ? "border-dashed border-[var(--border)]" : "border-[var(--border)]",
                )}
            >
                {item.soon && (
                    <span className="absolute top-4 right-4 z-10 text-[9px] font-mono tracking-wider uppercase text-[var(--text-secondary)] border border-[var(--border)] rounded-full px-2.5 py-1 bg-[var(--bg-primary)]">
                        Coming soon
                    </span>
                )}

                <div
                    className={cn(
                        "relative w-full h-full p-6 flex flex-col justify-between gap-2",
                        item.containerClassName,
                    )}
                >
                    <div className="flex flex-col gap-1.5">
                        <span
                            className={cn(
                                "font-outfit font-bold text-xl tracking-tight uppercase transition-colors duration-300 group-hover:text-[var(--accent)]",
                                item.soon ? "text-[var(--text-secondary)]" : "text-[var(--text-primary)]",
                            )}
                        >
                            {item.name}
                        </span>
                    </div>

                    {/* Project image display inside card */}
                    {item.img && (
                        <div className="absolute right-4 bottom-4 w-32 h-20 overflow-hidden rounded-lg border border-[var(--border)] group-hover:border-[var(--accent)]/30 transition-colors pointer-events-none hidden sm:block">
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                            />
                        </div>
                    )}

                    {item.fadeBottom && (
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent" />
                    )}

                    {/* Learn More arrow link */}
                    {item.href && !item.soon && (
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] opacity-60 group-hover:opacity-100 transition-opacity flex items-center gap-1 mt-2">
                            Explore Project ↗
                        </div>
                    )}
                </div>
            </div>

            <motion.div
                variants={{
                    rest: { opacity: 0.1, y: -24 },
                    hover: { opacity: 1, y: 0 },
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="overflow-hidden z-[1] w-[92%] self-center"
            >
                <div className="py-3 px-5 relative border border-t-0 rounded-b-2xl border-[var(--border)] bg-[var(--bg-secondary)]/40 backdrop-blur-sm">
                    <div className="pointer-events-none w-[103%] bg-gradient-to-b from-[var(--bg-primary)] to-transparent h-6 absolute -top-1 -left-1" />
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light">
                        {item.description}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );

    if (item.href && renderLink && !item.soon) {
        return renderLink(item.href, inner);
    }

    if (item.href && !item.soon) {
        return (
            <a href={item.href} target="_blank" rel="noopener noreferrer" className="block w-full">
                {inner}
            </a>
        );
    }

    return inner;
}

function HoverFeatureCards({
    items,
    className,
    renderLink,
}: HoverFeatureCardsProps) {
    return (
        <div
            className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 w-full", className)}
        >
            {items.map((item) => (
                <HoverFeatureCard key={item.name} item={item} renderLink={renderLink} />
            ))}
        </div>
    );
}

export { HoverFeatureCards, HoverFeatureCard };
