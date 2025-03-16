import Cryptr from "cryptr";

const cryptr = new Cryptr(process.env.SECRET_KEY || "S3cr3TN0Rump1!!!!!");

export const encryptData = (data: string): string => {
    return cryptr.encrypt(data);
};

export const decryptData = (encryptedData: string): string => {
    return cryptr.decrypt(encryptedData);
};
