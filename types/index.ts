export interface Project {
    id: number;
    name: string;
    tagline: string;
    description: string;
    tech: string[];
    liveUrl?: string;
    githubUrl: string;
    featured: boolean;
    image?: string; // Optional image URL
    category: "Full-Stack" | "Frontend" | "AI Tool" | "Tool";
}

export interface Experience {
    id: number;
    title: string;
    institution: string;
    period: string;
    status: string;
    description: string;
    type: "education" | "work";
}

export interface Skill {
    name: string;
    category: "frontend" | "backend" | "tools";
}

export interface Interest {
    title: string;
    description: string;
    icon: string;
    size: "large" | "normal";
}

export interface Social {
    name: string;
    url: string;
    handle: string;
}
