import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Kategori',
    plural: 'Kategoriler',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Kategori Adı',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL Slug',
      required: true,
      unique: true,
      admin: {
        description: 'URL\'de kullanılacak kısa ad (örn: gundem, spor, ekonomi)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Açıklama',
    },
    {
      name: 'color',
      type: 'text',
      label: 'Renk Kodu',
      admin: {
        description: 'Kategori badge rengi (örn: #0E4D3D)',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sıralama',
      defaultValue: 0,
      admin: {
        description: 'Menüdeki sıralama (küçükten büyüğe)',
      },
    },
  ],
}
