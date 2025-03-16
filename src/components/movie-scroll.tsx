"use client";

// Library
import React, { useState, useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

// Components
import { LoadingComponent } from "@/components/generals/loading";

// Supports
import { fetcher } from "@/lib/fetcher";

// Interfaces
import { DataResponseFetcher, IMovieList } from "@/lib/interfaces";

import MoviesItems from "@/components/movies-items";

export default function MoviesScroll() {
    const [datas, setDatas] = useState<IMovieList[]>([]);
    const [searchQuery] = useState<string>("avengers");
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

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

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        );

        if (loadMoreRef.current) observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [hasNextPage, fetchNextPage]);

    return (
        <section className="w-full min-h-screen max-w-5xl mx-auto bg-[#0c0a09] text-white px-4 py-4">
            {isLoading && !error && (
                <div className="w-full h-[250px] flex justify-center items-center">
                    <LoadingComponent type="icon" propsIcon={{ size: 50 }} />
                </div>
            )}

            {/* Masonry Layout */}
            {!isLoading && !error && datas?.length > 0 && (
                <>
                    <div className="w-full min-h-auto mx-auto px-4 columns-2 md:columns-3 lg:columns-4 gap-4">
                        {datas.map((movie: IMovieList, index: number) => {
                            console.log(movie);
                            return (
                                <div
                                    key={index}
                                    className="break-inside-avoid w-full mb-4"
                                >
                                    <MoviesItems data={movie} />
                                </div>
                            );
                        })}
                    </div>

                    {/* Loader untuk Infinite Scroll */}
                    <div
                        ref={loadMoreRef}
                        className="w-full h-16 flex justify-center items-center"
                    >
                        {isFetchingNextPage && (
                            <LoadingComponent
                                type="icon"
                                propsIcon={{ size: 30 }}
                            />
                        )}
                    </div>
                </>
            )}
        </section>
    );
}
