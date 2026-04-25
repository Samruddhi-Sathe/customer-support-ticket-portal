import type { ReactNode } from 'react'
import Navbar from './Navbar'

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">{children}</main>
    </div>
  )
}

export default AppLayout