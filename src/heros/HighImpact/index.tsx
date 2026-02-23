'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import { SlidingUnderlineLink } from '@/components/SlidingUnderlineLink'
import VerticalDivider from '@/components/VerticalDivider'

export const HighImpactHero: React.FC<Page['hero']> = ({ media, headerLinks }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  return (
    <div className="relative flex wrap items-center justify-center text-white" data-theme="light">
      <div className="select-none w-full aspect-video">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover w-full" priority resource={media} />
        )}
      </div>
      {headerLinks && headerLinks.length > 0 && (
        <div className="absolute z-20 flex gap-2 flex-wrap justify-around py-10 md:px-20 bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 bg-background text-white">
          {headerLinks.map(({ link, header, description }, index) => {
            return (
              <React.Fragment key={index}>
                <div className="max-w-prose w-full md:w-1/4 flex items-center flex-col">
                  <div className="mb-6 text-center">
                    {header && <h3 className="text-2xl mb-2 font-header">{header}</h3>}
                    {description && <p className="text-lg font-body mb-2">{description}</p>}
                  </div>

                  <SlidingUnderlineLink
                    className="text-center"
                    href={
                      link.type === 'reference'
                        ? (link.reference?.value as Page).slug
                        : link.url || ''
                    }
                  >
                    {link.label || 'Learn More'}<span className="ml-1">{">"}</span>
                  </SlidingUnderlineLink>
                </div>
                {index < headerLinks.length - 1 && (
                  <VerticalDivider className="my-8" type="thick" color="highlight" />
                )}
              </React.Fragment>
            )
          })}
        </div>
      )}
    </div>
  )
}
