import JWT from 'expo-jwt';

interface JWTPayload {
  [key: string]: unknown
}

export const sign = (payload: JWTPayload, secret: string) => {
  return JWT.encode(payload, secret);
}

export const verify = (token: string, secret: string) => {
  return JWT.decode(token, secret);
}

