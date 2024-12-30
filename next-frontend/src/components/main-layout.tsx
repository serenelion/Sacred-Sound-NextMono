
'use client'

import { useState } from 'react'
import { Sidebar } from './sidebar'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main className="flex-1 ml-0 md:ml-[240px] p-4">
        {children}
      </main>
    </div>
  )
}
