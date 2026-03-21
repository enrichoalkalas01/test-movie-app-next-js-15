"use client";

import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Film, Loader2 } from "lucide-react";

import { LoadingComponent } from "@/components/generals/loading";
import { Button } from "../ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { fetcher } from "@/lib/fetcher";
import { useSearchBar } from "@/store/search-bar";
import { useDebounce } from "@/hooks/use-debounce";

import { DataResponseFetcher, IMovieList } from "@/lib/interfaces";
import MoviesItems from "@/components/movies/movies-items";

export default function Movies() {
    const {
        query,
        setTypeMovieAvailable,
        setYearsMovieAvailable,
        typeMovieAvailable,
        yearsMovieAvailable,
        yearsSelected,
        typeSelected,
        total,
        setTotal,
    } = useSearchBar()

    const debouncedQuery = useDebounce(query, 500);
    const [datas, setDatas] = useState<IMovieList[]>([]);

    const {
        data,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["movies", debouncedQuery, yearsSelected, typeSelected],
        queryFn: ({ pageParam }) =>
            fetcher<DataResponseFetcher>(
                `/api/movies?search=${debouncedQuery}&page=${pageParam}&year=${yearsSelected}&type=${typeSelected}`
            ),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const loaded = allPages.flatMap((p) => p.data).length;
            return loaded < (lastPage.total || 0) ? allPages.length + 1 : undefined;
        },
    });

    useEffect(() => {
        if (data?.pages) {
            if (query) {
                if (!typeMovieAvailable || typeMovieAvailable.length === 0) {
                    const uniqueTypes = [...new Set(data.pages[0].data.map((item: IMovieList) => item.Type))];
                    setTypeMovieAvailable(uniqueTypes.filter(Boolean).map((e) => ({ label: `${e}`, value: `${e}` })));
                }

                if (!yearsMovieAvailable || yearsMovieAvailable.length === 0) {
                    const uniqueYears = [...new Set(data.pages[0].data.map((item: IMovieList) => item.Year))];
                    setYearsMovieAvailable(uniqueYears.filter(Boolean).map((e) => ({ label: `${e}`, value: `${e}` })));
                }
            }

            const mapped = data.pages.flatMap((page) => page.data);
            const totalVal = data.pages[0]?.total ?? 0;

            setTotal(Number(totalVal) || 0);
            setDatas(mapped);
        }
    }, [data]);

    return (
        <div className="w-full pb-12">
            {/* Result count */}
            {total > 0 && !isLoading && (
                <div className="flex items-center gap-2 mb-5 px-1">
                    <span className="text-sm text-muted-foreground">
                        Found <span className="font-semibold text-foreground">{total.toLocaleString()}</span> results
                        {debouncedQuery && <> for <span className="font-semibold text-foreground">&quot;{debouncedQuery}&quot;</span></>}
                    </span>
                </div>
            )}

            {/* Loading skeleton */}
            {isLoading && !error && (
                <div className="w-full mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="break-inside-avoid mb-4">
                            <Skeleton className={`w-full rounded-xl ${i % 3 === 0 ? "h-[260px]" : i % 2 === 0 ? "h-[200px]" : "h-[220px]"}`} />
                        </div>
                    ))}
                </div>
            )}

            {/* Masonry grid */}
            {!isLoading && !error && datas.length > 0 && (
                <div className="w-full mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                    {datas.map((movie: IMovieList, index: number) => (
                        <div key={`${movie.imdbID}-${index}`} className="break-inside-avoid w-full mb-4">
                            <MoviesItems data={movie} />
                        </div>
                    ))}
                </div>
            )}

            {/* Empty state */}
            {!isLoading && (error || datas.length === 0) && (
                <div className="w-full h-[300px] flex flex-col gap-3 justify-center items-center text-muted-foreground">
                    <Film className="w-12 h-12 opacity-30" />
                    <div className="text-center">
                        <p className="font-semibold text-foreground">No results found</p>
                        <p className="text-sm mt-1">
                            {debouncedQuery
                                ? `We couldn't find anything for "${debouncedQuery}". Try a different search.`
                                : "Start searching to discover movies and TV shows."}
                        </p>
                    </div>
                </div>
            )}

            {/* Load More */}
            {hasNextPage && !error && (
                <div className="w-full flex justify-center items-center mt-10">
                    <Button
                        onClick={() => fetchNextPage()}
                        variant="outline"
                        disabled={isFetchingNextPage}
                        className="min-w-[140px] cursor-pointer gap-2"
                    >
                        {isFetchingNextPage ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            "Load More"
                        )}
                    </Button>
                </div>
            )}

            {/* All loaded indicator */}
            {!hasNextPage && !isLoading && datas.length > 0 && (
                <div className="w-full flex justify-center mt-10">
                    <span className="text-xs text-muted-foreground">All {total.toLocaleString()} results loaded</span>
                </div>
            )}
        </div>
    );
}
