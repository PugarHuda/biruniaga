import { useState, useMemo } from 'react'
import { Search, Eye, Trash2, MailOpen, Mail, MessageSquare } from 'lucide-react'
import { useMessages, type Message } from '../hooks/useMessages'
import { useToast } from '../hooks/useToast'
import { Modal } from '../components/ui/Modal'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'
import { Badge } from '../components/ui/Badge'
import { EmptyState } from '../components/ui/EmptyState'
import { Spinner } from '../components/ui/Spinner'
import { formatDate, timeAgo, formatWhatsAppNumber } from '../lib/utils'

export default function MessagesPage() {
  const { messages, loading, markAsRead, toggleRead, deleteMessage } = useMessages()
  const { showToast } = useToast()

  const [search, setSearch] = useState('')
  const [filterRead, setFilterRead] = useState<'' | 'read' | 'unread'>('')
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const filtered = useMemo(() => {
    return messages.filter(m => {
      const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
        (m.subject || '').toLowerCase().includes(search.toLowerCase())
      const matchRead = !filterRead ||
        (filterRead === 'read' && m.read) ||
        (filterRead === 'unread' && !m.read)
      return matchSearch && matchRead
    })
  }, [messages, search, filterRead])

  async function openMessage(m: Message) {
    setSelectedMsg(m)
    if (!m.read) {
      await markAsRead(m.id)
    }
  }

  async function handleToggleRead(m: Message) {
    const { error } = await toggleRead(m.id, m.read)
    if (error) showToast(error, 'error')
  }

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    const { error } = await deleteMessage(deleteId)
    if (error) showToast(error, 'error')
    else showToast('Pesan berhasil dihapus')
    setDeleting(false)
    setDeleteId(null)
  }

  function whatsAppLink(phone: string, name: string) {
    const num = formatWhatsAppNumber(phone)
    const text = encodeURIComponent(`Halo ${name}, terima kasih telah menghubungi BUMDes Biruniaga.\n\n`)
    return `https://wa.me/${num}?text=${text}`
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari pesan..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
          />
        </div>
        <select
          value={filterRead}
          onChange={e => setFilterRead(e.target.value as '' | 'read' | 'unread')}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
        >
          <option value="">Semua Pesan</option>
          <option value="unread">Belum Dibaca</option>
          <option value="read">Sudah Dibaca</option>
        </select>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState title="Tidak ada pesan" description="Belum ada pesan masuk" />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border divide-y">
          {filtered.map(m => (
            <div
              key={m.id}
              className={`p-4 flex items-start gap-3 hover:bg-gray-50 transition ${!m.read ? 'bg-primary-light/30' : ''}`}
            >
              <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm">{m.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => openMessage(m)}>
                <div className="flex items-center gap-2">
                  <p className={`text-sm ${!m.read ? 'font-bold text-gray-800' : 'font-medium text-gray-600'}`}>{m.name}</p>
                  {!m.read && <span className="w-2 h-2 bg-primary rounded-full" />}
                </div>
                <p className="text-sm text-gray-700 truncate">{m.subject || 'Tanpa Subjek'}</p>
                <p className="text-xs text-gray-400 truncate mt-0.5">{m.message}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="text-xs text-gray-400 hidden sm:block mr-2">{timeAgo(m.created_at)}</span>
                <button onClick={() => openMessage(m)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400" title="Lihat">
                  <Eye size={16} />
                </button>
                <button onClick={() => handleToggleRead(m)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400" title={m.read ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'}>
                  {m.read ? <Mail size={16} /> : <MailOpen size={16} />}
                </button>
                <button onClick={() => setDeleteId(m.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-danger" title="Hapus">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <Modal
        open={!!selectedMsg}
        onClose={() => setSelectedMsg(null)}
        title="Detail Pesan"
      >
        {selectedMsg && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Nama</p>
                <p className="font-medium text-gray-800">{selectedMsg.name}</p>
              </div>
              <div>
                <p className="text-gray-400">Email</p>
                <p className="font-medium text-gray-800">{selectedMsg.email}</p>
              </div>
              <div>
                <p className="text-gray-400">Telepon</p>
                <p className="font-medium text-gray-800">{selectedMsg.phone || '-'}</p>
              </div>
              <div>
                <p className="text-gray-400">Tanggal</p>
                <p className="font-medium text-gray-800">{formatDate(selectedMsg.created_at)}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Subjek</p>
              <p className="font-medium text-gray-800">{selectedMsg.subject || 'Tanpa Subjek'}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Pesan</p>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">{selectedMsg.message}</p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant={selectedMsg.read ? 'gray' : 'info'}>
                {selectedMsg.read ? 'Sudah Dibaca' : 'Belum Dibaca'}
              </Badge>
            </div>

            {selectedMsg.phone && (
              <a
                href={whatsAppLink(selectedMsg.phone, selectedMsg.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-green-600 transition"
              >
                <MessageSquare size={18} />
                Balas via WhatsApp
              </a>
            )}
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        title="Hapus Pesan"
        message="Apakah Anda yakin ingin menghapus pesan ini?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  )
}
