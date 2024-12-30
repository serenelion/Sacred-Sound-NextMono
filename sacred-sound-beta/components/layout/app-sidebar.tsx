"use client"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Library, Menu, Music2, Upload, User, X } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function AppSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      
      <div className={`
        fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        md:hidden
      `} onClick={() => setIsOpen(false)} />

      <aside className={`
        fixed top-0 left-0 z-40 h-full w-64 bg-background border-r
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:relative md:z-0
        ${isOpen ? "shadow-lg" : ""}
      `}>
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center gap-2 border-b px-4">
            <Music2 className="h-6 w-6" />
            <span className="font-semibold">Sacred Sound</span>
          </div>

          <nav className="flex-1 space-y-2 p-2">
            <Button
              variant={pathname === '/library' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              asChild
            >
              <Link href="/library">
                <Library className="mr-2 h-4 w-4" />
                Library
              </Link>
            </Button>
            <Button
              variant={pathname === '/my-content' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              asChild
            >
              <Link href="/my-content">
                <User className="mr-2 h-4 w-4" />
                My Content
              </Link>
            </Button>
            <Button
              variant={pathname === '/upload' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              asChild
            >
              <Link href="/upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Link>
            </Button>
          </nav>
        </div>
      </aside>
    </>
  )
}

