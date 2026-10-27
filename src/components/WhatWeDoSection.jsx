import { useEffect, useRef } from 'react'
import '../assets/css/services-strips.css'
import socialMediaImage from '../assets/images/social-media-img.jpg'
import creativeImage from '../assets/images/content-creation-img.jpg'
import reelsImage from '../assets/images/video-and-reels-img.jpg'
import paidMediaImage from '../assets/images/paid-media-img.jpg'
import creatorImage from '../assets/images/healthcare-influencer-img.jpg'
import reportingImage from '../assets/images/reporting-img.jpg'

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

const serviceMedia = [
  { src: socialMediaImage, alt: 'Social media content planning and platform management' },
  { src: creativeImage, alt: 'Creative content production and design' },
  { src: reelsImage, alt: 'Video and Instagram Reels production' },
  { src: paidMediaImage, alt: 'Paid advertising and campaign planning' },
  { src: creatorImage, alt: 'A healthcare professional recording educational content' },
  { src: reportingImage, alt: 'Campaign reporting and performance analysis' },
]

function ServiceMedia({ item, media }) {
  return (
    <figure className="services-strip-media">
      <div className="services-strip-visual">
        <img
          src={media.src}
          alt={media.alt}
          loading="lazy"
          decoding="async"
          className="services-strip-photo"
          width={1500}
          height={1000}
        />
      </div>
      <figcaption className="services-strip-stat">
        <p>{item.stat.caption}</p>
      </figcaption>
    </figure>
  )
}

function WhatWeDoSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const stack = section.querySelector('.services-strip-stack')
    const panels = [...section.querySelectorAll('.services-strip')]
    const contents = panels.map((panel) => panel.querySelector('.services-strip-inner'))
    const header = document.querySelector('.rm-site-header')
    const desktop = window.matchMedia('(min-width: 1024px)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let dimensions = []
    let collapsedHeight = 112
    let frame = 0

    const update = () => {
      frame = 0
      if (!desktop.matches || reducedMotion.matches || !dimensions.length) {
        panels.forEach((panel) => {
          panel.style.removeProperty('height')
          panel.dataset.collapsed = 'false'
        })
        return
      }

      // Keep the delayed trigger, but soften both ends of the collapse over a longer scroll interval.
      const distance = Math.max(240, window.innerHeight * 0.26)
      const headerHeight = header?.offsetHeight ?? 0
      const triggerOffset = Math.max(150, window.innerHeight * 0.17)
      const trigger = Math.min(headerHeight + triggerOffset + 16, window.innerHeight - dimensions[0] - 24)
      let top = stack.getBoundingClientRect().top

      panels.forEach((panel, index) => {
        const progress = index === panels.length - 1 || panel.matches(':focus-within')
          ? 0
          : Math.min(1, Math.max(0, (trigger - top) / distance))
        const easedProgress = progress * progress * (3 - 2 * progress)
        const height = dimensions[index] - (dimensions[index] - collapsedHeight) * easedProgress
        panel.style.height = `${height.toFixed(2)}px`
        panel.dataset.collapsed = progress === 1 ? 'true' : 'false'
        top += height
      })
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    const measure = () => {
      dimensions = contents.map((content) => Math.ceil(content.offsetHeight) + 1)
      collapsedHeight = Math.max(112, ...contents.map((content) => {
        const topPadding = parseFloat(getComputedStyle(content).paddingTop) || 0
        return Math.ceil(topPadding + content.querySelector('.services-strip-title').offsetHeight + 16)
      }))
      requestUpdate()
    }

    const resizeObserver = new ResizeObserver(measure)
    contents.forEach((content) => resizeObserver.observe(content))
    measure()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', measure)
    section.addEventListener('focusin', requestUpdate)
    section.addEventListener('focusout', requestUpdate)
    desktop.addEventListener('change', measure)
    reducedMotion.addEventListener('change', measure)

    return () => {
      resizeObserver.disconnect()
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', measure)
      section.removeEventListener('focusin', requestUpdate)
      section.removeEventListener('focusout', requestUpdate)
      desktop.removeEventListener('change', measure)
      reducedMotion.removeEventListener('change', measure)
    }
  }, [])

  return (
    <section id="services" ref={sectionRef} className="services-strip-section">
      <div className="container services-strip-intro">
        <div className="heading" data-reveal="up">
          <h4>WHAT WE HANDLE</h4>
          <h2 className="!text-black">
            Everything From The Idea
            <span className="heading-accent block">To The Appointment</span>
          </h2>
        </div>
        <div className="services-strip-intro-copy" data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
          <p>
            From the first brief to the calendar, the content, the trends,
            the shoot, the ads and the reporting, one team runs it all, so
            you only have to watch for the results.
          </p>
          <a href="#service-offerings" className="services-strip-link">
            View All Services
            <i className="fa-solid fa-arrow-down" aria-hidden="true"></i>
          </a>
        </div>
      </div>

      <div id="service-offerings" className="services-strip-stack">
        {workItems.map((item, index) => (
          <article
            key={item.title}
            className="services-strip"
            aria-labelledby={`service-strip-title-${index}`}
          >
            <div className="container services-strip-inner">
              <div className="services-strip-copy">
                <div className="services-strip-title" data-reveal="up">
                  <span className="services-strip-number">
                    Service : {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 id={`service-strip-title-${index}`}>{item.title}</h3>
                </div>
                <p className="services-strip-metric" data-reveal="up">{item.metric}</p>
                <p className="services-strip-description" data-reveal="up">{item.description}</p>
                <ul className="services-strip-points" data-reveal="up">
                  {item.points.map((point) => (
                    <li key={point}>
                      <i className="fa-solid fa-arrow-turn-up fa-rotate-90" aria-hidden="true"></i>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="services-strip-link" data-reveal="up">
                  Learn More
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </a>
              </div>
              <ServiceMedia item={item} media={serviceMedia[index]} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default WhatWeDoSection
