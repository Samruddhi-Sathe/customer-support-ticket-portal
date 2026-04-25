import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="border-b px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="font-semibold text-lg">
          Support Portal
        </Link>
        <Link to="/tickets" className="underline">
          Tickets
        </Link>
        <Link to="/tickets/new" className="underline">
          Create Ticket
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <span>{user?.name}</span>
        <button onClick={logout} className="border px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar