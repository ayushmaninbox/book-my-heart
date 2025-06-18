import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Create a new date
export const createDate = async (dateData) => {
  try {
    const { data, error } = await supabase
      .from('dates')
      .insert([dateData])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating date:', error)
    throw error
  }
}

// Get a date by ID
export const getDateById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('dates')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null
      }
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Error fetching date:', error)
    return null
  }
}

// Get all dates for a user
export const getUserDates = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('dates')
      .select('*')
      .eq('userId', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching user dates:', error)
    return []
  }
}

// Create an invite record
export const createInvite = async (inviteData) => {
  try {
    const { data, error } = await supabase
      .from('invites')
      .insert([inviteData])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating invite:', error)
    throw error
  }
}

// Get invites for a partner email
export const getPartnerInvites = async (email) => {
  try {
    const { data, error } = await supabase
      .from('invites')
      .select('*')
      .eq('partnerEmail', email)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching partner invites:', error)
    return []
  }
}

// Update invite status
export const updateInviteStatus = async (inviteId, updates) => {
  try {
    const { data, error } = await supabase
      .from('invites')
      .update(updates)
      .eq('id', inviteId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating invite:', error)
    return null
  }
}