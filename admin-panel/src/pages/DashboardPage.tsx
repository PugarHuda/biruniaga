import { useEffect, useState } from 'react'
import { Package, ShoppingBag, Mail, MailOpen } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { StatsCard } from '../components/ui/StatsCard'
import { Badge } from '../components/ui/Badge'
import { Spinner } from '../components/ui/Spinner'
import { formatPrice, timeAgo } from '../lib/utils'
import { ROLE_LABELS } from '../lib/constants'
import { resolveImageUrl } from '../lib/utils'

interface DashStats {
  totalProducts: number
  activeProducts: number
  totalMessages: number
  unreadMessages: number
}

interface RecentProduct {
  id: string; name: string; price: number; category: string; status: string; featured: boolean; image: string | null
}
interface RecentMessage {
  id: string; name: string; subject: string | null; message: string; read: boolean; created_at: string
}
interface AdminItem {
  id: string; name: string; email: string; role: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashStats>({ totalProducts: 0, activeProducts: 0, totalMessages: 0, unreadMessages: 0 })
  const [products, setProducts] = useState<RecentProduct[]>([])
  const [messages, setMessages] = useState<RecentMessage[]>([])
  const [admins, setAdmins] = useState<AdminItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [{ data: prods }, { data: msgs }, { data: usrs }] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('messages').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('admins').select('*').order('created_at', { ascending: true }),
      ])

      const allProducts = prods || []
      const allMessages = msgs || []

      setStats({
        totalProducts: allProducts.length,
        activeProducts: allProducts.filter(p => p.status === 'active').length,
        totalMessages: allMessages.length,
        unreadMessages: allMessages.filter(m => !m.read).length,
      })
      setProducts(allProducts.slice(0, 10))
      setMessages(allMessages)
      setAdmins(usrs || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Total Produk" value={stats.totalProducts} icon={Package} color="bg-primary" />
        <StatsCard label="Produk Aktif" value={stats.activeProducts} icon={ShoppingBag} color="bg-success" />
        <StatsCard label="Total Pesan" value={stats.totalMessages} icon={Mail} color="bg-warning" />
        <StatsCard label="Belum Dibaca" value={stats.unreadMessages} icon={MailOpen} color="bg-danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products table */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-5 border-b">
            <h2 className="font-bold text-gray-800">Produk Terbaru</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-left">
                <tr>
                  <th className="px-5 py-3">Produk</th>
                  <th className="px-5 py-3">Harga</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={resolveImageUrl(p.image)} alt="" className="w-8 h-8 rounded object-cover" />
                        <div>
                          <p className="font-medium text-gray-800">{p.name}</p>
                          <p className="text-gray-400 text-xs">{p.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{formatPrice(p.price)}</td>
                    <td className="px-5 py-3">
                      <Badge variant={p.status === 'active' ? 'success' : 'gray'}>
                        {p.status === 'active' ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          {/* Recent messages */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-5 border-b">
              <h2 className="font-bold text-gray-800">Pesan Terbaru</h2>
            </div>
            <div className="divide-y">
              {messages.map(m => (
                <div key={m.id} className="p-4 flex items-start gap-3 hover:bg-gray-50">
                  <div className="w-9 h-9 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">{m.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-800 text-sm">{m.name}</p>
                      {!m.read && <span className="w-2 h-2 bg-primary rounded-full" />}
                    </div>
                    <p className="text-gray-500 text-xs truncate">{m.subject || 'Tanpa Subjek'}</p>
                  </div>
                  <span className="text-gray-400 text-xs whitespace-nowrap">{timeAgo(m.created_at)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Admin users */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-5 border-b">
              <h2 className="font-bold text-gray-800">Pengguna Admin</h2>
            </div>
            <div className="divide-y">
              {admins.map(a => (
                <div key={a.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{a.name}</p>
                    <p className="text-gray-400 text-xs">{a.email}</p>
                  </div>
                  <Badge variant={a.role === 'admin' ? 'success' : a.role === 'pending' ? 'danger' : 'info'}>
                    {ROLE_LABELS[a.role] || a.role}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
