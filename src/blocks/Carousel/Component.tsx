import React from 'react'
import type { CarouselBlock as CarouselBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Carousel } from '@/components/Carousel'
import { cn } from '@/utilities/ui'

type Props = CarouselBlockProps

export const CarouselBlock: React.FC<Props> = ({
  slides,
  hasStaticSection,
  staticSectionContent,
  staticSectionSide,
}) => {
  if (!slides || slides.length === 0) return null

  const carousel = (
    <Carousel
      ariaLabel="Image and Text Carousel"
      className="w-full relative"
      controlsClassName="flex justify-between absolute top-1/2 -translate-y-1/2 z-20 w-full px-4"
      slides={slides.map((slide, index) => {
        const hasTextContent = Boolean(
          slide.title ||
            slide.subtitle ||
            (slide.content &&
              typeof slide.content === 'object' &&
              'root' in slide.content &&
              (slide.content.root as any)?.children?.length > 0) ||
            (slide.hasLink && slide.link),
        )

        return {
          label: slide.title || `Slide ${index + 1}`,
          content: (
            <div key={index} className="flex flex-col md:flex-row min-h-150 w-full">
              {/* Left Side: Image */}
              <div
                className={cn(
                  'relative w-full min-h-75 md:min-h-full',
                  hasTextContent ? 'md:w-1/2' : 'md:w-full',
                )}
              >
                {slide.image && typeof slide.image === 'object' && (
                  <Media fill imgClassName="object-cover w-full h-full" resource={slide.image} />
                )}
              </div>

              {/* Right Side: Content */}
              {hasTextContent && (
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-background">
                  <div className="max-w-prose w-full">
                    {slide.title && (
                      <h2 className="text-4xl md:text-5xl font-bold mb-2">{slide.title}</h2>
                    )}
                    {slide.subtitle && <h3 className="text-2xl mb-6">{slide.subtitle}</h3>}

                    {slide.content && (
                      <RichText
                        className="mb-8 prose-invert prose-p:text-lg prose-h2:text-4xl prose-h2:md:text-5xl prose-h2:font-bold prose-h2:mb-2 prose-h3:text-2xl prose-h3:mb-6"
                        data={slide.content}
                        enableGutter={false}
                      />
                    )}
                    {slide.hasLink && slide.link && (
                      <CMSLink {...slide.link} className="text-white" appearance="destructive" />
                    )}
                  </div>
                </div>
              )}
            </div>
          ),
        }
      })}
    />
  )

  if (hasStaticSection && staticSectionContent) {
    return (
      <div className="bg-background-secondary text-white py-0 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div
            className={cn(
              'w-full md:w-1/2 p-8 md:p-16 flex items-center bg-background-secondary',
              staticSectionSide === 'right' && 'md:order-2',
            )}
          >
            <RichText
              className="prose-invert prose-p:text-lg prose-h2:text-4xl prose-h2:md:text-5xl prose-h2:font-bold prose-h2:mb-2 prose-h3:text-2xl prose-h3:mb-6"
              data={staticSectionContent}
              enableGutter={false}
            />
          </div>
          <div className={cn('w-full md:w-1/2', staticSectionSide === 'right' && 'md:order-1')}>
            {carousel}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background-secondary text-white py-0 overflow-hidden">{carousel}</div>
  )
}
