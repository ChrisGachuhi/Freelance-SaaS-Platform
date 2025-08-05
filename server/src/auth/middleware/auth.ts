import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'
import { UserRole } from '../types'

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token
  if (!token)
    return res.status(401).json({ message: 'Authentication Required' })

  try {
    const payload = verifyToken(token)
    req.user = payload
    next()
  } catch (err: any) {
    return res.status(401).json({ message: 'Invalid Token', err })
  }
}

export function authorizeRole(allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if (!user || !allowedRoles.includes(user.role))
      return res.status(403).json({ message: 'Forbidden Access' })

    next()
  }
}

//RBAC - efficient and scalable for permission systems
