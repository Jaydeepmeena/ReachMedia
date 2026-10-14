import { useState } from 'react'
import LeadForm from './LeadForm'

const faqs = [
  {
    question: 'What exactly does Reach Media do?',
    answer:
      'We run social media end to end for doctors, clinics, clinic chains, hospitals and healthcare creators: strategy, content calendar, graphics, video, publishing, community management and monthly reporting. You approve once a month; we handle the rest.',
  },
  {
    question: 'Do our doctors have to shoot videos every week?',
    answer:
      "No. One on-site shoot day a month covers the full month's reels and content, whether it is for a doctor's personal profile, a clinic or a hospital department, so the time commitment stays under two hours.",
  },
  {
    question: 'Which platforms do you manage?',
    answer:
      'Instagram as the primary platform, LinkedIn as a growing authority channel, Facebook for community and local reach, and YouTube for longer-form patient education content, each planned for its own role.',
  },
  {
    question: 'Can you manage a personal profile, not just a clinic or hospital account?',
    answer:
      'Yes. We manage individual doctor profiles, single clinics, multi-location clinic chains, hospital accounts across departments, and pages for healthcare influencers and content creators.',
  },
  {
    question: 'How do you handle patient privacy and consent?',
    answer:
      'Every before-after, testimonial or patient-facing piece requires documented consent before it is shot, and again before it is published. No patient name, phone number or medical history appears in content.',
  },
  {
    question: 'Will this actually bring appointments?',
    answer:
      'Social media supports patient trust, recall and enquiry flow when planned around real patient questions and backed by responsive community management and paid promotion. It works alongside your other marketing, not instead of it.',
  },
  {
    question: 'Who is Reinvent Digital?',
    answer:
      "Reinvent Digital is Reach Media's parent company, a team that already runs SEO, paid ads and patient-acquisition reporting for healthcare clients across India.",
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
        <div className="faq-grid grid gap-[42px] lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-[64px]">
          <LeadForm className="faq-lead-form lg:sticky lg:top-[176px]" />

          <div className="pt-[4px]">
            <div className="heading">
              <span className="inline-flex items-center gap-[12px] text-[14px] font-[700] uppercase tracking-[0.08em] text-white/46">
                <span className="h-[10px] w-[10px] rounded-full bg-[#d7ff2f] shadow-[0_0_18px_rgba(215,255,47,0.55)]"></span>
                {`{${faqCount}} FAQs`}
              </span>
              <h2 className="mt-[20px] max-w-[720px] !text-white">
                What every clinic owner
                <span className="block text-[#b8ee00]">wants to know first</span>
              </h2>
              <p className="mt-[18px] max-w-[620px] text-[14px] leading-[26px] text-white/52">
                Something specific to your speciality? Email us the question -
                a strategist replies, not a bot.
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
                        <span className="text-[18px] font-[800] text-white/44">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[17px] font-[800] leading-[24px] text-white">
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
                        <p className="border-t border-white/10 px-[22px] py-[24px] text-[14px] leading-[26px] text-white/56 md:px-[28px]">
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
