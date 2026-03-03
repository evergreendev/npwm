import type { Block } from 'payload'

export const UnderlineBlock: Block = {
  slug: 'underline',
  interfaceName: 'UnderlineBlock',
  fields: [
    {
      name: 'color',
      type: 'select',
      defaultValue: 'default',
      options: [
        {
          label: 'Default (Red)',
          value: 'default',
        },
        {
          label: 'Yellow',
          value: 'yellow',
        },
      ],
    },
    {
      name: 'direction',
      type: 'select',
      defaultValue: 'right',
      options: [
        {
          label: 'To Right',
          value: 'right',
        },
        {
          label: 'To Left',
          value: 'left',
        },
      ],
    },
    {
      name: 'fullWidth',
      type: 'checkbox',
      label: 'Full Width (Go to edge of screen)',
      defaultValue: false,
    },
    {
      name: 'light',
      type: 'checkbox',
      label: 'Light Version (Fade to white)',
      defaultValue: false,
    },
  ],
}
