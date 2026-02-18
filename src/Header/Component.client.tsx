'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header, Hour } from '@/payload-types'

import { HeaderNav } from './Nav'
import Image from 'next/image'
import RichText from '@/components/RichText'
import VerticalDivider from '@/components/VerticalDivider'

interface HeaderClientProps {
  data: Header
  currentHour?: Hour | undefined
  hoursHeading?: string | undefined
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, currentHour, hoursHeading }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="relative z-20 bg-background py-4">
      <div className="w-full h-1.5 bg-custom-gradient" />
      <div className="container">
        <div className="flex gap-8 ml-20">
          {data.logos && (
            <div className="flex gap-4 items-center -mt-1.5">
              {data.logos.map((logo) => {
                if (typeof logo === 'number') return null

                return (
                  <Link href="/" key={logo.id}>
                    <Image
                      className="w-40"
                      src={logo.url || ''}
                      alt={logo.alt || ''}
                      width={logo.width || 100}
                      height={logo.height || 100}
                      loading="eager"
                      priority={true}
                    />
                  </Link>
                )
              })}
            </div>
          )}
          <HeaderNav data={data} />
        </div>
      </div>
      <div className="w-full h-1.5 bg-custom-gradient" />
      {currentHour && (
        <div className="container flex gap-4 relative">
          <div className="bg-light text-background flex absolute top-0 px-6 py-2">
            <div>
              <h3 className="font-bold text-center">{hoursHeading}</h3>
              <RichText enableGutter={false} data={currentHour?.content || ''} />
            </div>
            <VerticalDivider type="thin" color="dark" />
            <Link href="https://www.google.com/maps/place/The+National+Presidential+Wax+Museum/@43.8882532,-103.4284918,1122m/data=!3m3!1e3!4b1!5s0x877d36407604db0d:0x1f589815292a0de!4m16!1m9!4m8!1m0!1m6!1m2!1s0x877d363f898e1349:0x54ff1acc15dffe58!2sThe+National+Presidential+Wax+Museum,+609+US-16A,+Keystone,+SD+57751!2m2!1d-103.4259169!2d43.8882494!3m5!1s0x877d363f898e1349:0x54ff1acc15dffe58!8m2!3d43.8882494!4d-103.4259169!16s%2Fg%2F1tkb5ltj?entry=ttu&g_ep=EgoyMDI2MDIxNi4wIKXMDSoASAFQAw%3D%3D">
              <address className="not-italic">
                609 US-16A<br/>
                Keystone, SD 57751
              </address>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
