import api from '../api/axios'

export const getAllTickets = async () => {
  const response = await api.get('/tickets')
  return response.data
}

export const getTicketById = async (id: string) => {
  const response = await api.get(`/tickets/${id}`)
  return response.data
}

export const createTicket = async (data: {
  title: string
  description: string
  priority: string
  category: string
}) => {
  const response = await api.post('/tickets', data)
  return response.data
}

export const updateTicket = async (
  id: string,
  data: {
    title?: string
    description?: string
    status?: string
    priority?: string
    category?: string
  }
) => {
  const response = await api.put(`/tickets/${id}`, data)
  return response.data
}

export const getCommentsByTicketId = async (id: string) => {
  const response = await api.get(`/tickets/${id}/comments`)
  return response.data
}

export const addComment = async (id: string, content: string) => {
  const response = await api.post(`/tickets/${id}/comments`, { content })
  return response.data
}