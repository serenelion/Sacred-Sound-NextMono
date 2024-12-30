
'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Timeline } from "@/components/concert-hall/timeline"

export default function ConcertHall() {
  const [activeTab, setActiveTab] = useState('upcoming')
  
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black mb-8">
        <video
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          controls
          className="w-full h-full object-contain"
        />
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Sacred Sound Live</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden relative">
                <Image
                  src="/placeholder-artist.jpg"
                  alt="Artist"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">Sound of Light</h3>
                <span className="text-sm text-muted-foreground">1.2K followers</span>
              </div>
            </div>
            <Button variant="outline" size="sm">Follow</Button>
            <Button variant="outline" size="sm">Share</Button>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">187 watching now | Started streaming 109 minutes ago</p>
            <p className="text-sm text-muted-foreground">February 29, 2024</p>
            <p className="mt-4">Join us for a sacred sound journey featuring ancient mantras and healing frequencies.</p>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Concerts</h2>
        <div className="flex gap-2 mb-6">
          <Button 
            variant={activeTab === 'upcoming' ? 'default' : 'outline'}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming concerts
          </Button>
          <Button
            variant={activeTab === 'past' ? 'default' : 'outline'}
            onClick={() => setActiveTab('past')}
          >
            Past concerts
          </Button>
        </div>
        <Timeline active={activeTab} />
      </div>
    </div>
  )
}
