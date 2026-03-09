import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import Link from 'next/link'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  videoClassName?: string
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    id,
    captionClassName,
    className,
    enableGutter = true,
    fullWidth,
    imgClassName,
    media,
    staticImage,
    videoClassName,
    disableInnerContainer,
    transcript,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter && !fullWidth,
        },
        className,
      )}
      id={id || undefined}
    >
      {(media || staticImage) && (
        <Media
          fill={fullWidth || false}
          className={cn({
            'h-[66vw] relative': fullWidth,
          })}
          imgClassName={cn(
            '',
            {
              'object-cover': fullWidth,
            },
            imgClassName,
          )}
          resource={media}
          src={staticImage}
          videoClassName={cn(
            '',
            {
              'h-[66vw] w-full object-cover': fullWidth,
            },
            videoClassName,
          )}
          controls={true}
        />
      )}
      {transcript && typeof transcript === 'object' && (
        <div
          className={cn('mt-4', {
            container: !disableInnerContainer,
          })}
        >
          <Link
            href={`/transcripts/${transcript.slug}`}
            className="text-sm underline hover:text-primary transition-colors"
            aria-label={`Read transcript for ${
              (media && typeof media === 'object' && media.alt) || 'this media'
            }`}
          >
            Read Transcript
          </Link>
        </div>
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
