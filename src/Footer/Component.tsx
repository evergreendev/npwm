import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Image from 'next/image'
import { Facebook, Instagram, Youtube } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import { Hours } from '@/components/Hours'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)() as Footer;

  const { logo, facebook, instagram, youtube, rightLink } = footerData || {}

  return (
    <footer className="relative z-20 bg-background text-light py-4 mt-auto">
      <div className="w-full h-1.5 bg-custom-gradient" />
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
          {/* Left Side: Address */}
          <div className="flex justify-center">
            <div className="flex flex-col gap-0">
              <h2 className="text-center text-xl font-bold m-0">Today&apos;s Hours</h2>
              <Hours className="prose-p:text-xl" mode="current" />
            </div>

            <Link href="https://www.google.com/maps/place/The+National+Presidential+Wax+Museum/@43.8882532,-103.4284918,1122m/data=!3m3!1e3!4b1!5s0x877d36407604db0d:0x1f589815292a0de!4m16!1m9!4m8!1m0!1m6!1m2!1s0x877d363f898e1349:0x54ff1acc15dffe58!2sThe+National+Presidential+Wax+Museum,+609+US-16A,+Keystone,+SD+57751!2m2!1d-103.4259169!2d43.8882494!3m5!1s0x877d363f898e1349:0x54ff1acc15dffe58!8m2!3d43.8882494!4d-103.4259169!16s%2Fg%2F1tkb5ltj?entry=ttu&g_ep=EgoyMDI2MDIxNi4wIKXMDSoASAFQAw%3D%3D">
              <address className="not-italic text-xl text-center md:text-left">
                609 Hwy 16A
                <br />
                Keystone, SD 57751
              </address>
            </Link>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center order-first md:order-0">
            {logo && typeof logo === 'object' ? (
              <Link href="/">
                <Image
                  className="w-40 -my-2"
                  src={logo.url || ''}
                  alt={logo.alt || ''}
                  width={logo.width || 100}
                  height={logo.height || 100}
                />
              </Link>
            ) : (
              <Link className="flex items-center" href="/">
                <Logo />
              </Link>
            )}
          </div>

          {/* Right Side: Socials and Extra Link */}
          <div className="flex justify-center gap-8">
            {/* Column 1: Follow Us */}
            <div className="flex flex-col gap-2">
              <span className="font-bold uppercase text-center text-2xl">Follow Us</span>
              <div className="flex gap-4 items-center">
                {facebook && (
                  <Link
                    aria-label="Visit The National Presidential Wax Museum on Facebook"
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook size={20} />
                  </Link>
                )}
                {instagram && (
                  <Link
                    aria-label="Visit The National Presidential Wax Museum on Instagram"
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram size={20} />
                  </Link>
                )}
                {youtube && (
                  <Link
                    aria-label="Visit The National Presidential Wax Museum on YouTube"
                    href={youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Youtube size={20} />
                  </Link>
                )}
              </div>
            </div>

            {/* Column 2: Right Link */}
            <div className="flex items-center">
              {rightLink && <CMSLink {...rightLink} className="text-xl" />}
            </div>
          </div>
        </div>

        {/* Optional: Original Nav Items if still needed elsewhere,
            but the prompt asks for specific columns on the right.
            The instructions say 'then the right side of the logo have 2 columns.
            On column will be the lucide brand links...
            then the right column will be 1 link in the footer config'.
            It doesn't explicitly say to remove navItems, but it defines what should be on the right.
        */}
      </div>
      <div className="w-full h-1.5 bg-custom-gradient" />
    </footer>
  )
}
