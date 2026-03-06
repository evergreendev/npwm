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
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'mediaLabel',
      type: 'text',
    },
    {
      name: 'transcript',
      type: 'relationship',
      relationTo: 'transcripts',
      admin: {
        description: 'Optional transcript for the media',
      },
    },
  ],
}
