import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Exhibit } from '@/payload-types'

export const revalidateExhibit: CollectionAfterChangeHook<Exhibit> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/exhibit/${doc.slug}`

      payload.logger.info(`Revalidating exhibit at path: ${path}`)

      revalidatePath(path)
      revalidateTag('exhibits-sitemap')
    }

    // If the exhibit was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/exhibit/${previousDoc.slug}`

      payload.logger.info(`Revalidating old exhibit at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('exhibits-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Exhibit> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/exhibit/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('exhibits-sitemap')
  }

  return doc
}
