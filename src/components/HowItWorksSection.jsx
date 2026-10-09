import { useEffect, useRef, useState } from 'react'
import complianceFirstImage from '../assets/images/compliance-first.jpg'
import enquiriesFirstImage from '../assets/images/enquiries-first.jpg'
import healthcareOnlyImage from '../assets/images/healthcare-only.jpg'
import paidMediaImage from '../assets/images/paid-media.jpg'

const processSteps = [
  {
    number: '01',
    tab: 'Healthcare Only',
    image: healthcareOnlyImage,
    title: 'Healthcare Only',
    description:
      "A generic agency treats a dental implant post the same way it treats a restaurant's dinner special. We don't, because the two have nothing in common. Every template, script and compliance check we use was built for doctors, clinics and hospitals, and for nothing else.",
    points: [
      {
        title: 'Built for Healthcare Decisions',
        description: 'Healthcare context shapes every template, script, campaign idea and review step.',
      },
      {
        title: 'Nothing Generic',
        description: 'Strategy is made for how patients choose a doctor or hospital, not for lifestyle marketing.',
      },
    ],
  },
  {
    number: '02',
    tab: 'Paid Media Planning',
    image: paidMediaImage,
    title: 'Paid Media Planning',
    description:
      "Social content and paid ads work better when one team plans both. Our parent team, Reinvent Digital, already runs Google and Meta ads for healthcare clients, so your content is built to feed the funnel, not sit beside it.",
    points: [
      {
        title: 'Content and Ads Planned Together',
        description: 'Every campaign idea is mapped to the treatment, audience and ad that will carry it.',
      },
      {
        title: 'Built for High-Intent Treatments',
        description: 'Budget goes behind the services patients are actively searching for.',
      },
    ],
  },
  {
    number: '03',
    tab: 'Compliance First',
    image: complianceFirstImage,
    title: 'Compliance First',
    description:
      'Most agencies learn about NMC advertising rules after a post gets flagged. We check patient consent, advertising norms and claim language before anything is scheduled, so your account never becomes the example of what not to post.',
    points: [
      {
        title: 'Consent Before Every Patient Story',
        description: 'Before/after and testimonial content needs documented consent, before the shoot and again before publishing.',
      },
      {
        title: 'Careful Claim Language',
        description: 'No guaranteed outcomes, no patient details, and no medical advice in captions.',
      },
    ],
  },
  {
    number: '04',
    tab: 'Enquiry Reporting',
    image: enquiriesFirstImage,
    title: 'Enquiry Reporting',
    description:
      'A follower count tells a doctor or hospital team very little. We report on DMs, enquiries and consultations booked, because that is the number that matters to the person paying for this.',
    points: [
      {
        title: 'Reporting Beyond Reach',
        description: 'Monthly reviews trace enquiries back to the post, reel or ad that started them.',
      },
      {
        title: 'Clear Next Steps',
        description: 'Every report ends with what to keep, what to change and what to test next.',
      },
    ],
  },
]

function HowItWorksSection() {
  const sectionRef = useRef(null)
  const tabRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = processSteps[activeIndex]

  useEffect(() => {
    const activeTab = tabRefs.current[activeIndex]
    const tabList = activeTab?.parentElement

    if (!activeTab || !tabList) {
      return
    }

    const nextScrollLeft =
      activeTab.offsetLeft - tabList.clientWidth / 2 + activeTab.clientWidth / 2

    tabList.scrollTo({
      left: Math.max(nextScrollLeft, 0),
      behavior: 'smooth',
    })
  }, [activeIndex])

  useEffect(() => {
    const section = sectionRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const stickyLayout = window.matchMedia(
      '(max-width: 767px), (min-width: 992px)',
    )
    let frameId = 0

    if (!section || reduceMotion.matches) {
      return undefined
    }

    const updateActiveStep = () => {
      frameId = 0

      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const progress = stickyLayout.matches
        ? Math.min(Math.max(-rect.top / Math.max(rect.height - viewportHeight, 1), 0), 1)
        : Math.min(
            Math.max((viewportHeight * 0.5 - rect.top) / Math.max(rect.height, 1), 0),
            1,
          )
      const stepThresholds = [0.18, 0.43, 0.68, 0.9]
      const nextIndex = stepThresholds.findIndex((threshold) => progress < threshold)
      const resolvedIndex = nextIndex === -1 ? processSteps.length - 1 : nextIndex

      setActiveIndex((currentIndex) => (
        currentIndex === resolvedIndex ? currentIndex : resolvedIndex
      ))
    }

    const requestUpdate = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(updateActiveStep)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    stickyLayout.addEventListener('change', requestUpdate)

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      stickyLayout.removeEventListener('change', requestUpdate)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="how-it-scroll-stage relative px-[10px] pb-[60px] text-white lg:pb-[60px]"
    >
      <div className="how-it-sticky-panel relative z-[2]">
        <div className="how-it-heading-panel relative z-[1] overflow-hidden rounded-b-[30px] bg-[#070909] px-[24px] pb-[138px] pt-[60px] text-center md:px-[48px] lg:pb-[168px] lg:pt-[96px]">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          ></div>

          <div className="relative z-[1] heading" data-reveal="left">
            <h4 className="justify-center">The Reach Media Difference</h4>
            <h2 className="mt-[16px] !text-white">
              From First Scroll to First Appointment,
              <span className="block text-[#b8ee00]">Built for Healthcare!</span>
            </h2>
            <p className="mx-auto mt-[20px] max-w-[680px] text-[17px] leading-[31px] text-white/66">
              Healthcare-only planning, paid media alignment, consent checks
              and enquiry reporting keep every doctor, clinic and hospital
              account focused on real patient action.
            </p>
          </div>
        </div>

        <div className="container">
          <div className="relative z-[2] mx-auto mt-[-76px] grid overflow-hidden rounded-[30px] border border-white/10 bg-[#101a1f] lg:mt-[-104px] lg:grid-cols-[0.98fr_1.02fr]" data-reveal="up">
            <div className="relative overflow-hidden bg-[#131313d9] px-[28px] py-[36px] md:px-[54px] md:py-[56px]">
              <div
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)',
                  backgroundSize: '22px 22px',
                }}
              ></div>

              <div className="relative z-[1]">
                <div className="how-it-tabs flex flex-nowrap gap-[14px] overflow-x-auto pb-[8px]">
                  {processSteps.map((item, index) => (
                    <button
                      key={item.number}
                      ref={(node) => {
                        tabRefs.current[index] = node
                      }}
                      type="button"
                      className={`min-h-[54px] min-w-max shrink-0 rounded-full border px-[22px] py-[13px] text-[13px] font-[800] leading-[18px] transition duration-300 ${activeIndex === index
                          ? 'border-[#60bd6a] bg-[#60bd6a] text-white'
                          : 'border-white/14 bg-white text-[#070909] hover:border-[#60bd6a] hover:bg-[#f3fbf4] hover:text-[#101112]'
                        }`}
                      onClick={() => setActiveIndex(index)}
                    >
                      {item.tab}
                    </button>
                  ))}
                </div>

                <div key={activeStep.title} className="how-it-card work-detail-animate mt-[52px]">
                  <h3 className="font-['Nunito'] text-[24px] font-[800] leading-[30px] text-white md:text-[31px] md:leading-[39px]">
                    {activeStep.title}
                  </h3>
                  <p className="mt-[14px] max-w-[650px] text-[15px] leading-[26px] text-white/72 md:text-[17px] md:leading-[31px]">
                    {activeStep.description}
                  </p>

                  <div className="mt-[32px] grid gap-[24px] md:mt-[38px] md:gap-[28px]">
                    {activeStep.points.map((point) => (
                      <div key={point.title} className="flex gap-[22px]">
                        <span className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#60bd6a] text-[16px] text-white">
                          <i className="fa-solid fa-check"></i>
                        </span>
                        <div>
                          <h4 className="font-['Nunito'] text-[19px] font-[800] leading-[25px] text-white md:text-[22px] md:leading-[30px]">
                            {point.title}
                          </h4>
                          <p className="mt-[8px] text-[14px] leading-[24px] text-white/64 md:text-[16px] md:leading-[27px]">
                            {point.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden lg:min-h-[560px]">
              <img
                key={activeStep.image}
                src={activeStep.image}
                alt={activeStep.title}
                className="absolute inset-0 h-full w-full object-cover object-center work-detail-animate"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
