import { useEffect, useRef, useState } from 'react'
import dentalImage from '../assets/images/dental-clinics-service.jpg'
import eyeImage from '../assets/images/eye-hospitals-service.jpg'
import fertilityImage from '../assets/images/ivf-fartility-service.jpg'
import hospitalImage from '../assets/images/multi-speciality-hospitals-service.jpg'

const serviceItems = [
  {
    title: 'IVF & Fertility',
    image: fertilityImage,
    points: [
      'IVF & IUI Process Explainers',
      'Success-Rate Context, Stated Plainly',
      'Content That Acknowledges The Emotional Weight Of Trying Again',
      'Cost & Instalment Clarity, Upfront',
    ],
    stat: { value: '3.1X', caption: 'More Enquiry DMs. Typical 6 Month Engagement' },
    cta: 'Audit My IVF & Fertility Presence',
  },
  {
    title: 'Eye Hospitals',
    image: eyeImage,
    points: [
      'Symptom-Recognition Content ("Signs Not To Ignore")',
      'Cataract & Lasik Procedure Explainers',
      'Pre-Op & Post-Op Expectation-Setting',
      'Content Built For An Older, More Cautious Audience',
    ],
    stat: { value: '+48%', caption: 'LASIK Enquiry Share. Typical 6 Month Engagement' },
    cta: 'Audit My Eye Clinic/Hospital Presence',
  },
  {
    title: 'Dental Clinics',
    image: dentalImage,
    points: [
      'Implant & Aligner Explainers',
      'Documented, Consented Before--After Content',
      'Clear Pricing & Instalment Information',
      'Local Reputation & Review-Led Content',
    ],
    stat: { value: '2.4X', caption: 'Consultation Bookings. Typical 6 Month Engagement' },
    cta: 'Audit My Dental Clinic/Hospital Presence',
  },
  {
    title: 'Multi-Speciality Hospitals',
    image: hospitalImage,
    points: [
      'Department-Specific Content Calendars',
      'Doctor-Led Authority Content, By Department',
      'Facility & Infrastructure Films',
      'Patient Experience Stories, With Consent',
    ],
    stat: { value: '11', caption: 'Departments Run Monthly. Typical 6 Month Engagement' },
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
      className="service-sec overflow-hidden rounded-t-[28px] bg-[#070909] py-[60px] text-white md:py-[86px] lg:py-[110px]"
      id="specialities"
    >
      <div className="container">
        <div className="overflow-hidden px-[0px]">
          <div className="mb-[54px] grid items-start gap-[28px] lg:grid-cols-[180px_minmax(0,1fr)_220px]">
            <div className="flex items-center gap-[12px] text-[15px] font-semibold text-white py-[15px]">
              <span className="h-[10px] w-[10px] shrink-0 bg-white"></span>
              SPECIALITIES
            </div>

            <div
              className={`heading ${isVisible
                  ? 'about-slide-left about-motion-in'
                  : 'about-slide-left'
                }`}
            >
              <h2 className="max-w-[650px] !text-white">
                Every Speciality Has Its Own{' '}
                <span className="heading-accent">Marketing Plan!</span>
              </h2>
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
                  className={`group grid min-h-[80px] border-b border-white/20 transition-all duration-[400ms] ease-out last:border-b-0 lg:grid-cols-[130px_minmax(0,1fr)_390px] xl:grid-cols-[130px_minmax(0,1fr)_470px] 2xl:grid-cols-[130px_minmax(0,1fr)_540px] ${isActive ? 'service-item-open' : ''
                    }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                >
                  <div className="border-white/20 py-[22px] text-[15px] text-white/70 lg:border-r">
                    Speciality : {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="py-[22px] lg:px-[64px]">
                    <a
                      href="#!"
                      className={`service-title-link mb-[18px] inline-block text-[24px] font-[600] leading-[32px] transition duration-[400ms] md:text-[27px] md:leading-[36px] ${isActive ? 'text-white' : 'text-white/45'
                        }`}
                      onClick={(event) => event.preventDefault()}
                    >
                      {service.title}
                    </a>

                    <div className={`service-panel ${isActive ? 'is-open' : ''}`}>
                      <div className="service-panel-inner overflow-hidden">
                        <ul className="mb-[30px] grid gap-[14px] text-[17px] text-white">
                          {service.points.map((point) => (
                            <li key={point} className="service-li flex gap-[10px]">
                              <span className="text-[22px] leading-[20px]">
                                +
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="mb-[24px]">
                          <strong className="block text-[32px] font-[700] leading-[38px] text-white md:text-[36px] md:leading-[42px]">
                            {service.stat.value}
                          </strong>
                          <span className="mt-[6px] block text-[15px] leading-[24px] text-white/75">
                            {service.stat.caption}
                          </span>
                        </p>
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
                      className={`overflow-hidden transition-[height] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive
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
