import { useState } from 'react'
import campaignSystemImage from '../assets/images/campaign-system.jpg'
import learnAndImproveImage from '../assets/images/learn-and-improve.jpg'
import shareGrowthGoalImage from '../assets/images/share-growth-goal.jpg'

const processSteps = [
  {
    step: 'Step. 01',
    image: shareGrowthGoalImage,
    title: '01. Share Your Growth Goals',
    description:
      'Tell us about your service lines, locations, audience, and enquiry goals so we can understand what needs to improve first.',
    points: [
      {
        title: 'Quick discovery for your brand',
        description: 'We review your current visibility, channels, and campaign gaps.',
      },
      {
        title: 'Clear priority mapping',
        description: 'We define what should be fixed, launched, or scaled first.',
      },
    ],
  },
  {
    step: 'Step. 02',
    image: campaignSystemImage,
    title: '02. Build The Campaign System',
    description:
      'Our team prepares the content direction, audience plan, creative formats, and tracking structure for your healthcare brand.',
    points: [
      {
        title: 'Creative and media setup',
        description: 'Posts, reels, ads, and landing journeys are planned together.',
      },
      {
        title: 'Performance tracking',
        description: 'Reporting is set around enquiry quality and measurable growth.',
      },
    ],
  },
  {
    step: 'Step. 03',
    image: learnAndImproveImage,
    title: '03. Launch, Learn, And Improve',
    description:
      'We monitor campaign movement, refine creative, improve budgets, and share simple next-step recommendations.',
    points: [
      {
        title: 'Continuous optimization',
        description: 'Campaigns are improved based on audience behavior and results.',
      },
      {
        title: 'Readable monthly insights',
        description: 'You see what worked, what changed, and what comes next.',
      },
    ],
  },
]

function HowItWorksSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = processSteps[activeIndex]

  return (
    <section
      id="work"
      className="relative overflow-hidden px-[10px] pb-[60px] text-white lg:pb-[60px]"
    >
      <div className="relative z-[1]">
        <div className="relative overflow-hidden rounded-b-[30px] bg-[#070909] px-[24px] pb-[138px] pt-[60px] text-center md:px-[48px] lg:pb-[168px] lg:pt-[96px]">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          ></div>

          <div className="relative z-[1] heading">
            <h4 className="justify-center">How It Works</h4>
            <h2 className="mt-[16px] !text-white">
              Simple steps to grow your healthcare brand
            </h2>
            <p className="mx-auto mt-[20px] max-w-[680px] text-[17px] leading-[31px] text-white/66">
              We keep the workflow clear from first discussion to campaign launch,
              so every action has a purpose and every result is easy to read.
            </p>
          </div>
        </div>

        <div className="container">
          <div className="relative z-[2] mx-auto mt-[-76px] grid overflow-hidden rounded-[30px] border border-white/10 bg-[#101a1f] lg:mt-[-104px] lg:grid-cols-[0.98fr_1.02fr]">
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
                <div className="flex flex-wrap gap-[14px]">
                  {processSteps.map((item, index) => (
                    <button
                      key={item.step}
                      type="button"
                      className={`h-[54px] min-w-[130px] rounded-full border px-[24px] text-[14px] font-[800] transition duration-300 ${activeIndex === index
                          ? 'border-[#60bd6a] bg-[#60bd6a] text-white'
                          : 'border-white/14 bg-white text-[#070909] hover:border-[#60bd6a] hover:bg-[#f3fbf4] hover:text-[#101112]'
                        }`}
                      onClick={() => setActiveIndex(index)}
                    >
                      {item.step}
                    </button>
                  ))}
                </div>

                <div key={activeStep.title} className="work-detail-animate mt-[52px]">
                  <h3 className="font-['Nunito'] text-[27px] font-[800] leading-[35px] text-white md:text-[31px] md:leading-[39px]">
                    {activeStep.title}
                  </h3>
                  <p className="mt-[14px] max-w-[650px] text-[17px] leading-[31px] text-white/72">
                    {activeStep.description}
                  </p>

                  <div className="mt-[38px] grid gap-[28px]">
                    {activeStep.points.map((point) => (
                      <div key={point.title} className="flex gap-[22px]">
                        <span className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#60bd6a] text-[16px] text-white">
                          <i className="fa-solid fa-check"></i>
                        </span>
                        <div>
                          <h4 className="font-['Nunito'] text-[22px] font-[800] leading-[30px] text-white">
                            {point.title}
                          </h4>
                          <p className="mt-[8px] text-[16px] leading-[27px] text-white/64">
                            {point.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative max-h-[560px]">
              <img
                key={activeStep.image}
                src={activeStep.image}
                alt={activeStep.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
