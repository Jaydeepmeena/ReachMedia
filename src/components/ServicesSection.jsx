import { useEffect, useRef, useState } from 'react'
import dentalImage from '../assets/images/dental-clinics-service.jpg'
import eyeImage from '../assets/images/eye-hospitals-service.jpg'
import fertilityImage from '../assets/images/ivf-fartility-service.jpg'
import hospitalImage from '../assets/images/multi-speciality-hospitals-service.jpg'

const serviceItems = [
  {
    title: 'IVF & Fertility',
    image: fertilityImage,
    description:
      'Fertility treatment is rarely discussed openly, which means most of the research happens quietly, over several months, before a couple ever calls a clinic. Content built for this speciality has to hold that patience, answering cost, process and success-rate questions clearly, without pushing for an enquiry too soon.',
    points: [
      'IVF & IUI Process Explainers',
      'Success-Rate Context, Stated Plainly',
      'Content That Acknowledges The Emotional Weight Of Trying Again',
      'Cost & Instalment Clarity, Upfront',
    ],
    stat: '3.1X',
    statText: 'More Enquiry DMs. Typical 6 Month Engagement',
    cta: 'Audit My IVF & Fertility Presence',
  },
  {
    title: 'Eye Hospitals',
    image: eyeImage,
    description:
      'An eye patient often moves from noticing a symptom to booking a consultation within days, sometimes hours. Content for this speciality has to recognise urgency without exaggerating risk, and explain routine procedures clearly enough that older patients feel informed rather than alarmed.',
    points: [
      'Symptom-Recognition Content ("Signs Not To Ignore")',
      'Cataract & Lasik Procedure Explainers',
      'Pre-Op & Post-Op Expectation-Setting',
      'Content Built For An Older, More Cautious Audience',
    ],
    stat: '+48%',
    statText: 'LASIK Enquiry Share. Typical 6 Month Engagement',
    cta: 'Audit My Eye Clinic/Hospital Presence',
  },
  {
    title: 'Dental Clinics',
    image: dentalImage,
    description:
      'Dental patients decide faster when they can see the outcome for themselves, which is why comparable, visual content works harder here than in most other specialities. Every treatment gets explained alongside what it actually costs, since price is usually the first real objection.',
    points: [
      'Implant & Aligner Explainers',
      'Documented, Consented Before-After Content',
      'Clear Pricing & Instalment Information',
      'Local Reputation & Review-Led Content',
    ],
    stat: '2.4X',
    statText: 'Consultation Bookings. Typical 6 Month Engagement',
    cta: 'Audit My Dental Clinic/Hospital Presence',
  },
  {
    title: 'Multi-Speciality Hospitals',
    image: hospitalImage,
    description:
      'A multi-speciality hospital is effectively several clinics operating under one name. Each department needs its own content voice and its own calendar slot, while the hospital brand itself keeps building trust across all of them at once, one is not sacrificed for the other.',
    points: [
      'Department-Specific Content Calendars',
      'Doctor-Led Authority Content, By Department',
      'Facility & Infrastructure Films',
      'Patient Experience Stories, With Consent',
    ],
    stat: '11',
    statText: 'Departments Run Monthly. Typical 6 Month Engagement',
    cta: 'Audit My Multi-Speciality Presence',
  },
]

function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
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
      { threshold: 0.16 },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden rounded-t-[28px] bg-[#070909] py-[60px] text-white md:py-[86px] lg:py-[110px]"
      id="services"
    >
      <div className="container">
        <div className="overflow-hidden px-[0px]">
          <div className="mb-[54px] grid gap-[28px] lg:grid-cols-[180px_minmax(0,1fr)_220px]">
            <div className="flex gap-[14px] text-[15px] font-semibold text-white/90 py-[15px]">
              <span className="h-[13px] w-[13px] border border-white/45"></span>
              <span>Our Services</span>
              <span className="h-[13px] w-[13px] border border-white/45"></span>
            </div>

            <div
              className={`heading ${
                isVisible
                  ? 'about-slide-left about-motion-in'
                  : 'about-slide-left'
              }`}
            >
              <h2 className="max-w-[650px] !text-white">
                Every speciality has its own{' '}
                <span className="text-[#b8ee00]">marketing plan</span>
              </h2>
              <p className="mt-[22px] max-w-[760px] text-[17px] leading-[30px] text-white/72">
                A couple researching IVF, a 62-year-old worried about their
                vision, and a parent weighing braces prices are all making real
                decisions; just not on the same clock. That's what 10+ years in
                healthcare marketing taught us: one calendar can't carry every
                speciality.
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex h-[52px] w-fit items-center gap-[14px] rounded-full bg-white/15 pr-[22px] text-[16px] font-medium text-white transition duration-[400ms] hover:bg-white hover:text-[#070909]"
            >
              <span className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-[#070909]">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              Know More
            </a>
          </div>

          <div className="border-t border-white/20">
            {serviceItems.map((service, index) => {
              const isActive = activeIndex === index

              return (
                <article
                  key={service.title}
                  tabIndex={0}
                  className={`group grid min-h-[80px] border-b border-white/20 transition-all duration-[400ms] ease-out last:border-b-0 lg:grid-cols-[130px_minmax(0,1fr)_390px] xl:grid-cols-[130px_minmax(0,1fr)_470px] 2xl:grid-cols-[130px_minmax(0,1fr)_540px] ${
                    isActive ? 'service-item-open' : ''
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                >
                  <div className="border-white/20 py-[22px] text-[15px] text-white/70 lg:border-r">
                    Service : {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="py-[22px] lg:px-[64px]">
                    <a
                      href="#!"
                      className={`service-title-link mb-[18px] inline-block font-['Nunito'] text-[29px] font-[800] leading-[38px] transition duration-[400ms] md:text-[34px] md:leading-[44px] ${
                        isActive ? 'text-white' : 'text-white/45'
                      }`}
                      onClick={(event) => event.preventDefault()}
                    >
                      {service.title}
                    </a>

                    <div className={`service-panel ${isActive ? 'is-open' : ''}`}>
                      <div className="service-panel-inner overflow-hidden">
                        <p className="mb-[24px] max-w-[520px] text-[17px] leading-[30px] text-white/75">
                          {service.description}
                        </p>
                        <ul className="mb-[30px] grid gap-[14px] text-[17px] text-white">
                          {service.points.map((point) => (
                            <li key={point} className="flex gap-[10px]">
                              <span className="text-[22px] leading-[20px]">
                                +
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mb-[26px]">
                          <strong className="font-['Nunito'] text-[42px] font-[800] leading-none text-[#b8ee00]">
                            {service.stat}
                          </strong>
                          <span className="mt-[6px] block max-w-[360px] text-[15px] font-[700] leading-[22px] text-white/90">
                            {service.statText}
                          </span>
                        </div>
                        <a
                          href="#contact"
                          className="inline-flex h-[50px] w-fit items-center gap-[14px] rounded-full border border-white/30 pr-[24px] text-[15px] font-semibold text-white transition duration-[400ms] hover:border-white hover:bg-white hover:text-[#070909]"
                        >
                          <span className="inline-flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-[#070909]">
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>
                          {service.cta}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="py-[0px] lg:py-[0px]">
                    <div
                      className={`overflow-hidden transition-[height] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive
                          ? 'max-h-[400px] h-[190px] sm:h-[230px] lg:h-[360px]'
                          : 'h-[58px] sm:h-[78px] lg:h-[82px]'
                      }`}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
