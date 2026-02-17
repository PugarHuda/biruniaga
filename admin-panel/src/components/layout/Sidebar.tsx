import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, Mail, Users, Settings, LogOut, X, ExternalLink } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { MAIN_SITE_URL, LOGO_BUMDES_URL } from '../../lib/constants'

interface SidebarProps {
  open: boolean
  onClose: () => void
  unreadCount: number
  pendingCount: number
}

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/produk', label: 'Produk', icon: Package },
  { to: '/pesan', label: 'Pesan Masuk', icon: Mail, badgeKey: 'unread' as const },
  { to: '/pengguna', label: 'Pengguna', icon: Users, badgeKey: 'pending' as const },
  { to: '/pengaturan', label: 'Pengaturan', icon: Settings },
]

export function Sidebar({ open, onClose, unreadCount, pendingCount }: SidebarProps) {
  const { logout } = useAuth()

  function getBadge(key?: 'unread' | 'pending') {
    if (key === 'unread' && unreadCount > 0) return unreadCount
    if (key === 'pending' && pendingCount > 0) return pendingCount
    return null
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-sidebar z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src={LOGO_BUMDES_URL} alt="Biruniaga" className="w-9 h-9 rounded-lg object-contain" />
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Biruniaga</h1>
              <span className="text-gray-400 text-xs">Admin Panel</span>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const badge = getBadge(item.badgeKey)
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-400 hover:bg-sidebar-hover hover:text-white'
                  }`
                }
              >
                <item.icon size={20} />
                <span className="flex-1">{item.label}</span>
                {badge && (
                  <span className="bg-danger text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        <div className="p-3 border-t border-white/10 space-y-1">
          {MAIN_SITE_URL && (
            <a
              href={MAIN_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-sidebar-hover hover:text-white transition-colors"
            >
              <ExternalLink size={20} />
              Lihat Website
            </a>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-sidebar-hover hover:text-white transition-colors"
          >
            <LogOut size={20} />
            Keluar
          </button>
        </div>
      </aside>
    </>
  )
}
