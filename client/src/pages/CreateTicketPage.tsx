import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createTicket } from '../services/ticketService'

const CreateTicketPage = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'support',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createTicket(formData)
      navigate('/tickets')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <h1 className="text-2xl font-bold">Create Ticket</h1>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="bug">bug</option>
          <option value="feature">feature</option>
          <option value="support">support</option>
        </select>

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Create Ticket
        </button>
      </form>
    </div>
  )
}

export default CreateTicketPage