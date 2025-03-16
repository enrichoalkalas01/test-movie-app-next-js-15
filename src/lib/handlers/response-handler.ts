import { NextApiRequest, NextApiResponse } from "next";

interface IResponseHandlerSuccess {
    req: NextApiRequest;
    res: NextApiResponse;
    status?: number;
    message?: string;
    data?:
        | Record<string, unknown>
        | Record<string, unknown>[]
        | unknown
        | undefined;
    total?: number;
}

export const ResponseHandlerSuccess = ({
    res,
    status = 200,
    message = "Successfull to request the api!",
    data,
    total,
}: IResponseHandlerSuccess) => {
    const DataPassing: Record<string, unknown> = {
        status: status,
        message: message,
    };

    if (data) {
        DataPassing.data = data;
    }

    if (total) {
        DataPassing.total = total;
    }

    return res.status(status).json(DataPassing);
};

interface IResponseHandlerFailed {
    req: NextApiRequest;
    res: NextApiResponse;
    status?: number;
    message?: string;
    data?: Record<string, unknown>;
    errors?: { [key: string]: unknown }[];
}

export const ResponseHandlerFailed = ({
    res,
    status = 405,
    message = "Failed to request the api!",
    errors,
}: IResponseHandlerFailed) => {
    const DataPassing: Record<string, unknown> = {
        status: status,
        message: message,
    };

    if (errors && errors?.length > 0) {
        DataPassing.errors = errors;
    }

    return res.status(status).json(DataPassing);
};
