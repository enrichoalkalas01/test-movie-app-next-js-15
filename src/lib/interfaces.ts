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
    imdbID?: string;
    Type?: string;
    Poster?: string;
}

export interface IPropsSelect {
    value?: string;
    label?: string;
}

export interface IMovieDetail {
    Actors?: string;
    Awards?: string;
    BoxOffice?: string;
    Country?: string;
    Director?: string;
    DVD?: string;
    Genre?: string;
    imdbID?: string;
    imdbRating?: string;
    imdbVotes?: string;
    Language?: string;
    Metascore?: string;
    Plot?: string;
    Poster?: string;
    Production?: string;
    Rated?: string;
    Ratings?: IMovieDetailRating[],
    Released?: string,
    Response?: string,
    Runtime?: string,
    Title?: string,
    Type?: string,
    Website?: string,
    Writer?: string,
    Year?: string
}

export interface IMovieDetailRating {
    Source?: string,
    Value?: string
}