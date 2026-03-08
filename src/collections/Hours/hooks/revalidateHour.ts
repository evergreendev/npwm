import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidateTag } from 'next/cache'
import type { Hour } from '@/payload-types'

export const revalidateHour: CollectionAfterChangeHook<Hour> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating hours`)
    revalidateTag('hours')
  }
  return doc
}

export const revalidateDeleteHour: CollectionAfterDeleteHook<Hour> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateTag('hours')
  }

  return doc
}
