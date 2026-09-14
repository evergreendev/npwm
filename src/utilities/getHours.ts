import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

async function fetchHours() {
  const payload = await getPayload({ config: configPromise })

  const hours = await payload.find({
    collection: 'hours',
    depth: 1,
    limit: 100,
    sort: 'sortOrder',
    where: {
      isActive: {
        equals: true,
      },
    },
  })

  return hours.docs
}

// Invalidated when hours change and by the daily cache-reset endpoint.
export const getHours = unstable_cache(fetchHours, ['hours'], { tags: ['hours'] })
