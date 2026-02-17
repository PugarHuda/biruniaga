import { useAuth } from '../context/AuthContext'
import type { Role } from '../lib/constants'
import { ShieldOff } from 'lucide-react'

interface RoleGuardProps {
  allowed: Role[]
  children: React.ReactNode
}

export function RoleGuard({ allowed, children }: RoleGuardProps) {
  const { user } = useAuth()

  if (!user || !allowed.includes(user.adminRole)) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-gray-400">
        <ShieldOff size={64} className="mb-4" />
        <h2 className="text-xl font-semibold text-gray-600">Akses Ditolak</h2>
        <p className="mt-2">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
      </div>
    )
  }

  return <>{children}</>
}
