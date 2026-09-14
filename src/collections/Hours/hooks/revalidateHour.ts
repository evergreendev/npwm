import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { Hour } from '@/payload-types'

export const revalidateHour: CollectionAfterChangeHook<Hour> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating hours`)

    const { revalidateTag } = await import('next/cache')
    revalidateTag('hours')
  }
  return doc
}

export const revalidateDeleteHour: CollectionAfterDeleteHook<Hour> = async ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const { revalidateTag } = await import('next/cache')
    revalidateTag('hours')
  }

  return doc
}
