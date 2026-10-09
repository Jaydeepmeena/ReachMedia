import { useRef, useState } from 'react'

const workItems = [
  {
    title: 'Social Media Handling',
    description:
      'End-to-end ownership of Instagram, LinkedIn, Facebook and YouTube: strategy, calendar, publishing, community management and reporting, run as one system instead of six separate hand-offs.',
    points: [
      'Account Setup for New Profiles, or a Full Audit for Existing Ones',
      'Three-Month Content Strategy, Reviewed Monthly',
      'Daily Posting, Stories and Scheduling Across Every Platform',
      'DMs, Comments and Reviews Answered Within the Day',
      'Trending and Topical-Day Content, Planned in Advance',
      'Profile, Bio, Highlights and Lead-Form Setup',
      'Monthly Review Call With the Clinic or Hospital Team',
    ],
    metric: 'Content Calendar, Planned Quarterly',
    stat: {
      value: '90',
      caption: 'days mapped before the next review',
      icon: 'fa-bullhorn',
    },
  },
  {
    title: 'Content Creation & Design',
    description:
      "Medically accurate, on-brand creative, plus captions and copywriting in your brand's own voice, not a generic agency tone borrowed from another industry.",
    points: [
      'Treatment Explainer Carousels',
      'Doctor Credibility and Achievement Posts',
      'Consented Before/After and Case-Study Layouts',
      'Festival, Camp and Offer Campaigns',
      'Captions Written in Your Brand Voice',
    ],
    metric: '12-30 Assets / Month',
    stat: {
      value: '30',
      caption: '12-30 assets planned each month',
      icon: 'fa-pen-nib',
    },
  },
  {
    title: 'Video & Reels',
    description:
      "Script to publish, we write it, direct the doctor on the day, and cut it for the platform it's actually going to live on.",
    points: [
      'Monthly On-Site Shoot Day at Your Clinic or Hospital',
      'Doctor Reels With Teleprompter-Ready Scripts',
      'Consented Patient Testimonial Films',
      'Procedure and Facility Walkthroughs',
      'YouTube Explainers and Healthcare Podcast Planning',
      'Subtitles and Platform-Specific Edits',
    ],
    metric: 'One On-Site Shoot Day / Month',
    stat: {
      value: '1',
      caption: 'focused shoot day planned each month',
      icon: 'fa-circle-play',
    },
  },
  {
    title: 'Paid Media',
    description:
      "Reach and content don't fill a waiting room on their own. We run the paid campaigns that turn the right person watching into the right person calling.",
    points: [
      'Meta and Instagram Ads for High-Intent Treatments',
      'LinkedIn Ads for Referral and Corporate Audiences',
      'Landing Page and Lead-Form Alignment',
      'Weekly Budget and Bid Optimisation',
      'Retargeting for Warm, Already-Engaged Audiences',
    ],
    metric: 'Live Ad Account, Managed Weekly',
    stat: {
      value: '7',
      caption: 'campaign checks across every week',
      icon: 'fa-chart-line',
    },
  },
  {
    title: 'Healthcare Influencer Marketing',
    description:
      'Not every healthcare creator is right for every clinic. We match your speciality to creators whose audience, tone and compliance history actually fit.',
    points: [
      'Creator Identification and Vetting, by Speciality',
      'Collaboration Briefs Written for Medical Accuracy',
      'Consent and Compliance Checks Before Publishing',
      'Performance Tracking Per Collaboration',
      'Ongoing Relationship Management, Not One-Off Deals',
    ],
    metric: 'Vetted Per Speciality',
    stat: {
      value: '100%',
      caption: 'creator fit checked before outreach',
      icon: 'fa-people-group',
    },
  },
  {
    title: 'Reporting',
    description:
      'Content is only half the job. We track what turned into a DM, a call and a walk-in, not just what turned into a like.',
    points: [
      'Live Dashboard Shared With Your Team',
      'Competitor Analysis and a Six-Monthly Detailed Review',
      'Lead Tracking From Post to Enquiry to Appointment',
      'Engagement, Click-Through Rate and ROAS, Explained Plainly',
      'Monthly Review Call With Clear Next-Step Recommendations',
    ],
    metric: 'Monthly Review, Live Dashboard',
    stat: {
      value: '30',
      caption: 'day reporting rhythm for lead quality',
      icon: 'fa-chart-simple',
    },
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
        <div className="mb-[58px] grid gap-[28px] lg:grid-cols-[1fr_0.86fr] lg:items-end">
          <div className="heading" data-reveal="left">
            <h4>WHAT WE HANDLE</h4>
            <h2 className="font-['Nunito'] text-[40px] font-[800] leading-[46px] text-black md:text-[56px] md:leading-[62px]">
              Everything From The Idea
              <span className="block text-[#3c7f2b]">To The Appointment</span>
            </h2>
          </div>
          <div className="lg:pt-[54px]" data-reveal="right">
            <p className="max-w-[560px] text-[17px] leading-[31px] text-slate-600">
              From the first brief to the calendar, the content, the trends,
              the shoot, the ads and the reporting, one team runs it all, so
              you only have to watch for the results.
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
                  className={`group relative flex min-h-[72px] w-full max-w-[390px] items-center overflow-visible rounded-full text-left text-[17px] font-extrabold leading-[23px] transition-[width,background-color,color,box-shadow,padding,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:text-[20px] md:leading-[25px] lg:max-w-none ${activeIndex === index
                      ? 'z-[40] bg-[#60bd6a] pl-[24px] pr-[76px] text-white shadow-[0_16px_34px_rgba(96,189,106,0.24)] lg:w-[calc(100%+70px)] min-[1400px]:w-[calc(100%+96px)]'
                      : 'z-[20] bg-transparent px-[24px] text-white hover:text-[#60bd6a] focus-visible:text-[#60bd6a]'
                    }`}
                  onClick={() => handleTabClick(index)}
                >
                  <span
                    className={`relative z-[1] block max-w-[245px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:max-w-[275px] ${activeIndex === index
                        ? 'translate-x-0'
                        : 'group-hover:translate-x-[8px] group-focus-visible:translate-x-[8px]'
                      }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`absolute right-[9px] top-1/2 inline-flex h-[54px] w-[54px] -translate-y-1/2 items-center justify-center rounded-full bg-black text-[20px] text-white transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeIndex === index
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

          <div className="relative z-[10] mt-[18px] flex min-h-[470px] items-center rounded-[42px] bg-[#f5f5f8] p-[28px] md:p-[54px] lg:ml-[-44px] lg:mt-[0px] lg:min-h-[640px] lg:py-[62px] lg:pl-[144px] lg:pr-[56px] min-[1400px]:ml-[-62px] min-[1400px]:pl-[220px] min-[1400px]:pr-[72px]">
            <div
              key={activeItem.title}
              className="work-detail-animate grid w-full items-center gap-[34px] lg:grid-cols-[minmax(0,1fr)_minmax(250px,340px)] xl:gap-[58px]"
            >
              <div className="max-w-[720px]">
                <h3 className="mb-[24px] font-['Nunito'] text-[24px] font-[800] leading-[32px] text-black md:text-[30px] md:leading-[38px]">
                  {activeItem.metric}
                </h3>
                <p className="mb-[34px] max-w-[720px] text-[17px] leading-[31px] max-md:text-[14px] max-md:leading-[20px] text-slate-700">
                  {activeItem.description}
                </p>
                <ul className="grid min-h-[110px] gap-[14px] text-[16px] font-medium text-black">
                  {activeItem.points.slice(0, 5).map((point) => (
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
                  className="group relative mt-[30px] inline-block pb-[5px] text-[13px] font-extrabold uppercase tracking-[0.4px] text-[#070909]"
                >
                  Learn More
                  <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-100 bg-[#60bd6a] transition-transform duration-300 group-hover:scale-x-75"></span>
                </a>
              </div>

              <aside className="work-stat-animate mx-auto flex w-full max-w-[340px] flex-col items-center justify-center rounded-[34px] bg-white px-[28px] py-[42px] text-center shadow-[0_24px_70px_rgba(29,45,61,0.06)] lg:min-h-[310px]">
                <div className="relative flex h-[148px] w-[148px] items-center justify-center rounded-full border border-[#dbe1ea]">
                  <div className="flex h-[116px] w-[116px] flex-col items-center justify-center rounded-full border border-[#60bd6a]">
                    <strong className="font-['Nunito'] text-[42px] font-[800] leading-none text-black md:text-[48px]">
                      {activeItem.stat.value}
                    </strong>
                    <i
                      className={`fa-solid ${activeItem.stat.icon} mt-[12px] text-[24px] leading-none text-[#60bd6a]`}
                    ></i>
                  </div>
                </div>
                <p className="mt-[28px] max-w-[230px] text-[16px] leading-[26px] text-black">
                  {activeItem.stat.caption}
                </p>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatWeDoSection
