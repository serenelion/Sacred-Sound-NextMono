
'use client'

import { useState } from 'react'
import { UploadedFile } from '@/types/upload'
import { Progress } from '@/components/ui/progress'
import { Trash2, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ContentListProps {
  files: UploadedFile[]
  onRemove: (id: string) => void
}

export function ContentList({ files, onRemove }: ContentListProps) {
  return (
    <div className="space-y-4">
      {files.map((file) => (
        <div key={file.id} className="flex items-center space-x-4 p-4 border rounded-lg">
          <FileText className="h-6 w-6 text-muted-foreground" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{file.file.name}</p>
            <Progress value={file.progress} className="h-2 mt-2" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(file.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
