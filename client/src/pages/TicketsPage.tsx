import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../components/common/AppLayout'
import { getAllTickets } from '../services/ticketService'

type Ticket = {
  id: string
  title: string
  description: string
  status: string
  priority: string
  category: string
}

const TicketsPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getAllTickets()
        setTickets(data.tickets)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Tickets</h1>
          <Link to="/tickets/new" className="border px-4 py-2 rounded">
            Create New Ticket
          </Link>
        </div>

        {loading ? (
          <p>Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <div className="border rounded p-6 text-center">
            <p>No tickets found.</p>
            <Link to="/tickets/new" className="underline">
              Create your first ticket
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Link
                key={ticket.id}
                to={`/tickets/${ticket.id}`}
                className="block border p-4 rounded"
              >
                <h2 className="text-xl font-semibold">{ticket.title}</h2>
                <p>{ticket.description}</p>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Status: {ticket.status}</p>
                  <p>Priority: {ticket.priority}</p>
                  <p>Category: {ticket.category}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}

export default TicketsPage