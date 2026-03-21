"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { AlertCircle } from "lucide-react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import MoviesItems from "../movies/movies-items"

import { DataResponseFetcher } from "@/lib/interfaces"
import { fetcher } from "@/lib/fetcher"

export default function FeaturedSlider() {
    const { data, error, isLoading } = useQuery<DataResponseFetcher>({
        queryKey: ["featured-movies"],
        queryFn: () => fetcher<DataResponseFetcher>("/api/movies?search=james bond"),
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading) {
        return (
            <div className="w-full flex gap-3">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="w-full h-[200px] rounded-xl flex-1" />
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full h-[200px] flex flex-col justify-center items-center gap-2 text-muted-foreground">
                <AlertCircle className="w-6 h-6" />
                <span className="text-sm">Failed to load featured movies.</span>
            </div>
        )
    }

    if (!data?.data || data.data.length === 0) return null;

    return (
        <Carousel className="w-full relative" opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-2">
                {data.data.map((movie, index) => (
                    <CarouselItem key={index} className="pl-2 basis-full sm:basis-1/2 lg:basis-1/3">
                        <div className="h-[200px] rounded-xl overflow-hidden">
                            <MoviesItems
                                data={movie}
                                type="background"
                                propsTitle={{ className: "text-xs" }}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="flex justify-end gap-2 mt-4">
                <CarouselPrevious className="static translate-y-0 w-8 h-8 cursor-pointer" />
                <CarouselNext className="static translate-y-0 w-8 h-8 cursor-pointer" />
            </div>
        </Carousel>
    )
}
