
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { SwipeComponent } from '@/components/swipe-component'
import { Card } from '@/components/ui/card'

interface Content {
  id: string
  title: string
  artwork: string
  type: 'audio' | 'video'
}

interface ArtistProfile {
  name: string
  bio: string
  avatar: string
  banner: string
}

export default function ArtistChannel() {
  const { id } = useParams()
  const [profile, setProfile] = useState<ArtistProfile | null>(null)
  const [content, setContent] = useState<Content[]>([])

  useEffect(() => {
    setProfile({
      name: "Artist Name",
      bio: "Artist bio and description goes here...",
      avatar: "/placeholder.svg",
      banner: "/placeholder.svg"
    })
    
    setContent([
      {
        id: "1",
        title: "Track 1",
        artwork: "/placeholder.svg",
        type: "audio"
      }
    ])
  }, [id])

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full">
      <main className="flex-1 p-6 pb-24 md:pb-6 overflow-y-auto">
        <div className="mb-8">
          <div className="h-48 w-full bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${profile.banner})` }} />
          <div className="flex items-center gap-4 -mt-12 px-4">
            <img src={profile.avatar} alt={profile.name} className="w-24 h-24 rounded-full border-4 border-white" />
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-gray-600">{profile.bio}</p>
            </div>
          </div>
        </div>

        <SwipeComponent title="Latest Releases">
          {content.map((item) => (
            <Card key={item.id} className="p-4 min-w-[280px] md:min-w-[320px]">
              <img src={item.artwork} alt={item.title} className="w-full h-48 object-cover rounded-md" />
              <h3 className="mt-2 font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.type}</p>
            </Card>
          ))}
        </SwipeComponent>
      </main>
    </div>
  )
}
