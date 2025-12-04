import { useState } from 'react'
import TodoList from './components/TodoList'
import NoteList from './components/NoteList'
import { CheckSquare, StickyNote, Sparkles, Zap } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('todos')

  return (
    <div className="min-h-screen py-8 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-yellow-400" size={40} />
            <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent mb-2 drop-shadow-2xl">
              Todo & Notes
            </h1>
            <Zap className="text-yellow-400" size={40} />
          </div>
          <p className="text-gray-900 text-xl md:text-2xl font-bold mb-6">Organize your life, one task at a time</p>
          <div className="flex items-center justify-center gap-2 text-gray-800">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold">All systems operational</span>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="flex justify-center mb-10">
          <div className="glass-effect rounded-2xl shadow-2xl p-2 inline-flex gap-3">
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 ${
                activeTab === 'todos'
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white shadow-2xl scale-105'
                  : 'text-gray-900 hover:text-gray-900 hover:bg-white/30 font-bold'
              }`}
            >
              <CheckSquare size={24} />
              Todos
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 ${
                activeTab === 'notes'
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white shadow-2xl scale-105'
                  : 'text-gray-900 hover:text-gray-900 hover:bg-white/30 font-bold'
              }`}
            >
              <StickyNote size={24} />
              Notes
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="animate-slide-up">
          {activeTab === 'todos' ? <TodoList /> : <NoteList />}
        </div>
      </div>
    </div>
  )
}

export default App

