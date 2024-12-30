'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useRef, useState } from "react"
import Image from "next/image"

interface Content {
  id: string
  title: string
  artist: string
  type: string
  duration: string
  coverUrl: string
}

interface ScrollableContentProps {
  title: string
  content: Content[]
}

export function ScrollableContent({ title, content }: ScrollableContentProps) {
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
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <div className="hidden md:flex items-center gap-2">
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
        className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth pb-4"
      >
        {content.map((item) => (
          <Card
            key={item.id}
            className="flex-shrink-0 w-[160px] sm:w-[200px] md:w-[250px] group cursor-pointer hover:bg-accent transition-colors"
          >
            <div className="p-3 md:p-4 space-y-3 md:space-y-4">
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
                <h3 className="font-semibold leading-none truncate">{item.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{item.artist}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary truncate">
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

