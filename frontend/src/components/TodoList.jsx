import { useState, useEffect } from 'react'
import { todoAPI } from '../api/api'
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'
import ConfirmModal from './ConfirmModal'
import Toast from './Toast'
import { Plus, CheckCircle2, Circle, TrendingUp, Target, Award } from 'lucide-react'

function TodoList() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('all') // all, active, completed
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, todoId: null, todoTitle: '' })
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await todoAPI.getAll()
      setTodos(response.data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (todoData) => {
    try {
      const response = await todoAPI.create(todoData)
      setTodos([...todos, response.data])
      setShowForm(false)
      setToast({ show: true, message: 'Todo created successfully!', type: 'success' })
    } catch (error) {
      console.error('Error creating todo:', error)
      setToast({ show: true, message: 'Failed to create todo', type: 'error' })
    }
  }

  const handleUpdate = async (id, todoData) => {
    try {
      const response = await todoAPI.update(id, todoData)
      setTodos(todos.map(todo => todo.id === id ? response.data : todo))
      setToast({ show: true, message: 'Todo updated successfully!', type: 'success' })
    } catch (error) {
      console.error('Error updating todo:', error)
      setToast({ show: true, message: 'Failed to update todo', type: 'error' })
    }
  }

  const handleDeleteClick = (id) => {
    const todo = todos.find(t => t.id === id)
    setDeleteModal({ isOpen: true, todoId: id, todoTitle: todo?.title || 'this todo' })
  }

  const handleDeleteConfirm = async () => {
    try {
      await todoAPI.delete(deleteModal.todoId)
      setTodos(todos.filter(todo => todo.id !== deleteModal.todoId))
      setDeleteModal({ isOpen: false, todoId: null, todoTitle: '' })
      setToast({ show: true, message: 'Todo deleted successfully!', type: 'success' })
    } catch (error) {
      console.error('Error deleting todo:', error)
      setDeleteModal({ isOpen: false, todoId: null, todoTitle: '' })
      setToast({ show: true, message: 'Failed to delete todo', type: 'error' })
    }
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })

  // Calculate statistics
  const totalTodos = todos.length
  const completedTodos = todos.filter(t => t.completed).length
  const activeTodos = todos.filter(t => !t.completed).length
  const highPriorityTodos = todos.filter(t => t.priority === 'high' && !t.completed).length
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <Target className="text-white" size={24} />
            </div>
            <span className="text-3xl font-bold text-gray-900">{totalTodos}</span>
          </div>
          <p className="text-gray-900 text-sm font-bold">Total Todos</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
              <CheckCircle2 className="text-white" size={24} />
            </div>
            <span className="text-3xl font-bold text-gray-900">{completedTodos}</span>
          </div>
          <p className="text-gray-900 text-sm font-bold">Completed</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
              <Circle className="text-white" size={24} />
            </div>
            <span className="text-3xl font-bold text-gray-900">{activeTodos}</span>
          </div>
          <p className="text-gray-900 text-sm font-bold">Active</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl">
              <TrendingUp className="text-white" size={24} />
            </div>
            <span className="text-3xl font-bold text-gray-900">{completionRate}%</span>
          </div>
          <p className="text-gray-900 text-sm font-bold">Completion Rate</p>
        </div>
      </div>

      {/* Header with Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-1">My Todos</h2>
          <p className="text-gray-800 font-semibold">
            {highPriorityTodos > 0 && (
              <span className="inline-flex items-center gap-1">
                <Award className="text-yellow-400" size={16} />
                {highPriorityTodos} high priority task{highPriorityTodos !== 1 ? 's' : ''}
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2 text-lg"
        >
          <Plus size={22} />
          Add Todo
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
            filter === 'all'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl scale-105'
              : 'glass-effect text-gray-900 hover:text-gray-900 hover:bg-white/30 font-bold'
          }`}
        >
          All ({totalTodos})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
            filter === 'active'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl scale-105'
              : 'glass-effect text-gray-900 hover:text-gray-900 hover:bg-white/30 font-bold'
          }`}
        >
          Active ({activeTodos})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
            filter === 'completed'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl scale-105'
              : 'glass-effect text-gray-900 hover:text-gray-900 hover:bg-white/30 font-bold'
          }`}
        >
          Completed ({completedTodos})
        </button>
      </div>

      {/* Todo Form */}
      {showForm && (
        <div className="mb-6 animate-slide-up">
          <TodoForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {/* Todo List */}
      <div className="space-y-4">
        {sortedTodos.length === 0 ? (
          <div className="card text-center py-16">
            <Circle className="mx-auto mb-4 text-gray-800" size={64} />
            <p className="text-gray-900 text-xl font-bold mb-2">No todos found</p>
            <p className="text-gray-800 font-semibold">Create your first todo to get started!</p>
          </div>
        ) : (
          sortedTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdate}
              onDelete={handleDeleteClick}
            />
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, todoId: null, todoTitle: '' })}
        onConfirm={handleDeleteConfirm}
        title="Delete Todo"
        message={`Are you sure you want to delete "${deleteModal.todoTitle}"? This action cannot be undone.`}
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

export default TodoList

