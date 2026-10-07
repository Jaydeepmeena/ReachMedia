import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/reach-media-logo-1.png'

const menuItems = [
  { label: 'Specialities', href: '#specialities' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Why Us', href: '#why-choose-us' },
  { label: 'Results', href: '#results' },
  { label: 'Work', href: '#work' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Review', href: '#testimonials' },
]

const contactItems = [
  {
    label: 'Email Us',
    value: 'contact@reachmedia.co.in',
    href: 'mailto:contact@reachmedia.co.in',
    icon: 'fa-solid fa-envelope',
  },
  {
    label: 'Enquiry For Sales',
    value: '+91 91828 31207',
    href: 'tel:+919182831207',
    icon: 'fa-solid fa-phone-volume',
  },
  {
    label: 'WhatsApp & Messaging',
    value: '+91 91459 65775',
    href: 'https://wa.me/919145965775',
    icon: 'fa-brands fa-whatsapp',
  },
]

const socialItems = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/reachmedia.co.in/',
    icon: 'fa-brands fa-instagram',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61594659239826',
    icon: 'fa-brands fa-facebook-f',
  },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeHash, setActiveHash] = useState('')
  const cursorRef = useRef(null)
  const cursorOnLinkRef = useRef(false)

  useEffect(() => {
    const cursorPosition = {
      currentX: -80,
      currentY: -80,
      targetX: -80,
      targetY: -80,
    }
    let animationFrame = 0

    const renderCursor = () => {
      if (cursorRef.current) {
        cursorPosition.currentX +=
          (cursorPosition.targetX - cursorPosition.currentX) * 0.32
        cursorPosition.currentY +=
          (cursorPosition.targetY - cursorPosition.currentY) * 0.32

        cursorRef.current.style.left = `${cursorPosition.currentX}px`
        cursorRef.current.style.top = `${cursorPosition.currentY}px`
      }

      animationFrame = window.requestAnimationFrame(renderCursor)
    }

    const hideCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('is-visible')
      }
    }

    const handleMouseMove = (event) => {
      if (!cursorRef.current) {
        return
      }

      cursorRef.current.classList.add('is-visible')
      cursorPosition.targetX = event.clientX
      cursorPosition.targetY = event.clientY

      if (event.target.closest('a')) {
        cursorOnLinkRef.current = true
        cursorRef.current.classList.add('is-link')
      } else if (cursorOnLinkRef.current) {
        cursorOnLinkRef.current = false
        cursorRef.current.classList.remove('is-link')
      }
    }

    const handleMouseOver = (event) => {
      if (!cursorRef.current) {
        return
      }

      if (event.target.closest('a')) {
        cursorOnLinkRef.current = true
        cursorRef.current.classList.add('is-link')
      }
    }

    const handleMouseLeaveTarget = (event) => {
      if (!cursorRef.current || !cursorOnLinkRef.current) {
        return
      }

      const nextTarget = event.relatedTarget

      if (!nextTarget || !nextTarget.closest || !nextTarget.closest('a')) {
        cursorOnLinkRef.current = false
        cursorRef.current.classList.remove('is-link')
      }
    }

    const handleMouseOut = (event) => {
      if (!event.relatedTarget && !event.toElement) {
        hideCursor()
      }
    }

    animationFrame = window.requestAnimationFrame(renderCursor)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('blur', hideCursor)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseLeaveTarget)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('blur', hideCursor)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseLeaveTarget)
      document.removeEventListener('mouseout', handleMouseOut)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  useEffect(() => {
    const sectionItems = menuItems
      .map((item) => ({
        href: item.href,
        element: document.querySelector(item.href),
      }))
      .filter((item) => item.element)

    if (!sectionItems.length) {
      return undefined
    }

    let animationFrame = 0

    const updateActiveSection = () => {
      const checkPosition = window.scrollY + window.innerHeight * 0.45
      const currentItem = sectionItems.find((item) => {
        const rect = item.element.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        const sectionBottom = sectionTop + rect.height

        return checkPosition >= sectionTop && checkPosition <= sectionBottom
      })

      setActiveHash(currentItem ? currentItem.href : '')
    }

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const handleMenuClick = (href, event) => {
    const target = document.querySelector(href)

    if (target) {
      event?.preventDefault()
      const headerHeight =
        document.querySelector('.rm-site-header')?.offsetHeight ?? 0
      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - headerHeight - 18

      setActiveHash(href)
      window.history.pushState(null, '', href)

      if (window.lenis) {
        window.lenis.scrollTo(Math.max(targetTop, 0), {
          duration: 1.1,
        })
      } else {
        window.scrollTo({
          top: Math.max(targetTop, 0),
          behavior: 'smooth',
        })
      }
    } else if (href.startsWith('#')) {
      event?.preventDefault()
      window.history.pushState(null, '', href)
      setActiveHash(href)
    }

    setIsMenuOpen(false)
  }

  return (
    <>
      <span
        ref={cursorRef}
        className="service-cursor-dot pointer-events-none fixed left-[-80px] top-[-80px] z-[9999] hidden lg:block"
        aria-hidden="true"
      ></span>

      <div className="mob-view bg-white">
        <div className="container">
          <div className="flex items-center justify-between border-b border-[#2538501f] py-[8px]">
            <div className="flex min-w-0 items-center gap-[9px]">
              <a
                href="tel:+919182831207"
                className="flex min-w-0 items-center gap-[7px] text-[#253850]"
              >
                <span className="shrink-0 text-[20px] text-[#60bd6a]">
                  <i className="fa-solid fa-phone-volume"></i>
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase leading-[13px] tracking-[0.5px] text-slate-500">
                    Enquiry For Sales
                  </span>
                  <strong className="block whitespace-nowrap text-[13px] font-bold leading-[17px]">
                    +91 91828 31207
                  </strong>
                </span>
              </a>

              <span className="shrink-0 text-[20px] font-light leading-none text-[#2538505c]">
                \\
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-[8px]">
              {socialItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="inline-flex h-[30px] w-[30px] items-center justify-center text-[18px] text-[#60bd6a] transition-colors duration-300 hover:text-[#43A0A1]"
                >
                  <i className={item.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <header className="rm-site-header sticky top-0 z-[999] bg-white pb-[10px]">
        <div className="container">
          <div className="rm-navbar-desktop desk-view relative hidden min-h-[136px] grid-cols-[250px_minmax(0,1fr)] lg:grid">
            <svg
              className="rm-nav-line pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 1180 136"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
              style={{ overflow: "visible" }}>
              <path d="M1180 68 H260 C240 68 230 78 230 98 V106 C230 126 220 136 200 136 H0" stroke="#aeb69b" strokeWidth="1.3" vectorEffect="non-scaling-stroke" strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="relative flex items-center justify-center">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <img
                  src={logo}
                  alt="Reach Media"
                  className="rm-navbar-logo block h-auto w-[170px]"
                />
              </Link>
            </div>

            <div className="grid grid-rows-[68px_68px]">
              <div className="rm-navbar-top flex items-center justify-between gap-[26px] pl-[93px] pr-[10px]">
                <div className="rm-contact-group flex min-w-0 items-center justify-start gap-[22px]">
                  {contactItems.map((item, index) => (
                    <div key={item.href} className="rm-contact-item flex items-center gap-[22px]">
                      {index > 0 && (
                        <span className="rm-contact-divider text-[26px] font-light leading-none text-[#2538505c]">
                          \\
                        </span>
                      )}
                      <a
                        href={item.href}
                        className="rm-contact-link group flex items-center gap-[11px] text-[#253850]"
                      >
                        <span className="rm-contact-icon inline-flex h-[34px] w-[34px] items-center justify-center text-[25px] text-[#60bd6a] transition-colors duration-300 group-hover:text-[#43A0A1]">
                          <i className={item.icon}></i>
                        </span>
                        <span>
                          <span className="rm-contact-label block text-[12px] font-bold uppercase tracking-[0.7px] text-slate-500">
                            {item.label}
                          </span>
                          <strong className="rm-contact-value block whitespace-nowrap text-[15px] font-bold leading-[21px] text-[#253850]">
                            {item.value}
                          </strong>
                        </span>
                      </a>
                    </div>
                  ))}
                </div>

                <div className="rm-socials flex shrink-0 items-center gap-[10px]">
                  {socialItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      className="rm-social-link inline-flex h-[48px] w-[48px] items-center justify-center rounded-full border border-white bg-white text-[18px] text-[#60bd6a] shadow-[1px_4px_3px_rgba(37,56,80,0.16)] transition-all duration-300 hover:border-[#60bd6a] hover:bg-transparent hover:text-[#43A0A1]"
                    >
                      <i className={item.icon}></i>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rm-navbar-bottom flex items-center justify-between gap-[24px] pl-[96px] pr-[10px]">
                <nav aria-label="Main navigation">
                  <ul className="rm-menu-list flex items-center justify-start gap-[30px]">
                    {menuItems.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className={`rm-menu-link inline-block whitespace-nowrap py-[20px] text-[14px] font-bold uppercase tracking-[0.3px] transition-colors duration-300 hover:text-[#4ba991] ${activeHash === item.href ? 'text-[#60bd6a]' : 'text-[#253850]'
                            }`}
                          onClick={(event) => handleMenuClick(item.href, event)}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <a
                  href="#contact"
                  data-lead-popup
                  className="rm-nav-cta btn btn-primary h-[50px] min-w-[166px] shrink-0"
                >
                  <span>Let&apos;s Talk</span>
                  <span className="btn-icon" aria-hidden="true">
                    <i className="fa-solid fa-arrow-turn-up fa-rotate-90"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="rm-navbar-mobile mob-view flex min-h-[76px] items-center justify-between border-b border-[#25385029]">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img
                src={logo}
                alt="Reach Media"
                className="block h-auto w-[118px]"
              />
            </Link>

            <button
              type="button"
              className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[8px] border border-slate-200 bg-white text-[#253850]"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
            >
              <span className="relative block h-[2px] w-[24px] rounded-full bg-[#253850] before:absolute before:left-0 before:top-[-7px] before:h-[2px] before:w-[24px] before:rounded-full before:bg-[#253850] before:content-[''] after:absolute after:left-0 after:top-[7px] after:h-[2px] after:w-[24px] after:rounded-full after:bg-[#253850] after:content-['']"></span>
            </button>
          </div>
        </div>

        <div
          className={`fixed inset-0 z-[1000] bg-slate-950/40 transition-opacity duration-300 lg:hidden ${isMenuOpen
              ? 'pointer-events-auto opacity-100'
              : 'pointer-events-none opacity-0'
            }`}
          onClick={() => setIsMenuOpen(false)}
        ></div>

        <aside
          className={`fixed inset-y-0 left-0 z-[1001] w-[min(350px,90vw)] bg-white px-[24px] py-[5px] shadow-2xl transition-transform duration-300 lg:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <div className="flex items-center justify-between border-b border-[#2538501a]">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img
                src={logo}
                alt="Reach Media"
                className="block h-auto w-[118px]"
              />
            </Link>

            <button
              type="button"
              className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-[10px] border border-slate-200 bg-white text-[28px] leading-none text-[#253850]"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
            >
              ×
            </button>
          </div>

          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`block border-b border-[#2538501a] py-[13px] text-[15px] font-[600] transition-colors duration-300 ${activeHash === item.href ? 'text-[#60bd6a]' : 'text-[#253850]'
                      }`}
                    onClick={(event) => handleMenuClick(item.href, event)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#contact"
            data-lead-popup
            className="btn btn-primary mt-5"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>Contact Us</span>
            <span className="btn-icon" aria-hidden="true">
              <i className="fa-solid fa-arrow-turn-up fa-rotate-90"></i>
            </span>
          </a>
        </aside>
      </header>
    </>
  )
}

export default Navbar
