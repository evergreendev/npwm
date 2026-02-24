import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { HoursBlock } from '@/blocks/HoursBlock/Component'
import { ScrollingImageSection } from '@/blocks/ScrollingImageSection/Component'
import { ReviewsBlock } from '@/blocks/Reviews/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  hoursBlock: HoursBlock,
  scrollingImageSection: ScrollingImageSection,
  reviewsBlock: ReviewsBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              const isScrollingSection = blockType === 'scrollingImageSection'

              if (!isScrollingSection) {
                return (
                  <div key={index}>
                    <Block {...block} disableInnerContainer />
                  </div>
                )
              }

              const hasPrevSection = blocks[index - 1]?.blockType === 'scrollingImageSection'
              const hasNextSection = blocks[index + 1]?.blockType === 'scrollingImageSection'
              {/* @ts-expect-error We know backgroundImage exists*/}
              const prevBackground = hasPrevSection ? blocks[index - 1].backgroundImage : null
              {/* @ts-expect-error We know backgroundImage exists*/}
              const nextBackground = hasNextSection ? blocks[index + 1].backgroundImage : null

              return (
                <div key={index}>
                  <Block
                    prevBackgroundImage={prevBackground}
                    nextBackgroundImage={nextBackground}
                    hasPrevSection={hasPrevSection}
                    hasNextSection={hasNextSection}
                    {...block}
                    disableInnerContainer
                  />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
