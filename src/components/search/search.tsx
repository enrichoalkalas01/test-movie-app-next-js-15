"use client"

import SearchBar from "@/components/search/search-bar";

export default function Search() {
    return (
        <section className="w-full" id="search">
            <div className="w-full">
                <div className="text-center mb-8">
                    <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-secondary text-muted-foreground font-semibold">
                        Discover
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-2">
                        Find Your Next Favorite
                    </h2>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                        Search through thousands of movies and TV shows from the OMDB database.
                    </p>
                </div>
                <SearchBar />
            </div>
        </section>
    )
}
