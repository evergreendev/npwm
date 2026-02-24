import React from 'react'
import { cn } from '@/utilities/ui'

interface UnderlineProps {
  className?: string
  reverse?: boolean
}

export const Underline: React.FC<UnderlineProps> = ({ className, reverse = false }) => {
  return (
    <div
      className={cn(
        'h-1 w-full',
        reverse
          ? 'bg-gradient-to-l from-[#e70a0a] to-[#1f2937]'
          : 'bg-gradient-to-r from-[#e70a0a] to-[#1f2937]',
        className,
      )}
    />
  )
}

export default Underline
