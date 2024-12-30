
'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Shield, CheckCircle2, Sparkles } from 'lucide-react'

export function QAProcess() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Sacred Sound Quality Assurance
        </CardTitle>
        <CardDescription>
          Our careful curation process ensures your content reaches its audience
          with the highest quality and spiritual integrity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <h3 className="font-medium">Technical Review</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              We verify audio/video quality for crystal-clear playback.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-medium">Content Curation</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Our team ensures content aligns with Sacred Sound's standards.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
