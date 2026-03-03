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
  media,
  mediaLabel,
  hasPrevSection,
  hasNextSection,
  prevBackgroundImage,
  nextBackgroundImage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [initialFadeinIsComplete, setInitialFadeinIsComplete] = useState(hasPrevSection);
  const { isPastTop, isVisible } = useScrollInfo(sectionRef)
  const containerRef = useRef<HTMLElement>(null)
  const containerScrollInfo = useScrollInfo(containerRef);

  useEffect(() => {
    if (!isVisible) return;
    setInitialFadeinIsComplete(true);
  }, [isVisible])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen])

  const renderModalContent = () => {
    if (!media || typeof media !== 'object') return null

    const isVideo = media.mimeType?.includes('video')
    const isAudio = media.mimeType?.includes('audio')

    if (isVideo) {
      return (
        <video controls autoPlay className="max-w-full max-h-[80vh]">
          <source src={media.url || ''} type={media.mimeType || ''} />
          Your browser does not support the video tag.
        </video>
      )
    }

    if (isAudio) {
      return (
        <div className="bg-white p-8 shadow-xl w-96">
          <audio controls autoPlay className="w-full">
            <source src={media.url || ''} type={media.mimeType || ''} />
            Your browser does not support the audio element.
          </audio>
        </div>
      )
    }

    return (
      <Media
        resource={media}
        imgClassName="max-w-full max-h-[80vh] object-contain"
      />
    )
  }

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
        <div className="lg:min-w-3xl max-w-full px-6 py-8 text-center text-text-primary bg-light pointer-events-auto flex flex-col items-center relative">
          {header && <h2 className="text-4xl font-bold font-header">{header}</h2>}
          {subheader && <p className="text-4xl font-header">{subheader}</p>}
          {media && mediaLabel && (
            <div className="mt-4 self-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-[#D10000] hover:bg-[#A30000] text-white px-6 py-2 font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D10000]"
                aria-label={`Open media: ${mediaLabel}`}
              >
                {mediaLabel}
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 pointer-events-auto"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 text-white text-4xl hover:text-gray-300 focus:outline-none p-2"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>
            {renderModalContent()}
          </div>
        </div>
      )}
    </section>
  )
}
