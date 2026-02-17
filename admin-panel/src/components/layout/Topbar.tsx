import { Menu, UserCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

interface TopbarProps {
  title: string
  onMenuClick: () => void
}

export function Topbar({ title, onMenuClick }: TopbarProps) {
  const { user } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-1 hover:bg-gray-100 rounded-lg">
          <Menu size={24} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <UserCircle size={24} />
        <span className="text-sm font-medium hidden sm:block">
          {user?.adminName || user?.email}
        </span>
      </div>
    </header>
  )
}
