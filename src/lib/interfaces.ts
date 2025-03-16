import { NextApiRequest, NextApiResponse } from "next";

export interface IPropsHandlerApi {
    req: NextApiRequest;
    res: NextApiResponse;
    [key: string]: unknown;
}

export interface DataResponseFetcher {
    success: boolean;
    total: number;
    nextPage?: number | null;
    lastPage?: {
        page?: number | null;
    };
    data: Record<string, unknown>[];
}

export interface IMovieList {
    Title?: string;
    Year?: string;
    imdbId?: string;
    Type?: string;
    Poster?: string;
}
