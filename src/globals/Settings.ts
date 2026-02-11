import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site Ayarları',
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'Site Adı',
      defaultValue: 'Ahmetli Sosyal',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      label: 'Site Açıklaması',
      defaultValue: 'Ahmetli\'nin en güncel haber portalı',
    },
    {
      name: 'logo',
      type: 'upload',
      label: 'Site Logosu',
      relationTo: 'media',
    },
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Sosyal Medya',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter / X URL',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube URL',
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'İletişim Bilgileri',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'E-posta',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Telefon',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Adres',
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Footer',
      fields: [
        {
          name: 'copyright',
          type: 'text',
          label: 'Telif Hakkı Metni',
          defaultValue: '© 2024 Ahmetli Sosyal. Tüm hakları saklıdır.',
        },
        {
          name: 'about',
          type: 'textarea',
          label: 'Hakkımızda (Footer)',
        },
      ],
    },
    {
      name: 'adsense',
      type: 'group',
      label: 'Google AdSense',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'AdSense Aktif',
          defaultValue: false,
        },
        {
          name: 'clientId',
          type: 'text',
          label: 'AdSense Client ID',
          admin: {
            description: 'ca-pub-XXXXXXXX formatında',
          },
        },
      ],
    },
  ],
}
