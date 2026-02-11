import type { CollectionConfig } from 'payload'

export const Polls: CollectionConfig = {
  slug: 'polls',
  labels: {
    singular: 'Anket',
    plural: 'Anketler',
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'active', 'totalVotes', 'endDate'],
    group: 'İçerik Yönetimi',
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      label: 'Soru',
      required: true,
    },
    {
      name: 'options',
      type: 'array',
      label: 'Seçenekler',
      required: true,
      minRows: 2,
      maxRows: 6,
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Seçenek Metni',
          required: true,
        },
        {
          name: 'votes',
          type: 'number',
          label: 'Oy Sayısı',
          defaultValue: 0,
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Aktif',
      defaultValue: true,
    },
    {
      name: 'totalVotes',
      type: 'number',
      label: 'Toplam Oy',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'Bitiş Tarihi',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
