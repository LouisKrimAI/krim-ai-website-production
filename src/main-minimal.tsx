import React from 'react'
import { createRoot } from 'react-dom/client'

function MinimalApp() {
  return <div>REACT IS MOUNTING SUCCESSFULLY ✅</div>
}

const root = createRoot(document.getElementById('root')!)
root.render(<MinimalApp />)