import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'Haber',
    plural: 'Haberler',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt', 'featured', 'viewCount'],
    description: 'Yayınlanan haberler ve taslaklar',
    listSearchableFields: ['title', 'summary'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Başlık',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL Slug',
      required: true,
      unique: true,
      admin: {
        description: 'URL\'de kullanılacak kısa ad (otomatik oluşturulur)',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/ğ/g, 'g')
                .replace(/ü/g, 'u')
                .replace(/ş/g, 's')
                .replace(/ı/g, 'i')
                .replace(/ö/g, 'o')
                .replace(/ç/g, 'c')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Özet',
      required: true,
      maxLength: 300,
      admin: {
        description: 'Haber kartlarında görünecek kısa özet (max 300 karakter)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'İçerik',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      label: 'Kapak Görseli',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      label: 'Kategori',
      relationTo: 'categories',
      required: true,
      hasMany: false,
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Etiketler',
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Etiket',
          required: true,
        },
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      label: 'Yazar',
      relationTo: 'users',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Durum',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Taslak', value: 'draft' },
        { label: 'Yayında', value: 'published' },
        { label: 'Arşivde', value: 'archived' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Öne Çıkan Haber',
      defaultValue: false,
      admin: {
        description: 'Ana sayfada büyük kart olarak gösterilsin mi?',
      },
    },
    {
      name: 'breakingNews',
      type: 'checkbox',
      label: 'Son Dakika',
      defaultValue: false,
      admin: {
        description: 'Son dakika bandında gösterilsin mi?',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Yayın Tarihi',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'viewCount',
      type: 'number',
      label: 'Görüntülenme',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Ayarları',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Başlık',
          admin: {
            description: 'Boş bırakılırsa haber başlığı kullanılır',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Açıklama',
          admin: {
            description: 'Boş bırakılırsa haber özeti kullanılır',
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.publishedAt && data.status === 'published') {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
}
