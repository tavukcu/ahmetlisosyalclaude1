import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Kullanıcı',
    plural: 'Kullanıcılar',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'createdAt'],
    description: 'Yönetim paneline erişim sağlayan kullanıcılar',
  },
  auth: true,
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Ad Soyad',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rol',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: '👑 Admin', value: 'admin' },
        { label: '✏️ Editör', value: 'editor' },
      ],
      admin: {
        description: 'Admin tüm işlemleri yapabilir. Editör sadece içerik ekleyip düzenleyebilir.',
      },
    },
  ],
}
