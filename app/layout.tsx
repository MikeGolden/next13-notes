import './globals.css'
import type { Metadata } from 'next'
import { Inter, Open_Sans } from 'next/font/google'
import Link from 'next/link'
import AuthProvider from './AuthProvider';
import NavMenu from '@/app/NavMenu';
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })
const myFont = Open_Sans({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Note taking app, social media and chat app',
  description: 'Welcome to hextjs hell',
}

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <AuthProvider>
            <NavMenu />
            <main>{children}</main>
          </AuthProvider>
          <Providers>{children}</Providers>
          <footer>
            <p>
              Created for the{' '}
              <Link href="https://fireship.io">
                Fireship Next.js 13 Full Course
              </Link>
            </p>
            <ul>
              <li>
                <Link href={'/about'}>About</Link>
              </li>{' '}
              |
              <li>
                <Link href={'https://www.youtube.com/@Fireship'}>
                  YouTube
                </Link>
              </li>{' '}
              |
              <li>
                <Link href={'/login'}>Source Code</Link>
              </li>{' '}
              |
              <li>
                <Link href={'https://nextjs.org'}>NextJS Docs</Link>
              </li>
            </ul>
          </footer>
        </div>
      </body>
    </html>
  )
}
