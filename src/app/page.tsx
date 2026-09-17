import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { Specialities } from "@/components/sections/specialities";
import { Services } from "@/components/sections/services";
import { Results } from "@/components/sections/results";
import { Why } from "@/components/sections/why";
import { Process } from "@/components/sections/process";
import { Work } from "@/components/sections/work";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Audit } from "@/components/sections/audit";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeBand />
        <Specialities />
        <Services />
        <Results />
        <Why />
        <Process />
        <Work />
        <Testimonials />
        <Faq />
        <Audit />
      </main>
      <Footer />
    </>
  );
}
