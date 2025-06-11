'use client'

import { cloneElement } from 'react'
import { trackCustomEvent } from '@/lib/mixpanel'

export default function TrackedClick({ clickType, onClick, children }) {
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

    if (onClick) {
      onClick(e)
    }
    if (children.props?.onClick) children.props.onClick(e)
  }

  if (!children || typeof children !== 'object') return null

  return cloneElement(children, {
    ...children.props,
    onClick: handleClick,
  })
}
