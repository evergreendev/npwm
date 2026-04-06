import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const serverUrl = new URL(NEXT_PUBLIC_SERVER_URL);
const urls = [NEXT_PUBLIC_SERVER_URL];

if (!serverUrl.hostname.startsWith('www.')) {
  const wwwUrl = new URL(NEXT_PUBLIC_SERVER_URL);
  wwwUrl.hostname = `www.${wwwUrl.hostname}`;
  urls.push(wwwUrl.toString());
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...urls.map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
