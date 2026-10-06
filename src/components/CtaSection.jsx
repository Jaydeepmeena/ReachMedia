import { useEffect, useState } from 'react'
import ctaShape from '../assets/images/website-shap.webp'

const checklist = [
  'Free 30-min strategy call',
  'No obligation to continue',
  'Reply within 24 hours',
]

const stats = [
  { value: '115+', label: 'Haccounts Managed' },
  { value: '4.2M', label: 'Monthly Content Views' },
  { value: '10+', label: 'Years Of Experience' },
]

const dotPattern = {
  backgroundImage:
    'radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)',
  backgroundSize: '22px 22px',
}

function CtaSection() {
  const [email, setEmail] = useState('')
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    let frameId = 0

    const updateRotation = () => {
      frameId = 0
      setRotation(window.scrollY * 0.1)
    }

    const requestUpdate = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(updateRotation)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', requestUpdate)
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    const subject = encodeURIComponent('Free strategy call request')
    const body = encodeURIComponent(
      `Hi Reach Media,\n\nI'd like to book a free strategy call.\nMy email: ${email}`,
    )

    window.location.href = `mailto:contact@reachmedia.co.in?subject=${subject}&body=${body}`
  }

  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-[#050606] py-[60px] md:py-[80px]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={dotPattern}
      ></div>

      <img
        src={ctaShape}
        alt=""
        aria-hidden="true"
        style={{ transform: `rotate(${rotation}deg)` }}
        className="pointer-events-none z-[9] absolute bottom-[20%] left-[-12%] hidden w-[300px] opacity-70 mix-blend-luminosity will-change-transform sm:block md:w-[260px] lg:w-[400px]"
      />

      <div className="container relative z-[2]">
        <div className="relative mx-auto max-w-[760px] overflow-hidden rounded-[28px] border border-white/15 bg-[#0a0a0a]/80 px-[22px] py-[56px] text-center shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl md:px-[56px] md:py-[72px]" >
          <div className="relative z-[2] mx-auto max-w-[700px]">
            <span className="inline-flex items-center gap-[10px] rounded-full border border-white/15 bg-white/5 px-[20px] py-[10px] text-[13px] font-[600] uppercase tracking-[0.14em] text-[#b8ee00]">
              <i className="fa-solid fa-bolt"></i>
              Free Strategy Call
            </span>

            <h2 className="mx-auto mt-[22px] max-w-[600px] font-['Nunito'] text-[38px] font-[800] leading-[46px] text-white md:text-[52px] md:leading-[60px]">
              Start growing your enquiries this month
            </h2>

            <p className="mx-auto mt-[20px] max-w-[540px] text-[16px] leading-[29px] text-white/60 md:text-[17px] md:leading-[31px]">
              Share your clinic or brand details and get a practical growth
              plan back — content direction, campaign ideas, and clear next
              steps.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-[36px] flex w-full max-w-[520px] flex-col gap-[10px] rounded-[18px] border border-white/15 bg-white/[0.06] p-[8px] sm:flex-row sm:rounded-full sm:p-[8px]"
            >
              <label htmlFor="cta-email" className="sr-only">
                Email address
              </label>
              <input
                id="cta-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="h-[52px] w-full flex-1 bg-transparent px-[20px] text-[15px] text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-[52px] shrink-0 items-center justify-center gap-[10px] rounded-[12px] bg-white px-[26px] text-[14px] font-[700] text-[#101112] transition duration-300 hover:bg-[#b8ee00] sm:rounded-full"
              >
                Get Started
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </form>

            <div className="mt-[28px] flex flex-wrap items-center justify-center gap-x-[26px] gap-y-[14px]">
              {checklist.map((item) => (
                <div key={item} className="flex items-center gap-[10px]">
                  <span className="inline-flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] text-[#b8ee00]">
                    <i className="fa-solid fa-check"></i>
                  </span>
                  <span className="text-[14px] font-[600] text-white/75">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-[2] mx-auto mt-[52px] grid max-w-[720px] gap-[16px] sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[16px] border border-white/10 bg-white/[0.04] px-[20px] py-[22px] text-left"
              >
                <strong className="block font-['Nunito'] text-[30px] font-[800] leading-none text-white">
                  {stat.value}
                </strong>
                <span className="mt-[10px] block text-[13px] leading-[19px] text-white/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaSection
