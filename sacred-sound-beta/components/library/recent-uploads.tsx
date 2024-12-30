'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useRef, useState } from "react"
import Image from "next/image"
import { usePlayer } from "@/contexts/player-context"

const recentContent = [
  {
    id: 1,
    title: "Morning Meditation",
    artist: "Sacred Sounds Studio",
    type: "Meditation",
    duration: "15:00",
    coverUrl: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    title: "Temple Bells",
    artist: "Divine Resonance",
    type: "Ambient",
    duration: "12:30",
    coverUrl: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    title: "Sacred Chants Vol. 1",
    artist: "Bhakti Collective",
    type: "Kirtan",
    duration: "18:45",
    coverUrl: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 4,
    title: "Healing Mantras",
    artist: "Sacred Sounds Studio",
    type: "Mantra",
    duration: "20:15",
    coverUrl: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 5,
    title: "Divine Dance",
    artist: "Temple Rhythms",
    type: "Performance",
    duration: "25:00",
    coverUrl: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 6,
    title: "Sacred Flute",
    artist: "Wind Spirits",
    type: "Instrumental",
    duration: "16:20",
    coverUrl: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 7,
    title: "Heart Opening",
    artist: "Sacred Sounds Studio",
    type: "Meditation",
    duration: "22:10",
    coverUrl: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 8,
    title: "Om Shanti",
    artist: "Peace Collective",
    type: "Chant",
    duration: "11:45",
    coverUrl: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 9,
    title: "Sacred Drumming",
    artist: "Rhythm Masters",
    type: "Percussion",
    duration: "19:30",
    coverUrl: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 10,
    title: "Evening Prayers",
    artist: "Temple Voices",
    type: "Devotional",
    duration: "14:15",
    coverUrl: "/placeholder.svg?height=400&width=400",
  },
]

export default function RecentUploads() {
  const { play } = usePlayer()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(true)

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = direction === 'left' ? -400 : 400
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setShowLeftScroll(container.scrollLeft > 0)
    setShowRightScroll(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    )
  }

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold tracking-tight">Recent Uploads</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('left')}
            disabled={!showLeftScroll}
            className="opacity-0 transition-opacity data-[visible=true]:opacity-100"
            data-visible={showLeftScroll}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('right')}
            disabled={!showRightScroll}
            className="opacity-0 transition-opacity data-[visible=true]:opacity-100"
            data-visible={showRightScroll}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {recentContent.map((item) => (
          <Card
            key={item.id}
            className="flex-shrink-0 w-[300px] group cursor-pointer hover:bg-accent transition-colors"
          >
            <div className="p-4 space-y-4" onClick={() => {
              play({
                id: item.id.toString(),
                title: item.title,
                artist: item.artist,
                coverUrl: item.coverUrl,
                mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                type: "audio",
                duration: item.duration
              })
            }}>
              <div className="relative aspect-square">
                <Image
                  src={item.coverUrl}
                  alt={item.title}
                  fill
                  className="object-cover rounded-md"
                />
                <Button
                  size="icon"
                  className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Play className="h-6 w-6" />
                </Button>
              </div>
              <div>
                <h3 className="font-semibold leading-none">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.artist}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {item.type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.duration}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

