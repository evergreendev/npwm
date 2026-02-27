import React from 'react'
import { cn } from '@/utilities/ui'

interface UnderlineProps {
  className?: string
  reverse?: boolean
  light?: boolean
  color?: 'default' | 'yellow'
}

export const Underline: React.FC<UnderlineProps> = ({
  className,
  reverse = false,
  light = false,
  color = 'default',
}) => {
  const direction = reverse ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
  const toColor = light ? 'to-light' : 'to-[#1f2937]'
  const fromColor = color === 'yellow' ? 'from-yellow-400' : 'from-[#e70a0a]'

  return (
    <div className={cn('h-1 w-full', direction, fromColor, toColor, className)} />
  )
}

export default Underline
