import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface SiteSetting {
  id: string
  key: string
  value: string
  description: string | null
  updated_at: string
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('key')

      if (error) throw error
      setSettings(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch settings')
    } finally {
      setLoading(false)
    }
  }

  const updateSetting = async (key: string, value: string) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({ value, updated_at: new Date().toISOString() })
        .eq('key', key)

      if (error) throw error
      await fetchSettings()
      return { success: true }
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to update setting',
      }
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  return {
    settings,
    loading,
    error,
    updateSetting,
    refetch: fetchSettings,
  }
}
