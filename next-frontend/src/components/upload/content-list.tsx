
'use client'

import { UploadedFile } from '@/types/upload'
import { Progress } from '@/components/ui/progress'
import { Trash2, FileText, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import type { DropResult } from 'react-beautiful-dnd'

interface ContentListProps {
  files: UploadedFile[]
  onRemove: (id: string) => void
  onReorder: (files: UploadedFile[]) => void
  isDisabled?: boolean
}

export function ContentList({ files, onRemove, onReorder, isDisabled = false }: ContentListProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    
    const items = Array.from(files)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onReorder(items)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tracks">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
            {files.map((file, index) => (
              <Draggable key={file.id} draggableId={file.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="flex items-center space-x-4 p-4 border rounded-lg bg-background"
                  >
                    <div {...provided.dragHandleProps}>
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                    </div>
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
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
