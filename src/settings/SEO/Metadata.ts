import { Metadata, Viewport } from 'next'


const APP_NAME = "Point App";
const APP_DEFAULT_TITLE = "Bazar.com Təyinat Nöqtəsi";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Bu app sifarişləri aiddiyyatı üzrə qruplaşdırmaq üçün istifadə edilir";

const homePageMetadata: Metadata = {
   applicationName: APP_NAME,
   title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
   },
   description: APP_DESCRIPTION,
   manifest: '/manifest.json',
   appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: APP_DEFAULT_TITLE,
      // startUpImage: [],
   },
   formatDetection: {
      telephone: false,
   },
   openGraph: {
      type: 'website',
      siteName: APP_NAME,
      title: {
         default: APP_DEFAULT_TITLE,
         template: APP_TITLE_TEMPLATE,
      },
      description: APP_DESCRIPTION,
   },
   twitter: {
      card: 'summary',
      title: {
         default: APP_DEFAULT_TITLE,
         template: APP_TITLE_TEMPLATE,
      },
      description: APP_DESCRIPTION,
   },
}

export const viewport: Viewport = {
   themeColor: '#FFFFFF',
}
export { homePageMetadata }
