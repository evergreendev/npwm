'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef, useState } from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName, controls, placeholder } = props

  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      const handlePlaying = () => {
        setVideoReady(true)
      }
      video.addEventListener('playing', handlePlaying)
      // If video is already playing (e.g. from cache or autoPlay already kicked in)
      if (!video.paused) {
        setVideoReady(true)
      }
      return () => {
        video.removeEventListener('playing', handlePlaying)
      }
    }
  }, [])

  if (resource && typeof resource === 'object') {
    const { filename } = resource
    const posterUrl =
      placeholder && typeof placeholder === 'object'
        ? getMediaUrl(`/media/${placeholder.filename}`)
        : undefined

    return (
      <div className="relative w-full h-full overflow-hidden">
        <video
          autoPlay={!controls}
          className={cn(videoClassName, 'transition-opacity duration-1000', {
            'opacity-0': !videoReady && !posterUrl,
            'opacity-100': videoReady || posterUrl,
          })}
          controls={controls}
          loop={!controls}
          muted={!controls}
          onClick={onClick}
          onContextMenu={(e) => (controls ? undefined : e.preventDefault())}
          playsInline
          poster={posterUrl}
          ref={videoRef}
        >
          <source src={getMediaUrl(`/media/${filename}`)} type={resource.mimeType || undefined} />
        </video>
        {posterUrl && (
          <div
            className={cn(
              'absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 pointer-events-none',
              videoReady ? 'opacity-0' : 'opacity-100',
              videoClassName,
            )}
            style={{ backgroundImage: `url(${posterUrl})` }}
          />
        )}
      </div>
    )
  }

  return null
}
