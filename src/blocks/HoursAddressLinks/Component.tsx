import React from 'react'
import { Hours } from '@/components/Hours'
import { CMSLink } from '@/components/Link'
import type { HoursAddressLinksBlock as HoursAddressLinksBlockType } from '@/payload-types'

export const HoursAddressLinksBlock: React.FC<HoursAddressLinksBlockType> = (props) => {
  const { address, googleMapsUrl, links } = props

  return (
    <div className="container my-12">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        {/* Column 1: Today's Hours */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-sm uppercase tracking-wider text-text-secondary mb-1">
            Today&apos;s Hours
          </span>
          {/*todo fix this bug<Hours mode="current" className="text-lg font-semibold" />*/}
          <p className="m-0 not-prose">9:00am-5:00pm</p>
        </div>

        {/* Column 2: Address */}
        <div className="flex-shrink-0 text-center md:text-left">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-all text-lg"
          >
            {address.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < address.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </a>
        </div>

        {/* Vertical Line */}
        <div className="hidden md:block w-px h-16 bg-border" />

        {/* Column 3: Links */}
        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
          {links &&
            links.map((linkItem, i) => {
              return <CMSLink key={i} {...linkItem.link} />
            })}
        </div>
      </div>
    </div>
  )
}
