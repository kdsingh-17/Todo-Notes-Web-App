import { useState } from 'react'
import { X } from 'lucide-react'

function TodoForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onSubmit({ title, description, priority })
      setTitle('')
      setDescription('')
      setPriority('medium')
    }
  }

  return (
    <div className="card bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 border-2 border-purple-200/50 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create New Todo
          </h3>
          <p className="text-gray-800 text-sm mt-1 font-medium">Add a new task to your list</p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-gray-800 hover:text-gray-900 rounded-xl hover:bg-white/80 transition-all"
        >
          <X size={22} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            placeholder="What needs to be done?"
            required
            autoFocus
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field min-h-[120px]"
            placeholder="Add more details (optional)"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="input-field"
          >
            <option value="low">🟢 Low Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="high">🔴 High Priority</option>
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-primary flex-1 text-lg">
            ✨ Create Todo
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary flex-1 text-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default TodoForm

