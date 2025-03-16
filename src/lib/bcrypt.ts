import { hash } from "bcrypt-ts";

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await hash(password, saltRounds);
};

import { compare } from "bcrypt-ts";

export const verifyPassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return await compare(password, hashedPassword);
};
