"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Album, MoreVertical, Music4, Play, Video, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image"
import { useState } from "react"

const albums = [
  {
    id: 1,
    title: "Morning Meditation Series",
    description: "A collection of peaceful morning mantras",
    coverUrl: "/placeholder.svg?height=400&width=400",
    trackCount: 12,
    duration: "1h 24m",
  },
  {
    id: 2,
    title: "Sacred Chants Vol. 1",
    description: "Traditional Sanskrit chants",
    coverUrl: "/placeholder.svg?height=400&width=400",
    trackCount: 8,
    duration: "56m",
  },
  {
    id: 3,
    title: "Bhakti Flow",
    description: "Dynamic devotional music series",
    coverUrl: "/placeholder.svg?height=400&width=400",
    trackCount: 10,
    duration: "1h 12m",
  },
  {
    id: 4,
    title: "Temple Recordings",
    description: "Live recordings from sacred spaces",
    coverUrl: "/placeholder.svg?height=400&width=400",
    trackCount: 6,
    duration: "45m",
  },
  {
    id: 5,
    title: "Divine Harmony",
    description: "Fusion of traditional and modern sacred music",
    coverUrl: "/placeholder.svg?height=400&width=400",
    trackCount: 9,
    duration: "1h 5m",
  },
  {
    id: 6,
    title: "Peaceful Evenings",
    description: "Calming evening meditation tracks",
    coverUrl: "/placeholder.svg?height=400&width=400",
    trackCount: 7,
    duration: "52m",
  },
  {
    id: 7,
    title: "Sacred Rhythms",
    description: "Percussion-based spiritual music",
    coverUrl: "/placeholder.svg?height=400&width=400",
    trackCount: 11,
    duration: "1h 18m",
  },
  {
    id: 8,
    title: "Vedic Chants Collection",
    description: "Ancient Sanskrit verses and mantras",
    coverUrl: "/placeholder.svg?height=400&width=400",
    trackCount: 14,
    duration: "1h 35m",
  },
  {
    id: 9,
    title: "Heart of Devotion",
    description: "Emotional bhakti recordings",
    coverUrl: "/placeholder.svg?height=400&width=400",
    trackCount: 8,
    duration: "58m",
  },
  {
    id: 10,
    title: "Sacred Sound Workshops",
    description: "Live workshop recordings",
    coverUrl: "/placeholder.svg?height=400&width=400",
    trackCount: 5,
    duration: "2h 15m",
  },
]

const tracks = [
  {
    id: 1,
    title: "Om Namah Shivaya",
    description: "Traditional chant with modern arrangement",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "7:24",
  },
  {
    id: 2,
    title: "Krishna Consciousness",
    description: "Meditative kirtan",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "12:08",
  },
  {
    id: 3,
    title: "Sacred Dawn",
    description: "Morning raga meditation",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "15:30",
  },
  {
    id: 4,
    title: "Ganga Flow",
    description: "Riverside recording",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "9:45",
  },
  {
    id: 5,
    title: "Temple Bells",
    description: "Ambient temple sounds",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "8:12",
  },
  {
    id: 6,
    title: "Healing Mantras",
    description: "Traditional healing chants",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "11:15",
  },
  {
    id: 7,
    title: "Divine Mother",
    description: "Devi worship chants",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "14:20",
  },
  {
    id: 8,
    title: "Sacred Flute",
    description: "Bamboo flute meditation",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "10:30",
  },
  {
    id: 9,
    title: "Heart Opening",
    description: "Bhakti yoga practice",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "16:45",
  },
  {
    id: 10,
    title: "Peace Mantra",
    description: "Universal peace chant",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "8:50",
  },
]

const videos = [
  {
    id: 1,
    title: "Behind the Scenes - Studio Session",
    description: "Recording process documentary",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "15:30",
  },
  {
    id: 2,
    title: "Live at Sacred Sound Festival",
    description: "Full concert recording",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "45:12",
  },
  {
    id: 3,
    title: "Mantra Workshop",
    description: "Educational session",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "28:15",
  },
  {
    id: 4,
    title: "Sacred Instruments Guide",
    description: "Traditional instrument tutorial",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "22:40",
  },
  {
    id: 5,
    title: "Morning Practice",
    description: "Guided morning ritual",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "18:25",
  },
  {
    id: 6,
    title: "Temple Visit Series",
    description: "Sacred spaces documentary",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "35:10",
  },
  {
    id: 7,
    title: "Sacred Sound Philosophy",
    description: "Interview with masters",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "42:30",
  },
  {
    id: 8,
    title: "Devotional Dance",
    description: "Traditional dance performance",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "25:15",
  },
  {
    id: 9,
    title: "Sound Healing Session",
    description: "Live healing demonstration",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "32:20",
  },
  {
    id: 10,
    title: "Sacred Music History",
    description: "Documentary series episode",
    coverUrl: "/placeholder.svg?height=400&width=400",
    duration: "48:45",
  },
]

export function ContentGrid() {
  const [selectedAlbum, setSelectedAlbum] = useState<typeof albums[0] | null>(null)

  return (
    <div className="space-y-8">
      {!selectedAlbum ? (
        <>
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold tracking-tight">Albums</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const container = document.getElementById('albums-scroll')
                    container?.scrollBy({ left: -400, behavior: 'smooth' })
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const container = document.getElementById('albums-scroll')
                    container?.scrollBy({ left: 400, behavior: 'smooth' })
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div
              id="albums-scroll"
              className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth pb-4"
            >
              {albums.map((album) => (
                <Card key={album.id} className="flex-shrink-0 w-[300px] group cursor-pointer hover:bg-accent transition-colors">
                  <CardContent className="p-4 space-y-4" onClick={() => setSelectedAlbum(album)}>
                    <div className="relative aspect-square">
                      <Image
                        src={album.coverUrl}
                        alt={album.title}
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
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold leading-none">{album.title}</h3>
                        <ContentMenu type="album" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{album.description}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Album className="h-3 w-3" />
                        <span>{album.trackCount} tracks</span>
                        <span>•</span>
                        <span>{album.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold tracking-tight">Individual Tracks</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const container = document.getElementById('tracks-scroll')
                    container?.scrollBy({ left: -400, behavior: 'smooth' })
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const container = document.getElementById('tracks-scroll')
                    container?.scrollBy({ left: 400, behavior: 'smooth' })
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div
              id="tracks-scroll"
              className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth pb-4"
            >
              {tracks.map((track) => (
                <Card key={track.id} className="flex-shrink-0 w-[300px] group cursor-pointer hover:bg-accent transition-colors">
                  <CardContent className="p-4 space-y-4">
                    <div className="relative aspect-square">
                      <Image
                        src={track.coverUrl}
                        alt={track.title}
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
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold leading-none">{track.title}</h3>
                        <ContentMenu type="track" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{track.description}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Music4 className="h-3 w-3" />
                        <span>{track.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold tracking-tight">Videos</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const container = document.getElementById('videos-scroll')
                    container?.scrollBy({ left: -400, behavior: 'smooth' })
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const container = document.getElementById('videos-scroll')
                    container?.scrollBy({ left: 400, behavior: 'smooth' })
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div
              id="videos-scroll"
              className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth pb-4"
            >
              {videos.map((video) => (
                <Card key={video.id} className="flex-shrink-0 w-[300px] group cursor-pointer hover:bg-accent transition-colors">
                  <CardContent className="p-4 space-y-4">
                    <div className="relative aspect-video">
                      <Image
                        src={video.coverUrl}
                        alt={video.title}
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
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold leading-none">{video.title}</h3>
                        <ContentMenu type="video" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{video.description}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Video className="h-3 w-3" />
                        <span>{video.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </>
      ) : (
        <AlbumView album={selectedAlbum} onBack={() => setSelectedAlbum(null)} />
      )}
    </div>
  )
}

function ContentMenu({ type }: { type: 'album' | 'track' | 'video' }) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DialogTrigger asChild>
            <DropdownMenuItem>Edit details</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem>Share</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {type} details</DialogTitle>
          <DialogDescription>
            Make changes to your {type} details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {/* Add edit form here */}
      </DialogContent>
    </Dialog>
  )
}

function AlbumView({ album, onBack }: { album: typeof albums[0], onBack: () => void }) {
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="-ml-2">
        ← Back to My Content
      </Button>

      <div className="flex gap-6">
        <div className="relative w-48 h-48 flex-shrink-0">
          <Image
            src={album.coverUrl}
            alt={album.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{album.title}</h1>
          <p className="text-muted-foreground">{album.description}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Album className="h-4 w-4" />
            <span>{album.trackCount} tracks</span>
            <span>•</span>
            <span>{album.duration}</span>
          </div>
          <div className="flex items-center gap-2 pt-4">
            <Button size="lg">
              <Play className="mr-2 h-4 w-4" />
              Play Album
            </Button>
            <ContentMenu type="album" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Tracks</h2>
        <div className="grid gap-2">
          {Array.from({ length: album.trackCount }).map((_, i) => (
            <Card key={i} className="group hover:bg-accent transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground w-6">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="relative w-12 h-12">
                    <Image
                      src={album.coverUrl}
                      alt={`Track ${i + 1}`}
                      fill
                      className="object-cover rounded-md"
                    />
                    <Button
                      size="icon"
                      className="absolute inset-0 m-auto size-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium leading-none">Track {i + 1}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {Math.floor(Math.random() * 10) + 1}:
                      {Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                    </p>
                  </div>
                  <ContentMenu type="track" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

