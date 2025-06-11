'use client'

import Button from '@mui/material/Button'
import { trackCustomEvent } from '@/lib/mixpanel'

export default function TrackedButton({
  clickType,
  onClick,
  children,
  ...props
}) {
  const handleClick = (e) => {
    const type =
      clickType ||
      (typeof children === 'string'
        ? children.trim()
        : typeof children?.props?.children === 'string'
          ? children.props.children.trim()
          : 'Unknown')

    trackCustomEvent('Click', {
      'Click Type': type,
    })

    if (onClick) onClick(e)
  }

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  )
}
