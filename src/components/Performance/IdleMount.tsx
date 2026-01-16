import React, { useEffect, useState } from 'react'
export default function IdleMount({ children }: {children: React.ReactNode}) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const run = () => setReady(true)
    if ('requestIdleCallback' in window) (window as any).requestIdleCallback(run, { timeout: 1000 })
    else setTimeout(run, 200)
  }, [])
  return ready ? <>{children}</> : null
}