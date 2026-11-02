import type { GlobalConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { revalidateClosedForSeason } from './hooks/revalidateClosedForSeason'

export const ClosedForSeason: GlobalConfig = {
  slug: 'closed-for-season',
  label: 'Closed for Season',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'closedForSeason',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Replace all hours displays with the message below while enabled.',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      defaultValue: 'Closed for the season.',
      admin: {
        description: 'Shown everywhere hours normally appear. Line breaks are preserved.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateClosedForSeason],
  },
}
