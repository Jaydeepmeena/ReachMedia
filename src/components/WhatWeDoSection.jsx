import { useRef, useState } from 'react'

const workItems = [
  {
    title: 'Social Media Handling',
    description:
      'End-to-end ownership of Instagram, LinkedIn, Facebook and YouTube: strategy, calendar, publishing, community management and reporting, run as one system.',
    points: ['Three-month content strategy', 'Daily posting and stories', 'DMs, comments and reviews answered'],
    stat: '3M',
    statText: 'Content calendar, planned quarterly',
  },
  {
    title: 'Content Creation & Design',
    description:
      "Medically accurate, on-brand creative, plus captions and copywriting in your brand's own voice, not a generic agency tone.",
    points: ['Treatment explainer carousels', 'Doctor credibility posts', 'Consented case-study layouts'],
    stat: '30',
    statText: '12-30 assets planned each month',
  },
  {
    title: 'Video & Reels',
    description:
      "Script to publish, we write it, direct the doctor on the day, and cut it for the platform it's actually going to live on.",
    points: ['One on-site shoot day', 'Doctor reels with scripts', 'Patient testimonial films'],
    stat: '1',
    statText: 'One on-site shoot day per month',
  },
  {
    title: 'Paid Media',
    description:
      "Reach and content don't fill a waiting room on their own. We run the paid campaigns that turn the right person watching into the right person calling.",
    points: ['Meta and Instagram ads', 'Landing page alignment', 'Weekly budget optimisation'],
    stat: 'LIVE',
    statText: 'Live ad account, managed weekly',
  },
  {
    title: 'Healthcare Influencer Marketing',
    description:
      'Not every healthcare creator is right for every clinic. We match your speciality to creators whose audience, tone and compliance history fit.',
    points: ['Creator vetting by speciality', 'Medical-accuracy briefs', 'Consent and compliance checks'],
    stat: 'FIT',
    statText: 'Creators vetted per speciality',
  },
  {
    title: 'Reporting',
    description:
      'Content is only half the job. We track what turned into a DM, a call and a walk-in, not just what turned into a like.',
    points: ['Live dashboard shared with your team', 'Lead tracking from post to appointment', 'Monthly next-step recommendations'],
    stat: '100%',
    statText: 'Monthly review with a live dashboard',
  },
]

function WhatWeDoSection() {
  const tabRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = workItems[activeIndex]

  const handleTabClick = (index) => {
    setActiveIndex(index)
    tabRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }

  return (
    <section id="process" className="what-we-do-section bg-white py-[60px] md:py-[70px]">
      <div className="container">
        <div className="mb-[58px] grid gap-[28px] lg:grid-cols-[1fr_0.86fr] lg:items-start">
          <div className="heading" data-reveal="left">
            <h4>What We Handle</h4>
            <h2 className="max-w-[640px] font-['Nunito'] text-[40px] font-[800] leading-[46px] text-black md:text-[56px] md:leading-[62px]">
              Everything from the idea to the{' '}
              <span className="text-[#3c7f2b]">appointment</span>
            </h2>
          </div>
          <div className="lg:pt-[54px]" data-reveal="right">
            <p className="max-w-[560px] text-[17px] leading-[31px] text-slate-600">
              From the first brief to the calendar, content, trends, shoot,
              ads and reporting, one team runs it all, so you only have to
              watch for the results.
            </p>
            <a
              href="#services"
              className="group relative mt-[30px] inline-block pb-[5px] text-[13px] font-extrabold uppercase tracking-[0.4px] text-[#070909]"
            >
              View All Services
              <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#60bd6a] transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
          </div>
        </div>

        <div className="relative grid items-stretch lg:left-1/2 lg:min-h-[500px] lg:w-[min(1500px,calc(100vw-96px))] lg:-translate-x-1/2 lg:grid-cols-[390px_minmax(0,1fr)] min-[1400px]:grid-cols-[460px_minmax(0,1fr)]" data-reveal="up">
          <div className="relative min-h-[470px] rounded-[34px] bg-black px-[20px] py-[30px] text-white md:px-[34px] md:py-[44px] lg:min-h-[640px] lg:rounded-r-[0px] lg:pr-[0px] xl:px-[42px]">
            <div className="grid gap-[12px] md:gap-[16px] lg:gap-[18px]">
              {workItems.map((item, index) => (
                <button
                  key={item.title}
                  ref={(node) => {
                    tabRefs.current[index] = node
                  }}
                  type="button"
                  aria-pressed={activeIndex === index}
                  className={`group relative flex min-h-[72px] w-full max-w-[390px] items-center overflow-visible rounded-full text-left text-[17px] font-extrabold leading-[23px] transition-[width,background-color,color,box-shadow,padding,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:text-[20px] md:leading-[25px] lg:max-w-none ${
                    activeIndex === index
                      ? 'z-[40] bg-[#60bd6a] pl-[24px] pr-[76px] text-white shadow-[0_16px_34px_rgba(96,189,106,0.24)] lg:w-[calc(100%+70px)] min-[1400px]:w-[calc(100%+96px)]'
                      : 'z-[20] bg-transparent px-[24px] text-white hover:text-[#60bd6a] focus-visible:text-[#60bd6a]'
                  }`}
                  onClick={() => handleTabClick(index)}
                >
                  <span
                    className={`relative z-[1] block max-w-[245px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:max-w-[275px] ${
                      activeIndex === index
                        ? 'translate-x-0'
                        : 'group-hover:translate-x-[8px] group-focus-visible:translate-x-[8px]'
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`absolute right-[9px] top-1/2 inline-flex h-[54px] w-[54px] -translate-y-1/2 items-center justify-center rounded-full bg-black text-[20px] text-white transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      activeIndex === index
                        ? 'scale-100 opacity-100'
                        : 'scale-75 opacity-0'
                    }`}
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative z-[10] mt-[18px] min-h-[470px] rounded-[42px] bg-[#f5f5f8] p-[28px] md:p-[54px] lg:ml-[-44px] lg:mt-[0px] lg:min-h-[640px] lg:py-[62px] lg:pl-[144px] lg:pr-[44px] min-[1400px]:ml-[-62px] min-[1400px]:grid min-[1400px]:grid-cols-[minmax(0,1fr)_minmax(240px,340px)] min-[1400px]:items-center min-[1400px]:gap-[44px] min-[1400px]:pl-[220px] min-[1400px]:pr-[64px]">
            <div key={activeItem.title} className="work-detail-animate max-w-[640px]">
              <h3 className="mb-[26px] max-w-[640px] font-['Nunito'] text-[24px] font-[800] leading-[34px] text-black md:text-[27px] md:leading-[37px] lg:min-h-[168px] lg:text-[29px] lg:leading-[40px] xl:text-[31px] xl:leading-[42px]">
                {activeItem.description}
              </h3>
              <ul className="grid min-h-[110px] gap-[14px] text-[16px] font-medium text-black">
                {activeItem.points.map((point) => (
                  <li key={point} className="flex items-center gap-[12px]">
                    <span className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#60bd6a] text-[11px] text-white">
                      <i className="fa-solid fa-check"></i>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-[34px] inline-block border-b-2 border-[#60bd6a] pb-[3px] text-[13px] font-extrabold uppercase tracking-[0.4px] text-black"
              >
                Learn More
              </a>
            </div>

            <div
              key={activeItem.stat}
              className="work-stat-animate mt-[34px] flex min-h-[330px] flex-col items-center justify-center rounded-[42px] bg-white px-[28px] py-[42px] text-center min-[1400px]:mt-[0px] xl:px-[32px] xl:py-[44px]"
            >
              <div className="mb-[26px] inline-flex rounded-full border border-[#dedee6] p-[18px]">
                <div className="inline-flex flex-col items-center justify-center gap-[10px] rounded-full border border-[#60bd6a] px-[28px] py-[26px] xl:px-[32px] xl:py-[28px]">
                  <strong className="font-['Nunito'] text-[42px] font-[800] leading-none text-black md:text-[46px]">
                    {activeItem.stat}
                  </strong>
                  <i className="fa-solid fa-eye text-[18px] text-[#60bd6a]"></i>
                </div>
              </div>
              <span className="max-w-[230px] text-[15px] leading-[24px] text-black">
                {activeItem.statText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatWeDoSection
