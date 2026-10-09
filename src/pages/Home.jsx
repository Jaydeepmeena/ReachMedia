import AboutSection from '../components/AboutSection'
import CtaSection from '../components/CtaSection'
import FaqSection from '../components/FaqSection'
import FooterSection from '../components/FooterSection'
import HowWeWorkSection from '../components/HowWeWorkSection'
import HeroBanner from '../components/HeroBanner'
import InstagramReelsSection from '../components/InstagramReelsSection'
import LeadPopup from '../components/LeadPopup'
import ServicesSection from '../components/ServicesSection'
import TestimonialsSection from '../components/TestimonialsSection'
import WhatWeDoSection from '../components/WhatWeDoSection'
import WhyChooseUsSection from '../components/WhyChooseUsSection'

function Home() {
  return (
    <>
      <HeroBanner />

      <AboutSection />

      <ServicesSection />

      <WhatWeDoSection />

      <WhyChooseUsSection />

      <HowWeWorkSection />

      <InstagramReelsSection />

      <CtaSection />

      <TestimonialsSection />

      <FaqSection />

      <FooterSection />

      <LeadPopup />
    </>
  )
}

export default Home
