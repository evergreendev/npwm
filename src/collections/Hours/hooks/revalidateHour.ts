import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { Hour } from '@/payload-types'

export const revalidateHour: CollectionAfterChangeHook<Hour> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating hours`)

    import('next/cache').then(({ revalidateTag }) => {
      revalidateTag('hours')
    })
  }
  return doc
}

export const revalidateDeleteHour: CollectionAfterDeleteHook<Hour> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    import('next/cache').then(({ revalidateTag }) => {
      revalidateTag('hours')
    })
  }

  return doc
}
