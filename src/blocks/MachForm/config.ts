import type { Block } from 'payload'

export const MachForm: Block = {
  slug: 'machForm',
  interfaceName: 'MachFormBlock',
  fields: [
    {
      name: 'formType',
      type: 'select',
      required: true,
      defaultValue: 'employment',
      options: [
        {
          label: 'Application For Employment',
          value: 'employment',
        },
        {
          label: 'Group Reservations',
          value: 'reservations',
        },
      ],
    },
  ],
  labels: {
    plural: 'Mach Forms',
    singular: 'Mach Form',
  },
}
