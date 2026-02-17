const variants: Record<string, string> = {
  success: 'bg-green-100 text-green-700',
  danger: 'bg-red-100 text-red-700',
  warning: 'bg-yellow-100 text-yellow-700',
  info: 'bg-blue-100 text-blue-700',
  gray: 'bg-gray-100 text-gray-600',
}

interface BadgeProps {
  children: React.ReactNode
  variant?: keyof typeof variants
}

export function Badge({ children, variant = 'info' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  )
}
