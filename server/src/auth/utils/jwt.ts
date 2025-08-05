//We want to treat JWT as a stateless session - Why??? ans: we want to avoid db reads for every request

import jwt from 'jsonwebtoken'
import { JWTPayload } from '../types'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

//Generate the token
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload
}
