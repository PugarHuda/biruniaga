import { Upload, X, Loader2 } from 'lucide-react'
import { useRef, useState } from 'react'

interface ImageUploadProps {
  currentImage?: string
  onUpload?: (file: File) => void | Promise<void>
  onFileSelect?: (file: File | null) => void
  onClearExisting?: () => void
  loading?: boolean
  aspectRatio?: 'square' | 'video' | 'auto'
}

export function ImageUpload({ 
  currentImage, 
  onUpload,
  onFileSelect, 
  onClearExisting,
  loading = false,
  aspectRatio = 'auto'
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB')
      return
    }

    // Show preview immediately
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)

    // Call appropriate callback
    if (onUpload) {
      await onUpload(file)
      setPreview(null) // Clear preview after upload
    } else if (onFileSelect) {
      onFileSelect(file)
    }
  }

  function clearImage() {
    setPreview(null)
    if (onFileSelect) onFileSelect(null)
    if (onClearExisting) onClearExisting()
    if (inputRef.current) inputRef.current.value = ''
  }

  const displayImage = preview || currentImage

  // Determine size based on aspect ratio
  const sizeClass = aspectRatio === 'square' 
    ? 'w-32 h-32' 
    : aspectRatio === 'video' 
    ? 'w-64 h-36' 
    : 'w-48 h-32'

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg,image/webp"
        onChange={handleChange}
        className="hidden"
        disabled={loading}
      />
      {displayImage ? (
        <div className="relative inline-block">
          <img 
            src={displayImage} 
            alt="Preview" 
            className={`${sizeClass} object-cover rounded-lg border ${loading ? 'opacity-50' : ''}`}
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
              <Loader2 className="animate-spin text-white" size={24} />
            </div>
          )}
          {!loading && (
            <button
              type="button"
              onClick={clearImage}
              className="absolute -top-2 -right-2 bg-danger text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className={`${sizeClass} border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              <span className="text-xs mt-1">Uploading...</span>
            </>
          ) : (
            <>
              <Upload size={24} />
              <span className="text-xs mt-1">Upload</span>
            </>
          )}
        </button>
      )}
      {displayImage && !loading && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-2 text-sm text-primary hover:underline"
        >
          Ganti gambar
        </button>
      )}
      <p className="text-xs text-gray-500 mt-1">
        Format: JPG, PNG, WebP. Max 5MB
      </p>
    </div>
  )
}
