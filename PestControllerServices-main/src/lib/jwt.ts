import { Request } from 'express'
import jwt from 'jsonwebtoken'

export const generateToken = <T>(data: T): string => {
  const token = jwt.sign({ data }, process.env.JWT_PRIVATE_KEY ?? '', { expiresIn: '2d' })

  return token
}

// Bearer <token>
export const getToken = (req: Request): string | null => {
  const bearerHeader = req.headers.authorization
  const bearerToken = bearerHeader?.split(' ')
  if (bearerToken) return bearerToken[1]

  return null
}

export const getUserFromToken = (token: string): string | jwt.JwtPayload | null => {
  const decode = jwt.decode(token)

  return decode
}
