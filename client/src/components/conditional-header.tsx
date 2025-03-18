'use client'

import { usePathname } from 'next/navigation'
import { Header } from './header'

export function ConditionalHeader() {
  const pathname = usePathname()
  const hiddenPaths = ['/login', '/dashboard']

  if (pathname && hiddenPaths.some(path => pathname.startsWith(path))) return null

  return <Header />
}