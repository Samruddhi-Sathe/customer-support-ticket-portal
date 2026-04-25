import { Router } from 'express'
import authMiddleware from '../middlewares/auth.middleware'
import { addComment, getCommentsByTicketId } from '../controllers/comment.controller'

const router = Router()

router.post('/:id/comments', authMiddleware, addComment)
router.get('/:id/comments', authMiddleware, getCommentsByTicketId)

export default router