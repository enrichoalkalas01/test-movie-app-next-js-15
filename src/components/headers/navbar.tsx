"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Film } from 'lucide-react';

import Login from '../authemtication/login';
import { WrapperDialog } from '../generals/wrapper-dialog';
import UserDropdown from './user-dropdown';

import { useDialogStore } from '@/store/dialog-store';
import { useAuthStore } from '@/store/auth-store';

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Discover", href: "/#search" },
];

const Navbar = () => {
    const { setStatusDialog } = useDialogStore()
    const { authStatus } = useAuthStore()

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
                <div className="w-full max-w-5xl mx-auto px-4">
                    <div className="flex justify-between items-center h-14">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                                <Film className="w-4 h-4 text-primary-foreground" />
                            </div>
                            <span className="text-lg font-bold text-foreground">CineSearch</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="h-4 w-px bg-border" />

                            {!authStatus ? (
                                <button
                                    onClick={() => setStatusDialog(true)}
                                    className="cursor-pointer text-sm font-medium bg-primary text-primary-foreground px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    Sign In
                                </button>
                            ) : (
                                <UserDropdown />
                            )}
                        </div>

                        {/* Mobile toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden border-t border-border bg-background">
                        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-sm text-muted-foreground hover:text-foreground py-2 px-3 rounded-md hover:bg-muted transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-2 border-t border-border mt-1">
                                {!authStatus ? (
                                    <button
                                        onClick={() => { setStatusDialog(true); setIsOpen(false); }}
                                        className="w-full cursor-pointer text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                                    >
                                        Sign In
                                    </button>
                                ) : (
                                    <div className="px-3">
                                        <UserDropdown />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <WrapperDialog
                headerStatus={true}
                headerTitle="Sign In"
                headerTitleDescription="Enter your credentials to continue."
            >
                <Login />
            </WrapperDialog>
        </>
    );
};

export default Navbar;
