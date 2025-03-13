import type { Metadata } from "next";
import "./globals.css";
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: "NextJs",
  description: "Estudos de NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="pt-10">
        <Header />
        {children}
      </body>
    </html>
  );
}
