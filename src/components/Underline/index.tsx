import React from 'react'
import { cn } from '@/utilities/ui'

interface UnderlineProps {
  className?: string
  reverse?: boolean
  light?: boolean
  color?: 'default' | 'yellow'
  fullWidth?: boolean
}

export const Underline: React.FC<UnderlineProps> = ({
  className,
  reverse = false,
  light = false,
  color = 'default',
  fullWidth = false,
}) => {
  const direction = reverse ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
  const toColor = light ? 'to-light' : 'to-[#1f2937]'
  const fromColor = color === 'yellow' ? 'from-yellow-400' : 'from-[#e70a0a]'

  const fullWidthClasses = fullWidth
    ? 'w-screen relative left-1/2 right-1/2 -ml-[50vw] mr-[50vw]'
    : 'w-full'

  return (
    <div className={cn('h-1', fullWidthClasses, direction, fromColor, toColor, className)} />
  )
}

export default Underline
