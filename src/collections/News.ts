import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'Haber',
    plural: 'Haberler',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt', 'featured'],
    group: 'İçerik Yönetimi',
    listSearchableFields: ['title', 'summary'],
    description: 'Haber oluşturun, düzenleyin ve yayınlayın.',
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Haber İçeriği',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Başlık',
              required: true,
              admin: {
                description: 'Haberin ana başlığı',
              },
            },
            {
              name: 'slug',
              type: 'text',
              label: 'URL Slug',
              required: true,
              unique: true,
              admin: {
                description: 'URL\'de kullanılacak kısa ad (otomatik oluşturulur)',
                position: 'sidebar',
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
          ],
        },
        {
          label: 'Medya & Kategori',
          fields: [
            {
              name: 'coverImage',
              type: 'upload',
              label: 'Kapak Görseli',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Haber kartı ve detay sayfası için kapak görseli',
              },
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
              admin: {
                description: 'Haber ile ilgili anahtar kelimeler',
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
            {
              name: 'author',
              type: 'relationship',
              label: 'Yazar',
              relationTo: 'users',
            },
          ],
        },
        {
          label: 'Yayın Ayarları',
          fields: [
            {
              type: 'row',
              fields: [
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
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'publishedAt',
                  type: 'date',
                  label: 'Yayın Tarihi',
                  admin: {
                    width: '33%',
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
                    width: '33%',
                    readOnly: true,
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'featured',
                  type: 'checkbox',
                  label: 'Öne Çıkan Haber',
                  defaultValue: false,
                  admin: {
                    description: 'Ana sayfada büyük kart olarak gösterilsin mi?',
                    width: '50%',
                  },
                },
                {
                  name: 'breakingNews',
                  type: 'checkbox',
                  label: 'Son Dakika',
                  defaultValue: false,
                  admin: {
                    description: 'Son dakika bandında gösterilsin mi?',
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: '',
              admin: {
                hideGutter: true,
              },
              fields: [
                {
                  name: 'metaTitle',
                  type: 'text',
                  label: 'Meta Başlık',
                  admin: {
                    description: 'Boş bırakılırsa haber başlığı kullanılır (önerilen: 50-60 karakter)',
                  },
                },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  label: 'Meta Açıklama',
                  admin: {
                    description: 'Boş bırakılırsa haber özeti kullanılır (önerilen: 150-160 karakter)',
                  },
                },
              ],
            },
          ],
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
