import type { Block } from 'payload'

export const HoursBlock: Block = {
  slug: 'hoursBlock',
  interfaceName: 'HoursBlock',
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
      name: 'mode',
      type: 'select',
      defaultValue: 'current',
      options: [
        {
          label: 'Current Hours',
          value: 'current',
        },
        {
          label: 'All Hours (Current & Future)',
          value: 'all',
        },
      ],
      required: true,
    },
  ],
}
