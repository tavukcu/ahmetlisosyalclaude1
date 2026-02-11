import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { News } from './collections/News'
import { Ads } from './collections/Ads'
import { Polls } from './collections/Polls'
import { Settings } from './globals/Settings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isVercel = !!process.env.POSTGRES_URL

const getDbAdapter = () => {
  if (isVercel) {
    return vercelPostgresAdapter({
      pool: {
        connectionString: process.env.POSTGRES_URL,
      },
    })
  }
  return sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./database.db',
    },
  })
}

const getPlugins = () => {
  const plugins: any[] = []
  if (isVercel && process.env.BLOB_READ_WRITE_TOKEN) {
    const { vercelBlobStorage } = require('@payloadcms/storage-vercel-blob')
    plugins.push(
      vercelBlobStorage({
        collections: {
          media: true,
        },
        token: process.env.BLOB_READ_WRITE_TOKEN,
      }),
    )
  }
  return plugins
}

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — Ahmetli Sosyal',
    },
    components: {},
  },
  collections: [Users, Media, Categories, News, Ads, Polls],
  globals: [Settings],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: getDbAdapter(),
  sharp,
  plugins: getPlugins(),
})
