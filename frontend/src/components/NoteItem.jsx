import { useState } from 'react'
import { Edit2, Trash2, X, Save } from 'lucide-react'

function NoteItem({ note, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [color, setColor] = useState(note.color)

  const handleSave = () => {
    onUpdate(note.id, { title, content, color })
    setIsEditing(false)
  }

  const colorClasses = {
    yellow: 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300 shadow-yellow-200/50',
    blue: 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300 shadow-blue-200/50',
    green: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-green-200/50',
    pink: 'bg-gradient-to-br from-pink-50 to-rose-50 border-pink-300 shadow-pink-200/50',
    purple: 'bg-gradient-to-br from-purple-50 to-violet-50 border-purple-300 shadow-purple-200/50',
    orange: 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-300 shadow-orange-200/50',
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
    <div
      className={`card border-2 ${colorClasses[color]} hover:shadow-2xl transition-all duration-300 animate-slide-up relative overflow-hidden group`}
    >
      {/* Decorative corner accent */}
      <div className={`absolute top-0 right-0 w-20 h-20 ${colorOptions.find(c => c.value === color)?.class || 'bg-yellow-400'} opacity-10 rounded-bl-full`}></div>
      
      {isEditing ? (
        <div className="space-y-4 relative z-10">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field bg-white/90"
            placeholder="Note title"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-field bg-white/90 min-h-[180px]"
            placeholder="Note content"
          />
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
                      ? 'ring-4 ring-offset-2 ring-gray-600 scale-110 shadow-lg'
                      : 'hover:scale-105'
                  } transition-all shadow-md`}
                  title={option.label}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Save Changes
            </button>
            <button
              onClick={() => {
                setIsEditing(false)
                setTitle(note.title)
                setContent(note.content)
                setColor(note.color)
              }}
              className="btn-secondary flex-1 flex items-center justify-center gap-2"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-gray-900 flex-1 pr-3 leading-tight">
              {note.title}
            </h3>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2.5 text-purple-600 hover:bg-white/80 rounded-xl transition-all hover:scale-110 shadow-sm"
                title="Edit"
              >
                <Edit2 size={20} />
              </button>
              <button
                onClick={() => onDelete(note.id)}
                className="p-2.5 text-red-600 hover:bg-white/80 rounded-xl transition-all hover:scale-110 shadow-sm"
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          <p className="text-gray-900 whitespace-pre-wrap mb-5 min-h-[120px] leading-relaxed text-base font-medium">
            {note.content || <span className="text-gray-700 italic font-medium">No content yet...</span>}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-gray-300/50">
            <span className="text-xs text-gray-900 font-bold flex items-center gap-1">
              📅 {new Date(note.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${colorOptions.find(c => c.value === color)?.class || 'bg-yellow-400'} text-white shadow-md`}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default NoteItem

