"use client"

// Library
import React from 'react';

// Components
import { Button } from '../ui/button';
import ButtonGroup from '../generals/button-group';

// Iconst
import { Search, X } from 'lucide-react';

// Supports
import { useSearchBar } from '@/store/search-bar';

// Interface

export default function SearchBar() {
    const {
        query,
        setQuery,
        typeMovieAvailable,
        yearsMovieAvailable,
        setTypeMovieAvailable,
        setYearsMovieAvailable,
        setTypeSelected,
        setYearsSelected,
        setTotal,
    } = useSearchBar();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const query = formData.get("query") as string;
        
        setQuery(`${query}`)
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setTypeMovieAvailable([])
        setYearsMovieAvailable([])
        setTypeSelected("")
        setYearsSelected("")
        setTotal(0)
    }

    const clearSearch = () => setQuery('');

    return (
        <div className="w-full max-w-2xl mx-auto mb-10 px-4">
            <div className="relative mb-4">
                <form 
                    onSubmit={handleSubmit}
                    className="group flex gap-2 items-center transition-all duration-300 focus-within:ring-2 focus-within:ring-black/10 ring-0 px-4 py-3 bg-secondary rounded-xl"
                >
                    <Search size={20} className="text-muted-foreground transition-opacity group-focus-within:opacity-100 opacity-70 hidden md:block" />
                    
                    <input
                        type="text"
                        value={query}
                        onChange={handleChangeInput}
                        name="query"
                        placeholder="Search for movies, TV shows..."
                        className="flex-1 bg-transparent border-none outline-none md:px-3 placeholder:text-muted-foreground/70 text-foreground"
                    />
            
                    {
                        query && (
                            <button 
                                type="button" 
                                onClick={clearSearch}
                                className="p-1 rounded-full hover:bg-black/5 transition-colors absolute md:relative right-2 md:right-unset"
                                aria-label="Clear search"
                            >
                                <X size={18} className="text-muted-foreground cursor-pointer" />
                            </button>
                        )
                    }
                    
                    <Button 
                        type="submit" 
                        className="cursor-pointer hidden md:block"
                    >
                        Search
                    </Button>
                </form>
            </div>
            <div className='w-full flex flex-col items-center gap-y-4 justify-center'>
                <ButtonGroup
                    datas={typeMovieAvailable}
                    propsToggle={{
                        onValueChange: (e: unknown) => setTypeSelected(`${e}`)
                    }}
                />
                <ButtonGroup
                    datas={yearsMovieAvailable}
                    propsToggle={{
                        onValueChange: (e: unknown) => setYearsSelected(`${e}`)
                    }}
                />
            </div>
        </div>
    );
};