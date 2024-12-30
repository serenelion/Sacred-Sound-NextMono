
"use client"

import { useState } from 'react'
import { Sidebar } from '../sidebar'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MediaPlayer } from '../player/media-player'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="relative min-h-screen">
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      
      <div className={cn(
        "fixed top-0 left-0 h-full z-40 transition-transform duration-300 md:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Sidebar />
      </div>

      <main className={cn(
        "min-h-screen transition-all duration-300 md:pl-[240px]"
      )}>
        {children}
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <MediaPlayer />
      </div>
    </div>
  )
}
