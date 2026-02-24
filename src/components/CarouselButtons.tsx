"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface CarouselButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  className?: string
}

export const PrevButton: React.FC<CarouselButtonProps> = ({ className, ...props }) => {
  return (
    <Button
      variant="default"
      size="icon"
      className={cn('bg-text-primary text-white hover:bg-text-primary/90 shrink-0 rounded-full', className)}
      aria-label="Previous slide"
      {...props}
    >
      <ChevronLeft className="size-6" />
    </Button>
  )
}

export const NextButton: React.FC<CarouselButtonProps> = ({ className, ...props }) => {
  return (
    <Button
      variant="default"
      size="icon"
      className={cn('bg-text-primary text-white hover:bg-text-primary/90 shrink-0 rounded-full', className)}
      aria-label="Next slide"
      {...props}
    >
      <ChevronRight className="size-6" />
    </Button>
  )
}
