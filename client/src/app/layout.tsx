import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { ConditionalHeader } from '@/components/conditional-header'

export const metadata: Metadata = {
  title: 'Restaurante XPTO',
  description: 'Cardápio Digital',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50">
        <Toaster position="bottom-right" />
        <ConditionalHeader />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}