import jwt from "jsonwebtoken";
import { JwtPayloadWithId } from "../interface/auth.Interface";


const accessToken = process.env.ACCESS_TOKEN ;
const refreshToken = process.env.REFRESH_TOKEN ;

if (!accessToken || !refreshToken) {
  throw new Error("ACCESS_TOKEN environment variable is not set");
}

export const genAccessToken = (payload: Object) => {
  const token = jwt.sign(payload, accessToken, {
    expiresIn: "1h",
  });

  return token;
};

export const genRefreshToken = (payload: Object) => {
  const token = jwt.sign(payload, refreshToken, {
    expiresIn: "7d",
  });

  return token;
};

export const verifyToken = (
  token: string,
  secret: string | undefined
): JwtPayloadWithId => {
  if (!secret) {
    throw new Error("SECRET_KEY is not defined in the environment");
  }

  return jwt.verify(token, secret) as JwtPayloadWithId; // Type assertion here
};
