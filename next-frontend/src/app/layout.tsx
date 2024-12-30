import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/contexts/auth-context'
import { PlayerProvider } from '@/contexts/player-context'; // Assuming this is where the copied context lives
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <PlayerProvider> {/* Added PlayerProvider */}
            {children}
          </PlayerProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}