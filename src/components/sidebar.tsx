
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Library, Mic2, Rss, User, Upload } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import Image from "next/image"
import Link from "next/link"

export function Sidebar() {
  const { userEmail } = useAuth()
  const isArtist = userEmail?.endsWith('@artist.sacredsound.com') || false
  return (
    <div className="flex h-full w-[240px] flex-col bg-[#d9d9e7]">
      <div className="flex items-center gap-2 p-4">
        <Image
          src="/placeholder.svg?height=32&width=32"
          alt="Sacred Sound"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="text-lg font-semibold text-[#434289]">Sacred Sound</span>
      </div>
      
      <div className="px-4 py-2">
        <div className="relative">
          <Input 
            placeholder="Search" 
            className="bg-white/90 pl-4 h-10 rounded-full border-0 focus-visible:ring-1 focus-visible:ring-[#434289]"
          />
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <Link href="/library">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 rounded-lg font-medium",
              "bg-[#434289] text-white hover:bg-[#434289]/90"
            )}
          >
            <Library className="h-5 w-5" />
            Library
          </Button>
        </Link>
        
        <Link href="/concert-hall">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 rounded-lg font-medium text-[#434289] hover:bg-white/50"
          >
            <Mic2 className="h-5 w-5" />
            Concert Hall
          </Button>
        </Link>
        
        <Link href="/feed">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 rounded-lg font-medium text-[#434289] hover:bg-white/50"
          >
            <Rss className="h-5 w-5" />
            Feed
          </Button>
        </Link>
        
        {/* Upload button only visible to artists */}
        {isArtist && (
          <Link href="/upload">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 rounded-lg font-medium text-[#434289] hover:bg-white/50"
            >
              <Upload className="h-5 w-5" />
              Upload
            </Button>
          </Link>
        )}
      </nav>

      <div className="mt-auto p-4">
        <Link href="/account">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 rounded-lg font-medium text-[#434289] hover:bg-white/50"
          >
            <User className="h-5 w-5" />
            My account
          </Button>
        </Link>
      </div>
    </div>
  )
}
