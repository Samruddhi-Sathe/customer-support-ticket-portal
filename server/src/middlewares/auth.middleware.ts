import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: token missing' })
  }

  const token = authHeader.split(' ')[1]
  const secret = process.env.JWT_SECRET

  if (!secret) {
    return res.status(500).json({ message: 'JWT_SECRET is not configured' })
  }

  try {
    const decoded = jwt.verify(token, secret) as { userId: string }

    req.user = {
      userId: decoded.userId
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: invalid token' })
  }
}

export default authMiddleware