"use client";
import React, { useState, useEffect, useCallback } from "react";

interface TextScrambleProps {
    text: string;
    speed?: number;            // Speed of character swap in ms (default 25ms)
    scrambleDuration?: number; // Total length of resolution in ms (default 400ms)
    triggerOnHover?: boolean;  // Decrypts on cursor mouseEnter
    className?: string;        // Custom class styling
}

const GLYPHS = "01<>[]/_#@%&*?+=!^";

export default function TextScramble({
    text,
    speed = 25,
    scrambleDuration = 350,
    triggerOnHover = true,
    className = "",
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);

    const scramble = useCallback(() => {
        if (isScrambling) return;
        setIsScrambling(true);

        let frame = 0;
        const totalFrames = Math.ceil(scrambleDuration / speed);
        const characters = text.split("");

        const interval = setInterval(() => {
            const temp = characters.map((char, index) => {
                if (char === " ") return " ";

                // Progressive reveal: reveals early letters first
                const progress = frame / totalFrames;
                const threshold = index / characters.length;

                if (progress > threshold) {
                    return char;
                }

                // Return random glyph
                return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            });

            setDisplayText(temp.join(""));
            frame++;

            if (frame >= totalFrames) {
                clearInterval(interval);
                setDisplayText(text);
                setIsScrambling(false);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, scrambleDuration, isScrambling]);

    // Initial load scramble
    useEffect(() => {
        const timer = setTimeout(() => {
            scramble();
        }, 150); // slight offset delay for load effect
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text]);

    return (
        <span
            onMouseEnter={triggerOnHover ? scramble : undefined}
            className={`${className} cursor-default select-none`}
        >
            {displayText}
        </span>
    );
}
