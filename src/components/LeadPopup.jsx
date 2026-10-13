import { useEffect, useState } from 'react'
import LeadForm from './LeadForm'

function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleClick = (event) => {
      const trigger = event.target.closest?.('[data-lead-popup], a[href="#contact"]')

      if (!trigger) return

      event.preventDefault()
      setIsOpen(true)
    }

    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="lead-popup fixed inset-0 z-[99] flex items-center justify-center bg-[#060706]/95 px-[16px] py-[26px] backdrop-blur-[20px]"
      role="dialog"
      aria-modal="true"
      aria-label="Project enquiry form"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false)
        }
      }}
    >
      <div className="lead-popup-panel relative w-full max-w-[620px]">
        <a
          href="#close"
          className="lead-popup-close absolute right-[18px] top-[18px] z-[2] inline-flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white/10 text-white transition duration-300 hover:bg-[#d7ff2f] hover:text-[#101112]"
          aria-label="Close enquiry form"
          onClick={(event) => {
            event.preventDefault()
            setIsOpen(false)
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </a>

        <LeadForm
          className="lead-popup-form max-h-[min(86vh,760px)] overflow-y-auto pr-[58px]"
          title="Something Specific To Your Speciality?"
          responseTime="24 hours"
        />
      </div>
    </div>
  )
}

export default LeadPopup
