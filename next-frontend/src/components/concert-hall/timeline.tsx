
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface TimelineProps {
  active: string
}

export function Timeline({ active }: TimelineProps) {
  const events = [
    {
      id: 1,
      title: "Sacred Sound Journey",
      date: "March 15, 2024",
      time: "7:00 PM EST",
      artist: "Sound of Light",
      location: "Costa Rica",
      image: "/placeholder-event.jpg"
    },
    {
      id: 2,
      title: "Healing Mantras Live",
      date: "March 20, 2024",
      time: "8:00 PM EST",
      artist: "Sacred Sound Studio",
      location: "California",
      image: "/placeholder-event.jpg"
    }
  ]

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <h3 className="font-semibold mb-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {event.date} • {event.time}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden relative">
                      <Image
                        src={event.image}
                        alt={event.artist}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm">{event.artist}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>
              </div>
              <div className="w-32 h-32 relative rounded-lg overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
