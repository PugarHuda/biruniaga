import { useState } from 'react'
import { useSiteSettings } from '../hooks/useSiteSettings'
import { useToast } from '../hooks/useToast'
import { Spinner } from '../components/ui/Spinner'
import { ImageUpload } from '../components/ui/ImageUpload'
import { Save, Globe, Image as ImageIcon, Mail, MapPin } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function SettingsPage() {
  const { settings, loading, updateSetting, refetch } = useSiteSettings()
  const { showToast } = useToast()
  const [editValues, setEditValues] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState<string | null>(null)

  const handleChange = (key: string, value: string) => {
    setEditValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async (key: string) => {
    const value = editValues[key]
    if (value === undefined) return

    setSaving(key)
    const result = await updateSetting(key, value)
    setSaving(null)

    if (result.success) {
      showToast('Pengaturan berhasil diperbarui', 'success')
      setEditValues((prev) => {
        const newValues = { ...prev }
        delete newValues[key]
        return newValues
      })
    } else {
      showToast(result.error || 'Gagal memperbarui pengaturan', 'error')
    }
  }

  const handleImageUpload = async (key: string, file: File) => {
    setUploadingImage(key)
    
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${key}-${Date.now()}.${fileExt}`
      const filePath = `site/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      // Get public URL
      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      const publicUrl = data.publicUrl

      // Update setting with new URL
      const result = await updateSetting(key, publicUrl)
      
      if (result.success) {
        showToast('Gambar berhasil diupload', 'success')
        await refetch()
      } else {
        throw new Error(result.error || 'Gagal update setting')
      }
    } catch (error: any) {
      showToast(error.message || 'Gagal upload gambar', 'error')
    } finally {
      setUploadingImage(null)
    }
  }

  const getValue = (key: string, originalValue: string) => {
    return editValues[key] !== undefined ? editValues[key] : originalValue
  }

  const hasChanges = (key: string) => {
    return editValues[key] !== undefined
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    )
  }

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1"

  // Group settings by category
  const logoSettings = settings.filter(s => s.key.includes('logo'))
  const heroSettings = settings.filter(s => s.key.includes('hero'))
  const contactSettings = settings.filter(s => ['whatsapp_number', 'email', 'address'].includes(s.key))
  const seoSettings = settings.filter(s => ['site_title', 'site_description', 'footer_copyright'].includes(s.key))

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Pengaturan Website</h1>
        <p className="text-gray-600 mt-1">Kelola konten dan pengaturan website Biruniaga</p>
      </div>

      {/* Logo & Branding */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="text-primary" size={20} />
          <h2 className="text-lg font-bold text-gray-800">Logo & Branding</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {logoSettings.map((setting) => (
            <div key={setting.key}>
              <label className={labelClass}>
                {setting.key === 'logo_bumdes_url' ? 'Logo BUMDes' : 'Logo Desa'}
              </label>
              <ImageUpload
                currentImage={setting.value}
                onUpload={(file) => handleImageUpload(setting.key, file)}
                loading={uploadingImage === setting.key}
                aspectRatio="square"
              />
              <p className="text-xs text-gray-500 mt-1">{setting.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="text-primary" size={20} />
          <h2 className="text-lg font-bold text-gray-800">Hero Section</h2>
        </div>
        <div className="space-y-4">
          {/* Hero Background Image */}
          {heroSettings.filter(s => s.key === 'hero_image_url').map((setting) => (
            <div key={setting.key}>
              <label className={labelClass}>Background Image</label>
              <ImageUpload
                currentImage={setting.value}
                onUpload={(file) => handleImageUpload(setting.key, file)}
                loading={uploadingImage === setting.key}
                aspectRatio="video"
              />
              <p className="text-xs text-gray-500 mt-1">{setting.description}</p>
            </div>
          ))}

          {/* Hero Text Fields */}
          {heroSettings.filter(s => s.key !== 'hero_image_url').map((setting) => (
            <div key={setting.key}>
              <label className={labelClass}>
                {setting.key === 'hero_title' ? 'Judul Hero' :
                 setting.key === 'hero_subtitle' ? 'Subjudul Hero' : 'Deskripsi Hero'}
              </label>
              {setting.key === 'hero_description' ? (
                <textarea
                  value={getValue(setting.key, setting.value)}
                  onChange={(e) => handleChange(setting.key, e.target.value)}
                  rows={3}
                  className={inputClass + ' resize-none'}
                  placeholder={setting.description || ''}
                />
              ) : (
                <input
                  type="text"
                  value={getValue(setting.key, setting.value)}
                  onChange={(e) => handleChange(setting.key, e.target.value)}
                  className={inputClass}
                  placeholder={setting.description || ''}
                />
              )}
              {hasChanges(setting.key) && (
                <button
                  onClick={() => handleSave(setting.key)}
                  disabled={saving === setting.key}
                  className="mt-2 text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1"
                >
                  <Save size={14} />
                  {saving === setting.key ? 'Menyimpan...' : 'Simpan'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="text-primary" size={20} />
          <h2 className="text-lg font-bold text-gray-800">Informasi Kontak</h2>
        </div>
        <div className="space-y-4">
          {contactSettings.map((setting) => (
            <div key={setting.key}>
              <label className={labelClass}>
                {setting.key === 'whatsapp_number' ? 'Nomor WhatsApp' :
                 setting.key === 'email' ? 'Email' : 'Alamat'}
              </label>
              {setting.key === 'address' ? (
                <textarea
                  value={getValue(setting.key, setting.value)}
                  onChange={(e) => handleChange(setting.key, e.target.value)}
                  rows={3}
                  className={inputClass + ' resize-none'}
                  placeholder={setting.description || ''}
                />
              ) : (
                <input
                  type={setting.key === 'email' ? 'email' : 'text'}
                  value={getValue(setting.key, setting.value)}
                  onChange={(e) => handleChange(setting.key, e.target.value)}
                  className={inputClass}
                  placeholder={setting.description || ''}
                />
              )}
              {hasChanges(setting.key) && (
                <button
                  onClick={() => handleSave(setting.key)}
                  disabled={saving === setting.key}
                  className="mt-2 text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1"
                >
                  <Save size={14} />
                  {saving === setting.key ? 'Menyimpan...' : 'Simpan'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SEO & Footer */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="text-primary" size={20} />
          <h2 className="text-lg font-bold text-gray-800">SEO & Footer</h2>
        </div>
        <div className="space-y-4">
          {seoSettings.map((setting) => (
            <div key={setting.key}>
              <label className={labelClass}>
                {setting.key === 'site_title' ? 'Judul Website' :
                 setting.key === 'site_description' ? 'Deskripsi Website (SEO)' : 'Copyright Footer'}
              </label>
              {setting.key === 'site_description' ? (
                <textarea
                  value={getValue(setting.key, setting.value)}
                  onChange={(e) => handleChange(setting.key, e.target.value)}
                  rows={3}
                  className={inputClass + ' resize-none'}
                  placeholder={setting.description || ''}
                />
              ) : (
                <input
                  type="text"
                  value={getValue(setting.key, setting.value)}
                  onChange={(e) => handleChange(setting.key, e.target.value)}
                  className={inputClass}
                  placeholder={setting.description || ''}
                />
              )}
              {hasChanges(setting.key) && (
                <button
                  onClick={() => handleSave(setting.key)}
                  disabled={saving === setting.key}
                  className="mt-2 text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1"
                >
                  <Save size={14} />
                  {saving === setting.key ? 'Menyimpan...' : 'Simpan'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
