import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Medya',
    plural: 'Medya',
  },
  upload: {
    staticDir: '../public/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1280,
        height: 720,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  admin: {
    description: 'Haberlerde kullanılan görseller ve dosyalar. Yüklenen görseller otomatik olarak thumbnail, card ve hero boyutlarına dönüştürülür.',
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alternatif Metin (SEO)',
      required: true,
      admin: {
        description: 'Görseli tanımlayan kısa metin. SEO ve erişilebilirlik için önemlidir.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Açıklama / Kaynak',
      admin: {
        description: 'Görselin kaynağı veya fotoğrafçı bilgisi (isteğe bağlı)',
      },
    },
  ],
}
