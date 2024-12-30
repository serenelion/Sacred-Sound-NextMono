import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function TechnicalRequirements() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-secondary/20 rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Technical Requirements</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-muted-foreground"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className={`space-y-4 transition-all ${isExpanded ? 'block' : 'hidden'}`}>
      </div>
    </div>
  )
}