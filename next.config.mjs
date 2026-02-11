import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  typescript: {
    // PayloadCMS 3.x auto-generated route handlers have type mismatches with Next.js 15.5+
    ignoreBuildErrors: true,
  },

}

export default withPayload(nextConfig)
