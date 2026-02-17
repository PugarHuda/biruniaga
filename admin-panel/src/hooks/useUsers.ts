import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Role } from '../lib/constants'

export interface AdminUser {
  id: string
  user_id: string
  name: string
  email: string
  role: Role
  created_at: string
}

export function useUsers() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('admins')
      .select('*')
      .order('created_at', { ascending: true })
    setUsers((data || []) as AdminUser[])
    setLoading(false)
  }, [])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  async function updateRole(id: string, newRole: Role) {
    const { error } = await supabase.from('admins').update({ role: newRole }).eq('id', id)
    if (!error) await fetchUsers()
    return { error: error?.message }
  }

  async function deleteUser(id: string) {
    const { error } = await supabase.from('admins').delete().eq('id', id)
    if (!error) await fetchUsers()
    return { error: error?.message }
  }

  const totalUsers = users.length
  const activeUsers = users.filter(u => u.role !== 'pending').length
  const pendingUsers = users.filter(u => u.role === 'pending').length

  return { users, loading, fetchUsers, updateRole, deleteUser, totalUsers, activeUsers, pendingUsers }
}
