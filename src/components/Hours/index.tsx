import React from 'react'
import { getCachedHours } from '@/utilities/getHours'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

interface HoursProps {
  mode?: 'current' | 'all'
  className?: string
}

export const Hours: React.FC<HoursProps> = async ({ mode = 'current', className }) => {
  const hours = await getCachedHours()()
  const now = new Date()
  // Reset time to midnight for comparison if needed, but the picker is 'dayOnly'
  // so hoursStart/End will likely be at 00:00:00.000
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  if (mode === 'current') {
    const currentHour = hours.find((h) => {
      const start = new Date(h.hoursStart)
      const end = new Date(h.hoursEnd)
      return today >= start && today <= end
    })

    if (!currentHour) return null

    return (
      <div className={cn('hours-current', className)}>
        <RichText data={currentHour.content} />
      </div>
    )
  }

  // mode === 'all'
  const upcomingHours = hours.filter((h) => {
    const end = new Date(h.hoursEnd)
    return end >= today
  })

  if (upcomingHours.length === 0) return null

  return (
    <div className={cn('hours-all space-y-4', className)}>
      {upcomingHours.map((h) => (
        <div key={h.id} className="hour-entry flex flex-col sm:flex-row sm:gap-2">
          <p className="font-bold">{h.label}:</p>
          <div className="font-normal">
             <RichText data={h.content} enableProse={false} />
          </div>
        </div>
      ))}
    </div>
  )
}
