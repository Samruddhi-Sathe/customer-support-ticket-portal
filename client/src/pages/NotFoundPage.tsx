import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p>Page not found</p>
      <Link to="/dashboard" className="underline">
        Go to Dashboard
      </Link>
    </div>
  )
}

export default NotFoundPage