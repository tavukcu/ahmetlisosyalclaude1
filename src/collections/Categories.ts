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
      type: 'select',
      label: 'Renk',
      defaultValue: '#0E4D3D',
      options: [
        { label: '🟢 Orman Yeşili (Gündem)', value: '#0E4D3D' },
        { label: '🟢 Açık Yeşil (Tarım)', value: '#16a34a' },
        { label: '🔴 Kırmızı (Spor)', value: '#dc2626' },
        { label: '🟣 Mor (Yaşam)', value: '#7c3aed' },
        { label: '🟠 Turuncu (Kültür)', value: '#ea580c' },
        { label: '🔵 Mavi (Ekonomi)', value: '#0891b2' },
        { label: '🔵 Koyu Mavi (Eğitim)', value: '#2563eb' },
        { label: '🩷 Pembe (Sağlık)', value: '#db2777' },
        { label: '⚫ Koyu Gri (Diğer)', value: '#374151' },
      ],
      admin: {
        description: 'Kategori badge rengi',
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
