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
    const { id } = req.query;
    try {
        let Url = `https://www.omdbapi.com/?apikey=be4d5abe&i=${id}&plot=full`;
        const datas = await fetch(Url)
            .then((response) => response.json())
            .catch(() => null);

        ResponseHandlerSuccess({
            req: req,
            res: res,
            data: datas || null,
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
            status: errorStatus,
        });
    }
};
