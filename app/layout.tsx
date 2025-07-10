import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ogadda Dashboard',
  description: 'A cozy space for college students to connect and chat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Serif:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-gradient-to-br from-[#fff5f2] via-[#faede4] to-[#fbeee0] min-h-screen text-[#593A27]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
} 