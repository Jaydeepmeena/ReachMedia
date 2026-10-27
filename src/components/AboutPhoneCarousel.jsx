import { useRef } from 'react'
import { A11y, Autoplay, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import mobileFrame from '../assets/images/mobile-frame.png'
import arrowLeft from '../assets/images/arrow-left.png'
import arrowRight from '../assets/images/arrow-right.png'
import kamineniScreenshot from '../assets/images/kamineni-insta.jpg'
import psriScreenshot from '../assets/images/psri-insta.jpg'

const profiles = [
  { name: 'Kamineni Hospitals', screenshot: kamineniScreenshot },
  { name: 'PSRI Hospital', screenshot: psriScreenshot },
]

function AboutPhoneCarousel() {
  const swiperRef = useRef(null)

  return (
    <div
      role="region"
      aria-label="Client Instagram profiles"
      onFocus={() => swiperRef.current?.autoplay?.stop()}
      onBlur={(event) => {
        if (
          !event.currentTarget.contains(event.relatedTarget) &&
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
          swiperRef.current?.autoplay?.start()
        }
      }}
      className="flex w-full min-w-0 max-w-[520px] self-start items-start justify-center px-[44px] pb-[88px] pt-[16px] sm:px-[76px] md:pb-[24px] lg:pt-[24px]"
    >
      <div className="relative aspect-[874/1799] w-[270px] max-w-full sm:w-[350px]">
        <div className="relative isolate aspect-[874/1799] w-full drop-shadow-[10px_6px_10px_rgba(0,0,0,0.22)]">
          <div className="absolute bottom-[3.2%] left-[6.2%] right-[6.2%] top-[3%] overflow-hidden rounded-[24px] bg-[#0b1014] sm:rounded-[32px]">
            <Swiper
              modules={[A11y, Autoplay, Keyboard]}
              onSwiper={(swiper) => { swiperRef.current = swiper }}
              slidesPerView={1}
              speed={450}
              loop
              grabCursor
              keyboard={{ enabled: true, onlyInViewport: true }}
              autoplay={
                window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? false
                  : { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }
              }
              tabIndex={0}
              className="h-full w-full focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#60bd6a]"
            >
              {profiles.map((profile) => (
                <SwiperSlide key={profile.name} className="!h-full overflow-hidden">
                  <img
                    src={profile.screenshot}
                    alt={`${profile.name} Instagram profile`}
                    width={1170}
                    height={2532}
                    draggable={false}
                    className="block h-full w-full object-fill"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <img
            src={mobileFrame}
            alt=""
            aria-hidden="true"
            width={874}
            height={1799}
            draggable={false}
            className="pointer-events-none relative z-10 block h-full w-full object-contain"
          />
        </div>
        <button
          type="button"
          aria-label="Previous Instagram screenshot"
          title="Previous screenshot"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute bottom-[-64px] left-[calc(50%-80px)] inline-flex h-[48px] w-[64px] cursor-pointer items-center justify-center transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-[#60bd6a] md:bottom-auto md:left-[-90px] md:top-1/2 md:w-[74px] md:-translate-y-1/2 xl:left-[-100px] xl:w-[82px]"
        >
          <img src={arrowLeft} alt="" aria-hidden="true" width={141} height={70} className="block h-auto w-full" />
        </button>
        <button
          type="button"
          aria-label="Next Instagram screenshot"
          title="Next screenshot"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute bottom-[-64px] right-[calc(50%-80px)] inline-flex h-[48px] w-[64px] cursor-pointer items-center justify-center transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-[#60bd6a] md:bottom-auto md:right-[-90px] md:top-1/2 md:w-[74px] md:-translate-y-1/2 xl:right-[-100px] xl:w-[82px]"
        >
          <img src={arrowRight} alt="" aria-hidden="true" width={141} height={70} className="block h-auto w-full" />
        </button>
      </div>
    </div>
  )
}

export default AboutPhoneCarousel
