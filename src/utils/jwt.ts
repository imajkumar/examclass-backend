import jwt, { SignOptions } from "jsonwebtoken";
import config from "config";

export const signJwt = (
  payload: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options: SignOptions
) => {
  return jwt.sign(payload, config.get<string>("accessTokenPublicKey"));
};

export const verifyJwt = <T>(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
): T | null => {
  try {
    
    const decoded = jwt.verify(
      token,
      config.get<string>("accessTokenPublicKey")
    ) as T;

    return decoded;
  } catch (error) {
    // console.log(error);
    return null;
  }
};