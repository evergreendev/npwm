import type { Block } from 'payload'

export const HoursBlock: Block = {
  slug: 'hoursBlock',
  interfaceName: 'HoursBlock',
  fields: [
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
