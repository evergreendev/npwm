import type { Block } from 'payload'
import { link } from '@/fields/link'

export const Carousel: Block = {
  slug: 'carousel',
  interfaceName: 'CarouselBlock',
  fields: [
    {
      name: 'slides',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'hasLink',
          type: 'checkbox',
          defaultValue: false,
          label: 'Add Link',
        },
        link({
          appearances: false,
          overrides: {
            admin: {
              condition: (_, siblingData) => siblingData?.hasLink,
            },
          },
        }),
      ],
    },
  ],
}
