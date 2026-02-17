import { useState, useMemo } from 'react'
import { Plus, Search, Pencil, Trash2, Star } from 'lucide-react'
import { useProducts, type Product, type ProductFormData } from '../hooks/useProducts'
import { useToast } from '../hooks/useToast'
import { Modal } from '../components/ui/Modal'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'
import { Badge } from '../components/ui/Badge'
import { Toggle } from '../components/ui/Toggle'
import { EmptyState } from '../components/ui/EmptyState'
import { Spinner } from '../components/ui/Spinner'
import { ImageUpload } from '../components/ui/ImageUpload'
import { formatPrice } from '../lib/utils'
import { CATEGORIES } from '../lib/constants'
import { resolveImageUrl } from '../lib/utils'

const emptyForm: ProductFormData = {
  name: '', price: 0, category: 'Cemilan', description: '',
  ingredients: null, weight: null, shelf_life: null,
}

export default function ProductsPage() {
  const { products, loading, createProduct, updateProduct, deleteProduct, toggleStatus, toggleFeatured } = useProducts()
  const { showToast } = useToast()

  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [form, setForm] = useState<ProductFormData>(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageCleared, setImageCleared] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchCat = !filterCat || p.category === filterCat
      return matchSearch && matchCat
    })
  }, [products, search, filterCat])

  function openCreate() {
    setEditingProduct(null)
    setForm(emptyForm)
    setImageFile(null)
    setImageCleared(false)
    setModalOpen(true)
  }

  function openEdit(p: Product) {
    setEditingProduct(p)
    setForm({
      name: p.name, price: p.price, category: p.category, description: p.description,
      ingredients: p.ingredients, weight: p.weight, shelf_life: p.shelf_life,
    })
    setImageFile(null)
    setImageCleared(false)
    setModalOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    if (editingProduct) {
      const currentImage = imageCleared ? null : editingProduct.image
      const { error } = await updateProduct(editingProduct.id, form, imageFile, currentImage)
      if (error) showToast(error, 'error')
      else showToast('Produk berhasil diperbarui')
    } else {
      const { error } = await createProduct(form, imageFile)
      if (error) showToast(error, 'error')
      else showToast('Produk berhasil ditambahkan')
    }

    setSaving(false)
    setModalOpen(false)
  }

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    const { error } = await deleteProduct(deleteId)
    if (error) showToast(error, 'error')
    else showToast('Produk berhasil dihapus')
    setDeleting(false)
    setDeleteId(null)
  }

  async function handleToggleStatus(p: Product) {
    const { error } = await toggleStatus(p.id, p.status)
    if (error) showToast(error, 'error')
  }

  async function handleToggleFeatured(p: Product) {
    const { error } = await toggleFeatured(p.id, p.featured)
    if (error) showToast(error, 'error')
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
            />
          </div>
          <select
            value={filterCat}
            onChange={e => setFilterCat(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="">Semua Kategori</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button
          onClick={openCreate}
          className="bg-primary text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-primary-dark transition flex items-center gap-2"
        >
          <Plus size={18} /> Tambah Produk
        </button>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState title="Tidak ada produk" description="Tambah produk baru untuk memulai" />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-5 py-3">Produk</th>
                <th className="px-5 py-3">Harga</th>
                <th className="px-5 py-3">Kategori</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Unggulan</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={resolveImageUrl(p.image)} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-medium text-gray-800">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{formatPrice(p.price)}</td>
                  <td className="px-5 py-3"><Badge variant="info">{p.category}</Badge></td>
                  <td className="px-5 py-3">
                    <Toggle checked={p.status === 'active'} onChange={() => handleToggleStatus(p)} />
                  </td>
                  <td className="px-5 py-3">
                    <button onClick={() => handleToggleFeatured(p)} className="p-1">
                      <Star size={18} className={p.featured ? 'fill-gold text-gold' : 'text-gray-300'} />
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(p)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => setDeleteId(p.id)} className="p-2 hover:bg-red-50 rounded-lg text-danger">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProduct ? 'Edit Produk' : 'Tambah Produk'}
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk *</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp) *</label>
              <input
                type="number"
                value={form.price}
                onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                required
                min={0}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori *</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi *</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              required
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bahan</label>
              <input
                type="text"
                value={form.ingredients || ''}
                onChange={e => setForm({ ...form, ingredients: e.target.value || null })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Berat</label>
              <input
                type="text"
                value={form.weight || ''}
                onChange={e => setForm({ ...form, weight: e.target.value || null })}
                placeholder="200 gram"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Masa Simpan</label>
              <input
                type="text"
                value={form.shelf_life || ''}
                onChange={e => setForm({ ...form, shelf_life: e.target.value || null })}
                placeholder="3 bulan"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Produk</label>
            <ImageUpload
              currentImage={editingProduct?.image ? resolveImageUrl(editingProduct.image) : undefined}
              onFileSelect={setImageFile}
              onClearExisting={() => setImageCleared(true)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition disabled:opacity-50"
            >
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        title="Hapus Produk"
        message="Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  )
}
