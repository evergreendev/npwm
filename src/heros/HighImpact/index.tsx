'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'

export const HighImpactHero: React.FC<Page['hero']> = ({ media }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  return (
    <div
      className="relative flex items-center justify-center text-white"
      data-theme="light"
    >
      <div className="select-none w-full aspect-video">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover w-full" priority resource={media} />
        )}
      </div>
    </div>
  )
}
