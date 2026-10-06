import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const whyUsImage =
  'https://demo.omispace.com/pitwo/wp-content/uploads/sites/5/2026/07/Why-Us-Image.jpg'

const whyUsSliderBreakpoints = {
  0: { slidesPerView: 1, spaceBetween: 18 },
  1024: { slidesPerView: 3, spaceBetween: 26, allowTouchMove: false },
}

const reasons = [
  {
    title: 'Healthcare-focused planning',
    description:
      'We shape campaigns around patient intent, service awareness, local discovery, and appointment quality.',
  },
  {
    title: 'Creative with clear recall',
    description:
      'Every design, reel, carousel, and ad is made to explain the service quickly and keep the brand memorable.',
  },
  {
    title: 'Transparent performance',
    description:
      'You get simple reporting, campaign insights, and practical next steps instead of confusing marketing noise.',
  },
]

function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="bg-white">
      <div className="overflow-hidden rounded-t-[24px] border mx-[10px] border-[#d4edf8] bg-[#eefaff] px-[20px] py-[30px] md:px-[44px] md:py-[60px] lg:px-[90px] xl:px-[90px]">
        <div>
          <div className="grid gap-[42px] lg:grid-cols-[minmax(0,0.92fr)_minmax(380px,0.72fr)] lg:items-end xl:gap-[78px]">
            <div className="heading" data-reveal="left">
              <h4>Why Choose Reach Media</h4>

              <h2 className="max-w-[680px] font-['Nunito'] text-[40px] font-[800] leading-[48px] text-[#101820] md:text-[58px] md:leading-[66px]">
                Smarter healthcare growth
              </h2>

              <p className="mt-[24px] max-w-[650px] text-[16px] leading-[30px] text-[#6d747b] md:text-[17px] md:leading-[32px]">
                We combine category understanding with performance campaigns,
                content systems, and practical reporting so your brand shows up
                with consistency, credibility, and measurable direction.
              </p>

              <a
                href="#contact"
                className="group mt-[28px] inline-flex h-[66px] overflow-hidden rounded-[10px] bg-[#101112] pl-[28px] text-[15px] font-[700] text-white transition duration-500 hover:bg-[#24272a]"
              >
                <span className="flex items-center pr-[28px]">
                  Why Partner With Us
                </span>
                <span className="m-[5px] inline-flex w-[56px] items-center justify-center rounded-[8px] bg-white text-[#101112] transition duration-500 group-hover:bg-[#f4f6f7] group-hover:text-[#101112]">
                  <i className="fa-solid fa-arrow-up-long rotate-45"></i>
                </span>
              </a>
            </div>

            <div className="grid gap-[28px] pt-[4px]">
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
                    <h3 className="font-['Nunito'] text-[19px] md:text-[24px] font-[800] leading-[31px] text-[#101820]">
                      {item.title}
                    </h3>
                    <p className="mt-[12px] text-[14px] md:text-[16px] leading-normal text-[#6d747b]">
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

                <h3 className="mx-auto max-w-[390px] font-['Nunito'] text-[23px] font-[800] leading-[30px] text-[#101820] xl:text-[25px] xl:leading-[32px]">
                  Instantly qualify leads with AI chat.
                </h3>
              </article>
            </SwiperSlide>

            <SwiperSlide>
              <article className="min-h-[350px] rounded-[22px] border-[6px] border-white bg-[#101112] p-[34px] text-white shadow-none lg:shadow-[0_18px_60px_rgba(37,56,80,0.08)]">
                <div className="flex items-start justify-between gap-[20px]">
                  <strong className="font-['Nunito'] text-[60px] font-[800] leading-none text-[#b8ee00] md:text-[70px]">
                    96.8%
                  </strong>
                  <div className="flex -space-x-[10px] pt-[7px]">
                    <span className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border-2 border-[#101112] bg-[#60bd6a] text-[15px]">
                      <i className="fa-solid fa-user-doctor"></i>
                    </span>
                    <span className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border-2 border-[#101112] bg-[#43A0A1] text-[15px]">
                      <i className="fa-solid fa-chart-simple"></i>
                    </span>
                  </div>
                </div>

                <div className="my-[28px] h-px bg-white/10"></div>

                <h3 className="font-['Nunito'] text-[27px] font-[800] leading-[34px]">
                  Audience Match
                </h3>
                <p className="mt-[14px] max-w-[360px] text-[16px] leading-[29px] text-white/54">
                  Campaigns refined around service intent, geography, audience
                  behavior, and lead quality.
                </p>
              </article>
            </SwiperSlide>

            <SwiperSlide>
              <article className="relative min-h-[350px] overflow-hidden rounded-[22px] bg-[#49a6dc] shadow-none lg:shadow-[0_18px_60px_rgba(37,56,80,0.08)]">
                <span className="absolute right-[14px] top-[14px] z-[2] inline-flex h-[56px] w-[56px] items-center justify-center rounded-[12px] bg-white text-[22px] text-[#60bd6a]">
                  <i className="fa-solid fa-shield-heart"></i>
                </span>
                <img
                  src={whyUsImage}
                  alt="Reach Media growth expertise"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute bottom-[18px] left-[18px] z-[2] inline-flex min-h-[58px] items-center overflow-hidden rounded-[12px] bg-white text-[#101820] shadow-[0_16px_36px_rgba(16,24,32,0.12)]">
                  <span className="px-[20px] text-[16px] font-[800] text-[#5b7cff]">
                    12+
                  </span>
                  <span className="h-[32px] w-px bg-slate-200"></span>
                  <span className="px-[20px] text-[15px] font-[800]">
                    Growth Expertise
                  </span>
                </div>
              </article>
            </SwiperSlide>
          </Swiper>

          <div className="mt-[10px] flex items-center justify-end gap-[15px] lg:hidden">
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
