import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { connection } from 'next/server'

export async function getHours() {
  // Read fresh hours at request time, including when the current date changes.
  await connection()

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
