import type { LatestBlogBlock as LatestBlogBlockType, Post } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { formatDate } from '@/utilities/formatDate'

export const LatestBlogBlock: React.FC<
  LatestBlogBlockType & {
    id?: string
  }
> = async (props) => {
  const { id, headline, showArchiveLink, link } = props

  const payload = await getPayload({ config: configPromise })

  // Get latest post
  const fetchedPosts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 1,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  const latestPost = fetchedPosts.docs[0] as Post

  if (!latestPost) return null

  // Helper to extract a snippet from lexical content if needed.
  // But for now, let's see if we can use meta description or just a placeholder.
  const excerpt = latestPost.meta?.description || ''

  return (
    <div className="py-16 text-white bg-dark-background" id={`block-${id}`}>
      <div className="container">
        {headline && (
          <h2 className="font-montserrat text-4xl font-normal mb-12">
            {headline}
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-square overflow-hidden">
            {latestPost.heroImage && typeof latestPost.heroImage === 'object' && (
              <Media resource={latestPost.heroImage} fill className="w-full h-full" />
            )}
          </div>

          <div className="flex flex-col justify-between relative">
            <div>
              <h3 className="text-3xl font-bold mb-2 uppercase">{latestPost.title}</h3>
              <p className="text-sm text-gray-400 mb-4">
                {latestPost.publishedAt ? formatDate(latestPost.publishedAt) : ''}
              </p>
              <p className="text-base leading-relaxed line-clamp-4 text-gray-300">{excerpt}</p>
            </div>

            <div className="flex flex-col items-end gap-4 mt-8">
              <CMSLink
                type="reference"
                reference={{
                  relationTo: 'posts',
                  value: latestPost,
                }}
                label="Read More"
                appearance="destructive"
              />

              {showArchiveLink && link && (
                <CMSLink
                  {...link}
                  appearance="default"
                  className="text-white transition-colors bg-[#23364e]"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
