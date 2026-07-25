import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
    variable: "--font-cormorant",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    style: ["normal", "italic"],
    display: "swap",
});

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    weight: ["400", "500"],
    display: "swap",
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: "#040209",
};

export const metadata: Metadata = {
    title: "Ankit Ghimire — Developer & Tech Explorer",
    description:
        "Personal portfolio of Ankit Ghimire — BCA student, aspiring tech associate, and builder of purposeful digital experiences.",
    keywords: ["Ankit Ghimire", "developer", "portfolio", "Next.js", "React", "Nepal", "BCA", "web developer"],
    authors: [{ name: "Ankit Ghimire", url: "https://ankit.is-a.dev" }],
    metadataBase: new URL("https://ankit.is-a.dev"),
    alternates: {
        canonical: "/",
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "Ankit Ghimire — Developer & Tech Explorer",
        description:
            "Personal portfolio of Ankit Ghimire — BCA student, aspiring tech associate, and builder of purposeful digital experiences.",
        type: "website",
        url: "https://ankit.is-a.dev",
        siteName: "Ankit Ghimire Portfolio",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ankit Ghimire — Developer & Tech Explorer",
        description: "Portfolio of Ankit Ghimire — developer, tech explorer, and builder.",
        creator: "@ghimire_ankit",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${cormorant.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
            <body>{children}</body>
        </html>
    );
}
