import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

async function getHours() {
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

export const getCachedHours = () =>
  unstable_cache(async () => getHours(), ['hours'], {
    tags: ['hours'],
  })
