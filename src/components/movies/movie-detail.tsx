"use client"

import React from 'react';
import Image from 'next/image';

import { User } from 'lucide-react';
import { IMovieDetail } from '@/lib/interfaces';

interface IMovieDetailPage {
    data: IMovieDetail;
}

export default function MovieDetail({ data }: IMovieDetailPage) {
    return (
        <>
            <div className="relative w-full">
                <div className='w-full h-full'>
                    <div className='w-fuil flex p-4 gap-8'>
                        {/* Movie poster */}
                        <div className="flex-shrink-0 w-64">
                            {data.Poster ? (
                                <Image
                                    width={750}
                                    height={750} 
                                    src={data.Poster !== "N/A" ? data.Poster : "/image.png"} 
                                    alt={`${data.Title} poster`}
                                    className="w-full rounded-lg shadow-lg"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        const target = e.currentTarget;
                                        target.onerror = null;
                                        target.src = "/image.png";
                                    }}
                                />
                            ) : (
                                <Image
                                    width={750}
                                    height={750} 
                                    src="/image.png" 
                                    alt={`${data.Title || ""}`}
                                    className="w-full rounded-lg shadow-lg"
                                />
                            )}
                        </div>

                        {/* Movie details */}
                        <div className="w-full flex-grow">
                            {/* Title */}
                            <h1 className="text-4xl font-bold mb-1">{data.Title}</h1>
                            
                            {/* Year */}
                            <p className=" mb-3">{data.Year}</p>
                            
                            {/* Runtime and genres */}
                            <div className="mb-4 flex items-center gap-2">
                                <span className="">{data.Runtime}</span>
                                <span className="">|</span>
                                <span className="">{data.Genre}</span>
                            </div>
                            
                            {/* Rating */}
                            <div className="flex items-center mb-6 gap-2">
                                <div className="flex items-center">
                                    <span className="text-yellow-400 text-3xl">★</span>
                                    <span className="text-yellow-400 text-2xl ml-1 mr-1">{data.imdbRating}</span>
                                    <span className=" text-sm">/10</span>
                                </div>
                                <div className="bg-yellow-600 text-black text-sm font-bold px-2 py-1 rounded ml-2">
                                    IMDb
                                </div>
                                <div className='text-sm flex gap-1'>
                                    <User className='w-5 h-5' />
                                    <span className='font-semibold'>{data.imdbVotes}</span>
                                </div>
                            </div>
                            
                            {/* Description */}
                            <p className="mb-8 leading-relaxed max-w-2xl">
                                {data.Plot}
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Content container */}
                <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-start gap-8">
                    
                </div>
            </div>
        </>
    );
};