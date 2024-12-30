
'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from './sidebar'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
