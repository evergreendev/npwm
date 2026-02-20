'use client'

import React from 'react'
import { Media } from '@/components/Media'
import type { ScrollingImageSection as ScrollingImageSectionProps} from '@/payload-types'

export const ScrollingImageSection: React.FC<ScrollingImageSectionProps> = ({
  backgroundImage,
  header,
  subheader,
}) => {
  return (
    <section className="relative h-[300vh] w-full">
      {/* Background Image Container - Sticky */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {backgroundImage && typeof backgroundImage === 'object' && (
          <Media
            fill
            imgClassName="object-cover w-full h-full background-position-center"
            resource={backgroundImage}
            priority
          />
        )}
        {/* Overlay to ensure text readability if needed, and for the fade effect */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Scrolling Content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen z-10 pointer-events-none">
        <div className="min-w-3xl max-w-full px-6 py-8 text-center text-text-primary bg-light pointer-events-auto">
          <h2 className="text-4xl font-bold font-header">{header}</h2>
          {subheader && <p className="text-4xl font-header">{subheader}</p>}
        </div>
      </div>
    </section>
  )
}
