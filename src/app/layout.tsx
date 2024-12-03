import { primaryFont, secondaryFont } from '@/settings/fonts/fonts'
import { homePageMetadata } from '@/settings/SEO/Metadata'
import '@styles/index.scss'
import type { Metadata } from 'next'

export const metadata: Metadata = homePageMetadata

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html className={`h-full`} lang="en">
         <body className={`${primaryFont.variable} ${secondaryFont.variable} h-full antialiased`}>{children}</body>
      </html>
   )
}
