'use client'

import { ScrollableContent } from "./scrollable-content"

const categories = [
  "Studio production",
  "Music video",
  "Meditation",
  "DJ set",
  "Behind the scenes",
  "Concert",
  "Live recording",
  "Video lesson",
]

const generateMockContent = (category: string) => {
  const titles = {
    'Studio production': [
      'Morning Raga', 'Sacred Chants', 'Temple Sounds', 'Divine Harmony',
      'Peaceful Mantras', 'Healing Vibrations', 'Sacred Rhythms', 'Devotional Series',
      'Meditation Music', 'Ancient Wisdom'
    ],
    'Music video': [
      'Sacred Dance', 'Temple Ceremony', 'Live Performance', 'Music Documentary',
      'Behind the Scenes', 'Artist Interview', 'Sacred Spaces', 'Devotional Dance',
      'Festival Highlights', 'Sacred Journey'
    ],
    'Meditation': [
      'Morning Practice', 'Evening Peace', 'Heart Opening', 'Divine Connection',
      'Sacred Stillness', 'Inner Journey', 'Healing Meditation', 'Sacred Breath',
      'Temple Meditation', 'Nature Connection'
    ],
    'DJ set': [
      'Sacred Beats', 'Temple Grooves', 'Spiritual Flow', 'Divine Dance',
      'Sacred Bass', 'Conscious Rhythms', 'Bhakti Beats', 'Mantra Mix',
      'Sacred Electronics', 'Temple Tech'
    ],
    'Behind the scenes': [
      'Studio Sessions', 'Artist Process', 'Sacred Recording', 'Temple Visit',
      'Instrument Making', 'Sacred Preparation', 'Festival Setup', 'Artist Journey',
      'Sacred Spaces Tour', 'Community Gathering'
    ],
    'Concert': [
      'Live at Temple', 'Sacred Festival', 'Divine Concert', 'Temple Gathering',
      'Sacred Celebration', 'Live Performance', 'Community Concert', 'Sacred Night',
      'Temple Music', 'Festival Highlights'
    ],
    'Live recording': [
      'Temple Session', 'Sacred Moment', 'Live Mantras', 'Divine Experience',
      'Sacred Space', 'Temple Sounds', 'Community Chant', 'Sacred Circle',
      'Temple Prayers', 'Live Meditation'
    ],
    'Video lesson': [
      'Sacred Music Basics', 'Mantra Practice', 'Instrument Guide', 'Voice Training',
      'Sacred Rhythm', 'Meditation Guide', 'Devotional Practice', 'Sacred Theory',
      'Temple Traditions', 'Sacred Sound History'
    ],
  }

  return Array.from({ length: 10 }, (_, i) => ({
    id: `${category}-${i}`,
    title: titles[category as keyof typeof titles][i],
    artist: "Sacred Sounds Artist",
    type: category,
    duration: `${Math.floor(Math.random() * 10) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    coverUrl: "/placeholder.svg?height=400&width=400",
  }))
}

export function ContentGrid() {
  return (
    <div className="space-y-10">
      {categories.map((category) => (
        <ScrollableContent
          key={category}
          title={category}
          content={generateMockContent(category)}
        />
      ))}
    </div>
  )
}

