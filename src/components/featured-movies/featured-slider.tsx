"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { LoadingComponent } from "../generals/loading"
import MoviesItems from "../movies/movies-items"

import { DataResponseFetcher } from "@/lib/interfaces"
import { fetcher } from "@/lib/fetcher"

export default function FeaturedSlider() {
    // Fetch Data
    const { data, error, isLoading } = useQuery<DataResponseFetcher>({
        queryKey: ["featured-movies"],
        queryFn: () => fetcher<DataResponseFetcher>("/api/movies?search=james bond"),
    });

    return(
        <>
            <div className="w-full">
                {
                    !isLoading && data?.data && data?.data?.length > 0 && (
                        <Carousel className="w-full max-w-full relative">
                            <CarouselContent className="-ml-1">
                                {data?.data?.map((movie, index) => (
                                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                            <div className="">
                                                <Card className="p-0">
                                                    <CardContent className="flex h-[200px] items-center justify-center w-full p-0">
                                                        <MoviesItems
                                                            data={movie}
                                                            type="background"
                                                            propsTitle={{ className: "text-xs" }}
                                                        />
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    )
                                )}
                            </CarouselContent>
                            <CarouselPrevious className="absolute right-10 -bottom-15 text-sm w-7 h-7 cursor-pointer" style={{ left: "unset", top: 'unset' }} />
                            <CarouselNext className="absolute right-0 -bottom-15 text-sm w-7 h-7 cursor-pointer" style={{ left: "unset", top: 'unset' }} />
                        </Carousel>
                    )
                }

                {
                    isLoading && (
                        <>
                            <div className="w-full h-full flex justify-center items-center">
                                <LoadingComponent type="icon" propsIcon={{ size: 28 }} />
                            </div>
                        </>
                    )
                }

                {
                    error && (
                        <>
                            <div className="w-full h-full flex justify-center items-center">
                                Failed to fetch data.
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}
