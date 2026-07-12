"use client";
import { personal } from "@/lib/data";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="border-t border-[var(--border)] pt-10 pb-8">
            {/* Top row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
                <div>
                    <p className="font-cormorant text-2xl font-bold italic text-[var(--text-primary)]">
                        {personal.firstName} <span className="text-[var(--accent)]">{personal.lastName}</span>
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)] mt-1">
                        Developer · Builder · Tech Explorer
                    </p>
                </div>

                <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="flex items-center gap-2 font-mono text-[9px] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors uppercase tracking-widest border border-[var(--border)] hover:border-[var(--accent)] px-4 py-2"
                    whileHover={{ y: -2 }}
                    aria-label="Back to top"
                >
                    <ArrowUp size={11} />
                    Back to top
                </motion.button>
            </div>

            {/* Divider */}
            <div className="h-px bg-[var(--border)] mb-6" />

            {/* Bottom row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="font-mono text-[9px] text-[var(--text-secondary)] uppercase tracking-widest">
                    © {year} {personal.name} · All Rights Reserved
                </p>
                <p className="font-mono text-[9px] text-[var(--text-secondary)] uppercase tracking-widest">
                    Crafted with curiosity · Deployed with purpose
                </p>
            </div>
        </footer>
    );
}
