"use client";

// Library
import Image from "next/image";

// Interfaces
import { IMovieList } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

export default function MoviesItems({
    data,
    type = "image",
    propsTitle = {},
}: {
    data: IMovieList;
    index?: number;
    type?: "image" | "background",
    propsTitle?: Record<string, unknown>
}) {
    return (
        <>
            <section className="w-full h-full relative group rounded">
                {/* Image */}
                {
                    type === "image" && (
                        <>
                            <div className="w-full">
                                <Image
                                    src={`${
                                        data.Poster !== "N/A" ? data.Poster : "/image.png"
                                    }`}
                                    alt={`${data.Poster !== "N/A" ? data.Title : ""}`}
                                    width={1000}
                                    height={1000}
                                    className="rounded-sm"
                                />
                            </div>
                        </>
                    )
                }

                {
                    type === "background" && (
                        <>
                            <div className="w-full h-full rounded">
                                <div
                                    className="w-full h-full bg-image rounded"
                                    style={{
                                        backgroundImage: `url('${data.Poster !== "N/A" ? data.Poster : "/image.png"}')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                    }}
                                ></div>
                            </div>
                        </>
                    )
                }

                <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-transparent to-black/80 group-hover:cursor-pointer rounded">
                    <div className="w-full h-full relative rounded">
                        <div className="w-full flex p-2">
                            <div className="bg-black rounded text-xs text-white font-semibold w-auto p-2 group-hover:text-yellow-400 duration-250 ease-in-out">
                                {data.Year}
                            </div>
                        </div>
                        <div className={cn(
                            "w-full rounded absolute bottom-0 text-center py-4 px-6 text-white group-hover:text-yellow-400 bg-gradient-to-b from-transparent to-black duration-250 ease-in-out font-semibold",
                            propsTitle.className as string,
                        )}>
                            <span className="shadow-md">{data.Title}</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
