"use client"

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

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

    return(
        <>
            <section className="w-full h-auto">
                {
                    !isLoading && !error && data?.data && (
                        <>  
                            <Button
                                onClick={handlerBack}
                                variant="outline"
                                size={"sm"}
                                className="cursor-pointer text-xs ml-4"
                            >
                                <span>Back</span>
                            </Button>
                            <MovieDetail data={data?.data} />
                        </>
                    )
                }
                {
                    isLoading && (
                        <>
                            <div className="w-full h-[500px] flex justify-center items-center">
                                <LoadingComponent type="full" />
                            </div>
                        </>
                    )
                }
                {
                    error && (
                        <>
                            <div className="w-full h-[500px] flex flex-col gap-y-4 justify-center items-center">
                                <div>Failed to retrieve data.</div>
                                <div className="w-auto flex gap-4">
                                    <Button
                                        onClick={handlerBack}
                                        variant="outline"
                                        className="cursor-pointer text-xs px-6"
                                    >
                                        <span>Back</span>
                                    </Button>
                                    <Button
                                        onClick={handlerRetry}
                                        variant="default"
                                        className="cursor-pointer text-xs px-6"
                                    >
                                        <span>Retry</span>
                                    </Button>
                                </div>
                            </div>
                        </>
                    )
                }
            </section>
        </>
    )
}