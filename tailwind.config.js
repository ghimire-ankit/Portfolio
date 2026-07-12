/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "bg-primary": "var(--bg-primary)",
                "bg-secondary": "var(--bg-secondary)",
                "bg-surface": "var(--bg-surface)",
                "text-primary": "var(--text-primary)",
                "text-secondary": "var(--text-secondary)",
                accent: "var(--accent)",
                border: "var(--border)",
            },
            fontFamily: {
                cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
                sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
            },
        },
    },
    plugins: [],
};
