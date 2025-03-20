import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { ConditionalHeader } from '@/components/conditional-header'
import { AuthProvider } from '@/context/AuthContext';


export const metadata: Metadata = {
  title: 'Loja XPTO',
  description: 'Loja Digital',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50">
        <AuthProvider>
          <Toaster position="bottom-right" />
          <ConditionalHeader />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}