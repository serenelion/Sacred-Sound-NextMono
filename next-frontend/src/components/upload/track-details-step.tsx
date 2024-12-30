
'use client'

import { useState } from 'react'
import { Menu, Trash2, ChevronUp, Upload, ChevronLeft, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import Select from 'react-select'
import { toast } from "sonner"

const METADATA_OPTIONS = {
  categories: [
    { value: 'studio_production', label: 'Studio Production' },
    { value: 'music_video', label: 'Music Video' },
    { value: 'meditation', label: 'Meditation' },
    { value: 'dj_set', label: 'DJ Set' },
    { value: 'behind_scenes', label: 'Behind the Scenes' },
    { value: 'concert', label: 'Concert' },
    { value: 'live_recording', label: 'Live Recording' },
    { value: 'video_lesson', label: 'Video Lesson' },
  ],
  genres: [
    { value: 'kirtan', label: 'Kirtan' },
    { value: 'bhajan', label: 'Bhajan' },
    { value: 'mantra', label: 'Mantra' },
    { value: 'devotional', label: 'Devotional' },
  ],
  instruments: [
    { value: 'harmonium', label: 'Harmonium' },
    { value: 'tabla', label: 'Tabla' },
    { value: 'mridanga', label: 'Mridanga' },
    { value: 'tampura', label: 'Tampura' },
  ],
  languages: [
    { value: 'sanskrit', label: 'Sanskrit' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'bengali', label: 'Bengali' },
    { value: 'english', label: 'English' },
  ],
  deities: [
    { value: 'krishna', label: 'Krishna' },
    { value: 'rama', label: 'Rama' },
    { value: 'shiva', label: 'Shiva' },
    { value: 'durga', label: 'Durga' },
  ],
  traditions: [
    { value: 'vaishnava', label: 'Vaishnava' },
    { value: 'shaivite', label: 'Shaivite' },
    { value: 'shakta', label: 'Shakta' },
    { value: 'vedic', label: 'Vedic' },
  ],
  moods: [
    { value: 'peaceful', label: 'Peaceful' },
    { value: 'energetic', label: 'Energetic' },
    { value: 'devotional', label: 'Devotional' },
    { value: 'meditative', label: 'Meditative' },
  ]
}

const VOCAL_TYPES = [
  { id: 'instrumental', label: 'Instrumental' },
  { id: 'male', label: 'Male Vocals' },
  { id: 'female', label: 'Female Vocals' },
  { id: 'choir', label: 'Choir' },
  { id: 'circle', label: 'Circle Chanting' },
]

const selectStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: 'transparent',
    borderColor: 'hsl(var(--input))',
    borderRadius: 'calc(var(--radius))',
    minHeight: '40px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'hsl(var(--input))',
    }
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: 'white',
    borderRadius: 'calc(var(--radius))',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    zIndex: 1000,
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected ? 'hsl(var(--accent))' : 'white',
    color: state.isSelected ? 'white' : 'black',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#008080',
      color: 'white',
    }
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: 'hsl(var(--accent))',
    borderRadius: 'calc(var(--radius) - 2px)',
    color: 'white',
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: 'white',
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: 'white',
    ':hover': {
      backgroundColor: 'hsl(var(--destructive))',
      color: 'white',
    },
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: 'hsl(var(--accent))',
    borderRadius: 'calc(var(--radius) - 2px)',
    color: 'hsl(var(--accent-foreground))',
  }),
}

interface TrackDetailsStepProps {
  files: any[]
  albumId: string | null
  onBack: () => void
}

export function TrackDetailsStep({
  files,
  albumId,
  onBack,
}: TrackDetailsStepProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [trackDetails, setTrackDetails] = useState(
    files.map(() => ({
      title: '',
      description: '',
      category: '',
      genre: [],
      featuredInstruments: [],
      primaryInstrument: '',
      language: [],
      deity: [],
      tradition: [],
      mood: [],
      visibility: 'public',
      vocals: 'no',
      vocalTypes: {
        male: false,
        female: false,
        choir: false,
        circle: false,
      },
      coverImage: null as File | null
    }))
  )

  const currentTrack = files[currentTrackIndex]
  const currentDetails = trackDetails[currentTrackIndex]

  const updateCurrentTrack = (updates: Partial<typeof currentDetails>) => {
    setTrackDetails(prev => prev.map((track, i) => 
      i === currentTrackIndex ? { ...track, ...updates } : track
    ))
  }

  const validateTrackDetails = (details: typeof currentDetails) => {
    if (!details.title.trim()) return false
    if (!details.description.trim()) return false
    if (!details.category) return false
    if (details.genre.length === 0) return false
    if (!details.primaryInstrument) return false
    return true
  }

  const handleCoverImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      updateCurrentTrack({ coverImage: file })
    } else {
      toast.error("Please upload a valid image file")
    }
  }

  const handleSubmit = async () => {
    const allValid = trackDetails.every(validateTrackDetails)
    if (!allValid) {
      toast.error("Please fill in all required fields for all tracks")
      return
    }

    setIsSubmitting(true)
    try {
      // API call logic here
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success("Content submitted for QA review")
    } catch (error) {
      toast.error("Failed to submit content")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center justify-between py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-semibold">Track Details</h1>
          </div>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || !validateTrackDetails(currentDetails)}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              'Publish'
            )}
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <Card className="mb-8">
          <CardContent className="flex items-center gap-4 p-4">
            <Menu className="w-5 h-5 text-muted-foreground" />
            <span className="flex-1 font-medium">{currentTrack.file.name}</span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-destructive">
                <Trash2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ChevronUp className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <div 
              className="aspect-square bg-muted rounded-lg flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-muted/80 transition-colors"
              onClick={() => document.getElementById('coverImageInput')?.click()}
            >
              {currentDetails.coverImage ? (
                <img 
                  src={URL.createObjectURL(currentDetails.coverImage)}
                  alt="Cover"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Upload cover image</span>
                </>
              )}
              <input
                id="coverImageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverImageUpload}
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Write a catchy title for the content"
                  value={currentDetails.title}
                  onChange={(e) => updateCurrentTrack({ title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="What describes this track"
                  className="min-h-[120px]"
                  value={currentDetails.description}
                  onChange={(e) => updateCurrentTrack({ description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  styles={selectStyles}
                  options={METADATA_OPTIONS.categories}
                  value={METADATA_OPTIONS.categories.find(c => c.value === currentDetails.category)}
                  onChange={(option) => updateCurrentTrack({ category: option?.value })}
                  placeholder="Select the content's category"
                />
              </div>

              <div className="space-y-2">
                <Label>Mood</Label>
                <Select
                  styles={selectStyles}
                  isMulti
                  options={METADATA_OPTIONS.moods}
                  value={METADATA_OPTIONS.moods.filter(m => currentDetails.mood?.includes(m.value))}
                  onChange={(options) => updateCurrentTrack({ 
                    mood: options.map(o => o.value)
                  })}
                  placeholder="Select moods"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Genre *</Label>
              <Select
                styles={selectStyles}
                isMulti
                options={METADATA_OPTIONS.genres}
                value={METADATA_OPTIONS.genres.filter(g => currentDetails.genre?.includes(g.value))}
                onChange={(options) => updateCurrentTrack({ 
                  genre: options.map(o => o.value)
                })}
                placeholder="Select genres"
              />
            </div>

            <div className="space-y-2">
              <Label>Featured instruments</Label>
              <Select
                styles={selectStyles}
                isMulti
                options={METADATA_OPTIONS.instruments}
                value={METADATA_OPTIONS.instruments.filter(i => 
                  currentDetails.featuredInstruments?.includes(i.value)
                )}
                onChange={(options) => updateCurrentTrack({ 
                  featuredInstruments: options.map(o => o.value)
                })}
                placeholder="Select featured instruments"
              />
            </div>

            <div className="space-y-2">
              <Label>Primary instrument *</Label>
              <Select
                styles={selectStyles}
                options={METADATA_OPTIONS.instruments}
                value={METADATA_OPTIONS.instruments.find(i => 
                  i.value === currentDetails.primaryInstrument
                )}
                onChange={(option) => updateCurrentTrack({ 
                  primaryInstrument: option?.value
                })}
                placeholder="Select primary instrument"
              />
            </div>

            <div className="space-y-2">
              <Label>Language</Label>
              <Select
                styles={selectStyles}
                isMulti
                options={METADATA_OPTIONS.languages}
                value={METADATA_OPTIONS.languages.filter(l => 
                  currentDetails.language?.includes(l.value)
                )}
                onChange={(options) => updateCurrentTrack({ 
                  language: options.map(o => o.value)
                })}
                placeholder="Select languages"
              />
            </div>

            <div className="space-y-2">
              <Label>Deity</Label>
              <Select
                styles={selectStyles}
                isMulti
                options={METADATA_OPTIONS.deities}
                value={METADATA_OPTIONS.deities.filter(d => 
                  currentDetails.deity?.includes(d.value)
                )}
                onChange={(options) => updateCurrentTrack({ 
                  deity: options.map(o => o.value)
                })}
                placeholder="Select deities"
              />
            </div>

            <div className="space-y-2">
              <Label>Tradition</Label>
              <Select
                styles={selectStyles}
                isMulti
                options={METADATA_OPTIONS.traditions}
                value={METADATA_OPTIONS.traditions.filter(t => 
                  currentDetails.tradition?.includes(t.value)
                )}
                onChange={(options) => updateCurrentTrack({ 
                  tradition: options.map(o => o.value)
                })}
                placeholder="Select traditions"
              />
            </div>

            <div className="space-y-4">
              <Label>Vocals</Label>
              <div className="grid gap-4">
                {VOCAL_TYPES.map((type) => (
                  <div key={type.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={type.id}
                      checked={type.id === 'instrumental' 
                        ? currentDetails.vocals === 'no'
                        : currentDetails.vocalTypes?.[type.id as keyof typeof currentDetails.vocalTypes]
                      }
                      onCheckedChange={(checked) => {
                        if (type.id === 'instrumental') {
                          updateCurrentTrack({ 
                            vocals: checked ? 'no' : 'yes',
                            vocalTypes: {
                              male: false,
                              female: false,
                              choir: false,
                              circle: false,
                            }
                          })
                        } else {
                          updateCurrentTrack({
                            vocals: 'yes',
                            vocalTypes: {
                              ...currentDetails.vocalTypes,
                              [type.id]: checked
                            }
                          })
                        }
                      }}
                    />
                    <Label 
                      htmlFor={type.id} 
                      className="text-sm font-normal"
                    >
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <h3 className="font-medium">Track Progress</h3>
              <p className="text-sm text-muted-foreground">
                {currentTrackIndex + 1} of {files.length} tracks
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentTrackIndex(i => i - 1)}
                disabled={currentTrackIndex === 0}
              >
                Previous
              </Button>
              <Button
                onClick={() => setCurrentTrackIndex(i => i + 1)}
                disabled={currentTrackIndex === files.length - 1}
              >
                Next Track
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {files.map((track, index) => (
              <button
                key={track.id}
                onClick={() => setCurrentTrackIndex(index)}
                className={`p-3 rounded-lg text-left transition-colors ${
                  index === currentTrackIndex 
                    ? 'bg-primary/10 border-primary' 
                    : 'bg-muted hover:bg-muted/80'
                } ${
                  validateTrackDetails(trackDetails[index])
                    ? 'border-l-4 border-l-green-500' 
                    : ''
                }`}
              >
                <p className="text-sm font-medium truncate">{track.file.name}</p>
                <p className="text-xs text-muted-foreground">Track {index + 1}</p>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
