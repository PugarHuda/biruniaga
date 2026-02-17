export function formatPrice(price: number): string {
  return 'Rp ' + Number(price).toLocaleString('id-ID')
}

export function timeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'Baru saja'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} menit lalu`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} jam lalu`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} hari lalu`

  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatWhatsAppNumber(phone: string): string {
  let cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1)
  }
  return cleaned
}

/**
 * Resolve image URL — handles:
 * - Full URLs (https://...) → pakai langsung
 * - Relative paths (assets/img/produk1.jpg) → prefix dengan /
 * - null/undefined → fallback placeholder
 */
export function resolveImageUrl(image: string | null | undefined): string {
  if (!image) return '/assets/img/produk1.jpg'
  if (image.startsWith('http')) return image
  // Relative path from main site — serve from admin's public/
  return image.startsWith('/') ? image : '/' + image
}
