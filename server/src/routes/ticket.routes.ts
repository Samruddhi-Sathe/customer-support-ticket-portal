import { Router } from 'express'
import authMiddleware from '../middlewares/auth.middleware'
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket
} from '../controllers/ticket.controller'

const router = Router()

router.post('/', authMiddleware, createTicket)
router.get('/', authMiddleware, getAllTickets)
router.get('/:id', authMiddleware, getTicketById)
router.put('/:id', authMiddleware, updateTicket)
router.delete('/:id', authMiddleware, deleteTicket)

export default router