import { useState } from 'react'
import { X } from 'lucide-react'

function NoteForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [color, setColor] = useState('yellow')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onSubmit({ title, content, color })
      setTitle('')
      setContent('')
      setColor('yellow')
    }
  }

  const colorOptions = [
    { value: 'yellow', label: 'Yellow', class: 'bg-yellow-400' },
    { value: 'blue', label: 'Blue', class: 'bg-blue-400' },
    { value: 'green', label: 'Green', class: 'bg-green-400' },
    { value: 'pink', label: 'Pink', class: 'bg-pink-400' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-400' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-400' },
  ]

  return (
    <div className="card bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 border-2 border-purple-200/50 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create New Note
          </h3>
          <p className="text-gray-800 text-sm mt-1 font-medium">Capture your thoughts and ideas</p>
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
            placeholder="What's on your mind?"
            required
            autoFocus
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-field min-h-[180px]"
            placeholder="Write your thoughts here... (optional)"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">
            Choose Color Theme
          </label>
          <div className="flex gap-3 flex-wrap">
            {colorOptions.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => setColor(option.value)}
                className={`w-12 h-12 rounded-full ${option.class} ${
                  color === option.value
                    ? 'ring-4 ring-offset-2 ring-gray-600 scale-110 shadow-xl'
                    : 'hover:scale-105'
                } transition-all shadow-md`}
                title={option.label}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-primary flex-1 text-lg">
            ✨ Create Note
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

export default NoteForm

