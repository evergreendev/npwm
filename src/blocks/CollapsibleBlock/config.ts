import type { Block } from 'payload'
import {
  lexicalEditor,
  HeadingFeature,
  InlineToolbarFeature,
  FixedToolbarFeature,
  BlocksFeature,
} from '@payloadcms/richtext-lexical'
import { MediaBlock } from '../MediaBlock/config'

export const CollapsibleBlock: Block = {
  slug: 'collapsibleBlock',
  interfaceName: 'CollapsibleBlock',
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            BlocksFeature({ blocks: [MediaBlock] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content (Visible when collapsed)',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Collapsible Sections',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
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
        },
        {
          name: 'images',
          type: 'array',
          label: 'Images (Max 2)',
          maxRows: 2,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: 'Collapsible Blocks',
    singular: 'Collapsible Block',
  },
}
