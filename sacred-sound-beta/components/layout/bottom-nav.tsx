"use client"

import { Button } from "@/components/ui/button"
import { Library, Music2, Upload, User } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

export function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
      <nav className="flex h-16 items-center px-4">
        <div className="flex w-full items-center justify-around">
          <Button variant="ghost" size="icon" asChild className="h-12 w-12">
            <Link href="/library" data-active={pathname === '/library'}>
              <Library className="h-6 w-6" />
              <span className="sr-only">Library</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="h-12 w-12">
            <Link href="/my-content" data-active={pathname === '/my-content'}>
              <User className="h-6 w-6" />
              <span className="sr-only">My Content</span>
            </Link>
          </Button>
          <Button variant="default" size="icon" asChild className="h-12 w-12">
            <Link href="/upload">
              <Upload className="h-6 w-6" />
              <span className="sr-only">Upload</span>
            </Link>
          </Button>
        </div>
      </nav>
    </div>
  )
}

