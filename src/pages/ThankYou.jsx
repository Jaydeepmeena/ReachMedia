import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoIcon from '../assets/images/reach-media-icon.svg'

const footerYear = new Date().getFullYear()

function ThankYou() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Thank You | Reach Media'
    window.scrollTo(0, 0)

    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8fbf7] text-[#253850]">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(96,189,106,0.16) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'linear-gradient(to bottom, black, transparent 72%)',
        }}
      />
      <div
        className="pointer-events-none absolute -left-[140px] top-[24%] h-[360px] w-[360px] rounded-full bg-[#60bd6a]/15 blur-[90px] md:h-[520px] md:w-[520px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-[160px] top-[-120px] h-[420px] w-[420px] rounded-full bg-[#43a0a1]/15 blur-[100px] md:h-[620px] md:w-[620px]"
        aria-hidden="true"
      />

      <div className="container relative z-[1] flex min-h-screen flex-col py-[20px] sm:py-[28px]">
        <section className="flex flex-1 items-center py-[42px] sm:py-[58px] lg:py-[70px]">
          <div className="grid w-full overflow-hidden rounded-[28px] bg-[#101412] shadow-[0_34px_100px_rgba(19,38,29,0.18)] lg:grid-cols-[1.18fr_0.82fr] lg:rounded-[38px]">
            <div className="relative flex min-h-[500px] flex-col justify-center overflow-hidden px-[24px] py-[58px] sm:px-[54px] sm:py-[76px] lg:min-h-[610px] lg:px-[72px]">
              <img
                src={logoIcon}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-[86px] -right-[76px] h-[330px] w-[330px] object-contain opacity-[0.035] grayscale sm:h-[430px] sm:w-[430px]"
              />

              <div className="relative max-w-[700px]">
                <div className="thank-you-check mb-[30px] inline-flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#d7ff2f] text-[#101412] shadow-[0_0_0_10px_rgba(215,255,47,0.08)] sm:h-[82px] sm:w-[82px]">
                  <svg
                    className="h-[36px] w-[36px] sm:h-[41px] sm:w-[41px]"
                    viewBox="0 0 48 48"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      className="thank-you-check-path"
                      d="M10 25.5L19.2 34L38 13"
                      stroke="currentColor"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p className="mb-[16px] flex items-center gap-[10px] text-[12px] font-[700] uppercase tracking-[0.18em] text-[#d7ff2f] sm:text-[13px]">
                  <span className="h-[8px] w-[8px] bg-[#d7ff2f]" aria-hidden="true" />
                  Enquiry received
                </p>

                <h1 className="max-w-[640px] text-[42px] font-[800] leading-[1.08] tracking-[-0.035em] text-white sm:text-[58px] lg:text-[68px]">
                  Thank you for reaching out.
                </h1>

                <p className="mt-[22px] max-w-[570px] text-[16px] leading-[28px] text-white/62 sm:text-[18px] sm:leading-[31px]">
                  Your details are safely with us. Our team will review your enquiry and get in touch with you shortly.
                </p>

                <Link
                  to="/"
                  className="group mt-[34px] inline-flex h-[52px] w-fit items-center gap-[14px] rounded-full bg-white/15 pr-[22px] text-[16px] font-medium text-white transition duration-[400ms] hover:bg-white hover:text-[#070909] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#101412]"
                >
                  <span className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-[#070909]">
                    <i className="fa-solid fa-arrow-left transition-transform duration-[400ms] group-hover:-translate-x-[3px]" aria-hidden="true" />
                  </span>
                  Back to homepage
                </Link>
              </div>
            </div>

            <aside className="relative flex flex-col justify-between bg-white px-[24px] py-[42px] sm:px-[48px] sm:py-[54px] lg:px-[50px] lg:py-[64px]">
              <div>
                <span className="inline-flex rounded-full bg-[#eef8e9] px-[14px] py-[8px] text-[11px] font-[700] uppercase tracking-[0.14em] text-[#438d55]">
                  What happens next
                </span>

                <div className="mt-[34px] space-y-[30px]">
                  <div className="flex gap-[16px]">
                    <span className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-[#60bd6a]/25 bg-[#f6fbf3] text-[13px] font-[800] text-[#438d55]">01</span>
                    <div>
                      <h2 className="text-[16px] font-[800] text-[#253850]">We review your enquiry</h2>
                      <p className="mt-[6px] text-[14px] leading-[23px] text-slate-500">Our specialists understand your goals and identify the right next step.</p>
                    </div>
                  </div>

                  <div className="flex gap-[16px]">
                    <span className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-[#43a0a1]/25 bg-[#f1f9f9] text-[13px] font-[800] text-[#37898a]">02</span>
                    <div>
                      <h2 className="text-[16px] font-[800] text-[#253850]">We connect with you</h2>
                      <p className="mt-[6px] text-[14px] leading-[23px] text-slate-500">A member of our team will contact you to discuss your requirements.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-[42px] border-t border-[#253850]/10 pt-[28px]">
                <p className="text-[13px] leading-[22px] text-slate-500">Need to speak with us sooner?</p>
                <a
                  href="https://wa.me/919145965775"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-[13px] inline-flex min-h-[44px] items-center gap-[10px] font-[700] text-[#253850] transition-colors duration-300 hover:text-[#43a0a1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43a0a1] focus-visible:ring-offset-4"
                >
                  <i className="fa-brands fa-whatsapp text-[22px] text-[#60bd6a]" aria-hidden="true" />
                  Message us on WhatsApp
                  <i className="fa-solid fa-arrow-up-right-from-square text-[11px]" aria-hidden="true" />
                </a>
              </div>
            </aside>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-[10px] border-t border-[#253850]/10 pt-[18px] text-[11px] text-slate-500 sm:text-[12px]">
          <p>© {footerYear} Reach Media. All rights reserved.</p>
          <a
            href="mailto:contact@reachmedia.co.in"
            className="transition-colors duration-300 hover:text-[#43a0a1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43a0a1] focus-visible:ring-offset-4"
          >
            contact@reachmedia.co.in
          </a>
        </footer>
      </div>
    </main>
  )
}

export default ThankYou
