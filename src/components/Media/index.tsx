import React, { Fragment } from 'react'

import type { Props } from './types'

import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'
import { AudioMedia } from './AudioMedia'

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource } = props

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const isAudio = typeof resource === 'object' && resource?.mimeType?.includes('audio')
  const Tag = htmlElement || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? (
        <VideoMedia {...props} />
      ) : isAudio ? (
        <AudioMedia {...props} />
      ) : (
        <ImageMedia {...props} />
      )}
    </Tag>
  )
}
