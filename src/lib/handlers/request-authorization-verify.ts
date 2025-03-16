import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../jwt";
import { decryptData } from "../cryptr";
import { ResponseHandlerFailed } from "@/lib/handlers/response-handler";

interface IPropsHandler {
    req: NextApiRequest;
    res: NextApiResponse;
    [key: string]: unknown;
}

export const RequestAuthorizationVerify = async ({
    req,
    res,
}: IPropsHandler) => {
    try {
        if (!req || !res) {
            throw {
                message: "Request or Response is undefined",
            };
        }

        if (!req.headers.authorization) {
            throw {
                status: 401,
                message: "Unauthorized!",
            };
        }

        const AuthHeader: string[] = req.headers.authorization?.split(" ");
        if (!AuthHeader) {
            throw {
                status: 401,
                message: "Unauthorized!",
            };
        }

        if (AuthHeader[0].toLocaleLowerCase() !== "bearer") {
            throw {
                status: 401,
                message: "Unauthorized!",
            };
        }

        const verify: Record<string, unknown> | null = verifyToken(
            AuthHeader[1]
        );
        if (!verify) {
            throw {
                status: 401,
                message: "Unauthorized!",
            };
        }

        if (typeof verify.sub !== "string") {
            throw {
                status: 401,
                message: "Invalid token format!",
            };
        }

        const decrypt: string = decryptData(verify?.sub);
        if (!decrypt) {
            throw {
                status: 401,
                message: "Unauthorized!",
            };
        }

        const user: { username: string; email: string } = JSON.parse(decrypt);
        return user;
    } catch (error: unknown) {
        let errorMessage = "Something went wrong";
        let errorStatus = 405;

        if (
            error &&
            typeof error === "object" &&
            "message" in error &&
            typeof (error as { message: unknown }).message === "string"
        ) {
            errorMessage = (error as { message: string }).message;

            // Tambahkan pemeriksaan untuk properti status
            if (
                "status" in error &&
                typeof (error as { status: unknown }).status === "number"
            ) {
                errorStatus = (error as { status: number }).status;
            }
        }

        ResponseHandlerFailed({
            req,
            res,
            message: errorMessage,
            status: errorStatus,
        });
    }
};
