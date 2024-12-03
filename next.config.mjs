import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   images: {
      remotePatterns: [
         {
            protocol: 'http' || 'https',
            hostname: '**',
         },
      ],
   },

   sassOptions: {
      includePaths: [path.join(__dirname, './src/styles')],
      prependData: `@import "av";`,
   },
}

export default nextConfig
