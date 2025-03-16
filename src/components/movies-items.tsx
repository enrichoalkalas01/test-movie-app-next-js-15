"use client";

// Library
import Image from "next/image";

// Interfaces
import { IMovieList } from "@/lib/interfaces";

export default function MoviesItems({
    data,
}: {
    data: IMovieList;
    index?: number;
}) {
    return (
        <>
            <section className="w-full relative group rounded">
                {/* Image */}
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

                <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-transparent to-black/80 group-hover:cursor-pointer rounded">
                    <div className="w-full h-full relative rounded">
                        <div className="w-full flex p-2">
                            <div className="bg-black rounded text-xs text-white font-semibold w-auto p-2 group-hover:text-yellow-400 duration-250 ease-in-out">
                                {data.Year}
                            </div>
                        </div>
                        <div className="w-full rounded absolute bottom-0 text-center py-4 px-6 group-hover:text-yellow-400 bg-gradient-to-b from-transparent to-black duration-250 ease-in-out font-semibold">
                            <span className="shadow-md">{data.Title}</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
