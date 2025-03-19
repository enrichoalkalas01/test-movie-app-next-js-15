"use client";

// Library
// import React, { useState } from "react";

// Components
import Movies from "@/components/movies/movies";
import Navbar from "@/components/headers/navbar";
import SearchBar from "@/components/search-bar";
import FeaturedMovies from "@/components/featured-movies/featured-movies";
import NewsLetter from "@/components/news-letter/news-letter";

// Supports
import { cn } from "@/lib/utils";
import Footer from "@/components/headers/footer";

// Interfaces

export default function Home() {
    // const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <>
            <section
                className={cn(
                    "w-full min-h-screen max-w-5xl mx-auto lg:px-4 lg:py-4",
                )}
            >
                <div className="w-full">
                    <Navbar />
                </div>
                <div className="w-full lg:pt-8 pb-0">
                    <FeaturedMovies />
                </div>
                <div className="w-full px-4 mb-4 pt-12 flex justify-center items-center gap-4">
                    <section className="w-full" id="search">
                        <div className="container mx-auto">
                            <div className="text-center mb-10 animate-fade-in">
                                <span className="text-xs uppercase text-center tracking-wider px-3 py-1 rounded-full bg-secondary font-medium">
                                    Discover
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-2">
                                    Find Your Next Favorite
                                </h2>
                                <p className="text-muted-foreground max-w-xl mx-auto">
                                    Search through thousands of movies and TV shows from the OMDB database
                                </p>
                            </div>
                        
                            <SearchBar />
                        </div>
                    </section>
                </div>
                <div className="w-full">
                    <Movies />
                </div>
                <div className="w-full px-4 md:px-0">
                    <NewsLetter />
                </div>
                <div className="w-full">
                    <Footer />
                </div>
            </section>
        </>
    );
}
