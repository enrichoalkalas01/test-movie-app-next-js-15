"use client"

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function FeaturedSlider() {
    return(
        <>
            <Carousel className="w-full max-w-full relative">
                <CarouselContent className="-ml-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-2xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute right-10 -bottom-15 text-sm w-7 h-7 cursor-pointer" style={{ left: "unset", top: 'unset' }} />
                <CarouselNext className="absolute right-0 -bottom-15 text-sm w-7 h-7 cursor-pointer" style={{ left: "unset", top: 'unset' }} />
            </Carousel>
        </>
    )
}
