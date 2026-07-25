"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { socials, personal } from "@/lib/data";
import { Github, Linkedin, Mail } from "lucide-react";
import TextScramble from "@/components/ui/TextScramble";
import StaggeredGrid from "@/components/ui/StaggeredGrid";

export default function Contact() {
    const [emailStatus, setEmailStatus] = useState("Say Hello");

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("ankitghimire2004@gmail.com");
        setEmailStatus("Email Copied!");
        setTimeout(() => {
            setEmailStatus("Say Hello");
        }, 2200);
    };

    const bentoItems = [
        {
            id: "github",
            title: "GitHub Portfolio",
            subtitle: "Repository Hub",
            description: "Explore 4+ projects, active scripts, and open-source contributions.",
            icon: <Github size={20} />,
            url: "https://github.com/ghimire-ankit",
            image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: "linkedin",
            title: "LinkedIn Profile",
            subtitle: "Professional Network",
            description: "Connect for professional collaborations, BCA updates, and opportunities.",
            icon: <Linkedin size={20} />,
            url: "https://www.linkedin.com/in/ankit-ghimire-b83a72280/",
            image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: "mail",
            title: "Direct Email Contacts",
            subtitle: "Communication channel",
            description: "Shoot me a prompt to discuss projects, feedback, or say hello.",
            icon: <Mail size={20} />,
            url: "mailto:ankitghimire2004@gmail.com",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop"
        }
    ];

    const decoratorImages = [
        "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop"
    ];

    return (
        <section id="contact" className="text-center pb-24">
            <motion.span
                className="text-label block mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <TextScramble text="Get in touch" />
            </motion.span>

            <motion.h2
                className="text-heading text-[var(--text-primary)] mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                Let&apos;s build<br />
                <span className="text-[var(--accent)] italic">something.</span>
            </motion.h2>

            <motion.p
                className="text-[var(--text-secondary)] max-w-md mx-auto mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
            >
                Whether it&apos;s a project collab, an opportunity, or just a conversation about
                tech, my inbox is always open.
            </motion.p>

            <motion.div
                className="flex flex-wrap justify-center gap-4 mb-20"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                <a
                    href="mailto:ankitghimire2004@gmail.com"
                    className="btn-primary pointer-events-auto"
                    onClick={handleCopyEmail}
                >
                    <Mail size={13} className="pointer-events-none" />
                    <span className="pointer-events-none">
                        <TextScramble text={emailStatus} key={emailStatus} />
                    </span>
                </a>
            </motion.div>

            {/* Interactive Staggered Grid Connect Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="w-full mt-10 border-t border-[var(--border)] pt-16 text-left"
            >
                <StaggeredGrid
                    images={decoratorImages}
                    bentoItems={bentoItems}
                    centerText="CONNECT"
                />
            </motion.div>
        </section>
    );
}
