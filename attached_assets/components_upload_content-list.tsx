'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GripVertical, Music2, Trash2, Video } from 'lucide-react'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

interface ContentListProps {
  files: any[]
  isAlbum: boolean
  onRemove: (id: string) => void
  onReorder: (files: any[]) => void
}

export function ContentList({ files, isAlbum, onRemove, onReorder }: ContentListProps) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return
    
    const items = Array.from(files)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    
    onReorder(items)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('audio')) return <Music2 className="w-5 h-5" />
    if (file.type.startsWith('video')) return <Video className="w-5 h-5" />
    return <Music2 className="w-5 h-5" />
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {files.length} {files.length === 1 ? 'File' : 'Files'} Selected
      </h3>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="content-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {files.map((file, index) => (
                <Draggable
                  key={file.id}
                  draggableId={file.id}
                  index={index}
                  isDragDisabled={!isAlbum}
                >
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="mb-2"
                    >
                      <CardContent className="flex items-center gap-4 p-4">
                        {isAlbum && (
                          <div {...provided.dragHandleProps}>
                            <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                          </div>
                        )}
                        {getFileIcon(file.file)}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemove(file.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

