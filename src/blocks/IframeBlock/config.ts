import type { Block } from 'payload'

export const Iframe: Block = {
  slug: 'iframe',
  interfaceName: 'IframeBlock',
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
      name: 'src',
      type: 'text',
      required: true,
      label: 'Source URL',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Iframe Title (for accessibility)',
    },
    {
      name: 'height',
      type: 'number',
      label: 'Height (px)',
      defaultValue: 450,
    },
    {
      name: 'allowFullScreen',
      type: 'checkbox',
      label: 'Allow Full Screen',
      defaultValue: true,
    },
    {
      name: 'frameBorder',
      type: 'number',
      label: 'Frame Border',
      defaultValue: 0,
    },
  ],
}
