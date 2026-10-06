import { useEffect, useRef, useState } from 'react'
import aboutImage from '../assets/images/about-us-img.png'
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
    icon: 'fa-solid fa-check',
    title: 'Strategy Built Around Growth',
    description:
      'Clear planning, audience intent, and creative direction for brands that want consistent results.',
  },
  {
    icon: 'fa-solid fa-check',
    title: 'Performance That Stays Visible',
    description:
      'Campaign execution, reporting, and optimization handled with a clear growth-focused process.',
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
      id="specialities"
      ref={sectionRef}
      className="overflow-hidden py-[60px]"
    >
      <div className="container">
        <div className="grid items-start gap-[34px] lg:grid-cols-[0.9fr_1.1fr]">
          <div
            className={`relative z-[3] order-2 flex justify-center lg:order-1 ${isVisible
                ? 'about-slide-left about-motion-in'
                : 'about-slide-left'
              }`}
          >
            <img
              src={aboutImage}
              alt="Reach Media support specialist"
              className="relative z-[3] max-h-[400px] w-auto object-contain sm:max-h-[610px] lg:max-h-[725px]"
            />
          </div>

          <div
            className={`relative z-[4] order-1 text-left lg:order-2 ${isVisible
                ? 'about-reveal about-reveal-in delay-[120ms]'
                : 'about-reveal'
              }`}
          >
            <div className="heading">
              <h4>Who We Are</h4>
              <h2>
                We turn digital attention into real growth.
              </h2>
            </div>

            <p className="mt-[20px] max-w-[760px] text-[16px] leading-[30px] text-slate-600 md:text-[17px] md:leading-[32px]">
              Reach Media partners with ambitious healthcare, service, and
              consumer brands to plan smarter campaigns, create stronger
              content, and improve digital performance with clarity.
            </p>

            <div className="mt-[34px] grid gap-[24px] md:grid-cols-2">
              {features.map((feature, index) => (
                <div className="flex gap-[16px]" key={feature.title}>
                  <span
                    className={`inline-flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full text-[20px] text-white ${index === 0 ? 'bg-[#60bd6a]' : 'bg-[#43A0A1]'
                      }`}
                  >
                    <i className={feature.icon}></i>
                  </span>
                  <div>
                    <h3 className="mb-[8px] text-[19px] font-bold leading-[27px] text-slate-950">
                      {feature.title}
                    </h3>
                    <p className="m-0 text-[15px] leading-[27px] text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`relative z-[2] mt-[0px] w-full overflow-hidden rounded-[26px] border border-white/10 bg-[#101a1f] px-[18px] pb-[36px] pt-[38px] md:mt-[-266px] md:px-[34px] lg:px-[52px] lg:pb-[46px] lg:pl-[430px] lg:pt-[54px]`}
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
              Trusted Partner's
            </h3>
          </div>

          <div
            className="partner-marquee relative overflow-hidden"
            aria-label="Partner logos"
          >
            <div className="partner-track flex w-max items-center gap-[35px]">
              {marqueeItems.map((partner, index) => (
                <div
                  className="partner-logo-card group flex h-[76px] w-[160px] shrink-0 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.035] px-[12px] transition-colors duration-300 focus:outline-none"
                  tabIndex={0}
                  key={`${partner.name}-${index}`}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-[52px] max-w-full object-contain opacity-55 grayscale transition duration-300"
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
