
'use client'

import { useState } from 'react'
import { Sidebar } from './sidebar'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main className={`flex-1 transition-all duration-200 ${isSidebarOpen ? 'md:ml-[240px]' : 'ml-0'} p-6`}>
        <div className="max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
