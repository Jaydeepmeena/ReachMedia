import { useEffect, useRef, useState } from 'react'

const timelineSteps = [
  {
    number: '01',
    title: 'Clinic Deep-Dive',
    duration: 'WEEK 1',
    description:
      'Our content strategists sit with your doctors and front desk to map every treatment, ticket size and seasonal pattern specific to your speciality, pulling the list of questions patients actually ask before they book straight from real conversations, not assumptions.',
  },
  {
    number: '02',
    title: 'Strategy & Calendar',
    duration: 'WEEK 1-2',
    description:
      "Our content strategists and copywriters build a speciality-specific content plan, mapping every post to a platform, a patient type and a call to action before it's written, then get it approved once by your team and run it for the full month.",
  },
  {
    number: '03',
    title: 'Shoot & Produce',
    duration: 'WEEK 2',
    description:
      'Our videographers and designers cover the full month in one on-site shoot day, scripts ready before the doctor arrives and in and out within two hours, with editing and design handled entirely on our side afterwards.',
  },
  {
    number: '04',
    title: 'Publish & Respond',
    duration: 'WEEK 4',
    description:
      'Our community managers keep every platform active with daily posting and stories, answer comments and DMs within the day, and route every enquiry to your front desk with a tracked handover, so nothing gets lost between a DM and a phone call.',
  },
  {
    number: '05',
    title: 'Promote & Report',
    duration: 'WEEK 5',
    description:
      'Our performance marketers and analysts run the paid campaigns and influencer collaborations alongside the content, then track every enquiry back to its source and bring you a monthly report on what actually turned into a call.',
  },
]

function HowWeWorkSection() {
  const timelineRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frameId = 0

    const updateProgress = () => {
      frameId = 0
      const timeline = timelineRef.current
      if (!timeline) return

      const rect = timeline.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const startPoint = viewportHeight * 0.72
      const travel = rect.height + viewportHeight * 0.08
      const nextProgress = Math.min(Math.max((startPoint - rect.top) / travel, 0), 1)

      setProgress((currentProgress) => {
        if (Math.abs(currentProgress - nextProgress) < 0.006) return currentProgress
        return nextProgress
      })
    }

    const requestUpdate = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(updateProgress)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  return (
    <section id="how-we-work" className="relative overflow-hidden bg-[#050606] pt-[60px] pb-[100px] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      ></div>

      <div className="container relative z-[2]">
        <div className="heading text-center" data-reveal="up">
          <h4 className="justify-center">How We Work</h4>
          <h2 className="mt-[16px] !text-white">
            The Process Behind Every Month
            <span className="heading-accent mt-[6px] flex items-center justify-center gap-[18px]">
              <i className="heading-accent fa-solid fa-arrow-right-long rotate-180 text-[0.58em]"></i>
              Start To Finish
              <i className="heading-accent fa-solid fa-arrow-right-long text-[0.58em]"></i>
            </span>
          </h2>
          <p className="mx-auto mt-[20px] max-w-[620px] text-[17px] leading-[31px] text-white/62">
            You spend two hours a month with us. We spend the rest of it making
            sure that time was worth it.
          </p>
        </div>

        <div id="process" ref={timelineRef} className="relative mt-[70px]">
          <div className="absolute bottom-0 left-[23px] top-0 w-px bg-white/12 lg:left-1/2 lg:-translate-x-1/2"></div>
          <div
            className="how-work-progress-line absolute bottom-0 left-[23px] top-0 w-[3px] rounded-full bg-[#b8ee00] lg:left-1/2"
            style={{ '--timeline-progress': progress }}
          ></div>

          <div className="grid gap-[34px] md:gap-[42px]">
            {timelineSteps.map((step, index) => {
              const isRight = index % 2 === 0
              const threshold = index * (0.82 / (timelineSteps.length - 1)) + 0.05
              const isVisible = progress >= threshold

              return (
                <article
                  key={step.number}
                  className={`how-work-step relative grid gap-[20px] pl-[68px] lg:grid-cols-[1fr_86px_1fr] lg:items-center lg:gap-[0px] lg:pl-[0px] ${
                    isVisible ? 'is-visible' : ''
                  }`}
                >
                  <div className="hidden lg:col-start-1 lg:block">
                    {!isRight && (
                      <div className="how-work-card group rounded-[18px] border border-white/10 bg-[#151616] p-[28px] transition-colors duration-300">
                        <span className="inline-flex rounded-full bg-[#0b0c0c] px-[16px] py-[8px] text-[13px] font-[700] text-white/72">
                          {step.duration}
                        </span>
                        <h3 className="mt-[22px] text-[28px] font-[800] leading-[34px] text-white transition-colors duration-300 group-hover:text-[#333]">
                          {step.title}
                        </h3>
                        <p className="mt-[14px] text-[16px] leading-[29px] text-white/58 transition-colors duration-300 group-hover:text-[#333]">
                          {step.description}
                        </p>
                      </div>
                    )}
                  </div>

                  <div
                    className={`absolute left-0 top-[20px] z-[2] inline-flex h-[48px] w-[48px] items-center justify-center rounded-full text-[18px] font-[800] transition duration-300 lg:static lg:col-start-2 lg:mx-auto ${
                      isVisible
                        ? 'brand-gradient-bg text-[#070909]'
                        : 'bg-[#151616] text-white/46'
                    }`}
                  >
                    {step.number}
                  </div>

                  <div className="hidden lg:col-start-3 lg:block">
                    {isRight && (
                      <div className="how-work-card group rounded-[18px] border border-white/10 bg-[#151616] p-[28px] transition-colors duration-300">
                        <span className="inline-flex rounded-full bg-[#0b0c0c] px-[16px] py-[8px] text-[13px] font-[700] text-white/72">
                          {step.duration}
                        </span>
                        <h3 className="mt-[22px] text-[28px] font-[800] leading-[34px] text-white transition-colors duration-300 group-hover:text-[#333]">
                          {step.title}
                        </h3>
                        <p className="mt-[14px] text-[16px] leading-[29px] text-white/58 transition-colors duration-300 group-hover:text-[#333]">
                          {step.description}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="lg:hidden">
                    <div className="how-work-card group rounded-[18px] border border-white/10 bg-[#151616] p-[24px] transition-colors duration-300">
                      <span className="inline-flex rounded-full bg-[#0b0c0c] px-[14px] py-[7px] text-[12px] font-[700] text-white/72">
                        {step.duration}
                      </span>
                      <h3 className="mt-[20px] text-[25px] font-[800] leading-[31px] text-white transition-colors duration-300 group-hover:text-[#333]">
                        {step.title}
                      </h3>
                      <p className="mt-[12px] text-[15px] leading-[27px] text-white/58 transition-colors duration-300 group-hover:text-[#333]">
                        {step.description}
                      </p>
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

export default HowWeWorkSection
