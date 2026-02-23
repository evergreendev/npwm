import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText, theme }) => {
  const isDark = theme === 'dark'

  return (
    <div
      className={`${isDark ? 'bg-background text-light' : 'bg-light text-background'} py-12`}
    >
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
          <div className="flex items-center max-w-7xl mx-auto">
            {richText && (
              <RichText className="mb-0" data={richText} enableGutter={false} />
            )}
          </div>
          <div className="flex flex-col gap-8">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} size="lg" {...link} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
