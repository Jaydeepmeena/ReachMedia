import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import bannerVideo from '../assets/images/rich-media-bnr.mp4'

const statsSliderBreakpoints = {
  0: { slidesPerView: 1.15, spaceBetween: 14 },
  768: { slidesPerView: 3, spaceBetween: 18, allowTouchMove: false },
}

const stats = [
  {
    value: 115,
    suffix: '+',
    label: 'Healthcare Accounts Managed',
  },
  {
    value: 4.2,
    suffix: 'M',
    label: 'Monthly Content Views',
    decimals: 1,
  },
  {
    value: 10,
    suffix: '+',
    label: 'Years of Healthcare Marketing Experience',
  },
]

const statRevealBaseDelay = 760
const statRevealStagger = 130
const counterStartAfterReveal = 150

function CounterNumber({ value, suffix = '', decimals = 0, isActive }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) {
      return undefined
    }

    let frame = 0
    const duration = 1500
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
  }, [decimals, isActive, value])

  return (
    <span>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}

function StatCard({ stat, index, isActive }) {
  const isFeatured = index === 1
  const [counterReady, setCounterReady] = useState(false)
  const revealDelay = statRevealBaseDelay + index * statRevealStagger

  useEffect(() => {
    if (!isActive) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      setCounterReady(true)
    }, revealDelay + counterStartAfterReveal)

    return () => window.clearTimeout(timer)
  }, [isActive, revealDelay])

  return (
    <div
      className={`hero-reveal rounded-[22px] border px-[20px] py-[20px] text-center shadow-[0_18px_50px_rgba(0,0,0,0.14)] backdrop-blur transition duration-500 md:rounded-[28px] md:px-[24px] md:py-[34px] ${
        isFeatured
          ? 'border-[#8be35a]/80 bg-[linear-gradient(135deg,#43A0A1_0%,#35b88a_48%,#72d944_100%)] text-white shadow-[0_24px_60px_rgba(67,160,161,0.32)] hover:border-[#b8ee00]'
          : 'border-white/55 bg-white/95 text-[#15191c] hover:border-[#60bd6a]'
      }`}
      style={{ animationDelay: `${revealDelay}ms` }}
    >
      <strong className="block text-[30px] font-[800] leading-none md:text-[44px]">
        <CounterNumber
          value={stat.value}
          suffix={stat.suffix}
          decimals={stat.decimals}
          isActive={counterReady}
        />
      </strong>
      <span
        className={`mt-[8px] block text-[13px] font-[500] leading-[20px] md:mt-[10px] md:text-[15px] ${
          isFeatured ? 'text-white/88' : 'text-slate-600'
        }`}
      >
        {stat.label}
      </span>
    </div>
  )
}

function HeroBanner() {
  const sectionRef = useRef(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="hero-banner-section relative overflow-hidden bg-black text-white"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover object-[center_25%] opacity-55"
        src={bannerVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/75"></div>
      <div className="container relative z-[1]">
        <div className="hero-banner-inner flex min-h-[460px] flex-col items-center justify-center py-[64px] text-center sm:min-h-[560px] md:py-[80px] lg:min-h-[720px] lg:py-[92px]">
          <div className="hero-copy mx-auto max-w-[1180px]">
            <p className="hero-eyebrow-slide mb-[18px] text-[14px] font-[700] uppercase tracking-[0.22em] text-[#b8ee00]">
              An Initiative by Reinvent Digital
            </p>
            <h1 className="text-[38px] font-[800] leading-[44px] md:text-[48px] md:leading-[54px] lg:text-[52px] lg:leading-[58px] xl:text-[56px] xl:leading-[62px] 2xl:text-[60px] 2xl:leading-[66px]">
              <span className="hero-title-line md:whitespace-nowrap [animation-delay:120ms]">
                Content Built for Real Patients
              </span>
              <span className="hero-title-line md:whitespace-nowrap [animation-delay:240ms]">
                Not for the Random Viewers!
              </span>
            </h1>
            <p className="hero-reveal [animation-delay:360ms] mx-auto mt-[18px] max-w-[650px] text-[14px] font-[700] uppercase tracking-[0.1em] text-[#b8ee00] md:text-[15px]">
              Likes. Shares. Follows. Impressions &gt;&gt; Booked Appointments
            </p>
            <p className="hero-reveal [animation-delay:480ms] text-[18px] leading-[32px] text-[#fff] font-[700]">
              Instagram | LinkedIn | Facebook | YouTube
            </p>
            <a
              className="hero-reveal [animation-delay:600ms] btn btn-primary hero-btn mt-[34px]"
              href="#contact"
            >
              <span>Get a Free Audit</span>
              <span className="btn-icon" aria-hidden="true">
                <i className="fa-solid fa-arrow-turn-up fa-rotate-90"></i>
              </span>
            </a>
          </div>

          <Swiper
            className="hero-stats-swiper mt-[36px] w-full !pb-[6px] md:mt-[64px]"
            slidesPerView={1.15}
            spaceBetween={14}
            breakpoints={statsSliderBreakpoints}
            grabCursor
          >
            {stats.map((stat, index) => (
              <SwiperSlide key={stat.label}>
                <StatCard stat={stat} index={index} isActive={isActive} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
