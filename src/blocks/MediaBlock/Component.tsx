import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'

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
    captionClassName,
    className,
    enableGutter = true,
    fullWidth,
    imgClassName,
    media,
    staticImage,
    videoClassName,
    disableInnerContainer,
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
    >
      {(media || staticImage) && (
        <Media
          fill={fullWidth || false}
          className={cn({
            'h-screen relative': fullWidth,
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
              'h-screen w-full object-cover': fullWidth,
            },
            videoClassName,
          )}
        />
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
