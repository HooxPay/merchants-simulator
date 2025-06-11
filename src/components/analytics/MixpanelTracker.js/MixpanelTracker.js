'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import { initMixpanel, trackCustomEvent } from '@/lib/mixpanel'

export default function MixpanelTracker() {
  const pathname = usePathname()

  useEffect(() => {
    initMixpanel()
  }, [])

  useEffect(() => {
    trackCustomEvent('Page Viewed', { page: pathname })
  }, [pathname])

  return null
}
