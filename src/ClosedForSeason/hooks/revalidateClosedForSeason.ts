import type { GlobalAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

export const revalidateClosedForSeason: GlobalAfterChangeHook = ({ doc, req }) => {
  if (!req.context.disableRevalidate) {
    revalidateTag('global_closed-for-season')
  }

  return doc
}
