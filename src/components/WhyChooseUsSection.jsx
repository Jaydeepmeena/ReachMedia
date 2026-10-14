import { useEffect, useRef, useState } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const whyUsSliderBreakpoints = {
  0: { slidesPerView: 1, spaceBetween: 18 },
  640: { slidesPerView: 1.25, spaceBetween: 20 },
  1024: { slidesPerView: 3, spaceBetween: 26, allowTouchMove: false },
}

const reasons = [
  {
    title: 'Healthcare Only',
    description:
      'Every template, script and compliance check for each account is built for your clinics and hospitals.',
  },
  {
    title: 'Planned Alongside Paid Media',
    description:
      'Our parent team already runs Google and Meta ads for healthcare clients, so your content gets planned to feed that funnel, not published in isolation from it.',
  },
  {
    title: 'Consent and Compliance First',
    description:
      'We check patient consent, advertising norms and claim language before anything goes live, so your account never becomes the case study for what not to post.',
  },
  {
    title: 'Enquiries, Not Just Likes',
    description:
      "We report on DMs, enquiries and consults booked, because that's the only number that was ever going to matter to the person paying for this.",
  },
]

function CounterNumber({
  value,
  suffix = '',
  decimals = 0,
  isActive,
  useGrouping = false,
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) {
      return undefined
    }

    let frame = 0
    const duration = 3200
    const start = performance.now()

    const updateCount = (time) => {
      const progress = Math.min((time - start) / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      setCount(value * easedProgress)

      if (progress < 1) {
        frame = requestAnimationFrame(updateCount)
      }
    }

    frame = requestAnimationFrame(updateCount)

    return () => cancelAnimationFrame(frame)
  }, [isActive, value])

  return (
    <span>
      {useGrouping
        ? count.toLocaleString('en-US', {
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals,
          })
        : count.toFixed(decimals)}
      {suffix}
    </span>
  )
}

function WhyChooseUsSection() {
  const sectionRef = useRef(null)
  const [countersActive, setCountersActive] = useState(false)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersActive(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.28 },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="why-choose-us" className="bg-white">
      <div className="overflow-hidden rounded-t-[24px] border mx-[10px] border-[#d4edf8] bg-[#eefaff] px-[20px] py-[30px] md:px-[44px] md:py-[60px] lg:px-[90px] xl:px-[90px]">
        <div>
          <div className="why-head-bx grid gap-[42px] lg:grid-cols-[minmax(0,0.92fr)_minmax(380px,0.72fr)] lg:items-end xl:gap-[78px]">
            <div className="heading" data-reveal="left">
              <h4>Why Choose Reach Media</h4>

              <h2 className="max-w-[680px] !text-[#101820]">
                Healthcare-Focused Marketing Agency
                <span className="heading-accent block">
                  From Lead To Walk-Ins!
                </span>
              </h2>

              <p className="mt-[34px] max-w-[690px] text-[16px] leading-[30px] text-[#6d747b] md:text-[17px] md:leading-[34px]">
                We plan healthcare marketing with the same seriousness as a
                patient acquisition campaign: speciality content, consent
                checks, paid-media alignment and enquiry tracking.
              </p>

              <a
                href="#contact"
                className="mt-[34px] inline-flex h-[66px] items-center overflow-hidden rounded-[9px] bg-[#101112] pl-[28px] text-[15px] font-[800] text-white transition duration-300 hover:bg-[#60bd6a]"
              >
                <span className="pr-[36px]">Why Partner With Us</span>
                <span className="mr-[6px] inline-flex h-[56px] w-[56px] items-center justify-center rounded-[8px] bg-white text-[18px] text-[#101112] transition duration-300">
                  <i className="fa-solid fa-arrow-up-long rotate-45"></i>
                </span>
              </a>
            </div>

            <div className="why-head-point grid gap-[28px] pt-[4px]">
              {reasons.map((item, index) => (
                <article
                  key={item.title}
                  className="grid grid-cols-[42px_minmax(0,1fr)] gap-[18px]"
                  data-reveal="right"
                  style={{ '--reveal-delay': `${index * 100}ms` }}
                >
                  <span className="mt-[2px] inline-flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-[#b8ee00] text-[14px] text-[#101112]">
                    <i className="fa-solid fa-check"></i>
                  </span>
                  <div>
                    <h3 className="text-[17px] md:text-[19px] font-[800] leading-[25px] text-[#101820]">
                      {item.title}
                    </h3>
                    <p className="mt-[10px] text-[13px] md:text-[14px] leading-normal text-[#6d747b]">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation={{ prevEl: '.why-us-prev', nextEl: '.why-us-next' }}
            className="why-us-swiper mt-[62px] w-full !pb-[6px]"
            slidesPerView={1}
            spaceBetween={18}
            breakpoints={whyUsSliderBreakpoints}
            grabCursor
            data-reveal="up"
          >
            <SwiperSlide>
              <article
                className="flex min-h-[350px] flex-col justify-between rounded-[22px] bg-white px-[28px] py-[34px] text-center shadow-none lg:shadow-[0_18px_60px_rgba(37,56,80,0.06)] md:px-[44px] md:py-[42px]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(91,124,255,0.12) 1px, transparent 1px)',
                  backgroundSize: '18px 18px',
                }}
              >
                <div className="mx-auto flex w-full max-w-[360px] items-center justify-center">
                  <span className="inline-flex h-[66px] w-[66px] shrink-0 items-center justify-center rounded-full bg-[#5b7cff] text-[27px] text-white shadow-[0_12px_30px_rgba(91,124,255,0.28)]">
                    <i className="fa-regular fa-comment"></i>
                  </span>
                  <span className="h-px flex-1 bg-[#dfe7f4]"></span>
                  <span className="whitespace-nowrap rounded-full border border-[#dfe7f4] bg-white px-[24px] py-[14px] text-[18px] font-[600] text-[#5b7cff]">
                    AI Chat Assistant
                  </span>
                </div>

                <div className="mx-auto mt-[42px] inline-flex items-center gap-[10px] rounded-full border border-[#edf1f8] bg-white/85 px-[16px] py-[9px] text-[13px] font-[600] text-[#87909a] shadow-[0_12px_30px_rgba(37,56,80,0.04)]">
                  <span className="ai-typing-dot"></span>
                  <span className="ai-typing-dot [animation-delay:160ms]"></span>
                  <span className="ai-typing-dot [animation-delay:320ms]"></span>
                  <span>Generating lead reply</span>
                </div>

                <h3 className="mx-auto max-w-[390px] text-[23px] font-[800] leading-[30px] text-[#101820] xl:text-[25px] xl:leading-[32px]">
                  Instantly qualify leads with AI chat.
                </h3>
              </article>
            </SwiperSlide>

            <SwiperSlide>
              <article className="min-h-[350px] rounded-[22px] border-[6px] border-white bg-[#101112] p-[34px] text-white shadow-none lg:shadow-[0_18px_60px_rgba(37,56,80,0.08)]">
                <div className="flex items-start justify-between gap-[20px]">
                  <strong className="text-[60px] font-[800] leading-none text-[#b8ee00] md:text-[70px]">
                    <CounterNumber
                      value={96.8}
                      suffix="%"
                      decimals={1}
                      isActive={countersActive}
                    />
                  </strong>
                  <div className="audience-match-icons flex -space-x-[10px] pt-[7px]">
                    <span className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border-2 border-[#101112] bg-[#60bd6a] text-[15px]">
                      <i className="fa-solid fa-user-doctor"></i>
                    </span>
                    <span className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border-2 border-[#101112] bg-[#43A0A1] text-[15px]">
                      <i className="fa-solid fa-chart-simple"></i>
                    </span>
                  </div>
                </div>

                <div className="my-[28px] h-px bg-white/10"></div>

                <h3 className="text-[27px] font-[800] leading-[34px]">
                  Audience Match
                </h3>
                <p className="mt-[14px] max-w-[360px] text-[16px] leading-[29px] text-white/54">
                  Campaigns refined around service intent, geography, audience
                  behavior, and lead quality.
                </p>
              </article>
            </SwiperSlide>

            <SwiperSlide>
              <article className={`why-walkins-card ${countersActive ? 'is-active' : ''} relative flex h-full min-h-[350px] overflow-hidden rounded-[22px] bg-white p-[24px] shadow-none lg:shadow-[0_18px_60px_rgba(37,56,80,0.08)]`}>
                <span className="why-walkins-multiplier absolute right-[22px] top-[20px] select-none text-[84px] font-[800] italic leading-none text-[#101112]">
                  <CounterNumber
                    value={2}
                    suffix="x"
                    isActive={countersActive}
                  />
                </span>

                <div className="why-walkins-content relative z-[2] flex h-full w-full flex-col">
                  <div>
                    <span className="text-[12px] font-[800] uppercase tracking-[0.18em] text-[#60bd6a]">
                      Patient Growth
                    </span>
                    <h3 className="why-walkins-heading mt-[8px] max-w-[300px] text-[25px] font-[800] leading-[30px] text-[#8f9495]">
                      Walk-ins per month
                    </h3>
                  </div>

                  <div className="why-walkins-rows mt-auto grid gap-[20px] pt-[80px]">
                    <div
                      className="why-walkins-bar why-walkins-bar--after grid min-h-[72px] grid-cols-[minmax(0,1fr)_auto] items-center gap-[12px] rounded-[13px] px-[20px]"
                      style={{ '--fill-percent': '100%' }}
                    >
                      <span className="why-walkins-bar-fill"></span>
                      <span className="why-walkins-bar-text text-[18px] font-[600] leading-[23px]">
                        Walk-ins after 8 months
                      </span>
                      <strong className="why-walkins-bar-text text-[23px] font-[800] leading-none">
                        <CounterNumber
                          value={11500}
                          isActive={countersActive}
                          useGrouping
                        />
                      </strong>
                    </div>

                    <div className="why-walkins-before grid grid-cols-[minmax(0,0.94fr)_minmax(82px,0.8fr)] items-center gap-[18px]">
                      <span className="inline-flex min-h-[64px] items-center rounded-[13px] bg-[#eeeee6] px-[20px] text-[18px] font-[600] leading-[23px] text-[#242520]">
                        Walk-ins before
                      </span>
                      <strong className="text-[23px] font-[800] leading-none text-[#242520]">
                        <CounterNumber
                          value={5500}
                          isActive={countersActive}
                          useGrouping
                        />
                      </strong>
                    </div>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          </Swiper>

          <div className="mt-[30px] flex items-center justify-end gap-[15px] lg:hidden">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="why-us-prev text-[25px] text-[#101820] transition duration-300 hover:text-[#60bd6a]"
              aria-label="Previous"
            >
              <i className="fa-solid fa-arrow-right-long rotate-180"></i>
            </a>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="why-us-next text-[25px] text-[#101820] transition duration-300 hover:text-[#60bd6a]"
              aria-label="Next"
            >
              <i className="fa-solid fa-arrow-right-long"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection
