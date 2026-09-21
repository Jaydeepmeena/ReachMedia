import Image from "next/image";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Carousel } from "@/components/ui/carousel";
import { clients } from "@/lib/content";

/**
 * Client logo wall, on the site's shared carousel.
 *
 * Each logo sits on its own white card: several of the source files have a
 * background baked in (Partha's brown block, PSRI's white panel), so a tinted
 * or dark surface would show visible rectangles behind them.
 *
 * Shown in full colour: greyscaling flattened the logos that carry a baked
 * background into heavy grey slabs, and hid the brand colours people
 * actually recognise.
 */
export function Clients() {
  return (
    <Section id="clients" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(ellipse_55%_100%_at_50%_0%,rgba(86,195,76,0.10),transparent_70%)]"
      />
      <Container>
        <SectionHeading
          eyebrow="Who we work with"
          title="Hospitals and clinics that trust us with their feed."
          highlight="trust us with their feed"
          lead="From single-speciality clinics and dental chains to multi-speciality hospitals."
          align="center"
          className="mx-auto"
        />

        <Carousel
          label="Client logos"
          loop
          autoplay
          wheel
          className="mt-12 lg:mt-14"
          slideClassName="basis-[calc(50%-0.625rem)] sm:basis-[calc(33.333%-0.834rem)] lg:basis-[calc(25%-0.9375rem)]"
        >
          {clients.map((client) => (
            <figure
              key={client.name}
              className="group flex h-full flex-col items-center justify-center rounded-2xl border border-ink-200/70 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift sm:p-6"
            >
              {/* Fixed box + contain keeps every logo on the same baseline.
                  Tall enough that near-square logos are not dwarfed by the
                  4:1 wordmarks. */}
              <div className="relative flex h-20 w-full items-center justify-center sm:h-24">
                <div
                  className="relative h-full w-full"
                  style={{ transform: `scale(${client.scale})` }}
                >
                  <Image
                    src={client.file}
                    alt={client.name}
                    fill
                    sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 22vw"
                    className="object-contain opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.04]"
                  />
                </div>
              </div>

              <figcaption className="mt-4 text-center">
                <span className="block text-[12.5px] font-semibold leading-tight text-ink-700">
                  {client.name}
                </span>
                <span className="mt-0.5 block text-[10.5px] font-medium uppercase tracking-wider text-ink-400">
                  {client.sector}
                </span>
              </figcaption>
            </figure>
          ))}
        </Carousel>
      </Container>
    </Section>
  );
}
