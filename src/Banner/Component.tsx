import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Banner } from '@/payload-types'
import RichText from '@/components/RichText'

export async function Banner() {
  const banner: Banner = await getCachedGlobal('banner', 1)()

  if (!banner || !banner.active || !banner.message) {
    return null
  }

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  if (banner.banner_start) {
    const start = new Date(banner.banner_start)
    if (today < start) return null
  }

  if (banner.banner_end) {
    const end = new Date(banner.banner_end)
    if (today > end) return null
  }

  return (
    <div className="bg-primary text-primary-foreground py-2">
      <div className="container">
        <RichText
          data={banner.message}
          enableGutter={false}
          className="prose-p:m-0 prose-p:text-center prose-p:text-sm md:prose-p:text-base"
        />
      </div>
    </div>
  )
}
