import type { CollectionConfig } from 'payload'

export const Ads: CollectionConfig = {
  slug: 'ads',
  labels: {
    singular: 'Reklam',
    plural: 'Reklamlar',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'position', 'active', 'startDate', 'endDate', 'clicks'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Reklam Adı',
      required: true,
    },
    {
      name: 'position',
      type: 'select',
      label: 'Konum',
      required: true,
      options: [
        { label: 'Header Altı Banner (728x90)', value: 'header-banner' },
        { label: 'Sidebar (300x250)', value: 'sidebar' },
        { label: 'Haber İçi (970x250)', value: 'in-article' },
        { label: 'Mobil Banner (320x100)', value: 'mobile-banner' },
        { label: 'Footer Üstü Banner', value: 'footer-banner' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Reklam Görseli',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      label: 'Tıklama Linki',
      required: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Aktif',
      defaultValue: true,
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Başlangıç Tarihi',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
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
    {
      name: 'clicks',
      type: 'number',
      label: 'Tıklama Sayısı',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'impressions',
      type: 'number',
      label: 'Gösterim Sayısı',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
  ],
}
