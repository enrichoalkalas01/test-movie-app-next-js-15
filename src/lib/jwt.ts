import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";

import { encryptData } from "./cryptr";
import { hashPassword } from "./bcrypt";

const SECRET: string = `${process.env.SECRET_KEY || ""}`;

// Buat JWT Token
export const generateToken = (
    payload: object | Record<string, unknown>,
    expiresIn: SignOptions["expiresIn"] = "1h" // Ubah tipe agar sesuai dengan yang diharapkan
): string => {
    const DataPassing = {
        sub: encryptData(JSON.stringify(payload)),
        usiv: hashPassword(
            `swarna-tactical-${(payload as { username: string }).username}`
        ),
    };

    return jwt.sign(DataPassing, SECRET, { expiresIn } as SignOptions);
    // return jwt.sign(DataPassing, SECRET);
};

// Verifikasi JWT Token
export const verifyToken = (token: string): JwtPayload | null => {
    try {
        const verify = jwt.verify(token, SECRET) as JwtPayload;
        return verify;
    } catch (error: unknown) {
        console.log(error);
        return null;
    }
};
