import localFont from 'next/font/local'

const primaryFont = localFont({
   src: './GeistVF.woff',
   variable: '--font-geist-sans',
   weight: '100 900',
})
const secondaryFont = localFont({
   src: './GeistMonoVF.woff',
   variable: '--font-geist-mono',
   weight: '100 900',
})

export { primaryFont, secondaryFont }

