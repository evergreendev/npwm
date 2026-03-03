import type { Block } from 'payload'
import { link } from '@/fields/link'

export const HoursAddressLinks: Block = {
  slug: 'hoursAddressLinks',
  interfaceName: 'HoursAddressLinksBlock',
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'address',
      type: 'textarea',
      defaultValue: '609 Hwy 16A\nKeystone, SD 57751',
      required: true,
    },
    {
        name: 'googleMapsUrl',
        type: 'text',
        defaultValue: 'https://maps.google.com/?cid=6124643482089815640&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAEYASAB&hl=en-US&source=embed',
        required: true,
    },
    {
      name: 'links',
      type: 'array',
      maxRows: 2,
      fields: [
        link({
          appearances: ['destructive', 'secondary'],
        }),
      ],
    },
  ],
}
