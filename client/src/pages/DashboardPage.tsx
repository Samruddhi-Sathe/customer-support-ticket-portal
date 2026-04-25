import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDashboardSummary } from '../services/dashboardService'
import { useAuth } from '../hooks/useAuth'

type Summary = {
  totalTickets: number
  openTickets: number
  inProgressTickets: number
  resolvedTickets: number
  highPriorityTickets: number
}

const DashboardPage = () => {
  const { user, logout } = useAuth()
  const [summary, setSummary] = useState<Summary | null>(null)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getDashboardSummary()
        setSummary(data.summary)
      } catch (error) {
        console.error(error)
      }
    }

    fetchSummary()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p>Welcome, {user?.name}</p>
        </div>
        <button onClick={logout} className="border px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <div className="flex gap-4">
        <Link to="/tickets" className="underline">View Tickets</Link>
        <Link to="/tickets/new" className="underline">Create Ticket</Link>
      </div>

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded">Total Tickets: {summary.totalTickets}</div>
          <div className="border p-4 rounded">Open Tickets: {summary.openTickets}</div>
          <div className="border p-4 rounded">In Progress: {summary.inProgressTickets}</div>
          <div className="border p-4 rounded">Resolved: {summary.resolvedTickets}</div>
          <div className="border p-4 rounded">High Priority: {summary.highPriorityTickets}</div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage