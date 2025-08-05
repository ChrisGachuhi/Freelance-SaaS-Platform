import express from 'express'
import { login, signup, logout } from '../controllers/authController'
import { authenticate, authorizeRole } from '../middleware/auth'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

//Example protected Route
router.get('/protected', authenticate, authorizeRole(['admin']), (req, res) => {
  res.json({ message: `Welcome ${req.user?.email}`, role: req.user?.role })
})

export default router
