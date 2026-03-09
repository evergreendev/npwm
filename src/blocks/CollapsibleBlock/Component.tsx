'use client'

import React, { useState } from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import type { CollapsibleBlock as CollapsibleBlockProps } from '@/payload-types'
import { ChevronDown } from 'lucide-react'

export const CollapsibleBlock: React.FC<CollapsibleBlockProps & { className?: string }> = ({
  id,
  introContent,
  items,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const contentId = React.useId()

  return (
    <div className={cn('w-full text-text-primary', className)} id={id || undefined}>
      <div className="container py-8">
        {introContent && <RichText data={introContent} enableGutter={false} className="text-text-primary" />}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          className="mt-8 flex items-center gap-2 text-text-primary font-bold hover:opacity-80 transition-opacity"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
          <ChevronDown className={cn('w-5 h-5 transition-transform duration-300', isExpanded && 'rotate-180')} />
        </button>
      </div>

      <div
        id={contentId}
        className={cn(
          'overflow-hidden transition-all duration-500 ease-in-out',
          isExpanded ? 'max-h-2500 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        {items?.map((item, index) => {
          const isEven = index % 2 === 0
          const bgColor = isEven ? '#f3f6f9' : '#f3f3f9'

          return (
            <div
              key={item.id || index}
              style={{ backgroundColor: bgColor }}
              className="w-full text-text-primary"
            >
              <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                <div className={cn('flex flex-col gap-6 justify-center', !isEven && 'md:order-2')}>
                  {item.title && <h3 className="text-3xl md:text-4xl font-bold text-text-primary">{item.title}</h3>}
                  {item.description && <RichText data={item.description} enableGutter={false} className="text-text-primary" />}
                </div>

                <div className={cn(
                  'relative flex flex-col sm:flex-row flex-wrap w-full',
                  isEven ? 'md:order-2' : 'md:order-1'
                )}>
                  {item.images?.map((img, imgIndex) => (
                    <div key={img.id || imgIndex} className="relative flex-1 w-full aspect-[4/3]">
                      {img.image && typeof img.image === 'object' && (
                        <Media
                          resource={img.image}
                          fill
                          imgClassName="object-cover w-full h-full"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
