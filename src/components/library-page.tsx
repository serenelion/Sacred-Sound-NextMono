
'use client'

import { useEffect, useState } from 'react'
import { Card } from './ui/card'
import { Sidebar } from './sidebar'
import { MobileNav } from './mobile-nav'

interface ContentItem {
  id: string
  title: string
  artist: string
  artwork: string
}

export function LibraryPage() {
  const [newReleases, setNewReleases] = useState<ContentItem[]>([])
  const [featured, setFeatured] = useState<ContentItem[]>([])

  useEffect(() => {
    fetchLibraryContent()
  }, [])

  const fetchLibraryContent = async () => {
    try {
      const response = await fetch('/api/library/getContent')
      const data = await response.json()
      setNewReleases(data.newReleases)
      setFeatured(data.featured)
    } catch (error) {
      console.error('Error fetching library content:', error)
    }
  }

  return (
    <div className="flex h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      <main className="flex-1 p-6 pb-24 md:pb-6 overflow-y-auto">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">New Releases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {newReleases.map((item) => (
              <Card key={item.id} className="p-4">
                <img src={item.artwork} alt={item.title} className="w-full h-48 object-cover rounded-md" />
                <h3 className="mt-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.artist}</p>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Featured Content</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((item) => (
              <Card key={item.id} className="p-4">
                <img src={item.artwork} alt={item.title} className="w-full h-48 object-cover rounded-md" />
                <h3 className="mt-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.artist}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>
      
      <MobileNav />
    </div>
  )
}
