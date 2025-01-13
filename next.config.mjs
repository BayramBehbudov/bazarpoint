import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
   dest: "public",
});

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */


export default withPWA({

   reactStrictMode: false,
   images: {
      remotePatterns: [
         {
            protocol: 'http' || 'https',
            hostname: '**',
         },
      ],
      domains: ['res.cloudinary.com'],
   },

   sassOptions: {
      includePaths: [path.join(__dirname, './src/styles')],
      prependData: `@import "av";`,
   },
});


