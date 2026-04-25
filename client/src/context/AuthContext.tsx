import { createContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { getCurrentUser, loginUser, registerUser } from '../services/authService'

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!token) {
          setLoading(false)
          return
        }

        const data = await getCurrentUser()
        setUser(data.user)
      } catch (error) {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [token])

  const login = async (email: string, password: string) => {
    const data = await loginUser({ email, password })
    localStorage.setItem('token', data.token)
    setToken(data.token)
    setUser(data.user)
  }

  const register = async (name: string, email: string, password: string) => {
    await registerUser({ name, email, password })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}