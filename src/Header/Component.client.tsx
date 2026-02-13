'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import Image from 'next/image'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
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
        <div className="flex gap-8">
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
    </header>
  )
}
