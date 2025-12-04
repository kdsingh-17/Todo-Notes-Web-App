import { useState } from 'react'
import { Check, X, Edit2, Trash2, Flag } from 'lucide-react'

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description)
  const [priority, setPriority] = useState(todo.priority)

  const handleSave = () => {
    onUpdate(todo.id, { title, description, priority })
    setIsEditing(false)
  }

  const handleToggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed })
  }

  const priorityColors = {
    high: 'bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-400 shadow-lg',
    medium: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-yellow-400 shadow-lg',
    low: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-400 shadow-lg',
  }

  return (
    <div className={`card ${todo.completed ? 'opacity-60' : ''} animate-slide-up relative overflow-hidden`}>
      {!todo.completed && priority === 'high' && (
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 to-rose-600"></div>
      )}
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            placeholder="Todo title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field min-h-[100px]"
            placeholder="Description (optional)"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="input-field"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <div className="flex gap-3">
            <button onClick={handleSave} className="btn-primary flex-1">
              Save Changes
            </button>
            <button
              onClick={() => {
                setIsEditing(false)
                setTitle(todo.title)
                setDescription(todo.description)
                setPriority(todo.priority)
              }}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-4">
          <button
            onClick={handleToggleComplete}
            className={`mt-1 flex-shrink-0 w-7 h-7 rounded-full border-3 flex items-center justify-center transition-all shadow-md ${
              todo.completed
                ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-500'
                : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
            }`}
          >
            {todo.completed && <Check size={18} className="text-white" />}
          </button>
          
          <div className="flex-1 min-w-0">
            <h3
              className={`text-xl font-bold mb-2 ${
                todo.completed ? 'line-through text-gray-600' : 'text-gray-900'
              }`}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p className="text-gray-800 mb-3 leading-relaxed font-medium">{todo.description}</p>
            )}
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-bold border ${priorityColors[priority]} flex items-center gap-1.5 shadow-md`}
              >
                <Flag size={14} />
                {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
              </span>
              <span className="text-xs text-gray-900 font-bold">
                📅 {new Date(todo.createdAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2.5 text-purple-600 hover:bg-purple-50 rounded-xl transition-all hover:scale-110 shadow-sm"
              title="Edit"
            >
              <Edit2 size={20} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all hover:scale-110 shadow-sm"
              title="Delete"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TodoItem

