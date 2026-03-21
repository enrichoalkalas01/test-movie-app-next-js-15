"use client"

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, RefreshCw, Film } from "lucide-react";

import { IMovieDetail } from "@/lib/interfaces";
import { fetcher } from "@/lib/fetcher";

import MovieDetail from "@/components/movies/movie-detail";
import { LoadingComponent } from "@/components/generals/loading";
import { Button } from "@/components/ui/button";

interface IFetchMovieDetail {
    data: IMovieDetail;
    message?: string;
    status?: number;
}

export default function Page() {
    const router = useRouter()
    const params = useParams()
    const queryClient = useQueryClient()

    const { data, error, isLoading } = useQuery<IFetchMovieDetail>({
        queryKey: ["movie-detail", params?.movie_id],
        queryFn: () => fetcher<IFetchMovieDetail>(`/api/movies/${params?.movie_id}`),
    });

    const handlerRetry = () => {
        queryClient.invalidateQueries({ queryKey: ["movie-detail", params?.movie_id] });
    }

    const handlerBack = () => {
        router.back()
    }

    return (
        <section className="w-full min-h-screen py-6">
            {/* Back button */}
            <div className="mb-4">
                <Button
                    onClick={handlerBack}
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer gap-1.5 text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>
            </div>

            {/* Loading */}
            {isLoading && !error && (
                <div className="w-full h-[500px] flex flex-col justify-center items-center gap-4 text-muted-foreground">
                    <LoadingComponent type="icon" propsIcon={{ size: 40 }} />
                    <span className="text-sm">Loading movie details...</span>
                </div>
            )}

            {/* Error */}
            {error && !isLoading && (
                <div className="w-full h-[500px] flex flex-col gap-4 justify-center items-center">
                    <Film className="w-12 h-12 text-muted-foreground/40" />
                    <div className="text-center">
                        <p className="font-semibold text-lg mb-1">Failed to load movie</p>
                        <p className="text-sm text-muted-foreground">Something went wrong while fetching the data.</p>
                    </div>
                    <div className="flex gap-3 mt-2">
                        <Button onClick={handlerBack} variant="outline" className="cursor-pointer gap-1.5">
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </Button>
                        <Button onClick={handlerRetry} variant="default" className="cursor-pointer gap-1.5">
                            <RefreshCw className="w-4 h-4" />
                            Retry
                        </Button>
                    </div>
                </div>
            )}

            {/* Content */}
            {!isLoading && !error && data?.data && (
                <MovieDetail data={data.data} />
            )}
        </section>
    )
}
