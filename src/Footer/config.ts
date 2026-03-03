import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'facebook',
      type: 'text',
      label: 'Facebook URL',
    },
    {
      name: 'instagram',
      type: 'text',
      label: 'Instagram URL',
    },
    {
      name: 'youtube',
      type: 'text',
      label: 'YouTube URL',
    },
    link({
      appearances: false,
      overrides: {
        name: 'rightLink',
      },
    }),
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
