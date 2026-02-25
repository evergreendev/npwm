import type { Block } from 'payload'

export const ScrollingImageSection: Block = {
  slug: 'scrollingImageSection',
  interfaceName: 'ScrollingImageSection',
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'header',
      type: 'text',
    },
    {
      name: 'subheader',
      type: 'text',
    },
  ],
}
