// URL website publik — dipakai untuk link "Lihat Website" di sidebar
// Ganti sesuai domain production nanti
export const MAIN_SITE_URL = import.meta.env.VITE_MAIN_SITE_URL || '/'

export const ROLE_LABELS: Record<string, string> = {
  admin: 'Admin',
  editor: 'Editor',
  viewer: 'Viewer',
  pending: 'Menunggu',
}

export const CATEGORIES = ['Cemilan', 'Olahan', 'Makanan'] as const

export type Category = (typeof CATEGORIES)[number]

export type Role = 'admin' | 'editor' | 'viewer' | 'pending'

// Supabase Storage public URLs for site assets
const STORAGE_BASE = 'https://xjnlgscroleykailitat.supabase.co/storage/v1/object/public/product-images/site'
export const LOGO_BUMDES_URL = `${STORAGE_BASE}/logo-bumdes.png`
export const LOGO_DESA_URL = `${STORAGE_BASE}/logo-desa.png`
export const DESA_BANYU_URL = `${STORAGE_BASE}/desa-banyu.png`
