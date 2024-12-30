
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Library, Mic2, Rss, User, Upload, Menu } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import Image from "next/image"
import Link from "next/link"

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { isArtist } = useAuth()
  
  return (
    <div className={cn(
      "fixed top-0 left-0 z-40 h-full w-[240px] flex-col bg-[#d9d9e7] transition-transform duration-300 ease-in-out",
      isOpen ? "translate-x-0" : "-translate-x-[240px]"
    )}>
      <button 
        onClick={onToggle}
        className="fixed top-6 left-6 z-50 bg-white/80 p-2 rounded-lg hover:bg-white/90 transition-colors"
        style={{
          transform: isOpen ? 'translateX(240px)' : 'translateX(0)'
        }}
      >
        <Menu className="h-5 w-5" />
      </button>

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
        <Input 
          placeholder="Search" 
          className="bg-white/90 pl-4 h-10 rounded-full border-0 focus-visible:ring-1 focus-visible:ring-[#434289]"
        />
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
