"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Interests from "@/components/sections/Interests";
import Contact from "@/components/sections/Contact";
import CustomCursor from "@/components/ui/CustomCursor";
import GrainOverlay from "@/components/ui/GrainOverlay";
import InteractiveBackground from "@/components/ui/InteractiveBackground";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Preloader from "@/components/ui/Preloader";
import TimeWeatherWidget from "@/components/ui/TimeWeatherWidget";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
    const [loaded, setLoaded] = useState(false);

    // Prevent scroll during preload
    useEffect(() => {
        if (!loaded) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [loaded]);

    // Disable right click (context menu) globally
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    return (
        <>
            {/* Preloader */}
            <AnimatePresence>
                {!loaded && <Preloader onDone={() => setLoaded(true)} />}
            </AnimatePresence>

            {/* Main content — fades in after preloader */}
            <AnimatePresence>
                {loaded && (
                    <motion.div
                        key="main"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <GrainOverlay />
                        <InteractiveBackground />
                        <ScrollProgress />
                        <CustomCursor />
                        <Navbar />
                        <TimeWeatherWidget />

                        <main className="w-full">
                            {/* Full-bleed Hero */}
                            <Hero />

                            {/* Content sections */}
                            <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
                                <About />
                                <Experience />
                                <Projects />
                                <Skills />
                                <Interests />
                                <Contact />
                                <Footer />
                            </div>
                        </main>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
