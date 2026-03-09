import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'id',
      type: 'text',
      admin: {
        description: 'Used for anchor links',
        position: 'sidebar',
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'transcript',
      type: 'relationship',
      relationTo: 'transcripts',
      admin: {
        description: 'Optional transcript for the media',
      },
    },
    {
      name: 'fullWidth',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
