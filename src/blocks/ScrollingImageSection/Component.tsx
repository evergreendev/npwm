'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Media } from '@/components/Media'
import type { ScrollingImageSection as ScrollingImageSectionProps } from '@/payload-types'
import { useScrollInfo } from '@/hooks/useScrollInfo'

export const ScrollingImageSection: React.FC<
  ScrollingImageSectionProps & { hasPrevSection: boolean; hasNextSection: boolean }
> = ({ backgroundImage, header, subheader, hasPrevSection, hasNextSection }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [startFade, setStartFade] = useState(false);
  const { isPastTop } = useScrollInfo(sectionRef);

  useEffect(() => {

  }, [])

  return (
    <section
      className={`w-full relative ${isPastTop && hasNextSection ? 'h-screen': 'h-[200vh]'}`}
    >
      {/* Background Image Container - Sticky */}
      <div
        className={`h-screen w-full overflow-hidden sticky top-0 transition-opacity duration-500`}
      >
        {backgroundImage && typeof backgroundImage === 'object' && (
          <Media
            fill
            imgClassName="object-cover w-full h-full background-position-center"
            resource={backgroundImage}
            priority
          />
        )}
      </div>

      {/* Scrolling Content */}
      <div
        ref={sectionRef}
        className={`relative flex flex-col items-center justify-center z-10 pointer-events-none`}
      >
        <div className="min-w-3xl max-w-full px-6 py-8 text-center text-text-primary bg-light pointer-events-auto">
          <h2 className="text-4xl font-bold font-header">{header}</h2>
          {subheader && <p className="text-4xl font-header">{subheader}</p>}
        </div>
      </div>
    </section>
  )
}
