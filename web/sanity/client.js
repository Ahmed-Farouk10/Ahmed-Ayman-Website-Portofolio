// web/sanity/client.js
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2025-11-01', // today's date
  useCdn: process.env.NODE_ENV === 'production',
})

export function urlFor(source) {
  return client.image(source)
}