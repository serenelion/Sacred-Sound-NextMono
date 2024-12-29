
'use client'

import { useEffect, useState } from 'react'
import { Card } from './ui/card'
import { Sidebar } from './sidebar'
import { MobileNav } from './mobile-nav'
import { SwipeComponent } from './swipe-component'

interface ContentItem {
  id: string
  title: string
  artist: string
  artwork: string
}

export function LibraryPage() {
  const { isArtist } = useAuth()
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
          <SwipeComponent title="New Releases">
            {newReleases.map((item) => (
              <Card key={item.id} className="p-4 min-w-[280px] md:min-w-[320px]">
                <img src={item.artwork} alt={item.title} className="w-full h-48 object-cover rounded-md" />
                <h3 className="mt-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.artist}</p>
              </Card>
            ))}
          </SwipeComponent>
        </section>

        <section>
          <SwipeComponent title="Featured Content">
            {featured.map((item) => (
              <Card key={item.id} className="p-4 min-w-[280px] md:min-w-[320px]">
                <img src={item.artwork} alt={item.title} className="w-full h-48 object-cover rounded-md" />
                <h3 className="mt-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.artist}</p>
              </Card>
            ))}
          </SwipeComponent>
        </section>
      </main>
      
      <MobileNav />
    </div>
  )
}
