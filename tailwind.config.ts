import type { Config } from 'tailwindcss'

const config: Config = {
   darkMode: ['class', 'class'],
   content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
   theme: {
      extend: {
         colors: {
            background: 'var(--background)',
            foreground: 'var(--foreground)',
         },
         borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)',
         },
      },
   },
   plugins: [require('tailwindcss-animated'), require('tailwindcss-animate')],
}
export default config
