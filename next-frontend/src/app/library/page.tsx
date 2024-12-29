'use client'

import { LibraryPage } from '@/components/library-page'
import { PrivateRoute } from '@/components/private-route'

export default function Library() {
  return (
    <PrivateRoute>
      <LibraryPage />
    </PrivateRoute>
  )
}