import { useEffect, useRef, useState } from 'react'
import AboutPhoneCarousel from './AboutPhoneCarousel'
import MobilePartnerWall from './MobilePartnerWall'
import credenceDentalLogo from '../assets/images/credence-dental.avif'
import dentalRootsLogo from '../assets/images/dental-roots.avif'
import eledentInternationalLogo from '../assets/images/eledent-international.avif'
import iviaDentalLogo from '../assets/images/ivia-dental.avif'
import kamineniFertilityLogo from '../assets/images/kamineni-fertility.avif'
import kamineniHospitalsLogo from '../assets/images/kamineni-hospitals.avif'
import keniaEyeDentalLogo from '../assets/images/kenia-eye-dental.avif'
import mbraceKamineniLogo from '../assets/images/mbrace-kamineni.avif'
import ndcLogo from '../assets/images/ndc-logo.png'
import oracarePrimeLogo from '../assets/images/oracare-prime.avif'
import parthaDentalLogo from '../assets/images/partha-dental.avif'
import psriHospitalLogo from '../assets/images/psri-hospital.avif'
import radiantDentalCareLogo from '../assets/images/radiant-dental-care.avif'

const features = [
  {
    value: 100,
    suffix: '%',
    label: 'Healthcare-Only Focus',
    color: 'bg-[#60bd6a]',
    icon: 'fa-solid fa-heart-pulse',
  },
  {
    value: 120,
    suffix: '+',
    label: 'Clinic Locations Supported',
    color: 'bg-[#43A0A1]',
    icon: 'fa-solid fa-location-dot',
  },
]

const partners = [
  { name: 'NDC', logo: ndcLogo },
  { name: 'Kamineni Hospitals', logo: kamineniHospitalsLogo },
  { name: 'Kamineni Fertility', logo: kamineniFertilityLogo },
  { name: 'M Brace Kamineni', logo: mbraceKamineniLogo },
  { name: 'PSRI Hospital', logo: psriHospitalLogo },
  { name: 'Radiant Dental Care', logo: radiantDentalCareLogo },
  { name: 'Partha Dental', logo: parthaDentalLogo },
  { name: 'Credence Dental', logo: credenceDentalLogo },
  { name: 'Dental Roots', logo: dentalRootsLogo },
  { name: 'Eledent International', logo: eledentInternationalLogo },
  { name: 'IVIA Dental', logo: iviaDentalLogo },
  { name: 'Kenia Eye & Dental', logo: keniaEyeDentalLogo },
  { name: 'Oracare Prime', logo: oracarePrimeLogo },
]

function CounterNumber({ value, suffix = '', isActive }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) {
      return undefined
    }

    let frame = 0
    const duration = 1400
    const start = performance.now()

    const updateCount = (time) => {
      const progress = Math.min((time - start) / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      setCount(Math.round(value * easedProgress))

      if (progress < 1) {
        frame = requestAnimationFrame(updateCount)
      }
    }

    frame = requestAnimationFrame(updateCount)

    return () => cancelAnimationFrame(frame)
  }, [isActive, value])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

function AboutSection() {
  const marqueeItems = [...partners, ...partners]
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.28 },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="overflow-hidden py-[60px]"
    >
      <div className="container">
        <div className="grid items-start gap-[34px] lg:grid-cols-[0.9fr_1.1fr]">
          <div
            className="relative z-[3] order-2 flex min-w-0 justify-center lg:order-1 lg:h-[725px]"
          >
            <AboutPhoneCarousel />
          </div>

          <div
            className={`relative z-[4] order-1 text-left lg:order-2 ${isVisible
                ? 'about-reveal about-reveal-in delay-[120ms]'
                : 'about-reveal'
              }`}
          >
            <div className="heading">
              <h4>A SOCIAL INITIATIVE BY REINVENT DIGITAL</h4>
              <h2>
                Backed By{' '}
                <span className="heading-accent">
                  Experienced Healthcare Marketers
                </span>
              </h2>
            </div>

            <p className="mt-[20px] text-[16px] leading-[30px] text-slate-600 md:text-[17px] md:leading-[32px]">
              Reach Media is the social media arm of Reinvent Digital, a team that already runs SEO, paid ads and patient-acquisition reporting for clinics and hospitals across India. We plan content the same way we plan a paid campaign: around what actually turns into an inquiry, not around what gets a like.
            </p>

            <div className="mt-[34px] grid gap-[24px] md:grid-cols-2">
              {features.map((feature) => (
                <div className="flex gap-[16px]" key={feature.label}>
                  <span
                    className={`inline-flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full text-[20px] text-white ${feature.color}`}
                  >
                    <i className={feature.icon}></i>
                  </span>
                  <div>
                    <h3 className="mb-[4px] text-[28px] font-[800] leading-[32px] text-slate-950">
                      <CounterNumber
                        value={feature.value}
                        suffix={feature.suffix}
                        isActive={isVisible}
                      />
                    </h3>
                    <p className="m-0 text-[15px] font-[700] leading-[24px] text-slate-700">
                      {feature.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="relative z-[2] mt-[24px] w-full overflow-hidden rounded-[26px] border border-white/10 bg-[#101a1f] px-[18px] pb-[36px] pt-[38px] max-md:mx-[-16px] max-md:w-[calc(100%+32px)] max-md:rounded-none max-md:border-0 max-md:bg-[#0f0f0f] md:px-[34px] lg:mt-[-268px] lg:px-[52px] lg:pb-[70px] lg:pl-[430px] lg:pt-[54px]"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          ></div>

          <div className="relative z-[1] heading mx-auto mb-[30px] max-w-[720px] text-center lg:mb-[40px]">
            <h3 className="text-white">
              Trusted Partners
            </h3>
          </div>

          <MobilePartnerWall partners={partners} />

          <div
            className="partner-marquee relative hidden overflow-hidden md:block"
            aria-label="Partner logos"
          >
            <div className="partner-track flex w-max items-center gap-[35px]">
              {marqueeItems.map((partner, index) => (
                <div
                  className="partner-logo-card group flex h-[76px] w-[160px] shrink-0 items-center justify-center rounded-[10px] border border-white bg-white px-[12px] transition-colors duration-300 focus:outline-none"
                  tabIndex={0}
                  key={`${partner.name}-${index}`}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-[52px] max-w-full object-contain opacity-100 transition duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
