import { useEffect, useRef, useState } from 'react'
import { EffectCards } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-cards'
import logoIcon from '../assets/images/reach-media-icon.svg'
import userIcon from '../assets/images/user-1.svg'

const testimonials = [
  {
    tag: 'Dental Clinic',
    headline: 'Our enquiries became predictable.',
    body: 'The monthly reporting is simple enough that our whole team actually reads it.',
    name: 'Dr. R. Mehta',
    role: 'Founder, Dental Clinic',
    initials: 'RM',
    color: '#60bd6a',
    cardColor: '#203348',
  },
  {
    tag: 'IVF & Fertility',
    headline: 'They understood our patients.',
    body: 'Content finally explains our procedures without sounding clinical.',
    name: 'S. Kapoor',
    role: 'Marketing Head, IVF & Fertility Centre',
    initials: 'SK',
    color: '#5b7cff',
    cardColor: '#26356e',
  },
  {
    tag: 'Eye Hospital',
    headline: 'Everything ties back to results.',
    body: "That's the kind of clarity we were missing for years.",
    name: 'Dr. A. Nair',
    role: 'Director, Eye Hospital',
    initials: 'AN',
    color: '#43A0A1',
    cardColor: '#1f5557',
  },
  {
    tag: 'Multi-Speciality Hospital',
    headline: 'Finally, one clear view.',
    body: 'Their reporting structure brought it all under one view.',
    name: 'V. Rao',
    role: 'Operations Head, Multi-Speciality Hospital',
    initials: 'VR',
    color: '#8b6ff0',
    cardColor: '#2f4663',
  },
  {
    tag: 'Dental Care Chain',
    headline: 'They treat our brand like their own.',
    body: 'Creative suggestions are always grounded in what actually moves patients to call.',
    name: 'Dr. P. Sharma',
    role: 'Founder, Dental Care Chain',
    initials: 'PS',
    color: '#e0a634',
    cardColor: '#315443',
  },
]

function Stars({ color }) {
  return (
    <div className="flex gap-[4px] text-[14px]" style={{ color }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <i key={index} className="fa-solid fa-star"></i>
      ))}
    </div>
  )
}

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)
  const activeIndexRef = useRef(0)
  const swiperRef = useRef(null)

  const showIndex = (index, speed = 840) => {
    if (index === activeIndexRef.current) return

    setActiveIndex(index)
    activeIndexRef.current = index

    if (swiperRef.current) {
      swiperRef.current.slideTo(index, speed)
    }
  }

  const goTo = (index, syncScroll = true) => {
    showIndex(index, 860)

    if (!syncScroll) return

    const el = sectionRef.current
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth

    if (!el || viewportWidth < 992) return

    const scrollableDistance = el.offsetHeight - viewportHeight
    const progress = index / (testimonials.length - 1)
    const targetTop = el.offsetTop + scrollableDistance * progress

    if (window.lenis) {
      window.lenis.scrollTo(targetTop, { duration: 0.9 })
      return
    }

    window.scrollTo({ top: targetTop, behavior: 'smooth' })
  }

  const isFirst = activeIndex === 0
  const isLast = activeIndex === testimonials.length - 1
  const goPrev = () => {
    if (isFirst) return
    goTo(activeIndex - 1)
  }
  const goNext = () => {
    if (isLast) return
    goTo(activeIndex + 1)
  }

  useEffect(() => {
    let frameId = 0

    const updateFromScroll = () => {
      frameId = 0
      const el = sectionRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight

      if (window.innerWidth < 992) return

      const pinnedDistance = Math.max(rect.height - viewportHeight, 1)
      const progress = Math.min(Math.max(-rect.top / pinnedDistance, 0), 1)

      const nextIndex = Math.min(
        testimonials.length - 1,
        Math.round(progress * (testimonials.length - 1)),
      )

      if (nextIndex !== activeIndexRef.current) {
        showIndex(nextIndex, 960)
      }
    }

    const requestUpdate = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(updateFromScroll)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="testimonials-scroll-stage relative bg-[#fbfcf8]"
    >
      <img
        src={logoIcon}
        alt=""
        aria-hidden="true"
        className="testi-section-bg-mark"
      />

      <div className="testimonials-sticky-panel py-[60px]">
        <div className="container">
          <div className="grid items-center gap-[48px] lg:grid-cols-[0.86fr_1.14fr] lg:gap-[76px]">
            <div>
              <div className="heading" data-reveal="left">
                <h4>Word From Our Clients</h4>
                <h2 className="testi-heading text-[70px]">
                  <span className="block text-[#d8e0eb]">What they have actually</span>
                  <span className="block text-[#48a75c]">felt, seen and received.</span>
                </h2>
              </div>

              <p className="mt-[24px] max-w-[470px] text-[17px] leading-[32px] text-[#6e7b72]" data-reveal="left" style={{ '--reveal-delay': '120ms' }}>
                Real feedback from healthcare brands we support.
                <br />
                Proof that the work is moving beyond vanity metrics.
              </p>
            </div>

            <div className="testi-right-panel">
              <div className="testi-card-deck">
                <Swiper
                  modules={[EffectCards]}
                  effect="cards"
                  grabCursor
                  speed={860}
                  cardsEffect={{
                    rotate: true,
                    perSlideOffset: 11,
                    perSlideRotate: 2.6,
                    slideShadows: false,
                  }}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper
                  }}
                  onSlideChange={(swiper) => {
                    const nextIndex = swiper.activeIndex

                    if (nextIndex === activeIndexRef.current) return

                    activeIndexRef.current = nextIndex
                    setActiveIndex(nextIndex)
                  }}
                  className="testi-swiper"
                >
                  {testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial.name}>
                      <article
                        className="testi-card"
                        style={{
                          '--card-bg': testimonial.cardColor,
                          '--card-accent': testimonial.color,
                        }}
                      >
                      <div className="flex items-center justify-between gap-[20px]">
                        <span className="inline-flex items-center rounded-full border border-white/18 px-[18px] py-[9px] text-[13px] font-[600] text-white/80 md:px-[20px] md:py-[10px]">
                          {testimonial.tag}
                        </span>
                        <Stars color="#b8ee00" />
                      </div>

                      <i className="fa-solid fa-quote-left mt-[32px] block text-[38px] text-[#b8ee00]"></i>

                      <h3 className="mt-[22px] max-w-[460px] font-['Nunito'] text-[31px] font-[800] leading-[39px] text-white md:text-[42px] md:leading-[51px]">
                        {testimonial.headline}
                      </h3>

                      <p className="mt-[20px] max-w-[560px] text-[16px] font-[600] leading-[30px] text-white/68 md:text-[18px] md:leading-[36px]">
                        {testimonial.body}
                      </p>

                      <div className="mt-[34px] border-t border-white/16 pt-[26px] md:mt-[42px] md:pt-[34px]">
                        <div className="flex items-center gap-[16px]">
                          <span
                            className="testi-avatar inline-flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full"
                            style={{ backgroundColor: testimonial.color }}
                          >
                            <img src={userIcon} alt="" aria-hidden="true" />
                          </span>
                          <div>
                            <h4 className="font-['Nunito'] text-[17px] font-[800] text-white/82 md:text-[19px]">
                              {testimonial.name}
                            </h4>
                            <p className="mt-[6px] text-[13px] text-white/52 md:text-[15px]">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                      </article>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="testi-card-shadow" aria-hidden="true"></div>
              </div>

              <div className="testi-nav-row">
                <div className="flex items-center gap-[14px] text-[16px] font-[800] text-[#203348]">
                  <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                  <span className="h-px w-[50px] bg-[#b7c4b4]"></span>
                  <span className="text-[#68796e]">
                    {String(testimonials.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex items-center gap-[14px]">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={isFirst}
                    aria-label="Previous testimonial"
                    className="testi-nav-btn testi-nav-btn-outline"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>

                  <button
                    type="button"
                    onClick={goNext}
                    disabled={isLast}
                    aria-label="Next testimonial"
                    className="testi-nav-btn testi-nav-btn-fill"
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
