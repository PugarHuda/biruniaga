import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { User, Session } from '@supabase/supabase-js'
import type { Role } from '../lib/constants'

interface AdminUser extends User {
  adminName: string
  adminRole: Role
  adminId: string
}

interface AuthContextType {
  user: AdminUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ error?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  async function resolveAdmin(session: Session | null) {
    if (!session?.user) {
      setUser(null)
      setLoading(false)
      return
    }

    const { data: admin } = await supabase
      .from('admins')
      .select('*')
      .eq('user_id', session.user.id)
      .single()

    if (!admin || admin.role === 'pending') {
      await supabase.auth.signOut()
      setUser(null)
      setLoading(false)
      return
    }

    setUser({
      ...session.user,
      adminName: admin.name,
      adminRole: admin.role as Role,
      adminId: admin.id,
    })
    setLoading(false)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      resolveAdmin(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      resolveAdmin(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function login(email: string, password: string) {
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) return { error: authError.message }

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return { error: 'Gagal mendapatkan sesi' }

    const { data: admin } = await supabase
      .from('admins')
      .select('*')
      .eq('user_id', session.user.id)
      .single()

    if (!admin) {
      await supabase.auth.signOut()
      return { error: 'Akun tidak terdaftar sebagai admin' }
    }

    if (admin.role === 'pending') {
      await supabase.auth.signOut()
      return { error: 'Akun belum disetujui oleh admin' }
    }

    setUser({
      ...session.user,
      adminName: admin.name,
      adminRole: admin.role as Role,
      adminId: admin.id,
    })

    return {}
  }

  async function register(name: string, email: string, password: string) {
    try {
      const { data, error: authError } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: undefined, // Disable email confirmation
          data: {
            name: name, // Simpan nama di user metadata
          }
        }
      })
      
      if (authError) return { error: authError.message }

      if (data.user) {
        const { error: insertError } = await supabase.from('admins').insert({
          user_id: data.user.id,
          name,
          email,
          role: 'pending',
        })
        
        if (insertError) {
          console.error('Error inserting admin:', insertError)
          return { error: 'Gagal membuat akun admin: ' + insertError.message }
        }
      }

      await supabase.auth.signOut()
      return {}
    } catch (error: any) {
      console.error('Register error:', error)
      return { error: error.message || 'Gagal mendaftar' }
    }
  }

  async function logout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
