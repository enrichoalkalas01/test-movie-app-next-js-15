import React from 'react';
import Link from 'next/link';
import { Film } from 'lucide-react';

const currentYear = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="w-full border-t border-border bg-muted/30 mt-8">
            <div className="w-full max-w-5xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                                <Film className="w-4 h-4 text-primary-foreground" />
                            </div>
                            <span className="text-lg font-bold">CineSearch</span>
                        </Link>
                        <p className="text-muted-foreground text-sm max-w-xs">
                            Discover movies and TV shows from the OMDB database. Search, explore, and find your next favorite title.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-sm font-semibold mb-3">Navigation</h4>
                        <ul className="space-y-2">
                            {[
                                { label: "Home", href: "/" },
                                { label: "Discover", href: "/#search" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Data Source */}
                    <div>
                        <h4 className="text-sm font-semibold mb-3">About</h4>
                        <ul className="space-y-2">
                            <li className="text-sm text-muted-foreground">Powered by OMDB API</li>
                            <li className="text-sm text-muted-foreground">Built with Next.js 15</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
                    <p>&copy; {currentYear} CineSearch. All rights reserved.</p>
                    <p>Data provided by <span className="font-medium text-foreground">OMDB API</span></p>
                </div>
            </div>
        </footer>
    );
}
