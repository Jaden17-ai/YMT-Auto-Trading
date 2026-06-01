import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || import.meta.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-06-01',
})