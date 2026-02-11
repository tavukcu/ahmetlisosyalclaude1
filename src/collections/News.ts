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
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SITE_URL || ''}/haber/${data?.slug || ''}`,
    },
    preview: (data) =>
      `${process.env.NEXT_PUBLIC_SITE_URL || ''}/haber/${(data as any)?.slug || ''}`,
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    // ── Ana İçerik ──
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
        description: 'URL\'de kullanılacak kısa ad (başlıktan otomatik oluşturulur)',
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
        description: 'Haber kartlarında ve sosyal medya paylaşımlarında görünecek kısa özet (max 300 karakter)',
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
      admin: {
        description: 'Önerilen boyut: 1200x630px (16:9 oran)',
      },
    },

    // ── Sınıflandırma ──
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'relationship',
          label: 'Kategori',
          relationTo: 'categories',
          required: true,
          hasMany: false,
          admin: { width: '50%' },
        },
        {
          name: 'author',
          type: 'relationship',
          label: 'Yazar',
          relationTo: 'users',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Etiketler',
      admin: {
        description: 'Arama ve ilgili haberler için kullanılır',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Etiket',
          required: true,
        },
      ],
    },

    // ── Yayın Ayarları ──
    {
      name: 'status',
      type: 'select',
      label: 'Durum',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: '📝 Taslak', value: 'draft' },
        { label: '✅ Yayında', value: 'published' },
        { label: '📦 Arşivde', value: 'archived' },
      ],
      admin: {
        description: 'Sadece "Yayında" haberler sitede görünür',
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
        description: 'Boş bırakılırsa ilk yayına alındığında otomatik doldurulur',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'featured',
          type: 'checkbox',
          label: '⭐ Öne Çıkan',
          defaultValue: false,
          admin: {
            description: 'Ana sayfada büyük kart olarak gösterilsin mi?',
            width: '50%',
          },
        },
        {
          name: 'breakingNews',
          type: 'checkbox',
          label: '🔴 Son Dakika',
          defaultValue: false,
          admin: {
            description: 'Son dakika bandında gösterilsin mi?',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'viewCount',
      type: 'number',
      label: 'Görüntülenme Sayısı',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Haber detay sayfası ziyaret edildiğinde otomatik artar',
      },
    },

    // ── SEO ──
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Ayarları',
      admin: {
        description: 'Boş bırakılırsa başlık ve özet otomatik kullanılır',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Başlık',
          admin: {
            description: 'Tarayıcı sekmesi ve arama sonuçları için başlık (önerilen: 50-60 karakter)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Açıklama',
          admin: {
            description: 'Arama sonuçlarında gösterilen açıklama (önerilen: 150-160 karakter)',
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
