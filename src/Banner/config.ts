import type { GlobalConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { revalidateBanner } from './hooks/revalidateBanner'

export const Banner: GlobalConfig = {
  slug: 'banner',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'banner_start',
          label: 'Banner Start Date',
          type: 'date',
          admin: {
            width: '49%',
          },
        },
        {
          name: 'banner_end',
          label: 'Banner End Date',
          type: 'date',
          admin: {
            width: '49%',
          },
        },
        {
          name: 'message',
          type: 'richText',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateBanner],
  },
}

