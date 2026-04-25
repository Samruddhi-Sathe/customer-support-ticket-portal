import { Request, Response } from 'express'
import prisma from '../config/db'

export const addComment = async (req: Request, res: Response) => {
  try {
    const ticketId = String(req.params.id)
    const { content } = req.body

    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Comment content is required' })
    }

    const ticket = await prisma.ticket.findFirst({
      where: {
        id: ticketId,
        createdById: req.user.userId
      }
    })

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        ticketId,
        userId: req.user.userId
      }
    })

    return res.status(201).json({
      message: 'Comment added successfully',
      comment
    })
  } catch (error) {
    console.error('Add comment error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const getCommentsByTicketId = async (req: Request, res: Response) => {
  try {
    const ticketId = String(req.params.id)

    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const ticket = await prisma.ticket.findFirst({
      where: {
        id: ticketId,
        createdById: req.user.userId
      }
    })

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }

    const comments = await prisma.comment.findMany({
      where: {
        ticketId
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    return res.status(200).json({ comments })
  } catch (error) {
    console.error('Get comments error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}