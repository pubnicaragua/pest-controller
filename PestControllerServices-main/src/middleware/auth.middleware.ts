import { NextFunction, Request, Response } from 'express'
import { getToken, getUserFromToken } from '../lib/jwt'
import { User } from '../schemas/users/users.schema'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getToken(req)
    if (!token) {
      res.status(403).json({ error: 'Acceso denegado' })
      return
    }

    const user = getUserFromToken(token)
    if (!user) {
      res.status(403).json({ error: 'Acceso denegado' })
      return
    }

    res.locals.user = user as User
    next()
  } catch (err) {
    res.status(403).json({ error: 'Acceso denegado' })
  }
}

export const hasRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = res.locals.user.data

    if (!roles.includes(role)) {
      res.status(403).json({ succes: 'FAILED', message: 'Su role no tiene acceso a esta función' })
      return
    }

    next()
  }
}
