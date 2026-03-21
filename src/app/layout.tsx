import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import ProviderTanstackQuery from "@/lib/providers/providers-react-query";
// import ProvidersNextAuth from "@/lib/providers/providers-next-auth";
import ProvidersToaster from "@/lib/providers/providers-toaster";

import Navbar from "@/components/headers/navbar";
import Footer from "@/components/headers/footer";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "CineSearch — Movie & TV Show Discovery",
    description: "Discover movies and TV shows from the OMDB database. Search, explore, and find your next favorite title.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ProviderTanstackQuery>
                    <ProvidersToaster>
                        <div className="w-full min-h-screen flex flex-col">
                            <Navbar />
                            <main className="flex-1 w-full max-w-5xl mx-auto px-4">
                                {children}
                            </main>
                            <Footer />
                        </div>
                    </ProvidersToaster>
                </ProviderTanstackQuery>
            </body>
        </html>
    );
}
