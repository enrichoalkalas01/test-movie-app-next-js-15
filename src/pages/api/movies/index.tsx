import { NextApiRequest, NextApiResponse } from "next";

import {
    ResponseHandlerSuccess,
    ResponseHandlerFailed,
} from "@/lib/handlers/response-handler";
import { IPropsHandlerApi } from "@/lib/interfaces";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "GET") GetListMovies({ req: req, res: res });
        else throw {};
    } catch (error: unknown) {
        console.log(error);
        ResponseHandlerFailed({ req: req, res: res });
    }
}

const GetListMovies = async ({ req, res }: IPropsHandlerApi) => {
    const { search, page = 1, year, type } = req.query;
    try {
        const Query = search || "avengers";
        let Url = `https://www.omdbapi.com/?apikey=be4d5abe&s=${Query}&page=${page}`;

        if (year) {
            Url += `&y=${year}`;
        }

        if (type) {
            Url += `&type=${type}`
        }

        const datas: Record<string, unknown> = await fetch(Url)
            .then((response) => response.json())
            .catch(() => null);

        ResponseHandlerSuccess({
            req: req,
            res: res,
            data: datas?.Search || [],
            total: Number(datas?.totalResults) || 0,
        });
    } catch (error: unknown) {
        let errorMessage = "Something went wrong";
        let errorStatus = 400;

        if (error && typeof error === "object") {
            if (
                "message" in error &&
                typeof (error as { message: string }).message === "string"
            ) {
                errorMessage = (error as { message: string }).message;
            }

            if (
                "status" in error &&
                typeof (error as { status: number }).status === "number"
            ) {
                errorStatus = (error as { status: number }).status;
            }
        }

        ResponseHandlerFailed({
            req: req,
            res: res,
            message: errorMessage,
            status: errorStatus || 400,
        });
    }
};
