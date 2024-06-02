'use client' // Error components must be Client Components
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
 
export default function Error() {
    const error = useSearchParams().get('error')
  return (
    <div>
      <h2>
        {error}
      </h2>
    </div>
  )
}