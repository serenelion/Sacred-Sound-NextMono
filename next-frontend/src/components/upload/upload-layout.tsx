
'use client'

import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface UploadLayoutProps {
  children: React.ReactNode
  step: number
  onClose?: () => void
}

export function UploadLayout({ children, step, onClose }: UploadLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Progress value={step * 25} className="h-2 w-[200px]" />
          <div className="text-sm text-muted-foreground">
            Step {step} of 4
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        )}
      </div>
      {children}
    </div>
  )
}
