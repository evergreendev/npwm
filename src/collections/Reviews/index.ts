import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { MediaBlock } from '@/blocks/MediaBlock/config'

export const Reviews: CollectionConfig<'reviews'> = {
  slug: 'reviews',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'reviewerName',
    defaultColumns: ['reviewerName', 'platform', 'updatedAt'],
  },
  fields: [
    {
      name: 'reviewerName',
      type: 'text',
      required: true,
      label: 'Reviewer Name',
    },
    {
      name: 'platform',
      type: 'select',
      label: 'Platform',
      required: false,
      options: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Google', value: 'google' },
        { label: 'TripAdvisor', value: 'tripadvisor' },
        { label: 'Yelp', value: 'yelp' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Review Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            BlocksFeature({ blocks: [MediaBlock] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      required: true,
    },
  ],
}
