import type { Block } from 'payload'

export const Reviews: Block = {
  slug: 'reviewsBlock',
  interfaceName: 'ReviewsBlock',
  labels: {
    singular: 'Reviews',
    plural: 'Reviews',
  },
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
      name: 'headline',
      type: 'text',
    },
    {
      name: 'limit',
      type: 'number',
      min: 1,
      max: 24,
      defaultValue: 12,
      admin: {
        description: 'Maximum number of recent reviews to display',
      },
    },
  ],
}
