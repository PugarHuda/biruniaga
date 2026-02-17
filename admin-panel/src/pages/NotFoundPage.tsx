import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <p className="text-xl font-semibold text-gray-600 mb-2">Halaman Tidak Ditemukan</p>
        <p className="text-gray-400 mb-6">Halaman yang Anda cari tidak tersedia.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-dark transition"
        >
          <Home size={18} />
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  )
}
