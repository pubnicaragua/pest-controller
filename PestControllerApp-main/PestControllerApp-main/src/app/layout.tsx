import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { toastOptions } from '@/libs/toast'
import { SessionProvider } from '@/contexts/session'
import AuthRedirect from '@/constants/authRedirect'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import Layout from '@/components/layout'
import { Rubik } from 'next/font/google'
import locale from 'dayjs/locale/es'

dayjs.locale(locale)
dayjs.extend(utc)

export const metadata: Metadata = {
  title: 'Pest Controller',
  description: 'Pest Controller App',
}

export const viewport: Viewport = {
  themeColor: { color: '#010a01' },
}

const rubik = Rubik({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: JSX.Element
}>) {
  return (
    <html lang="en">
      <head>
        {/* Over HTTPS */}
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={rubik.className}>
        <SessionProvider>
          <AuthRedirect>
            <Layout>{children}</Layout>
          </AuthRedirect>
        </SessionProvider>
        <Toaster position="bottom-right" toastOptions={toastOptions} />
      </body>
    </html>
  )
}
