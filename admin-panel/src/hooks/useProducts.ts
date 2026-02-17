import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  ingredients: string | null
  weight: string | null
  shelf_life: string | null
  image: string | null
  status: 'active' | 'inactive'
  featured: boolean
  created_at: string
  updated_at: string | null
}

export type ProductFormData = Omit<Product, 'id' | 'created_at' | 'updated_at' | 'image' | 'status' | 'featured'>

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    setProducts(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  async function uploadImage(file: File): Promise<string | null> {
    const ext = file.name.split('.').pop()
    const fileName = `products/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('product-images').upload(fileName, file, { upsert: true })
    if (error) return null
    const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(fileName)
    return urlData.publicUrl
  }

  async function createProduct(formData: ProductFormData, imageFile: File | null) {
    let imageUrl: string | null = null
    if (imageFile) {
      imageUrl = await uploadImage(imageFile)
    }

    const { error } = await supabase.from('products').insert({
      ...formData,
      image: imageUrl,
      status: 'active',
      featured: false,
    })

    if (!error) await fetchProducts()
    return { error: error?.message }
  }

  async function updateProduct(id: string, formData: ProductFormData, imageFile: File | null, currentImage: string | null) {
    let imageUrl = currentImage
    if (imageFile) {
      const uploaded = await uploadImage(imageFile)
      if (uploaded) imageUrl = uploaded
    }

    const { error } = await supabase
      .from('products')
      .update({ ...formData, image: imageUrl, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (!error) await fetchProducts()
    return { error: error?.message }
  }

  async function deleteProduct(id: string) {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (!error) await fetchProducts()
    return { error: error?.message }
  }

  async function toggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    const { error } = await supabase
      .from('products')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (!error) await fetchProducts()
    return { error: error?.message }
  }

  async function toggleFeatured(id: string, currentFeatured: boolean) {
    const { error } = await supabase
      .from('products')
      .update({ featured: !currentFeatured, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (!error) await fetchProducts()
    return { error: error?.message }
  }

  return { products, loading, fetchProducts, createProduct, updateProduct, deleteProduct, toggleStatus, toggleFeatured }
}
