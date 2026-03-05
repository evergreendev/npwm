'use client'

import { cn } from '@/utilities/ui'
import React from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const AudioMedia: React.FC<MediaProps> = (props) => {
  const { resource, className } = props

  if (resource && typeof resource === 'object') {
    const { filename } = resource

    return (
      <audio
        controls
        className={cn('w-full', className)}
      >
        <source src={getMediaUrl(`/media/${filename}`)} type={resource.mimeType || undefined} />
        Your browser does not support the audio element.
      </audio>
    )
  }

  return null
}
