"use client";

// Library
import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

// Components
import { LoadingComponent } from "@/components/generals/loading";
import { Button } from "../ui/button";

// Supports
import { fetcher } from "@/lib/fetcher";
import { useSearchBar } from "@/store/search-bar";
import { useDebounce } from "@/hooks/use-debounce";

// Interfaces
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

    // Fetch Data
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
        initialPageParam: 1, // ✅ WAJIB DI v5
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.data.length > 0 ? allPages.length + 1 : undefined;
        },
    });

    useEffect(() => {
        if (data?.pages) {
            if ( query ) {
                if ( !typeMovieAvailable || typeMovieAvailable?.length === 0 ) {
                    const uniqueTypes = [...new Set(data.pages[0].data.map((item: IMovieList) => item.Type))];    
                    const mappedTypes = uniqueTypes.map((e) => {
                        return { label: `${e}`, value: `${e}` }
                    })
    
                    setTypeMovieAvailable(mappedTypes)
                }
                
                if ( !yearsMovieAvailable || yearsMovieAvailable?.length === 0 ) {
                    const uniqueYears = [...new Set(data.pages[0].data.map((item: IMovieList) => item.Year))];
                    const mappedYears = uniqueYears.map((e) => {
                        return { label: `${e}`, value: `${e}` }
                    })
                    
                    setYearsMovieAvailable(mappedYears)
                }   
            }

            const MappedData = data.pages.flatMap((page) => page.data)
            const Total = data.pages.flatMap((page) => page.total)

            setTotal(Number(Total) || 0);
            setDatas(MappedData);
        }
    }, [data]);

    useEffect(() => {
        
    }, [query, typeMovieAvailable, yearsMovieAvailable]);

    return (
        <>
            <div className="w-full flex justify-center items-center flex-wrap mb-6">
                {
                    total > 0 && (
                        <>
                            <span className="text-sm font-semibold mr-2">Result :</span>
                            <span className="text-sm">{total}</span>
                        </>
                    )
                }
            </div>
            {/* <section className="w-full min-h-screen max-w-5xl mx-auto bg-[#0c0a09] text-white px-4 py-4"> */}
            {isLoading && !error && (
                <div className="w-full h-[250px] flex justify-center items-center">
                    <LoadingComponent type="icon" propsIcon={{ size: 50 }} />
                </div>
            )}

            {/* Masonry Layout */}
            {!isLoading && !error && datas?.length > 0 && (
                <div className="w-full min-h-auto mx-auto px-4 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                    {datas.map((movie: IMovieList, index: number) => (
                        <div
                            key={index}
                            className="break-inside-avoid w-full mb-4"
                        >
                            <MoviesItems data={movie} />
                        </div>
                    ))}
                </div>
            )}

            {
                !isLoading && (error || datas?.length === 0) && (
                    <div className="w-full flex justify-center items-center">
                        <span>No Result Found.</span>
                    </div>
                )
            }

            {/* Load More Button */}
            {hasNextPage && !error && (
                <div className="w-full flex justify-center items-center mt-12">
                    <Button
                        onClick={() => fetchNextPage()}
                        // className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-500"
                        className="rounded text-xs hover:cursor-pointer"
                        variant="default"
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? (
                            <LoadingComponent type="full" />
                        ) : (
                            "Load More"
                        )}
                    </Button>
                </div>
            )}
            {/* </section> */}
        </>
    );
}
