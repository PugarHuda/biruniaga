import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export interface Message {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  read: boolean
  created_at: string
}

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
    setMessages(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchMessages() }, [fetchMessages])

  async function markAsRead(id: string) {
    const { error } = await supabase.from('messages').update({ read: true }).eq('id', id)
    if (!error) await fetchMessages()
    return { error: error?.message }
  }

  async function toggleRead(id: string, currentRead: boolean) {
    const { error } = await supabase.from('messages').update({ read: !currentRead }).eq('id', id)
    if (!error) await fetchMessages()
    return { error: error?.message }
  }

  async function deleteMessage(id: string) {
    const { error } = await supabase.from('messages').delete().eq('id', id)
    if (!error) await fetchMessages()
    return { error: error?.message }
  }

  return { messages, loading, fetchMessages, markAsRead, toggleRead, deleteMessage }
}
