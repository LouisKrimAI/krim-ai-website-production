import React, { useEffect } from 'react'

interface BookDemoPopupProps {
  isOpen: boolean
  onClose: () => void
  email: string
  firstName: string
  lastName: string
}

export default function BookDemoPopup({
  isOpen,
  onClose,
  email,
  firstName,
  lastName
}: BookDemoPopupProps) {
  useEffect(() => {
    if (isOpen) {
      // Load Cal.com embed script
      const script = document.createElement('script')
      script.src = 'https://app.cal.com/embed/embed.js'
      script.async = true
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const calLink = `https://cal.com/krim-website/30min?name=${encodeURIComponent(firstName + ' ' + lastName)}&email=${encodeURIComponent(email)}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4 bg-white rounded-lg shadow-xl overflow-hidden" style={{ maxHeight: '90vh' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00FF88] to-[#0099FF] p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-black">Book Your Demo</h2>
            <p className="text-black/80 mt-1">Choose a time that works best for you</p>
          </div>
          <button
            onClick={onClose}
            className="text-black/80 hover:text-black transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cal.com iframe */}
        <div className="p-6" style={{ height: 'calc(90vh - 120px)' }}>
          <iframe
            src={calLink}
            title="Book a Demo with Krim AI"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{
              border: 'none',
              borderRadius: '8px'
            }}
          />
        </div>

        {/* Alternative link */}
        <div className="px-6 pb-6">
          <p className="text-sm text-white text-center">
            Having trouble? <a href={calLink} target="_blank" rel="noopener noreferrer" className="text-[#0099FF] hover:underline">Open in new tab</a>
          </p>
        </div>
      </div>
    </div>
  )
}
