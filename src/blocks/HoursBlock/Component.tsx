import React from 'react'
import { Hours } from '@/components/Hours'
import { HoursBlock as HoursBlockType } from '@/payload-types'

type Props = {
  className?: string
} & HoursBlockType

export const HoursBlock: React.FC<Props> = ({ id, mode, className }) => {
  return (
    <div className="w-full" id={id || undefined}>
      <Hours mode={mode} className={className} />
    </div>
  )
}
