import { useState } from 'react'
import { Users, UserCheck, Clock, Trash2 } from 'lucide-react'
import { useUsers } from '../hooks/useUsers'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../hooks/useToast'
import { RoleGuard } from '../components/RoleGuard'
import { StatsCard } from '../components/ui/StatsCard'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'
import { Badge } from '../components/ui/Badge'
import { Spinner } from '../components/ui/Spinner'
import { ROLE_LABELS, type Role } from '../lib/constants'
import { timeAgo } from '../lib/utils'

const ROLES: Role[] = ['admin', 'editor', 'viewer', 'pending']

function roleBadgeVariant(role: string): 'success' | 'danger' | 'info' {
  if (role === 'admin') return 'success'
  if (role === 'pending') return 'danger'
  return 'info'
}

export default function UsersPage() {
  const { users, loading, updateRole, deleteUser, totalUsers, activeUsers, pendingUsers } = useUsers()
  const { user: currentUser } = useAuth()
  const { showToast } = useToast()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  async function handleRoleChange(id: string, newRole: Role) {
    const { error } = await updateRole(id, newRole)
    if (error) showToast(error, 'error')
    else showToast('Role berhasil diubah')
  }

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    const { error } = await deleteUser(deleteId)
    if (error) showToast(error, 'error')
    else showToast('Pengguna berhasil dihapus')
    setDeleting(false)
    setDeleteId(null)
  }

  return (
    <RoleGuard allowed={['admin']}>
      {loading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatsCard label="Total Pengguna" value={totalUsers} icon={Users} color="bg-primary" />
            <StatsCard label="Pengguna Aktif" value={activeUsers} icon={UserCheck} color="bg-success" />
            <StatsCard label="Menunggu Persetujuan" value={pendingUsers} icon={Clock} color="bg-warning" />
          </div>

          <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-left">
                <tr>
                  <th className="px-5 py-3">Nama</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Bergabung</th>
                  <th className="px-5 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map(u => {
                  const isSelf = u.user_id === currentUser?.id
                  return (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
                            <span className="text-primary font-bold text-xs">{u.name.charAt(0).toUpperCase()}</span>
                          </div>
                          <span className="font-medium text-gray-800">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-gray-600">{u.email}</td>
                      <td className="px-5 py-3">
                        {isSelf ? (
                          <Badge variant={roleBadgeVariant(u.role)}>{ROLE_LABELS[u.role]}</Badge>
                        ) : (
                          <select
                            value={u.role}
                            onChange={e => handleRoleChange(u.id, e.target.value as Role)}
                            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                          >
                            {ROLES.map(r => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
                          </select>
                        )}
                      </td>
                      <td className="px-5 py-3 text-gray-400 text-xs">{timeAgo(u.created_at)}</td>
                      <td className="px-5 py-3 text-right">
                        {!isSelf && (
                          <button
                            onClick={() => setDeleteId(u.id)}
                            className="p-2 hover:bg-red-50 rounded-lg text-danger"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Hapus Pengguna"
        message="Apakah Anda yakin ingin menghapus pengguna ini?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </RoleGuard>
  )
}
