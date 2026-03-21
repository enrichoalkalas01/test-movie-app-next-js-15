"use client"

import React from 'react';
import Image from 'next/image';
import { Star, Users, Clock, Globe, Award, Clapperboard, Film, Tv } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { IMovieDetail } from '@/lib/interfaces';

interface IMovieDetailPage {
    data: IMovieDetail;
}

export default function MovieDetail({ data }: IMovieDetailPage) {
    const posterSrc = data.Poster && data.Poster !== "N/A" ? data.Poster : "/image.png";
    const typeIcon = data.Type === "series" ? <Tv className="w-4 h-4" /> : <Film className="w-4 h-4" />;

    return (
        <div className="w-full">
            {/* Hero backdrop */}
            <div className="relative w-full overflow-hidden rounded-xl mb-6">
                {/* Blurred backdrop */}
                <div
                    className="absolute inset-0 scale-110"
                    style={{
                        backgroundImage: `url('${posterSrc}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(24px) brightness(0.35)",
                    }}
                />

                {/* Content */}
                <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row gap-8 text-white">
                    {/* Poster */}
                    <div className="flex-shrink-0 w-40 md:w-52 mx-auto md:mx-0">
                        <Image
                            width={400}
                            height={600}
                            src={posterSrc}
                            alt={`${data.Title} poster`}
                            className="w-full rounded-xl shadow-2xl ring-1 ring-white/10"
                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                const target = e.currentTarget;
                                target.onerror = null;
                                target.src = "/image.png";
                            }}
                        />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col gap-3 flex-1">
                        {/* Type badge */}
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="flex items-center gap-1 bg-white/15 text-white border-0 capitalize">
                                {typeIcon}
                                {data.Type || "Movie"}
                            </Badge>
                            {data.Rated && data.Rated !== "N/A" && (
                                <Badge variant="outline" className="border-white/30 text-white text-xs">
                                    {data.Rated}
                                </Badge>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight">{data.Title}</h1>

                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                            {data.Year && <span>{data.Year}</span>}
                            {data.Runtime && data.Runtime !== "N/A" && (
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {data.Runtime}
                                </span>
                            )}
                            {data.Genre && data.Genre !== "N/A" && (
                                <div className="flex flex-wrap gap-1">
                                    {data.Genre.split(",").map((g) => (
                                        <Badge key={g} variant="secondary" className="bg-white/10 text-white/80 border-0 text-xs">
                                            {g.trim()}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Ratings */}
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                            {data.imdbRating && data.imdbRating !== "N/A" && (
                                <div className="flex items-center gap-1.5 bg-yellow-500/20 px-3 py-1.5 rounded-lg">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-yellow-300 font-bold text-lg">{data.imdbRating}</span>
                                    <span className="text-white/50 text-sm">/10</span>
                                    {data.imdbVotes && data.imdbVotes !== "N/A" && (
                                        <span className="flex items-center gap-1 text-white/50 text-xs ml-1">
                                            <Users className="w-3 h-3" />
                                            {data.imdbVotes}
                                        </span>
                                    )}
                                </div>
                            )}
                            {data.Metascore && data.Metascore !== "N/A" && (
                                <div className="flex items-center gap-1.5 bg-green-600/20 px-3 py-1.5 rounded-lg">
                                    <span className="text-green-400 font-bold">{data.Metascore}</span>
                                    <span className="text-white/50 text-xs">Metascore</span>
                                </div>
                            )}
                        </div>

                        {/* Other Ratings */}
                        {data.Ratings && data.Ratings.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-1">
                                {data.Ratings.map((r) => (
                                    <div key={r.Source} className="text-xs bg-white/10 px-2.5 py-1 rounded-md text-white/70">
                                        <span className="text-white/40">{r.Source}: </span>
                                        <span className="font-semibold text-white">{r.Value}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Plot */}
                        {data.Plot && data.Plot !== "N/A" && (
                            <p className="text-white/80 leading-relaxed text-sm md:text-base mt-2 max-w-2xl">
                                {data.Plot}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-1 pb-8">
                {[
                    { icon: <Clapperboard className="w-4 h-4" />, label: "Director", value: data.Director },
                    { icon: <Users className="w-4 h-4" />, label: "Cast", value: data.Actors },
                    { icon: <Film className="w-4 h-4" />, label: "Writer", value: data.Writer },
                    { icon: <Globe className="w-4 h-4" />, label: "Language", value: data.Language },
                    { icon: <Globe className="w-4 h-4" />, label: "Country", value: data.Country },
                    { icon: <Award className="w-4 h-4" />, label: "Awards", value: data.Awards },
                    { icon: <span className="text-xs font-bold">$</span>, label: "Box Office", value: data.BoxOffice },
                    { icon: null, label: "Released", value: data.Released },
                ].filter((item) => item.value && item.value !== "N/A").map((item) => (
                    <div key={item.label} className="flex gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                        <div className="flex-shrink-0 mt-0.5 text-muted-foreground">
                            {item.icon}
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</div>
                            <div className="text-sm font-medium">{item.value}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
