
'use client'

import { Button } from "@/components/ui/button"
import { Library, Mic2, Rss, User, Upload } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import Link from "next/link"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const { isArtist } = useAuth()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t md:hidden">
      <div className="flex justify-around p-2">
        <Link href="/library">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex flex-col items-center gap-1 h-auto py-2 px-3 text-xs",
              "text-[#434289]"
            )}
          >
            <Library className="h-5 w-5" />
            Library
          </Button>
        </Link>
        
        <Link href="/concert-hall">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 px-3 text-xs text-[#434289]"
          >
            <Mic2 className="h-5 w-5" />
            Concert Hall
          </Button>
        </Link>
        
        <Link href="/feed">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 px-3 text-xs text-[#434289]"
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
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-2 px-3 text-xs text-[#434289]"
            >
              <Upload className="h-5 w-5" />
              Upload
            </Button>
          </Link>
        )}
        <Link href="/account">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 px-3 text-xs text-[#434289]"
          >
            <User className="h-5 w-5" />
            Account
          </Button>
        </Link>
      </div>
    </nav>
  )
}
