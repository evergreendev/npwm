"use client"
import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { PrevButton, NextButton } from './CarouselButtons'

type PickerVariant = 'none' | 'grouped' | 'tabs'
type ContainerRole = 'region' | 'group'

type SlideInput =
  | React.ReactNode
  | {
      /** Optional visible label and/or accessible name for the slide */
      label?: string
      /** Slide content */
      content: React.ReactNode
    }

type CarouselProps = {
  /** Slides can be any React elements */
  slides: SlideInput[]

  /** If you have a visible heading, pass its element id here (preferred over ariaLabel) */
  ariaLabelledBy?: string
  /** If you do NOT have a visible heading, provide an accessible label here (do NOT include the word "carousel") */
  ariaLabel?: string

  /** Use "region" if it deserves a landmark; otherwise "group" */
  containerRole?: ContainerRole

  /** Auto-rotate */
  autoRotate?: boolean
  rotateIntervalMs?: number

  /** Slide picker controls */
  pickerVariant?: PickerVariant

  /** Start at this slide index */
  initialIndex?: number

  /** Optional className hooks */
  className?: string
  viewportClassName?: string
  controlsClassName?: string
}

function isSlideObj(s: SlideInput): s is { label?: string; content: React.ReactNode } {
  return typeof s === 'object' && s !== null && 'content' in s
}

export function Carousel({
  slides,
  ariaLabelledBy,
  ariaLabel,
  containerRole = 'region',
  autoRotate = false,
  rotateIntervalMs = 6000,
  pickerVariant = 'none',
  initialIndex = 0,
  className,
  viewportClassName,
  controlsClassName,
}: CarouselProps) {
  const reactId = useId()
  const slideCount = slides.length

  const normalized = useMemo(
    () =>
      slides.map((s, i) => {
        const label = isSlideObj(s) ? s.label : undefined
        const content = isSlideObj(s) ? s.content : s
        // If no unique label, fall back to “X of N” (as suggested for group-based slides).
        const fallbackName = `${i + 1} of ${slideCount}`
        return { label, content, fallbackName }
      }),
    [slides, slideCount],
  )

  const clamp = useCallback((n: number) => {
    if (slideCount <= 0) return 0
    return ((n % slideCount) + slideCount) % slideCount
  },[slideCount])

  const [index, setIndex] = useState(() => clamp(initialIndex))
  const [isRotating, setIsRotating] = useState<boolean>(!!autoRotate)

  // Per WCAG pattern text: stop rotating when focus enters carousel; do not restart unless user explicitly requests.
  const userPausedRef = useRef<boolean>(false)
  const hoverPausedRef = useRef<boolean>(false)
  const focusPausedRef = useRef<boolean>(false)

  const intervalRef = useRef<number | null>(null)

  const stopRotation = () => {
    setIsRotating(false)
  }
  const toggleRotation = () => {
    if (!autoRotate) return
    setIsRotating((prev) => {
      const next = !prev
      userPausedRef.current = !next // if turning off, it was explicitly paused by user
      return next
    })
  }

  const goPrev = () => setIndex((i) => clamp(i - 1))
  const goNext = () => setIndex((i) => clamp(i + 1))
  const goTo = (i: number) => setIndex(clamp(i))

  // Auto-rotation timer
  useEffect(() => {
    if (!autoRotate) return

    const shouldRotate =
      isRotating && !hoverPausedRef.current && !focusPausedRef.current && !userPausedRef.current

    if (!shouldRotate) {
      if (intervalRef.current != null) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    if (intervalRef.current != null) window.clearInterval(intervalRef.current)

    intervalRef.current = window.setInterval(() => {
      setIndex((i) => clamp(i + 1))
    }, rotateIntervalMs)

    return () => {
      if (intervalRef.current != null) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [autoRotate, isRotating, rotateIntervalMs, clamp])

  // If autoRotate prop changes, align initial rotating state reasonably
  useEffect(() => {
    setIsRotating(!!autoRotate)
    userPausedRef.current = false
  }, [autoRotate])

  // Accessibility IDs
  const viewportId = `carousel-viewport-${reactId}`
  const slideId = (i: number) => `carousel-slide-${reactId}-${i}`
  const tabId = (i: number) => `carousel-tab-${reactId}-${i}`
  const tabsLabelId = `carousel-tabs-label-${reactId}`

  // aria-live guidance per provided pattern text:
  // - off if automatically rotating
  // - polite if NOT automatically rotating
  const ariaLive: 'off' | 'polite' = autoRotate && isRotating ? 'off' : 'polite'

  // Basic requirement: carousel must have an accessible name.
  const containerLabelProps =
    ariaLabelledBy != null
      ? { 'aria-labelledby': ariaLabelledBy }
      : ariaLabel != null
        ? { 'aria-label': ariaLabel }
        : { 'aria-label': 'Featured content' } // fallback (avoid including word “carousel”)

  const onFocusCapture = () => {
    if (!autoRotate) return
    // Stop rotating on focus enter; do not auto-resume.
    focusPausedRef.current = true
    stopRotation()
  }

  const onBlurCapture: React.FocusEventHandler<HTMLDivElement> = (e) => {
    if (!autoRotate) return
    // When focus leaves the carousel entirely, keep paused until user explicitly starts again.
    // (We intentionally do NOT auto-resume.)
    const currentTarget = e.currentTarget
    const related = e.relatedTarget as Node | null
    const stillInside = related && currentTarget.contains(related)
    if (!stillInside) focusPausedRef.current = false
  }

  const onMouseEnter = () => {
    if (!autoRotate) return
    hoverPausedRef.current = true
    stopRotation()
  }

  const onMouseLeave = () => {
    if (!autoRotate) return
    hoverPausedRef.current = false
    // Do not auto-resume unless user had not explicitly paused.
    if (!userPausedRef.current && !focusPausedRef.current) setIsRotating(true)
  }

  // Shared layout styles (no dependency on external CSS)
  const styles: Record<string, React.CSSProperties> = {
    root: {
      display: 'grid',
      gap: 8,
      alignItems: 'center',
      maxWidth: '100%',
    },
    controlsRow: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    viewport: {
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
    },
    track: {
      display: 'flex',
      alignItems: 'center',
      width: `${slideCount * 100}%`,
      transform: `translateX(-${(index * 100) / Math.max(slideCount, 1)}%)`,
      transition: 'transform 350ms ease',
    },
    slide: {
      width: `${100 / Math.max(slideCount, 1)}%`,
      flex: `0 0 ${100 / Math.max(slideCount, 1)}%`,
    },
    pickerGroup: {
      display: 'flex',
      gap: 6,
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    dotBtn: {
      width: 32,
      height: 32,
      borderRadius: 999,
      border: '1px solid currentColor',
      background: 'transparent',
      lineHeight: 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
    tablist: {
      display: 'flex',
      gap: 6,
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    tab: {
      padding: '6px 10px',
      borderRadius: 999,
      border: '1px solid currentColor',
      background: 'transparent',
      cursor: 'pointer',
    },
    srOnly: {
      position: 'absolute',
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: 'hidden',
      clip: 'rect(0,0,0,0)',
      whiteSpace: 'nowrap',
      border: 0,
    },
  }

  // Render picker controls per requested variants.
  const renderPicker = () => {
    if (pickerVariant === 'none' || slideCount <= 1) return null

    if (pickerVariant === 'grouped') {
      return (
        <div role="group" aria-label="Choose slide to display" style={styles.pickerGroup}>
          {normalized.map((s, i) => {
            const isCurrent = i === index
            const name = s.label ? s.label : `Slide ${i + 1}`
            return (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={name}
                // Per pattern: aria-disabled true for current so it stays in tab order.
                aria-disabled={isCurrent ? 'true' : undefined}
                style={{
                  ...styles.dotBtn,
                  opacity: isCurrent ? 0.6 : 1,
                  cursor: isCurrent ? 'default' : 'pointer',
                }}
              >
                <span aria-hidden="true">{i + 1}</span>
              </button>
            )
          })}
        </div>
      )
    }

    // Tabs variant (single tab stop semantics handled by Tabs pattern: roving tabindex)
    // Note: This keeps focus on the tabs when navigating them, as standard for tabs.
    return (
      <>
        <span id={tabsLabelId} style={styles.srOnly}>
          Choose slide to display
        </span>
        <div
          role="tablist"
          aria-labelledby={tabsLabelId}
          style={styles.tablist}
          onKeyDown={(e) => {
            // Minimal roving behavior: Left/Right to move active tab and show slide.
            if (
              e.key !== 'ArrowLeft' &&
              e.key !== 'ArrowRight' &&
              e.key !== 'Home' &&
              e.key !== 'End'
            )
              return
            e.preventDefault()
            let next = index
            if (e.key === 'ArrowLeft') next = clamp(index - 1)
            if (e.key === 'ArrowRight') next = clamp(index + 1)
            if (e.key === 'Home') next = 0
            if (e.key === 'End') next = slideCount - 1
            goTo(next)
            // Move focus to the newly selected tab
            const el = document.getElementById(tabId(next)) as HTMLButtonElement | null
            el?.focus()
          }}
        >
          {normalized.map((s, i) => {
            const selected = i === index
            const tabName = s.label ? `Slide: ${s.label}` : `Slide ${i + 1}`
            return (
              <button
                key={i}
                id={tabId(i)}
                role="tab"
                type="button"
                aria-selected={selected ? 'true' : 'false'}
                aria-controls={slideId(i)}
                tabIndex={selected ? 0 : -1}
                onClick={() => goTo(i)}
                style={{
                  ...styles.tab,
                  opacity: selected ? 0.9 : 1,
                }}
              >
                {tabName}
              </button>
            )
          })}
        </div>
      </>
    )
  }

  return (
    <div
      role={containerRole}
      aria-roledescription="carousel"
      {...containerLabelProps}
      className={className}
      style={styles.root}
      onFocusCapture={onFocusCapture}
      onBlurCapture={onBlurCapture}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Controls: rotation control should be first in tab order inside the carousel */}
      <div className={controlsClassName + " z-50"} style={styles.controlsRow}>
        {autoRotate && (
          <button
            type="button"
            onClick={toggleRotation}
            aria-label={isRotating ? 'Stop slide rotation' : 'Start slide rotation'}
          >
            {isRotating ? 'Stop' : 'Start'}
          </button>
        )}

        <PrevButton onClick={goPrev} />

        <NextButton onClick={goNext} />

        {renderPicker()}
      </div>

      {/* Live region wrapper guidance from the pattern */}
      <div
        id={viewportId}
        style={styles.viewport}
        className={viewportClassName}
        aria-live={ariaLive}
        aria-atomic="false"
      >
        <div style={styles.track}>
          {normalized.map((s, i) => {
            const active = i === index

            // Slide roles per variant:
            // - Basic/Grouped: role="group" + aria-roledescription="slide"
            // - Tabs: role="tabpanel" and no aria-roledescription
            const role = pickerVariant === 'tabs' ? 'tabpanel' : 'group'

            const slideLabelProps =
              s.label != null ? { 'aria-label': s.label } : { 'aria-label': s.fallbackName } // “X of N” fallback

            return (
              <div
                key={i}
                id={slideId(i)}
                role={role}
                {...(pickerVariant === 'tabs' ? {} : { 'aria-roledescription': 'slide' })}
                {...slideLabelProps}
                aria-hidden={active ? 'false' : 'true'}
                inert={!active}
                tabIndex={pickerVariant === 'tabs' ? 0 : -1}
                style={styles.slide}
              >
                {s.content}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
