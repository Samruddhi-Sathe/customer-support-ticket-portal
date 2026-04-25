import { Router } from 'express'
import { registerUser, loginUser, getCurrentUser } from '../controllers/auth.controller'
import authMiddleware from '../middlewares/auth.middleware'

const router = Router()

router
  .route('/register')
  .get((_req, res) => {
    res.status(405).json({ message: 'Use POST /api/auth/register to create an account' })
  })
  .post(registerUser)

router
  .route('/login')
  .get((_req, res) => {
    res.status(405).json({ message: 'Use POST /api/auth/login to sign in' })
  })
  .post(loginUser)

router.get('/me', authMiddleware, getCurrentUser)

export default router
