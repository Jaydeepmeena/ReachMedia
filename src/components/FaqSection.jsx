import { useState } from 'react'
import LeadForm from './LeadForm'

const faqs = [
  {
    question: 'What services do you offer?',
    answer:
      'We plan and manage social media, content, reels, paid campaigns, influencer activity, landing pages, and performance reporting for healthcare and service brands.',
  },
  {
    question: 'How long does a campaign setup take?',
    answer:
      'Most campaigns can be planned and launched within 5-7 days once the brief, assets, approvals, and tracking requirements are clear.',
  },
  {
    question: 'Do you work with clinics outside one city?',
    answer:
      'Yes. We support single-location clinics, multi-branch groups, and hospital brands that need location-wise campaigns and reporting.',
  },
  {
    question: 'How do you report results?',
    answer:
      'We share simple reports focused on enquiries, campaign performance, content learnings, spend, and the next actions needed to improve results.',
  },
]

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)
  const faqCount = String(faqs.length).padStart(2, '0')

  const handleQuestionClick = (event, index) => {
    event.preventDefault()
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section id="faqs" className="relative bg-[#101110] py-[76px] text-white md:py-[100px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(184,238,0,0.16) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      ></div>

      <div className="container relative z-[2]">
        <div className="grid gap-[42px] lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-[64px]">
          <LeadForm className="lg:sticky lg:top-[176px]" />

          <div className="pt-[4px]">
            <div>
              <span className="inline-flex items-center gap-[12px] text-[14px] font-[700] uppercase tracking-[0.08em] text-white/46">
                <span className="h-[10px] w-[10px] rounded-full bg-[#d7ff2f] shadow-[0_0_18px_rgba(215,255,47,0.55)]"></span>
                {`{${faqCount}} FAQs`}
              </span>
              <h2 className="mt-[20px] max-w-[720px] font-['Nunito'] text-[48px] font-[800] leading-[56px] text-white md:text-[62px] md:leading-[70px]">
                Learn more from FAQs
              </h2>
              <p className="mt-[18px] max-w-[620px] text-[16px] leading-[30px] text-white/52">
                A quick look at how we plan, launch, manage, and report growth
                work for clinics and healthcare brands.
              </p>
            </div>

            <div className="mt-[46px] grid gap-[14px]">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index

                return (
                  <article
                    key={faq.question}
                    id={`faq-${index + 1}`}
                    className={`overflow-hidden rounded-[18px] bg-black transition duration-300 ${
                      isOpen ? 'border border-white/16' : 'border border-transparent'
                    }`}
                  >
                    <a
                      href={`#faq-${index + 1}`}
                      onClick={(event) => handleQuestionClick(event, index)}
                      className="flex w-full items-center justify-between gap-[22px] px-[22px] py-[24px] text-left md:px-[28px]"
                      aria-expanded={isOpen}
                    >
                      <span className="flex items-center gap-[22px]">
                        <span className="font-['Nunito'] text-[22px] font-[800] text-white/44">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="font-['Nunito'] text-[21px] font-[800] leading-[28px] text-white">
                          {faq.question}
                        </span>
                      </span>
                      <span className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#d7ff2f] text-[#101112]">
                        <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
                      </span>
                    </a>

                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="border-t border-white/10 px-[22px] py-[24px] text-[16px] leading-[30px] text-white/56 md:px-[28px]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FaqSection
