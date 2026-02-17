import { CheckCircle, XCircle } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
}

export function Toast({ message, type }: ToastProps) {
  return (
    <div className={`toast-enter flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${
      type === 'success' ? 'bg-success' : 'bg-danger'
    }`}>
      {type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
      {message}
    </div>
  )
}
