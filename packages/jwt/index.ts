import JWT from 'expo-jwt';
import dayjs from "dayjs"

interface JWTSignPayload {
  [key: string]: unknown
}

export const sign = (payload: JWTSignPayload, secret: string) => {
  const iat = dayjs().unix()
  const customPayload = {
    ...payload,
    exp: iat + 3600 * 24,
    iat
  }
  return JWT.encode(customPayload, secret);
}

export const verify = (token: string, secret: string) => {
  return JWT.decode(token, secret);
}

