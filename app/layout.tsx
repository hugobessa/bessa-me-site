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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} ${exo2.variable}`}>
        {/* Applies a stored theme choice before the page paints, so a reader who
            picked light doesn't get a frame of dark first. Runs synchronously,
            ahead of any React work. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t}}catch(e){}`,
          }}
        />
        {children}
        <ToastContainer position="top-center" />
      </body>
    </html>
  )
}
