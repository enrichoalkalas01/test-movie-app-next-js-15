"use client";

// Library
import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

// Components
import { LoadingComponent } from "@/components/generals/loading";
import { Button } from "./ui/button";

// Supports
import { fetcher } from "@/lib/fetcher";

// Interfaces
import { DataResponseFetcher, IMovieList } from "@/lib/interfaces";

import MoviesItems from "@/components/movies-items";

export default function Movies() {
    const [datas, setDatas] = useState<IMovieList[]>([]);
    const [searchQuery] = useState<string>("avengers");

    // Fetch Data
    const {
        data,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["movies", searchQuery],
        queryFn: ({ pageParam }) =>
            fetcher<DataResponseFetcher>(
                `/api/movies?search=${searchQuery}&page=${pageParam}`
            ),
        initialPageParam: 1, // ✅ WAJIB DI v5
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.data.length > 0 ? allPages.length + 1 : undefined;
        },
    });

    useEffect(() => {
        if (data?.pages) {
            setDatas(data.pages.flatMap((page) => page.data));
        }
    }, [data]);

    return (
        <>
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

            {/* Load More Button */}
            {hasNextPage && !error && (
                <div className="w-full flex justify-center items-center mt-4">
                    <Button
                        onClick={() => fetchNextPage()}
                        // className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-500"
                        className="rounded text-xs hover:cursor-pointer"
                        variant="secondary"
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
