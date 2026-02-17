import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { supabase } from '../../lib/supabase'

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/produk': 'Kelola Produk',
  '/pesan': 'Pesan Masuk',
  '/pengguna': 'Kelola Pengguna',
  '/pengaturan': 'Pengaturan',
}

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)
  const location = useLocation()

  const title = pageTitles[location.pathname] || 'Admin'

  useEffect(() => {
    async function fetchCounts() {
      const [{ data: messages }, { data: admins }] = await Promise.all([
        supabase.from('messages').select('id, read'),
        supabase.from('admins').select('id, role'),
      ])
      setUnreadCount(messages?.filter(m => !m.read).length || 0)
      setPendingCount(admins?.filter(a => a.role === 'pending').length || 0)
    }
    fetchCounts()
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        unreadCount={unreadCount}
        pendingCount={pendingCount}
      />
      <div className="lg:ml-64">
        <Topbar title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
