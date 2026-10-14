import { useEffect, useRef, useState } from 'react'
import logoIcon from '../assets/images/reach-media-icon.svg'

const brandLetters = 'Reach Media'.split('')
const footerYear = new Date().getFullYear()

const quickLinks = [
  { label: 'Specialities', href: '#specialities' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Why Us', href: '#why-choose-us' },
  { label: 'Work Samples', href: '#reels' },
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

function FooterSection() {
  const brandRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [openPanel, setOpenPanel] = useState(null)

  const togglePanel = (key) => {
    setOpenPanel((current) => (current === key ? null : key))
  }

  useEffect(() => {
    const brand = brandRef.current

    if (!brand) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(brand)

    return () => observer.disconnect()
  }, [])

  return (
    <footer id="contact" className="relative overflow-hidden bg-[#0a0b0a] pt-[40px] text-white md:pt-[64px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(184,238,0,0.14) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      ></div>
      <img
        src={logoIcon}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-70px] right-[4vw] h-[300px] w-[300px] object-contain opacity-[0.022] grayscale md:bottom-[-120px] md:h-[520px] md:w-[520px]"
      />

      <div className="container relative z-[2]">
        <div
          ref={brandRef}
          className="flex items-end gap-[12px] border-b border-white/10 pb-[28px] sm:gap-[18px] sm:pb-[36px] md:gap-[26px] md:pb-[40px]"
        >
          <img
            src={logoIcon}
            alt=""
            aria-hidden="true"
            className="h-[58px] w-[58px] shrink-0 object-contain sm:h-[72px] sm:w-[72px] md:h-[110px] md:w-[110px]"
          />

          <h2 className="text-[28px] font-[800] leading-none text-white sm:text-[42px] md:text-[76px]">
            {brandLetters.map((letter, index) => (
              <span className="footer-letter-mask" key={`${letter}-${index}`}>
                <span
                  className={`footer-letter ${isVisible ? 'footer-letter-in' : ''}`}
                  style={{ animationDelay: `${index * 110}ms` }}
                >
                  {letter === ' ' ? ' ' : letter}
                </span>
              </span>
            ))}
          </h2>
        </div>

        <div className="grid gap-[40px] py-[50px] sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr]">
          <div>
            <h3 className="max-w-[440px] text-[24px] font-[800] leading-[32px] text-white">
              Let&apos;s grow your clinic&apos;s enquiries together
            </h3>

            <p className="mt-[16px] max-w-[280px] text-[15px] leading-[26px] text-white/55">
              We help healthcare and service brands plan smarter campaigns,
              create stronger content, and grow enquiries with clarity.
            </p>

            <a
              href="#contact"
              data-lead-popup
              className="mt-[26px] inline-flex h-[54px] items-center gap-[14px] rounded-full bg-white px-[8px] pr-[24px] text-[14px] font-[700] text-[#101112] transition duration-300 hover:bg-[#d7ff2f]"
            >
              <span className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#101112] text-white">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              Let&apos;s Talk
            </a>
          </div>

          <div className="sm:contents">
            <div className="grid grid-cols-2 gap-[10px] sm:hidden">
              <button
                type="button"
                onClick={() => togglePanel('links')}
                className="flex items-center justify-between gap-[8px] rounded-[12px] border border-white/10 bg-white/[0.03] px-[16px] py-[14px] text-left"
                aria-expanded={openPanel === 'links'}
              >
                <span className="text-[12px] font-[700] uppercase tracking-[0.08em] text-white/70">
                  Quick Links
                </span>
                <i
                  className={`fa-solid ${openPanel === 'links' ? 'fa-minus' : 'fa-plus'} text-[11px] text-white/50`}
                ></i>
              </button>

              <button
                type="button"
                onClick={() => togglePanel('contact')}
                className="flex items-center justify-between gap-[8px] rounded-[12px] border border-white/10 bg-white/[0.03] px-[16px] py-[14px] text-left"
                aria-expanded={openPanel === 'contact'}
              >
                <span className="text-[12px] font-[700] uppercase tracking-[0.08em] text-white/70">
                  Get In Touch
                </span>
                <i
                  className={`fa-solid ${openPanel === 'contact' ? 'fa-minus' : 'fa-plus'} text-[11px] text-white/50`}
                ></i>
              </button>
            </div>

            <div
              className={`grid transition-all duration-300 sm:hidden ${
                openPanel === 'links' ? 'mt-[14px] grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <ul className="grid gap-[14px] overflow-hidden pb-[2px]">
                {quickLinks.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-[15px] font-[600] text-white/70 transition-colors duration-300 hover:text-[#d7ff2f]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`grid transition-all duration-300 sm:hidden ${
                openPanel === 'contact' ? 'mt-[14px] grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <ul className="grid gap-[18px] overflow-hidden pb-[2px]">
                {contactItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="group flex items-center gap-[14px]">
                      <span className="inline-flex shrink-0 items-center justify-center text-[20px] text-white transition-colors duration-300">
                        <i className={item.icon}></i>
                      </span>
                      <span>
                        <span className="block text-[12px] uppercase tracking-[0.06em] text-white/45">
                          {item.label}
                        </span>
                        <strong className="block text-[15px] font-[700] text-white">
                          {item.value}
                        </strong>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden sm:block">
              <h4 className="text-[14px] font-[700] uppercase tracking-[0.1em] text-white/45">
                Quick Links
              </h4>
              <ul className="mt-[22px] grid gap-[14px]">
                {quickLinks.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-[15px] font-[600] text-white/70 transition-colors duration-300 hover:text-[#d7ff2f]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden sm:block">
              <h4 className="text-[14px] font-[700] uppercase tracking-[0.1em] text-white/45">
                Get In Touch
              </h4>
              <ul className="mt-[22px] grid gap-[18px]">
                {contactItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="group flex items-center gap-[14px]">
                      <span className="inline-flex shrink-0 items-center justify-center text-[22px] text-white transition-colors duration-300">
                        <i className={item.icon}></i>
                      </span>
                      <span>
                        <span className="block text-[12px] uppercase tracking-[0.06em] text-white/45">
                          {item.label}
                        </span>
                        <strong className="block text-[15px] font-[700] text-white">
                          {item.value}
                        </strong>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-[20px] border-t border-white/10 py-[28px]">
          <div className="flex items-center gap-[25px]">
            {socialItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-[5px] text-[15px] font-[600] text-white/70 transition-colors duration-300 hover:text-[#d7ff2f]"
              >
                <i className={`${item.icon} text-[18px]`}></i>
                {item.label}
              </a>
            ))}
          </div>

          <p className="text-[14px] text-white/45">
            © {footerYear} Reach Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
