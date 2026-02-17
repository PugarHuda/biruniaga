import { Inbox } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <Inbox size={48} className="mb-4" />
      <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
      {description && <p className="mt-1 text-sm">{description}</p>}
    </div>
  )
}
