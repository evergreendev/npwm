import type { ArchiveBlock as ArchiveBlockProps, Exhibit, Post } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'
import { CMSLink } from '@/components/Link'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    relationTo,
    showArchiveLink,
    link,
  } = props

  const limit = limitFromProps || 3

  let posts: (Post | Exhibit)[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: relationTo || 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0 && (relationTo === 'posts' || !relationTo)
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs.map((doc) => ({
      ...doc,
      relationTo: relationTo || 'posts',
    })) as (Post | Exhibit)[]
  } else {
    if (selectedDocs?.length) {


      posts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') {
          return {
            ...post.value,
            relationTo: post.relationTo,
          }
        }
      }) as (Post | Exhibit)[]
    }
  }

  return (
    <div className="py-8 bg-dark-background text-white" id={id || undefined}>
      {introContent && (
        <div className="container mb-4">
          <RichText className="ms-0 max-w-3xl prose-h2:font-normal prose-h2:text-4xl prose-headings:mb-2" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={posts} />
      {showArchiveLink && link && (
        <div className="container flex justify-end mt-8">
          <CMSLink {...link} appearance="destructive" />
        </div>
      )}
    </div>
  )
}
