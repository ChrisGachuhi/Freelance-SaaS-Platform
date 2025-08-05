import { Request, Response } from 'express'
import { UserRole } from '../types'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwt'

interface SignupRequestBody {
  name: string
  email: string
  password: string
  role: UserRole
}

interface LoginRequestBody {
  email: string
  password: string
}

export async function signup(req: Request<SignupRequestBody>, res: Response) {
  const { name, email, password, role } = req.body
  if (!name || !email || !password)
    return res.status(400).json({ message: 'Missing Fields' })

  const hashedPassword = await bcrypt.hash(password, 10)

  const mockUserId = 1 //this will come from database later on

  res.status(201).json({
    message: 'Mock User Created Successfully',
    user: { id: mockUserId, email, role: role || 'client' },
  })
}

export function login(req: Request<LoginRequestBody>, res: Response) {
  const { email, password } = req.body

  //hardcoded test data and credentials checks
  const isValid = email === 'admin@email.com' && password === 'password123'

  if (!isValid) res.status(401).json({ message: 'Invalid Credentials' })

  const payload = {
    id: 1,
    email,
    role: 'admin' as UserRole,
  }

  const token = generateToken(payload)

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })

  res.json({ message: 'Login Successful' })
}

export function logout(req: Request, res: Response) {
  res.clearCookie('token').json({ message: 'Logged Out' })
}
