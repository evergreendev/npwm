import React from 'react'

export type IframeBlockProps = {
  id?: string
  src: string
  title: string
  height?: number
  allowFullScreen?: boolean
  frameBorder?: number
}

export const IframeBlock: React.FC<IframeBlockProps> = ({
  id,
  src,
  title,
  height = 450,
  allowFullScreen = true,
  frameBorder = 0,
}) => {
  return (
    <div className="w-full my-6" id={id || undefined}>
      <iframe
        src={src}
        title={title}
        height={height}
        style={{ border: frameBorder, width: '100%' }}
        allowFullScreen={allowFullScreen}
        className="w-full"
      />
    </div>
  )
}
