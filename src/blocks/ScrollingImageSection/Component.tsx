'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Media } from '@/components/Media'
import type {
  ScrollingImageSection as ScrollingImageSectionProps,
  Media as MediaType,
} from '@/payload-types'
import { useScrollInfo } from '@/hooks/useScrollInfo'

export const ScrollingImageSection: React.FC<
  ScrollingImageSectionProps & {
    hasPrevSection: boolean
    hasNextSection: boolean
    prevBackgroundImage: MediaType | null
    nextBackgroundImage: MediaType | null
  }
> = ({
  backgroundImage,
  header,
  subheader,
  hasPrevSection,
  hasNextSection,
  prevBackgroundImage,
  nextBackgroundImage,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [initialFadeinIsComplete, setInitialFadeinIsComplete] = useState(hasPrevSection);
  const { isPastTop, isVisible } = useScrollInfo(sectionRef)
  const containerRef = useRef<HTMLElement>(null)
  const containerScrollInfo = useScrollInfo(containerRef);

  useEffect(() => {
    if (!isVisible) return;
    setInitialFadeinIsComplete(true);
  }, [isVisible])

  return (
    <section
      ref={containerRef}
      className={`w-full relative ${isPastTop && hasNextSection ? 'h-screen' : 'h-[200vh]'}`}
    >
      {/* Background Image Container - Sticky */}
      <div
        className={`h-screen w-full overflow-hidden sticky top-0 transition-opacity duration-500`}
      >
        {backgroundImage && typeof backgroundImage === 'object' && (
          <Media
            fill
            imgClassName={`object-cover w-full h-full background-position-center z-20
            ${containerScrollInfo.isVisible || !initialFadeinIsComplete ? 'opacity-100' : 'opacity-0'}  ${initialFadeinIsComplete ? 'duration-1000 transition-opacity' : 'duration-0'}`}
            resource={backgroundImage}
            priority
          />
        )}
        {hasPrevSection && prevBackgroundImage && typeof prevBackgroundImage === 'object' && (
          <Media
            fill
            imgClassName={`object-cover w-full h-full background-position-center z-10
              ${!isPastTop ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
            resource={prevBackgroundImage}
          />
        )}
        {hasNextSection && nextBackgroundImage && typeof nextBackgroundImage === 'object' && (
          <Media
            fill
            imgClassName="object-cover w-full h-full background-position-center z-0"
            resource={nextBackgroundImage}
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
