'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Card } from './ui/card'
import { Sidebar } from './sidebar'

import { SwipeComponent } from './swipe-component'

interface ContentItem {
  id: string
  title: string
  artist: string
  artwork: string
}

export function LibraryPage() {
  const { userEmail, isArtist } = useAuth()
  const [newReleases, setNewReleases] = useState<ContentItem[]>([])
  const [featured, setFeatured] = useState<ContentItem[]>([])

  useEffect(() => {
    console.log('Current user email:', userEmail)
    console.log('Is artist:', isArtist)
    fetchLibraryContent()
  }, [userEmail])

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
      <div className="hidden md:block w-64"> {/* Added width for sidebar */}
        <Sidebar />
      </div>
      
      <main className="flex-1 p-6 pb-24 md:pb-6 overflow-y-auto"> {/*flex-1 ensures it takes remaining space*/}
        <section className="mb-8">
          <SwipeComponent title="New Releases">
            {newReleases.map((item) => (
              <Link href={`/artist/${item.artist.toLowerCase().replace(/\s+/g, '-')}`} key={item.id}>
                <Card className="p-4 min-w-[280px] md:min-w-[320px] hover:shadow-lg transition-shadow">
                  <img src={item.artwork} alt={item.title} className="w-full h-48 object-cover rounded-md" />
                  <h3 className="mt-2 font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600 hover:text-[#434289] hover:underline cursor-pointer">
                    {item.artist}
                  </p>
                </Card>
              </Link>
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