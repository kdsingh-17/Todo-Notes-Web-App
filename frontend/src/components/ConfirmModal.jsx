import { X, AlertTriangle } from 'lucide-react'

function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete', cancelText = 'Cancel' }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slide-up border-2 border-gray-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-all"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-100 to-rose-100 rounded-full">
          <AlertTriangle className="text-red-600" size={32} />
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {title || 'Confirm Action'}
          </h3>
          <p className="text-gray-700 font-medium">
            {message || 'Are you sure you want to proceed?'}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95 flex-1"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal






