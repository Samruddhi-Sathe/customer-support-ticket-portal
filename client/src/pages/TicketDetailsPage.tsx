import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppLayout from '../components/common/AppLayout'
import { addComment, getCommentsByTicketId, getTicketById, updateTicket } from '../services/ticketService'

type Ticket = {
  id: string
  title: string
  description: string
  status: string
  priority: string
  category: string
}

type Comment = {
  id: string
  content: string
  createdAt: string
}

const TicketDetailsPage = () => {
  const { id } = useParams()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [commentText, setCommentText] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchTicketData = async () => {
    if (!id) return

    try {
      setLoading(true)
      setError('')

      const ticketData = await getTicketById(id)
      const commentsData = await getCommentsByTicketId(id)

      setTicket(ticketData.ticket)
      setComments(commentsData.comments)
    } catch (err: any) {
      console.error(err)
      setError(err?.response?.data?.message || 'Failed to load ticket')
      setTicket(null)
      setComments([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTicketData()
  }, [id])

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id || !commentText.trim()) return

    try {
      await addComment(id, commentText)
      setCommentText('')
      fetchTicketData()
    } catch (err: any) {
      console.error(err)
      setError(err?.response?.data?.message || 'Failed to add comment')
    }
  }

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!id) return

    try {
      await updateTicket(id, { status: e.target.value })
      fetchTicketData()
    } catch (err: any) {
      console.error(err)
      setError(err?.response?.data?.message || 'Failed to update ticket')
    }
  }

  return (
    <AppLayout>
      {loading ? (
        <div>Loading ticket...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : !ticket ? (
        <div>Ticket not found</div>
      ) : (
        <div className="space-y-6">
          <div className="border p-4 rounded space-y-2">
            <h1 className="text-2xl font-bold">{ticket.title}</h1>
            <p>{ticket.description}</p>
            <p>Priority: {ticket.priority}</p>
            <p>Category: {ticket.category}</p>

            <div className="flex items-center gap-3">
              <label>Status:</label>
              <select
                value={ticket.status}
                onChange={handleStatusChange}
                className="border p-2 rounded"
              >
                <option value="open">open</option>
                <option value="in_progress">in_progress</option>
                <option value="resolved">resolved</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Comments</h2>

            <form onSubmit={handleAddComment} className="space-y-2">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment"
                className="w-full border p-2 rounded"
              />
              <button type="submit" className="bg-black text-white px-4 py-2 rounded">
                Add Comment
              </button>
            </form>

            <div className="space-y-2">
              {comments.length === 0 ? (
                <p>No comments yet.</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="border p-3 rounded">
                    <p>{comment.content}</p>
                    <small>{new Date(comment.createdAt).toLocaleString()}</small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}

export default TicketDetailsPage