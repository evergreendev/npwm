'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import Image from 'next/image'
import VerticalDivider from '@/components/VerticalDivider'
import { Menu, X } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

interface HeaderClientProps {
  data: Header
  hoursContent?: React.ReactNode
  hoursHeading?: string | undefined
  hasHours?: boolean
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, hoursContent, hoursHeading, hasHours }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setHeaderTheme(null)
    setIsMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header className="relative z-20 bg-background py-4">
      <div className="w-full h-1.5 bg-custom-gradient" />
      <div className="container">
        <div className="flex gap-8 ml-0 min-[800px]:ml-20 justify-between min-[800px]:justify-start items-center">
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
                      sizes="160px"
                      loading="eager"
                      priority={true}
                    />
                  </Link>
                )
              })}
            </div>
          )}
          <div className="hidden min-[800px]:block">
            <HeaderNav data={data} />
          </div>
          <button
            className="block min-[800px]:hidden text-light p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-background z-[100] min-[800px]:hidden transition-transform duration-300 ease-in-out transform flex flex-col',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="w-full h-1.5 bg-custom-gradient" />
        <div className="container flex justify-between items-center py-4">
          {data.logos && (
            <div className="flex gap-4 items-center -mt-1.5">
              {data.logos.map((logo) => {
                if (typeof logo === 'number') return null

                return (
                  <Link href="/" key={logo.id} onClick={() => setIsMenuOpen(false)}>
                    <Image
                      className="w-40"
                      src={logo.url || ''}
                      alt={logo.alt || ''}
                      width={logo.width || 100}
                      height={logo.height || 100}
                      sizes="160px"
                      loading="eager"
                      priority={true}
                    />
                  </Link>
                )
              })}
            </div>
          )}
          <button
            className="text-light p-2"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={32} />
          </button>
        </div>
        <div className="container flex-1 py-8 flex flex-col gap-6 items-center justify-center">
          {data.navItems?.map(({ link }, i) => (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className="text-light text-3xl font-bold"
              onClick={() => setIsMenuOpen(false)}
            />
          ))}
        </div>
        <div className="w-full h-1.5 bg-custom-gradient mt-auto" />
      </div>

      <div className="w-full h-1.5 bg-custom-gradient" />
      {hasHours && (
        <div className="container flex gap-4 relative">
          <div className="bg-light text-sm text-background flex absolute top-0 px-6 py-2">
            <div>
              <h3 className="font-bold text-center -mb-1">{hoursHeading}</h3>
              {hoursContent}
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
