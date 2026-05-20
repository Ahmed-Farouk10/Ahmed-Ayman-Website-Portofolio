import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LenisProvider from '@/components/ui/LenisProvider'
import { Toaster } from '@/components/ui/sonner'
import Chatbot from '@/components/ui/Chatbot'
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

export const metadata = {
  title: 'Ahmed Ayman Farouk | AI & Software Engineer',
  description: 'Portfolio of Ahmed Ayman Farouk - AI & Software Engineer specializing in Machine Learning and Full-Stack Web Development',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-carbon text-mercury-light">
        <LenisProvider>
          <Toaster />
          <Chatbot />
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}