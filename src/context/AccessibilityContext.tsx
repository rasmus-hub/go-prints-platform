'use client'

import React, { createContext, useState } from 'react'

type AccessibilityContextType = {
  reducedMotion: boolean
  toggleReducedMotion: () => void
  highContrast: boolean
  toggleHighContrast: () => void
}

export const AccessibilityContext = createContext<AccessibilityContextType>({
  reducedMotion: false,
  toggleReducedMotion: () => {},
  highContrast: false,
  toggleHighContrast: () => {},
})

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)

  return (
    <AccessibilityContext.Provider value={{
      reducedMotion,
      toggleReducedMotion: () => setReducedMotion(!reducedMotion),
      highContrast,
      toggleHighContrast: () => setHighContrast(!highContrast),
    }}>
      <div className={`${reducedMotion ? 'reduce-motion' : ''} ${highContrast ? 'high-contrast' : ''}`}>
        {children}
      </div>
    </AccessibilityContext.Provider>
  )
}