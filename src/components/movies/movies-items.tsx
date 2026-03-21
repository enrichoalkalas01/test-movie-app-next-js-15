"use client";

import Image from "next/image";
import Link from "next/link";
import { Film, Tv, BookOpen } from "lucide-react";

import { IMovieList } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

const typeIcon: Record<string, React.ReactNode> = {
    movie: <Film className="w-3 h-3" />,
    series: <Tv className="w-3 h-3" />,
    episode: <BookOpen className="w-3 h-3" />,
};

export default function MoviesItems({
    data,
    type = "image",
    propsTitle = {},
}: {
    data: IMovieList;
    index?: number;
    type?: "image" | "background";
    propsTitle?: Record<string, unknown>;
}) {
    const posterSrc = data.Poster && data.Poster !== "N/A" ? data.Poster : "/image.png";
    const icon = data.Type ? typeIcon[data.Type.toLowerCase()] : typeIcon.movie;

    return (
        <Link href={`/movie/${data?.imdbID}`} className="block w-full h-full">
            <section className="w-full h-full relative group rounded-xl overflow-hidden cursor-pointer">
                {/* Image type */}
                {type === "image" && (
                    <Image
                        src={posterSrc}
                        alt={data.Title || "Movie poster"}
                        width={400}
                        height={600}
                        className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                )}

                {/* Background type */}
                {type === "background" && (
                    <div
                        className="w-full h-full absolute inset-0"
                        style={{
                            backgroundImage: `url('${posterSrc}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                    {/* Top badges */}
                    <div className="absolute top-2 left-2 flex gap-1.5">
                        {data.Year && (
                            <span className="bg-black/70 backdrop-blur-sm rounded px-2 py-0.5 text-xs text-white font-semibold group-hover:text-yellow-400 transition-colors">
                                {data.Year}
                            </span>
                        )}
                        {data.Type && (
                            <span className="bg-black/70 backdrop-blur-sm rounded px-2 py-0.5 text-xs text-white/80 flex items-center gap-1 capitalize">
                                {icon}
                                {data.Type}
                            </span>
                        )}
                    </div>

                    {/* Title at bottom */}
                    <div className={cn(
                        "absolute bottom-0 left-0 right-0 px-3 py-3 text-white font-semibold text-sm group-hover:text-yellow-400 transition-colors duration-200 leading-snug",
                        propsTitle.className as string,
                    )}>
                        {data.Title}
                    </div>
                </div>
            </section>
        </Link>
    );
}
