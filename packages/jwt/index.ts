import JWT from 'expo-jwt';
import dayjs from "dayjs"

interface JWTSignPayload {
  [key: string]: unknown
}

const JWT_SECRET = process.env.JWT_SECRET
const JWT_DURATION = parseInt(process.env.JWT_DURATION || "86400")


export const sign = (payload: JWTSignPayload) => {
  const secret = JWT_SECRET
  if (secret == undefined) {
    console.error("JWT_SECRET no puede ser indefinido")
    throw new Error("JWT_SECRET no puede ser indefinido")
  }
  if (secret.length < 5) {
    console.error("JWT_SECRET tiene que ser mayor a 5 caracteres")
    throw new Error("JWT_SECRET tiene que ser mayor a 5 caracteres")
  }

  const iat = dayjs().unix()
  const customPayload = {
    ...payload,
    exp: iat + JWT_DURATION,
    iat
  }
  return JWT.encode(customPayload, secret);
}

export const verify = (token: string) => {
  const secret = JWT_SECRET
  if (secret == undefined) {
    console.error("JWT_SECRET no puede ser indefinido")
    throw new Error("JWT_SECRET no puede ser indefinido")
  }
  if (secret.length < 5) {
    console.error("JWT_SECRET tiene que ser mayor a 5 caracteres")
    throw new Error("JWT_SECRET tiene que ser mayor a 5 caracteres")
  }

  return JWT.decode(token, secret);
}

