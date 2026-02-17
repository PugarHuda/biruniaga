import type { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  label: string
  value: number | string
  icon: LucideIcon
  color: string
}

export function StatsCard({ label, value, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  )
}
