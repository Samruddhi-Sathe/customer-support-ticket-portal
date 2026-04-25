import { Router } from 'express'
import authMiddleware from '../middlewares/auth.middleware'
import { getDashboardSummary } from '../controllers/dashboard.controller'

const router = Router()

router.get('/summary', authMiddleware, getDashboardSummary)

export default router