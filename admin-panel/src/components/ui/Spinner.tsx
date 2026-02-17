import { Loader2 } from 'lucide-react'

const sizes = { sm: 16, md: 24, lg: 40 }

export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return <Loader2 size={sizes[size]} className="animate-spin text-primary" />
}
