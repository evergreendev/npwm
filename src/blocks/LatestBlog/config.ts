import type { Block } from 'payload'
import { link } from '@/fields/link'

export const LatestBlog: Block = {
  slug: 'latestBlog',
  interfaceName: 'LatestBlogBlock',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Headline',
    },
    {
      name: 'showArchiveLink',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show Archive Link',
    },
    link({
      appearances: false,
      overrides: {
        admin: {
          condition: (_, siblingData) => siblingData.showArchiveLink,
        },
      },
    }),
  ],
  labels: {
    plural: 'Latest Blogs',
    singular: 'Latest Blog',
  },
}
