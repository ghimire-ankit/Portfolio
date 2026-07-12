import type { Project, Experience, Skill, Interest, Social } from "@/types";

export const personal = {
    name: "Ankit Ghimire",
    firstName: "Ankit",
    lastName: "Ghimire",
    role: "Tech Explorer & AI Enthusiast",
    roles: ["Tech Explorer", "Associate Learner", "AI Enthusiast", "Creative Builder"],
    tagline: "Always learning, exploring emerging tools, and building digital experiences with curiosity.",
    bio: "I'm a BCA student at Pokhara University, landing my first steps in the tech and AI field. I enjoy exploring web technologies, experimenting with AI tools, and building projects that fuel my passion for continuous learning.",
    location: "Nepal 🇳🇵",
    availableForWork: true,
    stats: [
        { label: "Projects Explored", value: "4+" },
        { label: "Years of Practice", value: "2+" },
        { label: "Graduating", value: "2027" },
    ],
};

export const socials: Social[] = [
    {
        name: "GitHub",
        url: "https://github.com/ghimire-ankit",
        handle: "@ghimire-ankit",
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ankit-ghimire-b83a72280/",
        handle: "Ankit Ghimire",
    },
    {
        name: "Email",
        url: "mailto:ankitghimire2004@gmail.com",
        handle: "ankitghimire2004@gmail.com",
    },
];

export const projects: Project[] = [
    {
        id: 1,
        name: "CakeNKitchen",
        tagline: "E-Commerce Bakery Platform",
        description:
            "A live bakery ordering platform where customers design custom cakes through an interactive SVG-based live preview. Text bends along circular arcs in real time. Includes a secure admin dashboard for managing inventory, pricing, and orders across the full lifecycle from pending to delivery.",
        tech: ["React", "Vite", "Node.js", "Express.js", "MySQL"],
        liveUrl: "https://cake-n-kitchen.vercel.app/",
        githubUrl: "https://github.com/ghimire-ankit/CakeNKitchen",
        featured: true,
        category: "Full-Stack",
        image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=1000&auto=format&fit=crop", // Bakery/Cake vibe
    },
    {
        id: 2,
        name: "Edge-PDF",
        tagline: "Local-First PDF Editing Tool",
        description:
            "A 100% client-side PDF editor where no file ever touches a server. Uses PDF.js to map document coordinates and detect native fonts, enabling inline text edits and redaction overlays. Features a canvas-based e-signature tool and Zustand-powered undo/redo with keyboard shortcuts.",
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "PDF.js", "Zustand"],
        liveUrl: "https://edgepdf.vercel.app/",
        githubUrl: "https://github.com/ghimire-ankit/Edge-Pdf",
        featured: true,
        category: "Tool",
        image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=1000&auto=format&fit=crop", // Clean tech/document vibe
    },
    {
        id: 3,
        name: "Kotha Bhada",
        tagline: "Room Rental Management System",
        description:
            "A full-stack room rental web app for university students with role-based dashboards, a normalized PostgreSQL schema for auth and property listings, and responsive search filters by budget and location.",
        tech: ["Python", "Flask", "PostgreSQL", "Bootstrap"],
        liveUrl: "https://ankitghimire.pythonanywhere.com/",
        githubUrl: "https://github.com/ghimire-ankit/kothabhada-web",
        featured: false,
        category: "Full-Stack",
    },
    {
        id: 4,
        name: "AI Content Repurposer",
        tagline: "AI-Powered Social Content Generator",
        description:
            "Converts a single topic into platform-specific social posts for LinkedIn, X, and Instagram using the Google Gemini API. Features configurable tone presets, word-limit controls, and campaign history saved via localStorage.",
        tech: ["HTML", "CSS", "JavaScript", "Gemini API"],
        liveUrl: "https://contentgenerator-by-ankitggg.streamlit.app/",
        githubUrl: "https://github.com/ghimire-ankit/ContentGenerator",
        featured: false,
        category: "AI Tool",
    },
];

export const experiences: Experience[] = [
    {
        id: 1,
        title: "Bachelor of Computer Application (BCA)",
        institution: "Pokhara University",
        period: "2023 – 2027",
        status: "Running",
        description:
            "Pursuing a 4-year BCA program with focus on software engineering, databases, and web development.",
        type: "education",
    },
    {
        id: 2,
        title: "+2 Management with Computer Science",
        institution: "NAST Secondary School, Dhangadhi, Kailali",
        period: "2021 – 2023",
        status: "Completed",
        description:
            "Completed higher secondary education in Management stream with Computer Science, building a solid foundation in business fundamentals, economics, accounting, and computer applications.",
        type: "education",
    },
];

export const skills: Skill[] = [
    { name: "React", category: "frontend" },
    { name: "Next.js", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "HTML / CSS", category: "frontend" },
    { name: "WordPress", category: "frontend" },
    { name: "Canva", category: "frontend" },
    { name: "Node.js", category: "backend" },
    { name: "Express.js", category: "backend" },
    { name: "Python", category: "backend" },
    { name: "Flask", category: "backend" },
    { name: "MySQL", category: "backend" },
    { name: "PostgreSQL", category: "backend" },
    { name: "Git / GitHub", category: "tools" },
    { name: "Figma", category: "tools" },
    { name: "Gemini API", category: "tools" },
    { name: "Vercel", category: "tools" },
];

export const interests: Interest[] = [
    {
        title: "Tech Explorer",
        description: "Always the first to dive into emerging tools, frameworks, and paradigms.",
        icon: "🔭",
        size: "large",
    },
    {
        title: "AI Research",
        description: "Fascinated by how machine intelligence reshapes human experience.",
        icon: "🧠",
        size: "normal",
    },
    {
        title: "Open Source",
        description: "Building in public and contributing to the community.",
        icon: "🌐",
        size: "normal",
    },
    {
        title: "Problem Solving",
        description: "Love breaking down complex challenges into elegant solutions.",
        icon: "⚡",
        size: "normal",
    },
    {
        title: "Emerging Tech",
        description: "Web3, edge computing, AI agents. The frontier is endlessly exciting.",
        icon: "🚀",
        size: "normal",
    },
    {
        title: "Building Things",
        description: "The act of creation is its own reward. Ship. Learn. Repeat.",
        icon: "🛠️",
        size: "large",
    },
];

export const marqueeItems = [
    "React", "Next.js", "TypeScript", "Node.js", "Python",
    "Flask", "MySQL", "PostgreSQL", "Tailwind", "Git",
    "Figma", "Gemini API", "Express.js", "Vercel", "WordPress", "Canva",
];
