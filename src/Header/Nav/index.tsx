'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-8 items-center text-light">
      {navItems.map(({ link }, i) => {
        return <CMSLink className="text-light text-xl font-bold" key={i} {...link} appearance="link" />
      })}
{/*      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>*/}
    </nav>
  )
}
