import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export interface ContactSettings {
  address: string
  phone: string
  whatsapp: string
  email: string
  operatingHours: string
}

export interface BusinessSettings {
  name: string
  description: string
  mission: string
  year: string
}

const defaultContact: ContactSettings = { address: '', phone: '', whatsapp: '', email: '', operatingHours: '' }
const defaultBusiness: BusinessSettings = { name: '', description: '', mission: '', year: '' }

export function useSettings() {
  const [contact, setContact] = useState<ContactSettings>(defaultContact)
  const [business, setBusiness] = useState<BusinessSettings>(defaultBusiness)
  const [loading, setLoading] = useState(true)

  const fetchSettings = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('settings').select('*')
    if (data) {
      for (const row of data) {
        if (row.key === 'contact') setContact({ ...defaultContact, ...row.value })
        if (row.key === 'business') setBusiness({ ...defaultBusiness, ...row.value })
      }
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchSettings() }, [fetchSettings])

  async function saveContact(values: ContactSettings) {
    const { error } = await supabase.from('settings').upsert({ key: 'contact', value: values })
    if (!error) setContact(values)
    return { error: error?.message }
  }

  async function saveBusiness(values: BusinessSettings) {
    const { error } = await supabase.from('settings').upsert({ key: 'business', value: values })
    if (!error) setBusiness(values)
    return { error: error?.message }
  }

  return { contact, business, loading, setContact, setBusiness, saveContact, saveBusiness }
}
