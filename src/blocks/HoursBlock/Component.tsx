import React from 'react'
import { Hours } from '@/components/Hours'
import { HoursBlock as HoursBlockType } from '@/payload-types'

type Props = {
  className?: string
} & HoursBlockType

export const HoursBlock: React.FC<Props> = ({ mode, className }) => {
  return (
    <div className="container my-12">
      <Hours mode={mode} className={className} />
    </div>
  )
}
