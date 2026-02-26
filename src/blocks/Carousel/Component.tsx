import React from 'react'
import type { CarouselBlock as CarouselBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Carousel } from '@/components/Carousel'

type Props = CarouselBlockProps

export const CarouselBlock: React.FC<Props> = ({ slides }) => {
  if (!slides || slides.length === 0) return null

  return (
    <div className="bg-background-secondary text-white py-0 overflow-hidden">
      <Carousel
        ariaLabel="Image and Text Carousel"
        className="w-full relative"
        controlsClassName="flex justify-between absolute top-1/2 -translate-y-1/2 z-20 w-full px-4"
        slides={slides.map((slide, index) => ({
          label: slide.title || `Slide ${index + 1}`,
          content: (
            <div key={index} className="flex flex-col md:flex-row min-h-150 w-full">
              {/* Left Side: Image */}
              <div className="relative w-full md:w-1/2 min-h-75 md:min-h-full">
                {slide.image && typeof slide.image === 'object' && (
                  <Media fill imgClassName="object-cover w-full h-full" resource={slide.image} />
                )}
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-background">
                <div className="max-w-prose w-full">
                  {slide.title && (
                    <h2 className="text-4xl md:text-5xl font-bold mb-2">{slide.title}</h2>
                  )}
                  {slide.subtitle && (
                    <h3 className="text-2xl mb-6">
                      {slide.subtitle}
                    </h3>
                  )}

                  {slide.content && (
                    <RichText
                      className="mb-8 prose-invert prose-p:text-lg"
                      data={slide.content}
                      enableGutter={false}
                    />
                  )}
                  {slide.hasLink && slide.link && <CMSLink {...slide.link} className="text-white" appearance="destructive" />}
                </div>
              </div>
            </div>
          ),
        }))}
      />
    </div>
  )
}
