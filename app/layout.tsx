import './globals.css'
import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { exo2, inter } from './fonts';

export const metadata: Metadata = {
  title: 'Hugo Bessa',
  description: 'My live CV and repository of doings',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${exo2.variable}`}>
        {children}
        <ToastContainer position="top-center" />
      </body>
    </html>
  )
}
