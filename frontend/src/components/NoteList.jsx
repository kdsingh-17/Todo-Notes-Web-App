import { useState, useEffect } from 'react'
import { noteAPI } from '../api/api'
import NoteItem from './NoteItem'
import NoteForm from './NoteForm'
import ConfirmModal from './ConfirmModal'
import Toast from './Toast'
import { Plus, BookOpen, FileText, Sparkles } from 'lucide-react'

function NoteList() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, noteId: null, noteTitle: '' })
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      const response = await noteAPI.getAll()
      setNotes(response.data)
    } catch (error) {
      console.error('Error fetching notes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (noteData) => {
    try {
      const response = await noteAPI.create(noteData)
      setNotes([response.data, ...notes])
      setShowForm(false)
      setToast({ show: true, message: 'Note created successfully!', type: 'success' })
    } catch (error) {
      console.error('Error creating note:', error)
      setToast({ show: true, message: 'Failed to create note', type: 'error' })
    }
  }

  const handleUpdate = async (id, noteData) => {
    try {
      const response = await noteAPI.update(id, noteData)
      setNotes(notes.map(note => note.id === id ? response.data : note))
      setToast({ show: true, message: 'Note updated successfully!', type: 'success' })
    } catch (error) {
      console.error('Error updating note:', error)
      setToast({ show: true, message: 'Failed to update note', type: 'error' })
    }
  }

  const handleDeleteClick = (id) => {
    const note = notes.find(n => n.id === id)
    setDeleteModal({ isOpen: true, noteId: id, noteTitle: note?.title || 'this note' })
  }

  const handleDeleteConfirm = async () => {
    try {
      await noteAPI.delete(deleteModal.noteId)
      setNotes(notes.filter(note => note.id !== deleteModal.noteId))
      setDeleteModal({ isOpen: false, noteId: null, noteTitle: '' })
      setToast({ show: true, message: 'Note deleted successfully!', type: 'success' })
    } catch (error) {
      console.error('Error deleting note:', error)
      setDeleteModal({ isOpen: false, noteId: null, noteTitle: '' })
      setToast({ show: true, message: 'Failed to delete note', type: 'error' })
    }
  }

  // Calculate statistics
  const totalNotes = notes.length
  const colorCounts = notes.reduce((acc, note) => {
    acc[note.color] = (acc[note.color] || 0) + 1
    return acc
  }, {})

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <BookOpen className="text-white" size={24} />
            </div>
            <span className="text-3xl font-bold text-gray-900">{totalNotes}</span>
          </div>
          <p className="text-gray-900 text-sm font-bold">Total Notes</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
              <FileText className="text-white" size={24} />
            </div>
            <span className="text-3xl font-bold text-gray-900">
              {Object.keys(colorCounts).length}
            </span>
          </div>
          <p className="text-gray-900 text-sm font-bold">Color Themes</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl">
              <Sparkles className="text-white" size={24} />
            </div>
            <span className="text-3xl font-bold text-gray-900">
              {notes.filter(n => n.content && n.content.length > 50).length}
            </span>
          </div>
          <p className="text-gray-900 text-sm font-bold">Detailed Notes</p>
        </div>
      </div>

      {/* Header with Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-1">My Notes</h2>
          <p className="text-gray-800 font-semibold">
            {totalNotes > 0 ? `${totalNotes} note${totalNotes !== 1 ? 's' : ''} saved` : 'Start capturing your thoughts'}
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2 text-lg"
        >
          <Plus size={22} />
          Add Note
        </button>
      </div>

      {/* Note Form */}
      {showForm && (
        <div className="mb-6 animate-slide-up">
          <NoteForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length === 0 ? (
          <div className="col-span-full card text-center py-16">
            <BookOpen className="mx-auto mb-4 text-gray-800" size={64} />
            <p className="text-gray-900 text-xl font-bold mb-2">No notes found</p>
            <p className="text-gray-800 font-semibold">Create your first note to get started!</p>
          </div>
        ) : (
          notes.map(note => (
            <NoteItem
              key={note.id}
              note={note}
              onUpdate={handleUpdate}
              onDelete={handleDeleteClick}
            />
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, noteId: null, noteTitle: '' })}
        onConfirm={handleDeleteConfirm}
        title="Delete Note"
        message={`Are you sure you want to delete "${deleteModal.noteTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Toast Notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}
    </div>
  )
}

export default NoteList

