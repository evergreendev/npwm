import type { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'videoBlock',
  interfaceName: 'VideoBlock',
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
      name: 'videoType',
      type: 'radio',
      options: [
        { label: 'Upload', value: 'upload' },
        { label: 'YouTube Link', value: 'link' },
      ],
      defaultValue: 'upload',
    },
    {
      name: 'videoUpload',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData.videoType === 'upload',
      },
    },
    {
      name: 'videoLink',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.videoType === 'link',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
