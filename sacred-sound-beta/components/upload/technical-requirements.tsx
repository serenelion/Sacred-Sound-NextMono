export function TechnicalRequirements() {
  return (
    <div className="bg-secondary/20 rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold">Technical Requirements</h2>
      <div className="prose prose-sm dark:prose-invert">
        <p>
          To ensure your sacred content reaches its audience with the highest fidelity and respect
          it deserves, please ensure your uploads meet these technical standards:
        </p>
        <div className="grid sm:grid-cols-2 gap-6 mt-4">
          <div className="space-y-2">
            <h3 className="text-base font-medium">Audio Content</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>File formats: WAV, FLAC, or AIFF</li>
              <li>Minimum bit depth: 16-bit</li>
              <li>Minimum sample rate: 44.1 kHz</li>
              <li>Recommended: 24-bit / 48 kHz or higher</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-medium">Video Content</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>File format: MP4 (H.264 codec)</li>
              <li>Minimum resolution: 1080p</li>
              <li>Recommended: 4K resolution</li>
              <li>Frame rate: 24fps or higher</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

