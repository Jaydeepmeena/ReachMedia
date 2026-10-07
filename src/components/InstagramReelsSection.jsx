import { useEffect } from 'react'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'

const reelLinks = [
  'https://www.instagram.com/reel/DdOkHbsCZuw/',
  'https://www.instagram.com/reel/DdMj5lOHJZK/',
  'https://www.instagram.com/reel/DdeA7MQk9sw/',
  'https://www.instagram.com/reel/DcvqmtIj8Oy/',
  'https://www.instagram.com/reel/DdoQuuHAnbk/',
]

const postLinks = [
  'https://www.instagram.com/radiantdentalcare_official/p/Dd-TtTWDH8d/',
  'https://www.instagram.com/radiantdentalcare_official/p/DdthJhxDHgS/',
  'https://www.instagram.com/radiantdentalcare_official/p/Dd2lUN9l6_w/',
  'https://www.instagram.com/parthadentalcare/p/DU9vXQkjGXE/',
  'https://www.instagram.com/parthadentalcare/p/DU3AJ5IEmSq/',
  'https://www.instagram.com/parthadentalcare/p/Dd-akoYjInr/',
]

const getPostPermalink = (url) => {
  const [, type, code] = url.match(/\/(p|reel)\/([^/]+)/) || []
  return code ? `https://www.instagram.com/${type}/${code}/` : url
}

const isVideoUrl = (url) => /\.(mp4|webm|mov)(\?|#|$)/i.test(url)

function ReelCard({ link, index, variant = 'reel' }) {
  if (isVideoUrl(link)) {
    return (
      <video
        src={link}
        className="h-full min-h-[500px] w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      ></video>
    )
  }

  return (
    <blockquote
      className="instagram-media !m-0 !min-w-0 !max-w-none"
      data-instgrm-permalink={getPostPermalink(link)}
      data-instgrm-version="14"
      style={{
        background: '#fff',
        border: 0,
        borderRadius: 0,
        margin: 0,
        maxWidth: '100%',
        minWidth: '0',
        width: '100%',
      }}
    >
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="flex min-h-[520px] items-center justify-center text-[#101112]"
        aria-label={`Open ${variant} ${index + 1} on Instagram`}
      >
        <span className="inline-flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#070909] text-[22px] text-white">
          <i className="fa-brands fa-instagram"></i>
        </span>
      </a>
    </blockquote>
  )
}

function InstagramReelsSection() {
  useEffect(() => {
    const scriptId = 'instagram-embed-script'
    const processEmbeds = () => {
      window.instgrm?.Embeds?.process()
    }

    const existingScript = document.getElementById(scriptId)

    if (existingScript) {
      processEmbeds()
      return
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    script.onload = processEmbeds
    document.body.appendChild(script)
  }, [])

  const sliderBreakpoints = {
    0: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1280: { slidesPerView: 4 },
  }

  return (
    <section id="reels" className="bg-white py-[60px]">
      <div className="container">
        <div className="mb-[30px] grid gap-[24px] lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
          <div className="heading" data-reveal="left">
            <h4>Instagram Reels</h4>
            <h2 className="max-w-[690px] font-['Nunito'] text-[40px] font-[800] leading-[48px] text-[#070909] md:text-[58px] md:leading-[66px]">
              Recent campaign Reels
            </h2>
          </div>

          <div className="flex items-end justify-between gap-[24px] lg:justify-self-end" data-reveal="right">
            <div className="flex shrink-0 gap-[15px]">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="reels-prev text-[25px] text-[#070909] transition duration-300 hover:text-[#60bd6a]"
                aria-label="Previous reels"
              >
                <i className="fa-solid fa-arrow-right-long rotate-180"></i>
              </a>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="reels-next text-[25px] text-[#070909] transition duration-300 hover:text-[#60bd6a]"
                aria-label="Next reels"
              >
                <i className="fa-solid fa-arrow-right-long"></i>
              </a>
            </div>
          </div>
        </div>

        <Swiper
          modules={[Autoplay, Navigation]}
          className="reels-swiper"
          loop
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: '.reels-prev',
            nextEl: '.reels-next',
          }}
          grabCursor
          preventClicks={false}
          preventClicksPropagation={false}
          slidesPerGroup={1}
          spaceBetween={20}
          breakpoints={sliderBreakpoints}
          onSlideChange={() => window.instgrm?.Embeds?.process()}
          data-reveal="up"
        >
          {reelLinks.map((link, index) => (
            <SwiperSlide key={link}>
              <article className="overflow-hidden rounded-[24px] border border-[#dce8ea] bg-white">
                <div className="min-h-[520px] bg-white">
                  <ReelCard link={link} index={index} />
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-[58px] flex items-end justify-between gap-[24px]">
          <div className="heading" data-reveal="left">
            <h4>Instagram Posts</h4>
            <h2 className="max-w-[690px] font-['Nunito'] text-[40px] font-[800] leading-[48px] text-[#070909] md:text-[58px] md:leading-[66px]">
              Recent campaign posts
            </h2>
          </div>

          <div className="flex shrink-0 gap-[15px]">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="posts-prev text-[25px] text-[#070909] transition duration-300 hover:text-[#60bd6a]"
              aria-label="Previous posts"
            >
              <i className="fa-solid fa-arrow-right-long rotate-180"></i>
            </a>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="posts-next text-[25px] text-[#070909] transition duration-300 hover:text-[#60bd6a]"
              aria-label="Next posts"
            >
              <i className="fa-solid fa-arrow-right-long"></i>
            </a>
          </div>
        </div>

        <Swiper
          modules={[Autoplay, Navigation]}
          className="reels-swiper mt-[28px]"
          loop
          autoplay={{
            delay: 3200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: '.posts-prev',
            nextEl: '.posts-next',
          }}
          grabCursor
          preventClicks={false}
          preventClicksPropagation={false}
          slidesPerGroup={1}
          spaceBetween={20}
          breakpoints={sliderBreakpoints}
          onSlideChange={() => window.instgrm?.Embeds?.process()}
          data-reveal="up"
        >
          {postLinks.map((link, index) => (
            <SwiperSlide key={link}>
              <article className="overflow-hidden rounded-[24px] border border-[#dce8ea] bg-white">
                <div className="min-h-[520px] bg-white">
                  <ReelCard link={link} index={index} variant="post" />
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default InstagramReelsSection
