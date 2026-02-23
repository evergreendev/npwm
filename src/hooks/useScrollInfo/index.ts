'use client'

import { useState, useEffect, useCallback, RefObject } from 'react'

interface ScrollInfo {
  scrollTop: number
  isPastTop: boolean
  isVisible: boolean
}

export const useScrollInfo = (ref: RefObject<HTMLElement | null>): ScrollInfo => {
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({
    scrollTop: 0,
    isPastTop: false,
    isVisible: false,
  })

  const handleScroll = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      // rect.top is relative to the viewport.
      // If rect.top <= 0, the top of the element has reached or passed the top of the screen.
      const isPastTop = rect.top <= 0

      // An element is visible if its top is above the bottom of the viewport
      // and its bottom is below the top of the viewport.
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0

      setScrollInfo({
        scrollTop: window.scrollY,
        isPastTop,
        isVisible,
      })
    }
  }, [ref])

  useEffect(() => {
    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [handleScroll])

  return scrollInfo
}
