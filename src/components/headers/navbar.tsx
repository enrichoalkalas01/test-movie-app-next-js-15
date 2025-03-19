"use client"

import React, { useState } from 'react';
import { Menu, X, Home, Info, Phone, Mail } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
  
    return (
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
                        {/* <a href="#" className="flex items-center text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition duration-300">
                            <Home className="mr-1 h-4 w-4" />
                            Home
                        </a>
                        <a href="#" className="flex items-center text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition duration-300">
                            <Info className="mr-1 h-4 w-4" />
                            About
                        </a>
                        <a href="#" className="flex items-center text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition duration-300">
                            <Mail className="mr-1 h-4 w-4" />
                            Services
                        </a>
                        <a href="#" className="flex items-center text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition duration-300">
                            <Phone className="mr-1 h-4 w-4" />
                            Contact
                        </a> */}
                        <button className="bg-primary hover:bg-primary text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300">
                            Sign In
                        </button>
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
                        {/* <a href="#" className="flex items-center text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
                            <Home className="mr-2 h-5 w-5" />
                            Home
                        </a>
                        <a href="#" className="flex items-center text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
                            <Info className="mr-2 h-5 w-5" />
                            About
                        </a>
                        <a href="#" className="flex items-center text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
                            <Mail className="mr-2 h-5 w-5" />
                            Services
                        </a>
                        <a href="#" className="flex items-center text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
                            <Phone className="mr-2 h-5 w-5" />
                            Contact
                        </a> */}
                        <button className="mt-1 w-full bg-primary hover:bg-primary text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300">
                            Sign In
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;