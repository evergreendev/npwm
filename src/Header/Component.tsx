import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import { getCachedHours } from '@/utilities/getHours'
import RichText from '@/components/RichText'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)();
  const hours = await getCachedHours()();

  if (hours.length === 0) return <HeaderClient data={headerData} />


  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const currentHour = hours.find((h) => {
    const start = new Date(h.hoursStart)
    const end = new Date(h.hoursEnd)
    return today >= start && today <= end
  });

  const mostRecentHour = hours.sort((a,b)=> {
    return new Date(b.hoursStart) < new Date(a.hoursStart) ? 1 : -1;
  })[0];

  const hoursHeading = currentHour ? "Today's Hours" : mostRecentHour?.label;
  const targetHour = currentHour || mostRecentHour

  const hoursContent = targetHour ? (
    <RichText className="prose-p:text-sm" enableGutter={false} data={targetHour.content} />
  ) : null

  return (
    <HeaderClient
      data={headerData}
      hoursHeading={hoursHeading}
      hoursContent={hoursContent}
      hasHours={!!targetHour}
    />
  )
}
