'use client'

import Link from '@mui/material/Link'
import { trackCustomEvent } from '@/lib/mixpanel'

export default function TrackedLink({
  href,
  onClick,
  children,
  clickType,
  ...props
}) {
  const isExternal =
    typeof href === 'string' &&
    (href.startsWith('http://') || href.startsWith('https://'))

  const handleClick = (e) => {
    const eventName = isExternal ? 'External Navigation' : 'Internal Navigation'

    const eventData = {
      Target: href,
    }

    if (clickType) {
      eventData['Click Type'] = clickType
    }

    trackCustomEvent(eventName, eventData)

    if (onClick) onClick(e)
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      target={isExternal ? '_blank' : props.target}
      rel={isExternal ? 'noopener noreferrer' : props.rel}
      {...props}
    >
      {children}
    </Link>
  )
}
