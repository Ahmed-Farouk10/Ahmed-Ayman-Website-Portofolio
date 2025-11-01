// web/sanity/client.js
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2025-11-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  // Return a string URL, or null if no image
  return source ? builder.image(source).url() : null
}