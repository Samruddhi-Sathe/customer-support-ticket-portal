import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Customer Support Ticket Portal API',
    endpoints: {
      health: 'GET /health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me'
      }
    }
  })
})

app.get('/health', (_req, res) => {
  res.status(200).json({ message: 'Server is running' })
})

app.use('/api', routes)

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

export default app
