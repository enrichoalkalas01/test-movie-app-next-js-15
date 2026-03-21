"use client"

import React from 'react';
import { Search, X } from 'lucide-react';

import { Button } from '../ui/button';
import ButtonGroup from '../generals/button-group';
import { useSearchBar } from '@/store/search-bar';

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
        typeSelected,
        yearsSelected,
        setTotal,
    } = useSearchBar();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const q = formData.get("query") as string;
        setQuery(q);
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setTypeMovieAvailable([]);
        setYearsMovieAvailable([]);
        setTypeSelected("");
        setYearsSelected("");
        setTotal(0);
    };

    const clearSearch = () => {
        setQuery("");
        setTypeMovieAvailable([]);
        setYearsMovieAvailable([]);
        setTypeSelected("");
        setYearsSelected("");
        setTotal(0);
    };

    return (
        <div className="w-full max-w-2xl mx-auto mb-10">
            {/* Search input */}
            <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 bg-secondary border border-border px-4 py-2.5 rounded-xl ring-0 focus-within:ring-2 focus-within:ring-primary/30 transition-all"
            >
                <Search size={18} className="text-muted-foreground shrink-0" />

                <input
                    type="text"
                    value={query}
                    onChange={handleChangeInput}
                    name="query"
                    placeholder="Search for movies, TV shows..."
                    className="flex-1 bg-transparent border-none outline-none px-2 text-sm placeholder:text-muted-foreground/60 text-foreground"
                />

                {query && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="p-1 rounded-full hover:bg-muted transition-colors shrink-0"
                        aria-label="Clear search"
                    >
                        <X size={15} className="text-muted-foreground" />
                    </button>
                )}

                <Button type="submit" size="sm" className="cursor-pointer shrink-0 hidden sm:flex">
                    Search
                </Button>
            </form>

            {/* Filters */}
            {(typeMovieAvailable.length > 0 || yearsMovieAvailable.length > 0) && (
                <div className="mt-4 flex flex-col gap-3">
                    {typeMovieAvailable.length > 0 && (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <span className="text-xs text-muted-foreground font-medium w-12 shrink-0">Type</span>
                            <ButtonGroup
                                datas={typeMovieAvailable}
                                selectedValue={typeSelected}
                                propsToggle={{
                                    onValueChange: (e: unknown) => setTypeSelected(`${e}`),
                                }}
                            />
                        </div>
                    )}

                    {yearsMovieAvailable.length > 0 && (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <span className="text-xs text-muted-foreground font-medium w-12 shrink-0">Year</span>
                            <ButtonGroup
                                datas={yearsMovieAvailable}
                                selectedValue={yearsSelected}
                                propsToggle={{
                                    onValueChange: (e: unknown) => setYearsSelected(`${e}`),
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
