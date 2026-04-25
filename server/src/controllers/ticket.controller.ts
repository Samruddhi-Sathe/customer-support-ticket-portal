import { Request, Response } from 'express'
import prisma from '../config/db'

export const createTicket = async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, category } = req.body

    if (!title || !description || !priority || !category) {
      return res.status(400).json({
        message: 'Title, description, priority, and category are required'
      })
    }

    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        status: status || 'open',
        priority,
        category,
        createdById: req.user.userId
      }
    })

    return res.status(201).json({
      message: 'Ticket created successfully',
      ticket
    })
  } catch (error) {
    console.error('Create ticket error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const getAllTickets = async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const tickets = await prisma.ticket.findMany({
      where: {
        createdById: req.user.userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return res.status(200).json({ tickets })
  } catch (error) {
    console.error('Get all tickets error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const getTicketById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id)

    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const ticket = await prisma.ticket.findFirst({
      where: {
        id,
        createdById: req.user.userId
      }
    })

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }

    return res.status(200).json({ ticket })
  } catch (error) {
    console.error('Get ticket by id error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateTicket = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id)
    const { title, description, status, priority, category } = req.body

    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const existingTicket = await prisma.ticket.findFirst({
      where: {
        id,
        createdById: req.user.userId
      }
    })

    if (!existingTicket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id },
      data: {
        title: title ?? existingTicket.title,
        description: description ?? existingTicket.description,
        status: status ?? existingTicket.status,
        priority: priority ?? existingTicket.priority,
        category: category ?? existingTicket.category
      }
    })

    return res.status(200).json({
      message: 'Ticket updated successfully',
      ticket: updatedTicket
    })
  } catch (error) {
    console.error('Update ticket error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteTicket = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id)

    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const existingTicket = await prisma.ticket.findFirst({
      where: {
        id,
        createdById: req.user.userId
      }
    })

    if (!existingTicket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }

    await prisma.ticket.delete({
      where: { id }
    })

    return res.status(200).json({
      message: 'Ticket deleted successfully'
    })
  } catch (error) {
    console.error('Delete ticket error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}