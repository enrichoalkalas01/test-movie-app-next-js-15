"use client"

import SearchBar from "@/components/search/search-bar";

export default function Search() {
    return(
        <>
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
        </>
    )
}