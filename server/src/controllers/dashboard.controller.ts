import { Request, Response } from 'express'
import prisma from '../config/db'

export const getDashboardSummary = async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const userId = req.user.userId

    const totalTickets = await prisma.ticket.count({
      where: {
        createdById: userId
      }
    })

    const openTickets = await prisma.ticket.count({
      where: {
        createdById: userId,
        status: 'open'
      }
    })

    const inProgressTickets = await prisma.ticket.count({
      where: {
        createdById: userId,
        status: 'in_progress'
      }
    })

    const resolvedTickets = await prisma.ticket.count({
      where: {
        createdById: userId,
        status: 'resolved'
      }
    })

    const highPriorityTickets = await prisma.ticket.count({
      where: {
        createdById: userId,
        priority: 'high'
      }
    })

    return res.status(200).json({
      summary: {
        totalTickets,
        openTickets,
        inProgressTickets,
        resolvedTickets,
        highPriorityTickets
      }
    })
  } catch (error) {
    console.error('Dashboard summary error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}