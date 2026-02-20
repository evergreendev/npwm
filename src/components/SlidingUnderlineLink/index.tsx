'use client'
import React from 'react'
import Link, { LinkProps } from 'next/link'
import { cn } from '@/utilities/ui'

interface SlidingUnderlineLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
}

export const SlidingUnderlineLink: React.FC<SlidingUnderlineLinkProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Link
      className={cn('group relative inline-block transition-all duration-300 pb-1', className)}
      {...props}
    >
      {children}
      <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full" />
    </Link>
  )
}
