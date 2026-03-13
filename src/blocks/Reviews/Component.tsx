import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import RichText from '@/components/RichText'
import type { ReviewsBlock as ReviewsBlockProps } from '@/payload-types'
import Underline from '@/components/Underline'
import { Carousel } from '@/components/Carousel'

// Inline SVG logos for platforms
const PlatformLogo: React.FC<{ platform?: string; className?: string }> = ({
  platform,
  className,
}) => {
  const cls = className || 'h-5 w-5'
  switch (platform) {
    case 'facebook':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="#1877F2" aria-label="Facebook">
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.093 10.125 24v-8.44H7.078v-3.487h3.047V9.413c0-3.007 1.792-4.668 4.533-4.668 1.313 0 2.686.235 2.686.235v2.967h-1.514c-1.492 0-1.955.929-1.955 1.883v2.26h3.328l-.532 3.487h-2.796V24C19.612 23.093 24 18.1 24 12.073z" />
        </svg>
      )
    case 'google':
      return (
        <svg className={cls} viewBox="0 0 24 24" aria-label="Google">
          <path
            fill="#4285F4"
            d="M23.49 12.27c0-.85-.08-1.67-.24-2.47H12v4.68h6.44c-.28 1.5-1.12 2.77-2.39 3.62v3h3.86c2.26-2.08 3.58-5.15 3.58-8.83z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.86-3c-1.07.72-2.44 1.14-4.08 1.14-3.14 0-5.79-2.12-6.73-4.97H1.44v3.12C3.41 21.53 7.38 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.27 14.27c-.24-.72-.38-1.5-.38-2.27s.14-1.55.38-2.27V6.61H1.44A11.98 11.98 0 000 12c0 1.95.47 3.78 1.31 5.39l3.96-3.12z"
          />
          <path
            fill="#EA4335"
            d="M12 4.73c1.76 0 3.35.61 4.6 1.82l3.45-3.45C17.96 1.17 15.24 0 12 0 7.38 0 3.41 2.47 1.31 6.61l3.96 3.12C6.21 6.85 8.86 4.73 12 4.73z"
          />
        </svg>
      )
    case 'tripadvisor':
      return (
        <svg className={cls} viewBox="0 0 24 24" aria-label="TripAdvisor">
          <path
            fill="#00AF87"
            d="M12 4C6.48 4 2 7.58 2 12.5 2 16.09 4.41 19.15 8 20.5l-1.5 2.5L10 21c.65.09 1.32.14 2 .14s1.35-.05 2-.14l3.5 2-1.5-2.5c3.59-1.35 6-4.41 6-8 0-4.92-4.48-8.5-10-8.5z"
          />
          <circle cx="8.5" cy="12.5" r="3.5" fill="#FFF" />
          <circle cx="15.5" cy="12.5" r="3.5" fill="#FFF" />
          <circle cx="8.5" cy="12.5" r="1.5" />
          <circle cx="15.5" cy="12.5" r="1.5" />
        </svg>
      )
    case 'yelp':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="#D32323" aria-label="Yelp">
          <path d="M9.6 2.1c-.6-.2-1.3.2-1.5.8L6.7 8.3c-.2.6.2 1.3.8 1.5l2.6.8c.6.2 1.3-.2 1.5-.8l1.4-5.4c.2-.6-.2-1.3-.8-1.5L9.6 2.1zM3.2 9.6c-.6 0-1.1.5-1.1 1.1l.1 5.6c0 .6.5 1.1 1.1 1.1l2.7-.2c.6 0 1.1-.5 1.1-1.1l-.1-3.7c0-.6-.5-1.1-1.1-1.1L3.2 9.6zM8.8 19.6c-.5.3-.7 1-.4 1.6l2.5 2.8c.4.5 1.1.6 1.6.3l2.3-1.5c.5-.3.7-1 .4-1.6l-1.7-2.5c-.3-.5-1-.7-1.6-.4l-3.1 1.3zM20.7 8.7l-3.9 1.5c-.6.2-.9.9-.7 1.5l.8 2.4c.2.6.9.9 1.5.7l3.9-1.5c.6-.2.9-.9.7-1.5l-.8-2.4c-.2-.6-.9-.9-1.5-.7z" />
        </svg>
      )
    default:
      return null
  }
}

const Stars: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className} aria-hidden="true">
    <span className="sr-only">5 out of 5 stars</span>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className="inline h-4 w-4 text-yellow-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.293z" />
      </svg>
    ))}
  </div>
)

export const ReviewsBlock: React.FC<ReviewsBlockProps> = async ({ id, limit, headline }) => {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'reviews',
    depth: 0,
    sort: '-createdAt',
    limit: limit || 12,
  })

  return (
    <div className="bg-background py-12 px-8 relative" id={id || undefined}>
      <div className="relative max-w-5xl mx-auto">
        {headline && (
          <div className="md:mb-8">
            <h2 className="mb-4 text-2xl md:text-5xl text-light">{headline}</h2>
            <Underline />
          </div>
        )}
        <div className="relative">
          <Carousel
            className="pb-16 md:pb-0 md:px-16 relative"
            viewportClassName="max-w-prose mx-auto"
            controlsClassName="flex justify-between absolute md:top-1/2 md:translate-y-[-50%] bottom-0 z-10 w-full"
            slides={docs.map((review, idx) => (
              <article
                key={review.id || idx}
                className="snap-start shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-2">
                  {review.platform && (
                    <PlatformLogo platform={review.platform as string} className="h-5 w-5" />
                  )}
                  <span className="text-sm font-medium capitalize text-neutral-600">
                    {review.platform}
                  </span>
                </div>
                <div className="prose prose-sm max-w-none text-neutral-800">
                  <RichText data={review.content} enableGutter={false} className="ms-0" />
                </div>
                <div className="mt-4 text-sm font-semibold text-neutral-900">
                  {review.reviewerName}
                </div>
                <Stars className="mt-3" />
              </article>
            ))}
          />
        </div>
      </div>
    </div>
  )
}
