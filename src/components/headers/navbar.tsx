"use client"

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

import Login from '../authemtication/login';

import { WrapperDialog } from '../generals/wrapper-dialog';
import UserDropdown from './user-dropdown';

import { useDialogStore } from '@/store/dialog-store';
import { useAuthStore } from '@/store/auth-store';

const Navbar = () => {
    const { setStatusDialog } = useDialogStore()
    const { authStatus } = useAuthStore()

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="w-full">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <span className="text-2xl font-bold text-primary">OMDB Movie</span>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {
                                !authStatus && (
                                    <>
                                        <button onClick={() => setStatusDialog(true)} className="cursor-pointer bg-primary hover:bg-primary text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300">
                                            Sign In
                                        </button>
                                    </>
                                )
                            }

                            {
                                authStatus && (
                                    <UserDropdown />
                                )
                            }
                        </div>
                    </div>
                    
                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
                        >
                        {isOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                        </button>
                    </div>
                    </div>
                </div>
                
                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {
                                !authStatus && (
                                    <button onClick={() => setStatusDialog(true)} className="cursor-pointer mt-1 w-full bg-primary hover:bg-primary text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300">
                                        Sign In
                                    </button>
                                )
                            }

                            {
                                authStatus && (
                                    <UserDropdown />
                                )
                            }
                        </div>
                    </div>
                )}
            </nav>
            <WrapperDialog>
                <Login />
            </WrapperDialog>
        </>
    );
};

export default Navbar;