/**
 * Utility to sync locally stored form submissions when database becomes available
 */
import { DatabaseService, isSupabaseConfigured } from '../lib/supabase'

export interface PendingSubmission {
  id: string
  timestamp: string
  form_data: any
  source: string
  synced?: boolean
}

/**
 * Attempts to sync pending form submissions from localStorage to database
 */
export async function syncPendingSubmissions(): Promise<{
  synced: number
  failed: number
  errors: string[]
}> {
  const results = {
    synced: 0,
    failed: 0,
    errors: [] as string[]
  }

  // Check if database is available
  if (!isSupabaseConfigured()) {
    results.errors.push('Database not configured')
    return results
  }

  // Get pending submissions from both storage keys
  const pendingKey = 'pending_submissions'
  const contactKey = 'contact_submissions'
  
  const pendingData = localStorage.getItem(pendingKey)
  const contactData = localStorage.getItem(contactKey)
  
  const allSubmissions: PendingSubmission[] = []
  
  if (pendingData) {
    try {
      const parsed = JSON.parse(pendingData)
      allSubmissions.push(...parsed)
    } catch (e) {
      results.errors.push('Failed to parse pending_submissions')
    }
  }
  
  if (contactData) {
    try {
      const parsed = JSON.parse(contactData)
      allSubmissions.push(...parsed)
    } catch (e) {
      results.errors.push('Failed to parse contact_submissions')
    }
  }
  
  // Filter out already synced submissions
  const unsynced = allSubmissions.filter(s => !s.synced)
  
  if (unsynced.length === 0) {
    return results
  }
  
  console.log(`📤 Attempting to sync ${unsynced.length} pending submissions...`)
  
  // Attempt to sync each submission
  for (const submission of unsynced) {
    try {
      const formData = submission.form_data
      
      // Prepare the data based on the form type
      const dbData = {
        first_name: formData.firstName || formData.name?.split(' ')[0] || '',
        last_name: formData.lastName || formData.name?.split(' ').slice(1).join(' ') || '',
        email: formData.email,
        company: formData.company,
        title: formData.title || formData.role || '',
        phone: formData.phone || '',
        industry_segment: formData.industrySegment || '',
        aum: formData.aum || '',
        active_borrowers: formData.activeBorrowers || '',
        ai_readiness: formData.aiReadiness || '',
        monthly_debt: formData.monthlyDebt || '',
        current_system: formData.currentSystem || '',
        pain_point: formData.painPoint || '',
        timeline: formData.timeline || formData.urgency || '',
        message: formData.message || '',
        hear_about_us: formData.hearAboutUs || '',
        source: `${submission.source}_synced`,
      }
      
      const result = await DatabaseService.submitContactForm(dbData)
      
      if (result.success) {
        // Mark as synced
        submission.synced = true
        results.synced++
        console.log(`✅ Synced submission ${submission.id}`)
      } else {
        results.failed++
        results.errors.push(`Failed to sync ${submission.id}: ${result.error}`)
      }
    } catch (error) {
      results.failed++
      results.errors.push(`Error syncing ${submission.id}: ${error}`)
    }
  }
  
  // Update localStorage with synced status
  if (pendingData) {
    const parsed = JSON.parse(pendingData)
    const updated = parsed.map((s: PendingSubmission) => {
      const synced = allSubmissions.find(as => as.id === s.id)
      return synced || s
    })
    localStorage.setItem(pendingKey, JSON.stringify(updated))
  }
  
  if (contactData) {
    const parsed = JSON.parse(contactData)
    const updated = parsed.map((s: PendingSubmission) => {
      const synced = allSubmissions.find(as => as.id === s.id)
      return synced || s
    })
    localStorage.setItem(contactKey, JSON.stringify(updated))
  }
  
  console.log(`📊 Sync complete: ${results.synced} succeeded, ${results.failed} failed`)
  
  return results
}

/**
 * Clears all synced submissions from localStorage
 */
export function clearSyncedSubmissions(): number {
  let cleared = 0
  
  const pendingKey = 'pending_submissions'
  const contactKey = 'contact_submissions'
  
  // Clear synced from pending_submissions
  const pendingData = localStorage.getItem(pendingKey)
  if (pendingData) {
    try {
      const parsed = JSON.parse(pendingData) as PendingSubmission[]
      const unsynced = parsed.filter(s => !s.synced)
      localStorage.setItem(pendingKey, JSON.stringify(unsynced))
      cleared += parsed.length - unsynced.length
    } catch (e) {
      console.error('Failed to clear pending_submissions')
    }
  }
  
  // Clear synced from contact_submissions
  const contactData = localStorage.getItem(contactKey)
  if (contactData) {
    try {
      const parsed = JSON.parse(contactData) as PendingSubmission[]
      const unsynced = parsed.filter(s => !s.synced)
      localStorage.setItem(contactKey, JSON.stringify(unsynced))
      cleared += parsed.length - unsynced.length
    } catch (e) {
      console.error('Failed to clear contact_submissions')
    }
  }
  
  return cleared
}

// Auto-sync on page load if database becomes available
if (typeof window !== 'undefined') {
  window.addEventListener('load', async () => {
    // Wait a bit for database to initialize
    setTimeout(async () => {
      if (isSupabaseConfigured()) {
        const result = await syncPendingSubmissions()
        if (result.synced > 0) {
          console.log(`🎉 Successfully synced ${result.synced} pending form submissions`)
        }
      }
    }, 5000)
  })
}