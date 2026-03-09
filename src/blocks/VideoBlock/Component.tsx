'use client'

import React, { useState } from 'react'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import type { VideoBlock as VideoBlockProps } from '@/payload-types'

export const VideoBlock: React.FC<VideoBlockProps & { className?: string }> = (props) => {
  const { id, videoType, videoUpload, videoLink, thumbnail, className } = props
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const getYoutubeID = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  return (
    <div className={cn('container my-4', className)} id={id || undefined}>
      <div className="relative aspect-video bg-black rounded-xl overflow-hidden group">
        {!isPlaying ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer" onClick={handlePlay}>
            {thumbnail && typeof thumbnail === 'object' && (
              <Media
                resource={thumbnail}
                fill
                imgClassName="object-cover w-full h-full"
              />
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="relative z-20 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center rounded-full bg-red-600/40 border-4 border-white/30 group-hover:bg-red-600/60 transition-all transform group-hover:scale-110">
              <svg
                className="w-8 h-8 md:w-12 md:h-12 text-white fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0">
            {videoType === 'upload' && videoUpload && typeof videoUpload === 'object' && (
              <Media
                resource={videoUpload}
                fill
                videoClassName="w-full h-full object-cover"
              />
            )}
            {videoType === 'link' && videoLink && (
              <iframe
                src={`https://www.youtube.com/embed/${getYoutubeID(videoLink)}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
