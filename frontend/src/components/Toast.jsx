import { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, X } from 'lucide-react'

function Toast({ message, type = 'success', onClose }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Wait for animation
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  if (!isVisible) return null

  const bgColor = type === 'success' 
    ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
    : 'bg-gradient-to-r from-red-500 to-rose-600'

  const Icon = type === 'success' ? CheckCircle2 : XCircle

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-up">
      <div className={`${bgColor} text-white rounded-xl shadow-2xl p-4 flex items-center gap-3 min-w-[300px] max-w-md`}>
        <Icon size={24} className="flex-shrink-0" />
        <p className="flex-1 font-semibold">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className="flex-shrink-0 p-1 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}

export default Toast






